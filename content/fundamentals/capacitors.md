---
title: Capacitors
category: fundamentals
summary: What capacitance means, how the dielectric type changes everything, and why the capacitor you bought is not the capacitance you get.
tags: [capacitor, capacitance, dielectric, ESR, X7R, electrolytic, decoupling]
order: 6
related: [inductors, rc-circuits, reactance-and-impedance]
---

A capacitor stores energy in an electric field between two conductors. Its defining relationship is between charge and voltage:

$$
Q = C V
$$

Differentiating gives the form that actually matters in circuit analysis — current flows only when the voltage is *changing*:

$$
I = C \frac{dV}{dt}
$$

This is the whole personality of a capacitor in one line. It blocks DC, passes AC, resists sudden voltage changes, and stores energy:

$$
E = \tfrac{1}{2} C V^2
$$

## The dielectric decides everything

Two capacitors of the same nominal value can behave completely differently. The dielectric is why.

| Type | Typical range | Notes |
| --- | --- | --- |
| C0G / NP0 ceramic | 1 pF – 10 nF | Near-perfect: stable with voltage, temperature and time. Use for filters and timing. |
| X7R / X5R ceramic | 100 pF – 100 µF | Good value density, but loses capacitance with applied voltage and temperature. |
| Y5V / Z5U ceramic | 1 nF – 10 µF | Very high density, very poor stability. Avoid where value matters. |
| Aluminium electrolytic | 1 µF – 100 mF | Cheap bulk storage. Polarised, high ESR, dries out with age and heat. |
| Tantalum | 100 nF – 1 mF | Compact and stable, but fails short and can burn. Derate voltage heavily. |
| Film (PP, PET) | 1 nF – 100 µF | Excellent linearity and low loss. Physically large. Good for audio and power. |

## DC bias: the trap in every MLCC

This deserves its own section because it catches experienced engineers. A class-II ceramic capacitor — X7R, X5R, Y5V — **loses capacitance as you apply voltage across it**.

A 10 µF 16 V X5R in an 0805 package can measure under 3 µF when running at 12 V. That is not a tolerance issue or a faulty part; it is inherent to the ferroelectric dielectric. The effect worsens as packages shrink, because the dielectric layers are thinner and the field strength is higher.

The practical consequences:

- Choose a voltage rating well above your working voltage — 2× is a reasonable starting point, and not for reliability so much as for keeping the capacitance.
- A larger package with the same value and rating will hold up better.
- Where the actual value matters — timing, filter corners, compensation — use C0G/NP0 or film.

## Parasitics

A real capacitor is a capacitor in series with a resistance and an inductance:

- **ESR** (equivalent series resistance) causes heating under ripple current and limits how well a capacitor can supply fast transients. Electrolytics are poor here; ceramics excellent.
- **ESL** (equivalent series inductance) comes from the leads and internal structure. Above the **self-resonant frequency** the part behaves as an inductor and stops decoupling anything.
- **Leakage** matters in sample-and-hold and long-timing circuits. Electrolytics leak substantially.

Self-resonance is why decoupling schemes often place a large bulk capacitor alongside a small ceramic: the bulk part handles low-frequency demand, the small one — with lower ESL — stays capacitive at high frequency.

## Combining capacitors

Capacitors combine the opposite way to resistors: parallel values **add**, series values follow the reciprocal sum. See [series and parallel networks](/wiki/series-parallel-resistors) for the full picture.

$$
C_{parallel} = C_1 + C_2 \qquad \frac{1}{C_{series}} = \frac{1}{C_1} + \frac{1}{C_2}
$$

## Charging behaviour

Through a resistor, a capacitor charges exponentially with time constant $\tau = RC$:

[[calc:rc-time-constant]]

## Safety

Large capacitors store dangerous energy and hold it after power is removed. A 470 µF capacitor at 400 V in a mains supply holds 37 J — easily enough to kill. Always assume a supply's bulk capacitors are charged, always check with a meter, and never rely on a bleeder resistor you have not verified.
