import { useState, useEffect, useRef } from 'react'
import { UserGroupIcon, BotIcon, ChainIcon, NetworkIcon } from '../components/Icons'

const tabs = ['overview', 'agents', 'audit'] as const
type TabType = typeof tabs[number]

export function AIAgentsSection() {
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setActiveTab(current => {
          const currentIndex = tabs.indexOf(current)
          return tabs[(currentIndex + 1) % tabs.length]
        })
      }, 2000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying])

  const handleTabClick = (tab: TabType) => {
    setIsAutoPlaying(false)
    setActiveTab(tab)
  }

  return (
    <section id="ai-agents" className="py-12 md:py-16 bg-x8-dark text-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full">
                <span className="w-1.5 h-1.5 bg-x8-gold rounded-full animate-pulse" />
                <span className="text-xs font-semibold tracking-wide text-x8-gold uppercase">Industry First</span>
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Compliant Identity <span className="text-x8-gold">for AI Agents</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1.5 bg-white/5 border border-white/10 text-xs font-medium">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2" />
              Swiss Regulation Ready
            </span>
            <span className="inline-flex items-center px-3 py-1.5 bg-white/5 border border-white/10 text-xs font-medium">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2" />
              EU AI Act Ready
            </span>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-x8-gold/10 via-transparent to-x8-gold/5 blur-2xl opacity-60" />
          
          <div className="relative bg-white/[0.03] border border-white/10 backdrop-blur-sm min-h-[480px] flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                </div>
                <span className="text-xs text-white/40 font-mono ml-2">x8-identity-dashboard</span>
              </div>
              
              <div className="flex gap-1">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'agents', label: 'Agents' },
                  { id: 'audit', label: 'Audit Trail' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id as TabType)}
                    className={`px-3 py-1 text-xs font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-x8-gold text-x8-dark'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-5 md:p-6 flex-1">
              {activeTab === 'overview' && (
                <>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 flex items-center gap-4 p-4 bg-white/5 border border-white/10">
                      <div className="w-12 h-12 bg-x8-gold/20 border border-x8-gold flex items-center justify-center flex-shrink-0">
                        <UserGroupIcon className="w-6 h-6 text-x8-gold" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-white/40 uppercase tracking-wider">Verified Owner</p>
                        <p className="font-semibold truncate">Swiss Enterprise AG</p>
                        <p className="text-xs text-white/50 font-mono">did:x8:ch:enterprise:0x8f3a...</p>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/20 border border-green-500/30">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                        <span className="text-[10px] font-semibold text-green-400 uppercase">KYC Verified</span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-white/5 border border-white/10 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-white/50">Agents</span>
                        <span className="font-semibold">12 Active</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-white/50">Actions Today</span>
                        <span className="font-semibold text-x8-gold">2,847</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-white/50">Status</span>
                        <span className="font-semibold text-green-400">Audit Ready</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center gap-2 text-xs text-white/40">
                    <ChainIcon className="w-3.5 h-3.5 text-x8-gold" />
                    <span>Every action cryptographically linked to owner identity</span>
                    <span className="ml-auto font-mono text-white/30">Block #4,821,947</span>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 bg-white/5 border border-white/10">
                      <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Total Actions</p>
                      <p className="text-xl font-bold text-white">19,247</p>
                      <p className="text-[10px] text-green-400">↑ 12% this week</p>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/10">
                      <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Uptime</p>
                      <p className="text-xl font-bold text-white">99.9%</p>
                      <p className="text-[10px] text-white/40">Last 30 days</p>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/10">
                      <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Compliance</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xl font-bold text-green-400">100%</p>
                        <span className="text-[10px] px-1.5 py-0.5 bg-green-500/20 text-green-400 font-medium">PASS</span>
                      </div>
                      <p className="text-[10px] text-white/40">All checks passed</p>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/10">
                      <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Avg Response</p>
                      <p className="text-xl font-bold text-white">47<span className="text-sm font-normal text-white/50">ms</span></p>
                      <p className="text-[10px] text-white/40">Agent latency</p>
                    </div>
                  </div>
                </>
              )}
              
              {activeTab === 'agents' && (
                <div className="space-y-3">
                  {[
                    { name: 'Trading Assistant', status: 'active', actions: '2,847', scope: 'Financial Operations', did: 'did:x8:agent:0x7f3a...' },
                    { name: 'Customer Support', status: 'active', actions: '15,392', scope: 'Support Tickets', did: 'did:x8:agent:0x2d8c...' },
                    { name: 'Data Analyst', status: 'paused', actions: '892', scope: 'Data Processing', did: 'did:x8:agent:0x9b1f...' },
                    { name: 'Risk Monitor', status: 'active', actions: '4,201', scope: 'Compliance Checks', did: 'did:x8:agent:0x4e2a...' },
                  ].map((agent, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 bg-white/5 border border-white/10 hover:border-x8-gold/30 transition-colors">
                      <div className="w-9 h-9 bg-x8-gold/20 border border-x8-gold/30 flex items-center justify-center flex-shrink-0">
                        <BotIcon className="w-4 h-4 text-x8-gold" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-sm">{agent.name}</p>
                          <span className={`w-1.5 h-1.5 rounded-full ${agent.status === 'active' ? 'bg-green-400' : 'bg-yellow-400'}`} />
                        </div>
                        <p className="text-[10px] text-white/40 font-mono">{agent.did}</p>
                      </div>
                      <div className="text-right hidden sm:block">
                        <p className="text-xs text-white/50">{agent.scope}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-x8-gold">{agent.actions}</p>
                        <p className="text-[10px] text-white/40">actions</p>
                      </div>
                    </div>
                  ))}
                  
                  <button className="w-full p-3 border border-dashed border-white/20 text-white/40 hover:border-x8-gold hover:text-x8-gold transition-colors flex items-center justify-center gap-2 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Register New Agent
                  </button>
                </div>
              )}
              
              {activeTab === 'audit' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <ChainIcon className="w-4 h-4 text-x8-gold" />
                      <span className="text-sm font-semibold">Immutable Action Log</span>
                    </div>
                    <span className="text-[10px] text-white/40 font-mono">Live feed</span>
                  </div>
                  
                  {[
                    { time: '14:32:01', agent: 'Trading Assistant', action: 'Executed trade order #4821', hash: '0x7f3a...' },
                    { time: '14:31:45', agent: 'Customer Support', action: 'Resolved ticket #12847', hash: '0x2d8c...' },
                    { time: '14:31:22', agent: 'Trading Assistant', action: 'Market analysis completed', hash: '0x9b1f...' },
                    { time: '14:30:58', agent: 'Data Analyst', action: 'Report generated: Q4 Revenue', hash: '0x4e2a...' },
                    { time: '14:30:31', agent: 'Risk Monitor', action: 'Compliance check passed', hash: '0x1c7b...' },
                  ].map((log, i) => (
                    <div key={i} className="flex items-start gap-3 p-2.5 bg-white/5 border border-white/5 text-xs hover:bg-white/[0.07] transition-colors">
                      <span className="text-white/40 font-mono">{log.time}</span>
                      <div className="flex-1 min-w-0">
                        <span className="text-x8-gold font-medium">{log.agent}</span>
                        <span className="text-white/40 mx-2">→</span>
                        <span className="text-white/80">{log.action}</span>
                      </div>
                      <span className="text-white/30 font-mono hidden sm:block">{log.hash}</span>
                    </div>
                  ))}
                  
                  <div className="mt-3 p-2.5 bg-x8-gold/10 border border-x8-gold/20">
                    <div className="flex items-center gap-2 text-xs">
                      <NetworkIcon className="w-3.5 h-3.5 text-x8-gold" />
                      <span className="text-white/60">All actions timestamped on</span>
                      <span className="font-semibold text-x8-gold">X8 Timestamp Registry</span>
                      <span className="ml-auto font-mono text-white/30">19,247 total</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between px-4 py-2 border-t border-white/10 bg-white/[0.02] text-[10px]">
              <div className="flex items-center gap-4">
                <span className="text-white/30 font-mono">v2.4.1</span>
                <span className="text-white/30">Swiss Jurisdiction</span>
                <span className="text-white/30 hidden sm:inline">TLS 1.3 Encrypted</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-white/30 font-mono hidden sm:inline">Last sync: 2s ago</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 font-medium">Connected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
