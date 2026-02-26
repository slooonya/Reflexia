import { Navbar } from "../../components/Navbar";
import { BenefitsSection } from "./BenefitsSection";
import { FeaturesSection } from "./FeaturesSection";
import { FooterSection } from "./FooterSection";
import { HeroSection } from "./HeroSection";
import { SolutionSection } from "./SolutionSection";

export function LandingPage() {
  return (
    <>
      <title>Reflexia</title>

      <Navbar mode="landing" />

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