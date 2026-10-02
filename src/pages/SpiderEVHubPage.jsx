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
    imageWidth: 1536,
    imageHeight: 1024,
  },
  {
    name: "DC Fast Chargers",
    description: "Rapid charging systems from 3 kW to 240 kW for public networks and depots.",
    href: "/electric-vehicle-ev-dc-charger",
    image: dcImage,
    imageWidth: 1536,
    imageHeight: 1024,
  },
  {
    name: "SpiderConnect CPMS",
    description: "Monitor, control, price, and maintain OCPP charging networks from one platform.",
    href: "/cpms-ev-charging-point-management-system",
    image: connectImage,
    imageWidth: 1536,
    imageHeight: 1024,
  },
  {
    name: "SpiderEV App",
    description: "Find stations, start charging, pay digitally, and review charging sessions.",
    href: "/ev-charging-station-app",
    image: appImage,
    imageWidth: 2222,
    imageHeight: 1250,
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

const acModels = [
  ["Spider Mini", "3.3 kW", "/products/ac/spider-mini"], ["Spider Lite", "3.3 kW", "/products/ac/spider-lite"],
  ["Spider Smart", "7.4 kW", "/products/ac/spider-smart"], ["Spider Blaze", "22 kW", "/products/ac/spider-blaze"],
  ["Spider Strike", "40 kW", "/products/ac/spider-strike"], ["Spider Dash", "80 kW", "/products/ac/spider-dash"],
];
const dcModels = [
  ["Spider Base", "3 kW", "/products/dc/spider-base"], ["Spider Fast", "30 kW", "/products/dc/spider-fast"],
  ["Spider Spark", "40 kW", "/products/dc/spider-spark"], ["Spider Falcon", "60 kW", "/products/dc/spider-falcon"],
  ["Spider Ultra", "120 kW", "/products/dc/spider-ultra"], ["Spider Surge", "180 kW", "/products/dc/spider-surge"],
  ["Spider Hulk", "240 kW", "/products/dc/spider-hulk"],
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
  const title = "SpiderEV | EV Chargers, CPMS & App by Spider Energy";
  const description = "SpiderEV is Spider Energy's EV charging line: BIS-ready AC & DC chargers, SpiderConnect CPMS and the SpiderEV App for Telangana, AP and India.";

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
        title="SpiderEV - EV Charging Products by Spider Energy"
        subtitle="SpiderEV is the EV charging product line from Spider Energy, based at T-Hub in Raidurgam, Hyderabad."
        bgImage={dcImage}
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-330 mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-3xl mb-10">
            <p className="text-lg text-gray-600 leading-relaxed">
              SpiderEV is the EV charging product line from Spider Energy. It includes AC chargers from 3.3 kW to 80 kW, DC fast chargers from 3 kW to 240 kW, SpiderConnect CPMS and the SpiderEV App. Spider Energy is the parent company; SpiderEV is not a separate company.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {offerings.map((offering) => (
              <article key={offering.href} className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden bg-white">
                <div className="h-52 bg-gray-50 flex items-center justify-center p-6">
                  <img loading="lazy" decoding="async" width={offering.imageWidth} height={offering.imageHeight} src={offering.image} alt={`${offering.name} by SpiderEV`} className="h-full w-full object-contain" />
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
        <div className="max-w-330 mx-auto px-4 sm:px-6 lg:px-10 grid lg:grid-cols-2 gap-8">
          {[["AC chargers at a glance", acModels, "/electric-vehicle-ev-ac-charger"], ["DC fast chargers at a glance", dcModels, "/electric-vehicle-ev-dc-charger"]].map(([heading, models, href]) => (
            <div key={heading} className="bg-white rounded-2xl p-7 shadow-sm">
              <h2 className="text-3xl font-bold">{heading}</h2>
              <div className="grid sm:grid-cols-2 gap-3 mt-6">{models.map(([name, power, path]) => <Link key={path} to={path} className="flex justify-between border border-gray-100 rounded-xl p-3 hover:border-primary"><span className="font-semibold">{name}</span><span className="text-gray-500">{power}</span></Link>)}</div>
              <Link to={href} className="inline-block mt-6 font-semibold text-primary">Compare the full range →</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white"><div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold">Who should buy SpiderEV</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {[['Homeowners','Compare Mini, Lite and Smart for overnight charging.','/guides/home-ev-charger-buying-guide-telangana-andhra'],['Fleets','Match charger power to vehicle mix and dwell time.','/electric-vehicle-ev-dc-charger'],['Charge point operators','Connect multiple chargers through SpiderConnect CPMS.','/cpms-ev-charging-point-management-system'],['Franchise partners','Plan hardware, CPMS and site requirements with Spider Energy.','/ev-charging-station-franchise']].map(([title, text, href]) => <Link key={title} to={href} className="rounded-2xl border border-gray-100 p-5 hover:border-primary"><h3 className="font-bold text-lg">{title}</h3><p className="mt-2 text-gray-600 text-sm">{text}</p></Link>)}
        </div>
        <div className="rounded-2xl bg-primary text-white p-8 mt-12"><h2 className="text-3xl font-bold">Talk to sales</h2><p className="mt-3 text-white/80">Spider Energy, T-Hub, Raidurgam, Hyderabad · +91-9997776080</p><div className="flex flex-wrap gap-3 mt-6"><Link to="/contact-us" className="bg-white text-primary px-5 py-3 rounded-xl font-semibold">Get a quote</Link><Link to="/spidervault" className="border border-white px-5 py-3 rounded-xl font-semibold">See SpiderVault</Link><Link to="/guides/ac-vs-dc-ev-charger-india" className="border border-white px-5 py-3 rounded-xl font-semibold">AC vs DC guide</Link></div></div>
      </div></section>

      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">SpiderEV questions</h2>
          <Accordion items={faqItems} />
        </div>
      </section>
    </PageLayout>
  );
}
