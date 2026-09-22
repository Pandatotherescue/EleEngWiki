---
title: Resonance
category: ac
summary: When inductive and capacitive reactance cancel, and what series and parallel resonance do differently.
tags: [resonance, tank, lc, tuned circuit, resonant frequency, series, parallel]
order: 23
related: [q-factor, reactance-and-impedance, filters, impedance-matching]
---

Inductive reactance rises with frequency; capacitive reactance falls. At exactly one frequency they are equal and opposite, and cancel. That is resonance:

$$
\omega L = \frac{1}{\omega C} \quad \Longrightarrow \quad f_0 = \frac{1}{2\pi\sqrt{LC}}
$$

[[calc:lc-resonance]]

## Series resonance: a minimum

In a series LC circuit, the two reactances cancel in the loop and the impedance collapses to whatever resistance remains:

$$
Z = R \quad \text{at } f_0
$$

The impedance is at a **minimum**, so current is at a **maximum**. A series resonant circuit is a low-impedance path at its resonant frequency and a high-impedance path everywhere else.

A striking consequence: the voltage across the individual reactive components at resonance can be far higher than the applied voltage, by a factor of Q. A 10 V source driving a series circuit with Q = 50 puts 500 V across the capacitor. This is not a violation of anything — the two component voltages are in antiphase and cancel — but it is a real voltage that will happily destroy a component rated only for the supply.

## Parallel resonance: a maximum

In a parallel LC tank, the currents circulating in the loop cancel as seen from outside, and the impedance rises to a **maximum**:

$$
Z_{max} = Q \cdot \sqrt{\frac{L}{C}} \quad \text{(for a lightly damped tank)}
$$

Impedance maximum means current drawn from the source is minimal. A parallel tank blocks its resonant frequency and passes everything else — the mirror image of the series case.

Here the circulating current inside the tank can be Q times the current supplied. The energy sloshes back and forth between the inductor's magnetic field and the capacitor's electric field, with the source only topping up the losses.

## Characteristic impedance

Both cases share a useful quantity:

$$
Z_0 = \sqrt{\frac{L}{C}}
$$

This is the reactance of either component at resonance, and it sets the impedance level of the resonator. Two tanks with the same $f_0$ but different L/C ratios behave very differently: a high-L, low-C tank is a high-impedance resonator; a low-L, high-C tank is a low-impedance one.

That choice is a real design lever. In a matching network or an oscillator tank, the L/C ratio determines the loaded Q and how strongly the circuit interacts with the source and load.

## Where resonance is used

**Oscillators.** A tank sets the frequency, an active device replaces the losses. Q directly determines phase noise.

**Filters.** Cascaded resonators form band-pass and band-stop filters far sharper than any single-pole RC can manage. See [filters](/wiki/filters).

**Antenna matching.** A resonant antenna presents a real impedance at its design frequency; off resonance it becomes reactive and reflects power. See [antenna fundamentals](/wiki/antenna-fundamentals).

**Wireless power and RFID.** Coupled resonators transfer energy efficiently at their shared resonant frequency.

## Where resonance is a problem

Resonance is not always invited.

**Parasitic resonance.** Every capacitor has series inductance and every inductor has parallel capacitance, so every real component self-resonates. Above that frequency it behaves as the opposite kind of component entirely — which is why a 10 µF electrolytic decouples nothing at 100 MHz.

**Power supply interactions.** A long inductive feed into a large decoupling capacitance forms a resonant circuit that can ring, or oscillate outright if a downstream converter presents negative incremental resistance.

**Cable resonance.** A feedline that is an odd multiple of a quarter wavelength transforms impedances dramatically. An unterminated stub that happens to be resonant at a frequency of interest can behave like a short or an open.

**[Power factor correction](/wiki/ac-power) gone wrong.** Correction capacitors resonating with supply inductance at a harmonic frequency can amplify harmonic currents rather than reduce them.

## Practical notes

Calculated resonance and measured resonance rarely agree exactly. Component tolerances of 5–10 % are normal for inductors, and stray capacitance from layout and enclosure shifts things further. Tuned circuits above a few MHz are almost always made adjustable — a trimmer capacitor or a slug-tuned coil — for exactly this reason.
