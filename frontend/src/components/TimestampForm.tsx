import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { formatEther } from 'viem'
import { FileUpload } from './FileUpload'
import { useFileHash } from '../hooks/useFileHash'
import { useRegisterTimestamp, useTimestampFee, useHashExists } from '../hooks/useTimestamp'
import { formatHash } from '../lib/hash'

interface TimestampFormProps {
  onSuccess?: (hash: `0x${string}`, txHash: `0x${string}`) => void
}

export function TimestampForm({ onSuccess }: TimestampFormProps) {
  const { isConnected } = useAccount()
  const { file, hash, isHashing, error: hashError, processFile, reset: resetFile } = useFileHash()
  const { fee, isLoading: feeLoading } = useTimestampFee()
  const { exists, isLoading: existsLoading } = useHashExists(hash || undefined)
  const { register, txHash, isPending, isConfirming, isSuccess, error: txError, reset: resetTx } = useRegisterTimestamp()
  
  const [metadata, setMetadata] = useState('')
  const [step, setStep] = useState<'upload' | 'confirm' | 'pending' | 'success'>('upload')
  
  useEffect(() => {
    if (hash && !exists && !existsLoading) {
      setStep('confirm')
    }
  }, [hash, exists, existsLoading])
  
  useEffect(() => {
    if (isPending || isConfirming) {
      setStep('pending')
    }
  }, [isPending, isConfirming])
  
  useEffect(() => {
    if (isSuccess && txHash && hash) {
      setStep('success')
      onSuccess?.(hash, txHash)
    }
  }, [isSuccess, txHash, hash, onSuccess])
  
  const handleSubmit = () => {
    if (!hash || !fee) return
    register(hash, metadata || file?.name || '', fee)
  }
  
  const handleReset = () => {
    resetFile()
    resetTx()
    setMetadata('')
    setStep('upload')
  }
  
  if (!isConnected) {
    return (
      <div className="card text-center py-12">
        <svg className="w-16 h-16 text-x8-border mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <h3 className="section-title mb-2">Connect Your Wallet</h3>
        <p className="text-x8-gray">Connect your wallet to start timestamping documents</p>
      </div>
    )
  }
  
  if (step === 'success' && hash && txHash) {
    return (
      <div className="card text-center py-12">
        <div className="w-16 h-16 bg-primary-50 border border-primary-200 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-x8-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="section-title mb-2">Timestamp Created!</h3>
        <p className="text-x8-gray mb-6">Your document has been timestamped on the blockchain</p>
        
        <div className="bg-x8-gray-light border border-x8-border p-4 text-left mb-6 max-w-md mx-auto">
          <div className="mb-3">
            <p className="text-xs text-x8-gray mb-1">Document Hash</p>
            <p className="text-sm font-mono break-all text-x8-dark">{hash}</p>
          </div>
          <div>
            <p className="text-xs text-x8-gray mb-1">Transaction</p>
            <a
              href={`https://sepolia.etherscan.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono text-x8-gold hover:underline break-all"
            >
              {formatHash(txHash, 12)}
            </a>
          </div>
        </div>
        
        <div className="flex gap-3 justify-center">
          <a
            href={`/certificate/${hash}`}
            className="btn btn-primary"
          >
            View Certificate
          </a>
          <button onClick={handleReset} className="btn btn-outline">
            Timestamp Another
          </button>
        </div>
      </div>
    )
  }
  
  if (step === 'pending') {
    return (
      <div className="card text-center py-12">
        <div className="w-16 h-16 border-4 border-primary-100 border-t-x8-gold animate-spin mx-auto mb-4" />
        <h3 className="section-title mb-2">
          {isPending ? 'Confirm in Wallet' : 'Confirming Transaction'}
        </h3>
        <p className="text-x8-gray">
          {isPending
            ? 'Please confirm the transaction in your wallet'
            : 'Waiting for blockchain confirmation...'}
        </p>
        {txHash && (
          <a
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-x8-gold hover:underline mt-4 inline-block"
          >
            View on Etherscan
          </a>
        )}
      </div>
    )
  }
  
  return (
    <div className="card">
      <h2 className="section-title mb-6">Timestamp a Document</h2>
      
      <FileUpload
        file={file}
        hash={hash}
        isHashing={isHashing}
        error={hashError}
        onFileSelect={processFile}
        onReset={handleReset}
        disabled={step !== 'upload' && step !== 'confirm'}
      />
      
      {exists && (
        <div className="mt-4 p-4 bg-primary-50 border border-primary-200">
          <div className="flex items-center gap-2 text-x8-dark">
            <svg className="w-5 h-5 text-x8-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-medium">Document already timestamped</span>
          </div>
          <p className="text-sm text-x8-gray mt-1">
            This document has already been registered on the blockchain.
          </p>
          <a
            href={hash ? `/certificate/${hash}` : '#'}
            className="text-sm text-x8-gold hover:underline mt-2 inline-block"
          >
            View existing certificate
          </a>
        </div>
      )}
      
      {step === 'confirm' && hash && !exists && (
        <>
          <div className="mt-6">
            <label className="block text-sm font-medium text-x8-dark mb-2">
              Description (optional)
            </label>
            <input
              type="text"
              value={metadata}
              onChange={(e) => setMetadata(e.target.value)}
              placeholder={file?.name || 'Enter a description'}
              maxLength={256}
              className="input"
            />
          </div>
          
          <div className="mt-6 p-4 bg-x8-gray-light border border-x8-border">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-x8-gray">Timestamping Fee</span>
              <span className="font-medium text-x8-dark">
                {feeLoading ? '...' : fee ? `${formatEther(fee)} ETH` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-x8-gray">Network</span>
              <span className="font-medium text-x8-dark">Sepolia Testnet</span>
            </div>
          </div>
          
          {txError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200">
              <p className="text-sm text-red-700">
                {txError.message || 'Transaction failed. Please try again.'}
              </p>
            </div>
          )}
          
          <button
            onClick={handleSubmit}
            disabled={!fee || isPending}
            className="btn btn-primary w-full mt-6"
          >
            Timestamp Document
          </button>
        </>
      )}
    </div>
  )
}
