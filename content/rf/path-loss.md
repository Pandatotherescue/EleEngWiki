---
title: Free-Space Path Loss
category: rf
summary: The biggest term in any link budget, why it depends on frequency, and why real paths are always worse.
tags: [fspl, path loss, propagation, friis, range, attenuation, link]
order: 50
related: [link-budget, antenna-gain, fresnel-zones, wavelength-and-frequency]
---

Radio waves spread out. Power radiated from a point source is distributed over the surface of an expanding sphere, so power density falls as the square of distance. Free-space path loss expresses the resulting loss between two isotropic antennas:

$$
FSPL_{dB} = 20\log_{10}(d) + 20\log_{10}(f) + 20\log_{10}\!\left(\frac{4\pi}{c}\right)
$$

In the more practical mixed-unit form:

$$
FSPL_{dB} = 20\log_{10}(d_{km}) + 20\log_{10}(f_{MHz}) + 32.44
$$

[[calc:fspl]]

## Two rules that make this easy

Both terms are 20 log, so:

- **Doubling the distance adds 6 dB.**
- **Doubling the frequency adds 6 dB.**
- Ten times the distance adds 20 dB. Ten times the frequency adds 20 dB.

From one anchor point you can reach any other by inspection. A convenient anchor: at 1 GHz and 1 km, FSPL is 92.4 dB.

## The frequency term is not what it seems

Here is a genuine subtlety. Space does not attenuate high frequencies more than low ones — a vacuum is not lossy, and the spreading is identical at any frequency.

The frequency dependence comes entirely from the **receiving antenna's effective aperture**:

$$
A_e = \frac{G\lambda^2}{4\pi}
$$

For a fixed *gain*, the physical capture area shrinks as frequency rises, so less of the passing energy is intercepted. If instead you keep the antenna *aperture* fixed — the same dish at both ends — and raise the frequency, the gain of both antennas rises by 6 dB per octave each, which more than cancels the 6 dB path loss increase. A fixed-dish microwave link actually improves with frequency.

This matters for design decisions: whether higher frequency helps or hurts depends on whether your antennas are gain-limited or size-limited.

## Real paths are worse

FSPL describes a vacuum with clear line of sight and nothing nearby. Actual paths add:

**Obstruction and diffraction loss** when terrain or buildings intrude into the [Fresnel zone](/wiki/fresnel-zones). A knife-edge obstruction grazing the line of sight costs about 6 dB, and considerably more once it blocks properly.

**Ground reflection.** A reflected ray arriving out of phase with the direct one causes deep fading. Over a flat reflective surface at long range, loss transitions from a 20 dB/decade slope to roughly 40 dB/decade — the two-ray model.

**Atmospheric absorption.** Negligible below 10 GHz. Above that, water vapour and oxygen take their share, with a strong oxygen absorption peak near 60 GHz.

**Rain fade.** Significant above about 10 GHz and severe above 20 GHz. Heavy rain can add tens of dB on a Ka-band link, which is why such systems include adaptive coding and power control.

**Foliage.** Roughly 0.2–0.5 dB per metre of vegetation at 2.4 GHz, worse when wet. A single tree in the path is not a minor detail.

**Building penetration.** 10–20 dB for ordinary construction, considerably more for modern buildings with metallised low-emissivity glass and foil-backed insulation.

## Path loss exponents

Real environments are often modelled as:

$$
PL = PL_0 + 10 n \log_{10}\frac{d}{d_0}
$$

where $n$ is the path loss exponent. Free space is $n = 2$; everything else is worse.

| Environment | Typical n |
| --- | --- |
| Free space | 2.0 |
| Open rural | 2.0 – 2.5 |
| Suburban | 2.7 – 3.5 |
| Urban | 3.0 – 4.0 |
| Indoor, line of sight | 1.6 – 1.8 |
| Indoor, obstructed | 4.0 – 6.0 |

Indoor line-of-sight values below 2 look impossible but are real: corridors act as waveguides, channelling energy that would otherwise spread.

## Using it honestly

FSPL is a **best case**. It tells you the link cannot be better than this, which is genuinely useful for establishing an upper bound.

For planning, add margin: 10 dB is a minimum for a clear fixed path, 20 dB or more where fading, weather or movement is involved. See [link budget](/wiki/link-budget).
