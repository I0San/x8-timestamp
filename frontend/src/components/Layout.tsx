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
      
      <footer className="bg-white border-t border-x8-border py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo-black.svg" 
                alt="X8 AG" 
                className="h-6 w-auto opacity-70"
              />
              <span className="text-xs text-x8-gray">Swiss Precision in Digital Trust</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="inline-flex items-center gap-2 text-xs text-x8-gray">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Sepolia Testnet
              </span>
              <p className="text-xs text-x8-gray">
                © {new Date().getFullYear()} X8 AG
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
