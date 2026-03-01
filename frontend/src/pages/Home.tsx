import { Link } from 'react-router-dom'
import { useAccount } from 'wagmi'

export function HomePage() {
  const { isConnected } = useAccount()
  
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-semibold text-x8-dark mb-4 tracking-tight">
          Document Timestamping
        </h1>
        <p className="text-lg text-x8-gray max-w-2xl mx-auto mb-8">
          Create immutable, tamper-proof timestamps for your documents. 
          Prove document existence and ownership with blockchain technology.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/timestamp" className="btn btn-primary px-8 py-3">
            Timestamp a Document
          </Link>
          <Link to="/validate" className="btn btn-outline px-8 py-3">
            Verify a Document
          </Link>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="card text-center">
          <div className="w-12 h-12 bg-primary-50 border border-primary-200 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-x8-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="section-title mb-2">Privacy Preserved</h3>
          <p className="text-x8-gray text-sm">
            Your documents never leave your device. Only a cryptographic hash is stored on the blockchain.
          </p>
        </div>
        
        <div className="card text-center">
          <div className="w-12 h-12 bg-primary-50 border border-primary-200 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-x8-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="section-title mb-2">Immutable Proof</h3>
          <p className="text-x8-gray text-sm">
            Once recorded on the blockchain, your timestamp cannot be altered or deleted by anyone.
          </p>
        </div>
        
        <div className="card text-center">
          <div className="w-12 h-12 bg-primary-50 border border-primary-200 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-x8-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <h3 className="section-title mb-2">Globally Verifiable</h3>
          <p className="text-x8-gray text-sm">
            Anyone can verify your document's timestamp using the public blockchain, anytime, anywhere.
          </p>
        </div>
      </div>
      
      <div className="card max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-6 text-center text-x8-dark">How It Works</h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-x8-gold text-white flex items-center justify-center flex-shrink-0 font-medium text-sm">
              1
            </div>
            <div>
              <h3 className="font-medium mb-1 text-x8-dark">Upload Your Document</h3>
              <p className="text-x8-gray text-sm">
                Select any file from your device. The file is processed locally in your browser — it never leaves your computer.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-x8-gold text-white flex items-center justify-center flex-shrink-0 font-medium text-sm">
              2
            </div>
            <div>
              <h3 className="font-medium mb-1 text-x8-dark">Generate Hash & Pay</h3>
              <p className="text-x8-gray text-sm">
                A unique SHA-256 hash is computed from your file. Confirm the transaction in your wallet to record the hash on Ethereum.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-x8-gold text-white flex items-center justify-center flex-shrink-0 font-medium text-sm">
              3
            </div>
            <div>
              <h3 className="font-medium mb-1 text-x8-dark">Receive Your Certificate</h3>
              <p className="text-x8-gray text-sm">
                Once confirmed, you'll receive a blockchain certificate proving your document existed at that exact moment in time.
              </p>
            </div>
          </div>
        </div>
        
        {!isConnected && (
          <div className="mt-8 p-4 bg-primary-50 border border-primary-200 text-center">
            <p className="text-x8-dark mb-1 font-medium">
              Connect your wallet to get started
            </p>
            <p className="text-sm text-x8-gray">
              You'll need a wallet like MetaMask and some Sepolia ETH for gas fees
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
