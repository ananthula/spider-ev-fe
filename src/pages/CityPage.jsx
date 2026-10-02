import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/SEO";
import HeroBanner from "../components/ui/HeroBanner";
import Accordion from "../components/ui/Accordion";
import heroBg from "../assets/home/hero-bg.webp";
import { getBreadcrumbSchema, getFAQSchema, getServiceSchema } from "../seo/schemas";

const cities = {
  hyderabad: {
    name: "Hyderabad",
    title: "EV Chargers in Hyderabad | Spider Energy (SpiderEV)",
    description: "Spider Energy supplies SpiderEV AC & DC chargers in Hyderabad, Telangana. Installation, franchise and CPMS support. Call +91-9997776080.",
    proof: "Spider Energy operates from T-Hub, Raidurgam, Hyderabad, and supplies SpiderEV chargers across Telangana.",
  },
  vijayawada: {
    name: "Vijayawada",
    title: "EV Chargers in Vijayawada | Spider Energy (SpiderEV)",
    description: "Spider Energy supplies SpiderEV AC & DC chargers in Vijayawada, Andhra Pradesh. Installation, franchise and CPMS support. Call +91-9997776080.",
    proof: "Spider Energy serves Vijayawada from its T-Hub headquarters in Hyderabad, with sales coverage across Andhra Pradesh.",
  },
  visakhapatnam: {
    name: "Visakhapatnam",
    title: "EV Chargers in Visakhapatnam | Spider Energy (SpiderEV)",
    description: "Spider Energy supplies SpiderEV AC & DC chargers in Visakhapatnam, Andhra Pradesh. Installation, franchise and CPMS support. Call +91-9997776080.",
    proof: "Spider Energy serves Visakhapatnam from its T-Hub headquarters in Hyderabad, with sales coverage across Andhra Pradesh.",
  },
};

export default function CityPage({ city }) {
  const data = cities[city];
  if (!data) return null;

  const path = `/ev-chargers-${city}`;
  const faqs = [
    { question: `Which home EV chargers are available in ${data.name}?`, answer: "Spider Mini and Spider Lite provide 3.3 kW charging. Spider Smart provides 7.4 kW charging. The suitable model depends on the vehicle, parking supply and available electrical load." },
    { question: "Do SpiderEV chargers support OCPP?", answer: "SpiderEV's listed connected chargers use OCPP 1.6J and can be managed through SpiderConnect CPMS." },
    { question: `How do I plan an EV charging site in ${data.name}?`, answer: "Start with the site address, available power, vehicle mix and expected dwell time. Spider Energy can then recommend AC or DC hardware and the appropriate CPMS setup. Timelines depend on the site and approvals." },
  ];
  const schema = getServiceSchema({ name: `EV charger supply and installation in ${data.name}`, description: data.description, url: path, serviceType: "EV charger supply and installation" });
  const breadcrumbs = getBreadcrumbSchema([{ name: "Home", url: "/" }, { name: `EV Chargers in ${data.name}`, url: path }]);

  return (
    <PageLayout>
      <Helmet><title>{data.title}</title><meta name="description" content={data.description} /></Helmet>
      <SEO schema={schema} schemas={[getFAQSchema(faqs)]} breadcrumbs={breadcrumbs} title={data.title} description={data.description} />
      <HeroBanner title={`EV Chargers & Charging Stations in ${data.name}`} subtitle={data.proof} bgImage={heroBg} />

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900">Why {data.name} fleets and homeowners choose SpiderEV</h2>
          <p className="mt-5 text-lg leading-relaxed text-gray-600">{data.proof} We size home AC wallboxes and commercial DC sites by reviewing the load first, then selecting the charger, and adding SpiderConnect CPMS when a site operates multiple charging points.</p>

          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <article className="rounded-2xl border border-gray-100 p-7 shadow-sm">
              <h2 className="text-2xl font-bold">Home AC options</h2>
              <p className="mt-3 text-gray-600">Spider Mini and Spider Lite offer 3.3 kW charging for overnight top-ups. Spider Smart offers 7.4 kW where the vehicle, wiring and available load support it.</p>
              <Link className="inline-block mt-5 font-semibold text-primary" to="/electric-vehicle-ev-ac-charger">View AC chargers →</Link>
            </article>
            <article className="rounded-2xl border border-gray-100 p-7 shadow-sm">
              <h2 className="text-2xl font-bold">Public and fleet DC options</h2>
              <p className="mt-3 text-gray-600">SpiderEV DC chargers serve public sites, fleets and corridor locations. Charger power and connector choice depend on vehicles, dwell time and the site's sanctioned load.</p>
              <Link className="inline-block mt-5 font-semibold text-primary" to="/electric-vehicle-ev-dc-charger">View DC chargers →</Link>
            </article>
          </div>

          <div className="mt-12 rounded-2xl bg-gray-50 p-7">
            <h2 className="text-2xl font-bold">Service and sales contact for {data.name}</h2>
            <p className="mt-3 text-gray-600">For a site survey, call <a className="font-semibold text-primary" href="tel:+919997776080">+91-9997776080</a> or share the site details through the contact page.</p>
            <div className="flex flex-wrap gap-3 mt-5">
              <Link className="bg-primary text-white px-5 py-3 rounded-xl font-semibold" to="/contact-us">Request survey</Link>
              <Link className="border border-primary text-primary px-5 py-3 rounded-xl font-semibold" to="/ev-charging-station-franchise">Franchise enquiry</Link>
              <Link className="border border-primary text-primary px-5 py-3 rounded-xl font-semibold" to="/spiderev">About SpiderEV</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50"><div className="max-w-3xl mx-auto px-4"><h2 className="text-3xl font-bold text-center mb-8">Frequently asked questions</h2><Accordion items={faqs} /></div></section>
    </PageLayout>
  );
}
