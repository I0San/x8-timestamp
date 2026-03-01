import { FINMAIcon, SwissCrossIcon, ShieldIcon, GlobeIcon, DocumentIcon, CheckCircleIcon } from '../components/Icons'

const regulations = [
  {
    title: 'FINMA',
    subtitle: 'Swiss Financial Market Supervisory Authority',
    description: 'Full compliance with Swiss financial regulations including anti-money laundering (AMLA) and data protection requirements.',
    icon: FINMAIcon,
    badges: ['AMLA Compliant', 'Licensed SRO Member', 'Regulated Entity']
  },
  {
    title: 'ZertES',
    subtitle: 'Swiss Electronic Signature Law',
    description: 'Our qualified electronic signatures meet the highest Swiss legal standards, equivalent to handwritten signatures.',
    icon: DocumentIcon,
    badges: ['Qualified Signatures', 'Trusted Provider', 'Legal Validity']
  },
  {
    title: 'nDSG/GDPR',
    subtitle: 'Data Protection Regulations',
    description: 'Fully compliant with the new Swiss Data Protection Act and EU GDPR, ensuring your data sovereignty.',
    icon: ShieldIcon,
    badges: ['Swiss Data Hosting', 'Privacy by Design', 'Right to Erasure']
  },
  {
    title: 'eIDAS',
    subtitle: 'EU Electronic Identity Framework',
    description: 'Interoperable with EU identity systems, enabling cross-border recognition of electronic identification.',
    icon: GlobeIcon,
    badges: ['Cross-Border Valid', 'EU Recognition', 'Interoperable']
  },
]

const certifications = [
  { name: 'ISO 27001', desc: 'Information Security' },
  { name: 'SOC 2 Type II', desc: 'Security & Availability' },
  { name: 'ISO 27701', desc: 'Privacy Management' },
  { name: 'CSA STAR', desc: 'Cloud Security' },
]

export function ComplianceSection() {
  return (
    <section id="compliance" className="py-24 md:py-32 bg-x8-gray-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="section-label">Regulatory Excellence</p>
            <h2 className="section-heading mb-6">
              FINMA-Regulated<br />
              <span className="text-x8-gold">Swiss Compliance</span>
            </h2>
            
            <p className="text-lg text-x8-gray leading-relaxed mb-8">
              Built from the ground up to meet the world's most stringent regulatory 
              requirements. Our Swiss heritage means compliance isn't an afterthought — 
              it's our foundation.
            </p>
            
            <div className="bg-white border border-x8-border p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-[#ff0000] flex items-center justify-center flex-shrink-0">
                  <SwissCrossIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-x8-dark mb-2">Swiss-Hosted Infrastructure</h3>
                  <p className="text-sm text-x8-gray leading-relaxed">
                    All data is processed and stored exclusively in Switzerland, protected 
                    by Swiss privacy laws — among the strongest in the world. No data 
                    ever leaves Swiss jurisdiction.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <div key={cert.name} className="bg-white border border-x8-border p-4 flex items-center gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-x8-gold flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-x8-dark text-sm">{cert.name}</p>
                    <p className="text-xs text-x8-gray">{cert.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            {regulations.map((reg) => (
              <div key={reg.title} className="bg-white border border-x8-border p-6 hover:border-x8-gold hover:shadow-lg hover:shadow-x8-gold/5 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 flex items-center justify-center flex-shrink-0">
                    <reg.icon className="w-6 h-6 text-x8-gold" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold text-x8-dark">{reg.title}</h3>
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                    </div>
                    <p className="text-xs text-x8-gold font-medium mb-2 uppercase tracking-wide">{reg.subtitle}</p>
                    <p className="text-sm text-x8-gray leading-relaxed mb-4">{reg.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {reg.badges.map((badge) => (
                        <span 
                          key={badge}
                          className="inline-flex items-center px-2.5 py-1 bg-green-50 border border-green-100 text-xs font-medium text-green-700"
                        >
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-20 bg-x8-dark text-white p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                Ready for the EU AI Act
              </h3>
              <p className="text-white/70 leading-relaxed">
                Our AI Agent identity framework is designed to meet the upcoming EU AI Act 
                requirements for transparency, accountability, and human oversight of AI systems.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/5 border border-white/10">
                <div className="text-2xl font-bold text-x8-gold mb-1">Art. 13</div>
                <div className="text-xs text-white/60">Transparency</div>
              </div>
              <div className="text-center p-4 bg-white/5 border border-white/10">
                <div className="text-2xl font-bold text-x8-gold mb-1">Art. 14</div>
                <div className="text-xs text-white/60">Human Oversight</div>
              </div>
              <div className="text-center p-4 bg-white/5 border border-white/10">
                <div className="text-2xl font-bold text-x8-gold mb-1">Art. 17</div>
                <div className="text-xs text-white/60">Record Keeping</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
