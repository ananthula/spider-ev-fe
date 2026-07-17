import { Helmet } from "react-helmet-async";
import Home from "../containers/Home/Home";
import SEO from "../components/SEO";
import { organizationSchema, localBusinessSchema, getBreadcrumbSchema } from "../seo/schemas";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>EV Charging Station Manufacturer in Telangana & Andhra Pradesh</title>
        <meta name="description" content="Spider Energy manufactures BIS-certified EV charging infrastructure (SpiderEV) and battery energy storage systems (SpiderVault) for homes, businesses, and highways in Telangana & Andhra Pradesh." />
        <meta name="keywords" content="EV charger manufacturer Telangana, EV charging infrastructure Andhra Pradesh, BIS-certified chargers, DC fast charger India, SpiderEV, SpiderVault BESS, OCPP charging stations, EV charging Hyderabad" />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>
      <SEO schema={organizationSchema} />
      <Home />
    </>
  );
};

export default HomePage;
