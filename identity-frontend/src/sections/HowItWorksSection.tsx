import { ArrowRightIcon } from '../components/Icons'

const steps = [
  {
    number: '01',
    title: 'Verify Your Organization',
    description: 'Complete KYC for your organization. This verified identity becomes the root of trust for all AI agents you deploy.',
    details: ['Organization KYC', 'Legal Entity Verification', 'Compliance Check', 'Root DID Creation'],
  },
  {
    number: '02',
    title: 'Register Your Agents',
    description: 'Create a unique DID for each AI agent with defined scopes, permissions, and capability boundaries.',
    details: ['Agent DID Creation', 'Permission Scopes', 'Capability Statements', 'Owner Linking'],
  },
  {
    number: '03',
    title: 'Deploy & Operate',
    description: 'Your agents operate autonomously while every action is logged, timestamped, and linked to your identity.',
    details: ['Action Logging', 'Blockchain Timestamps', 'Real-time Monitoring', 'Alert Thresholds'],
  },
  {
    number: '04',
    title: 'Audit & Report',
    description: 'Generate compliance reports, demonstrate accountability to regulators, and maintain full operational transparency.',
    details: ['Compliance Reports', 'Audit Exports', 'Regulatory Filings', 'Incident Analysis'],
  },
]

export function HowItWorksSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="how-it-works" className="pt-24 md:pt-32 pb-6 md:pb-8 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-20">
          <p className="section-label">Implementation Path</p>
          <h2 className="section-heading mb-6">
            From Zero to Compliant<br className="hidden md:block" /> AI Operations
          </h2>
          <p className="text-lg text-x8-gray max-w-2xl mx-auto">
            Deploy your first accountable AI agent in days, not months. 
            Our framework integrates with your existing AI infrastructure.
          </p>
        </div>
        
        <div className="relative">
          <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-x8-gold/30 to-transparent" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div key={step.number} className="relative group">
                <div className="absolute -top-3 -left-3 w-16 h-16 bg-gradient-to-br from-x8-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative bg-white border border-x8-border p-6 hover:border-x8-gold hover:shadow-lg transition-all h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl font-bold text-x8-gold/20">{step.number}</span>
                    {index < steps.length - 1 && (
                      <div className="hidden lg:flex items-center flex-1 justify-end">
                        <ArrowRightIcon className="w-5 h-5 text-x8-gold/30" />
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-x8-dark mb-3">{step.title}</h3>
                  <p className="text-sm text-x8-gray leading-relaxed mb-6">{step.description}</p>
                  
                  <div className="space-y-2">
                    {step.details.map((detail) => (
                      <div key={detail} className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-x8-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-x8-gray">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
{/* Enterprise Deployment section - commented out
        <div className="mt-20 bg-gradient-to-r from-primary-50 via-white to-primary-50 border border-x8-border p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-x8-dark mb-4">
                Enterprise Deployment
              </h3>
              <p className="text-x8-gray leading-relaxed mb-6">
                Deploying AI agents at scale? Our enterprise team provides dedicated support, 
                custom integration with your AI orchestration platforms, and compliance consulting.
              </p>
              <ul className="space-y-3 mb-8">
                {['Dedicated solutions architect', 'Integration with LangChain, AutoGPT, etc.', 'Custom compliance workflows', 'SLA guarantees', 'On-call support'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-x8-dark">
                    <svg className="w-5 h-5 text-x8-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => scrollToSection('#contact')}
                className="btn btn-primary inline-flex items-center gap-2"
              >
                Talk to Our Team
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-x8-border p-6 text-center">
                <div className="text-3xl font-bold text-x8-gold mb-2">&lt;1 week</div>
                <div className="text-sm text-x8-gray">First Agent Live</div>
              </div>
              <div className="bg-white border border-x8-border p-6 text-center">
                <div className="text-3xl font-bold text-x8-gold mb-2">99.9%</div>
                <div className="text-sm text-x8-gray">Uptime SLA</div>
              </div>
              <div className="bg-white border border-x8-border p-6 text-center">
                <div className="text-3xl font-bold text-x8-gold mb-2">24/7</div>
                <div className="text-sm text-x8-gray">Support</div>
              </div>
              <div className="bg-white border border-x8-border p-6 text-center">
                <div className="text-3xl font-bold text-x8-gold mb-2">∞</div>
                <div className="text-sm text-x8-gray">Agents Supported</div>
              </div>
            </div>
          </div>
        </div>
*/}
      </div>
    </section>
  )
}
