import { ArrowRightIcon } from '../components/Icons'

export function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative bg-x8-dark text-white p-12 md:p-20 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-x8-gold/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-x8-gold/5 rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-8">
              <span className="w-2 h-2 bg-x8-gold rounded-full animate-pulse" />
              <span className="text-sm font-medium">Enterprise Ready</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tight">
              Your Agents Act.<br />
              <span className="text-x8-gold">You Stay Accountable.</span>
            </h2>
            
            <p className="text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
              Deploy AI agents across your organization with the confidence that every action 
              is tracked, every decision is auditable, and every responsibility is clear.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-10 mt-10 border-t border-white/10">
              <a 
                href="mailto:info@x8ag.io"
                className="btn bg-x8-gold text-x8-dark hover:bg-x8-gold-light px-10 py-4 text-base font-bold shadow-lg shadow-x8-gold/20 hover:shadow-xl hover:shadow-x8-gold/30 transition-all inline-flex items-center justify-center gap-2 group"
              >
                Schedule a Demo
                <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a 
                href="#pricing"
                className="btn bg-transparent text-white border border-white/30 hover:border-white px-10 py-4 text-base font-bold inline-flex items-center justify-center"
              >
                Tiers
              </a>
            </div>
            
          </div>
        </div>
        
        <div id="pricing" className="mt-20 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-semibold text-x8-dark text-center mb-12">
            Choose Your Plan
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
          <div className="border border-x8-border p-8 hover:border-x8-gold transition-colors">
            <div className="text-x8-gold text-sm font-semibold mb-4 uppercase tracking-wide">For Enterprises</div>
            <h3 className="text-xl font-semibold text-x8-dark mb-3">Full Identity Suite</h3>
            <p className="text-sm text-x8-gray leading-relaxed mb-6">
              Complete digital identity infrastructure with KYC, credentials, e-signatures, 
              and AI agent management.
            </p>
            <ul className="space-y-2 mb-6">
              {['Unlimited users', 'Full API access', 'Dedicated support', 'Custom integrations'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-x8-dark">
                  <svg className="w-4 h-4 text-x8-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <a href="mailto:info@x8ag.io" className="text-x8-gold font-semibold text-sm hover:underline inline-flex items-center gap-1">
              Contact Sales <ArrowRightIcon className="w-4 h-4" />
            </a>
          </div>
          
          <div className="border border-x8-gold bg-primary-50/50 p-8 relative">
            <div className="absolute top-0 right-0 px-3 py-1 bg-x8-gold text-x8-dark text-xs font-bold">
              POPULAR
            </div>
            <div className="text-x8-gold text-sm font-semibold mb-4 uppercase tracking-wide">For AI-First Companies</div>
            <h3 className="text-xl font-semibold text-x8-dark mb-3">AI Agent Framework</h3>
            <p className="text-sm text-x8-gray leading-relaxed mb-6">
              The complete accountability layer for organizations deploying autonomous AI agents 
              at scale.
            </p>
            <ul className="space-y-2 mb-6">
              {['Unlimited agent DIDs', 'Immutable audit trail', 'Compliance reporting', 'Owner accountability'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-x8-dark">
                  <svg className="w-4 h-4 text-x8-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <a href="mailto:info@x8ag.io" className="text-x8-gold font-semibold text-sm hover:underline inline-flex items-center gap-1">
              Learn More <ArrowRightIcon className="w-4 h-4" />
            </a>
          </div>
          
          <div className="border border-x8-border p-8 hover:border-x8-gold transition-colors">
            <div className="text-x8-gold text-sm font-semibold mb-4 uppercase tracking-wide">For Developers</div>
            <h3 className="text-xl font-semibold text-x8-dark mb-3">API Access</h3>
            <p className="text-sm text-x8-gray leading-relaxed mb-6">
              RESTful and GraphQL APIs for seamless integration into your existing 
              AI orchestration and automation platforms.
            </p>
            <ul className="space-y-2 mb-6">
              {['Sandbox environment', 'SDKs for major languages', 'Webhook notifications', 'Comprehensive docs'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-x8-dark">
                  <svg className="w-4 h-4 text-x8-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <a href="https://docs.x8.ch" target="_blank" rel="noopener noreferrer" className="text-x8-gold font-semibold text-sm hover:underline inline-flex items-center gap-1">
              View Docs <ArrowRightIcon className="w-4 h-4" />
            </a>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
