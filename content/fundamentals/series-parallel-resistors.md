---
title: Series & Parallel Networks
category: fundamentals
summary: Combining resistors, capacitors and inductors — and the reason the two rules swap over for capacitors.
tags: [series, parallel, network, equivalent resistance, combination]
order: 3
related: [ohms-law, voltage-divider, kirchhoffs-laws]
---

Any network of two-terminal components can be reduced to a single equivalent value, so long as it is built purely from series and parallel combinations.

**In series**, the same current flows through every element and the voltages add:

$$
R_{series} = R_1 + R_2 + \cdots + R_n
$$

**In parallel**, the same voltage appears across every element and the currents add:

$$
\frac{1}{R_{parallel}} = \frac{1}{R_1} + \frac{1}{R_2} + \cdots + \frac{1}{R_n}
$$

For exactly two resistors in parallel, the product-over-sum shortcut is quicker:

$$
R_{parallel} = \frac{R_1 R_2}{R_1 + R_2}
$$

[[calc:resistor-network]]

## Sanity checks worth memorising

- A parallel combination is always **smaller than the smallest** resistor in it. If your answer is bigger, you have made an arithmetic slip.
- Two equal resistors in parallel give exactly half the value. Three equal ones give a third.
- A very large resistor in parallel with a small one barely changes anything. 1 MΩ across 100 Ω gives 99.99 Ω.
- A very small resistor in series with a large one barely changes anything either.

Those last two are the basis of a lot of quick mental analysis: you can usually ignore a parallel path more than about 100× larger, or a series element more than about 100× smaller, to within 1 %.

## Capacitors work the other way round

This trips people up constantly. Capacitance combines *opposite* to resistance:

$$
C_{parallel} = C_1 + C_2 + \cdots \qquad \frac{1}{C_{series}} = \frac{1}{C_1} + \frac{1}{C_2} + \cdots
$$

The physical reason is straightforward. Putting capacitors in parallel effectively increases the plate area, so capacitance adds. Putting them in series increases the effective plate separation, so capacitance falls.

Inductors follow the same rules as resistors — series adds, parallel is the reciprocal sum — provided there is no magnetic coupling between them. If their fields interact, mutual inductance enters the picture and the simple rules break down.

| Component | Series | Parallel |
| --- | --- | --- |
| Resistors | Add | Reciprocal sum |
| Inductors | Add | Reciprocal sum |
| Capacitors | Reciprocal sum | Add |

## Getting values you cannot buy

Standard resistors come in preferred-value series — E12 (10 %), E24 (5 %), E96 (1 %). When you need something that isn't in the series, combining two parts is often cheaper and more accurate than sourcing a precision value.

Two in series gets you anything above the larger value. Two in parallel gets you a value below the smaller one, useful for fine trimming: a 1 kΩ with a 100 kΩ in parallel gives 990.1 Ω, a 1 % nudge downwards.

There is a catch worth knowing. Tolerances do **not** simply average out. Two 5 % resistors in series give a combination that is still 5 % in the worst case, though statistically the spread is narrower because the errors are independent. Never assume combining parts buys you precision — it buys you value granularity.

## Series and parallel in practice

**Current sharing** between parallel resistors is inversely proportional to resistance, so the smallest resistor takes the most current and gets the hottest. If you parallel resistors to increase power handling, use equal values.

**Voltage sharing** between series capacitors is inversely proportional to capacitance, and leakage current makes the split drift over time. High-voltage capacitor stacks need balancing resistors across each element for exactly this reason.

**Not everything reduces.** A bridge network — five resistors in a diamond with one across the middle — is neither series nor parallel. Those need [Kirchhoff's laws](/wiki/kirchhoffs-laws), or a delta-star transformation.
