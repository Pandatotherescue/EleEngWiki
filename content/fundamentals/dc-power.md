---
title: Power & Energy in DC Circuits
category: fundamentals
summary: How much heat a component has to get rid of, how much energy a circuit consumes over time, and why the two get confused.
tags: [power, watts, energy, joules, dissipation, heat, derating]
order: 2
related: [ohms-law, wire-and-cable, series-parallel-resistors]
---

Power is the rate at which energy is converted. In a DC circuit it is the product of voltage and current:

$$
P = V I
$$

Substituting Ohm's law gives the two forms you will reach for more often in practice, because they let you work from whichever pair of quantities you actually know:

$$
P = I^2 R \qquad P = \frac{V^2}{R}
$$

[[calc:dc-power]]

## Power versus energy

These get mixed up constantly, including on datasheets and electricity bills.

**Power** is instantaneous, measured in watts. It tells you how hot something gets.

**Energy** is power accumulated over time, measured in joules or watt-hours. It tells you how much battery you need, or what the electricity costs.

$$
E = P t
$$

A 5 W device running for an hour consumes 5 Wh, or 18 kJ. The distinction matters because they drive different design decisions: power sets your heatsink, energy sets your battery.

## Choosing a resistor power rating

This is where the $I^2R$ form earns its keep. A resistor in a current path dissipates power proportional to the *square* of the current — double the current and the heat goes up fourfold.

The standard advice is to run a resistor at no more than half its rated power. That margin is not superstition:

- Ratings are quoted at a specified ambient temperature, often 25 °C or 70 °C. Inside a warm enclosure you get less.
- Above the rated ambient, the part must be **derated** along a curve in the datasheet, often falling to zero by 150 °C.
- Resistance drifts with temperature, and a hot resistor ages faster.
- Surface-mount parts rely on the board copper as a heatsink. The same 0805 resistor on a thin trace and on a large copper pour have genuinely different real-world ratings.

A worked example: 100 mA through a 10 Ω current-sense resistor dissipates $0.1^2 \times 10 = 0.1$ W. A 0.25 W part is fine. Raise the current to 250 mA and you need $0.25^2 \times 10 = 0.625$ W — now you want a 2 W part, or a lower-value shunt.

## Where the energy goes

In a purely resistive circuit, all of it becomes heat. In a circuit with capacitors and inductors, energy is also **stored** and returned:

$$
E_C = \tfrac{1}{2} C V^2 \qquad E_L = \tfrac{1}{2} L I^2
$$

This storage is why an inductor kicks back hard when you interrupt its current, and why a large capacitor bank stays dangerous long after the supply is off. A 10 mF capacitor charged to 400 V holds 800 J — roughly the energy of a brick dropped from head height, delivered in milliseconds.

## Efficiency

Any real converter or regulator loses some of what it takes in:

$$
\eta = \frac{P_{out}}{P_{in}}
$$

A **linear regulator** drops the difference across a pass element, so its loss is $(V_{in} - V_{out}) \times I$. Dropping 12 V to 5 V at 1 A wastes 7 W as heat — the regulator dissipates more than the load receives, and efficiency is only 42 %.

A **switching regulator** converts rather than burns, typically reaching 85–95 %. The same job costs under a watt of loss. The trade is complexity, switching noise, and a board layout that matters.

## Common mistakes

**Sizing from average current when the load is pulsed.** A component that sees 2 A for 10 ms every second averages 20 mA, but the peak dissipation is what stresses the part.

**Forgetting the connector and the wire.** Contact resistance of a few tens of milliohms sounds negligible until you put 20 A through it. See [wire and cable](/wiki/wire-and-cable) for the voltage drop arithmetic.

**Assuming still air.** Most thermal ratings assume free convection. Inside a sealed box with no airflow, everything runs hotter than the datasheet implies.
