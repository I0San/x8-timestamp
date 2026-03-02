import { 
  BotIcon,
  AuditIcon,
  ChainIcon,
  UserGroupIcon,
  ShieldIcon,
  NetworkIcon
} from '../components/Icons'

const frameworkFeatures = [
  {
    icon: BotIcon,
    title: 'Agent Registration',
    description: 'Register each AI agent with a unique decentralized identifier (DID) linked to your organization\'s verified identity.',
    highlights: ['Unique Agent DIDs', 'Scope Definition', 'Capability Statements']
  },
  {
    icon: UserGroupIcon,
    title: 'Owner Accountability',
    description: 'Every agent action traces back to a verified human or organization. Clear responsibility chains for regulatory compliance.',
    highlights: ['KYC-Verified Owners', 'Responsibility Chain', 'Legal Clarity']
  },
  {
    icon: AuditIcon,
    title: 'Immutable Audit Trail',
    description: 'Every agent action is logged, timestamped, and stored immutably. Complete transparency for auditors and regulators.',
    highlights: ['Action Logging', 'Blockchain Timestamps', 'Tamper-Proof']
  },
  {
    icon: ShieldIcon,
    title: 'On-Chain Compliance',
    description: 'For X8 stablecoin transactions, enforce compliance rules directly on-chain. Define transfer conditions, approval workflows, and regulatory guardrails with automatic enforcement.',
    highlights: ['X8 Stablecoins', 'Compliant Transfers', 'On-Chain Enforcement']
  },
  {
    icon: ChainIcon,
    title: 'Compliance Reporting',
    description: 'Generate audit reports, track agent activity, and demonstrate compliance to regulators with one-click exports.',
    highlights: ['FINMA Ready', 'EU AI Act', 'Custom Reports']
  },
  {
    icon: NetworkIcon,
    title: 'Enterprise Integration',
    description: 'RESTful APIs and SDKs to integrate agent identity into your existing systems, workflows, and AI orchestration platforms.',
    highlights: ['REST & GraphQL', 'Webhooks', 'SSO Integration']
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 md:py-32 bg-white scroll-mt-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-20">
          <p className="section-label">The Framework for AI Accountability</p>
          <h2 className="section-heading mb-6">
            Deploy AI Agents<br className="hidden md:block" /> With Confidence
          </h2>
          <p className="text-lg text-x8-gray max-w-3xl mx-auto">
            Your organization is deploying AI agents to automate processes, serve customers, and execute decisions. 
            Our tool ensures every action is <span className="text-x8-dark font-medium">traceable</span>, 
            <span className="text-x8-dark font-medium"> accountable</span>, and 
            <span className="text-x8-dark font-medium"> compliant</span>.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {frameworkFeatures.map((feature) => (
            <div key={feature.title} className="card-hover group cursor-default">
              <div className="feature-icon mb-6">
                <feature.icon className="w-7 h-7 text-x8-gold" />
              </div>
              
              <h3 className="text-xl font-semibold text-x8-dark mb-3 tracking-tight">
                {feature.title}
              </h3>
              
              <p className="text-x8-gray text-sm leading-relaxed mb-5">
                {feature.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {feature.highlights.map((highlight) => (
                  <span 
                    key={highlight}
                    className="inline-flex items-center px-3 py-1 bg-primary-50 border border-primary-100 text-xs font-medium text-x8-dark"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 md:mt-20 bg-x8-dark text-white p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-x8-gold text-sm font-semibold uppercase tracking-wide mb-3">Why This Matters Now</p>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                The Regulatory Landscape Is Shifting
              </h3>
              <p className="text-white/70 leading-relaxed">
                With the EU AI Act, FINMA guidelines, and emerging global standards, organizations deploying AI agents 
                face increasing scrutiny. The question isn't <em>if</em> you'll need an accountability framework — it's 
                <span className="text-white font-medium"> whether you'll have one before your first audit</span>.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white/5 border border-white/10">
                <div className="text-2xl font-bold text-x8-gold mb-1">EU AI Act</div>
                <div className="text-xs text-white/60">High-risk AI systems</div>
              </div>
              <div className="text-center p-4 bg-white/5 border border-white/10">
                <div className="text-2xl font-bold text-x8-gold mb-1">FINMA</div>
                <div className="text-xs text-white/60">Swiss compliance</div>
              </div>
              <div className="text-center p-4 bg-white/5 border border-white/10">
                <div className="text-2xl font-bold text-x8-gold mb-1">SOC 2</div>
                <div className="text-xs text-white/60">Enterprise security</div>
              </div>
              <div className="text-center p-4 bg-white/5 border border-white/10">
                <div className="text-2xl font-bold text-x8-gold mb-1">GDPR</div>
                <div className="text-xs text-white/60">Data protection</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
