import { useState } from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/SEO";
import { getFAQSchema, getBreadcrumbSchema, getBessProductGroupSchema } from "../seo/schemas";
import { bessFaq } from "../data/bessFaq";
import { bessProducts } from "../data/bessProducts";
import spiderpower3 from "../assets/bess/spiderpower-3.0.webp";
import spiderpower5 from "../assets/bess/spiderpower-5.0.webp";
import spiderpower12 from "../assets/bess/spiderpower-12.0.webp";
import spiderpower20 from "../assets/bess/spiderpower-20.0-2.webp";
import BessHero from "../containers/Bess/BessHero";
import BessIntro from "../containers/Bess/BessIntro";
import BessPillars from "../containers/Bess/BessPillars";
import BessCapacitySelector from "../containers/Bess/BessCapacitySelector";
import BessProductTabs from "../containers/Bess/BessProductTabs";
import BessSpecsTabs from "../containers/Bess/BessSpecsTabs";
import BessComparison from "../containers/Bess/BessComparison";
import BessFeatures from "../containers/Bess/BessFeatures";
import BessAppSection from "../containers/Bess/BessAppSection";
import BessFAQ from "../containers/Bess/BessFAQ";
import BessEnquiry from "../containers/Bess/BessEnquiry";
import BessHowItWorks from "../containers/Bess/BessHowItWorks";

const bessImages = {
  "spidervault-3": spiderpower3,
  "spidervault-5": spiderpower5,
  "spidervault-12": spiderpower12,
  "spidervault-20": spiderpower20,
  "spidervault-30": spiderpower20,
  "spidervault-60": spiderpower20,
  "spidervault-120": spiderpower20,
};
const bessSchema = getBessProductGroupSchema(bessProducts, bessImages);
const bessBreadcrumbs = getBreadcrumbSchema([
  { name: "Home", url: "https://spiderenergy.in" },
  { name: "SpiderVault BESS", url: "/spidervault-bess-battery-energy-storage" },
]);
const bessFAQSchema = getFAQSchema(bessFaq);

const BESSPage = () => {
  const [activeSpecProduct, setActiveSpecProduct] = useState("spidervault-3");

  const handleProductSelect = (productId) => {
    setActiveSpecProduct(productId);
    setTimeout(() => {
      document.getElementById("specs")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <PageLayout>
      <Helmet>
        <title>SpiderVault BESS — Battery Energy Storage | AP & TG</title>
        <meta name="description" content="SpiderVault BESS by Spider Energy provides battery energy storage for EV stations, solar projects & industrial backup in Andhra Pradesh & Telangana." />
      </Helmet>
      <SEO
        schema={bessSchema}
        schemas={[bessFAQSchema]}
        breadcrumbs={bessBreadcrumbs}
        title="SpiderVault BESS — Battery Energy Storage | AP & TG"
        description="SpiderVault BESS by Spider Energy provides battery energy storage for EV stations, solar projects & industrial backup in Andhra Pradesh & Telangana."
        ogImage="/og/products/spidervault-12.jpg"
      />
      <BessHero />
      <BessIntro />
      <BessPillars />
      <BessHowItWorks />
      <BessCapacitySelector onProductSelect={handleProductSelect} />
      <BessProductTabs onProductSelect={handleProductSelect} />
      <BessSpecsTabs activeProduct={activeSpecProduct} onTabChange={setActiveSpecProduct} />
      <BessComparison />
      <BessFeatures />
      <BessAppSection />
      <BessFAQ />
      <BessEnquiry />
    </PageLayout>
  );
};

export default BESSPage;
