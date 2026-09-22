---
title: Waveguide
category: rf
summary: Hollow metal pipes that carry microwaves with very low loss, and the cut-off frequency below which nothing gets through.
tags: [waveguide, cutoff, te10, mode, wr-90, microwave, rectangular, guide wavelength]
order: 55
related: [transmission-lines, coaxial-cable, wavelength-and-frequency]
---

Above a few gigahertz, coaxial cable becomes lossy and awkward. A hollow metal pipe carries microwave energy far more efficiently — there is no centre conductor to heat up and no dielectric to absorb, so the only loss is in the walls.

The price is a **cut-off frequency**. Below it, nothing propagates at all.

[[calc:waveguide]]

## Cut-off

For a rectangular guide of internal dimensions $a \times b$ (with $a$ the broad wall), the cut-off frequency of the TE$_{mn}$ mode is:

$$
f_{c,mn} = \frac{c}{2\sqrt{\varepsilon_r}}\sqrt{\left(\frac{m}{a}\right)^2 + \left(\frac{n}{b}\right)^2}
$$

The **dominant mode** is TE$_{10}$, with the lowest cut-off of all:

$$
f_{c,10} = \frac{c}{2a}
$$

It depends only on the broad dimension. Below this frequency the fields decay exponentially rather than propagating — the guide behaves as an attenuator, not a transmission line. This "below cut-off" behaviour is exploited deliberately in waveguide-below-cut-off attenuators and in ventilation honeycomb for shielded enclosures, where holes much smaller than a wavelength let air through but not RF.

## The usable band

A guide is normally operated between roughly **1.25× and 1.9×** its TE$_{10}$ cut-off.

The lower bound keeps you clear of cut-off, where loss rises steeply and dispersion is severe. The upper bound stays below the TE$_{20}$ cut-off at $c/a$ — because above that, a second mode can propagate, and energy splitting between modes travelling at different velocities makes the guide unusable for clean transmission.

Standard guides are dimensioned with $b \approx a/2$, which places the TE$_{01}$ cut-off at the same frequency as TE$_{20}$ and maximises the single-mode range.

## Standard sizes

| Designation | a × b (mm) | TE₁₀ cut-off | Usable band |
| --- | --- | --- | --- |
| WR-284 | 72.1 × 34.0 | 2.08 GHz | 2.60 – 3.95 GHz |
| WR-187 | 47.5 × 22.1 | 3.15 GHz | 3.95 – 5.85 GHz |
| WR-137 | 34.9 × 15.8 | 4.30 GHz | 5.85 – 8.20 GHz |
| WR-90 | 22.86 × 10.16 | 6.56 GHz | 8.20 – 12.4 GHz (X band) |
| WR-62 | 15.8 × 7.9 | 9.49 GHz | 12.4 – 18.0 GHz |
| WR-28 | 7.11 × 3.56 | 21.1 GHz | 26.5 – 40.0 GHz |
| WR-15 | 3.76 × 1.88 | 39.9 GHz | 50 – 75 GHz |

The WR number is the broad dimension in hundredths of an inch — WR-90 is 0.900 inches across.

## Guide wavelength

Waves in a guide do not travel at $c$, and the wavelength along the guide is **longer** than in free space:

$$
\lambda_g = \frac{\lambda_0}{\sqrt{1 - (f_c/f)^2}}
$$

Close to cut-off this becomes very large, tending to infinity at cut-off itself. This has two consequences: waveguide is **dispersive**, so different frequencies travel at different velocities and wideband signals spread; and any dimension specified in wavelengths — slot spacing in a slotted array, a quarter-wave transformer — must use $\lambda_g$, not $\lambda_0$.

The phase velocity exceeds $c$, which is not a problem: the group velocity, which carries the energy and the information, is correspondingly below $c$.

## Practical points

**Loss is low but not zero.** WR-90 runs about 0.1 dB/m at 10 GHz — roughly an order of magnitude better than good coax at the same frequency.

**Flanges must be clean and flat.** Waveguide currents flow on the inside surfaces and cross the flange joint; a poor joint causes reflection and loss. Choke flanges create a quarter-wave short that tolerates an imperfect contact, which is why they are used on rotary joints and where repeated demating is expected.

**Orientation matters.** The TE₁₀ field is polarised across the narrow dimension. Twists and bends must be gradual — a sharp bend is a discontinuity.

**Dents are serious.** A dent changes the local dimensions and creates a reflection. Waveguide is handled carefully for good reason.

**Pressurisation.** High-power systems are often filled with dry air or nitrogen at slight overpressure, to prevent moisture ingress and to raise the breakdown threshold.

## Other geometries

**Circular waveguide** has its own mode set, with TE₁₁ dominant. Its rotational symmetry suits rotary joints, but that same symmetry means the polarisation can rotate, which is usually unwanted.

**Ridged waveguide** adds a ridge along the broad wall, lowering the TE₁₀ cut-off without affecting TE₂₀ as much, and so widening the single-mode band considerably. The cost is higher loss and lower power handling.

**Substrate-integrated waveguide (SIW)** builds an equivalent structure in a PCB using two rows of vias as the side walls. It brings much of waveguide's performance to printed circuits at millimetre-wave frequencies.
