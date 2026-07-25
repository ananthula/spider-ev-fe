import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeUp, viewport } from "../../utils/animationConfig";
import { bessProducts } from "../../data/bessProducts";

const allSpecGroups = [
  {
    label: "General",
    keys: [
      ["Rated Power", "ratedPower"],
      ["Max AC Output", "maxACOutput"],
      ["Surge Power", "surgePower"],
      ["Peak Efficiency", "peakEfficiency"],
      ["MPPT Efficiency", "mpptEfficiency"],
      ["Transfer Time", "transferTime"],
      ["Waveform", "waveform"],
      ["Switching Modes", "switchingModes"],
      ["Grid Type", "gridType"],
      ["Topology", "topology"],
    ],
  },
  {
    label: "Input",
    keys: [
      ["Input Voltage", "inputVoltage"],
      ["Voltage Range", "voltageRange"],
      ["Frequency", "frequency"],
    ],
  },
  {
    label: "Solar Charger",
    keys: [
      ["MPPT Count", "mpptCount"],
      ["Max DC Input", "maxDCInput"],
      ["Max PV Voltage", "maxPVVoltage"],
      ["Max PV Power", "maxPVPower"],
      ["Max PV Current", "maxPVCurrent"],
      ["MPP Range", "mppRange"],
      ["Max Solar Charge Current", "maxSolarCharge"],
      ["Max AC Charge Current", "maxACCharge"],
    ],
  },
  {
    label: "Battery",
    keys: [
      ["Technology", "batteryTech"],
      ["Nominal Voltage", "nominalVoltage"],
      ["Capacity", "batteryCapacity"],
      ["Quantity", "batteryQty"],
      ["Battery Voltage Min", "batteryVoltageMin"],
      ["Battery Voltage Max", "batteryVoltageMax"],
      ["Max Charge Current", "maxChargeCurrent"],
      ["Max Discharge Current", "maxDischargeCurrent"],
      ["Max Charge / Discharge", "maxChargeDischarge"],
      ["Full Charge Voltage", "fullChargeVoltage"],
      ["Full Discharge Voltage", "fullDischargeVoltage"],
    ],
  },
  {
    label: "Protection & Build",
    keys: [
      ["BMS", "bms"],
      ["IP Rating", "ipRating"],
      ["IP Level", "ipLevel"],
      ["Dimensions", "dimensions"],
      ["Weight", "weight"],
      ["Installation", "installation"],
      ["Cooling", "cooling"],
      ["Operating Temp", "operatingTemp"],
      ["Noise Level", "noiseLevel"],
      ["Comm. Interface", "commInterface"],
    ],
  },
  {
    label: "Warranty & Certification",
    keys: [
      ["Standard Warranty", "standardWarranty"],
      ["Extended Warranty", "extendedWarranty"],
      ["Certifications", "certifications"],
    ],
  },
];

const highlights = (product) => [
  { label: "Efficiency", value: product.efficiency || product.specs.peakEfficiency, sub: "Pure Sine Wave", color: "from-secondary/20 to-secondary/5", accent: "text-secondary" },
  { label: "Transfer Time", value: product.transferTime, sub: "Uninterrupted", color: "from-primary/20 to-primary/5", accent: "text-primary" },
  { label: "IP Rating", value: product.specs.ipRating || product.specs.ipLevel || "—", sub: "Protection class", color: "from-blue-500/20 to-blue-500/5", accent: "text-blue-600" },
  { label: "Warranty", value: product.specs.standardWarranty, sub: `Up to ${product.specs.extendedWarranty}`, color: "from-amber-500/20 to-amber-500/5", accent: "text-amber-600" },
];

const SpecGroupPanel = ({ group, product }) => {
  const [open, setOpen] = useState(true);
  const visibleRows = group.keys.filter(([, key]) => product.specs[key]);

  if (visibleRows.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 border-b border-gray-200 hover:bg-gray-100 transition-colors"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-gray-600">{group.label}</span>
        <svg
          className={`w-4 h-4 text-primary transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            {visibleRows.map(([label, key], ri) => (
              <div
                key={label}
                className={`flex items-start justify-between px-5 py-3 text-sm border-b border-gray-50 last:border-0 ${ri % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
              >
                <span className="text-gray-500 pr-4 shrink-0">{label}</span>
                <span className="text-gray-900 font-semibold text-right">{product.specs[key]}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BessSpecsTabs = ({ activeProduct, onTabChange }) => {
  const product = bessProducts.find((p) => p.id === activeProduct) || bessProducts[0];
  const hl = highlights(product);

  return (
    <section id="specs" className="py-16 sm:py-20 bg-white">
      <div className="max-w-330 mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center mb-10"
        >
          <motion.span variants={fadeUp} className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Deep Dive
          </motion.span>
          <motion.h2 variants={fadeUp} className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
            Technical Specifications
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 mt-3">
            Select a model to explore its full spec sheet.
          </motion.p>
        </motion.div>

        {/* Scrollable tab bar */}
        <div className="overflow-x-auto pb-2 mb-8">
          <div className="flex gap-2 min-w-max mx-auto justify-center">
            {bessProducts.map((p) => (
              <button
                key={p.id}
                onClick={() => onTabChange(p.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border-2 whitespace-nowrap ${
                  activeProduct === p.id
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeProduct}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {/* Key highlights strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {hl.map((h) => (
                <div key={h.label} className={`bg-gradient-to-br ${h.color} rounded-2xl p-5 border border-gray-100`}>
                  <div className={`text-2xl font-extrabold ${h.accent}`}>{h.value}</div>
                  <div className="text-gray-800 text-sm font-semibold mt-1">{h.label}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{h.sub}</div>
                </div>
              ))}
            </div>

            {/* Spec groups — 2-col desktop */}
            <div className="grid lg:grid-cols-2 gap-4 items-start">
              {allSpecGroups.map((group) => (
                <SpecGroupPanel key={group.label} group={group} product={product} />
              ))}
            </div>

            {/* Downloads bar */}
            <div className="mt-6 bg-primary rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-white font-bold">{product.name} — Downloads</div>
                <div className="text-white/60 text-sm">Official documents for your reference or installer</div>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <a href={product.downloads.dataSheet} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white text-primary px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h4a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                  Data Sheet
                </a>
                {product.downloads.comparisonSheet && (
                  <a href={product.downloads.comparisonSheet} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border-2 border-white/40 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/10 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Comparison Sheet
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BessSpecsTabs;
