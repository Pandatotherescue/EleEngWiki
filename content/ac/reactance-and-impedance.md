---
title: Reactance & Impedance
category: ac
summary: What capacitors and inductors do to AC, why phase matters, and how the two combine into impedance.
tags: [reactance, impedance, Xc, Xl, phase, capacitive, inductive, ohms]
order: 21
related: [capacitors, inductors, complex-impedance, resonance]
---

A resistor opposes current the same way at any frequency, and voltage and current stay in step. Capacitors and inductors are different: they oppose current in a frequency-dependent way, and they shift current relative to voltage by a quarter cycle.

That opposition is called **reactance**, measured in ohms like resistance but behaving quite differently.

## Capacitive reactance

$$
X_C = \frac{1}{2 \pi f C}
$$

Reactance falls as frequency rises. At DC it is infinite — the capacitor blocks. At very high frequency it approaches zero — the capacitor looks like a short. Current **leads** voltage by 90°, because current flows in response to the *rate of change* of voltage, which peaks when the voltage itself is crossing zero.

## Inductive reactance

$$
X_L = 2 \pi f L
$$

Exactly the opposite. Reactance rises with frequency. At DC it is zero — the inductor is just a piece of wire. At high frequency it blocks. Current **lags** voltage by 90°.

[[calc:reactance]]

## A memory aid

The traditional mnemonic is **ELI the ICE man**:

- In an inductor (**L**), voltage (**E**) leads current (**I**) → E-L-I
- In a capacitor (**C**), current (**I**) leads voltage (**E**) → I-C-E

Worth learning once, because getting the sign of a phase angle wrong propagates into every subsequent calculation.

## Impedance combines the two

Real circuits contain resistance and reactance together. **Impedance** is the combination, written as a complex number:

$$
Z = R + jX
$$

where $X = X_L - X_C$ is the net reactance. The magnitude and phase are:

$$
|Z| = \sqrt{R^2 + X^2} \qquad \varphi = \arctan\frac{X}{R}
$$

The key point — and the most common source of error — is that resistance and reactance **do not add arithmetically**. A 30 Ω resistance in series with 40 Ω of reactance gives an impedance magnitude of 50 Ω, not 70 Ω. They are at right angles to one another.

A positive phase angle means the circuit is net inductive, current lagging. Negative means net capacitive, current leading. Zero means the reactances have cancelled, which is [resonance](/wiki/resonance).

## Why reactance does not dissipate power

A resistor converts electrical energy into heat. A reactance does not: it stores energy for part of the cycle and returns it for the rest.

Over a complete cycle a purely reactive element consumes zero net energy. The current is real and heats up whatever resistance it flows through, but the reactive element itself stays cool. This is the entire basis of [power factor](/wiki/ac-power) — reactive current occupies capacity in cables and transformers while delivering no useful work.

## Practical consequences

**A capacitor is not a short at all frequencies.** A 100 nF decoupling capacitor has 1.6 Ω of reactance at 1 MHz and 0.16 Ω at 10 MHz — but its series inductance is rising over the same range, and above its self-resonant frequency it stops being a capacitor at all.

**An inductor is not an open circuit at all frequencies** either. Its inter-winding capacitance takes over above self-resonance.

**Cable capacitance loads high-impedance sources.** A metre of coax is around 100 pF. Driving it from a 1 MΩ source gives a 1.6 kHz corner — which is why scope probes are 10× attenuating and compensated.

**Reactance is how filters work.** A reactance that varies with frequency, placed in a divider with a resistance, gives you a frequency-dependent division ratio. See [filters](/wiki/filters).
