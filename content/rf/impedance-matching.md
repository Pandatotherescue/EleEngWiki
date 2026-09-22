---
title: Impedance Matching
category: rf
summary: Why matching matters, how an L-network works, and what you give up when you choose one topology over another.
tags: [matching, l network, pi network, tuner, conjugate, maximum power transfer, q]
order: 44
related: [vswr-and-return-loss, smith-chart, transformers, q-factor]
---

Maximum power transfers from a source to a load when the load impedance is the complex conjugate of the source impedance. For a real source impedance, that simply means making the load equal to it.

In RF work there is a second, often more important reason: an unmatched load reflects power back down the line, and reflections cause standing waves, stress the transmitter, and make system behaviour depend on cable length.

[[calc:l-match]]

## The L-network

Two reactive elements — one series, one shunt — will match any two real resistances. The rule for arrangement is simple: **the shunt element goes across the larger resistance, the series element towards the smaller one.**

The network's Q is fixed by the resistance ratio alone:

$$
Q = \sqrt{\frac{R_{high}}{R_{low}} - 1}
$$

and from that the element reactances follow:

$$
X_{series} = Q \, R_{low} \qquad X_{shunt} = \frac{R_{high}}{Q}
$$

Each L-network has two realisations. The **low-pass** version uses a series inductor and shunt capacitor, and additionally attenuates harmonics — usually what you want after a power amplifier. The **high-pass** version uses a series capacitor and shunt inductor, and blocks DC, which is sometimes useful for biasing.

## The Q problem

The L-network's great limitation is that you do not get to choose Q. The resistance ratio sets it, and Q sets the bandwidth:

$$
BW \approx \frac{f_0}{Q}
$$

Matching 50 Ω to 1000 Ω forces Q = 4.36, giving a bandwidth of about 23 % of the centre frequency. Matching 50 Ω to 5 Ω forces Q = 3, giving 33 %. Extreme ratios give high Q, narrow bandwidth, and component values that become impractical — large inductors with poor Q of their own, or capacitors down in the single-picofarad range where strays dominate.

**Pi and T networks** add a third element, which buys you an independent choice of Q. You can then deliberately raise Q for more harmonic filtering, or lower it for wider bandwidth. Pi networks are the traditional output network of a valve transmitter for exactly this reason.

For very large ratios, **cascading** two L-networks through an intermediate impedance — ideally the geometric mean of the endpoints — gives lower total Q and better bandwidth than a single network.

## Other approaches

**Quarter-wave transformer.** A λ/4 length of line with $Z_0 = \sqrt{Z_1 Z_2}$ matches two real impedances. Simple and lossless, but inherently narrowband and requires a line of the right impedance to exist. Multi-section versions trade length for bandwidth.

**Stub matching.** An open or shorted stub of the right length at the right position cancels the load's reactance. Common in microstrip, where a stub is just a piece of copper.

**[Transformers](/wiki/transformers).** Impedance scales as the square of the turns ratio. Broadband, and the obvious choice when the ratio is large and the frequency low enough for a practical core.

**Resistive pads.** A matched [attenuator](/wiki/attenuators) provides a good match regardless of what follows, at the cost of throwing away power. Unacceptable on transmit, entirely reasonable on a receive input or between stages where a few dB is cheaper than instability.

## Conjugate matching is not always the goal

Maximum power transfer is what you want when the source is weak and power is scarce — a receiving antenna, a sensor. But note it is only 50 % efficient: half the power is dissipated in the source impedance.

In a **power amplifier**, you do not want conjugate matching. You want the load impedance that lets the device deliver the required power within its voltage and current limits without excessive distortion — the **load-line match**, found from load-pull measurements, which is generally not the conjugate of the device's output impedance.

In **low-noise amplifiers**, the optimum source impedance for minimum [noise figure](/wiki/noise-figure) is usually different from the one for maximum gain. Designing an LNA means choosing where to sit between the two, and the input match is set by noise considerations rather than power transfer.

## Practical notes

**Match at the antenna, not at the radio.** A tuner at the transmitter presents the radio with a comfortable load, but the standing waves on the feedline — and the extra loss they cause — remain.

**Component Q limits what you can achieve.** A matching network built from inductors with Q of 50 has losses; the higher the network Q, the more those losses matter. A high-Q match made with low-Q parts is mostly a heater.

**Strays are part of the network** above a few hundred MHz. Pad capacitance, via inductance and trace length all participate, and a design that ignores them will need tuning on the bench.
