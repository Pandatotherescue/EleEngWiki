---
title: Kirchhoff's Laws
category: fundamentals
summary: The two conservation statements that let you analyse any circuit, including the ones that do not reduce to series and parallel.
tags: [kirchhoff, KCL, KVL, nodal analysis, mesh analysis, loop]
order: 5
related: [ohms-law, series-parallel-resistors, voltage-divider]
---

Ohm's law describes one component. Kirchhoff's laws describe how components constrain each other, and together they are enough to solve any lumped circuit.

## Current law (KCL)

**The sum of currents entering a node equals the sum leaving it.**

$$
\sum I_{in} = \sum I_{out}
$$

This is conservation of charge. Charge does not pile up at a junction, so whatever flows in must flow out. Sign conventions vary; the usual approach is to call currents into the node positive and set the total to zero.

## Voltage law (KVL)

**The sum of voltages around any closed loop is zero.**

$$
\sum V = 0
$$

This is conservation of energy. Carry a unit charge around a loop and return it to where it started, and it must have the same potential energy it began with — every rise is matched by an equal total of drops.

## Why you need them

Series and parallel reduction handles a surprising amount of circuit analysis, but it fails the moment a network is not built purely from those two patterns. The classic example is a **bridge**: four resistors in a diamond with a fifth across the middle. No two resistors in it are purely in series or purely in parallel.

Kirchhoff's laws do not care about topology. They give you a set of simultaneous equations, and solving them gives you every current and voltage in the circuit.

## Nodal analysis in practice

Nodal analysis is usually the most efficient hand method, and it is what SPICE does internally.

1. Pick a reference node and call it 0 V — normally the ground rail.
2. Label the unknown voltage at every other node.
3. Write KCL at each unknown node, expressing each branch current through Ohm's law as $(V_a - V_b)/R$.
4. Solve the resulting simultaneous equations.

For a circuit with $n$ nodes you get $n-1$ equations. A voltage source between two nodes constrains their difference directly, which removes an unknown — sometimes handled as a "supernode".

## Mesh analysis

The dual approach assigns a circulating current to each independent loop and applies KVL around each. It tends to be neater when a circuit has many voltage sources and few nodes; nodal analysis wins when there are many current sources and few nodes. For a planar circuit with $b$ branches and $n$ nodes there are $b - n + 1$ independent meshes.

## Worked intuition: the loaded divider

The [voltage divider](/wiki/voltage-divider) with a load is the simplest circuit where KCL earns its keep. At the output node, the current arriving through $R_1$ must equal the sum of the currents leaving through $R_2$ and through the load:

$$
\frac{V_{in} - V_{out}}{R_1} = \frac{V_{out}}{R_2} + \frac{V_{out}}{R_L}
$$

One equation, one unknown. Rearranging gives the loaded divider formula directly, without needing to think about parallel combinations at all.

[[calc:resistor-network]]

## Where the laws stop being exact

Kirchhoff's laws are the **lumped element approximation**. They assume:

- No charge accumulates anywhere except in components explicitly modelled as capacitors.
- No magnetic flux links the loops except through components explicitly modelled as inductors.
- Signals propagate instantly, so every point on a wire is at the same potential at the same moment.

That last assumption is the one that fails first. Once a circuit's physical size approaches a significant fraction of the signal wavelength — conventionally about a tenth — the wires become [transmission lines](/wiki/transmission-lines) and you need distributed analysis instead. At 50 Hz that threshold is hundreds of kilometres. At 2.4 GHz it is about 12 mm, which is why RF layout is its own discipline.
