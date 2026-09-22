---
title: EIRP & ERP
category: rf
summary: The number regulators care about — transmitter power, feedline loss and antenna gain combined into one figure.
tags: [eirp, erp, radiated power, regulatory, antenna gain, feedline loss, compliance]
order: 49
related: [antenna-gain, decibels, link-budget]
---

Transmitter output power on its own says little about how strong a signal will be at a distance. What matters is the power density in the direction of interest, and that depends on the transmitter, what the feedline loses, and how much the antenna concentrates what remains.

**EIRP** — equivalent isotropically radiated power — bundles all three into a single number: the power an isotropic radiator would need to produce the same field strength in the main beam.

$$
EIRP_{dBm} = P_{tx} - L_{feedline} + G_{antenna,dBi}
$$

[[calc:eirp]]

## EIRP versus ERP

**ERP** does the same job but references a half-wave dipole instead of an isotropic radiator. Since a dipole has 2.15 dBi of gain:

$$
ERP = EIRP - 2.15 \text{ dB}
$$

Which convention applies depends on the jurisdiction and the service. Broadcast regulations often use ERP; most modern short-range and Wi-Fi regulations use EIRP. Mixing them up is a 2.15 dB error — small, but enough to put a compliant design over a limit or a non-compliant one apparently under it.

## Why feedline loss is not wasted

A point that catches people out: since regulators cap **radiated** power, feedline loss gives you headroom.

If a limit is 20 dBm EIRP and your antenna has 6 dBi of gain, a lossless feedline means your transmitter may produce at most 14 dBm. Insert 2 dB of cable loss and the transmitter may produce 16 dBm — the same EIRP, and the same field strength at a distance.

So cable loss does not reduce your compliance headroom. It does reduce receive sensitivity, though, because on receive the loss sits in front of the first amplifier and adds directly to the system [noise figure](/wiki/noise-figure). A link is not symmetric in this respect.

## Typical regulatory limits

Indicative only — the actual limits depend on the exact band, the region, the modulation and the service. Always work from the current regulation.

| Band | Region | Typical limit |
| --- | --- | --- |
| 2.4 GHz Wi-Fi | EU | 20 dBm EIRP (100 mW) |
| 2.4 GHz Wi-Fi | US | 30 dBm conducted, with antenna gain rules |
| 5 GHz (5150–5350) | EU | 23 dBm EIRP, indoor, with DFS/TPC |
| 5 GHz (5470–5725) | EU | 30 dBm EIRP, with DFS/TPC |
| 868 MHz SRD | EU | 14 dBm ERP, duty cycle limited |
| 433 MHz SRD | EU | 10 dBm ERP |

Note the US and EU take structurally different approaches at 2.4 GHz. The EU caps EIRP outright. The US caps conducted power and then allows higher antenna gain under a point-to-point rule that trades conducted power against gain — so the achievable EIRP on a fixed link is considerably higher.

## Duty cycle and measurement bandwidth

Two details that trip up compliance testing.

Many sub-GHz allocations impose **duty cycle** limits — 1 % or 10 % per hour — independent of power. A device that transmits within the power limit can still fail on airtime.

And limits are often specified as power spectral density, in dBm per some reference bandwidth (100 kHz or 1 MHz are common). A wideband signal spreads its power out and may comfortably pass a PSD limit while a narrowband one at the same total power fails. This is part of why spread-spectrum techniques are favoured in shared bands.

## Practical notes

**The limit applies in the direction of maximum gain.** A high-gain antenna concentrates power, and that concentration counts against you even though the total radiated power has not changed.

**Antenna gain must be declared.** Equipment certified with a particular antenna is generally only compliant with that antenna, or one of equal or lesser gain of the same type. This is why many certified modules specify permitted antennas explicitly.

**RF exposure limits are separate.** High EIRP close to people triggers exposure assessment requirements, which depend on power density rather than EIRP alone and have their own distance-based calculations.
