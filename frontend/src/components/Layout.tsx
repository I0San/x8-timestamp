import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const navItems = [
  { path: '/', label: 'HOME' },
  { path: '/timestamp', label: 'TIMESTAMP' },
  { path: '/activity', label: 'ACTIVITY' },
  { path: '/validate', label: 'VALIDATE' },
]

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-white border-b border-x8-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="/logo-black.svg" 
                alt="X8 AG" 
                className="h-10 w-auto"
              />
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-extrabold tracking-wide transition-colors ${
                    location.pathname === item.path
                      ? 'text-x8-gold'
                      : 'text-x8-gray hover:text-x8-dark'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <ConnectButton 
              showBalance={false}
              chainStatus="icon"
              accountStatus="address"
            />
            <button 
              className="md:hidden p-2 text-x8-dark"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-x8-border">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-extrabold tracking-wide transition-colors ${
                    location.pathname === item.path
                      ? 'text-x8-gold'
                      : 'text-x8-gray hover:text-x8-dark'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
      
      <main className="flex-1 bg-x8-gray-light">
        {children}
      </main>
      
      <footer className="bg-x8-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <img 
                src="/logo-white.svg" 
                alt="X8 AG" 
                className="h-8 w-auto mb-4"
              />
              <p className="text-white/60 text-sm leading-relaxed">
                Swiss-compliant blockchain timestamping and certificates of authenticity.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold tracking-wide mb-4 uppercase">X8 Ecosystem</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="https://identity.x8ag.io" target="_blank" rel="noopener noreferrer" className="hover:text-x8-gold transition-colors">AI Agent Identity</a></li>
                <li><a href="https://x8ag.io" target="_blank" rel="noopener noreferrer" className="hover:text-x8-gold transition-colors">X8 Stablecoins</a></li>
                <li><span className="text-x8-gold">Blockchain Timestamping</span></li>
                <li><Link to="/validate" className="hover:text-x8-gold transition-colors">Certificates & Provenance</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold tracking-wide mb-4 uppercase">Company</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="https://x8ag.io" target="_blank" rel="noopener noreferrer" className="hover:text-x8-gold transition-colors">About X8</a></li>
                <li><a href="https://x8ag.io/news/" target="_blank" rel="noopener noreferrer" className="hover:text-x8-gold transition-colors">Blog</a></li>
                <li><a href="mailto:info@x8ag.io" className="hover:text-x8-gold transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-2 text-xs text-white/40">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Sepolia Testnet
              </span>
              <span className="text-xs text-white/40">
                © {new Date().getFullYear()} X8 AG. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-6 text-xs text-white/40">
              <a href="https://x8ag.io/privacy-policy/" target="_blank" rel="noopener noreferrer" className="hover:text-x8-gold transition-colors">Privacy Policy</a>
              <a href="https://x8ag.io" target="_blank" rel="noopener noreferrer" className="hover:text-x8-gold transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
