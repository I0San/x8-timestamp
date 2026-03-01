import { useState } from 'react'
import { FileUpload } from './FileUpload'
import { useFileHash } from '../hooks/useFileHash'
import { useGetTimestamp } from '../hooks/useTimestamp'
import { formatTimestamp, formatAddress } from '../lib/hash'
import { Link } from 'react-router-dom'

type ValidationMode = 'file' | 'hash'

export function ValidatorForm() {
  const [mode, setMode] = useState<ValidationMode>('file')
  const [manualHash, setManualHash] = useState('')
  const [searchHash, setSearchHash] = useState<`0x${string}` | undefined>()
  
  const { file, hash: fileHash, isHashing, error: hashError, processFile, reset } = useFileHash()
  const { timestamp, isLoading, error } = useGetTimestamp(searchHash)
  
  const handleFileValidate = () => {
    if (fileHash) {
      setSearchHash(fileHash)
    }
  }
  
  const handleHashValidate = () => {
    if (manualHash && manualHash.startsWith('0x') && manualHash.length === 66) {
      setSearchHash(manualHash as `0x${string}`)
    }
  }
  
  const handleReset = () => {
    reset()
    setSearchHash(undefined)
    setManualHash('')
  }
  
  const isValidHash = manualHash.startsWith('0x') && manualHash.length === 66
  
  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="section-title mb-4">Validate a Document</h2>
        <p className="text-x8-gray mb-6">
          Verify if a document has been timestamped on the blockchain by uploading it or entering its hash.
        </p>
        
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => { setMode('file'); handleReset() }}
            className={`flex-1 py-2.5 px-4 text-sm font-medium transition-all ${
              mode === 'file'
                ? 'bg-x8-gold text-white'
                : 'bg-x8-gray-light text-x8-gray border border-x8-border hover:border-x8-dark'
            }`}
          >
            Upload File
          </button>
          <button
            onClick={() => { setMode('hash'); handleReset() }}
            className={`flex-1 py-2.5 px-4 text-sm font-medium transition-all ${
              mode === 'hash'
                ? 'bg-x8-gold text-white'
                : 'bg-x8-gray-light text-x8-gray border border-x8-border hover:border-x8-dark'
            }`}
          >
            Enter Hash
          </button>
        </div>
        
        {mode === 'file' ? (
          <div>
            <FileUpload
              file={file}
              hash={fileHash}
              isHashing={isHashing}
              error={hashError}
              onFileSelect={processFile}
              onReset={reset}
            />
            {fileHash && (
              <button
                onClick={handleFileValidate}
                className="btn btn-primary w-full mt-4"
              >
                Validate Document
              </button>
            )}
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-x8-dark mb-2">
              Document Hash (SHA-256)
            </label>
            <input
              type="text"
              value={manualHash}
              onChange={(e) => setManualHash(e.target.value)}
              placeholder="0x..."
              className="input font-mono text-sm"
            />
            {manualHash && !isValidHash && (
              <p className="text-sm text-red-600 mt-2">
                Please enter a valid 66-character hash starting with 0x
              </p>
            )}
            <button
              onClick={handleHashValidate}
              disabled={!isValidHash}
              className="btn btn-primary w-full mt-4"
            >
              Validate Hash
            </button>
          </div>
        )}
      </div>
      
      {searchHash && (
        <div className="card">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="w-10 h-10 border-4 border-primary-100 border-t-x8-gold animate-spin mx-auto mb-4" />
              <p className="text-x8-gray">Searching blockchain...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <svg className="w-12 h-12 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-medium text-x8-dark mb-2">Error</h3>
              <p className="text-x8-gray">{error.message}</p>
            </div>
          ) : timestamp ? (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary-50 border border-primary-200 flex items-center justify-center">
                  <svg className="w-5 h-5 text-x8-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-x8-dark">Document Verified</h3>
                  <p className="text-sm text-x8-gold">This document was timestamped on the blockchain</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between py-2 border-b border-x8-border">
                  <span className="text-x8-gray">Timestamp</span>
                  <span className="font-medium text-x8-dark">{formatTimestamp(timestamp.timestamp)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-x8-border">
                  <span className="text-x8-gray">Block</span>
                  <span className="font-medium text-x8-dark">{timestamp.blockNumber.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-x8-border">
                  <span className="text-x8-gray">Owner</span>
                  <a
                    href={`https://sepolia.etherscan.io/address/${timestamp.owner}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-x8-gold hover:underline"
                  >
                    {formatAddress(timestamp.owner)}
                  </a>
                </div>
                {timestamp.metadata && (
                  <div className="flex justify-between py-2 border-b border-x8-border">
                    <span className="text-x8-gray">Description</span>
                    <span className="font-medium text-x8-dark">{timestamp.metadata}</span>
                  </div>
                )}
              </div>
              
              <Link
                to={`/certificate/${searchHash}`}
                className="btn btn-primary w-full"
              >
                View Full Certificate
              </Link>
            </div>
          ) : (
            <div className="text-center py-8">
              <svg className="w-12 h-12 text-x8-border mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-medium text-x8-dark mb-2">Not Found</h3>
              <p className="text-x8-gray">
                This document has not been timestamped on the blockchain.
              </p>
              <Link to="/timestamp" className="btn btn-primary mt-4 inline-block">
                Timestamp This Document
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
