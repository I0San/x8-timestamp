import { useState } from 'react'
import { BotIcon, UserGroupIcon, ChainIcon, NetworkIcon } from '../components/Icons'

export function AIAgentsSection() {
  const [activeTab, setActiveTab] = useState<'owner' | 'agent' | 'audit'>('owner')

  return (
    <section id="ai-agents" className="py-16 md:py-20 bg-x8-dark text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-8">
            <span className="w-2 h-2 bg-x8-gold rounded-full animate-pulse" />
            <span className="text-sm font-semibold tracking-wide text-x8-gold uppercase">
              Industry First
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tight leading-tight">
            Compliant Identity <span className="text-x8-gold">for AI Agents</span>
          </h2>
          
          <p className="text-lg text-white/70 leading-relaxed max-w-3xl mx-auto">
            In the age of autonomous AI, accountability is everything. Our AI Agent DID 
            framework creates a compliant audit trail for every action an AI takes on 
            behalf of its owner.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-x8-gold/20 via-transparent to-x8-gold/10 blur-3xl opacity-50" />
            
            <div className="relative bg-white/5 border border-white/10 backdrop-blur-sm p-6 md:p-8">
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setActiveTab('owner')}
                  className={`px-4 py-2 text-sm font-semibold transition-colors ${
                    activeTab === 'owner' 
                      ? 'bg-x8-gold text-x8-dark' 
                      : 'bg-white/5 text-white/60 hover:text-white'
                  }`}
                >
                  Owner Identity
                </button>
                <button
                  onClick={() => setActiveTab('agent')}
                  className={`px-4 py-2 text-sm font-semibold transition-colors ${
                    activeTab === 'agent' 
                      ? 'bg-x8-gold text-x8-dark' 
                      : 'bg-white/5 text-white/60 hover:text-white'
                  }`}
                >
                  Agent DIDs
                </button>
                <button
                  onClick={() => setActiveTab('audit')}
                  className={`px-4 py-2 text-sm font-semibold transition-colors ${
                    activeTab === 'audit' 
                      ? 'bg-x8-gold text-x8-dark' 
                      : 'bg-white/5 text-white/60 hover:text-white'
                  }`}
                >
                  Audit Trail
                </button>
              </div>
              
              {activeTab === 'owner' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10">
                    <div className="w-14 h-14 bg-x8-gold/20 border border-x8-gold flex items-center justify-center">
                      <UserGroupIcon className="w-7 h-7 text-x8-gold" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-white/40 mb-1">VERIFIED OWNER</p>
                      <p className="font-semibold">Swiss Enterprise AG</p>
                      <p className="text-sm text-white/60">did:x8:ch:enterprise:0x8f3a...</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30">
                      <span className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-xs font-medium text-green-400">KYC Verified</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-white/60">Verification Level</span>
                      <span className="text-sm font-semibold text-x8-gold">Enterprise Plus</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-white/60">Registered Agents</span>
                      <span className="text-sm font-semibold">12 Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/60">Compliance Status</span>
                      <span className="text-sm font-semibold text-green-400">Audit Ready</span>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'agent' && (
                <div className="space-y-3">
                  {[
                    { name: 'Trading Assistant', status: 'active', actions: '2,847', scope: 'Financial Operations' },
                    { name: 'Customer Service Bot', status: 'active', actions: '15,392', scope: 'Support Interactions' },
                    { name: 'Data Analyst Agent', status: 'paused', actions: '892', scope: 'Data Processing' },
                  ].map((agent, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 hover:border-x8-gold/30 transition-colors">
                      <div className="w-10 h-10 bg-x8-gold/20 border border-x8-gold/30 flex items-center justify-center">
                        <BotIcon className="w-5 h-5 text-x8-gold" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{agent.name}</p>
                        <p className="text-xs text-white/40">{agent.scope}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{agent.actions}</p>
                        <p className="text-xs text-white/40">actions</p>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        agent.status === 'active' ? 'bg-green-400' : 'bg-yellow-400'
                      }`} />
                    </div>
                  ))}
                  
                  <button className="w-full p-4 border border-dashed border-white/20 text-white/40 hover:border-x8-gold hover:text-x8-gold transition-colors flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Register New Agent
                  </button>
                </div>
              )}
              
              {activeTab === 'audit' && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-4">
                    <ChainIcon className="w-5 h-5 text-x8-gold" />
                    <span className="text-sm font-semibold">Immutable Action Log</span>
                  </div>
                  
                  {[
                    { time: '14:32:01', agent: 'Trading Assistant', action: 'Executed trade order #4821', hash: '0x7f3a...' },
                    { time: '14:31:45', agent: 'Customer Service', action: 'Resolved ticket #12847', hash: '0x2d8c...' },
                    { time: '14:31:22', agent: 'Trading Assistant', action: 'Market analysis completed', hash: '0x9b1f...' },
                    { time: '14:30:58', agent: 'Data Analyst', action: 'Report generated: Q4 Revenue', hash: '0x4e2a...' },
                  ].map((log, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-white/5 border border-white/5 text-sm">
                      <span className="text-white/40 font-mono text-xs">{log.time}</span>
                      <div className="flex-1">
                        <span className="text-x8-gold font-medium">{log.agent}</span>
                        <span className="text-white/60 mx-2">→</span>
                        <span>{log.action}</span>
                      </div>
                      <span className="text-white/30 font-mono text-xs">{log.hash}</span>
                    </div>
                  ))}
                  
                  <div className="mt-4 p-3 bg-x8-gold/10 border border-x8-gold/20">
                    <div className="flex items-center gap-2 text-sm">
                      <NetworkIcon className="w-4 h-4 text-x8-gold" />
                      <span className="text-white/60">All actions timestamped on blockchain via</span>
                      <span className="font-semibold text-x8-gold">X8 Timestamp Registry</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <span className="inline-flex items-center px-4 py-2 bg-white/5 border border-white/10 text-sm font-medium">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2" />
              Swiss Regulation Ready
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-white/5 border border-white/10 text-sm font-medium">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2" />
              EU AI Act Ready
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-white/5 border border-white/10 text-sm font-medium">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2" />
              SOC 2 Type II
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
