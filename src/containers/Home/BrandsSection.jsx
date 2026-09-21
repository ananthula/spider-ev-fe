import tataMotorsLogo from "../../assets/brand-logos/Tata-Motors.webp";
import indianRailwayLogo from "../../assets/brand-logos/Indian-Railway.webp";
import delhiMetroLogo from "../../assets/brand-logos/Delhi-Metro.webp";
import amazonLogo from "../../assets/brand-logos/Amazon.webp";
import flipkartLogo from "../../assets/brand-logos/flipkart.webp";
import bpclLogo from "../../assets/brand-logos/BPCL.webp";

const partnerBrands = [
  { name: "Tata Motors", logo: tataMotorsLogo, width: 800, height: 600 },
  { name: "Indian Railway", logo: indianRailwayLogo, width: 4964, height: 5000 },
  { name: "Delhi Metro", logo: delhiMetroLogo, width: 3840, height: 1611 },
  { name: "Amazon", logo: amazonLogo, width: 2048, height: 2048 },
  { name: "Flipkart", logo: flipkartLogo, width: 2400, height: 633 },
  { name: "BPCL", logo: bpclLogo, width: 3000, height: 2000 },
];

const marqueeBrands = [...partnerBrands, ...partnerBrands];

const BrandsSection = () => {
  return (
    <section className="w-full bg-[#F3F5F8] py-12 lg:py-16 min-h-[30vh] flex items-center">
      <div className="w-full max-w-330 mx-auto px-4 sm:px-6 lg:px-10">
        <h2 className="text-center text-xl md:text-2xl lg:text-3xl font-semibold text-secondary leading-tight max-w-5xl mx-auto">
          Our EV Charging Solutions are the preferred choice of industry leaders
        </h2>

        <div className="mt-10 lg:mt-12 overflow-hidden">
          <div className="brand-marquee-track">
            {marqueeBrands.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="w-[170px] h-[86px] lg:w-[190px] lg:h-[96px] flex items-center justify-center rounded-sm shrink-0 px-4"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  loading="lazy"
                  decoding="async"
                  width={brand.width}
                  height={brand.height}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .brand-marquee-track {
          display: flex;
          align-items: center;
          gap: 24px;
          width: max-content;
          animation: brand-marquee 34s linear infinite;
          will-change: transform;
        }

        @keyframes brand-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50% - 12px));
          }
        }
      `}</style>
    </section>
  );
};

export default BrandsSection;
