import { Helmet } from "react-helmet-async";
import Home from "../containers/Home/Home";
import SEO from "../components/SEO";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Spider Energy | EV Charger Manufacturer in Telangana & AP</title>
        <meta name="description" content="Spider Energy builds SpiderEV chargers in Hyderabad for Telangana, Andhra Pradesh and India. Explore AC, DC, CPMS and franchise solutions." />
      </Helmet>
      <SEO
        title="Spider Energy | EV Charger Manufacturer in Telangana & AP"
        description="Spider Energy builds SpiderEV chargers in Hyderabad for Telangana, Andhra Pradesh and India. Explore AC, DC, CPMS and franchise solutions."
      />
      <Home />
    </>
  );
};

export default HomePage;
