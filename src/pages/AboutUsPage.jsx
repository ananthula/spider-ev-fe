import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import PageLayout from "../components/layout/PageLayout";
import HeroBanner from "../components/ui/HeroBanner";
import { fadeUp, fadeLeft, fadeRight, scaleUp, staggerContainer, staggerFast, viewport } from "../utils/animationConfig";
import heroBg from "../assets/home/hero-bg.webp";
import SEO from "../components/SEO";
import { organizationSchema, getBreadcrumbSchema } from "../seo/schemas";
import spiderEvLogo from "../assets/home/spider-ev-logo.webp";
import tataMotorsLogo from "../assets/brand-logos/Tata-Motors.webp";
import indianRailwayLogo from "../assets/brand-logos/Indian-Railway.webp";
import delhiMetroLogo from "../assets/brand-logos/Delhi-Metro.webp";
import amazonLogo from "../assets/brand-logos/Amazon.webp";
import flipkartLogo from "../assets/brand-logos/flipkart.webp";
import bpclLogo from "../assets/brand-logos/BPCL.webp";

const stats = [
  { num: "30+", label: "Years of expertise in power electronics" },
  { num: "15+", label: "Cities covered by installation and maintenance" },
  { num: "5K+", label: "AC & DC chargers deployed across India" },
];

const partners = [
  { name: "Tata Motors", logo: tataMotorsLogo },
  { name: "Indian Railways", logo: indianRailwayLogo },
  { name: "Delhi Metro", logo: delhiMetroLogo },
  { name: "Amazon", logo: amazonLogo },
  { name: "Flipkart", logo: flipkartLogo },
  { name: "BPCL", logo: bpclLogo },
];

const aboutBreadcrumbs = getBreadcrumbSchema([
  { name: "Home", url: "https://spiderenergy.in" },
  { name: "About Us" },
]);

