---
title: "Why EV Charging at Fleet Depots Is a Scheduling Problem, Not Just an Infrastructure Problem"
slug: "ev-charging-fleet-depots-scheduling-problem-not-just-infrastructure"
description: "Fleet depot EV charging fails when every vehicle plugs in at once. How Indian operators use schedules, load limits and the right charger mix to keep routes on time."
date: "2026-09-02"
modifiedDate: "2026-09-02"
author: "Spider Energy Team"
category: "EV Charging"
readTime: "10 min read"
image: "/blog/ev-charging-fleet-depots-scheduling-problem-not-just-infrastructure.webp"
tags: ["fleet depot","scheduling","load management","demand charges","e-bus","last mile","India guidelines","Telangana","Hyderabad","AC DC mix"]
published: true
publishDate: "2026-09-02"
sourceDocument: "https://docs.google.com/document/d/18H6d91bNmFvdptRoZDeYPQ1wiBw4p9M-VjhFerMIEHk/edit?usp=sharing"
sourceSheet: "September 2026"
sourceSheetRow: 3

---

# **Why EV Charging at Fleet Depots Is a Scheduling Problem, Not Just an Infrastructure Problem**

A depot might have enough kilowatt-hours for the nite and miss the morning dispatch. That’s when every car plugs in at 9 p.m. and the demand needle hits the sanctioned limit and protection trips and half the yard is still at 40 percent at dawn.

