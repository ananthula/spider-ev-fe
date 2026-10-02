import { motion } from "framer-motion";
import { fadeUp, fadeRight, staggerContainer, staggerFast, viewport } from "../../utils/animationConfig";

const quickStats = [
  { value: "97%", label: "Efficiency" },
  { value: "10ms", label: "Transfer" },
  { value: "IP65", label: "Protection" },
  { value: "12 Yrs", label: "Warranty" },
];

const BessIntro = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-330 mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <motion.span variants={fadeUp} className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Meet SpiderVault
            </motion.span>
            <motion.h2 variants={fadeUp} className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              One Unit.{" "}
              <span className="text-primary">Inverter + Battery</span> + Solar.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 text-gray-600 text-lg leading-relaxed">
              SpiderVault is Spider Energy&apos;s battery energy storage line. It replaces three separate devices — inverter, battery, and solar charger — with one
              sleek, intelligent unit. Power your ACs, geysers, and every appliance through any outage,
              automatically, silently, and instantly.
            </motion.p>

            {/* Quick stats row */}
            <motion.div variants={staggerFast} className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {quickStats.map((s) => (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100"
                >
                  <div className="text-primary text-xl font-extrabold">{s.value}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8">
              <button
                onClick={() => scrollTo("products")}
                className="border-2 border-primary text-primary px-7 py-3 rounded-xl font-semibold hover:bg-primary hover:text-white transition-colors"
              >
                Explore Models
              </button>
            </motion.div>
          </motion.div>

          {/* Visual panel */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="relative"
          >
            <div className="bg-primary rounded-2xl p-8 text-center relative overflow-hidden min-h-85 flex flex-col items-center justify-center">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-secondary/10" />
              <div className="relative z-10">
                <div className="text-8xl mb-4">🔋</div>
                <div className="text-secondary text-3xl font-extrabold">SpiderVault</div>
                <div className="text-white/70 text-sm mt-2">Solar Hybrid Inverter · BIS Certified · Made in India</div>
                <div className="flex flex-wrap justify-center gap-2 mt-5">
                  {["Pure Sine Wave", "On/Off/Hybrid", "MPPT Solar", "5th Gen BMS", "AI Cloud"].map((tag) => (
                    <span key={tag} className="bg-white/10 border border-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-secondary text-white rounded-2xl px-5 py-3 shadow-lg">
              <div className="text-2xl font-extrabold leading-none">5K+</div>
              <div className="text-xs text-white/80 mt-0.5">Units Deployed</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BessIntro;
