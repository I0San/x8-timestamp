import { useState, useEffect } from 'react'

const navItems = [
  { href: '#home', label: 'HOME' },
  { href: '#features', label: 'FEATURES' },
  { href: '#ai-agents', label: 'AI AGENTS' },
  { href: '#how-it-works', label: 'HOW IT WORKS' },
]

export function Layout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      
      const sections = navItems.filter(item => item.href !== '#home').map(item => item.href.slice(1))
      let currentSection = '#home'
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom > 150) {
            currentSection = `#${sectionId}`
            break
          }
        }
      }
      
      setActiveSection(currentSection)
    }
    
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setMobileMenuOpen(false)
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-x8-border' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <a href="#" className="flex items-center gap-3" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img 
                src="/logo-black.svg" 
                alt="X8 AG" 
                className="h-10 w-auto"
              />
            </a>
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map(item => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-sm font-extrabold tracking-wide transition-colors ${
                    activeSection === item.href
                      ? 'text-x8-gold'
                      : 'text-x8-gray hover:text-x8-dark'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://x8ag.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:block btn btn-outline"
            >
              Login to Portal
            </a>
            <button
              onClick={() => scrollToSection('#contact')}
              className="btn btn-primary"
            >
              Get Started
            </button>
            <button 
              className="lg:hidden p-2 text-x8-dark"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
          <div className="lg:hidden bg-white border-b border-x8-border">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
              {navItems.map(item => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-sm font-extrabold tracking-wide transition-colors text-left ${
                    activeSection === item.href
                      ? 'text-x8-gold'
                      : 'text-x8-gray hover:text-x8-dark'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <a 
                href="https://x8ag.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-extrabold tracking-wide text-x8-gold"
              >
                LOGIN TO PORTAL
              </a>
            </nav>
          </div>
        )}
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="bg-x8-dark text-white py-16" id="contact">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <img 
                src="/logo-white.svg" 
                alt="X8 AG" 
                className="h-8 w-auto mb-6"
              />
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Swiss-compliant digital identity solutions for enterprises and the AI-powered future.
              </p>
              {/* <div className="flex gap-4">
                <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-x8-gold hover:text-x8-gold transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-x8-gold hover:text-x8-gold transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div> */}
            </div>
            
            <div>
              <h4 className="text-sm font-semibold tracking-wide mb-6 uppercase">X8 Ecosystem</h4>
              <ul className="space-y-3 text-white/60 text-sm">
                <li><a href="#features" className="hover:text-x8-gold transition-colors">AI Agent Identity</a></li>
                <li><a href="https://x8ag.io" target="_blank" rel="noopener noreferrer" className="hover:text-x8-gold transition-colors">X8 Stablecoins</a></li>
                <li><a href="https://timestamping.x8ag.io" target="_blank" rel="noopener noreferrer" className="hover:text-x8-gold transition-colors">Blockchain Timestamping</a></li>
                <li><a href="https://timestamping.x8ag.io" target="_blank" rel="noopener noreferrer" className="hover:text-x8-gold transition-colors">Certificates & Provenance</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold tracking-wide mb-6 uppercase">Company</h4>
              <ul className="space-y-3 text-white/60 text-sm">
                <li><a href="https://x8ag.io" target="_blank" rel="noopener noreferrer" className="hover:text-x8-gold transition-colors">About X8</a></li>
                <li><a href="https://x8ag.io" target="_blank" rel="noopener noreferrer" className="hover:text-x8-gold transition-colors">Press</a></li>
                <li><a href="https://x8ag.io/news/" target="_blank" rel="noopener noreferrer" className="hover:text-x8-gold transition-colors">Blog</a></li>
                <li><a href="https://x8ag.io" target="_blank" rel="noopener noreferrer" className="hover:text-x8-gold transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold tracking-wide mb-6 uppercase">Contact</h4>
              <ul className="space-y-3 text-white/60 text-sm">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-x8-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Ruessenstrasse 5<br />6340 Baar, Switzerland</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-x8-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@x8ag.io</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/40">
                © {new Date().getFullYear()} X8 AG. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-6 text-xs text-white/40">
              <a href="#" className="hover:text-x8-gold transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-x8-gold transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-x8-gold transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