EV charging for fleet depot is not simply a catalogue of cabinets. It’s a timetable. How empty each vehicle is when it comes back, when it has to leave and how much power the [yard is allowed to draw in any 15-minute period](https://spiderenergy.in/blog/bess-vs-generator-india-homes-businesses).

### **Quick Answer Box**

Depot charging fails when the sessions start together. Success is a schedule that meets departure state of charge, while staying within sanctioned load and cheaper tariff windows. Public infrastructure in India is growing but is uneven and is a poor sole plan for commercial fleets. Ministry of Power 2024 guidelines de-licensed public charging and set tariff principles. Load sanction and operations discipline are still required for depots. Overnight AC for long dwell. DC for short turns. Software that sequences vehicles. Don't just price the charger, price the grid and the scheduler.

## **The Current State of EV Charging Infrastructure**

India has added public and captive points quickly but the ratio of vehicles to reliable public chargers is still wide by global benchmarks. Metro core station clusters. Narrower highways and industrial margins. At times a large proportion of the installed public points have been non-operational. Many public DC sites are operating in the low-mid teens.

That picture is a warning to a fleet that has to leave at 5 a.m. Public charging is a backup, an en-route top-up. The bulk energy for return to base fleets is at the depot. Where the operator controls the plug, the tariff and the clock.

## **Challenges Associated with EV Charging Infrastructure in India**

Operators meet the same list:

- [ ] Limits on feeders and transformers at the very yards where vehicles already park.
- [ ] And demand charges that charge you for the monthly peak, not the energy that actually moved.
- [ ] Depot upgrades, land, wiring and electrical inspector time.
- [ ] Street network reliance can lead to variable public uptime and connector mix.
- [ ] Software silos between vehicle telematics and charger back end.
- [ ] Big capital, till you add up the litres of diesel and idle labour on the level.

None of these is solved by specifying a higher kilowatt number and hoping the grid agrees.

## **Guidelines for EV Charging Infrastructure in India**

The national reference is the Ministry of Power’s Guidelines for Installation and Operation of Electric Vehicle Charging Infrastructure (2024). Public charging is off licence. Interconnections, tariff principles for public points (including time-of-day signals linked to average cost of supply), service-fee ceilings for public and community AC and DC and role of the Bureau of Energy Efficiency as central nodal agency are covered in guidelines. States nominate nodal agency to interact with DISCOMs.

Depot charging on commercial or industrial connection as per DISCOM load rules, CEA s[afety practice](https://cea.nic.in/old/ev_charging_standards.html) and BIS certified equipment. E-bus and workplace depots are explicitly in the planning conversation.” This guideline is not a substitute for a site electrical study. It debunks the myth that the blocker is a special electricity licence.

## **Why the Depot Is a Queue, Not a Showroom**

The fleets do not come in a smooth curve. The shift change dumps vehicles in a 30 to 90 minute window." Opportunity-charge buses might be at the yard for 20-40 minutes. Last mile three wheelers can stay for 8 hours.

Need for energy is also unequal. One vehicle is returning at 25 percent. Another comes back at 60 percent and only needs a top-up. If both take 60 kW gun at same minute, the yard pays for peak they didn't need.

A scheduler works backward from departure:

- [ ] Required SoC at gate-out.
- [ ] Energy missing, plus a margin.
- [ ] Latest start time given charger power.
- [ ] Priority if two vehicles contend for the same gun or the same kilowatts.
- [ ] Preference for off-peak or solar-hour tariffs where the duty cycle allows.

The same 200 kVA connection that cannot cope with simultaneous start can handle a much larger fleet if sessions are staggered. Field and modelling work on Indian depots show that the peak demand reduces very large percentages when parallel charging is replaced by a peak-capped sequence, without vehicles being short of SoC.

## **Infrastructure Still Matters. It Is Just Not Sufficient.**

You still need:

- [ ] A sanctioned load that meets the scheduled peak, not the fantasy peak of every gun at full power.
- [ ] AC points for overnight dwell (usually 7.4-22 kW per vehicle or shared pedestals).
- [ ] DC points ONLY for vehicles that can’t wait.
- [ ] Earthing, protection and the layout that does not hinder circulation.
- [ ] OCPP-connected chargers so the schedule is enforced, not taped to the wall.

Oversizing DC so scheduling is unnecessary is an expensive way to buy a demand charge problem. The operational way to miss SLAs is undersize AC and hope public DC will catch the morning.

## **Price: What Fleet Depot Charging Costs in India**

Think of these as planning bands, not quotes.

Hardware: AC commercial points are a small fraction of DC. 30-60 kW DC units are typically in the several-lakh to low-teen-lakh range each; 120 kW class is higher. On larger yards electrical infrastructure (transformer, panels, cabling, earthing) is often bigger than hardware. Software and load management is a small capex line and a large opex saver.

Indicative whole-depot envelopes seen in Indian planning:

- [ ] Small last-mile or staff fleets (about 10 vehicles): tens of lakhs when the existing connection has headroom.
- [ ] Medium yards (about 25 vehicles): high tens of lakhs to over a crore if a transformer is required.
- [ ] Large truck or bus depots: multiple crores once dedicated substations appear.

The schedule makes two changes to the bill: it can reduce the transformer you purchase and it can reduce the monthly demand charge on the transformer you own. ToD is for common off-peak energy windows of 20-35 percent cheaper power. But that saving only kicks in if the software actually waits.

## **What “Best” Depot Charging Looks Like**

Best is lowest peak that still satisfies each departure SoC.

That’s usually smart ac with a hard load cap for overnight last mile and staff cars. For e-buses and high duty LCVs with short layovers it is a smaller DC bank plus a queue rule. For mixed yards it is two classes of bay, and one scheduler.

Don’t add solar or storage until the timetable is stable. Storage can remove residual peaks. If the morning gate-out is already short, it cannot invent time.

The same arithmetic applies to Hyderabad and the other Telangana logistics and bus depots: return windows, TGSPDCL or TGNPDCL load and a tariff that penalises an unmanaged spike. Scheduling is the local OS. This plant is hardware.

The National charging rule book is the Ministry of Power’s 2024 guidelines. Central nodal monitor : Bureau of Energy Efficiency. Electrical safety is in the purview of Central Electricity Authority. NITI Aayog sets fleet electrification within the framework of the larger mobility plan.

### **Table 1: Depot Design Matrix — Hardware versus Schedule**

| **Decision** | **Infrastructure-Only Depot** | **Schedule-Led Depot** |
| --- | --- | --- |
| Peak assumption | All chargers at nameplate | Staggered cap from timetable |
| Charger mix | DC-heavy “to be safe” | AC for dwell, DC for short turns |
| Sanctioned load | Sized to simultaneous start | Sized to scheduled peak |
| Demand charges | High and surprising | Targeted and visible |
| Morning readiness | Hope | Constraint in the software |
| Public charging role | Hidden dependency | Documented backup only |
| Best first hire | More guns | Scheduler + load controller |
| Cost trajectory | Transformer first | Timetable first, steel second |

Operators who miss the timetable buy steel for a peak of 12 minutes. But those who write the timetable first often have less DC cabinets and a smaller connection.

Local tariff [shape those schedules ](https://www.tgerc.telangana.gov.in/currentyearorders.php)have to respect is set by Telangana Electricity Regulatory Commission. [India Energy Storage Alliance ](https://indiaesa.info/)context Only add storage as a peak tool. The IEA’s fleet-charging practice follows the same dwell-versus-power logic. Hardware is maintained in a [Bureau of Indian Standards](https://beeindia.gov.in/view_content.php?lid=581&lang=1) certified floor.

### **Table 2: Generic Power Backup vs Future-Ready Strategic Energy Architecture Matrix**

| **Aspect** | **Plug-All-at-Once Yard** | **Timed Depot Energy System** |
| --- | --- | --- |
| Control variable | Number of chargers | Departure clock + load cap |
| Grid conversation | Maximum possible kW | Agreed scheduled kW |
| Tariff use | Whatever the spike hits | Off-peak and solar hours first |
| Failure mode | Trip and late dispatch | Queue delay with SoC still met |
| Data | Manual white board | Live SoC and charger status |
| Expansion | New transformer immediately | More vehicles on same cap |
| Public network | Silent hope | Written contingency |
| Investor view | Capex story | Operating system story |

## **People Also Ask**

### **What is the current state of EV charging infrastructure?**

Public and captive points have increased but public coverage remains spotty, metro-heavy and thinner than vehicle stock on a per-EV basis. Use on many public DC sites is modest. The uptime is erratic. Commercial fleets should think of public charging as a top-up and a backup, not the overnight energy plan.

### **What are the challenges associated with EV charging infrastructure in India?**

Depot grid capacity, demand charges, land and cabling time, lumpy public uptime, mixed connectors, weak links of vehicle data and charger software. Capital is real, but an unmanaged simultaneous plug-in can cost more every month than a slightly smaller scheduled system.

### **What are the guidelines for EV charging infrastructure in India?**

The Ministry of Power Guidelines for Installation and Operation of Electric Vehicle Charging Infrastructure, [2024, de-licence public charging](https://www.scribd.com/document/758653697/Guidelines-for-Installation-and-Operation-of-Electric-Vehicle-Charging-Infrastructure-2024), lay down the principles of tariff for public charging stations and ceilings of service fee and designate BEE as the central nodal agency. DISCOM load sanction, CEA safety and BIS equipment rules still apply to depots.

### **What does EV charging for a fleet depot in India typically cost?**

Small yards with headroom may end up in the tens of lakhs. Once transformers appear, medium fleets often need high tens of lakhs to over a crore. Depots of large buses and trucks can run into several crore . One line is hardware. The total is shifted by the load-management system and grid works.

### **What is the best EV charging setup for a fleet depot?**

The configuration that satisfies each departure SoC at the minimum scheduled peak. What overnight last mile and staff fleets want is usually Smart AC. Limited DC bank and queue for short layover buses and high-duty LCVs. “Best” is not the highest kW gun. That’s the schedule the grid can handle.

### **Why is depot charging a scheduling problem?**

Vehicles come together and go away together. Different vehicles have different energy needs. Tariff will punish. A peak the connection may not hold. Simultaneous start. Sequencing takes the same energy for more hours, and saves the morning.

### **Can public charging replace a depot?**

Not for return-to-base commercial duty. Public sites add range for exceptions. They do not guarantee 5 a.m. availability, depot tariffs or a place to park twenty vehicles at once.

### **How does SpiderEV support fleet depot charging?**

SpiderEV commercial AC and DC hardware comes with SpiderConnect management for monitoring and load-aware operation, ideal for fleet and campus yards in Telangana and Andhra Pradesh. Operators can ask for a depot review that begins with return and departure times. Spider Energy homepage and [EPC services ](https://spiderenergy.in/ev-charging-epc-services)include hardware and commissioning.

Fleet operators planning depot electrification can request a schedule first review: return windows, gate-out SoC, sanctioned load and the smallest AC/DC mix that hits the morning. call the team before ordering the transformer.
