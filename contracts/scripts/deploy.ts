import { ethers } from "hardhat"

async function main() {
  const initialFee = ethers.parseEther("0.001") // 0.001 ETH fee
  
  console.log("Deploying TimestampRegistry...")
  console.log(`Initial fee: ${ethers.formatEther(initialFee)} ETH`)
  
  const [deployer] = await ethers.getSigners()
  console.log(`Deploying with account: ${deployer.address}`)
  
  const balance = await ethers.provider.getBalance(deployer.address)
  console.log(`Account balance: ${ethers.formatEther(balance)} ETH`)
  
  const TimestampRegistry = await ethers.getContractFactory("TimestampRegistry")
  const registry = await TimestampRegistry.deploy(initialFee)
  
  await registry.waitForDeployment()
  
  const address = await registry.getAddress()
  console.log(`\nTimestampRegistry deployed to: ${address}`)
  
  // Wait for confirmations before verification
  console.log("\nWaiting for block confirmations...")
  const deployTx = registry.deploymentTransaction()
  if (deployTx) {
    await deployTx.wait(5)
    console.log("Confirmed!")
  }
  
  console.log("\n========================================")
  console.log("Deployment complete!")
  console.log("========================================")
  console.log(`Contract Address: ${address}`)
  console.log(`Fee: ${ethers.formatEther(initialFee)} ETH`)
  console.log(`Owner: ${deployer.address}`)
  console.log("\nTo verify on Etherscan:")
  console.log(`npx hardhat verify --network sepolia ${address} ${initialFee}`)
  console.log("========================================")
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
