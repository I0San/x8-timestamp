// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title TimestampRegistry
 * @author X8 AG
 * @notice A registry for timestamping document hashes on the Ethereum blockchain
 * @dev Documents are hashed client-side; only the hash is stored on-chain
 */
contract TimestampRegistry is Ownable, ReentrancyGuard {
    
    struct TimestampRecord {
        address owner;
        uint256 timestamp;
        uint256 blockNumber;
        string metadata;
        bool exists;
    }
    
    mapping(bytes32 => TimestampRecord) public timestamps;
    mapping(address => bytes32[]) private userTimestamps;
    
    uint256 public fee;
    uint256 public totalTimestamps;
    
    event TimestampCreated(
        bytes32 indexed hash,
        address indexed owner,
        uint256 timestamp,
        uint256 blockNumber,
        string metadata
    );
    
    event FeeUpdated(uint256 oldFee, uint256 newFee);
    event FundsWithdrawn(address indexed to, uint256 amount);
    
    error HashAlreadyTimestamped(bytes32 hash);
    error InsufficientFee(uint256 required, uint256 provided);
    error MetadataTooLong(uint256 maxLength);
    error NoFundsToWithdraw();
    error TransferFailed();
    
    constructor(uint256 _fee) Ownable(msg.sender) {
        fee = _fee;
    }
    
    /**
     * @notice Register a timestamp for a document hash
     * @param _hash The SHA-256 hash of the document (as bytes32)
     * @param _metadata Optional metadata (filename, description) max 256 chars
     */
    function registerTimestamp(
        bytes32 _hash,
        string calldata _metadata
    ) external payable nonReentrant {
        if (timestamps[_hash].exists) {
            revert HashAlreadyTimestamped(_hash);
        }
        if (msg.value < fee) {
            revert InsufficientFee(fee, msg.value);
        }
        if (bytes(_metadata).length > 256) {
            revert MetadataTooLong(256);
        }
        
        timestamps[_hash] = TimestampRecord({
            owner: msg.sender,
            timestamp: block.timestamp,
            blockNumber: block.number,
            metadata: _metadata,
            exists: true
        });
        
        userTimestamps[msg.sender].push(_hash);
        totalTimestamps++;
        
        emit TimestampCreated(
            _hash,
            msg.sender,
            block.timestamp,
            block.number,
            _metadata
        );
        
        if (msg.value > fee) {
            (bool success, ) = payable(msg.sender).call{value: msg.value - fee}("");
            if (!success) revert TransferFailed();
        }
    }
    
    /**
     * @notice Get timestamp record for a document hash
     * @param _hash The document hash to look up
     * @return owner The address that created the timestamp
     * @return timestamp The block timestamp when registered
     * @return blockNumber The block number when registered
     * @return metadata The optional metadata string
     * @return exists Whether the record exists
     */
    function getTimestamp(bytes32 _hash) external view returns (
        address owner,
        uint256 timestamp,
        uint256 blockNumber,
        string memory metadata,
        bool exists
    ) {
        TimestampRecord memory record = timestamps[_hash];
        return (
            record.owner,
            record.timestamp,
            record.blockNumber,
            record.metadata,
            record.exists
        );
    }
    
    /**
     * @notice Get all document hashes timestamped by a user
     * @param _user The user address to query
     * @return Array of document hashes
     */
    function getUserTimestamps(address _user) external view returns (bytes32[] memory) {
        return userTimestamps[_user];
    }
    
    /**
     * @notice Get count of timestamps for a user
     * @param _user The user address to query
     * @return Number of timestamps
     */
    function getUserTimestampCount(address _user) external view returns (uint256) {
        return userTimestamps[_user].length;
    }
    
    /**
     * @notice Verify that a hash was timestamped by a specific owner
     * @param _hash The document hash to verify
     * @param _owner The claimed owner address
     * @return True if the hash exists and was registered by the owner
     */
    function verifyTimestamp(
        bytes32 _hash,
        address _owner
    ) external view returns (bool) {
        TimestampRecord memory record = timestamps[_hash];
        return record.exists && record.owner == _owner;
    }
    
    /**
     * @notice Check if a hash has been timestamped
     * @param _hash The document hash to check
     * @return True if the hash exists in the registry
     */
    function hashExists(bytes32 _hash) external view returns (bool) {
        return timestamps[_hash].exists;
    }
    
    /**
     * @notice Update the fee for timestamping (owner only)
     * @param _newFee The new fee amount in wei
     */
    function setFee(uint256 _newFee) external onlyOwner {
        emit FeeUpdated(fee, _newFee);
        fee = _newFee;
    }
    
    /**
     * @notice Withdraw accumulated fees (owner only)
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        if (balance == 0) revert NoFundsToWithdraw();
        
        emit FundsWithdrawn(owner(), balance);
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        if (!success) revert TransferFailed();
    }
    
    /**
     * @notice Get contract balance
     * @return Current balance in wei
     */
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
