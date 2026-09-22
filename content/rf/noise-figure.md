---
title: Noise Figure & Sensitivity
category: rf
summary: Why the first stage dominates, how the Friis cascade works, and what sets the noise floor of a receiver.
tags: [noise figure, friis, cascade, lna, noise temperature, sensitivity, thermal noise, ktb]
order: 53
related: [link-budget, attenuators, decibels]
---

Every resistor at a temperature above absolute zero generates thermal noise. Its available noise power depends only on temperature and bandwidth:

$$
P_n = k T B
$$

At the standard reference temperature of 290 K this gives a number worth memorising:

$$
-174\,\text{dBm/Hz}
$$

So in 1 MHz of bandwidth the thermal noise floor is −114 dBm; in 1 Hz, −174 dBm. Every receiver's performance is measured against this.

**Noise figure** is how much worse than that a device makes things — the ratio of input SNR to output SNR:

$$
NF = 10\log_{10}\frac{SNR_{in}}{SNR_{out}}
$$

A perfect, noiseless device has a noise figure of 0 dB. Everything real is worse.

[[calc:noise-figure]]

## The Friis cascade

In a chain of stages, the total noise factor (linear, not dB) is:

$$
F = F_1 + \frac{F_2 - 1}{G_1} + \frac{F_3 - 1}{G_1 G_2} + \cdots
$$

The structure of this equation is the single most important idea in receiver design. Each stage's noise contribution is divided by the **total gain preceding it**. The first stage contributes in full; the second is divided by the first stage's gain; the third by the product of the first two.

The practical consequence: **put the low-noise amplifier first, before anything lossy.**

A worked comparison makes it vivid. Take an LNA with 1 dB NF and 20 dB gain, followed by a mixer with 10 dB NF, and 3 dB of cable.

- **Cable, then LNA, then mixer:** 3 + (noise of the rest, barely divided) → about 4.1 dB total.
- **LNA, then cable, then mixer:** about 1.2 dB total.

Same components, three decibels difference, decided purely by ordering. This is why mast-head preamplifiers exist: putting the LNA at the antenna, before the feedline, is worth far more than any improvement to the radio at the bottom.

## Passive losses

A passive lossy component — cable, filter, [attenuator](/wiki/attenuators), switch — has a noise figure equal to its loss. Three dB of feedline is a 3 dB noise figure.

This is why receive and transmit are asymmetric. On transmit, feedline loss costs you power that you may be able to make up at the transmitter. On receive, it degrades the noise figure of the entire system and no downstream gain can undo it.

## Noise temperature

Satellite and radio-astronomy work usually prefers equivalent noise temperature:

$$
T_e = T_0 (F - 1), \qquad T_0 = 290\,\text{K}
$$

| Noise figure | Noise temperature |
| --- | --- |
| 0.5 dB | 35 K |
| 1.0 dB | 75 K |
| 2.0 dB | 170 K |
| 3.0 dB | 289 K |
| 6.0 dB | 865 K |

Temperature is preferred there because it adds linearly with antenna noise temperature, and because at very low noise figures the dB scale becomes uncomfortably compressed — the difference between 0.3 and 0.5 dB is hard to appreciate, while 21 K versus 35 K is obvious.

## Sensitivity

Putting it together, the minimum detectable signal is:

$$
P_{min} = -174 + 10\log_{10}(B) + NF + SNR_{required}
$$

Each term is a design lever:

**Bandwidth.** Halving it gains 3 dB. This is why low-data-rate and narrowband modes reach so much further.

**Noise figure.** Improving the front end helps, but with diminishing returns — going from 6 dB to 3 dB gains 3 dB; from 1 dB to 0.5 dB gains only 0.5 dB.

**Required SNR.** Set by modulation and coding. Modern FEC operates at remarkably low SNR, which is where most of the sensitivity improvement of the last few decades has come from.

## When the noise figure stops mattering

In many real systems the limit is not thermal noise at all.

**External noise** dominates below roughly 100 MHz. Atmospheric and man-made noise arriving through the antenna far exceeds receiver noise, so an HF receiver with a 10 dB noise figure performs identically to one with 3 dB.

**Interference** dominates in crowded bands. If the channel contains other users, improving your noise figure changes nothing.

**Antenna noise temperature** matters for high-gain systems pointed at cold sky. A dish pointed upward sees perhaps 20 K; pointed at the ground it sees close to 290 K. For satellite reception this is why elevation angle affects performance.
