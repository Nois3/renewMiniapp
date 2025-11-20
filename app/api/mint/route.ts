import { NextRequest, NextResponse } from 'next/server';
import { PinataSDK } from 'pinata-web3';

// Initialize Pinata SDK
const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
});

export async function POST(request: NextRequest) {
    try {
        // Parse form data
        const formData = await request.formData();
        const image = formData.get('image') as File;
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const fid = formData.get('fid') as string;
        const username = formData.get('username') as string;

        // Validate required fields
        if (!image || !name || !description) {
            return NextResponse.json(
                { error: 'Missing required fields: image, name, or description' },
                { status: 400 }
            );
        }

        // Validate image file
        if (!image.type.startsWith('image/')) {
            return NextResponse.json(
                { error: 'Invalid file type. Please upload an image.' },
                { status: 400 }
            );
        }

        // Validate file size (max 10MB)
        if (image.size > 10 * 1024 * 1024) {
            return NextResponse.json(
                { error: 'File size exceeds 10MB limit' },
                { status: 400 }
            );
        }

        // Check if Pinata JWT is configured
        if (!process.env.PINATA_JWT) {
            return NextResponse.json(
                { error: 'IPFS service not configured. Please set PINATA_JWT environment variable.' },
                { status: 500 }
            );
        }

        console.log('Uploading image to IPFS...', {
            name,
            size: image.size,
            type: image.type,
            fid,
            username,
        });

        // Upload image to IPFS
        const imageUpload = await pinata.upload.file(image);
        const imageIpfsHash = imageUpload.IpfsHash;
        const imageUri = `ipfs://${imageIpfsHash}`;

        console.log('Image uploaded to IPFS:', imageUri);

        // Create NFT metadata following ERC-721 standard
        const metadata = {
            name,
            description,
            image: imageUri,
            // Optional: Add creator information
            ...(fid && {
                attributes: [
                    {
                        trait_type: 'Creator FID',
                        value: fid,
                    },
                    ...(username ? [{
                        trait_type: 'Creator Username',
                        value: username,
                    }] : []),
                ],
            }),
        };

        console.log('Uploading metadata to IPFS...', metadata);

        // Upload metadata JSON to IPFS
        const metadataUpload = await pinata.upload.json(metadata);
        const metadataIpfsHash = metadataUpload.IpfsHash;
        const metadataUri = `ipfs://${metadataIpfsHash}`;

        console.log('Metadata uploaded to IPFS:', metadataUri);

        // Return success response with URIs
        return NextResponse.json({
            success: true,
            imageUri,
            metadataUri,
            imageIpfsHash,
            metadataIpfsHash,
            // Include gateway URLs for easy viewing
            imageGatewayUrl: `https://gateway.pinata.cloud/ipfs/${imageIpfsHash}`,
            metadataGatewayUrl: `https://gateway.pinata.cloud/ipfs/${metadataIpfsHash}`,
        });
    } catch (error) {
        console.error('Error uploading to IPFS:', error);

        // Handle specific Pinata errors
        if (error instanceof Error) {
            if (error.message.includes('JWT')) {
                return NextResponse.json(
                    { error: 'Invalid IPFS credentials. Please check PINATA_JWT configuration.' },
                    { status: 500 }
                );
            }

            return NextResponse.json(
                { error: `Upload failed: ${error.message}` },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: 'An unexpected error occurred during upload' },
            { status: 500 }
        );
    }
}
