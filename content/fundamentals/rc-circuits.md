---
title: RC Circuits & Time Constants
category: fundamentals
summary: The exponential curve behind every debounce, filter, delay and edge-rounding problem you will meet.
tags: [rc, time constant, tau, transient, charging, debounce, settling]
order: 8
related: [capacitors, filters, voltage-divider]
---

Connect a resistor and capacitor in series, apply a step voltage, and the capacitor charges along an exponential curve governed by a single number — the time constant:

$$
\tau = R C
$$

With $R$ in ohms and $C$ in farads, $\tau$ comes out in seconds. The voltage across the capacitor as it charges towards a final value $V_f$ is:

$$
V(t) = V_f \left(1 - e^{-t/\tau}\right)
$$

and discharging towards zero from an initial $V_0$:

$$
V(t) = V_0 \, e^{-t/\tau}
$$

[[calc:rc-time-constant]]

## The numbers worth knowing by heart

| Elapsed time | Charged to | Remaining |
| --- | --- | --- |
| 1 τ | 63.2 % | 36.8 % |
| 2 τ | 86.5 % | 13.5 % |
| 3 τ | 95.0 % | 5.0 % |
| 5 τ | 99.3 % | 0.7 % |
| 7 τ | 99.9 % | 0.1 % |

**Five time constants** is the conventional definition of "settled". For 8-bit accuracy you need about 6τ; for 12-bit, about 9τ; for 16-bit, about 12τ. This is why ADC sampling circuits specify a maximum source impedance — the sampling capacitor must charge to full resolution within the acquisition window.

## The same circuit, two views

An RC network is a time-domain delay and a frequency-domain [filter](/wiki/filters) simultaneously. The two views are tied together:

$$
f_c = \frac{1}{2 \pi R C} = \frac{1}{2 \pi \tau}
$$

A circuit with a 1 ms time constant has a 159 Hz corner frequency. Slowing down an edge and rolling off high frequencies are the same operation described in two languages.

There is a neat consequence for digital signals. The 10–90 % rise time of an RC low-pass is:

$$
t_r \approx 2.2 \, \tau \approx \frac{0.35}{f_c}
$$

That 0.35 constant is where the familiar "bandwidth times rise time equals 0.35" rule comes from, and it is how you estimate whether a scope probe or a signal path can carry an edge without visibly softening it.

## Common applications

**Switch debounce.** A mechanical switch bounces for anywhere from a few hundred microseconds to several milliseconds. An RC with τ around 10 ms, feeding a Schmitt-trigger input, cleans it up. Without the Schmitt trigger the slow edge causes the logic input to oscillate through its threshold region.

**Power-on reset.** An RC holds a reset line low while the supply stabilises. Dedicated supervisor ICs do this better, because an RC does not track a slow or drooping supply rail.

**Anti-alias and noise filtering.** A first-order RC in front of an ADC keeps out-of-band noise from folding into the measurement band.

**Coupling and blocking.** A series capacitor with the following stage's input resistance forms a high-pass. Get the time constant wrong and low-frequency content is lost, or the stage takes a long time to settle after a DC shift.

## Where the simple model breaks

**Source impedance is part of R.** The driving stage's output resistance adds to whatever resistor you fitted. Driving from a 50 Ω generator into 1 kΩ is a 2 % error; driving from a 10 kΩ divider is not.

**Load impedance is part of the circuit too.** Whatever you connect to the output changes the effective network.

**Capacitor value is not the printed value.** A class-II ceramic can lose more than half its capacitance under DC bias — see [capacitors](/wiki/capacitors). Timing circuits should use C0G/NP0 or film parts.

**Leakage matters over long intervals.** For time constants beyond a few seconds, capacitor leakage and the input bias current of the following stage start to compete with the intended charging current.
