---
title: L3Harris Radios
category: equipment
summary: The Falcon III and Falcon IV tactical radio families, the two parallel naming schemes, and what separates a manpack from an HCLOS link.
tags: [l3harris, harris, falcon, AN/PRC-152, AN/PRC-117G, AN/PRC-163, RF-7800, HCLOS, SINCGARS, tactical]
order: 74
related: [radio-manufacturers, thales, noise-figure, link-budget]
---

L3Harris has the largest tactical radio catalogue of the four and the most confusing naming. Two designation schemes run in parallel — **AN/PRC-xxx** military nomenclature and **RF-78xx / RF-79xx** company part numbers — and the same hardware sometimes appears under both. The `AN/PRC-171` and the `RF-9820S` are one radio.

The rule of thumb: a US military designation means the radio was procured under a US contract, and the company number is what the export variant carries.

Two generations are in circulation. **Falcon III** is the legacy line, still the backbone of many fleets. **Falcon IV** is current and multi-channel throughout.

## Falcon IV — current generation

| Model | Form factor | Coverage | Channels |
| --- | --- | --- | --- |
| AN/PRC-163 | Handheld | V/UHF, SATCOM | 2 channels, 200+ users |
| AN/PRC-158 | Manpack | 30–2500 MHz, SATCOM | 2 channels |
| AN/PRC-160(V) | Manpack | Wideband HF/VHF | wideband HF data |
| AN/PRC-167 | Manpack | V/UHF | multi-channel |
| AN/PRC-171 (RF-9820S) | Handheld | V/UHF | 1 channel |
| HAMR | Airborne | V/UHF | 2 channels, wideband |

The defining change from Falcon III is **multi-channel operation**. A single-channel radio can participate in one network at a time; a two-channel set can hold a local squad net and a higher-echelon or satellite link simultaneously, which removes the need to carry two radios.

**AN/PRC-158** covers 30–2500 MHz in one manpack, which is an unusually wide span — it reaches from VHF combat net radio up through MUOS satellite communication. Covering that much spectrum in one unit means several antenna ports and internal filtering, and is a large part of why such radios are heavy.

**AN/PRC-160(V)** is the interesting one technically. Conventional HF data runs at a few hundred bits per second in a 3 kHz channel; wideband HF uses a much wider channel to reach data rates that make HF viable as a backup to satellite rather than merely as a voice fallback. For units operating where satellite communication may be denied, that is a meaningful capability rather than a nostalgic one.

## Falcon III — handheld and manpack

| Model | Form factor | Note |
| --- | --- | --- |
| AN/PRC-117G(V)1(C) | Manpack, multiband | Wideband networking; the reference manpack of its generation |
| AN/PRC-152A | Handheld, multiband | UHF SATCOM plus narrowband |
| RF-7800H-MP | Manpack, wideband HF | HF data at then-unusual rates |
| RF-7800M-MP | Manpack, multiband | Export-oriented sibling of the 117G |
| RF-7800V-HH | Handheld | VHF combat net radio |
| RF-7850M-HH | Handheld, multiband | — |
| RF-7850S (SPR) | Soldier personal radio | Wideband and narrowband, multiple talk groups |

The **AN/PRC-117G** and **AN/PRC-152A** are fielded in very large numbers and are the radios most people picture when they think of a tactical manpack and handheld respectively. Both remain in widespread service despite Falcon IV being available; tactical radios are procured in fleets and replaced slowly.

Note the pattern of the `RF-7800M-MP` sitting alongside the `AN/PRC-117G`: broadly equivalent hardware, different designation, aimed at export customers.

## Vehicular and base station

| Model | Coverage | Note |
| --- | --- | --- |
| RF-7800V-V51X | 30–108 MHz | Combat net radio installation |
| RF-7850M-V51x | V/UHF | Multiband vehicular |
| RF-7850D | V/UHF | Multi-channel vehicular |
| RT-1523 | VHF | SINCGARS |
| RT-1702 | VHF | SINCGARS lineage |

**V51x** denotes the vehicular configuration — the handheld or manpack radio in a mount with a power amplifier and vehicle interfacing. The radio itself is often the same unit that would be carried dismounted, which simplifies logistics considerably.

**SINCGARS** — Single Channel Ground and Airborne Radio System — is the US frequency-hopping VHF combat net radio, in service since the 1980s. The `RT-1523` has gone through many variants and remains widely fielded, which is a useful reminder that a radio's absence from a marketing catalogue says nothing about whether it is still in use.

## Airborne, UAV and high-capacity line of sight

| Model | Role | Note |
| --- | --- | --- |
| RF-7850A-MR | Airborne, dual-channel | Rotary and fixed wing |
| RF-7850A-UA | Airborne, UAV | Wideband datalink |
| RF-7800W | HCLOS point-to-point | Backbone IP link |
| RF-7800W-RP50X | HCLOS repeater | Extends a backbone hop |
| RF-7850W | HCLOS point-to-point | — |
| RF-7800B | BGAN satellite terminal | Broadband satellite data |

**HCLOS** — High Capacity Line of Sight — radios are a different category from everything above. They are point-to-point microwave links carrying an IP backbone between fixed or semi-fixed sites, closer in role to a commercial microwave hop than to a combat net radio. They need line of sight and antenna alignment, and their planning is a [Fresnel zone](/wiki/fresnel-zones) and [link budget](/wiki/link-budget) exercise rather than a coverage one.

The repeater variant exists for the same reason repeaters exist anywhere: to get around terrain that blocks a single hop.

## Why receive performance matters more than power

Tactical radio marketing emphasises transmit power and waveforms, but for a handheld operating at 5 W the limiting factor is usually the receive side. A radio's [noise figure](/wiki/noise-figure) and its resistance to strong nearby signals determine whether it works in a crowded electromagnetic environment — and a vehicle or command post typically has several transmitters operating within metres of each other.

This is the reason multi-channel radios are harder to build than two single-channel ones in a bag: the two channels have to coexist without one desensitising the other, which requires real filtering and careful frequency planning inside the unit.
