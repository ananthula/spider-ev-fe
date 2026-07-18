import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "../../hooks/useInView";
import { fadeUp, staggerContainer } from "../../utils/animationConfig";

const StatsSection = () => {
  const { ref, isInView } = useInView();

  const stats = [
    {
      number: "30+",
      label: "Years of expertise in power electronics industry.",
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" strokeWidth="1.8" />
          <path strokeLinecap="round" strokeWidth="1.8" d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.64 5.64l1.56 1.56M16.8 16.8l1.56 1.56M5.64 18.36 7.2 16.8M16.8 7.2l1.56-1.56" />
        </svg>
      )
    },
    {
      number: "15+",
      label: "Cities covered by our installation and maintenance services.",
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="6.5" y="3.5" width="11" height="17" rx="1.5" strokeWidth="1.8" />
          <path strokeLinecap="round" strokeWidth="1.8" d="M9.5 7.5h1M12 7.5h1M14.5 7.5h1M9.5 11h1M12 11h1M14.5 11h1M9.5 14.5h1M12 14.5h1M14.5 14.5h1M12 18h.01" />
        </svg>
      )
    },
    {
      number: "5K+",
      label: "AC & DC chargers deployed across various cities.",
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M7 4.5h7l4 4V19a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V6A1.5 1.5 0 0 1 7 4.5Z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M14 4.5V9h4M11 10.5v5M9.5 13h3" />
        </svg>
      )
    }
  ];

  return (
    <section ref={ref} className="w-full bg-[#F3F5F8]">
      <div className="max-w-330 mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-6xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2f3236] leading-tight"
          >
            <span className="text-secondary">SpiderEV —</span> India&apos;s Smart EV Charging Infrastructure
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="mt-5 text-base sm:text-lg text-[#4a5568] leading-relaxed max-w-5xl mx-auto text-left space-y-4"
          >
            <p>
              Spider Energy is developing and installing EV charging infrastructure in Telangana and Andhra Pradesh,
              ranging from 3.3 kW home AC chargers to 240 kW ultra-rapid DC fast chargers. All our chargers are
              BIS-certified, OCPP compliant and designed for Indian grid conditions and weather.
            </p>
            <p>
              We have two lines of products. <strong>SpiderEV</strong> offers the full range of charging hardware –
              AC and DC chargers for homes, apartments, commercial fleets and highway corridors – as well as SpiderConnect,
              our charge point management software. Our battery energy storage line is <strong>SpiderVault</strong>,
              made to go with EV stations, solar installations and standalone home or commercial backup.
            </p>
            <p>
              Businesses have two options to get in: a direct EV charging franchise with support from our dealerships
              and guidance on how to set up, or a partner model for site hosts, fleet operators and fuel station owners
              who want to add EV charging without managing the operation themselves. Homeowners can avail affordable
              home charging through our <strong>Har Ghar Charger</strong> initiative and earn from your own station.
            </p>
            <p>
              Everything that we make is made in India. This is important in two ways: you&apos;ll get local support
              faster if something needs servicing, and you won&apos;t have to pay the overhead costs of imported hardware.
              If you&apos;re considering EV charging infrastructure in Telangana or Andhra Pradesh – whether for your
              home, your business or as an investment – start with what you&apos;re trying to solve, and we&apos;ll
              point you to the right product line.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-8">
            <Link
              to="/about-us"
              className="text-[#2f3236] underline underline-offset-2 font-semibold hover:text-black transition-colors"
            >
              know more
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="bg-primary">
        <div className="max-w-330 mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto rounded-xl border border-white/25 bg-white/5 flex items-center justify-center">
                  {stat.icon}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="mt-5 text-5xl sm:text-6xl lg:text-7xl leading-none font-extrabold text-transparent"
                  style={{ WebkitTextStroke: "2px #45B14B" }}
                >
                  {stat.number}
                </motion.div>
                <p className="mt-3 text-white text-sm sm:text-base lg:text-lg leading-snug font-semibold max-w-xs mx-auto">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
