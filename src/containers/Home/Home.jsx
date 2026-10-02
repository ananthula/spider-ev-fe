import Navbar from "../../components/layout/Navbar";
import PageContainer from "../../components/layout/PageContainer";
import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";
import ChargersSection from "./ChargersSection";
import ChargingSolutionsSection from "./ChargingSolutionsSection";
import BrandsSection from "./BrandsSection";
import AppSection from "./AppSection";
import BessSection from "./BessSection";
import CitiesSection from "./CitiesSection";
import Footer from "../../components/layout/Footer";
import WhatsAppFloat from "../../components/ui/WhatsAppFloat";

const Home = () => {
  return (
    <PageContainer>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ChargersSection />
      <ChargingSolutionsSection />
      <BrandsSection />
      <AppSection />
      <BessSection />
      <CitiesSection />
      <Footer />
      <WhatsAppFloat />
    </PageContainer>
  );
};

export default Home;
