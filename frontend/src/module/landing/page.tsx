import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeatureSection from "./components/FeatureSection";
import HowItWorks from "./components/HowItWorks";
import LivePreview from "./components/LivePreview";
import Benefits from "./components/Benefits";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <Navbar />
      <Hero />
      <FeatureSection />
      <HowItWorks />
      <LivePreview />
      <Benefits />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;
