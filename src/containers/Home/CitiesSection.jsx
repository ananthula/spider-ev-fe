import { Link } from "react-router-dom";

const cities = [
  ["Hyderabad", "Serving Telangana from Spider Energy's T-Hub headquarters.", "/ev-chargers-hyderabad"],
  ["Vijayawada", "SpiderEV charger sales coverage across Andhra Pradesh.", "/ev-chargers-vijayawada"],
  ["Visakhapatnam", "SpiderEV charger sales coverage across Andhra Pradesh.", "/ev-chargers-visakhapatnam"],
];

export default function CitiesSection() {
  return <section className="py-16 sm:py-20 bg-gray-50"><div className="max-w-330 mx-auto px-4 sm:px-6 lg:px-10">
    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Serving Telangana & Andhra Pradesh</h2>
    <div className="grid md:grid-cols-3 gap-5 mt-8">{cities.map(([name, text, href]) => <Link key={name} to={href} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:border-primary"><h3 className="text-xl font-bold">EV chargers in {name}</h3><p className="mt-3 text-gray-600">{text}</p><span className="inline-block mt-4 font-semibold text-primary">View city guide →</span></Link>)}</div>
  </div></section>;
}
