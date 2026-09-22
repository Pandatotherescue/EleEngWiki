---
title: LEDs & Current Limiting
category: fundamentals
summary: Why an LED needs a resistor, how to size it, and when a resistor is the wrong answer entirely.
tags: [led, forward voltage, current limiting, series resistor, constant current, indicator]
order: 10
related: [ohms-law, dc-power, resistor-values]
---

An LED is a diode, and a diode's current rises exponentially with voltage above its forward threshold. That exponential is the whole problem: a small increase in voltage produces a large increase in current, so an LED connected directly across a supply has no stable operating point. It draws whatever the source can deliver, heats up, draws more, and fails.

The fix is to add something that sets the current. Most often that is a resistor:

$$
R = \frac{V_{supply} - V_f}{I_f}
$$

[[calc:led-resistor]]

## Typical forward voltages

Forward voltage is set mostly by the semiconductor's bandgap, which is why it tracks colour:

| Colour | Typical $V_f$ |
| --- | --- |
| Infrared | 1.2 – 1.6 V |
| Red | 1.8 – 2.2 V |
| Amber / yellow | 2.0 – 2.2 V |
| Green (traditional) | 2.1 – 2.4 V |
| Green / blue / white (InGaN) | 3.0 – 3.4 V |
| Ultraviolet | 3.3 – 4.0 V |

These are approximate and vary with current, temperature and part-to-part spread. Always check the datasheet for anything beyond an indicator.

Two consequences follow. A white LED will not light at all from a single 3 V cell once the cell sags. And you cannot mix colours in a series string without thinking — the total forward voltage is the sum.

## Series or parallel?

**In series**, every LED carries the same current and brightness matches well. The supply must exceed the sum of the forward voltages plus enough headroom for the resistor to do its job — at least a volt or two, otherwise small supply variations cause large current swings.

**In parallel with one shared resistor** is a mistake. LEDs are not identical; the one with the lowest forward voltage takes a disproportionate share of the current, gets hotter, its $V_f$ falls further, and it takes even more. Each parallel branch needs its own resistor.

## Why the headroom matters

Consider a red LED ($V_f$ = 2 V) at 20 mA from a 5 V supply. The resistor drops 3 V, so $R$ = 150 Ω. If $V_f$ turns out to be 2.2 V instead, the resistor drops 2.8 V and the current falls to 18.7 mA — a 7 % change, invisible to the eye.

Now run the same LED from 2.5 V. The resistor drops 0.5 V, so $R$ = 25 Ω. The same 0.2 V shift in $V_f$ now leaves 0.3 V across the resistor and the current collapses to 12 mA — a 40 % change, very visible.

The rule: keep at least 20 % of the supply voltage across the resistor, and more if you care about consistency.

## When a resistor is the wrong answer

A series resistor wastes power as heat, proportional to the voltage it drops. For an indicator drawing a few milliamps that is irrelevant. For a **power LED** drawing hundreds of milliamps or more, it is unacceptable, and worse, the thermal feedback makes it unsafe: as the LED heats, $V_f$ falls, more voltage appears across the resistor, current rises, and the LED heats further.

Power LEDs need a **constant-current driver** — a switching regulator operating in current-control mode. These are cheap, efficient, and give you dimming via PWM.

## Practical notes

**Perceived brightness is not proportional to current.** The eye responds roughly logarithmically, so halving the current does not look half as bright. Many indicators run happily at 2–5 mA; modern high-efficiency LEDs are uncomfortably bright at the traditional 20 mA.

**Dim with PWM, not with current.** Reducing current shifts the dominant wavelength slightly, so a dimmed white LED changes colour temperature. PWM keeps the drive current constant and varies the duty cycle instead.

**LEDs have a low reverse breakdown voltage**, often only 5 V. In an AC or reversing circuit, add a reverse-parallel diode.

**Driving directly from a microcontroller pin** is fine at indicator currents, but check both the per-pin and total-package current limits. Lighting eight LEDs at 20 mA each from one port is 160 mA through a single ground pin.
