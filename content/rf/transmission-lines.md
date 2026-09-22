---
title: Transmission Lines
category: rf
summary: When a wire stops being a wire, what characteristic impedance means, and why an unterminated line reflects.
tags: [transmission line, characteristic impedance, propagation, velocity factor, reflection, wavelength]
order: 40
related: [coaxial-cable, vswr-and-return-loss, microstrip, impedance-matching]
---

At low frequency a wire is a wire: the same voltage appears at both ends at the same instant. That assumption — the lumped element model behind [Kirchhoff's laws](/wiki/kirchhoffs-laws) — quietly stops being true as frequency rises.

The threshold is usually taken as **one tenth of a wavelength**. Beyond that, the signal's travel time along the conductor is a significant fraction of its period, different points on the line are at genuinely different potentials, and you must treat the conductor as a transmission line with distributed inductance and capacitance.

[[calc:wavelength]]

At 50 Hz, a tenth of a wavelength is 600 km. At 100 MHz it is 30 cm. At 5 GHz it is 6 mm. For digital signals it is the **edge rate** that matters, not the clock rate — a 1 ns edge contains energy up to roughly 350 MHz regardless of how slowly the clock runs.

## Characteristic impedance

A transmission line has distributed series inductance $L$ and shunt capacitance $C$ per unit length. For a low-loss line:

$$
Z_0 = \sqrt{\frac{L}{C}}
$$

This is **not** a resistance you can measure with a meter. It is the ratio of voltage to current for a wave travelling along the line — the impedance the wave "sees" as it propagates into an infinitely long line.

A finite line terminated in $Z_0$ is indistinguishable from an infinite one. The wave arrives at the load, is completely absorbed, and nothing comes back. Terminate it in anything else and part of the energy reflects.

## Propagation velocity

Signals travel slower than light in a vacuum, by a factor set by the dielectric:

$$
v = \frac{c}{\sqrt{\varepsilon_r}} = v_f \cdot c
$$

| Medium | εr | Velocity factor |
| --- | --- | --- |
| Air / vacuum | 1.0 | 1.00 |
| Foam polyethylene | ~1.5 | ~0.82 |
| PTFE | 2.1 | 0.69 |
| Solid polyethylene | 2.25 | 0.67 |
| FR-4 (microstrip, effective) | ~3.3 | ~0.55 |

A common figure worth remembering: signals on FR-4 travel about 15 cm per nanosecond on an outer layer, roughly 6 ns per metre. On stripline, buried entirely in dielectric, it is slower still.

## Reflections

When a wave meets an impedance discontinuity, some of it reflects. The reflection coefficient is:

$$
\Gamma = \frac{Z_L - Z_0}{Z_L + Z_0}
$$

Three cases are worth internalising:

- **$Z_L = Z_0$** → $\Gamma = 0$. No reflection. All power absorbed.
- **Open circuit** ($Z_L = \infty$) → $\Gamma = +1$. Full reflection, voltage doubles at the open end.
- **Short circuit** ($Z_L = 0$) → $\Gamma = -1$. Full reflection, inverted.

Reflections are the source of most transmission-line trouble: ringing and overshoot on digital edges, ghosting in video, standing waves that put excessive voltage on a transmitter's output stage. See [VSWR and return loss](/wiki/vswr-and-return-loss).

## Lines as components

A length of line transforms impedance, and specific lengths do useful things:

**Quarter-wave transformer.** A λ/4 section inverts impedance about its own characteristic impedance:

$$
Z_{in} = \frac{Z_0^2}{Z_L}
$$

Choose $Z_0 = \sqrt{Z_{source} Z_{load}}$ and you have a matching network made of nothing but line. A λ/4 shorted stub looks like an open circuit; a λ/4 open stub looks like a short.

**Half-wave line.** A λ/2 section repeats the load impedance exactly, whatever it is. Useful when you need to move a measurement plane without changing what you see.

These properties repeat every half wavelength, and they are frequency-dependent — which is what makes stub matching narrowband.

## Termination in practice

**Series termination** puts a resistor at the source so that the driver's output impedance plus the resistor equals $Z_0$. The wave travels at half amplitude, doubles at the open far end, and the reflection is absorbed on return. Cheap, low power, but only works with a single load at the end.

**Parallel termination** puts $Z_0$ to ground at the far end. Works with multiple loads along the line, but draws DC current continuously.

**AC termination** (a resistor in series with a capacitor) avoids the DC path at the cost of a time constant to manage.

**Differential pairs** are terminated with a single resistor across the pair, equal to the differential impedance — typically 100 Ω.
