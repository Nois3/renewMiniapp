// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title BaseNFT
 * @dev ERC721 NFT contract for Base network with minting price and supply limit
 */
contract BaseNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    // Token ID counter
    Counters.Counter private _tokenIdCounter;

    // Maximum supply of NFTs
    uint256 public constant MAX_SUPPLY = 1000;

    // Minting price in wei (0.0003 ETH)
    uint256 public mintPrice = 0.0003 ether;

    // Events
    event MintPriceUpdated(uint256 oldPrice, uint256 newPrice);
    event NFTMinted(address indexed minter, uint256 indexed tokenId, string tokenURI);
    event FundsWithdrawn(address indexed owner, uint256 amount);

    /**
     * @dev Constructor
     * @param initialOwner Address of the contract owner
     */
    constructor(address initialOwner) 
        ERC721("Base NFT", "BNFT") 
        Ownable(initialOwner)
    {
        // Token IDs start at 1
        _tokenIdCounter.increment();
    }

    /**
     * @dev Mint a new NFT with IPFS metadata URI
     * @param to Address to mint the NFT to
     * @param tokenURI IPFS URI for the NFT metadata
     */
    function mint(address to, string memory tokenURI) public payable {
        // Check that payment is correct
        require(msg.value >= mintPrice, "Insufficient payment");

        // Check that max supply hasn't been reached
        uint256 tokenId = _tokenIdCounter.current();
        require(tokenId <= MAX_SUPPLY, "Max supply reached");

        // Mint the NFT
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);

        // Increment counter for next mint
        _tokenIdCounter.increment();

        // Emit event
        emit NFTMinted(to, tokenId, tokenURI);

        // Refund excess payment
        if (msg.value > mintPrice) {
            payable(msg.sender).transfer(msg.value - mintPrice);
        }
    }

    /**
     * @dev Update the minting price (owner only)
     * @param newPrice New minting price in wei
     */
    function updateMintPrice(uint256 newPrice) external onlyOwner {
        uint256 oldPrice = mintPrice;
        mintPrice = newPrice;
        emit MintPriceUpdated(oldPrice, newPrice);
    }

    /**
     * @dev Withdraw collected funds (owner only)
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        payable(owner()).transfer(balance);
        emit FundsWithdrawn(owner(), balance);
    }

    /**
     * @dev Get the current total supply
     * @return Current number of minted NFTs
     */
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current() - 1;
    }

    /**
     * @dev Get the remaining supply
     * @return Number of NFTs that can still be minted
     */
    function remainingSupply() public view returns (uint256) {
        return MAX_SUPPLY - totalSupply();
    }

    /**
     * @dev Get contract balance
     * @return Contract balance in wei
     */
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // The following functions are overrides required by Solidity

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
