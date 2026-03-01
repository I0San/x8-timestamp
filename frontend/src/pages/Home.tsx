import { Link } from 'react-router-dom'
import { useAccount } from 'wagmi'

export function HomePage() {
  const { isConnected } = useAccount()
  
  return (
    <div>
      {/* Hero Section - inspired by x8ag.io */}
      <div className="bg-white border-b border-x8-border">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <p className="text-sm font-medium tracking-widest text-x8-gold mb-4 uppercase">
            X8 Timestamping Service
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-x8-dark mb-6 tracking-tight leading-tight">
            Blockchain Document<br />Timestamping
          </h1>
          <p className="text-lg text-x8-gray max-w-2xl mx-auto mb-10 leading-relaxed">
            Create immutable, tamper-proof timestamps for your documents. 
            Prove document existence and ownership with Swiss precision.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/timestamp" className="btn btn-primary px-8 py-3 text-base">
              Timestamp a Document
            </Link>
            <Link to="/validate" className="btn btn-outline px-8 py-3 text-base">
              Verify a Document
            </Link>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-16">
      
      {/* Feature Cards - inspired by x8ag.io layout */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="card hover:border-x8-gold transition-colors">
          <div className="w-12 h-12 bg-primary-50 border border-primary-200 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-x8-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="section-title mb-2">Privacy Preserved</h3>
          <p className="text-x8-gray text-sm leading-relaxed">
            Your documents never leave your device. Only a cryptographic hash is stored on the blockchain.
          </p>
        </div>
        
        <div className="card hover:border-x8-gold transition-colors">
          <div className="w-12 h-12 bg-primary-50 border border-primary-200 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-x8-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="section-title mb-2">Immutable Proof</h3>
          <p className="text-x8-gray text-sm leading-relaxed">
            Once recorded on the blockchain, your timestamp cannot be altered or deleted by anyone.
          </p>
        </div>
        
        <div className="card hover:border-x8-gold transition-colors">
          <div className="w-12 h-12 bg-primary-50 border border-primary-200 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-x8-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <h3 className="section-title mb-2">Globally Verifiable</h3>
          <p className="text-x8-gray text-sm leading-relaxed">
            Anyone can verify your document's timestamp using the public blockchain, anytime, anywhere.
          </p>
        </div>
        
        <div className="card hover:border-x8-gold transition-colors">
          <div className="w-12 h-12 bg-primary-50 border border-primary-200 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-x8-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="section-title mb-2">Swiss Compliant</h3>
          <p className="text-x8-gray text-sm leading-relaxed">
            Built to meet regulatory standards with transparent, auditable blockchain records.
          </p>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="card max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-sm font-medium tracking-widest text-x8-gold mb-2 uppercase">Simple Process</p>
          <h2 className="text-2xl font-semibold text-x8-dark">How It Works</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-x8-gold text-white flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
              1
            </div>
            <h3 className="font-semibold mb-2 text-x8-dark">Upload Document</h3>
            <p className="text-x8-gray text-sm leading-relaxed">
              Select any file from your device. It's processed locally — never leaves your computer.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-x8-gold text-white flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
              2
            </div>
            <h3 className="font-semibold mb-2 text-x8-dark">Generate Hash & Pay</h3>
            <p className="text-x8-gray text-sm leading-relaxed">
              A unique SHA-256 hash is computed. Confirm the transaction in your wallet.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-x8-gold text-white flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
              3
            </div>
            <h3 className="font-semibold mb-2 text-x8-dark">Receive Certificate</h3>
            <p className="text-x8-gray text-sm leading-relaxed">
              Get a blockchain certificate proving your document existed at that moment.
            </p>
          </div>
        </div>
        
        {!isConnected && (
          <div className="mt-10 p-6 bg-primary-50 border border-primary-200 text-center">
            <p className="text-x8-dark mb-2 font-semibold">
              Connect your wallet to get started
            </p>
            <p className="text-sm text-x8-gray">
              You'll need a wallet like MetaMask and some Sepolia ETH for gas fees
            </p>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}
