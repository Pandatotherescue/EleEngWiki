---
title: Coaxial Cable
category: rf
summary: Why 50 ohms became standard, what sets a cable's impedance and loss, and the frequency above which it stops behaving.
tags: [coax, coaxial, 50 ohm, 75 ohm, cable loss, velocity factor, shielding, connector]
order: 41
related: [transmission-lines, vswr-and-return-loss, skin-effect]
---

Coaxial cable confines the entire field between an inner conductor and a surrounding shield. That confinement is what makes it useful: the field does not radiate, and external fields do not get in.

Its characteristic impedance depends only on the ratio of the diameters and the dielectric:

$$
Z_0 = \frac{138}{\sqrt{\varepsilon_r}} \log_{10}\frac{D}{d}
$$

Note it is the **ratio** that matters, not the absolute size. Scaling a cable up keeps its impedance but improves its power handling and loss.

[[calc:coax-impedance]]

## Why 50 Ω?

For an air-dielectric coax, two optima fall at different impedances:

- **Minimum attenuation** occurs at about 77 Ω.
- **Maximum power handling**, for a given outer diameter and breakdown field, occurs at about 30 Ω.

Fifty ohms is close to the geometric mean of the two, and a reasonable compromise for transmitters where both matter. It stuck, and the entire RF test and component ecosystem standardised on it.

**Seventy-five ohms** is used for video and broadcast distribution, where power handling is irrelevant and low loss is everything. With a polyethylene dielectric the loss minimum shifts close to 75 Ω, so the choice is well founded rather than arbitrary.

## Loss

Cable loss rises with frequency and comes from two mechanisms.

**Conductor loss** dominates at lower frequencies and rises as $\sqrt{f}$, because the [skin effect](/wiki/skin-effect) confines current to an ever-thinner surface layer.

**Dielectric loss** rises linearly with $f$ and takes over at high frequency. It is why foam and air-spaced dielectrics are used in low-loss cable: less material, less loss.

Loss is quoted in dB per 100 m (or per 100 ft) at specified frequencies. It matters more than people expect — 3 dB of feedline loss means half your transmit power never reaches the antenna, and on receive it degrades the [noise figure](/wiki/noise-figure) of the whole system by the same 3 dB.

There is an awkward corollary: feedline loss **masks a bad match**. Reflected power passes through the cable twice, so a poor antenna match measured at the transmitter looks better than it really is. A 3 dB feedline makes an infinite VSWR at the antenna read as 5.8:1 at the radio.

## Common cable types

| Type | Z₀ | Ø | Velocity factor | Notes |
| --- | --- | --- | --- | --- |
| RG-174 | 50 Ω | 2.8 mm | 0.66 | Thin, flexible, lossy. Patch leads. |
| RG-58 | 50 Ω | 5.0 mm | 0.66 | General purpose, moderate loss. |
| RG-213 | 50 Ω | 10.3 mm | 0.66 | Low loss, HF/VHF power. |
| LMR-400 | 50 Ω | 10.3 mm | 0.85 | Foam dielectric, much lower loss. |
| RG-59 | 75 Ω | 6.1 mm | 0.66 | Analogue video. |
| RG-6 | 75 Ω | 6.9 mm | 0.83 | Satellite and cable TV. |
| Semi-rigid 0.141" | 50 Ω | 3.6 mm | 0.70 | PTFE, solid copper shield, microwave. |

## The upper frequency limit

Coax carries the TEM mode, which has no cut-off — but above a certain frequency the cable also supports the TE₁₁ waveguide mode, and the clean transmission-line behaviour breaks down. The cut-off is set by the mean circumference:

$$
f_c \approx \frac{2c}{\pi (D + d) \sqrt{\varepsilon_r}}
$$

This is why microwave cables are physically small: shrinking the diameter pushes the cut-off higher. It is also why you cannot simply scale a cable up indefinitely for lower loss.

## Shielding

Shield effectiveness varies enormously, and the cheap stuff is genuinely bad.

- **Single braid**, typically 80–95 % coverage. Adequate below VHF; leaks above.
- **Foil plus braid** gives near-complete coverage. The foil handles high frequency, the braid provides low-resistance return.
- **Double braid** or **solid copper** for demanding work.

Braid coverage percentage is the figure to look for. Below 90 %, expect leakage both ways.

## Connectors

The connector is often the weakest point of an installation.

**BNC** — quick bayonet, fine to about 4 GHz, available in both 50 Ω and 75 Ω versions that look nearly identical and should not be mixed.
**SMA** — threaded, to 18 GHz, small; over-tightening destroys it and it is not rated for many mating cycles.
**N-type** — threaded, weatherproof versions available, to 11 GHz, good power handling.
**UHF (PL-259)** — not a constant-impedance connector at all. Fine at HF, poor above VHF, but ubiquitous in amateur radio.

Water ingress is the classic field failure: it wicks along the braid, raises loss steadily, and by the time it is noticed the cable is ruined for metres. Outdoor connections need proper weatherproofing, not just tape.
