---
title: Voltage Divider
category: fundamentals
summary: The most-used circuit in electronics, and the mistake almost everyone makes with it at least once.
tags: [divider, potential divider, attenuator, bias, reference, loading]
order: 4
related: [ohms-law, series-parallel-resistors, kirchhoffs-laws]
---

Two resistors in series across a voltage produce a fraction of that voltage at their junction:

$$
V_{out} = V_{in} \frac{R_2}{R_1 + R_2}
$$

where $R_2$ is the resistor between the output and ground. The ratio depends only on the resistors, not on the absolute values — 10 kΩ over 10 kΩ divides by two, and so does 10 Ω over 10 Ω.

[[calc:voltage-divider]]

## The loading problem

The formula above assumes nothing is connected to the output. The moment you attach a load, that load sits in parallel with $R_2$ and the output sags:

$$
V_{out} = V_{in} \frac{R_2 \parallel R_L}{R_1 + (R_2 \parallel R_L)}
$$

This is the single most common mistake made with dividers. A divider is **not a voltage source**. It has an output impedance of $R_1 \parallel R_2$, and it only behaves like a source for loads much larger than that.

The rule of thumb: keep the load at least 10× the divider's output impedance for roughly 10 % error, or 100× for 1 %. If you need a real 3.3 V rail, use a regulator, not a divider.

## Choosing the absolute values

Since only the ratio sets the output, what fixes the actual values?

**Lower values** mean stiffer output and less noise pickup, but more quiescent current wasted. A 1 kΩ / 1 kΩ divider across 12 V burns 6 mA continuously — unacceptable in a battery device, irrelevant in mains equipment.

**Higher values** save power but raise output impedance and make the node vulnerable. Above about 1 MΩ you start to see the effects of PCB surface leakage, humidity, and the input bias current of whatever you have connected.

For a typical microcontroller ADC input, 10 kΩ to 100 kΩ is the usual compromise. Check the ADC's required source impedance — many sample-and-hold inputs want to see under 10 kΩ to charge the sampling capacitor in time.

## Where dividers are used

**Scaling a voltage to fit an ADC.** Measuring a 24 V rail with a 3.3 V ADC needs roughly an 8:1 division. Add a capacitor across $R_2$ to filter noise and to provide charge for the sampling instant.

**Setting a bias point.** Transistor and op-amp circuits often need a DC reference somewhere between the rails. A divider with a decoupling capacitor to ground makes a cheap mid-rail.

**Feedback networks.** A switching or linear regulator compares a divided version of its output against an internal reference. The divider ratio is what sets the output voltage.

**Level shifting down.** Dropping a 5 V logic signal to 3.3 V works with a divider, but only for slow signals — the output impedance and the load capacitance form a low-pass filter that will round off fast edges. See [RC circuits](/wiki/rc-circuits).

## Practical cautions

**Tolerance stacks up.** Two 5 % resistors can shift the output by roughly ±5 % in the worst case. For anything that feeds a regulator's feedback pin, use 1 % parts.

**Temperature coefficient matters more than tolerance for drift.** If both resistors have the same tempco and sit at the same temperature, the ratio holds even as the values move. Mixing part types breaks that cancellation.

**Never divide a mains voltage without isolation.** A divider provides no galvanic isolation whatsoever. The low side is still electrically connected to the high side.

**Watch the power rating on the top resistor** in a high-voltage divider. It sees nearly the full voltage, and $V^2/R$ adds up fast.