const AboutUsPage = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>EV Charger Manufacturer in Telangana & AP | SpiderEV</title>
        <meta name="description" content="EV Charging Systems Manufacturer in Andhra Pradesh & Telangana. Electric car chargers, home charger installation & charging equipment." />
        <meta name="keywords" content="EV charger manufacturer Telangana, electric vehicle manufacturer AP, BIS certified charger India, SpiderEV company Hyderabad, EVSE manufacturer India" />
      </Helmet>
      <SEO schema={organizationSchema} breadcrumbs={aboutBreadcrumbs} />
      <HeroBanner
        title="About Spider Energy — EV Charger Manufacturer in Telangana & Andhra Pradesh"
        bgImage={heroBg}
      />

      {/* Main Content */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-330 mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="max-w-4xl mx-auto"
          >
            {/* Introduction */}
            <motion.p variants={fadeUp} className="text-gray-600 text-lg leading-relaxed mb-12">
              Spider Energy was started on a simple premise. India's transition to EVs needs charging infrastructure made for Indian conditions, not repurposed from elsewhere. That means locally built and serviced chargers rated for monsoon humidity and grid voltage fluctuation, not imported.
            </motion.p>

            {/* Section 1: Our Mission */}
            <motion.div variants={fadeUp} className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Our Mission — Making EV Charging Accessible Across India
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our mission is to be the most sought after Charging Partner in the country — completely annihilating charge anxiety through innovative solutions that empower every EV driver, business, and community across India. We envision a future where every Indian can charge their EV as easily as they charge their phone.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From homes to highways, our EV charging solutions are designed to empower a cleaner, smarter, and more connected tomorrow. We are a vertically integrated manufacturer — designing, manufacturing, deploying, and managing every aspect of EV charging infrastructure.
              </p>
            </motion.div>

            {/* Section 2: Manufacturing Capabilities */}
            <motion.div variants={fadeUp} className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Manufacturing Capabilities — BIS-Certified AC & DC EV Chargers
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We build everything in-house—from 3.3 kW AC chargers for homes to 80 kW dual-gun commercial chargers, and from 30 kW to our flagship 240 kW DC fast chargers for highways and fleet depots. Each unit is BIS certified and OCPP 1.6J enabled, and the latest models are OCPP 2.0 compatible. Our manufacturing facility is equipped with state-of-the-art testing equipment to ensure every charger that leaves our facility meets the highest quality standards.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Backed by 30 years of expertise in power electronics, we design, manufacture, deploy, and manage every aspect of EV charging infrastructure. Our team has built India's largest charging networks, partnering with India Post, Indian Railways, Delhi Metro, Tata Motors, and 20+ other industry leaders to accelerate the transition to electric mobility.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We have deployed over 5,000 AC and DC chargers across India, with a focus on reliability, performance, and seamless integration with existing power infrastructure. Our engineering team continuously innovates to address the unique challenges of the Indian market, including power fluctuations, extreme weather conditions, and diverse usage patterns.
              </p>
            </motion.div>

            {/* Section 3: Product Brands */}
            <motion.div variants={fadeUp} className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                SpiderEV & SpiderVault — Our Two Product Brands Explained
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our product line is split into two lines. SpiderEV is the charging hardware and network software, the chargers themselves plus SpiderConnect, our charge point management platform. SpiderConnect enables real-time monitoring, remote diagnostics, and seamless payment integration, giving charge point operators complete control over their charging infrastructure.
              </p>
              <p className="text-gray-600 leading-relaxed">
                SpiderVault is our battery energy storage line, designed to be used in conjunction with EV stations to reduce peak demands, or deployed independently for home and commercial backup power. This dual-brand approach allows us to address both immediate charging needs and long-term energy management solutions for our customers.
              </p>
            </motion.div>

            {/* Section 4: Regional Presence */}
            <motion.div variants={fadeUp} className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Our Presence in Telangana & Andhra Pradesh
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We are located in Hyderabad, Telangana and we provide services across Telangana and Andhra Pradesh. That's an intentional regional focus — we'd rather have fast, accountable support in two states, than thin coverage across the country. As demand increases, we expand that reach through our franchise and partner network without diluting service quality.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our installation and maintenance services now cover 15+ cities across India, ensuring that wherever you deploy our chargers, you have reliable local support backed by our engineering team in Hyderabad.
              </p>
            </motion.div>

            {/* Section 5: Certifications */}
            <motion.div variants={fadeUp} className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Certifications & Compliance — BIS, OCPP, IP67, IS 17017
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We don't take certification lightly. BIS certification means our hardware meets India's electrical safety standards. OCPP compliance means our chargers are interoperable with the wider EV charging ecosystem, not just our own network. The hardware is IP67 protected, which means it can withstand the Indian outdoor environment - heat, dust and monsoon exposure - without any drop in performance.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our commitment to quality and compliance extends across every product line, ensuring that whether you're installing a home charger or a high-power DC fast charger, you're getting a product that meets or exceeds all relevant Indian and international standards.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative overflow-hidden py-16" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative max-w-330 mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid sm:grid-cols-3 gap-8 text-center"
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={scaleUp}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <div className="text-5xl font-extrabold text-secondary">{s.num}</div>
                <div className="text-white/70 text-sm mt-2 max-w-[160px] mx-auto">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Company Logo Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-330 mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="bg-white rounded-2xl p-10 flex items-center justify-center shadow-sm"
          >
            <img
              src={spiderEvLogo}
              alt="SpiderEV - EV Charger Manufacturer in Telangana and Andhra Pradesh"
              className="max-h-32 w-auto object-contain"
            />
          </motion.div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-330 mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-gray-900">Trusted by Industry Leaders</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 mt-3">Partnering with India's most recognized brands and institutions.</motion.p>
          </motion.div>
          <motion.div
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6"
          >
            {partners.map((p) => (
              <motion.div
                key={p.name}
                variants={scaleUp}
                whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
                className="bg-white border border-gray-100 rounded-xl p-5 w-[160px] h-[90px] flex items-center justify-center shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AboutUsPage;
