import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/SEO";
import HeroBanner from "../components/ui/HeroBanner";
import Accordion from "../components/ui/Accordion";
import heroBg from "../assets/home/hero-bg.webp";
import { getBreadcrumbSchema, getFAQSchema } from "../seo/schemas";

const guides = {
  "ac-vs-dc-ev-charger-india": {
    title: "AC vs DC EV Chargers in India - Which Do You Need?",
    description: "Clear AC vs DC EV charging guide for India. Power ranges, connectors, home vs public use, and which SpiderEV models fit each job.",
    h1: "AC vs DC EV Chargers in India - A Practical Guide",
    intro: "AC chargers feed the vehicle's onboard charger. DC fast chargers bypass that onboard unit and send power directly to the battery. If vehicles sit for hours, AC is usually the practical choice. If drivers stop briefly and need meaningful range, consider DC.",
    sections: [
      ["What AC charging does", "An AC charge point supplies alternating current to the vehicle. The vehicle's onboard charger converts it to DC for the battery, so charging speed is limited by both the charge point and the vehicle's onboard charger. Spider Mini and Lite provide 3.3 kW, Smart provides 7.4 kW, Blaze 22 kW, Strike 40 kW and Dash 80 kW."],
      ["What DC fast charging does", "A DC charger performs the conversion outside the vehicle and supplies the battery directly. This supports shorter stops at public sites, highway corridors and fleet depots. Actual speed still depends on the vehicle, battery state, temperature and the charger's available power."],
      ["Connector cheat sheet", "Type 2 is common for AC charging. CCS2 combines AC and DC contacts and is widely used for passenger-car DC charging. CHAdeMO serves compatible vehicles. IS 17017-2-6 applies to supported light-electric-vehicle charging use cases."],
      ["SpiderEV picks by scenario", "For home charging, compare Spider Mini and Spider Smart. For workplaces, compare Spider Blaze and Spider Strike. For public charging, start with Spider Fast and scale by vehicle dwell time and site load. Spider Base is the dedicated starting point for supported two-wheeler use cases."],
    ],
    table: [["Home / overnight", "AC", "Mini, Smart"], ["Office / long dwell", "AC", "Blaze, Strike"], ["Public / short dwell", "DC", "Fast and above"], ["Supported 2W fleet", "DC", "Base"]],
    links: [["See AC range", "/electric-vehicle-ev-ac-charger"], ["See DC range", "/electric-vehicle-ev-dc-charger"], ["About SpiderEV", "/spiderev"]],
    faqs: [{ question: "Is DC always better than AC?", answer: "No. AC is often the better fit when a vehicle remains parked for hours. DC is useful when dwell time is short and the vehicle supports fast charging." }, { question: "Can every EV use every connector?", answer: "No. Match the connector and charging standard to the vehicle before selecting hardware." }],
  },
  "home-ev-charger-buying-guide-telangana-andhra": {
    title: "Home EV Charger Guide for Telangana & Andhra Pradesh",
    description: "How to choose a home EV charger in TG & AP: 3.3 vs 7.4 kW, single-phase limits, apartment parking, and SpiderEV Mini, Lite and Smart.",
    h1: "Buying a Home EV Charger in Telangana & Andhra Pradesh",
    intro: "Start with the supply available at the parking bay, the vehicle's AC input limit and the distance driven each day. A larger wallbox does not make the car charge faster than its onboard charger allows.",
    sections: [
      ["Single-phase reality in many apartments", "Many apartment parking bays use single-phase power. Check the sanctioned load, cable route, earthing and society requirements before selecting a charger. Spider Mini and Lite are 3.3 kW options; Spider Smart is 7.4 kW where the electrical supply and vehicle allow it."],
      ["3.3 kW vs 7.4 kW", "A 3.3 kW unit is often enough for an overnight top-up when daily driving is moderate. A 7.4 kW unit can add energy faster, but only when the vehicle accepts that rate and the connection can support it. Charge time also changes with battery size and starting state of charge."],
      ["Permissions and parking", "Confirm the parking allocation, cable route, metering arrangement and electrical approval process with the property or residents' association. This is general planning guidance, not legal advice."],
      ["Spider Mini vs Lite vs Smart", "Choose Mini or Lite when 3.3 kW matches the vehicle and available supply. Compare Smart when 7.4 kW is supported and app-connected control is wanted. A site inspection should confirm protection, earthing and installation details."],
      ["When to call an electrician or Spider Energy", "Ask for an assessment when the cable run is long, the parking supply is shared, earthing is uncertain, or the existing load is close to its limit. Spider Energy can review the site and recommend the appropriate charger."],
    ],
    links: [["Get a Mini quote", "/products/ac/spider-mini"], ["Compare Smart", "/products/ac/spider-smart"], ["Contact installation team", "/contact-us"]],
    faqs: [{ question: "Is 3.3 kW enough for daily home charging?", answer: "It can be when daily driving is moderate and the vehicle remains parked overnight. Confirm against the vehicle battery, daily kilometres and available charging window." }, { question: "Can I install a charger in apartment parking?", answer: "It depends on the parking allocation, electrical capacity, cable route and society or property requirements. Review these before installation." }],
  },
};

export default function GuidePage({ slug }) {
  const guide = guides[slug];
  if (!guide) return null;
  const path = `/guides/${slug}`;
  const breadcrumbs = getBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Guides", url: "/blog" }, { name: guide.h1, url: path }]);
  const article = { "@context": "https://schema.org", "@type": "Article", headline: guide.h1, description: guide.description, mainEntityOfPage: `https://spiderenergy.in${path}`, author: { "@type": "Organization", name: "Spider Energy" }, publisher: { "@id": "https://spiderenergy.in/#organization" }, inLanguage: "en-IN" };
  return (
    <PageLayout>
      <Helmet><title>{guide.title}</title><meta name="description" content={guide.description} /></Helmet>
      <SEO schema={article} schemas={[getFAQSchema(guide.faqs)]} breadcrumbs={breadcrumbs} title={guide.title} description={guide.description} ogType="article" />
      <HeroBanner title={guide.h1} subtitle={guide.intro} bgImage={heroBg} />
      <article className="py-16 sm:py-20 bg-white"><div className="max-w-4xl mx-auto px-4 sm:px-6">
        {guide.table && <div className="overflow-x-auto mb-12"><table className="w-full text-left border-collapse"><thead><tr className="bg-primary text-white"><th className="p-4">Scenario</th><th className="p-4">Typical fit</th><th className="p-4">SpiderEV starting points</th></tr></thead><tbody>{guide.table.map(row => <tr key={row[0]} className="border-b border-gray-200">{row.map(cell => <td key={cell} className="p-4">{cell}</td>)}</tr>)}</tbody></table></div>}
        <div className="space-y-10">{guide.sections.map(([heading, body]) => <section key={heading}><h2 className="text-3xl font-bold text-gray-900">{heading}</h2><p className="mt-4 text-lg leading-relaxed text-gray-600">{body}</p></section>)}</div>
        <div className="flex flex-wrap gap-3 mt-12">{guide.links.map(([label, href]) => <Link key={href} to={href} className="bg-primary text-white px-5 py-3 rounded-xl font-semibold">{label}</Link>)}</div>
      </div></article>
      <section className="py-16 bg-gray-50"><div className="max-w-3xl mx-auto px-4"><h2 className="text-3xl font-bold text-center mb-8">Frequently asked questions</h2><Accordion items={guide.faqs} /></div></section>
    </PageLayout>
  );
}
