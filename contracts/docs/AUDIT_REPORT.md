# Security Audit Report: TimestampRegistry

**Contract:** TimestampRegistry.sol  
**Version:** Solidity ^0.8.20  
**Auditor:** Smart Contract Security Review  
**Date:** March 2026  

---

## Executive Summary

The TimestampRegistry contract is a relatively simple registry for timestamping document hashes on-chain. The contract follows many best practices and uses OpenZeppelin's battle-tested libraries. Overall, the contract is **well-designed** with a **low risk profile**.

| Severity | Count |
|----------|-------|
| Critical | 0 |
| High | 0 |
| Medium | 1 |
| Low | 3 |
| Informational | 5 |

---

## Contract Overview

### Purpose
The contract allows users to register SHA-256 document hashes with timestamps, providing immutable proof of existence at a specific point in time.

### Key Features
- Document hash registration with metadata
- Fee-based service model
- Owner-controlled fee management
- Excess payment refund mechanism

### Dependencies
- OpenZeppelin Ownable (access control)
- OpenZeppelin ReentrancyGuard (reentrancy protection)

---

## Findings

### Medium Severity

#### M-01: Event Emission Before State Change in `setFee()`

**Location:** Line 166-167

```solidity
function setFee(uint256 _newFee) external onlyOwner {
    emit FeeUpdated(fee, _newFee);
    fee = _newFee;
}
```

**Description:**  
The event is emitted before the state variable is updated. While not exploitable in this context (function is `onlyOwner`), this violates the Checks-Effects-Interactions pattern and could cause issues with off-chain indexers expecting events to reflect completed state changes.

**Recommendation:**  
Emit events after state changes:

```solidity
function setFee(uint256 _newFee) external onlyOwner {
    uint256 oldFee = fee;
    fee = _newFee;
    emit FeeUpdated(oldFee, _newFee);
}
```

---

### Low Severity

#### L-01: Missing Zero-Address Validation in Constructor

**Location:** Line 46-48

**Description:**  
The contract inherits from `Ownable(msg.sender)` which sets the deployer as owner. However, there's no explicit check that `msg.sender` is not address(0). While practically impossible for `msg.sender` to be zero in a deployment, explicit validation is a defensive best practice.

**Recommendation:**  
No action required - this is more informational. OpenZeppelin's Ownable already handles this case.

---

#### L-02: Unbounded Array Growth in `userTimestamps`

**Location:** Line 24, 77

```solidity
mapping(address => bytes32[]) private userTimestamps;
// ...
userTimestamps[msg.sender].push(_hash);
```

**Description:**  
The `userTimestamps` array can grow indefinitely. If a user registers thousands of timestamps, calling `getUserTimestamps()` could exceed block gas limits, making the data unretrievable via that function.

**Recommendation:**  
Consider implementing pagination for `getUserTimestamps()`:

```solidity
function getUserTimestampsPaginated(
    address _user,
    uint256 _offset,
    uint256 _limit
) external view returns (bytes32[] memory) {
    bytes32[] storage allHashes = userTimestamps[_user];
    uint256 end = _offset + _limit;
    if (end > allHashes.length) end = allHashes.length;
    if (_offset >= allHashes.length) return new bytes32[](0);
    
    bytes32[] memory result = new bytes32[](end - _offset);
    for (uint256 i = _offset; i < end; i++) {
        result[i - _offset] = allHashes[i];
    }
    return result;
}
```

---

#### L-03: No Maximum Fee Limit

**Location:** Line 165-168

**Description:**  
The owner can set an arbitrarily high fee, potentially making the service unusable. While this is by design (owner trust), a maximum fee cap could provide users with stronger guarantees.

**Recommendation:**  
Consider adding a maximum fee constant:

```solidity
uint256 public constant MAX_FEE = 1 ether;

function setFee(uint256 _newFee) external onlyOwner {
    require(_newFee <= MAX_FEE, "Fee exceeds maximum");
    // ...
}
```

---

### Informational

#### I-01: Consider Using `block.timestamp` Manipulation Awareness

**Location:** Line 71

**Description:**  
`block.timestamp` can be slightly manipulated by miners (up to ~15 seconds). For a timestamping service, this is generally acceptable as the timestamp provides "approximate" proof of existence, and the `blockNumber` provides additional verifiable context.

**Impact:** None - the design is appropriate for the use case.

---

#### I-02: Metadata Storage Cost

