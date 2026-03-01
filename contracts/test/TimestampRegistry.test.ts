import { expect } from "chai"
import { ethers } from "hardhat"
import { TimestampRegistry } from "../typechain-types"
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers"

describe("TimestampRegistry", function () {
  let registry: TimestampRegistry
  let owner: SignerWithAddress
  let user1: SignerWithAddress
  let user2: SignerWithAddress
  const FEE = ethers.parseEther("0.001")
  
  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners()
    const TimestampRegistry = await ethers.getContractFactory("TimestampRegistry")
    registry = await TimestampRegistry.deploy(FEE)
  })
  
  describe("Deployment", function () {
    it("Should set the correct owner", async function () {
      expect(await registry.owner()).to.equal(owner.address)
    })
    
    it("Should set the correct initial fee", async function () {
      expect(await registry.fee()).to.equal(FEE)
    })
    
    it("Should start with zero total timestamps", async function () {
      expect(await registry.totalTimestamps()).to.equal(0)
    })
  })
  
  describe("Timestamp Registration", function () {
    const testHash = ethers.keccak256(ethers.toUtf8Bytes("test document content"))
    const metadata = "test-document.pdf"
    
    it("Should register a timestamp successfully", async function () {
      await registry.connect(user1).registerTimestamp(testHash, metadata, { value: FEE })
      
      const record = await registry.getTimestamp(testHash)
      expect(record.exists).to.be.true
      expect(record.owner).to.equal(user1.address)
      expect(record.metadata).to.equal(metadata)
    })
    
    it("Should set correct timestamp and block number", async function () {
      const tx = await registry.connect(user1).registerTimestamp(testHash, metadata, { value: FEE })
      const receipt = await tx.wait()
      const block = await ethers.provider.getBlock(receipt!.blockNumber)
      
      const record = await registry.getTimestamp(testHash)
      expect(record.timestamp).to.equal(block!.timestamp)
      expect(record.blockNumber).to.equal(receipt!.blockNumber)
    })
    
    it("Should emit TimestampCreated event", async function () {
      await expect(registry.connect(user1).registerTimestamp(testHash, metadata, { value: FEE }))
        .to.emit(registry, "TimestampCreated")
        .withArgs(
          testHash,
          user1.address,
          (v: any) => typeof v === "bigint",
          (v: any) => typeof v === "bigint",
          metadata
        )
    })
    
    it("Should increment total timestamps", async function () {
      await registry.connect(user1).registerTimestamp(testHash, metadata, { value: FEE })
      expect(await registry.totalTimestamps()).to.equal(1)
      
      const hash2 = ethers.keccak256(ethers.toUtf8Bytes("another document"))
      await registry.connect(user2).registerTimestamp(hash2, "other.pdf", { value: FEE })
      expect(await registry.totalTimestamps()).to.equal(2)
    })
    
    it("Should reject duplicate hash", async function () {
      await registry.connect(user1).registerTimestamp(testHash, metadata, { value: FEE })
      
      await expect(
        registry.connect(user2).registerTimestamp(testHash, "other.pdf", { value: FEE })
      ).to.be.revertedWithCustomError(registry, "HashAlreadyTimestamped")
    })
    
    it("Should reject insufficient fee", async function () {
      await expect(
        registry.connect(user1).registerTimestamp(testHash, metadata, { value: 0 })
      ).to.be.revertedWithCustomError(registry, "InsufficientFee")
    })
    
    it("Should reject metadata that is too long", async function () {
      const longMetadata = "x".repeat(257)
      await expect(
        registry.connect(user1).registerTimestamp(testHash, longMetadata, { value: FEE })
      ).to.be.revertedWithCustomError(registry, "MetadataTooLong")
    })
    
    it("Should allow empty metadata", async function () {
      await registry.connect(user1).registerTimestamp(testHash, "", { value: FEE })
      const record = await registry.getTimestamp(testHash)
      expect(record.metadata).to.equal("")
    })
    
    it("Should refund excess payment", async function () {
      const excessPayment = ethers.parseEther("0.01")
      const balanceBefore = await ethers.provider.getBalance(user1.address)
      
      const tx = await registry.connect(user1).registerTimestamp(testHash, metadata, { value: excessPayment })
      const receipt = await tx.wait()
      const gasUsed = receipt!.gasUsed * receipt!.gasPrice
      
      const balanceAfter = await ethers.provider.getBalance(user1.address)
      const expectedBalance = balanceBefore - FEE - gasUsed
      
      expect(balanceAfter).to.be.closeTo(expectedBalance, ethers.parseEther("0.0001"))
    })
    
    it("Should track user timestamps", async function () {
      const hash1 = ethers.keccak256(ethers.toUtf8Bytes("doc1"))
      const hash2 = ethers.keccak256(ethers.toUtf8Bytes("doc2"))
      const hash3 = ethers.keccak256(ethers.toUtf8Bytes("doc3"))
      
      await registry.connect(user1).registerTimestamp(hash1, "doc1.pdf", { value: FEE })
      await registry.connect(user1).registerTimestamp(hash2, "doc2.pdf", { value: FEE })
      await registry.connect(user1).registerTimestamp(hash3, "doc3.pdf", { value: FEE })
      
      const userHashes = await registry.getUserTimestamps(user1.address)
      expect(userHashes).to.have.lengthOf(3)
      expect(userHashes).to.include(hash1)
      expect(userHashes).to.include(hash2)
      expect(userHashes).to.include(hash3)
      
      expect(await registry.getUserTimestampCount(user1.address)).to.equal(3)
    })
  })
  
  describe("Verification Functions", function () {
    const testHash = ethers.keccak256(ethers.toUtf8Bytes("test document"))
    
    beforeEach(async function () {
      await registry.connect(user1).registerTimestamp(testHash, "test.pdf", { value: FEE })
    })
    
    it("Should verify correct owner", async function () {
      expect(await registry.verifyTimestamp(testHash, user1.address)).to.be.true
    })
    
    it("Should reject incorrect owner", async function () {
      expect(await registry.verifyTimestamp(testHash, user2.address)).to.be.false
    })
    
    it("Should return false for non-existent hash", async function () {
      const fakeHash = ethers.keccak256(ethers.toUtf8Bytes("fake"))
      expect(await registry.verifyTimestamp(fakeHash, user1.address)).to.be.false
    })
    
    it("Should correctly report hash existence", async function () {
      expect(await registry.hashExists(testHash)).to.be.true
      
      const fakeHash = ethers.keccak256(ethers.toUtf8Bytes("fake"))
      expect(await registry.hashExists(fakeHash)).to.be.false
    })
    
    it("Should return correct timestamp record via getTimestamp", async function () {
      const record = await registry.getTimestamp(testHash)
      expect(record.owner).to.equal(user1.address)
      expect(record.metadata).to.equal("test.pdf")
      expect(record.exists).to.be.true
      expect(record.timestamp).to.be.gt(0)
      expect(record.blockNumber).to.be.gt(0)
    })
  })
  
  describe("Admin Functions", function () {
    it("Should allow owner to update fee", async function () {
      const newFee = ethers.parseEther("0.002")
      
      await expect(registry.setFee(newFee))
        .to.emit(registry, "FeeUpdated")
        .withArgs(FEE, newFee)
      
      expect(await registry.fee()).to.equal(newFee)
    })
    
    it("Should reject non-owner fee update", async function () {
      await expect(
        registry.connect(user1).setFee(ethers.parseEther("0.002"))
      ).to.be.revertedWithCustomError(registry, "OwnableUnauthorizedAccount")
    })
    
    it("Should allow owner to withdraw accumulated fees", async function () {
      const testHash = ethers.keccak256(ethers.toUtf8Bytes("test"))
      await registry.connect(user1).registerTimestamp(testHash, "test.pdf", { value: FEE })
      
      expect(await registry.getBalance()).to.equal(FEE)
      
      const balanceBefore = await ethers.provider.getBalance(owner.address)
      
      await expect(registry.withdraw())
        .to.emit(registry, "FundsWithdrawn")
        .withArgs(owner.address, FEE)
      
      expect(await registry.getBalance()).to.equal(0)
    })
    
    it("Should reject withdrawal when no funds", async function () {
      await expect(registry.withdraw())
        .to.be.revertedWithCustomError(registry, "NoFundsToWithdraw")
    })
    
    it("Should reject non-owner withdrawal", async function () {
      const testHash = ethers.keccak256(ethers.toUtf8Bytes("test"))
      await registry.connect(user1).registerTimestamp(testHash, "test.pdf", { value: FEE })
      
      await expect(
        registry.connect(user1).withdraw()
      ).to.be.revertedWithCustomError(registry, "OwnableUnauthorizedAccount")
    })
  })
  
  describe("Edge Cases", function () {
    it("Should handle zero fee configuration", async function () {
      await registry.setFee(0)
      
      const testHash = ethers.keccak256(ethers.toUtf8Bytes("free document"))
      await registry.connect(user1).registerTimestamp(testHash, "free.pdf", { value: 0 })
      
      expect(await registry.hashExists(testHash)).to.be.true
    })
    
    it("Should handle exact fee payment", async function () {
      const testHash = ethers.keccak256(ethers.toUtf8Bytes("exact payment"))
      await registry.connect(user1).registerTimestamp(testHash, "exact.pdf", { value: FEE })
      
      expect(await registry.hashExists(testHash)).to.be.true
    })
    
    it("Should handle maximum length metadata", async function () {
      const maxMetadata = "x".repeat(256)
      const testHash = ethers.keccak256(ethers.toUtf8Bytes("max metadata"))
      
      await registry.connect(user1).registerTimestamp(testHash, maxMetadata, { value: FEE })
      
      const record = await registry.getTimestamp(testHash)
      expect(record.metadata).to.equal(maxMetadata)
    })
  })
})
