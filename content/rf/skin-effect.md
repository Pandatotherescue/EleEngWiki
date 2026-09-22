---
title: Skin Effect
category: rf
summary: Why high-frequency current flows only on the surface of a conductor, and what that does to resistance and design.
tags: [skin effect, skin depth, ac resistance, proximity effect, litz, silver plating, conductor]
order: 54
related: [wire-and-cable, coaxial-cable, inductors, q-factor]
---

At DC, current distributes itself uniformly through a conductor's cross-section. At high frequency it does not: the changing magnetic field inside the conductor induces eddy currents that oppose current flow in the centre and reinforce it at the surface.

The result is that current crowds into a thin surface layer, characterised by the **skin depth** — the depth at which current density has fallen to $1/e$, about 37 %, of its surface value:

$$
\delta = \sqrt{\frac{\rho}{\pi f \mu}}
$$

[[calc:skin-depth]]

## How thin is thin?

Copper skin depth across the spectrum:

| Frequency | Skin depth |
| --- | --- |
| 50 Hz | 9.3 mm |
| 1 kHz | 2.1 mm |
| 100 kHz | 206 µm |
| 1 MHz | 65 µm |
| 10 MHz | 21 µm |
| 100 MHz | 6.5 µm |
| 1 GHz | 2.1 µm |
| 10 GHz | 0.65 µm |

Note the $1/\sqrt{f}$ relationship: a hundredfold increase in frequency reduces skin depth by only a factor of ten.

At 1 GHz, current in a copper conductor flows in a layer thinner than a red blood cell. Anything below that surface is structural, not electrical.

## Consequences

**AC resistance exceeds DC resistance**, and the gap widens with frequency. For a round conductor much thicker than a skin depth, the effective cross-section is an annulus of thickness δ, so resistance rises roughly as $\sqrt{f}$.

**Thick conductors stop helping.** Doubling the diameter of a wire at 100 MHz roughly halves its AC resistance (the circumference doubles), rather than quartering it as the DC area would suggest. Beyond a few skin depths, adding metal achieves nothing.

**Surface finish matters.** Since all the current is at the surface, surface roughness increases the effective path length and the loss. On PCBs this is significant: the rough "tooth" side of copper foil, needed for adhesion, measurably raises loss above a few GHz, which is why low-profile foils exist for high-speed laminates.

**Plating works.** Silver-plating a conductor gives you silver's lower resistivity where the current actually flows, without the cost of solid silver. Conversely, nickel plating under gold is a problem: nickel is both resistive and magnetic, so its skin depth is very small and the loss it contributes is disproportionate.

## Proximity effect

Skin effect is what a conductor does to itself. **Proximity effect** is what neighbouring conductors do to it — the magnetic field from an adjacent conductor pushes current into an even smaller part of the cross-section.

In a tightly wound multi-layer coil this can dominate, raising AC resistance well beyond what skin effect alone predicts. It is the main reason a transformer winding's loss at high frequency can be many times its DC resistance.

## Mitigations

**Litz wire** — many individually insulated strands, woven so each strand takes every position in the bundle. Each strand is thinner than a skin depth, and the weaving equalises the flux linkage so no strand is permanently buried. Effective from roughly 10 kHz to a few MHz; above that the strand count becomes impractical and the insulation takes up too much room.

**Hollow conductors and tubing.** Since the centre carries nothing, removing it costs no performance and saves weight and cost. RF power inductors are often wound from copper tube — which can also be water-cooled.

**Flat strip.** For a given cross-sectional area, a wide thin strip has more surface than a round wire.

**Plating** with a better conductor, as above.

## Where it changes the design

**Coaxial cable loss** rises as $\sqrt{f}$ from conductor loss, until dielectric loss (rising linearly) overtakes it. See [coaxial cable](/wiki/coaxial-cable).

**Inductor Q** is limited by AC winding resistance, which is why Q peaks at some frequency and falls away above it. See [Q factor](/wiki/q-factor).

**Ground planes need no thickness** for RF purposes — return current flows in the top few microns. A plane is about continuity, not copper weight.

**Shielding** works partly through skin effect: a shield only a few skin depths thick attenuates enormously. This is also why shielding is hard at low frequency, where skin depth in any practical material is large, and why magnetic shielding at mains frequency requires high-permeability material rather than mere conductivity.
