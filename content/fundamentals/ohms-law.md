---
title: Ohm's Law
category: fundamentals
summary: The relationship between voltage, current and resistance — the single equation the rest of circuit theory is built on.
tags: [ohm, voltage, current, resistance, V=IR, fundamentals]
order: 1
related: [dc-power, series-parallel-resistors, voltage-divider]
---

Ohm's law states that the current through a conductor between two points is proportional to the voltage across those points. The constant of proportionality is the resistance:

$$
V = I R
$$

where $V$ is in volts, $I$ in amperes and $R$ in ohms. Rearranged, the same relationship gives you whichever quantity you are missing:

$$
I = \frac{V}{R} \qquad R = \frac{V}{I}
$$

Almost everything else in circuit analysis is this equation applied repeatedly, so it is worth being able to rearrange it without thinking.

[[calc:ohms-law]]

## What the law actually claims

It is easy to read $V = IR$ as a definition of resistance, and in a sense it is — you can always divide a measured voltage by a measured current and call the answer resistance. The physical claim is stronger: for a genuinely **ohmic** material, that ratio stays constant as you vary the voltage.

Metals are ohmic over a wide range. Plenty of other things are not:

- A **diode** passes almost no current until roughly 0.6 V, then conducts heavily. Its V/I ratio varies by orders of magnitude.
- An **incandescent lamp** has a cold filament resistance several times lower than its hot resistance, which is why they usually fail at switch-on.
- A **thermistor** is designed for its resistance to change with temperature.

For these, you can still use Ohm's law at a single operating point, but the resistance you calculate is only valid there.

## Where it comes from

At the microscopic level, resistance emerges from electrons drifting through a lattice and scattering off it. The material property is **resistivity**, $\rho$, and the resistance of a uniform conductor is:

$$
R = \rho \frac{l}{A}
$$

where $l$ is length and $A$ is cross-sectional area. This is the reason a long, thin wire drops more voltage than a short, fat one — and the reason wire gauge matters in any circuit carrying real current.

| Material | Resistivity at 20 °C (Ω·m) |
| --- | --- |
| Silver | 1.59 × 10⁻⁸ |
| Copper | 1.72 × 10⁻⁸ |
| Gold | 2.44 × 10⁻⁸ |
| Aluminium | 2.82 × 10⁻⁸ |
| Iron | 9.71 × 10⁻⁸ |
| Nichrome | 1.10 × 10⁻⁶ |

Resistivity rises with temperature in metals — copper by roughly 0.4 % per kelvin. A copper winding that measures 10 Ω cold will measure closer to 11 Ω after warming 25 K, which is enough to matter in precision work and in motor and transformer design.

## Using it in AC circuits

Ohm's law generalises to alternating current if you replace resistance with **impedance**:

$$
V = I Z
$$

Now $V$, $I$ and $Z$ are complex quantities carrying both magnitude and phase. A resistor has $Z = R$ with no phase shift; a capacitor and an inductor contribute reactance, which shifts current and voltage out of step with each other. The arithmetic is the same, but you are doing it with complex numbers.

Two practical rules follow:

- Use **RMS values** for AC voltage and current if you want the power arithmetic to work out.
- The magnitudes do not add the way resistances do. A 30 Ω resistance in series with 40 Ω of reactance gives 50 Ω of impedance, not 70 Ω.

## Common mistakes

**Forgetting that resistance is not constant.** Filament lamps, diodes, and anything that gets hot will move on you.

**Using peak values in AC power calculations.** A 230 V RMS supply peaks at about 325 V. Power calculated from the peak is off by a factor of two.

**Ignoring the source impedance.** A battery, a bench supply and a signal generator all have internal resistance. Under load the terminal voltage sags, and the current is lower than $V_{\text{open circuit}} / R$ would predict.

**Treating a voltage divider as a voltage source.** The divider output only holds up if the load draws far less current than flows through the divider itself. See [the voltage divider page](/wiki/voltage-divider) for the loaded case.
