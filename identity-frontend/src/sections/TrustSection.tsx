import { ShieldIcon, GlobeIcon, ChainIcon } from '../components/Icons'

const trustFeatures = [
  {
    icon: ShieldIcon,
    title: 'Zero-Knowledge Architecture',
    description: 'Share only what\'s necessary. Our selective disclosure protocols let you prove attributes without revealing underlying data.',
  },
  {
    icon: ChainIcon,
    title: 'Blockchain Anchored',
    description: 'All critical identity operations are anchored to Ethereum, providing immutable proof and global verifiability.',
  },
  {
    icon: GlobeIcon,
    title: 'Interoperable Standards',
    description: 'Built on W3C DID, Verifiable Credentials, and DIDComm standards for maximum ecosystem compatibility.',
  },
]

const securityMetrics = [
  { value: '256-bit', label: 'AES Encryption' },
  { value: 'HSM', label: 'Key Protection' },
  { value: '0', label: 'Security Incidents' },
  { value: '24/7', label: 'SOC Monitoring' },
]

export function TrustSection() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-x8-gray-light to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-20">
          <p className="section-label">Enterprise Security</p>
          <h2 className="section-heading mb-6">
            Trust Built on<br />
            <span className="text-x8-gold">Swiss Standards</span>
          </h2>
          <p className="text-lg text-x8-gray max-w-2xl mx-auto">
            Security isn't a feature — it's our foundation. Every component is 
            designed with defense in depth and Swiss precision.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {trustFeatures.map((feature) => (
            <div key={feature.title} className="text-center p-8 bg-white border border-x8-border hover:border-x8-gold transition-colors group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8 text-x8-gold" />
              </div>
              <h3 className="text-lg font-semibold text-x8-dark mb-3">{feature.title}</h3>
              <p className="text-sm text-x8-gray leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-x8-dark text-white p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-6">
                Security Metrics
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {securityMetrics.map((metric) => (
                  <div key={metric.label} className="p-4 bg-white/5 border border-white/10">
                    <div className="text-2xl md:text-3xl font-bold text-x8-gold mb-1">{metric.value}</div>
                    <div className="text-sm text-white/60">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/10">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <h4 className="font-semibold mb-1">Penetration Tested</h4>
                  <p className="text-sm text-white/60">Regular third-party security audits and penetration testing by leading Swiss security firms.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/10">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div>
                  <h4 className="font-semibold mb-1">Hardware Security Modules</h4>
                  <p className="text-sm text-white/60">All cryptographic operations performed in FIPS 140-2 Level 3 certified HSMs.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/10">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
                <div>
                  <h4 className="font-semibold mb-1">Swiss Data Centers</h4>
                  <p className="text-sm text-white/60">Tier IV certified data centers in Switzerland with geographic redundancy and disaster recovery.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 grid md:grid-cols-4 gap-6 text-center">
          {[
            { logo: 'ISO 27001', desc: 'Certified' },
            { logo: 'SOC 2', desc: 'Type II' },
            { logo: 'GDPR', desc: 'Compliant' },
            { logo: 'FINMA', desc: 'Regulated' },
          ].map((cert) => (
            <div key={cert.logo} className="p-6 bg-white border border-x8-border">
              <div className="text-xl font-bold text-x8-dark mb-1">{cert.logo}</div>
              <div className="text-sm text-x8-gray">{cert.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
