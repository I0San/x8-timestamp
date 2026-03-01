import { useGetTimestamp } from '../hooks/useTimestamp'
import { formatTimestamp } from '../lib/hash'
import { generateCertificatePDF } from '../lib/certificate'

interface CertificateViewProps {
  hash: `0x${string}`
  transactionHash?: `0x${string}`
}

export function CertificateView({ hash, transactionHash }: CertificateViewProps) {
  const { timestamp, isLoading, error } = useGetTimestamp(hash)
  
  if (isLoading) {
    return (
      <div className="card animate-pulse">
        <div className="h-8 bg-x8-gray-light w-1/3 mb-6" />
        <div className="space-y-4">
          <div className="h-4 bg-x8-gray-light w-full" />
          <div className="h-4 bg-x8-gray-light w-3/4" />
          <div className="h-4 bg-x8-gray-light w-1/2" />
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="card text-center py-12">
        <svg className="w-16 h-16 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="section-title mb-2">Error Loading Certificate</h3>
        <p className="text-x8-gray">{error.message}</p>
      </div>
    )
  }
  
  if (!timestamp) {
    return (
      <div className="card text-center py-12">
        <svg className="w-16 h-16 text-x8-border mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="section-title mb-2">Certificate Not Found</h3>
        <p className="text-x8-gray">No timestamp record found for this hash</p>
      </div>
    )
  }
  
  const handleDownloadPDF = () => {
    generateCertificatePDF({
      documentHash: hash,
      owner: timestamp.owner,
      timestamp: timestamp.timestamp,
      blockNumber: timestamp.blockNumber,
      metadata: timestamp.metadata,
      transactionHash,
    })
  }
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }
  
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-50 border border-primary-200 flex items-center justify-center">
            <svg className="w-5 h-5 text-x8-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h2 className="section-title">Blockchain Certificate</h2>
            <p className="text-sm text-x8-gray">Verified timestamp on Ethereum</p>
          </div>
        </div>
        <button onClick={handleDownloadPDF} className="btn btn-primary flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download PDF
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="p-4 bg-x8-gray-light border border-x8-border">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-x8-gray">Document Hash</span>
            <button
              onClick={() => copyToClipboard(hash)}
              className="text-xs text-x8-gold hover:underline"
            >
              Copy
            </button>
          </div>
          <p className="font-mono text-sm break-all text-x8-dark">{hash}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-x8-gray-light border border-x8-border">
            <span className="text-sm text-x8-gray block mb-1">Timestamp</span>
            <p className="font-medium text-x8-dark">{formatTimestamp(timestamp.timestamp)}</p>
          </div>
          <div className="p-4 bg-x8-gray-light border border-x8-border">
            <span className="text-sm text-x8-gray block mb-1">Block Number</span>
            <p className="font-medium text-x8-dark">{timestamp.blockNumber.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="p-4 bg-x8-gray-light border border-x8-border">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-x8-gray">Owner Address</span>
            <button
              onClick={() => copyToClipboard(timestamp.owner)}
              className="text-xs text-x8-gold hover:underline"
            >
              Copy
            </button>
          </div>
          <a
            href={`https://sepolia.etherscan.io/address/${timestamp.owner}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-x8-gold hover:underline break-all"
          >
            {timestamp.owner}
          </a>
        </div>
        
        {timestamp.metadata && (
          <div className="p-4 bg-x8-gray-light border border-x8-border">
            <span className="text-sm text-x8-gray block mb-1">Description</span>
            <p className="font-medium text-x8-dark">{timestamp.metadata}</p>
          </div>
        )}
        
        {transactionHash && (
          <div className="p-4 bg-x8-gray-light border border-x8-border">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-x8-gray">Transaction Hash</span>
              <button
                onClick={() => copyToClipboard(transactionHash)}
                className="text-xs text-x8-gold hover:underline"
              >
                Copy
              </button>
            </div>
            <a
              href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-x8-gold hover:underline break-all"
            >
              {transactionHash}
            </a>
          </div>
        )}
      </div>
      
      <div className="mt-6 p-4 border border-x8-border">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-x8-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm">
            <p className="font-medium text-x8-dark mb-1">How to verify this certificate</p>
            <p className="text-x8-gray">
              This timestamp is permanently recorded on the Ethereum Sepolia blockchain. 
              Anyone can verify the document's authenticity by computing its SHA-256 hash 
              and checking it against this certificate.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
