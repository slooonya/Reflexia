import { Navbar } from "../../components/Navbar";
import { FAQsSection } from "./faqs/FAQsSection";
import { HowItWorksSection } from "./howitworks/HowItWorksSection";
import { FooterSection } from "./footer/FooterSection";
import { HeroSection } from "./hero/HeroSection";
import { SolutionSection } from "./solution/SolutionSection";
import { PolaroidsSection } from "./footer/PolaroidsSection";

export function LandingPage() {
  return (
    <>
      <title>Reflexia</title>

      <Navbar mode="landing" />

      <div className="landing-page-content">
        <HeroSection />
        <SolutionSection />
        <HowItWorksSection />
        <FAQsSection />
        <PolaroidsSection />
        <FooterSection />
      </div>
    </>
  );
}