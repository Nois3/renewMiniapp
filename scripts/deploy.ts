import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
    console.log("Deploying BaseNFT contract...");

    // Get the deployer account
    const [deployer] = await ethers.getSigners();
    console.log("Deploying with account:", deployer.address);

    // Get account balance
    const balance = await ethers.provider.getBalance(deployer.address);
    console.log("Account balance:", ethers.formatEther(balance), "ETH");

    // Deploy the contract
    const BaseNFT = await ethers.getContractFactory("BaseNFT");
    const baseNFT = await BaseNFT.deploy(deployer.address);

    await baseNFT.waitForDeployment();

    const contractAddress = await baseNFT.getAddress();
    console.log("BaseNFT deployed to:", contractAddress);

    // Get deployment info
    const mintPrice = await baseNFT.mintPrice();
    const maxSupply = await baseNFT.MAX_SUPPLY();

    console.log("\nContract Details:");
    console.log("- Mint Price:", ethers.formatEther(mintPrice), "ETH");
    console.log("- Max Supply:", maxSupply.toString());
    console.log("- Owner:", await baseNFT.owner());

    // Save deployment info to file
    const deploymentInfo = {
        network: (await ethers.provider.getNetwork()).name,
        chainId: (await ethers.provider.getNetwork()).chainId.toString(),
        contractAddress: contractAddress,
        deployer: deployer.address,
        mintPrice: ethers.formatEther(mintPrice),
        maxSupply: maxSupply.toString(),
        deployedAt: new Date().toISOString(),
    };

    const deploymentsDir = path.join(__dirname, "..", "deployments");
    if (!fs.existsSync(deploymentsDir)) {
        fs.mkdirSync(deploymentsDir, { recursive: true });
    }

    const deploymentFile = path.join(
        deploymentsDir,
        `deployment-${deploymentInfo.network}.json`
    );
    fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
    console.log("\nDeployment info saved to:", deploymentFile);

    // Wait for a few block confirmations before verifying
    console.log("\nWaiting for block confirmations...");
    await baseNFT.deploymentTransaction()?.wait(5);

    // Verify contract on Basescan (if not local network)
    if (process.env.BASESCAN_API_KEY && deploymentInfo.network !== "hardhat") {
        console.log("\nVerifying contract on Basescan...");
        try {
            await run("verify:verify", {
                address: contractAddress,
                constructorArguments: [deployer.address],
            });
            console.log("Contract verified successfully!");
        } catch (error: any) {
            if (error.message.includes("Already Verified")) {
                console.log("Contract already verified!");
            } else {
                console.error("Verification failed:", error.message);
            }
        }
    }

    console.log("\n✅ Deployment complete!");
    console.log("\nNext steps:");
    console.log("1. Add contract address to .env.local:");
    console.log(`   NEXT_PUBLIC_CONTRACT_ADDRESS=${contractAddress}`);
    console.log("2. Update the frontend to use the new contract");
    console.log("3. Test minting on the network");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
