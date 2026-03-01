import { HeroSection } from '../sections/HeroSection'
import { AuditTrailSection } from '../sections/AuditTrailSection'
import { FeaturesSection } from '../sections/FeaturesSection'
import { AIAgentsSection } from '../sections/AIAgentsSection'
import { HowItWorksSection } from '../sections/HowItWorksSection'
import { CTASection } from '../sections/CTASection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <AuditTrailSection />
      <FeaturesSection />
      <AIAgentsSection />
      <HowItWorksSection />
      <CTASection />
    </>
  )
}
