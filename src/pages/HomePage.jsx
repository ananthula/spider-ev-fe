import { Helmet } from "react-helmet-async";
import Home from "../containers/Home/Home";
import SEO from "../components/SEO";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Spider Energy | EV Charger Manufacturer in Telangana & AP</title>
        <meta name="description" content="Spider Energy builds SpiderEV chargers and SpiderVault BESS from Hyderabad for Telangana, Andhra Pradesh and India. AC, DC, CPMS and franchise." />
      </Helmet>
      <SEO
        title="Spider Energy | EV Charger Manufacturer in Telangana & AP"
        description="Spider Energy builds SpiderEV chargers and SpiderVault BESS from Hyderabad for Telangana, Andhra Pradesh and India. AC, DC, CPMS and franchise."
      />
      <Home />
    </>
  );
};

export default HomePage;
