'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Upload, Image as ImageIcon, Loader2, CheckCircle, XCircle, Copy } from 'lucide-react';
import { useFarcaster } from './FarcasterProvider';

export function MintTab() {
    const { context } = useFarcaster();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [nftName, setNftName] = useState('');
    const [nftDescription, setNftDescription] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [metadataUri, setMetadataUri] = useState('');
    const [error, setError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select a valid image file');
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setError('Image size must be less than 10MB');
            return;
        }

        setError('');
        setSelectedImage(file);

        // Create preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleUpload = async () => {
        if (!selectedImage || !nftName || !nftDescription) {
            setError('Please fill in all fields');
            return;
        }

        setIsUploading(true);
        setError('');
        setUploadSuccess(false);

        try {
            const formData = new FormData();
            formData.append('image', selectedImage);
            formData.append('name', nftName);
            formData.append('description', nftDescription);

            // Add user context if available
            if (context?.user) {
                formData.append('fid', context.user.fid.toString());
                formData.append('username', context.user.username || '');
            }

            const response = await fetch('/api/mint', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Upload failed');
            }

            setMetadataUri(data.metadataUri);
            setUploadSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    const handleReset = () => {
        setSelectedImage(null);
        setPreviewUrl('');
        setNftName('');
        setNftDescription('');
        setUploadSuccess(false);
        setMetadataUri('');
        setError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(metadataUri);
    };

    if (uploadSuccess && metadataUri) {
        return (
            <div className="space-y-6 pb-24">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-4">
                        <CheckCircle className="h-10 w-10 text-green-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">NFT Created!</h2>
                    <p className="text-blue-100">Your NFT metadata has been uploaded to IPFS</p>
                </div>

                {/* Preview */}
                {previewUrl && (
                    <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                        <img
                            src={previewUrl}
                            alt="NFT Preview"
                            className="w-full h-64 object-cover rounded-xl"
                        />
                    </div>
                )}

                {/* Metadata URI */}
                <div className="rounded-2xl bg-white/5 p-6 border border-white/10 space-y-4">
                    <h3 className="text-lg font-semibold text-white">Metadata URI</h3>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={metadataUri}
                            readOnly
                            className="flex-1 px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white font-mono text-sm"
                        />
                        <button
                            onClick={copyToClipboard}
                            className="px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                        >
                            <Copy className="h-5 w-5" />
                        </button>
                    </div>
                    <p className="text-sm text-blue-200">
                        Use this URI when minting your NFT on the blockchain
                    </p>
                </div>

                {/* NFT Details */}
                <div className="rounded-2xl bg-white/5 p-6 border border-white/10 space-y-3">
                    <div>
                        <span className="text-sm text-blue-200">Name</span>
                        <p className="text-lg text-white font-semibold">{nftName}</p>
                    </div>
                    <div>
                        <span className="text-sm text-blue-200">Description</span>
                        <p className="text-white">{nftDescription}</p>
                    </div>
                </div>

                <button
                    onClick={handleReset}
                    className="w-full px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors border border-white/20"
                >
                    Create Another NFT
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-24">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-white">Create Your NFT</h2>
                <p className="text-blue-100">Upload an image and add metadata</p>
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
                <label className="block">
                    <span className="text-sm font-medium text-blue-200 mb-2 block">Image</span>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                    />
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="relative rounded-2xl bg-white/5 border-2 border-dashed border-white/20 hover:border-blue-500 transition-colors cursor-pointer overflow-hidden"
                    >
                        {previewUrl ? (
                            <div className="relative">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full h-64 object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <p className="text-white font-medium">Click to change image</p>
                                </div>
                            </div>
                        ) : (
                            <div className="p-12 text-center">
                                <Upload className="h-12 w-12 text-blue-200 mx-auto mb-4" />
                                <p className="text-white font-medium mb-2">Click to upload image</p>
                                <p className="text-sm text-blue-200">PNG, JPG, or GIF (max 10MB)</p>
                            </div>
                        )}
                    </div>
                </label>
            </div>

            {/* NFT Name */}
            <div className="space-y-2">
                <label className="block">
                    <span className="text-sm font-medium text-blue-200 mb-2 block">NFT Name</span>
                    <input
                        type="text"
                        value={nftName}
                        onChange={(e) => setNftName(e.target.value)}
                        placeholder="My Awesome NFT"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </label>
            </div>

            {/* NFT Description */}
            <div className="space-y-2">
                <label className="block">
                    <span className="text-sm font-medium text-blue-200 mb-2 block">Description</span>
                    <textarea
                        value={nftDescription}
                        onChange={(e) => setNftDescription(e.target.value)}
                        placeholder="Describe your NFT..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                </label>
            </div>

            {/* Error Message */}
            {error && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 flex items-center gap-3">
                    <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                    <p className="text-red-200 text-sm">{error}</p>
                </div>
            )}

            {/* Upload Button */}
            <button
                onClick={handleUpload}
                disabled={isUploading || !selectedImage || !nftName || !nftDescription}
                className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isUploading ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Uploading to IPFS...
                    </>
                ) : (
                    <>
                        <ImageIcon className="h-5 w-5" />
                        Create NFT
                    </>
                )}
            </button>

            {/* Info */}
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                <p className="text-sm text-blue-100 text-center">
                    Your image and metadata will be uploaded to IPFS for permanent storage
                </p>
            </div>
        </div>
    );
}

