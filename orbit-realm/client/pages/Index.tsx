import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Benefits from "@/components/Benefits";
import BusinessContinuity from "@/components/BusinessContinuity";
import Methodology from "@/components/Methodology";
import Integrations from "@/components/Integrations";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <Benefits />
        <BusinessContinuity />
        <Methodology />
        <Integrations />
      </main>
      <Footer />
    </div>
  );
}
