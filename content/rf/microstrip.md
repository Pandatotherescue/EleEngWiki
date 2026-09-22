---
title: Microstrip & PCB Transmission Lines
category: rf
summary: Getting a controlled impedance out of a PCB trace, and the stackup details that decide whether you succeed.
tags: [microstrip, stripline, pcb, impedance, trace width, er, stackup, coplanar]
order: 45
related: [transmission-lines, pcb-traces, impedance-matching]
---

A trace above a ground plane is a transmission line. Its characteristic impedance is set by the trace width, the dielectric thickness beneath it, and the permittivity of that dielectric.

[[calc:microstrip]]

## Microstrip and its relatives

**Microstrip** is a trace on an outer layer with a ground plane below. The field is partly in the board and partly in the air above, which is why the effective permittivity sits between 1 and $\varepsilon_r$:

$$
\varepsilon_{eff} = \frac{\varepsilon_r + 1}{2} + \frac{\varepsilon_r - 1}{2}\left(1 + \frac{12h}{W}\right)^{-1/2}
$$

**Stripline** buries the trace between two ground planes. The field is entirely inside the dielectric, so $\varepsilon_{eff} = \varepsilon_r$, propagation is slower, and the structure radiates far less. Better electrically, more awkward to route and impossible to probe.

**Coplanar waveguide (CPW)** puts ground on the same layer either side of the trace. Impedance then depends on the gap as well as the width, which gives an extra design variable — useful when the dielectric is thick — and it suits surface-mount parts, since ground is right there. It needs regular stitching vias to keep the two ground strips at the same potential.

## FR-4 and its problems

FR-4 is cheap and ubiquitous, and imprecise in every way that matters for controlled impedance.

**εr is not a single number.** Quoted values range from 4.2 to 4.8, and the real value depends on resin content, which varies between prepreg types and between manufacturers.

**It is dispersive.** εr falls with frequency, typically from about 4.6 at 1 MHz to about 4.2 at 1 GHz. A design assuming a constant value will drift.

**The glass weave is not uniform.** FR-4 is woven glass in resin, and the two have very different permittivities. A trace running directly above a glass bundle sees a different εr from one running above a resin-rich gap. On differential pairs this causes **fibre weave skew**, a real problem above a few gigabits per second; routing at a slight angle to the weave is the usual mitigation.

**Loss tangent is high**, around 0.02. Beyond a few GHz the dielectric loss becomes the dominant cable-equivalent loss, which is why microwave work moves to PTFE-based or ceramic-filled laminates such as Rogers 4350B or 5880.

## What the fabricator controls

Your calculated trace width assumes a stackup you may not actually get.

**Dielectric thickness** varies with the prepreg used and how much resin flows out during lamination. Ask the fabricator for their stackup rather than assuming a nominal value.

**Etch factor.** Traces come out narrower at the top than the bottom, and narrower than drawn. Fabricators often compensate, but only if you tell them the trace is impedance-controlled.

**Copper plating** thickens outer layers beyond the nominal weight.

**Solder mask** covers the trace and raises the effective permittivity slightly, typically lowering impedance by 1–3 Ω on a 50 Ω line.

For anything that must hold tolerance, mark the traces as impedance-controlled on the fabrication drawing, state the target and tolerance, and let the fabricator adjust the width to suit their process. They measure it with a TDR on a test coupon.

## Practical rules

**The reference plane matters more than the trace.** Impedance is defined against a continuous ground plane directly beneath. A split or gap in that plane under a trace is a serious discontinuity — the return current has to detour around it, creating a loop that radiates and picks up noise.

**Return current follows the signal.** At RF it takes the path of least inductance, which is directly under the trace, not the geometrically shortest route. Keep the plane intact.

**Changing layers changes the reference.** A via that moves a signal from one side of a board to the other needs a nearby ground via so the return current can follow. Without it, the return current finds its own way and the discontinuity is large.

**Keep stubs short.** An unused via barrel, or a trace continuing past a component, is a stub that resonates at the frequency where it is a quarter wavelength.

**Bends** cause a small capacitive discontinuity. Mitre a 90° corner, or use two 45° bends, or a curve — at microwave frequencies this is standard practice.
