---
title: Attenuators & Pads
category: rf
summary: Resistive networks that reduce a signal while keeping both ports matched, and why a pad is sometimes worth its loss.
tags: [attenuator, pad, pi pad, t pad, isolation, matching, resistive]
order: 46
related: [impedance-matching, vswr-and-return-loss, decibels]
---

An attenuator reduces signal level by a fixed amount while presenting the system impedance at both ports. That second property is the important one — a simple voltage divider attenuates but does not maintain a match, and in an RF system the match is often the point.

[[calc:attenuator-pad]]

## Pi and T topologies

Both use three resistors and both give the same performance. With $K = 10^{A/20}$ the voltage ratio:

**T-pad** — two series resistors with one shunt to ground between them:

$$
R_{series} = Z_0\frac{K-1}{K+1} \qquad R_{shunt} = \frac{2 Z_0 K}{K^2 - 1}
$$

**Pi-pad** — two shunt resistors with one series between them:

$$
R_{shunt} = Z_0\frac{K+1}{K-1} \qquad R_{series} = Z_0\frac{K^2-1}{2K}
$$

Which to choose is usually a practical matter. At low attenuation the T-pad's series resistors are small and its shunt resistor large; the Pi-pad is the reverse. Pick whichever gives values closer to standard parts, and at microwave frequencies whichever suits the layout — the Pi-pad's grounded ends often suit a coplanar layout better.

## Standard values

| Attenuation | T series | T shunt | Pi shunt | Pi series |
| --- | --- | --- | --- | --- |
| 1 dB | 2.88 Ω | 433 Ω | 870 Ω | 5.77 Ω |
| 3 dB | 8.55 Ω | 142 Ω | 292 Ω | 17.6 Ω |
| 6 dB | 16.6 Ω | 66.9 Ω | 150 Ω | 37.4 Ω |
| 10 dB | 26.0 Ω | 35.1 Ω | 96.2 Ω | 71.2 Ω |
| 20 dB | 40.9 Ω | 10.1 Ω | 61.1 Ω | 248 Ω |
| 30 dB | 46.9 Ω | 3.17 Ω | 53.3 Ω | 790 Ω |

All for 50 Ω systems.

## Why deliberately throw away signal?

An attenuator costs you level, which seems like the last thing you want. But it buys several things that are often worth more.

**Match improvement.** A pad of $A$ dB improves the return loss of whatever is behind it by $2A$ dB, because the reflected wave passes through the pad twice. A 6 dB pad turns a dreadful 3:1 mismatch into a respectable 1.3:1 as seen from the front. This is the most common reason pads exist.

**Isolation between stages.** Two stages that each have a poor match will interact, and the combination can vary wildly with cable length or even oscillate. A pad between them decouples the interaction.

**Protecting an input.** A fixed pad at a receiver or instrument input prevents overload and improves the input match, at a known cost in [noise figure](/wiki/noise-figure).

**Setting a level** precisely and predictably, with a flatness across frequency that an amplifier's gain control cannot match.

## The noise cost

A passive attenuator's noise figure equals its attenuation. A 10 dB pad has a 10 dB noise figure.

Where that pad sits decides whether this matters. In front of a receiver's first amplifier it adds its full attenuation to the system noise figure — a serious penalty. After a low-noise amplifier with 20 dB of gain, the [Friis cascade](/wiki/noise-figure) divides its contribution by that gain and the effect is negligible.

The general rule: gain first, attenuation later.

## Practical limits

**Power rating.** The pad dissipates nearly all the power at high attenuation values. A 20 dB pad absorbs 99 % of what enters it. Check each resistor individually — in a Pi-pad at low attenuation the series element takes most of the heat.

**Frequency response.** Thin-film chip resistors work well to several GHz; wirewound and thick-film parts do not. Parasitic capacitance across the shunt elements and inductance in the series ones both degrade performance with frequency.

**Layout is the real limit** above about 1 GHz. Keep the resistors small, the ground connections short, and the trace impedance correct right up to the pads.

**Step attenuators** switch pads in and out with relays or PIN diodes. The switching elements — not the resistors — usually determine bandwidth, isolation and distortion.
