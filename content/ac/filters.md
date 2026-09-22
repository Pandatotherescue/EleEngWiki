---
title: Filters
category: ac
summary: First-order RC and RL filters, what the corner frequency really means, and when one pole is not enough.
tags: [filter, low pass, high pass, cutoff, corner frequency, roll-off, butterworth, order]
order: 25
related: [rc-circuits, resonance, q-factor, reactance-and-impedance]
---

A filter is a voltage divider where at least one element's impedance depends on frequency. That is the whole idea — everything else is refinement.

Put a resistor in series with a capacitor and take the output across the capacitor: at low frequency the capacitor's reactance is high so most of the signal appears at the output; at high frequency its reactance is low so it shunts the signal away. You have a low-pass filter.

$$
f_c = \frac{1}{2\pi R C}
$$

[[calc:rc-filter]]

## What the corner frequency is not

The corner (or cut-off) frequency is where the output has fallen to $1/\sqrt{2}$ of the input — **−3 dB**, half the power. It is emphatically not the frequency where the filter "stops passing" anything.

At the corner, the signal is still at 70.7 % amplitude. An octave past it, a first-order filter has only reached about −7 dB. A decade past, −20 dB. This gentle slope surprises people who expected a filter to be a wall.

| Frequency | First-order attenuation | Phase shift |
| --- | --- | --- |
| 0.1 $f_c$ | −0.04 dB | −5.7° |
| 0.5 $f_c$ | −1.0 dB | −26.6° |
| $f_c$ | −3.0 dB | −45° |
| 2 $f_c$ | −7.0 dB | −63.4° |
| 10 $f_c$ | −20.0 dB | −84.3° |
| 100 $f_c$ | −40.0 dB | −89.4° |

A single pole rolls off at **20 dB per decade**, equivalently 6 dB per octave. Each additional pole adds another 20 dB/decade and another 90° of eventual phase shift.

## The four basic responses

**Low-pass** passes DC and low frequencies, attenuates high. Anti-aliasing, smoothing a PWM output, removing switching noise.

**High-pass** blocks DC, passes high. AC coupling between stages, removing offset and drift.

**Band-pass** passes a range. Built from a resonator, or from a low-pass and high-pass in cascade when the band is wide.

**Band-stop / notch** rejects a range. Removing mains hum, or a specific interferer.

RL filters do the same jobs with the roles of the components swapped — inductor in series gives low-pass, because inductive reactance rises with frequency. They are less common at low frequency because inductors are bulkier, lossier and more expensive than capacitors, and they couple magnetically into their surroundings. At RF, where inductors are small, they are everywhere.

## Phase shift is not a side effect

Every filter shifts phase, and at the corner frequency a single pole gives exactly 45°. This is unavoidable — amplitude and phase response are tied together for any minimum-phase network.

It matters in two places especially. In a **feedback loop**, accumulated phase shift is what turns negative feedback positive and makes an amplifier oscillate; this is why stability analysis is really filter analysis. In **signal chains**, different frequencies arriving at different times is group delay distortion, which matters for pulses and data even when the amplitude response looks fine.

## When one pole is not enough

Cascading two RC sections does not simply double the sharpness, for two reasons. The second section **loads** the first, shifting its corner, and the combined response has a soft knee rather than a sharper one.

Doing it properly means either buffering between stages, or designing the whole network at once. Standard **filter approximations** each optimise something different:

- **Butterworth** — maximally flat in the passband. The default choice when you have no strong preference.
- **Chebyshev** — steeper roll-off, at the cost of ripple in the passband.
- **Bessel** — poorest amplitude roll-off, but the flattest group delay, so pulses keep their shape.
- **Elliptic (Cauer)** — steepest possible transition, with ripple in both passband and stopband.

The order of the filter sets the ultimate slope: $20n$ dB per decade for an $n$-pole filter.

## Practical cautions

**Source and load impedance are part of the filter.** The driving stage's output impedance adds to R; the load impedance sits across the output. A filter designed in isolation will not behave as designed in circuit.

**Capacitor value is not what the label says.** A class-II ceramic loses capacitance with DC bias, moving your corner frequency. Use C0G/NP0 or film where the corner matters — see [capacitors](/wiki/capacitors).

**A passive filter cannot have gain**, and its insertion loss is real. Active filters solve this but bring op-amp bandwidth and noise into the picture.

**Anti-aliasing must happen before sampling, in the analogue domain.** No amount of digital filtering can separate a signal from an alias, because by then they occupy the same frequency.
