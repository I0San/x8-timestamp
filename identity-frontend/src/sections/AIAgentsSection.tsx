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
        <div className="text-center md:text-left mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full mb-3">
            <span className="w-1.5 h-1.5 bg-x8-gold rounded-full animate-pulse" />
            <span className="text-xs font-semibold tracking-wide text-x8-gold uppercase">Industry First</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
            Our  <span className="text-x8-gold">Dashboard</span>
          </h2>
        </div>
        
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-x8-gold/10 via-transparent to-x8-gold/5 blur-2xl opacity-60" />
          
          <div className="relative bg-white/[0.03] border border-white/10 backdrop-blur-sm min-h-[460px] sm:min-h-[450px] md:min-h-[450px] flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-3 sm:px-4 py-2 border-b border-white/10 bg-white/5 gap-2">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-400/80" />
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-400/80" />
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-400/80" />
                </div>
                <span className="text-[10px] sm:text-xs text-white/40 font-mono">x8-identity-dashboard</span>
              </div>
              
              <div className="flex gap-1">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'agents', label: 'Agents' },
                  { id: 'audit', label: 'Audit' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id as TabType)}
                    className={`px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-medium transition-colors ${
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
            
            <div className="p-4 sm:p-5 md:p-6 flex-1">
              {activeTab === 'overview' && (
                <>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
                    <div className="flex-1 flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 border border-white/10">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-x8-gold/20 border border-x8-gold flex items-center justify-center flex-shrink-0">
                        <UserGroupIcon className="w-5 h-5 sm:w-6 sm:h-6 text-x8-gold" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-white/40 uppercase tracking-wider">Verified Owner</p>
                        <p className="font-semibold text-sm sm:text-base truncate">Swiss Enterprise AG</p>
                        <p className="text-[10px] sm:text-xs text-white/50 font-mono truncate">did:x8:ch:enterprise:0x8f3a...</p>
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-green-500/20 border border-green-500/30 flex-shrink-0">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                        <span className="text-[9px] sm:text-[10px] font-semibold text-green-400 uppercase">KYC</span>
                      </div>
                    </div>
                    
                    <div className="sm:w-40 p-3 sm:p-4 bg-white/5 border border-white/10 grid grid-cols-3 sm:grid-cols-1 gap-2 sm:space-y-2">
                      <div className="flex flex-col sm:flex-row sm:justify-between text-xs">
                        <span className="text-white/50 text-[10px] sm:text-xs">Agents</span>
                        <span className="font-semibold">12</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between text-xs">
                        <span className="text-white/50 text-[10px] sm:text-xs">Today</span>
                        <span className="font-semibold text-x8-gold">2,847</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between text-xs">
                        <span className="text-white/50 text-[10px] sm:text-xs">Status</span>
                        <span className="font-semibold text-green-400">Ready</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden sm:flex items-center gap-2 text-xs text-white/40 mb-4">
                    <ChainIcon className="w-3.5 h-3.5 text-x8-gold flex-shrink-0" />
                    <span className="truncate">Every action cryptographically linked to owner identity</span>
                    <span className="ml-auto font-mono text-white/30 flex-shrink-0">Block #4,821,947</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="p-2.5 sm:p-3 bg-white/5 border border-white/10">
                      <p className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-wider mb-1">Total Actions</p>
                      <p className="text-lg sm:text-xl font-bold text-white">19,247</p>
                      <p className="text-[9px] sm:text-[10px] text-green-400">↑ 12% this week</p>
                    </div>
                    <div className="p-2.5 sm:p-3 bg-white/5 border border-white/10">
                      <p className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-wider mb-1">Uptime</p>
                      <p className="text-lg sm:text-xl font-bold text-white">99.9%</p>
                      <p className="text-[9px] sm:text-[10px] text-white/40">Last 30 days</p>
                    </div>
                    <div className="p-2.5 sm:p-3 bg-white/5 border border-white/10">
                      <p className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-wider mb-1">Compliance</p>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <p className="text-lg sm:text-xl font-bold text-green-400">100%</p>
                        <span className="text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 bg-green-500/20 text-green-400 font-medium">PASS</span>
                      </div>
                      <p className="text-[9px] sm:text-[10px] text-white/40">All checks passed</p>
                    </div>
                    <div className="p-2.5 sm:p-3 bg-white/5 border border-white/10">
                      <p className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-wider mb-1">Response</p>
                      <p className="text-lg sm:text-xl font-bold text-white">47<span className="text-xs sm:text-sm font-normal text-white/50">ms</span></p>
                      <p className="text-[9px] sm:text-[10px] text-white/40">Agent latency</p>
                    </div>
                  </div>
                </>
              )}
              
              {activeTab === 'agents' && (
                <div className="space-y-2 sm:space-y-3">
                  {[
                    { name: 'Trading Assistant', status: 'active', actions: '2,847', did: 'did:x8:agent:0x7f3a...' },
                    { name: 'Customer Support', status: 'active', actions: '15,392', did: 'did:x8:agent:0x2d8c...' },
                    { name: 'Data Analyst', status: 'paused', actions: '892', did: 'did:x8:agent:0x9b1f...' },
                    { name: 'Risk Monitor', status: 'active', actions: '4,201', did: 'did:x8:agent:0x4e2a...' },
                  ].map((agent, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 sm:p-3 bg-white/5 border border-white/10 hover:border-x8-gold/30 transition-colors">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 bg-x8-gold/20 border border-x8-gold/30 flex items-center justify-center flex-shrink-0">
                        <BotIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-x8-gold" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-xs sm:text-sm truncate">{agent.name}</p>
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${agent.status === 'active' ? 'bg-green-400' : 'bg-yellow-400'}`} />
                        </div>
                        <p className="text-[9px] sm:text-[10px] text-white/40 font-mono truncate">{agent.did}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs sm:text-sm font-semibold text-x8-gold">{agent.actions}</p>
                        <p className="text-[9px] sm:text-[10px] text-white/40">actions</p>
                      </div>
                    </div>
                  ))}
                  
                  <button className="w-full p-2.5 sm:p-3 border border-dashed border-white/20 text-white/40 hover:border-x8-gold hover:text-x8-gold transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Register New Agent
                  </button>
                </div>
              )}
              
              {activeTab === 'audit' && (
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div className="flex items-center gap-2">
                      <ChainIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-x8-gold" />
                      <span className="text-xs sm:text-sm font-semibold">Immutable Action Log</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-[9px] sm:text-[10px] text-white/40 font-mono">Live</span>
                    </div>
                  </div>
                  
                  {[
                    { time: '14:32:01', agent: 'Trading', action: 'Executed trade #4821' },
                    { time: '14:31:45', agent: 'Support', action: 'Resolved ticket #12847' },
                    { time: '14:31:22', agent: 'Trading', action: 'Market analysis done' },
                    { time: '14:30:58', agent: 'Analyst', action: 'Q4 Revenue report' },
                    { time: '14:30:31', agent: 'Risk', action: 'Compliance check passed' },
                  ].map((log, i) => (
                    <div key={i} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 bg-white/5 border border-white/5 text-[10px] sm:text-xs hover:bg-white/[0.07] transition-colors">
                      <span className="text-white/40 font-mono flex-shrink-0">{log.time}</span>
                      <span className="text-x8-gold font-medium flex-shrink-0">{log.agent}</span>
                      <span className="text-white/30">→</span>
                      <span className="text-white/70 truncate">{log.action}</span>
                    </div>
                  ))}
                  
                  <div className="mt-2 sm:mt-3 p-2 sm:p-2.5 bg-x8-gold/10 border border-x8-gold/20">
                    <div className="flex items-center justify-between text-[10px] sm:text-xs">
                      <div className="flex items-center gap-2">
                        <NetworkIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-x8-gold" />
                        <span className="font-semibold text-x8-gold">X8 Timestamp Registry</span>
                      </div>
                      <span className="font-mono text-white/40">19,247 total</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-t border-white/10 bg-white/[0.02] text-[9px] sm:text-[10px]">
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="text-white/30 font-mono">v2.4.1</span>
                <span className="text-white/30 hidden sm:inline">Swiss Jurisdiction</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 font-medium">Connected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
