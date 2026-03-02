import { AbstractAnimation } from '../components/AbstractAnimation'
import { ArrowRightIcon, BotIcon } from '../components/Icons'

export function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative min-h-screen flex items-center bg-gradient-to-b from-white via-white to-primary-50 overflow-hidden">
      <AbstractAnimation />
      
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-x8-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-20 pt-28">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/80 backdrop-blur-sm border border-primary-200 rounded-full mb-8 shadow-sm">
            <span className="flex items-center justify-center w-6 h-6 bg-x8-gold/10 rounded-full">
              <BotIcon className="w-4 h-4 text-x8-gold" />
            </span>
            <span className="text-sm font-semibold tracking-wide text-x8-dark">
              Fully Swiss Regulated Identity Solutions
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-x8-dark mb-8 tracking-tight leading-[1.1]">
            AI Agents Are<br />
            <span className="text-x8-gold">Taking Action.</span><br />
            Who's Accountable?
          </h1>
          
          <p className="text-xl md:text-2xl text-x8-gray max-w-2xl mb-8 leading-relaxed">
            AI is no longer just answering questions — it's <span className="text-x8-dark font-medium">taking action</span>. 
            Booking flights. Executing trades. Signing contracts. All on behalf of humans.
          </p>
          
          <div className="relative max-w-2xl mb-10">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-x8-gold via-x8-gold/80 to-x8-gold/40 rounded-full" />
            <div className="pl-6">
              <p className="text-xl md:text-2xl text-x8-dark leading-relaxed font-light">
                <span className="text-x8-gold font-semibold">X8 Identity</span> ensures every AI action 
                is linked to a real, verified person — creating the 
                <span className="font-semibold"> oversight</span> and <span className="font-semibold">accountability</span> that 
                regulators, enterprises, and society need.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => scrollToSection('#features')}
              className="btn btn-primary px-10 py-4 text-base font-bold shadow-lg shadow-x8-gold/20 hover:shadow-xl hover:shadow-x8-gold/30 transition-all inline-flex items-center justify-center gap-2 group"
            >
              Deploy Your AI Agent Monitoring
              <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button 
              onClick={() => scrollToSection('#ai-agents')}
              className="btn btn-outline px-10 py-4 text-base font-bold inline-flex items-center justify-center gap-2"
            >
              See How It Works
            </button>
          </div>
        </div>
      </div>
      
    </div>
  )
}