**Location:** Lines 19, 65-66, 73

**Description:**  
Storing strings on-chain is expensive. The 256-character limit is reasonable, but users should be aware of gas costs. Consider documenting expected gas costs for various metadata lengths.

**Recommendation:**  
Add NatSpec documentation about gas implications.

---

#### I-03: No Batch Registration Function

**Description:**  
Users who want to timestamp multiple documents must make separate transactions. A batch registration function could improve UX and reduce total gas costs.

**Recommendation:**  
Consider adding:

```solidity
function registerTimestampBatch(
    bytes32[] calldata _hashes,
    string[] calldata _metadatas
) external payable nonReentrant {
    require(_hashes.length == _metadatas.length, "Array length mismatch");
    require(msg.value >= fee * _hashes.length, "Insufficient fee");
    
    for (uint256 i = 0; i < _hashes.length; i++) {
        // registration logic
    }
}
```

---

#### I-04: Consider Adding Pause Functionality

**Description:**  
The contract has no emergency pause mechanism. In case of a discovered vulnerability, the owner cannot halt operations.

**Recommendation:**  
Consider inheriting from OpenZeppelin's `Pausable`:

```solidity
import "@openzeppelin/contracts/utils/Pausable.sol";

contract TimestampRegistry is Ownable, ReentrancyGuard, Pausable {
    function registerTimestamp(...) external payable nonReentrant whenNotPaused {
        // ...
    }
}
```

---

#### I-05: Missing `receive()` Function

**Description:**  
The contract cannot receive plain ETH transfers. This is likely intentional but should be documented. If someone accidentally sends ETH without calling a function, it will revert.

**Impact:** None - this is likely the intended behavior.

---

## Positive Observations

### Security Best Practices Implemented

1. **ReentrancyGuard:** The `registerTimestamp()` function correctly uses the `nonReentrant` modifier, preventing reentrancy attacks during the refund transfer.

2. **Custom Errors:** The contract uses Solidity 0.8.4+ custom errors, which are more gas-efficient than `require` strings and provide better error handling.

3. **Proper Access Control:** Administrative functions (`setFee`, `withdraw`) are properly protected with `onlyOwner`.

4. **Safe ETH Transfers:** The contract uses low-level `call` for ETH transfers with proper success checking, avoiding the issues with `transfer()` and `send()`.

5. **Input Validation:** All user inputs are validated (hash uniqueness, fee amount, metadata length).

6. **Overflow Protection:** Solidity 0.8+ provides built-in overflow/underflow protection.

7. **Immutable Record Design:** Once a timestamp is registered, it cannot be modified or deleted, ensuring data integrity.

---

## Gas Optimization Suggestions

### G-01: Use `unchecked` for Counter Increment

```solidity
// Current
totalTimestamps++;

// Optimized (safe because overflow is practically impossible)
unchecked { totalTimestamps++; }
```

**Savings:** ~50 gas per registration

### G-02: Cache Storage Variables

In `registerTimestamp()`, the `fee` variable is read twice from storage:

```solidity
// Current
if (msg.value < fee) { ... }
if (msg.value > fee) { ... }

// Optimized
uint256 _fee = fee;
if (msg.value < _fee) { ... }
if (msg.value > _fee) { ... }
```

**Savings:** ~100 gas per registration

---

## Test Coverage Recommendations

Ensure tests cover:

1. ✅ Successful timestamp registration
2. ✅ Duplicate hash rejection
3. ✅ Insufficient fee rejection
4. ✅ Metadata length validation
5. ✅ Fee refund mechanism
6. ✅ Owner-only function access control
7. ✅ Withdrawal functionality
8. ⚠️ Reentrancy attack simulation
9. ⚠️ Large user timestamp arrays
10. ⚠️ Edge cases (zero fee, empty metadata, max metadata)

---

## Conclusion

The TimestampRegistry contract is **well-architected** and follows modern Solidity best practices. The identified issues are minor and do not pose significant security risks. The contract is suitable for production deployment after addressing the medium-severity finding (M-01) and considering the low-severity recommendations.

### Risk Rating: **LOW**

The contract's simplicity, use of established libraries, and proper input validation contribute to a low overall risk profile.

---

## Disclaimer

This audit report is not a guarantee of security. The review was conducted to the best of our ability based on the provided source code. Smart contract security is a constantly evolving field, and new vulnerabilities may be discovered over time.
