---
title: The Smith Chart
category: rf
summary: How a chart from 1939 turned transmission-line arithmetic into geometry, and how to read one.
tags: [smith chart, impedance, admittance, matching, normalised, reflection coefficient, stub]
order: 43
related: [vswr-and-return-loss, impedance-matching, transmission-lines, complex-impedance]
---

The Smith chart is a plot of complex reflection coefficient with contours of constant resistance and reactance overlaid. Its purpose was originally computational — it turned tedious complex arithmetic into compass-and-ruler work — and although computers have removed that need, it remains the standard way to *visualise* impedance, and every vector network analyser offers it as a display format.

## The construction

Start with the complex Γ plane: a unit circle, since $|\Gamma| \le 1$ for any passive load. Now overlay the mapping from impedance to Γ:

$$
\Gamma = \frac{z - 1}{z + 1}, \qquad z = \frac{Z}{Z_0}
$$

Impedances are **normalised** to the system impedance, which is what makes one chart serve every system. In a 50 Ω system, 50 Ω plots as 1.0, 25 Ω as 0.5, 100 Ω as 2.0.

This mapping turns the straight lines of constant R and constant X in the impedance plane into **circles** on the Γ plane. That is the chart's whole geometry.

## Reading it

**Centre** is $z = 1$: a perfect match, $\Gamma = 0$.

**Horizontal axis** is pure resistance. Left end is a short circuit ($z=0$, $\Gamma = -1$), right end an open circuit ($z=\infty$, $\Gamma = +1$).

**Upper half** is inductive (positive reactance). **Lower half** is capacitive.

**Distance from centre** is $|\Gamma|$, so circles centred on the middle are constant VSWR circles. A point halfway out is $|\Gamma| = 0.5$, VSWR 3:1.

## The movements that matter

What makes the chart useful is that each circuit operation is a simple motion.

**Moving along a transmission line** rotates the point about the centre — clockwise towards the generator, anticlockwise towards the load. A full rotation is **half a wavelength**, which is why line behaviour repeats every λ/2. The radius does not change on a lossless line, because a lossless line cannot change $|\Gamma|$.

**Adding series reactance** moves along a constant-resistance circle. Series inductance moves clockwise (upwards); series capacitance anticlockwise.

**Adding shunt reactance** moves along a constant-conductance circle — which requires the admittance chart, the same chart rotated 180°. A combined chart showing both sets of circles is called an immittance chart, and matching networks are designed by alternating between the two families.

## Designing a match on the chart

The classic two-element [L-network](/wiki/impedance-matching) procedure:

1. Plot the normalised load impedance.
2. Add a series or shunt element to move onto the unit-resistance circle (or unit-conductance circle).
3. Add the complementary element to travel along that circle to the centre.

Two paths always exist — one through the inductive half, one through the capacitive half — giving the low-pass and high-pass solutions. The chart shows immediately which requires more extreme component values and roughly what bandwidth to expect, since a longer path implies higher Q.

## Why it survives

Given that any calculator can do the arithmetic, the chart persists because it shows things a number cannot:

- **How far off** a match is, and crucially **in which direction** — too inductive, too capacitive, too high, too low.
- **How impedance moves with frequency**, as a swept trace. A loop in the trace means a resonance; the direction of travel tells you what kind.
- **Bandwidth**, at a glance, from how long the trace stays inside a given VSWR circle.
- **Whether a proposed fix helps**, before you build it.

A broadband match traces a small cluster near the centre. A narrowband one sweeps a long arc, crossing the centre at one frequency and departing rapidly either side.

## Related quantities on one chart

Most printed charts carry radial scales around the edge for VSWR, return loss, reflection coefficient and mismatch loss — all the quantities from [VSWR and return loss](/wiki/vswr-and-return-loss), since they are all functions of $|\Gamma|$ alone. You can read them directly from the radius:

[[calc:vswr]]
