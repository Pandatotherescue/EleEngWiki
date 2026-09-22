---
title: Antenna Gain & Beamwidth
category: rf
summary: What gain really is, how aperture size sets it, and the inescapable trade against beamwidth.
tags: [antenna gain, dbi, dbd, beamwidth, aperture, directivity, parabolic, dish]
order: 48
related: [antenna-fundamentals, eirp-and-erp, link-budget, fresnel-zones]
---

Antenna gain is not amplification. A passive antenna adds no power — it concentrates the power it is given into some directions at the expense of others. Gain is the ratio of the power density in the favoured direction to what an isotropic radiator would produce with the same input.

$$
G = \eta \cdot D
$$

where $D$ is **directivity** (purely a pattern property) and $\eta$ is **efficiency** (how much of the input power gets radiated at all).

[[calc:parabolic-antenna]]

## dBi and dBd

**dBi** references an isotropic radiator — a theoretical point source radiating equally in all directions. It cannot be built, but it makes a clean reference.

**dBd** references a half-wave dipole, which has 2.15 dBi of gain itself:

$$
G_{dBi} = G_{dBd} + 2.15
$$

Always check which is meant. A manufacturer quoting "9 dB gain" without a suffix may mean 9 dBd (11.15 dBi) or 9 dBi, and the difference matters in a [link budget](/wiki/link-budget) or a regulatory filing. Where the suffix is absent, assume the more flattering interpretation was intended.

## Aperture antennas

For an antenna that works by collecting energy over an area — a dish, a horn, a patch array — gain follows from the aperture:

$$
G = \eta \frac{4\pi A}{\lambda^2}
$$

and for a circular dish of diameter $D$:

$$
G = \eta \left(\frac{\pi D}{\lambda}\right)^2
$$

Aperture efficiency $\eta$ is typically 50–70 % for a prime-focus parabolic, higher for a well-designed Cassegrain. The shortfall comes from illumination taper, spillover past the edge, feed blockage and surface error.

Two consequences follow directly:

- **Doubling the diameter gives 6 dB.** Gain goes as area.
- **Doubling the frequency gives 6 dB** from the same dish, because λ halves. A dish that gives 30 dBi at 5 GHz gives 36 dBi at 10 GHz.

## The beamwidth trade

Gain and beamwidth are two views of the same thing. Concentrating power into a narrower beam is what produces gain.

$$
\theta_{3dB} \approx \frac{70\lambda}{D} \text{ degrees}
$$

A useful approximation relating the two for a pencil beam:

$$
G \approx \frac{30000}{\theta_{az} \cdot \theta_{el}}
$$

with beamwidths in degrees. A 40 dBi dish has a beam roughly 1.7° wide — which means pointing accuracy becomes a mechanical engineering problem. Wind loading, mast twist and thermal expansion all start to matter, and at 50 dBi and above, tracking systems are necessary.

This is the fundamental tension in high-gain links: the gain is free in power terms but expensive in alignment, stability, and the ability to tolerate any movement at either end.

## Reading a radiation pattern

**Main lobe** — the intended beam. Its −3 dB width is the headline beamwidth.

**Side lobes** — unwanted lobes either side. Their level relative to the main lobe matters for interference, both radiated and received. −20 dB is ordinary; specialised designs achieve −30 dB or better through careful illumination taper.

**Back lobe** — radiation behind the antenna. The **front-to-back ratio** matters when you are trying to reject an interferer from behind.

**Nulls** — directions of near-zero response. Deliberately pointing a null at an interferer is often more effective than pointing the main lobe at the wanted signal.

## Near field and far field

The gain figure only applies in the **far field**, beyond:

$$
d_{ff} = \frac{2D^2}{\lambda}
$$

For a 1.2 m dish at 10 GHz this is 96 m. Closer than that, the pattern has not formed and measurements will not match the specification. This is why antenna ranges are long, and why compact ranges and near-field scanning exist as alternatives.

## Effective aperture on receive

Receiving antennas have an effective aperture related to gain by:

$$
A_e = \frac{G\lambda^2}{4\pi}
$$

Notice that for a fixed gain, effective aperture *falls* with frequency. A 6 dBi antenna at 5 GHz captures a quarter of the energy that the same-gain antenna captures at 2.5 GHz. This is the real origin of the frequency term in [free-space path loss](/wiki/path-loss) — it is a property of the receiving antenna, not of space itself.
