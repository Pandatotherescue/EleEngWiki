---
title: AC Power & Power Factor
category: ac
summary: Real, reactive and apparent power, why the utility cares about power factor, and how three-phase systems differ.
tags: [power factor, reactive, apparent, kvar, kva, three phase, star, delta, correction]
order: 27
related: [ac-fundamentals, reactance-and-impedance, transformers]
---

In a DC circuit, power is voltage times current and there is nothing more to say. In AC, voltage and current can be out of phase, and then only part of the product does any work.

**Real power** $P$, in watts, is the part converted into work or heat. It is what your meter charges you for.

**Reactive power** $Q$, in volt-amperes reactive (var), sloshes back and forth between source and load each cycle. It performs no work but is entirely real in the sense that it flows through the cables.

**Apparent power** $S$, in volt-amperes (VA), is the product of RMS voltage and RMS current — the total the infrastructure must be sized for.

They form a right triangle:

$$
S = \sqrt{P^2 + Q^2} \qquad P = S\cos\varphi \qquad Q = S\sin\varphi
$$

**Power factor** is $\cos\varphi$, the fraction of apparent power that does useful work.

[[calc:three-phase]]

## Why power factor matters commercially

A motor drawing 10 kW at a power factor of 0.7 pulls 14.3 kVA from the supply. The transformer, switchgear and cables all have to carry that 14.3 kVA of current, and the $I^2R$ losses in them are set by the full current — not by the useful part of it.

That is why utilities charge industrial customers for poor power factor, or bill in kVA rather than kW. The reactive current costs the network real money without generating revenue.

## Correcting it

An inductive load draws lagging current. Adding capacitance draws leading current, which cancels part of it. The reactive power the capacitor must supply is:

$$
Q_C = P(\tan\varphi_1 - \tan\varphi_2)
$$

[[calc:power-factor-correction]]

Two cautions. **Do not overcorrect** — pushing past unity makes the installation capacitive, which is no better and can raise voltages. And beware **resonance**: correction capacitors form a resonant circuit with the supply transformer's leakage inductance. If that resonance lands on a harmonic present in the system — the 5th and 7th are the usual suspects — harmonic currents get amplified rather than suppressed. Detuned reactors exist to shift the resonance out of harm's way.

## Distortion and true power factor

Everything above assumes sinusoidal current. Modern electronics — rectifiers with smoothing capacitors, variable-speed drives, LED supplies — draw current in short spikes near the voltage peaks. That current is badly distorted, full of harmonics.

The **displacement power factor** (cos φ of the fundamental) may look fine, while the **true power factor** is much worse:

$$
PF_{true} = \frac{PF_{displacement}}{\sqrt{1 + THD_i^2}}
$$

Capacitors do nothing for the distortion component. This is why active **power factor correction** circuits exist in switch-mode supplies: they shape the input current waveform to follow the voltage, addressing the cause rather than compensating a symptom.

## Three-phase

Three-phase distribution uses three voltages 120° apart. It carries more power per unit of conductor, gives constant total instantaneous power rather than a pulsing one, and produces a rotating magnetic field directly — which is why industrial motors are three-phase.

The two connection schemes:

**Star (wye)** has a common neutral point. Line voltage is $\sqrt{3}$ times phase voltage; line and phase currents are equal. A 400 V three-phase supply is 230 V phase-to-neutral — the familiar European arrangement.

**Delta** connects the phases in a loop with no neutral. Line and phase voltages are equal; line current is $\sqrt{3}$ times phase current.

For a balanced load either way:

$$
P = \sqrt{3} \, V_L I_L \cos\varphi
$$

In a balanced star system the neutral carries no current, because the three phase currents sum to zero. Unbalanced loads change that — and harmonic currents make it worse, because triplen harmonics (3rd, 9th, 15th) add rather than cancel in the neutral. A neutral conductor in a building full of single-phase electronic loads can carry more current than any phase, which is why modern installations often specify an oversized neutral.
