---
title: Q Factor & Bandwidth
category: ac
summary: How sharp a resonance is, what limits it in practice, and the difference between loaded and unloaded Q.
tags: [q factor, quality factor, bandwidth, selectivity, loaded q, damping]
order: 24
related: [resonance, filters, inductors, impedance-matching]
---

Q, the quality factor, measures how lightly damped a resonant circuit is. Formally it is the ratio of energy stored to energy lost per radian of oscillation:

$$
Q = 2\pi \frac{\text{energy stored}}{\text{energy lost per cycle}}
$$

In practice, the definition you will use most is the one relating Q to bandwidth:

$$
Q = \frac{f_0}{BW}
$$

where $BW$ is the width between the −3 dB points. High Q means a narrow, sharp resonance; low Q means a broad, gentle one.

[[calc:q-bandwidth]]

## Q of the components

For a **series** RLC circuit, where R is the unwanted loss in the loop:

$$
Q = \frac{1}{R}\sqrt{\frac{L}{C}} = \frac{\omega_0 L}{R}
$$

For a **parallel** RLC, where R is the shunt loading:

$$
Q = R\sqrt{\frac{C}{L}} = \frac{R}{\omega_0 L}
$$

Note the inversion: in a series circuit, *more* resistance means lower Q; in a parallel circuit, more shunt resistance means *higher* Q. Both are saying the same thing — more loss means lower Q — but the resistance appears in different places.

## The inductor is almost always the limit

In any practical LC resonator, the capacitor's Q is high — several hundred to several thousand for a decent ceramic or film part. The inductor's Q is much lower, typically 50 to 200 for a wound component at RF, and it sets the resonator's unloaded Q almost single-handedly.

Inductor Q is limited by:

- **Winding resistance**, made worse at high frequency by the [skin effect](/wiki/skin-effect) and proximity effect.
- **Core loss** — hysteresis and eddy currents, both rising with frequency.
- **Self-capacitance**, which drags Q down as you approach self-resonance.

Q is also frequency-dependent, rising with frequency until losses catch up and then falling. A datasheet figure quoted at one frequency tells you little about behaviour two octaves away.

## Loaded versus unloaded Q

This distinction matters and is often glossed over.

**Unloaded Q** ($Q_U$) is the Q of the resonator by itself, set by its internal losses.

**Loaded Q** ($Q_L$) is what you get once the source and load are connected. External loading always adds damping, so $Q_L < Q_U$ always.

$$
\frac{1}{Q_L} = \frac{1}{Q_U} + \frac{1}{Q_{ext}}
$$

Loaded Q is what determines the bandwidth you actually measure. Unloaded Q determines the **insertion loss**: a filter built from resonators whose unloaded Q is not much higher than the required loaded Q will be lossy. As a rough guide, you want $Q_U$ at least ten times $Q_L$ for a filter with acceptable loss.

This is the fundamental constraint on narrow filters. A very narrow bandwidth requires a very high loaded Q, which requires an even higher unloaded Q, which lumped components cannot supply — hence crystal, ceramic, SAW and cavity resonators, whose unloaded Q runs from thousands to hundreds of thousands.

## Q in the time domain

Q also describes how long a resonator rings after excitation. The envelope decays as $e^{-\pi t / (Q T_0)}$, so the number of cycles to decay to a given fraction is proportional to Q.

A high-Q resonator rings for a long time. That is exactly what you want in an oscillator — it is why high-Q tanks give low phase noise — and exactly what you do not want in a circuit that must respond quickly to a change.

This is the same trade-off that appears everywhere in filtering: selectivity in frequency costs you response time. A narrow filter cannot settle quickly, because the two are the same property viewed from different domains.

## Damping in second-order systems

Control and filter theory usually speak of damping ratio $\zeta$ rather than Q. They are directly related:

$$
\zeta = \frac{1}{2Q}
$$

- $Q = 0.5$ ($\zeta = 1$): critically damped — fastest response without overshoot.
- $Q = 0.707$ ($\zeta = 0.707$): Butterworth, maximally flat frequency response.
- $Q > 0.707$: peaking in the frequency response and overshoot in the step response.
- $Q < 0.5$: overdamped, sluggish.
