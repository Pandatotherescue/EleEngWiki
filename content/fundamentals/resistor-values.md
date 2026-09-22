---
title: Resistor Values & Markings
category: fundamentals
summary: Preferred value series, the colour code, SMD markings, and why 4.7 kΩ exists but 4.5 kΩ does not.
tags: [resistor, colour code, color code, E12, E24, E96, preferred values, SMD marking]
order: 9
related: [series-parallel-resistors, voltage-divider, ohms-law]
---

Resistors are not made in arbitrary values. They come in **preferred value series**, chosen so that consecutive values are separated by roughly the tolerance band — which is why 4.7 kΩ is everywhere and 4.5 kΩ is nowhere.

## The E series

Each series divides a decade into $n$ logarithmically spaced steps:

| Series | Values per decade | Tolerance | Step |
| --- | --- | --- | --- |
| E6 | 6 | ±20 % | ~47 % |
| E12 | 12 | ±10 % | ~21 % |
| E24 | 24 | ±5 % | ~10 % |
| E48 | 48 | ±2 % | ~5 % |
| E96 | 96 | ±1 % | ~2.4 % |
| E192 | 192 | ±0.5 % and tighter | ~1.2 % |

The logic is coverage without redundancy. If parts are ±10 %, you only need values about 20 % apart — anything closer and the tolerance bands overlap so heavily that the extra value buys nothing.

**E24**, the 5 % series, is the one worth recognising on sight:

`10 11 12 13 15 16 18 20 22 24 27 30 33 36 39 43 47 51 56 62 68 75 82 91`

## The colour code

Axial resistors carry their value as coloured bands. Read them with the tolerance band — gold, silver, or simply a wider band with a bigger gap before it — on the right.

[[calc:resistor-color-code]]

| Colour | Digit | Multiplier | Tolerance |
| --- | --- | --- | --- |
| Black | 0 | ×1 | — |
| Brown | 1 | ×10 | ±1 % |
| Red | 2 | ×100 | ±2 % |
| Orange | 3 | ×1 k | — |
| Yellow | 4 | ×10 k | — |
| Green | 5 | ×100 k | ±0.5 % |
| Blue | 6 | ×1 M | ±0.25 % |
| Violet | 7 | ×10 M | ±0.1 % |
| Grey | 8 | — | — |
| White | 9 | — | — |
| Gold | — | ÷10 | ±5 % |
| Silver | — | ÷100 | ±10 % |

A **4-band** resistor gives two significant digits, a multiplier and a tolerance. A **5-band** gives three digits — used for 1 % parts, where two digits would not be enough to express E96 values. A **6-band** adds a temperature coefficient in ppm/K.

## Surface-mount markings

SMD resistors use printed codes instead, and there are several competing schemes.

**Three-digit:** two significant digits plus a power of ten. `472` is 47 × 10² = 4.7 kΩ. `100` is 10 × 10⁰ = 10 Ω, not 100 Ω.

**Four-digit:** three digits plus a multiplier, used for 1 % parts. `4701` is 470 × 10¹ = 4.7 kΩ.

**R notation:** the letter R marks the decimal point. `4R7` is 4.7 Ω, `R47` is 0.47 Ω.

**EIA-96:** a two-digit code plus a letter, on very small 1 % parts. `01A` is 100 Ω, `68C` is 4.99 kΩ. The digits index a lookup table of E96 mantissas and the letter gives the multiplier — you need the table, there is no arithmetic shortcut.

**No marking at all** is common on 0402 and smaller. Once those leave the reel, they are unidentifiable without a meter.

## Tolerance is not the whole story

A resistor's real-world accuracy is a stack of contributions, and tolerance is only the value at the moment of manufacture at 25 °C.

- **Temperature coefficient**, in ppm/K. A 100 ppm/K resistor drifts 0.1 % over a 10 K swing. Thin-film parts reach 25 ppm/K or better; thick-film is often 200 ppm/K.
- **Self-heating.** A resistor dissipating real power warms itself and drifts. This is a genuine source of nonlinearity in precision dividers.
- **Voltage coefficient.** Thick-film resistors change value slightly with applied voltage — small, but it matters in high-voltage dividers.
- **Long-term drift** with thermal cycling and humidity, typically quoted per 1000 hours.

For a divider feeding a regulator's feedback pin, matched temperature coefficients matter more than absolute tolerance: if both resistors drift together, the ratio holds.
