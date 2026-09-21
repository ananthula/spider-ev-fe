import { Helmet } from "react-helmet-async";
import Home from "../containers/Home/Home";
import SEO from "../components/SEO";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Spider Energy | EV Charger Manufacturer in Telangana & AP</title>
        <meta name="description" content="Spider Energy manufactures BIS-certified EV charging infrastructure (SpiderEV) and battery energy storage systems (SpiderVault) for homes, businesses, and highways in Telangana & Andhra Pradesh." />
      </Helmet>
      <SEO
        title="Spider Energy | EV Charger Manufacturer in Telangana & AP"
        description="Spider Energy manufactures BIS-certified EV charging infrastructure (SpiderEV) and battery energy storage systems (SpiderVault) for homes, businesses, and highways in Telangana & Andhra Pradesh."
      />
      <Home />
    </>
  );
};

export default HomePage;
