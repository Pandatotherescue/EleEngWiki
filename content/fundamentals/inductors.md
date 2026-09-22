---
title: Inductors
category: fundamentals
summary: Energy stored in a magnetic field, why inductors kick back when you interrupt them, and what saturation does to your circuit.
tags: [inductor, inductance, magnetic, core, saturation, flyback, choke]
order: 7
related: [capacitors, reactance-and-impedance, resonance]
---

An inductor stores energy in a magnetic field. Its defining relationship mirrors the capacitor's, with voltage and current swapped:

$$
V = L \frac{dI}{dt}
$$

An inductor resists changes in *current* the way a capacitor resists changes in *voltage*. It passes DC freely and opposes AC. The stored energy is:

$$
E = \tfrac{1}{2} L I^2
$$

## The flyback problem

That $dI/dt$ term has teeth. If you interrupt the current through an inductor abruptly, $dI/dt$ becomes enormous and so does the induced voltage. Switch off a relay coil with a bare transistor and the collapsing field will generate hundreds of volts — far more than enough to destroy the transistor.

The standard fixes:

- A **flyback diode** across the coil, reverse-biased in normal operation, gives the current somewhere to circulate. Cheap and effective, but it slows the release of the relay.
- A **snubber** (resistor-capacitor network) absorbs the energy and damps the ringing, useful in AC circuits where a diode cannot be used.
- A **TVS or zener** clamps at a chosen voltage, releasing the energy faster than a plain diode while keeping the peak bounded.

This is not an edge case. Any switched inductive load — motors, solenoids, relays, transformers — needs deliberate handling.

## Reactance

At a given frequency an inductor presents a reactance that rises with frequency:

$$
X_L = 2 \pi f L
$$

[[calc:reactance]]

## Cores and saturation

A coil wound on air has predictable but small inductance. Adding a magnetic core multiplies inductance by the material's relative permeability, which can be hundreds or thousands. The trade is **saturation**.

Every core material has a maximum flux density. Once the core saturates, its permeability collapses towards that of air and the inductance falls off a cliff. The current then rises almost unchecked, which in a switching converter means the current-sense circuit sees a sudden spike and the switching device can fail within microseconds.

Key points:

- The **saturation current** rating is at least as important as the inductance value.
- Saturation is worse hot. Core materials lose flux capacity as temperature rises, so a design that is marginal at 25 °C may fail at 85 °C.
- **Ferrite** cores saturate abruptly; **powdered iron** cores roll off more gently, which is sometimes easier to live with.

## Losses

Inductors are the least ideal of the passive components.

- **Winding resistance (DCR)** causes $I^2R$ loss, and it is why a choke gets warm.
- **Core loss** — hysteresis and eddy currents — rises with frequency and flux swing.
- **[Skin effect](/wiki/skin-effect) and proximity effect** push current to the surface of the wire at high frequency, raising effective resistance well above DCR. Litz wire exists to fight this.
- **Self-capacitance** between turns gives every inductor a self-resonant frequency, above which it behaves capacitively.

Quality is summarised by the **[Q factor](/wiki/q-factor)** — the ratio of reactance to loss at a given frequency.

## Combining inductors

Without magnetic coupling, inductors combine exactly like resistors: series adds, parallel is the reciprocal sum. With coupling — two coils sharing a core, or simply sitting close together — mutual inductance adds or subtracts depending on orientation, and the simple rules no longer hold. On a dense board, two air-core coils at right angles couple far less than two coils in line.

## Practical selection

For a **switching converter**, you care about inductance, saturation current, DCR and core loss at your switching frequency, in roughly that order.

For a **filter or choke**, self-resonant frequency matters most — a choke is useless above it.

For a **tuned RF circuit**, unloaded Q dominates, since it sets the achievable selectivity. See [resonance](/wiki/resonance).
