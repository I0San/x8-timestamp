import { Link } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { BlockchainParticles } from '../components/BlockchainParticles'

export function HomePage() {
  const { isConnected } = useAccount()
  
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-white via-white to-primary-50 border-b border-x8-border overflow-hidden">
        <BlockchainParticles />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 rounded-full mb-6">
            <span className="w-2 h-2 bg-x8-gold rounded-full animate-pulse" />
            <span className="text-sm font-semibold tracking-wide text-x8-gold uppercase">
              X8 Timestamping Service
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold text-x8-dark mb-6 tracking-tight leading-tight">
            Swiss-Compliant<br />
            <span className="text-x8-gold">Blockchain Timestamping</span>
          </h1>
          <p className="text-lg md:text-xl text-x8-gray max-w-2xl mx-auto mb-12 leading-relaxed">
            Create immutable, tamper-proof timestamps for your documents. 
            Prove existence and ownership with Swiss precision and security.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/timestamp" className="btn btn-primary px-10 py-4 text-base font-bold shadow-lg shadow-x8-gold/20 hover:shadow-xl hover:shadow-x8-gold/30 transition-shadow">
              Timestamp a Document
            </Link>
            <Link to="/validate" className="btn btn-outline px-10 py-4 text-base font-bold">
              Verify a Document
            </Link>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-20">
        
        {/* Feature Cards */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-widest text-x8-gold mb-3 uppercase">Why Choose X8</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-x8-dark">Enterprise-Grade Security</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <div className="card-hover group cursor-default">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-x8-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-x8-dark mb-2 tracking-tight">Privacy Preserved</h3>
            <p className="text-x8-gray text-sm leading-relaxed">
              Your documents never leave your device. Only a cryptographic hash is stored on the blockchain.
            </p>
          </div>
          
          <div className="card-hover group cursor-default">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-x8-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-x8-dark mb-2 tracking-tight">Immutable Proof</h3>
            <p className="text-x8-gray text-sm leading-relaxed">
              Once recorded on the blockchain, your timestamp cannot be altered or deleted by anyone.
            </p>
          </div>
          
          <div className="card-hover group cursor-default">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-x8-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-x8-dark mb-2 tracking-tight">Globally Verifiable</h3>
            <p className="text-x8-gray text-sm leading-relaxed">
              Anyone can verify your document's timestamp using the public blockchain, anytime, anywhere.
            </p>
          </div>
          
          <div className="card-hover group cursor-default">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-x8-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-x8-dark mb-2 tracking-tight">Swiss Compliant</h3>
            <p className="text-x8-gray text-sm leading-relaxed">
              Built to meet regulatory standards with transparent, auditable blockchain records.
            </p>
          </div>
        </div>
        
        {/* How It Works Section */}
        <div className="bg-white border border-x8-border p-8 md:p-12 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest text-x8-gold mb-3 uppercase">Simple Process</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-x8-dark">How It Works</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
            {/* Connecting line - desktop only */}
            <div className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-x8-gold via-x8-gold to-x8-gold opacity-30" />
            
            <div className="text-center relative">
              <div className="w-16 h-16 bg-x8-gold text-white flex items-center justify-center mx-auto mb-6 text-xl font-semibold relative z-10 shadow-lg shadow-x8-gold/30">
                1
              </div>
              <h3 className="font-semibold text-lg mb-3 text-x8-dark">Upload Document</h3>
              <p className="text-x8-gray text-sm leading-relaxed">
                Select any file from your device. It's processed locally and never leaves your computer.
              </p>
            </div>
            
            <div className="text-center relative">
              <div className="w-16 h-16 bg-x8-gold text-white flex items-center justify-center mx-auto mb-6 text-xl font-semibold relative z-10 shadow-lg shadow-x8-gold/30">
                2
              </div>
              <h3 className="font-semibold text-lg mb-3 text-x8-dark">Generate Hash & Pay</h3>
              <p className="text-x8-gray text-sm leading-relaxed">
                A unique SHA-256 hash is computed locally. Confirm the transaction in your wallet.
              </p>
            </div>
            
            <div className="text-center relative">
              <div className="w-16 h-16 bg-x8-gold text-white flex items-center justify-center mx-auto mb-6 text-xl font-semibold relative z-10 shadow-lg shadow-x8-gold/30">
                3
              </div>
              <h3 className="font-semibold text-lg mb-3 text-x8-dark">Receive Certificate</h3>
              <p className="text-x8-gray text-sm leading-relaxed">
                Get a blockchain certificate proving your document existed at that exact moment.
              </p>
            </div>
          </div>
          
          {!isConnected && (
            <div className="mt-12 p-8 bg-gradient-to-r from-primary-50 to-white border border-primary-200 text-center">
              <div className="w-12 h-12 bg-x8-gold/10 border border-x8-gold/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-x8-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-x8-dark mb-2 font-semibold text-lg">
                Connect your wallet to get started
              </p>
              <p className="text-sm text-x8-gray max-w-md mx-auto">
                You'll need a Web3 wallet like MetaMask and some Sepolia ETH for gas fees to create timestamps.
              </p>
            </div>
          )}
          
          {isConnected && (
            <div className="mt-12 text-center">
              <Link to="/timestamp" className="btn btn-primary px-10 py-4 text-base shadow-lg shadow-x8-gold/20 hover:shadow-xl hover:shadow-x8-gold/30 transition-shadow inline-flex items-center gap-2">
                Start Timestamping
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          )}
        </div>
        
        {/* X8 Ecosystem Section */}
        <div className="mt-20 bg-x8-dark text-white p-8 md:p-12">
          <div className="text-center mb-8">
            <p className="text-x8-gold text-sm font-semibold uppercase tracking-wide mb-3">Part of the X8 Ecosystem</p>
            <h3 className="text-2xl md:text-3xl font-semibold mb-4">
              Swiss-Compliant Digital Trust Infrastructure
            </h3>
            <p className="text-white/70 max-w-2xl mx-auto">
              Timestamping is one component of the X8 ecosystem. Explore our complete suite of Swiss-compliant blockchain services.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <a 
              href="https://identity.x8ag.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-6 bg-white/5 border border-white/10 hover:border-x8-gold/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-x8-gold/20 border border-x8-gold/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-x8-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-2">AI Agent Identity</h4>
              <p className="text-sm text-white/60">Accountable AI with verified DIDs, owner binding, and immutable audit trails.</p>
            </a>
            
            <a 
              href="https://x8ag.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-6 bg-white/5 border border-white/10 hover:border-x8-gold/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-x8-gold/20 border border-x8-gold/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-x8-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-2">X8 Stablecoins</h4>
              <p className="text-sm text-white/60">8 major currencies (CHF, EUR, USD, GBP, JPY, CAD, NZD, AUD) with on-chain compliance.</p>
            </a>
            
            <div className="p-6 bg-x8-gold/10 border border-x8-gold/30">
              <div className="w-12 h-12 bg-x8-gold/20 border border-x8-gold/30 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-x8-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-2 text-x8-gold">Blockchain Timestamping</h4>
              <p className="text-sm text-white/60">You are here. Immutable proof of existence with certificates of authenticity.</p>
            </div>
          </div>
        </div>
        
        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-x8-gray text-sm">
            Trusted by professionals who demand <span className="text-x8-gold font-medium">Swiss-grade security</span> for their documents.
          </p>
        </div>
      </div>
    </div>
  )
}
