---
title: Thales Radios
category: equipment
group: Defence & tactical
summary: Two parallel lineages — the French PR4G to SYNAPS line and the US AN/PRC-148 MBITR family — plus long-range HF and naval systems.
tags: [thales, PR4G, SYNAPS, MBITR, AN/PRC-148, TRC, CONTACT, HF XL, france, tactical]
order: 72
related: [radio-manufacturers, l3harris, rohde-schwarz, path-loss]
---

Thales is the most confusing of the four catalogues, because it is really two catalogues. The French line descends from Thomson-CSF and runs **PR4G → SYNAPS → CONTACT**, using TRC designations. The US line, through Thales Defense & Security in Maryland, builds the **AN/PRC-148** family for US forces under American nomenclature.

The two share a corporate parent and very little else. Availability differs sharply between them, and a product from one line is rarely a substitute for one from the other.

## Handheld — French line

| Model | Role | Coverage |
| --- | --- | --- |
| SYNAPS-H | Handheld SDR, mission-module gateway capable | V/UHF |
| Spear | Smallest handheld in the range, multi-waveform | 30–512 MHz |
| Javelin | Single-channel wideband MANET handheld | V/UHF |
| SquadNet | Squad radio with automatic relaying | UHF |

**SYNAPS** is the current software-defined family, developed under the French **CONTACT** programme — the national effort to replace PR4G across land, naval and air forces with one software-defined architecture. The handheld is one member; the family extends to vehicular and airborne variants.

**SquadNet** is worth singling out. Its design problem is not range in the free-space sense but range through terrain: it relays automatically through intermediate sets, so a section spread across broken ground stays connected without anyone managing a relay plan. That is a mesh-networking answer to a propagation problem — see [path loss](/wiki/path-loss) for why obstructed paths degrade so much faster than the free-space figure suggests.

**Spear** covers 30–512 MHz in the smallest package Thales offers, and its value is interoperability: it can talk to legacy narrowband sets that a modern wideband-only radio cannot.

## Handheld — US line

The **MBITR** lineage has been in US service since the early 2000s and has been re-spun repeatedly.

| Model | Also known as | Role |
| --- | --- | --- |
| AN/PRC-148 | MBITR | Multiband inter/intra team radio, the original |
| AN/PRC-148 JEM | — | JTRS Enhanced MBITR, adds JTRS-compliant waveforms |
| AN/PRC-148B | MBITR2 | Second generation, improved processing and crypto |
| AN/PRC-148D | IMBITR | Improved MBITR, 2-channel, narrowband and wideband |
| AN/PRC-154 | Rifleman Radio | Squad networking handheld, SRW waveform |

The AN/PRC-148 is one of the most widely fielded tactical handhelds ever built. **JTRS** — the Joint Tactical Radio System — was the US programme to standardise waveforms across services in software; it was largely restructured, but its waveforms and the "JEM" designation survive.

The **AN/PRC-154 Rifleman Radio** was produced by both Thales and General Dynamics under the same designation, which is an unusually direct illustration of the point that a military designation names a specification rather than a manufacturer's product.

**IMBITR** carries Type-1 protection, the US classification for equipment approved to handle classified traffic. That classification, more than any RF specification, is what determines which nations can buy a given variant.

## Manpack and vehicular

| Model | Also known as | Role |
| --- | --- | --- |
| PR4G | Fastnet TRC 9210 | Multi-role VHF SDR manpack |
| Fastnet HD | TRC 9215 | VHF IP SDR manpack, dismounted and vehicular |

**PR4G** has been the French Army's combat net radio since the 1990s and is one of the most widely exported tactical radios in the world. Its later software-defined incarnations keep the name while carrying TRC designations.

The **HD** in Fastnet HD is about data rate rather than video resolution — a higher-throughput IP variant for units that need to carry more than voice and position reports.

## Long range and line of sight

| Model | Role | Reach |
| --- | --- | --- |
| HF XL TRC 3900 | Cognitive HF, vehicle-mounted, IP backbone | ≤ 10 000 km, ≤ 150 kbps |
| HF TRC 3700 | Long-range HF radio station | ≤ 5 000 km |
| LOS TRC 4100 | Line-of-sight radio, stationary through on-the-move | ≤ 90 km |

**HF XL** is marketed as the first cognitive radio in this class. Conventional HF operation depends on a frequency plan and an operator's judgement about which band the ionosphere will support at a given hour. A cognitive set senses the spectrum continuously and selects frequencies itself, which turns HF from a skilled-operator technology into something closer to an automatic link.

The claimed 150 kbps over an HF channel is remarkable in context — traditional HF data rates are measured in hundreds of bits per second — and is achieved by using a much wider bandwidth than the classic 3 kHz SSB channel.

**LOS TRC 4100** is a different animal: a point-to-point microwave link, closer in role to a backbone hop than to a combat net radio.

## Naval

| Model | Role |
| --- | --- |
| Naval DRAKON | Shipborne communications suite |
| Naval HF series | Shipborne and fixed-station HF systems |

Thales supplies shipborne HF to the US Navy and Coast Guard, and integrated communications suites in Europe. As with the [R&S NAVICS](/equipment/rohde-schwarz) system, a naval "suite" is an integration layer over individual transceivers rather than a radio in itself — a distinction worth keeping straight when reading naval tenders, where the two are often procured separately.
