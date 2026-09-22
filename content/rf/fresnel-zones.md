---
title: Fresnel Zones
category: rf
summary: Why line of sight is not enough, how much clearance a radio path actually needs, and the earth bulge nobody remembers.
tags: [fresnel, clearance, line of sight, diffraction, obstruction, path planning, earth bulge]
order: 52
related: [path-loss, link-budget, antenna-gain]
---

Radio waves do not travel along a pencil-thin line. Energy propagates through a region around the direct path, and objects intruding into that region interfere with the signal even without blocking the straight line between antennas.

That region is described by Fresnel zones — a series of nested ellipsoids with the two antennas at their foci. The radius of the $n$th zone at a point along the path is:

$$
r_n = \sqrt{\frac{n \lambda d_1 d_2}{d_1 + d_2}}
$$

[[calc:fresnel-zone]]

## Why zones alternate

Each zone is defined by the extra path length a reflected or diffracted ray travels compared with the direct ray. The first zone contains all paths up to half a wavelength longer, the second up to one wavelength longer, and so on.

That half-wavelength difference is a 180° phase shift, which is why the zones alternate in effect. Energy arriving via the **first zone** is broadly in phase with the direct ray and contributes constructively. Energy via the **second zone** arrives roughly out of phase and subtracts. The third adds again, and so on with diminishing effect.

This has an odd consequence: an obstruction that blocks only the second zone can actually *improve* the signal slightly, by removing a destructive contribution. It is not a design technique, but it explains otherwise puzzling measurements.

## The 60 % rule

The practical standard is to keep **60 % of the first Fresnel zone clear**. At that clearance, the received signal is approximately equal to the free-space value. More clearance gains you little; less costs you quickly.

Rough guidance for what obstruction costs:

| First-zone clearance | Approximate loss |
| --- | --- |
| 100 % | 0 dB |
| 60 % | 0 dB |
| 40 % | 2 dB |
| 20 % | 6 dB |
| 0 % (grazing) | 6 dB |
| −20 % (blocked) | 12 dB |
| −50 % (well blocked) | 20 dB+ |

Note that grazing the direct line already costs 6 dB. Simply having line of sight is not enough.

## Zone size is bigger than intuition suggests

The first zone is widest at the midpoint, where it becomes:

$$
r_{max} = \frac{1}{2}\sqrt{\lambda D}
$$

For a 10 km link at 2.4 GHz, that is 17.6 m. Over 20 km at 900 MHz it is 40 m. These are substantial heights — trees, buildings and hills that seem safely below the sightline are often well inside the zone.

Zone radius falls with frequency, which is one of the few things that get easier as you go up: at 5.8 GHz the same 10 km path needs only 11 m of clearance.

## Earth bulge

Over long paths, the earth's curvature raises the ground between the antennas relative to the straight line. The bulge at a point is:

$$
h = \frac{d_1 d_2}{2 k R_e}
$$

where $R_e$ is the earth's radius and $k$ is the effective earth radius factor.

Under normal atmospheric conditions the air's refractive index decreases with height, bending radio waves slightly downward and extending the horizon. This is captured by **k = 4/3**, the standard assumption.

Over a 30 km path, the midpoint bulge with k = 4/3 is about 13 m — comparable to the Fresnel radius and definitely not negligible.

The trap is that k is not constant. Under a temperature inversion it can rise sharply, or even go negative (sub-refraction), bending waves upward and effectively raising the terrain into the path. Critical links are planned for a worst-case k, often 2/3, not the typical value.

## Path planning in practice

1. Plot the terrain profile between the two sites, including vegetation and structures.
2. Add the earth bulge for the design value of k.
3. Draw the direct path at the proposed antenna heights.
4. Draw the 60 % first Fresnel zone boundary around it.
5. Raise antennas until nothing intrudes.

Remember that trees grow — allow for mature height, not current height — and that a path surveyed in winter looks very different in full leaf.

## When clearance is impossible

Sometimes the obstruction cannot be cleared. Options, roughly in order of preference:

**Move an antenna** higher or sideways. Often the cheapest fix.

**Use a repeater** or relay at an intermediate site with clear paths to both ends.

**Accept the diffraction loss** and budget for it, if the obstruction is a clean ridge with predictable knife-edge behaviour.

**Go lower in frequency**, where diffraction around obstacles is more effective — though the Fresnel zone gets larger, diffraction loss past an obstruction is less severe.

**Exploit a reflection** off a suitable surface. Unreliable and rarely worth it.
