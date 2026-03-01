import { useWriteContract, useWaitForTransactionReceipt, useReadContract, useAccount } from 'wagmi'
import { TIMESTAMP_REGISTRY_ADDRESS, TIMESTAMP_REGISTRY_ABI } from '../lib/contracts'

export function useRegisterTimestamp() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })
  
  const register = (documentHash: `0x${string}`, metadata: string, fee: bigint) => {
    writeContract({
      address: TIMESTAMP_REGISTRY_ADDRESS,
      abi: TIMESTAMP_REGISTRY_ABI,
      functionName: 'registerTimestamp',
      args: [documentHash, metadata],
      value: fee,
    })
  }
  
  return {
    register,
    txHash: hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
    reset,
  }
}

export function useTimestampFee() {
  const { data, isLoading, error } = useReadContract({
    address: TIMESTAMP_REGISTRY_ADDRESS,
    abi: TIMESTAMP_REGISTRY_ABI,
    functionName: 'fee',
  })
  
  return {
    fee: data as bigint | undefined,
    isLoading,
    error,
  }
}

export function useGetTimestamp(hash: `0x${string}` | undefined) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: TIMESTAMP_REGISTRY_ADDRESS,
    abi: TIMESTAMP_REGISTRY_ABI,
    functionName: 'getTimestamp',
    args: hash ? [hash] : undefined,
    query: {
      enabled: !!hash,
    },
  })
  
  if (!data) {
    return { timestamp: null, isLoading, error, refetch }
  }
  
  const [owner, timestamp, blockNumber, metadata, exists] = data as [string, bigint, bigint, string, boolean]
  
  return {
    timestamp: exists ? {
      owner,
      timestamp: Number(timestamp),
      blockNumber: Number(blockNumber),
      metadata,
      exists,
    } : null,
    isLoading,
    error,
    refetch,
  }
}

export function useUserTimestamps() {
  const { address } = useAccount()
  
  const { data, isLoading, error, refetch } = useReadContract({
    address: TIMESTAMP_REGISTRY_ADDRESS,
    abi: TIMESTAMP_REGISTRY_ABI,
    functionName: 'getUserTimestamps',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })
  
  return {
    hashes: (data as `0x${string}`[] | undefined) || [],
    isLoading,
    error,
    refetch,
  }
}

export function useHashExists(hash: `0x${string}` | undefined) {
  const { data, isLoading, error } = useReadContract({
    address: TIMESTAMP_REGISTRY_ADDRESS,
    abi: TIMESTAMP_REGISTRY_ABI,
    functionName: 'hashExists',
    args: hash ? [hash] : undefined,
    query: {
      enabled: !!hash,
    },
  })
  
  return {
    exists: data as boolean | undefined,
    isLoading,
    error,
  }
}
