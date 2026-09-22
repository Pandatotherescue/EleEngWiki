---
title: Wire, Cable & Voltage Drop
category: fundamentals
summary: Picking a conductor size from current, distance and how much voltage you can afford to lose along the way.
tags: [awg, wire gauge, voltage drop, ampacity, copper, cable, conductor]
order: 11
related: [dc-power, ohms-law, skin-effect]
---

Wire is a resistor you did not intend to add. Over a short run at low current it is invisible; over a long run at high current it dominates the circuit.

The resistance of a conductor follows from its resistivity, length and cross-section:

$$
R = \rho \frac{l}{A}
$$

[[calc:awg-wire]]

## Understanding AWG

American Wire Gauge runs backwards — larger numbers mean thinner wire. The scale is geometric, defined so that:

$$
d = 0.127\,\text{mm} \times 92^{(36-n)/39}
$$

Two shortcuts fall out of that definition and are worth remembering:

- **Three gauge numbers doubles or halves the cross-sectional area**, and therefore halves or doubles the resistance.
- **Six gauge numbers doubles or halves the diameter.**
- **Ten gauge numbers is a factor of ten in area.** AWG 10 has ten times the area of AWG 20.

Outside North America, cable is specified directly in mm² of cross-section, which is considerably more intuitive.

| AWG | Diameter (mm) | Area (mm²) | Ω/km (Cu) |
| --- | --- | --- | --- |
| 10 | 2.59 | 5.26 | 3.28 |
| 12 | 2.05 | 3.31 | 5.21 |
| 14 | 1.63 | 2.08 | 8.29 |
| 16 | 1.29 | 1.31 | 13.2 |
| 18 | 1.02 | 0.823 | 20.9 |
| 20 | 0.812 | 0.518 | 33.3 |
| 22 | 0.644 | 0.326 | 52.9 |
| 24 | 0.511 | 0.205 | 84.2 |

## Voltage drop is usually the binding constraint

For any run of more than a metre or two, voltage drop — not thermal rating — decides the conductor size. And remember the **loop**: current flows out along one conductor and back along another, so the resistance in the path is twice the one-way figure.

$$
V_{drop} = 2 I R_{per\,metre} \, l
$$

Common targets: 3 % drop for a branch circuit, 5 % total including the feed. In low-voltage DC systems the percentage constraint bites hard — losing 0.5 V matters far more on a 12 V system than on a 230 V one, which is precisely why long-distance power transmission uses high voltage.

## Ampacity is a thermal question

How much current a wire can carry safely is set by how hot its insulation is allowed to get, and that depends on far more than the copper:

- **Insulation rating** — PVC is typically 70 °C, XLPE and silicone considerably higher.
- **Bundling.** Cables in a bundle or conduit heat each other and must be derated, sometimes to half the free-air figure.
- **Ambient temperature.** A cable tray in a hot plant room is not the same environment as open air at 20 °C.
- **Installation method** — free air, clipped to a surface, buried, in conduit.

Because of this, ampacity comes from tables in the applicable standard, not from a formula. Resistance tells you about heat and drop; it does not tell you what is compliant.

## Stranded versus solid

**Solid** wire is cheaper, holds its shape, and terminates well in screw terminals and IDC connectors.

**Stranded** wire is flexible and survives repeated movement. It has slightly higher resistance for the same nominal size — the strands do not fill the circle perfectly — and it is noticeably worse in screw terminals unless ferruled, because the strands spread and relax over time.

For anything that moves, flexes, or is connected and disconnected repeatedly, use stranded.

## At high frequency, none of this holds

Above roughly 10 kHz the [skin effect](/wiki/skin-effect) pushes current towards the surface of the conductor and the effective cross-section shrinks. At 10 MHz, copper's skin depth is about 21 µm, so a thick solid wire carries current only in its outer skin and the DC resistance figure becomes meaningless.

This is why RF conductors are often silver-plated — only the surface carries current — and why high-frequency transformers and inductors use Litz wire, which is many thin insulated strands woven so each takes a turn at the surface.
