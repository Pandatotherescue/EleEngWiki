---
title: Other Tactical & HF Manufacturers
category: equipment
group: Defence & tactical
summary: Codan, Barrett, Bittium, Elbit and the rest of the defence radio field — including the HF specialists that outlasted the technology's obituary.
tags: [codan, barrett, bittium, elbit, aselsan, kongsberg, leonardo, hensoldt, collins, general dynamics, HF, tactical]
order: 74
related: [rohde-schwarz, thales, l3harris, radio-manufacturers]
---

Beyond the three large manufacturers catalogued separately, the defence radio field divides into HF specialists, national champions and the big American primes.

## HF specialists

HF was declared obsolete repeatedly from the 1970s onward, on the reasonable grounds that satellites do the same job better. It survived because satellites can be denied, jammed or simply unavailable, and because HF needs no infrastructure at all — which is why two Australian companies have built durable businesses on it.

**Codan** — Adelaide, Australia. The **2110** manpack and its base and mobile variants are among the most widely fielded HF radios outside the major powers, sold extensively to militaries, aid organisations and mining operations. Codan also makes metal detectors, which is less incongruous than it sounds: both are low-frequency electromagnetics problems.

**Barrett Communications** — Perth, Australia. The 4000 series HF and 2000 series manpacks serve a similar market. Barrett tends to win where an open, interoperable system matters more than a national security relationship.

Both build to the same practical brief: an HF set that works with a wire antenna, an unskilled operator and no network, over thousands of kilometres. Automatic Link Establishment — the set sounding the band and choosing a frequency by itself — is what made that possible, and it is standard across both ranges.

## European national suppliers

| Manufacturer | Country | Known for |
| --- | --- | --- |
| Bittium | Finland | Tough SDR and Tactical Wireless IP Network; Finnish and Nordic forces |
| Kongsberg | Norway | Integrated comms, naval systems, remote weapon stations |
| Leonardo | Italy | SWave family of software-defined radios, naval and airborne |
| Hensoldt | Germany | Sensors and comms, spun out of Airbus Defence |
| Aselsan | Turkey | Full tactical range, extensively exported |
| Elbit / Tadiran | Israel | E-LynX family; very widely exported |
| Rohde & Schwarz | Germany | Covered on [its own page](/equipment/rohde-schwarz) |
| Thales | France | Covered on [its own page](/equipment/thales) |

The pattern here is national: most sizeable armed forces prefer a domestic supplier for tactical communications, because comms equipment carries cryptography and because dependence on a foreign supplier for the ability to talk to your own units is a strategic exposure. This is why the market is more fragmented than the underlying technology would suggest, and why so many broadly equivalent radios exist.

**Bittium** is worth a specific note for anyone interested in IP-over-radio. Its Tactical Wireless IP Network treats the radio network as an IP transport with mesh routing, rather than as a voice net that also carries some data — which is the direction the whole field has moved.

## American primes

**L3Harris** dominates and is covered [separately](/equipment/l3harris). Alongside it:

**General Dynamics Mission Systems** — built the AN/PRC-154 Rifleman Radio alongside Thales, and supplies the AN/PRC-155 two-channel manpack.

**Collins Aerospace** (RTX) — strongest in airborne radio and navigation. The ARC-210 family is the standard US airborne V/UHF radio, in roughly the position the AN/PRC-152 occupies on the ground.

**Datron** — smaller, export-focused, HF and VHF for military and government customers.

## Reading this market

Three things are worth keeping in mind when comparing across manufacturers.

**Waveforms matter more than hardware.** Two radios with identical RF specifications cannot talk to each other unless they share a waveform. SINCGARS, HAVE QUICK, SATURN, ESSOR, SRW and the various national wideband waveforms each define an interoperability boundary, and buying a radio is partly buying membership of one.

**Crypto determines who can buy what.** The same physical radio exists in multiple variants differing only in the embedded cryptography, and those variants are not interchangeable between customers.

**Fielded is not the same as current.** A radio family stays in service twenty to thirty years. Catalogues show what is being sold, not what is in use, and the gap between them is the normal state of affairs rather than an anomaly.
