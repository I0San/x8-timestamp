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
                  className={`text-sm font-medium tracking-wide transition-colors ${
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
          <ConnectButton 
            showBalance={false}
            chainStatus="icon"
            accountStatus="address"
          />
        </div>
      </header>
      
      <main className="flex-1 bg-x8-gray-light">
        {children}
      </main>
      
      <footer className="bg-white border-t border-x8-border py-6">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/logo-black.svg" 
              alt="X8 AG" 
              className="h-6 w-auto opacity-60"
            />
          </div>
          <p className="text-sm text-x8-gray">
            Timestamping Service - Sepolia Testnet
          </p>
        </div>
      </footer>
    </div>
  )
}
