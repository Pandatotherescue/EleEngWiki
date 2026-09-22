---
title: Transformers
category: ac
summary: Turns ratio, impedance transformation, and the practical limits that separate a real transformer from the textbook one.
tags: [transformer, turns ratio, impedance matching, isolation, core, leakage, balun]
order: 28
related: [inductors, ac-power, impedance-matching]
---

A transformer couples two windings through a shared magnetic field. Alternating current in the primary creates a changing flux; that flux induces a voltage in the secondary proportional to its number of turns.

$$
\frac{V_s}{V_p} = \frac{N_s}{N_p}
$$

Power is conserved (less losses), so current goes the other way:

$$
\frac{I_s}{I_p} = \frac{N_p}{N_s}
$$

[[calc:transformer]]

## Impedance transformation

The consequence that matters most outside power engineering: a transformer transforms impedance by the **square** of the turns ratio.

$$
\frac{Z_p}{Z_s} = \left(\frac{N_p}{N_s}\right)^2
$$

A 4:1 turns ratio transforms 8 Ω into 128 Ω. This is how valve amplifiers drive loudspeakers, how RF stages are matched without lossy resistive pads, and how a balun converts between balanced and unbalanced feeds while also changing impedance — a 4:1 balun matching 200 Ω to 50 Ω is a 2:1 turns ratio.

Unlike a resistive network, this transformation is in principle lossless. That is its great advantage over an [attenuator-based](/wiki/attenuators) approach, and why transformers persist in RF design despite being bulky components.

## Isolation

Because primary and secondary share only a magnetic field, there is no galvanic connection. That gives:

- **Safety isolation** between mains and accessible circuitry.
- **Ground loop breaking** in audio and instrumentation.
- **Level shifting** where the two sides sit at wildly different potentials.

The isolation is not unconditional. Inter-winding capacitance passes high-frequency energy, which is why isolation transformers for sensitive work include an electrostatic screen between windings. And the isolation rating — creepage, clearance, insulation class — is a safety specification, not merely a voltage number.

## Where the ideal model fails

Real transformers depart from the ideal in several ways, and each one shows up somewhere in practice.

**Magnetising inductance** is finite, so the primary draws current even with no load. Too little and the transformer saturates at low frequency.

**Leakage inductance** is flux that links one winding but not the other. It appears as a series inductance, limits high-frequency response, and causes voltage spikes when current is interrupted. In a flyback converter this is the energy the snubber has to absorb.

**Winding resistance** causes copper loss, which rises with load.

**Core loss** — hysteresis and eddy currents — is roughly constant with load and rises steeply with frequency and flux density. This is why a mains transformer is warm even unloaded.

**Inter-winding capacitance** couples the windings at high frequency, bypassing the magnetic path entirely.

Together these give a real transformer a limited bandwidth: it works over a range of frequencies, not everywhere. A 50 Hz mains transformer operated at 5 kHz will behave badly; an RF transformer operated at 50 Hz will saturate instantly.

## Frequency and size

Core size is set by the volt-seconds it must support without saturating, which for a given voltage is inversely proportional to frequency. Doubling frequency roughly halves the required core area.

This is the single reason switch-mode supplies displaced linear ones. A 50 Hz mains transformer for 100 W is a heavy lump of iron; a 100 kHz ferrite transformer for the same power fits in a thimble. The cost is switching noise, complexity, and a layout that must be done carefully.

## Practical notes

**Inrush current.** Energising a transformer at the wrong point in the mains cycle can drive the core deep into saturation for the first few cycles, drawing tens of times the rated current. This is why large transformers need soft-start or slow-blow protection.

**Polarity matters.** Dots on a schematic mark the ends that go positive together. Getting them wrong reverses phase — harmless in a simple supply, fatal in a feedback path or when paralleling.

**Autotransformers** share a single winding, saving copper and size, but provide no isolation at all. Convenient for voltage adjustment; never a substitute for a safety isolating transformer.

**No DC.** A transformer cannot transfer DC, and a DC component in the primary current offsets the flux and pushes the core towards saturation.
