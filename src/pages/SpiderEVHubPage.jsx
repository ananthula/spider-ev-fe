import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/SEO";
import Accordion from "../components/ui/Accordion";
import HeroBanner from "../components/ui/HeroBanner";
import acImage from "../assets/home/AcCharger.webp";
import dcImage from "../assets/home/DcCharger.webp";
import connectImage from "../assets/home/SpiderConnect.webp";
import appImage from "../assets/home/SpiderApp.webp";
import {
  getBreadcrumbSchema,
  getCollectionPageSchema,
  getFAQSchema,
} from "../seo/schemas";

const offerings = [
  {
    name: "AC EV Chargers",
    description: "Home, workplace, and fleet chargers from 3.3 kW to 80 kW.",
    href: "/electric-vehicle-ev-ac-charger",
    image: acImage,
  },
  {
    name: "DC Fast Chargers",
    description: "Rapid charging systems from 3 kW to 240 kW for public networks and depots.",
    href: "/electric-vehicle-ev-dc-charger",
    image: dcImage,
  },
  {
    name: "SpiderConnect CPMS",
    description: "Monitor, control, price, and maintain OCPP charging networks from one platform.",
    href: "/cpms-ev-charging-point-management-system",
    image: connectImage,
  },
  {
    name: "SpiderEV App",
    description: "Find stations, start charging, pay digitally, and review charging sessions.",
    href: "/ev-charging-station-app",
    image: appImage,
  },
];

const faqItems = [
  {
    question: "What is the difference between Spider Energy, SpiderEV and SpiderVault?",
    answer: "Spider Energy is the parent company. SpiderEV is its EV charging line, including AC and DC chargers, SpiderConnect CPMS, and the SpiderEV app. SpiderVault is its battery energy storage line.",
  },
  {
    question: "What products are included in SpiderEV?",
    answer: "SpiderEV includes home and commercial AC chargers, DC fast chargers for public and fleet use, SpiderConnect charging management software, and the SpiderEV driver app.",
  },
  {
    question: "Where does Spider Energy operate?",
    answer: "Spider Energy is based at T-Hub, Raidurgam, Hyderabad, with primary service coverage across Telangana and Andhra Pradesh.",
  },
];

const collectionSchema = getCollectionPageSchema({
  name: "SpiderEV Charging Products and Software",
  description: "Spider Energy's SpiderEV line of AC and DC chargers, charging management software, and driver app.",
  url: "/spiderev",
  items: offerings.map(({ name, href }) => ({ name, url: href })),
});

const breadcrumbs = getBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "SpiderEV", url: "/spiderev" },
]);

export default function SpiderEVHubPage() {
  const title = "SpiderEV | EV Chargers, CPMS & Charging App";
  const description = "Explore SpiderEV AC and DC chargers, SpiderConnect CPMS, and the SpiderEV charging app from Spider Energy for homes, businesses, fleets, and public networks.";

  return (
    <PageLayout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <SEO
        schema={collectionSchema}
        schemas={[getFAQSchema(faqItems)]}
        breadcrumbs={breadcrumbs}
        title={title}
        description={description}
        ogImage={dcImage}
      />
      <HeroBanner
        title="SpiderEV — EV Charging Hardware, Software & Driver App"
        subtitle="Spider Energy's connected charging line for homes, businesses, fleets, and public networks."
        bgImage={dcImage}
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-330 mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-3xl mb-10">
            <p className="text-lg text-gray-600 leading-relaxed">
              SpiderEV brings charging hardware and software into one product line. Choose an AC or DC charger, manage it through SpiderConnect, and give drivers station discovery and payment through the SpiderEV app.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {offerings.map((offering) => (
              <article key={offering.href} className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden bg-white">
                <div className="h-52 bg-gray-50 flex items-center justify-center p-6">
                  <img loading="lazy" src={offering.image} alt={`${offering.name} by SpiderEV`} className="h-full w-full object-contain" />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900">{offering.name}</h2>
                  <p className="mt-3 text-gray-600">{offering.description}</p>
                  <Link to={offering.href} className="inline-flex mt-5 font-semibold text-primary hover:text-secondary transition-colors">
                    Explore {offering.name} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">SpiderEV questions</h2>
          <Accordion items={faqItems} />
        </div>
      </section>
    </PageLayout>
  );
}
