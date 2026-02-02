import { BenefitsSection } from "./BenefitsSection";
import { FeaturesSection } from "./FeaturesSection";
import { FooterSection } from "./FooterSection";
import { HeroSection } from "./HeroSection";
import { LandingNavbar } from "./LandingNavbar";
import { SolutionSection } from "./SolutionSection";
import './LandingPage.css';

export function LandingPage() {
  return (
    <>
      <title>Reflexia</title>

      <LandingNavbar />

      <div className="landing-page-content">
        <HeroSection />
        <SolutionSection />
        <BenefitsSection />
        <FeaturesSection />
        <FooterSection />
      </div>
    </>
  );
}