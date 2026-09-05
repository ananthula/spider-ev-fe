import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PageLayout from "../components/layout/PageLayout";

const NotFound = () => (
  <PageLayout>
    <Helmet>
      <title>Page Not Found | Spider Energy</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <section className="min-h-[60vh] flex items-center justify-center px-4 py-20 text-center">
      <div className="max-w-xl">
        <p className="text-secondary font-semibold uppercase tracking-wider">404 error</p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-gray-900">Page not found</h1>
        <p className="mt-5 text-lg text-gray-600">
          The page may have moved or the address may be incorrect. Explore our EV chargers or return home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="rounded-xl bg-primary px-6 py-3 font-semibold text-white">Go to homepage</Link>
          <Link to="/blog" className="rounded-xl border-2 border-primary px-6 py-3 font-semibold text-primary">Read the blog</Link>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default NotFound;
  
