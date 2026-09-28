---
title: Furuno Marine Radio
category: equipment
summary: Furuno's GMDSS product line, and how the equipment list follows directly from which sea areas a vessel operates in.
tags: [furuno, GMDSS, marine, VHF, MF/HF, NAVTEX, inmarsat, AIS, EPIRB, SOLAS, sea areas]
order: 72
related: [radio-manufacturers, vswr-and-return-loss, antenna-fundamentals, link-budget]
---

Furuno is the odd one out among the four manufacturers catalogued here: civil marine rather than defence. That changes how the catalogue reads. There are no waveform options or cryptographic variants — instead the product line maps directly onto an international regulatory framework, and what a vessel must carry is determined by where it sails.

## GMDSS and sea areas

The **Global Maritime Distress and Safety System** divides the world's waters into four areas by which communications infrastructure reaches them. The area a vessel operates in sets its required equipment.

| Area | Definition | Primary distress equipment |
| --- | --- | --- |
| A1 | Within range of a shore VHF station with DSC, roughly 20–30 nmi | VHF with DSC |
| A2 | Within range of a shore MF station with DSC, roughly 100–150 nmi | VHF + MF |
| A3 | Within Inmarsat geostationary coverage, roughly 76°N to 76°S | VHF + MF/HF or satellite |
| A4 | Everything else — essentially the polar regions | VHF + MF/HF |

Note that A4 requires HF specifically, because geostationary satellites sit over the equator and are below the horizon at high latitudes. This is the one case where the older technology is the only one that works.

A full SOLAS installation is typically an FM-8900S for VHF, an FS-series MF/HF set, NAVTEX, an Inmarsat terminal and an EPIRB, racked together in an RC-2024 console.

## Radiotelephones

| Model | Role | Output |
| --- | --- | --- |
| FM-8900S | VHF radiotelephone, DSC Class A, channel 70 watch receiver | 25 W |
| FS-1575 | MF/HF radiotelephone with DSC | 150 W |
| FS-2575 | MF/HF radiotelephone with DSC | 250 W |
| HT-649 | Portable GMDSS VHF transceiver, survival craft | handheld |
| RC-2024 | Pre-wired GMDSS radio rack console | — |

**Digital Selective Calling** is what separates a GMDSS radio from a recreational one. Channel 70 is reserved for DSC data and carries no voice; a dedicated watch receiver monitors it continuously. A distress alert sent on channel 70 carries the vessel's MMSI identity and position automatically, and the receiving station then switches to channel 16 for voice.

That automatic position depends on a GPS feed. A DSC radio with no position input sends a distress alert with no position in it, which is a substantially worse alert.

The **HT-649** exists because SOLAS requires portable VHF sets to be carried for survival craft — a radio that works after the vessel is abandoned.

## Maritime safety information

| Model | Role |
| --- | --- |
| NX-700A | NAVTEX receiver with printer |
| NX-700B | NAVTEX receiver, LCD only |
| NX-900 | NAVTEX receiver |

NAVTEX broadcasts navigational warnings, weather and search-and-rescue information on **518 kHz** for the international English service, with 490 kHz used for national-language broadcasts and 4209.5 kHz in some regions.

It is a one-way narrow-band direct-printing service, and deliberately unglamorous: a low data rate on a low frequency, which is exactly what gives it reliable ground-wave coverage out to a few hundred miles regardless of satellite availability.

## Satellite

| Model | Role |
| --- | --- |
| FELCOM18 | Inmarsat-C mobile earth station with EGC receiver |
| FELCOM19 | Inmarsat mini-C mobile earth station |
| FELCOM20 | Inmarsat-C, SSAS and LRIT capable |
| FELCOM251 / FELCOM501 | Inmarsat FleetBroadband terminal |

**Inmarsat-C** is a store-and-forward data service, not a voice one. It is slow by any modern standard and remains in the GMDSS framework because it is robust and its coverage is well characterised. **EGC** — Enhanced Group Call — is the broadcast side, carrying SafetyNET distress and weather traffic.

**SSAS** is the Ship Security Alert System, a covert alarm required since 2004. **LRIT** is Long Range Identification and Tracking, a mandatory position report. Both ride on the same terminal.

**FleetBroadband** is the IP service — genuine broadband for ship operations and crew, on a different footing from the safety equipment above.

## AIS and beacons

| Model | Role | Output |
| --- | --- | --- |
| FA-170 | Class A AIS transponder | 12.5 W |
| Tron 60AIS | Float-free EPIRB with AIS locating | 5 W at 406 MHz |
| Tron AIS-SART | AIS search and rescue transmitter | 1 W |

**Class A AIS** is mandatory for SOLAS vessels. It transmits at 12.5 W using SOTDMA, which reserves transmission slots rather than contending for them, so reporting stays reliable in crowded waters. Class B, fitted to leisure craft, transmits at 2 W or 5 W and yields to Class A traffic.

An **EPIRB** transmits on 406 MHz to the Cospas-Sarsat satellite constellation, with a 121.5 MHz homing signal. Float-free mounting means it releases and activates by hydrostatic pressure if the vessel sinks, without anyone having to act. Adding AIS locating to the beacon lets nearby vessels home in directly rather than waiting for the satellite alert to propagate through a rescue coordination centre.

An **AIS-SART** is the modern replacement for the radar SART. Rather than painting a distinctive pattern on a radar screen, it transmits an AIS position that appears on any AIS display within VHF range.

## Range, in practice

Marine VHF is line-of-sight, so range is set by antenna height far more than by power. The radio horizon in nautical miles is roughly $2.2\sqrt{h}$ with $h$ in metres, and the useful distance is the sum of both stations' horizons.

A masthead antenna 20 m up sees about 10 nmi of horizon; a coast station 100 m up sees about 22 nmi. Between them, roughly 32 nmi — which is why the A1 sea area is defined at 20–30 nmi.

Going from 25 W to 50 W would add 3 dB. Raising the antenna is almost always the better investment, which is the same lesson as in any terrestrial [link budget](/wiki/link-budget).

[[calc:link-budget]]
