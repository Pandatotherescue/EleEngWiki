---
title: Link Budget
category: rf
summary: Adding up every gain and loss between transmitter and receiver to find out whether a link will work.
tags: [link budget, margin, sensitivity, fade margin, range, system gain, planning]
order: 51
related: [path-loss, antenna-gain, noise-figure, eirp-and-erp]
---

A link budget is a column of additions. Start with transmit power, add every gain, subtract every loss, and compare the result against what the receiver needs. Because everything is in decibels, the arithmetic is trivial — the difficulty is in being honest about the numbers.

$$
P_{rx} = P_{tx} + G_{tx} - L_{tx} - FSPL - L_{misc} + G_{rx} - L_{rx}
$$

[[calc:link-budget]]

## Worked example

A 2.4 GHz point-to-point link over 5 km:

| Term | Value | Running total |
| --- | --- | --- |
| Transmit power | +20 dBm | 20.0 |
| Transmit cable and connectors | −1 dB | 19.0 |
| Transmit antenna gain | +18 dBi | 37.0 |
| **EIRP** | | **37.0 dBm** |
| Free-space path loss at 5 km | −114.0 dB | −77.0 |
| Miscellaneous losses | −3 dB | −80.0 |
| Receive antenna gain | +18 dBi | −62.0 |
| Receive cable and connectors | −1 dB | −63.0 |
| **Received power** | | **−63.0 dBm** |
| Receiver sensitivity | −90 dBm | |
| **Link margin** | | **27 dB** |

Twenty-seven decibels of margin is comfortable for a fixed link with clear line of sight.

## Where receiver sensitivity comes from

Sensitivity is not arbitrary — it follows from thermal noise:

$$
P_{sens} = -174\,\text{dBm/Hz} + 10\log_{10}(BW) + NF + SNR_{required}
$$

The −174 dBm/Hz is thermal noise density at 290 K. For a 1 MHz bandwidth that is −114 dBm; add a 6 dB [noise figure](/wiki/noise-figure) and a 10 dB required SNR and you get −98 dBm.

Two design levers fall straight out. **Narrower bandwidth improves sensitivity** — halving the bandwidth gains 3 dB, which is why low-data-rate links reach further. And **lower required SNR improves sensitivity**, which is what modern forward error correction buys you, and why adaptive modulation drops to a more robust scheme as conditions worsen.

## How much margin?

| Link type | Typical margin |
| --- | --- |
| Fixed point-to-point, clear LOS | 10–20 dB |
| Fixed link with rain fade (>10 GHz) | 20–40 dB |
| Mobile, urban | 20–30 dB |
| Indoor, moving | 20–30 dB |
| Satellite | 3–10 dB (carefully engineered) |

Margin covers what the budget cannot predict: multipath fading, weather, antenna misalignment, ageing connectors, and the interferer that moves in next door.

Satellite links get away with less margin because every term is characterised precisely and the path is stable — and because margin there is extraordinarily expensive in launch mass.

## Terms people forget

**Polarisation mismatch.** Misaligned linear polarisation costs real dB, and cross-polarisation costs 20 dB or more. Circular to linear is a fixed 3 dB.

**Pointing error.** A narrow beam means small misalignments cost a lot. A 1.7° beam misaligned by 1° loses several dB.

**Radome and enclosure loss.** A plastic housing is not free, especially when wet.

**Connector and adapter losses.** Each one is a few tenths of a dB; a stack of adapters adds up.

**Implementation loss.** Real receivers do not achieve their theoretical sensitivity. Datasheet figures are measured under ideal conditions.

**Interference.** The budget assumes a thermal-noise-limited receiver. In a crowded band the actual noise floor may be far higher, and no amount of transmit power fixes a shared-channel problem.

## Reciprocity and asymmetry

The propagation path is reciprocal — path loss is the same in both directions. The **link** usually is not.

Transmit powers differ between ends, receiver noise figures differ, and antenna gains may differ. A base station with a sensitive receiver and a high-gain antenna can hear a handset that cannot hear it back, or vice versa. Always compute both directions; the weaker one determines the usable range.
