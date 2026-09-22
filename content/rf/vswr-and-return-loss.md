---
title: VSWR & Return Loss
category: rf
summary: Four different ways of stating the same mismatch, and how much a bad match actually costs you.
tags: [vswr, swr, return loss, reflection coefficient, gamma, mismatch loss, match]
order: 42
related: [transmission-lines, impedance-matching, smith-chart, antenna-fundamentals]
---

When a transmission line is terminated in anything other than its characteristic impedance, part of the incident wave reflects. The reflected wave interferes with the incident one, producing a standing wave along the line — maxima where they add, minima where they cancel.

**VSWR** is the ratio of those maxima to minima. Several quantities describe the same underlying mismatch, and converting between them is routine.

[[calc:vswr]]

## The four quantities

**Reflection coefficient** Γ is the fundamental one — the ratio of reflected to incident wave amplitude:

$$
\Gamma = \frac{Z_L - Z_0}{Z_L + Z_0}
$$

**VSWR** follows from its magnitude:

$$
VSWR = \frac{1 + |\Gamma|}{1 - |\Gamma|}
$$

**Return loss** expresses the same thing in dB, as a positive number:

$$
RL = -20\log_{10}|\Gamma|
$$

**Mismatch loss** is the power *not* delivered to the load:

$$
ML = -10\log_{10}(1 - |\Gamma|^2)
$$

## What a mismatch actually costs

This table is worth keeping in mind, because the intuitive fear of high VSWR often exceeds the actual power penalty.

| VSWR | \|Γ\| | Return loss | Power reflected | Mismatch loss |
| --- | --- | --- | --- | --- |
| 1.0:1 | 0 | ∞ | 0 % | 0 dB |
| 1.2:1 | 0.091 | 20.8 dB | 0.8 % | 0.04 dB |
| 1.5:1 | 0.200 | 14.0 dB | 4.0 % | 0.18 dB |
| 2.0:1 | 0.333 | 9.5 dB | 11.1 % | 0.51 dB |
| 3.0:1 | 0.500 | 6.0 dB | 25.0 % | 1.25 dB |
| 5.0:1 | 0.667 | 3.5 dB | 44.4 % | 2.55 dB |
| 10:1 | 0.818 | 1.7 dB | 66.9 % | 4.81 dB |

A 2:1 VSWR — often treated as a limit — loses only half a decibel. That is inaudible, invisible, and barely measurable at the far end of a link.

## So why does VSWR matter?

Not usually because of the lost power. The real reasons:

**Transmitter protection.** Solid-state power amplifiers are intolerant of mismatch. Reflected power raises device voltages and currents beyond safe limits, and most transmitters fold back their output above about 2:1 to protect themselves. The power you lose to protection circuitry vastly exceeds the mismatch loss.

**Voltage stress.** Standing waves produce voltage maxima along the line that can exceed the cable's or connector's rating, particularly at high power.

**Additional loss in lossy line.** Reflected power traverses the cable twice. On a lossy feedline, a bad match adds real attenuation on top of the mismatch loss itself.

**It is a diagnostic.** A change in VSWR is often the first sign that something has gone wrong — water in the feedline, a corroded connector, ice on the antenna, or physical damage.

## Measuring it

A **directional coupler** or **SWR bridge** separates forward and reflected waves so their ratio can be measured. Directivity is the key specification: a coupler with 20 dB directivity cannot reliably measure a return loss better than about 20 dB.

A **vector network analyser** measures complex Γ — magnitude and phase — which tells you not merely that there is a mismatch but *what kind*, and therefore how to fix it. That phase information is what makes a [Smith chart](/wiki/smith-chart) usable.

## Two traps

**Where you measure matters.** VSWR measured at the transmitter is not VSWR at the antenna. Feedline loss improves the reading. Always measure at the antenna, or correct for cable loss, before concluding the antenna is fine.

**A low VSWR does not mean a good antenna.** A dummy load has a perfect match and radiates nothing. A lossy antenna, or one with a resistive matching network, can show 1.1:1 while performing poorly. Match tells you about impedance, not about efficiency.
