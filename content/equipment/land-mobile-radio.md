---
title: Land Mobile & Amateur Radio
category: equipment
group: Land mobile & amateur
summary: Motorola, Hytera, Tait and the professional mobile radio field, plus the amateur manufacturers — and why DMR and TETRA split the world in two.
tags: [motorola, hytera, tait, sepura, DMR, TETRA, P25, icom, yaesu, kenwood, amateur, PMR, land mobile]
order: 79
related: [radio-manufacturers, marine-manufacturers, tactical-manufacturers]
---

Between the defence and marine worlds sits **professional mobile radio** — the equipment used by police, fire services, utilities, airports, railways and site operations. It is the largest radio market by unit volume and the least discussed, because it works quietly and is rarely bought by individuals.

## The digital standards split

Almost everything in this field is defined by which digital standard a network uses, and the standards do not interoperate.

| Standard | Origin | Typical users |
| --- | --- | --- |
| **TETRA** | ETSI, Europe | European emergency services, transport, utilities |
| **P25** | APCO, United States | US public safety |
| **DMR** | ETSI, open | Commercial, industrial, smaller agencies worldwide |
| **dPMR** | ETSI | Lighter commercial use |
| **NXDN** | Icom / Kenwood | Commercial, narrowband |

**TETRA** is a trunked system with dedicated infrastructure, encryption and direct-mode fallback, built for agencies that need guaranteed access under load. **P25** solves the same problem for the US market with a different architecture. **DMR** is the pragmatic middle: a two-slot TDMA standard that doubles capacity on an existing 12.5 kHz channel, cheap enough for a haulage yard and capable enough for a small city.

That trunked behaviour is the real distinction from a simple repeater. A trunked system assigns a channel from a pool for the duration of a call, so a hundred talkgroups can share a dozen channels — a statistical multiplexing argument identical to the one behind packet switching.

## Manufacturers

**Motorola Solutions** — dominant in public safety, particularly P25 in the US and TETRA in Europe. Acquired Yaesu's parent and now owns Vertex Standard; also owns Avigilon and other adjacent businesses. In practice it is closer to a public-safety systems integrator than a radio manufacturer.

**Hytera** — Chinese, and the main global challenger on price. Has been the subject of extended litigation with Motorola over trade secrets, which has restricted its access to some markets.

**Tait Communications** — New Zealand. Strong in utilities and transport, with a reputation for durability and for supporting equipment long after sale.

**Sepura** — UK, TETRA specialist, widely used by European emergency services. Now part of the Chinese Hytera group, which has complicated its position in some public-safety procurements.

**Airbus** — supplies TETRA and Tetrapol infrastructure and terminals, principally to European national networks.

**Icom** and **Kenwood** — both cover commercial land mobile alongside their marine and amateur ranges, and jointly developed NXDN.

## Amateur radio

The amateur market is served by a small group of Japanese manufacturers plus a few specialists, and it matters technically out of proportion to its size: amateur equipment is where a lot of RF engineering is first encountered, and the same companies supply the marine and commercial markets.

| Manufacturer | Notes |
| --- | --- |
| **Icom** | Broadest range; the IC-7300 made direct-sampling SDR mainstream at consumer prices |
| **Yaesu** | Long-standing rival; FT and FTDX series. Parent company owned by Motorola Solutions |
| **Kenwood** | Smaller amateur presence now, strong commercial land mobile |
| **Elecraft** | US, kit and high-performance HF, strong receiver performance |
| **FlexRadio** | US, direct-sampling SDR operated through a computer or a matched console |

The **direct-sampling** shift is the significant technical development. A traditional superheterodyne receiver converts the incoming signal down through one or more intermediate frequencies using analogue mixers and filters. A direct-sampling receiver digitises the antenna signal immediately and does everything in software.

That removes whole categories of problem — image frequencies, LO leakage, filter alignment — and makes the filter bandwidth a software parameter rather than a crystal you had to buy. It also moves the performance limit to the ADC: its sample rate sets the bandwidth, and its dynamic range determines whether a strong nearby station desensitises the receiver. That trade, analogue selectivity versus converter dynamic range, is now the central design question in receiver architecture.

## Why this field is worth knowing about

Professional mobile radio is where most of the practical work in RF engineering happens by volume — coverage planning, antenna siting, repeater networks, interference resolution. It uses the same [link budget](/wiki/link-budget), [path loss](/wiki/path-loss) and [antenna](/wiki/antenna-fundamentals) arithmetic as every other part of this wiki, applied to a problem where the answer is measured in whether a firefighter inside a building can be heard.
