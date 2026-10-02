import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/SEO";
import HeroBanner from "../components/ui/HeroBanner";
import Accordion from "../components/ui/Accordion";
import heroBg from "../assets/home/hero-bg.webp";
import { getBreadcrumbSchema, getFAQSchema } from "../seo/schemas";

const models = [
  { name: "SpiderVault 3.0", power: "3 kW", capacity: "3 kWh", backup: "Up to 6 hours", use: "Apartments and essential home loads" },
  { name: "SpiderVault 5.0", power: "5.5 kW", capacity: "5 kWh", backup: "Up to 8 hours", use: "Villas and broader home loads" },
  { name: "SpiderVault 12.0", power: "12 kW", capacity: "12 kWh", backup: "Up to 12 hours", use: "Large homes and small commercial loads" },
];

const faqs = [
  { question: "What is SpiderVault?", answer: "SpiderVault is Spider Energy's battery energy storage line. Its packaged systems combine a solar hybrid inverter, battery pack and battery management system." },
  { question: "Can SpiderVault support an EV charging station?", answer: "Battery storage can support peak management, solar shifting and continuity at some charging sites. Charger power, traffic, tariff and available grid capacity must be reviewed before sizing." },
  { question: "How do I choose between 3.0, 5.0 and 12.0?", answer: "Compare the connected loads, expected backup window, solar input and available electrical supply. A sizing call should confirm the final model." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "ProductGroup",
  "@id": "https://spiderenergy.in/spidervault#productgroup",
  name: "SpiderVault Battery Energy Storage",
  brand: { "@id": "https://spiderenergy.in/#brand-spidervault" },
  manufacturer: { "@id": "https://spiderenergy.in/#organization" },
  hasVariant: models.map((model) => ({ "@type": "Product", name: model.name, description: `${model.capacity}, ${model.power}, ${model.use}` })),
};

export default function SpiderVaultHubPage() {
  const title = "SpiderVault | BESS by Spider Energy (3.0 / 5.0 / 12.0)";
  const description = "SpiderVault battery energy storage from Spider Energy. Models 3.0, 5.0 and 12.0 for homes, businesses and EV charging stations in AP & Telangana.";
  const breadcrumbs = getBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "SpiderVault", url: "/spidervault" }]);
  return (
    <PageLayout>
      <Helmet><title>{title}</title><meta name="description" content={description} /></Helmet>
      <SEO schema={schema} schemas={[getFAQSchema(faqs)]} breadcrumbs={breadcrumbs} title={title} description={description} ogImage="/og/products/spidervault-12.jpg" />
      <HeroBanner title="SpiderVault - Battery Energy Storage by Spider Energy" subtitle="SpiderVault combines a solar hybrid inverter, battery pack and BMS for homes, businesses and EV charging sites." bgImage={heroBg} />

      <section className="py-16 sm:py-20 bg-white"><div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold">What SpiderVault is</h2>
        <p className="mt-4 text-lg leading-relaxed text-gray-600">SpiderVault is Spider Energy's battery energy storage line. The packaged units described here combine an inverter, battery and battery management system, with solar integration for supported site designs.</p>

        <h2 className="text-3xl font-bold mt-12 mb-5">Model comparison: 3.0 vs 5.0 vs 12.0</h2>
        <div className="overflow-x-auto"><table className="w-full text-left"><thead><tr className="bg-primary text-white"><th className="p-4">Model</th><th className="p-4">Rated power</th><th className="p-4">Battery</th><th className="p-4">Published backup</th><th className="p-4">Use case</th></tr></thead><tbody>{models.map(model => <tr key={model.name} className="border-b border-gray-200"><th className="p-4">{model.name}</th><td className="p-4">{model.power}</td><td className="p-4">{model.capacity}</td><td className="p-4">{model.backup}</td><td className="p-4">{model.use}</td></tr>)}</tbody></table></div>
        <p className="mt-3 text-sm text-gray-500">Backup duration depends on the connected load and operating conditions. Confirm the final design through a sizing assessment.</p>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <article className="rounded-2xl border border-gray-100 shadow-sm p-7"><h2 className="text-2xl font-bold">For EV charging stations</h2><p className="mt-3 text-gray-600">Storage can buffer peak demand, shift daytime solar into later charging sessions and support uptime. Savings and capacity are site-specific and require an engineering and tariff review.</p><Link className="inline-block mt-5 font-semibold text-primary" to="/guides/bess-for-ev-charging-stations">Read the station guide →</Link></article>
          <article className="rounded-2xl border border-gray-100 shadow-sm p-7"><h2 className="text-2xl font-bold">For homes and villas in AP & TG</h2><p className="mt-3 text-gray-600">Compare essential loads, AC and appliance use, expected backup time and solar input. SpiderVault 3.0, 5.0 and 12.0 cover progressively larger residential load profiles.</p><Link className="inline-block mt-5 font-semibold text-primary" to="/spidervault-bess-battery-energy-storage">View full model details →</Link></article>
        </div>

        <section className="mt-12 rounded-2xl bg-gray-50 p-7"><h2 className="text-2xl font-bold">How SpiderVault pairs with SpiderEV DC hubs</h2><p className="mt-3 text-gray-600">Where grid capacity is tight or solar generation needs to be shifted, SpiderVault can be assessed alongside SpiderEV DC chargers. The design starts with charger demand, session patterns and the existing connection.</p><div className="flex flex-wrap gap-3 mt-5"><Link to="/contact-us" className="bg-primary text-white px-5 py-3 rounded-xl font-semibold">Size my BESS</Link><Link to="/ev-charging-epc-services" className="border border-primary text-primary px-5 py-3 rounded-xl font-semibold">Talk to EPC</Link><Link to="/electric-vehicle-ev-dc-charger" className="border border-primary text-primary px-5 py-3 rounded-xl font-semibold">See SpiderEV DC chargers</Link></div></section>
      </div></section>
      <section className="py-16 bg-gray-50"><div className="max-w-3xl mx-auto px-4"><h2 className="text-3xl font-bold text-center mb-8">SpiderVault questions</h2><Accordion items={faqs} /></div></section>
    </PageLayout>
  );
}
