---
title: PCB Traces & Copper
category: fundamentals
summary: Sizing a trace for current, what copper weight really means, and when a trace stops being a wire and becomes a transmission line.
tags: [pcb, trace width, copper weight, IPC-2221, current capacity, layout, via]
order: 12
related: [wire-and-cable, dc-power, microstrip]
---

A PCB trace is a flat conductor, and everything true of [wire](/wiki/wire-and-cable) applies — but the geometry is different enough that the arithmetic deserves its own treatment.

[[calc:pcb-trace-width]]

## Copper weight

Board copper is specified by weight per unit area rather than thickness, a convention inherited from the rolling process.

| Copper weight | Thickness |
| --- | --- |
| 0.5 oz/ft² | 17.5 µm |
| 1 oz/ft² | 35 µm |
| 2 oz/ft² | 70 µm |
| 3 oz/ft² | 105 µm |

One ounce is the default for most commercial boards. Two ounce is common for power electronics. Beyond that, costs rise and the fabricator's minimum trace width and spacing grow, because thicker copper etches with more undercut.

Note that outer layers are usually **plated up** during through-hole plating, so a nominal 1 oz outer layer often finishes closer to 1.4 oz. Inner layers receive no plating and finish at the nominal weight.

## IPC-2221 and what it actually tells you

The standard curve for current capacity is:

$$
A = \left(\frac{I}{k \, \Delta T^{0.44}}\right)^{1/0.725}
$$

with $A$ in square mils, $\Delta T$ the allowed temperature rise in kelvin, and $k$ = 0.048 for external traces or 0.024 for internal ones. Internal traces get half the constant because they are surrounded by FR-4, which is a poor thermal conductor, rather than by air.

This is empirical, conservative, and derived from measurements on isolated traces in still air. Treat it as a starting point rather than a verdict:

- It does not account for nearby heat sources, or for a trace running alongside another carrying similar current.
- It does not account for copper pours, which spread heat substantially.
- It says nothing about voltage drop, which for a long trace is often the real limit.

## Voltage drop on a trace

Worth checking explicitly, because it is easy to underestimate. One ounce copper has a sheet resistance of about 0.5 mΩ per square. A trace 0.25 mm wide and 50 mm long is 200 squares, so roughly 100 mΩ. At 1 A that is 100 mV — potentially a serious error in an analogue reference path, and a tenth of a volt you cannot afford on a 3.3 V rail.

The "square" idea is the quick mental tool here: sheet resistance times length-over-width, regardless of absolute size.

## Vias

A via is a plated barrel, and its resistance depends on the plating thickness rather than the drill size. A typical 0.3 mm via with 25 µm of plating is around 1–2 mΩ — small, but not zero, and vias in a high-current path should be used in parallel.

Vias also matter thermally. Thermal vias under a power package conduct heat into inner planes, and a grid of them is far more effective than a couple.

In high-speed work, a via is a discontinuity: it adds inductance, and its unused barrel length forms a stub that resonates. Above a few gigabits per second, back-drilling or buried vias become necessary.

## When a trace becomes a transmission line

For DC and low-frequency signals, a trace is a resistor with some parasitic inductance. Above the point where the trace length approaches a tenth of the signal wavelength — or, for digital signals, where the round-trip propagation delay approaches the edge rate — it behaves as a [transmission line](/wiki/transmission-lines) with a characteristic impedance.

The practical trigger is the **edge rate**, not the clock frequency. A 10 MHz clock with 500 ps edges has significant energy past 700 MHz and will misbehave on an unterminated trace of any length.

Once you are in that regime, trace geometry sets impedance, and you size traces for a target impedance rather than for current. See [microstrip](/wiki/microstrip) for the calculation.

## Clearance and voltage

Trace spacing is governed by voltage, not current. IPC-2221 gives clearance tables that depend on the peak voltage and, critically, on the environment — bare board, conformally coated, or potted, and at what altitude. Mains-adjacent designs also need to meet creepage and clearance requirements from the relevant safety standard, which are considerably stricter than the bare electrical minimum.
