import { HeroSection } from '../sections/HeroSection'
import { FeaturesSection } from '../sections/FeaturesSection'
import { AIAgentsSection } from '../sections/AIAgentsSection'
import { ComplianceSection } from '../sections/ComplianceSection'
import { HowItWorksSection } from '../sections/HowItWorksSection'
import { CTASection } from '../sections/CTASection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <AIAgentsSection />
      <ComplianceSection />
      <HowItWorksSection />
      <CTASection />
    </>
  )
}
