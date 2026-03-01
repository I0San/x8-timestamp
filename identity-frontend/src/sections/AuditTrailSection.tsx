import { useMemo } from 'react'
import { ChainIcon } from '../components/Icons'

interface AuditEntry {
  id: string
  timestamp: string
  agentName: string
  agentType: 'trading' | 'support' | 'analytics' | 'compliance' | 'security'
  action: string
  owner: string
  txHash: string
  status: 'confirmed' | 'pending'
}

const agentTypes = {
  trading: { label: 'Trading Bot', color: 'text-x8-gold' },
  support: { label: 'Support Agent', color: 'text-primary-300' },
  analytics: { label: 'Data Analyst', color: 'text-x8-gold-light' },
  compliance: { label: 'Compliance AI', color: 'text-primary-400' },
  security: { label: 'Security Agent', color: 'text-primary-500' },
}

const staticEntries: AuditEntry[] = [
  { id: '1', timestamp: '14:32:01.847', agentName: 'Trading Bot', agentType: 'trading', action: 'Executed market order #48291', owner: 'Swiss Enterprise AG', txHash: '0x7f3a82d1...', status: 'confirmed' },
  { id: '2', timestamp: '14:31:58.234', agentName: 'Support Agent', agentType: 'support', action: 'Resolved support ticket #12847', owner: 'Zurich Capital Partners', txHash: '0x2d8c91f4...', status: 'confirmed' },
  { id: '3', timestamp: '14:31:55.102', agentName: 'Compliance AI', agentType: 'compliance', action: 'KYC verification completed for corp_0x2d8c', owner: 'Alpine Investments', txHash: '0x9b1f73e2...', status: 'confirmed' },
  { id: '4', timestamp: '14:31:52.891', agentName: 'Data Analyst', agentType: 'analytics', action: 'Generated quarterly report', owner: 'Geneva Trust Ltd', txHash: '0x4e2a56b8...', status: 'confirmed' },
  { id: '5', timestamp: '14:31:49.445', agentName: 'Security Agent', agentType: 'security', action: 'Blocked suspicious login attempt', owner: 'Basel Trading Co', txHash: '0x8c3d12a9...', status: 'confirmed' },
  { id: '6', timestamp: '14:31:46.223', agentName: 'Trading Bot', agentType: 'trading', action: 'Placed limit order for ETH/CHF', owner: 'Bern Financial Services', txHash: '0x1a5f89c3...', status: 'pending' },
  { id: '7', timestamp: '14:31:43.667', agentName: 'Compliance AI', agentType: 'compliance', action: 'AML check passed: transaction #67234', owner: 'Swiss Enterprise AG', txHash: '0x6b2e41d7...', status: 'confirmed' },
  { id: '8', timestamp: '14:31:40.112', agentName: 'Support Agent', agentType: 'support', action: 'Escalated issue to human agent', owner: 'Zurich Capital Partners', txHash: '0x3f8a92c1...', status: 'confirmed' },
]

const rowHeight = 60
const animationDuration = staticEntries.length * 4

export function AuditTrailSection() {
  const entries = useMemo(() => staticEntries, [])

  return (
    <section className="relative py-20 md:py-28 bg-x8-dark/95 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-x8-gold/5 via-transparent to-x8-gold/5" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium text-white/80">Live Audit Trail</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 tracking-tight">
            Every AI Action. <span className="text-x8-gold">Timestamped.</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Watch as AI agents across the network perform actions — each one cryptographically 
            timestamped and linked to a verified owner identity.
          </p>
        </div>

        <div className="relative">
          <div 
            className="relative bg-white/[0.02] backdrop-blur-sm overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
              height: `${rowHeight * 5}px`,
            }}
          >
            <div 
              className="animate-scroll"
              style={{ 
                animation: `scrollUp ${animationDuration}s linear infinite`,
              }}
            >
              {[...entries, ...entries].map((entry, idx) => (
                <div
                  key={`${entry.id}-${idx}`}
                  className="grid md:grid-cols-[140px_1fr_180px_140px_100px] gap-2 md:gap-4 px-4 md:px-6 py-3.5 border-b border-white/5"
                  style={{ height: `${rowHeight}px` }}
                >
                  <div className="flex items-center gap-2 md:gap-0">
                    <span className="md:hidden text-[10px] font-medium text-white/40 uppercase">Time:</span>
                    <span className="font-mono text-sm text-white/70">{entry.timestamp}</span>
                  </div>
                  
                  <div className="flex items-start gap-3 col-span-full md:col-span-1">
                    <ChainIcon className="w-4 h-4 text-x8-gold flex-shrink-0 mt-0.5 hidden md:block" />
                    <div className="flex-1 min-w-0">
                      <span className={`text-xs font-semibold ${agentTypes[entry.agentType].color}`}>
                        {entry.agentName}
                      </span>
                      <p className="text-sm text-white truncate">{entry.action}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 md:gap-0">
                    <span className="md:hidden text-[10px] font-medium text-white/40 uppercase">Owner:</span>
                    <span className="text-sm text-white/60 truncate">{entry.owner}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 md:gap-0">
                    <span className="md:hidden text-[10px] font-medium text-white/40 uppercase">TX:</span>
                    <span className="font-mono text-xs text-white/40">{entry.txHash}</span>
                  </div>
                  
                  <div className="flex items-center justify-start md:justify-end gap-2">
                    <span className="md:hidden text-[10px] font-medium text-white/40 uppercase">Status:</span>
                    {entry.status === 'confirmed' ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded text-xs font-medium text-emerald-400">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                        Confirmed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-amber-500/20 border border-amber-500/30 rounded text-xs font-medium text-amber-400">
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/50">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-x8-gold/20 border border-x8-gold/40 flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-x8-gold rounded-full" />
            </span>
            <span>Trading Bot</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary-300/20 border border-primary-300/40 flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-primary-300 rounded-full" />
            </span>
            <span>Support Agent</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-x8-gold-light/20 border border-x8-gold-light/40 flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-x8-gold-light rounded-full" />
            </span>
            <span>Data Analyst</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary-400/20 border border-primary-400/40 flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
            </span>
            <span>Compliance AI</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary-500/20 border border-primary-500/40 flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
            </span>
            <span>Security Agent</span>
          </div>
        </div>
      </div>
    </section>
  )
}
