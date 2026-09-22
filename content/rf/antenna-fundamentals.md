---
title: Antenna Fundamentals
category: rf
summary: Resonance, radiation resistance, polarisation and ground planes — what actually determines whether an antenna works.
tags: [antenna, dipole, monopole, resonance, radiation resistance, polarisation, ground plane]
order: 47
related: [wavelength-and-frequency, antenna-gain, vswr-and-return-loss, eirp-and-erp]
---

An antenna converts guided waves on a transmission line into radiated waves in space, and back. Everything about its behaviour is set by its size relative to the wavelength — which is why antenna dimensions are always quoted in fractions of λ rather than in millimetres.

[[calc:dipole-length]]

## The half-wave dipole

The reference against which everything else is measured. Two collinear elements, each a quarter wavelength, fed at the centre.

At resonance it presents roughly **73 Ω** of radiation resistance with almost no reactance — conveniently close to 50 Ω, giving a VSWR of about 1.5:1 straight out of the box.

Its pattern is a doughnut: maximum radiation broadside to the wire, nulls off the ends. Gain is 2.15 dBi, which is the definition of 0 dBd.

The physical length is always a few percent shorter than a free-space half wavelength, because of **end effect** — capacitance between the element tips and their surroundings. A factor of about 0.95 for thin wire is the usual starting point, less for thick elements and for insulated wire.

## The quarter-wave monopole

Half a dipole, with a ground plane taking the place of the other half by image. Radiation resistance is half that of a dipole, about **36 Ω**, and the pattern is the upper half of the dipole's doughnut.

The ground plane is not optional decoration. It is genuinely half the antenna. A quarter-wave whip on an inadequate ground plane will show a poor match, radiate from the feedline, and generally misbehave — and the "fix" of adjusting the whip length treats a symptom.

A proper ground plane means either a conducting surface extending at least a quarter wavelength in every direction, or **radials** — typically four or more quarter-wave wires. Radials are usually cut slightly longer than λ/4 and, when sloped downwards, raise the feedpoint impedance closer to 50 Ω, which is why ground-plane antennas commonly have drooping radials.

## Radiation resistance and efficiency

The power an antenna radiates can be modelled as being dissipated in a fictitious **radiation resistance**. Real losses — conductor resistance, ground losses, loading coil losses — appear as a separate loss resistance in series.

$$
\eta = \frac{R_{rad}}{R_{rad} + R_{loss}}
$$

This is why **electrically small antennas are inefficient**. As an antenna shrinks below about λ/10, radiation resistance falls dramatically — it scales roughly as the square of the length for a short dipole — while loss resistance does not. A very short whip might have 1 Ω of radiation resistance and 5 Ω of loss, radiating a sixth of the power fed to it. The rest becomes heat.

Worse, a short antenna is strongly capacitive and needs a loading coil to resonate, and that coil brings its own loss. The fundamental limit here is the **Chu–Harrington limit**, which ties bandwidth, efficiency and electrical size together: you may trade among them, but you cannot escape them.

This is the honest reason a rubber-duck antenna performs poorly, and no matching network can rescue it — a perfect match to a lossy antenna simply delivers the power efficiently into a resistor.

## Polarisation

The orientation of the radiated electric field, set by the orientation of the antenna.

**Linear** — vertical or horizontal. A mismatch between transmit and receive polarisation costs signal, and a full 90° cross-polarisation costs 20 dB or more. This is why handheld radios work better held upright.

**Circular** — the field rotates, produced by feeding crossed elements 90° out of phase, or by a helix. A circularly polarised wave couples to any linear polarisation with a fixed 3 dB loss, which is why satellites use it: the relative orientation is unknown and changing. Two circular antennas of *opposite* sense reject each other almost entirely.

## Bandwidth

An antenna is a resonant structure, so it has a bandwidth. Thin elements have high Q and narrow bandwidth; thick elements, cages, and tapered structures have lower Q and wider bandwidth. This is why broadband antennas — discones, biconicals, log-periodics — look fat or use many elements of graduated size.

## Practical points

**Nearby objects detune an antenna.** Metal within a wavelength changes the impedance and the pattern. An antenna tuned on the bench will not be tuned on the vehicle.

**Height above ground matters enormously** for horizontal antennas. Ground reflection interferes with the direct wave, so the pattern and feed impedance both change with height, especially below about half a wavelength.

**Feedline radiation.** An unbalanced feed on a balanced antenna lets current flow on the outside of the coax shield, which then radiates and picks up noise. A balun or common-mode choke fixes it.

**Cut long, trim to resonance.** You can remove material; adding it back is harder.
