---
title: Complex Impedance & Phasors
category: ac
summary: Doing AC circuit analysis with complex numbers, and why it turns calculus into arithmetic.
tags: [complex, phasor, impedance, admittance, polar, rectangular, j omega]
order: 22
related: [reactance-and-impedance, resonance, vswr-and-return-loss]
---

AC circuits are governed by differential equations. A capacitor obeys $I = C\,dV/dt$, an inductor $V = L\,dI/dt$. Solving a network of these directly is painful.

The phasor method replaces all of it with complex arithmetic. For steady-state sinusoidal analysis at a single frequency, you represent each voltage and current as a complex number carrying magnitude and phase, and every derivative becomes a multiplication by $j\omega$.

## Impedance in complex form

$$
Z_R = R \qquad Z_L = j\omega L \qquad Z_C = \frac{1}{j\omega C} = -\frac{j}{\omega C}
$$

That is the whole trick. Once components are written this way, all the DC rules return unchanged: impedances in series add, impedances in parallel take the reciprocal sum, and Ohm's law becomes $V = IZ$ with complex quantities.

[[calc:series-rlc]]

## Rectangular and polar

The same impedance can be written two ways, and each is convenient for different operations.

**Rectangular**, $Z = R + jX$, makes addition easy — just add real and imaginary parts separately. Use it for series combinations.

**Polar**, $Z = |Z| \angle \varphi$, makes multiplication and division easy — multiply magnitudes, add angles. Use it for computing currents and for ratios.

Converting between them:

$$
|Z| = \sqrt{R^2 + X^2}, \quad \varphi = \arctan\frac{X}{R}
$$
$$
R = |Z| \cos\varphi, \quad X = |Z| \sin\varphi
$$

Note that engineers write $j$ rather than $i$ for $\sqrt{-1}$, because $i$ is already taken by current.

## Admittance

Sometimes the reciprocal is more convenient, particularly for parallel networks:

$$
Y = \frac{1}{Z} = G + jB
$$

where $G$ is **conductance** and $B$ is **susceptance**, both in siemens. Admittances in parallel simply add, which makes parallel networks as easy as series ones are with impedance.

This is not merely cosmetic. The Smith chart's usefulness comes largely from letting you flip between impedance and admittance views geometrically, which is exactly what you need when a matching network alternates between series and shunt elements.

## The series RLC circuit

Take a resistor, inductor and capacitor in series:

$$
Z = R + j\left(\omega L - \frac{1}{\omega C}\right)
$$

Three regimes fall straight out:

- **Below resonance**, the capacitive term dominates. Net reactance is negative, the circuit is capacitive, current leads.
- **At resonance**, the two reactances cancel exactly. $Z = R$, purely real, current in phase with voltage, and the magnitude of the impedance is at its minimum.
- **Above resonance**, the inductive term dominates. The circuit is inductive, current lags.

That cancellation point is:

$$
f_0 = \frac{1}{2\pi\sqrt{LC}}
$$

covered in detail on [resonance](/wiki/resonance).

## What phasors cannot do

The method is powerful but has firm boundaries.

**One frequency at a time.** Phasor analysis is a steady-state, single-frequency technique. For multiple frequencies, superpose the results — but only if the circuit is linear.

**Linear components only.** Diodes, saturating cores and anything else non-linear break the method entirely. A non-linear element generates harmonics, and harmonics violate the single-frequency premise.

**Steady state only.** Phasors say nothing about what happens in the first few cycles after a step. For transients you need Laplace analysis, where $j\omega$ generalises to the complex variable $s$ — which is why so much control theory looks like AC analysis with a broader alphabet.
