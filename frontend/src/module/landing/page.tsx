import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/hooks/useAuth";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeatureSection from "./components/FeatureSection";
import HowItWorks from "./components/HowItWorks";
import LivePreview from "./components/LivePreview";
import Benefits from "./components/Benefits";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

const LandingPage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/app", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white" />
    );
  }

  if (isAuthenticated) {
     return null; // Prevents flashing before redirect
  }
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
