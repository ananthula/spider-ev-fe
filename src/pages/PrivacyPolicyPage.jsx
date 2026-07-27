import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/SEO";
import { getBreadcrumbSchema } from "../seo/schemas";
import heroBg from "../assets/home/hero-bg.webp";

const LAST_UPDATED = "27 July 2026";

const breadcrumbs = getBreadcrumbSchema([
  { name: "Home", url: "https://spiderenergy.in" },
  { name: "Privacy Policy" },
]);

const Section = ({ title, children }) => (
  <section className="mb-9">
    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{title}</h2>
    <div className="space-y-3 text-gray-600 leading-relaxed text-[15px] sm:text-base">
      {children}
    </div>
  </section>
);

const PrivacyPolicyPage = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>Privacy Policy | SpiderEV</title>
        <meta
          name="description"
          content="Spider Energy (SpiderEV) Privacy Policy — how we collect, use, store, share and protect your personal information across our website and mobile app."
        />
      </Helmet>
      <SEO breadcrumbs={breadcrumbs} />

      {/* Hero */}
      <section
        className="relative overflow-hidden py-16 sm:py-24"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative max-w-330 mx-auto px-4 sm:px-6 lg:px-10">
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl sm:text-5xl font-bold text-white"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="mt-4 text-white/80 text-lg max-w-2xl"
          >
            How Spider Energy collects, uses and protects your personal information.
          </motion.p>
        </div>
      </section>

      {/* Body */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10">
          <p className="text-sm text-gray-400 mb-10">Last updated: {LAST_UPDATED}</p>

          <div className="mb-10 text-gray-600 leading-relaxed text-[15px] sm:text-base space-y-3">
            <p>
              This Privacy Policy explains how Spider Energy (&quot;SpiderEV&quot;, &quot;we&quot;,
              &quot;us&quot; or &quot;our&quot;) collects, uses, discloses and safeguards your
              information when you visit our website{" "}
              <a href="https://spiderenergy.in" className="text-primary hover:underline">spiderenergy.in</a>,
              use the SpiderEV mobile application, or use our EV charging products and services
              (collectively, the &quot;Services&quot;).
            </p>
            <p>
              By using our Services, you agree to the collection and use of information in accordance
              with this Policy. If you do not agree with this Policy, please do not use our Services.
            </p>
          </div>

          <Section title="1. Information We Collect">
            <p>We collect the following categories of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Information you provide:</strong> name, email address, phone number, postal
                address, and any details you submit through enquiry, contact, franchise or partnership
                forms.
              </li>
              <li>
                <strong>Account &amp; charging data:</strong> when you use the SpiderEV app, we collect
                account credentials, charging session history, connector and station usage, and
                payment/transaction records processed through our payment partners.
              </li>
              <li>
                <strong>Location data:</strong> with your permission, the app uses your device location
                to show nearby charging stations and enable navigation. You can disable location access
                at any time through your device settings.
              </li>
              <li>
                <strong>Device &amp; usage data:</strong> device type, operating system, unique device
                identifiers, IP address, app version, and interaction logs used for diagnostics and
                service improvement.
              </li>
              <li>
                <strong>Cookies &amp; similar technologies:</strong> our website uses cookies and analytics
                tools to understand traffic and improve user experience.
              </li>
            </ul>
          </Section>

          <Section title="2. How We Use Your Information">
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide, operate and maintain our Services, including locating chargers and processing charging sessions.</li>
              <li>To process payments and send transaction confirmations and receipts.</li>
              <li>To respond to your enquiries, requests and support tickets.</li>
              <li>To send service-related notifications, and, where you have opted in, promotional communications.</li>
              <li>To improve, personalise and develop our products, app features and website.</li>
              <li>To detect, prevent and address technical issues, fraud and security incidents.</li>
              <li>To comply with legal obligations and enforce our terms.</li>
            </ul>
          </Section>

          <Section title="3. How We Share Your Information">
            <p>We do not sell your personal information. We may share information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Service providers</strong> who perform services on our behalf (payment processing, hosting, analytics, customer support, SMS/email delivery).</li>
              <li><strong>Charging network &amp; franchise partners</strong> to the extent necessary to complete a charging session you initiate.</li>
              <li><strong>Legal &amp; regulatory authorities</strong> when required by law, court order, or to protect our rights, safety, or the rights and safety of others.</li>
              <li><strong>Business transfers,</strong> in connection with a merger, acquisition or sale of assets, subject to this Policy.</li>
            </ul>
          </Section>

          <Section title="4. Data Retention">
            <p>
              We retain personal information only for as long as necessary to fulfil the purposes
              described in this Policy, including legal, accounting or reporting requirements. When no
              longer required, we securely delete or anonymise the data.
            </p>
          </Section>

          <Section title="5. Data Security">
            <p>
              We implement appropriate technical and organisational measures — including encryption in
              transit, access controls and secure infrastructure — to protect your information. However,
              no method of transmission or storage is completely secure, and we cannot guarantee absolute
              security.
            </p>
          </Section>

          <Section title="6. Your Rights &amp; Choices">
            <ul className="list-disc pl-6 space-y-2">
              <li>Access, correct or update your personal information.</li>
              <li>Request deletion of your account and associated personal data.</li>
              <li>Withdraw consent for location access or marketing communications at any time.</li>
              <li>Opt out of promotional emails using the unsubscribe link, or by contacting us.</li>
            </ul>
            <p>
              To exercise any of these rights, contact us at{" "}
              <a href="mailto:connect@spiderenergy.in" className="text-primary hover:underline">connect@spiderenergy.in</a>.
              You may also request account deletion directly within the SpiderEV app or by emailing us.
            </p>
          </Section>

          <Section title="7. Children's Privacy">
            <p>
              Our Services are not directed to children under the age of 18, and we do not knowingly
              collect personal information from children. If you believe a child has provided us with
              personal information, please contact us so we can delete it.
            </p>
          </Section>

          <Section title="8. Third-Party Links">
            <p>
              Our Services may contain links to third-party websites or services that we do not operate.
              This Policy does not apply to those third parties, and we encourage you to review their
              privacy policies.
            </p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page
              with an updated &quot;Last updated&quot; date. Significant changes may also be notified
              through the app or by email.
            </p>
          </Section>

          <Section title="10. Contact Us">
            <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
            <ul className="list-none space-y-1">
              <li><strong>Spider Energy</strong></li>
              <li>T-Hub, Raidurgam, Hyderabad, Telangana 500081, India</li>
              <li>
                Email:{" "}
                <a href="mailto:connect@spiderenergy.in" className="text-primary hover:underline">connect@spiderenergy.in</a>
              </li>
              <li>
                Phone:{" "}
                <a href="tel:+919997776080" className="text-primary hover:underline">+91 99977 76080</a>
              </li>
            </ul>
          </Section>
        </div>
      </section>
    </PageLayout>
  );
};

export default PrivacyPolicyPage;
