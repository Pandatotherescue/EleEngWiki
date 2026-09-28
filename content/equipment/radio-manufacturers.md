---
title: Professional Radio Manufacturers
category: equipment
summary: How to read the catalogues of the major defence and marine radio makers — designation systems, band conventions, and what actually distinguishes one model from another.
tags: [manufacturers, designations, AN/PRC, nomenclature, procurement, export control, catalogue]
order: 70
related: [rohde-schwarz, furuno-marine, thales, l3harris, cobham-satcom, lars-thrane]
---

Professional radio catalogues are harder to read than consumer ones. The same piece of hardware often carries three names, specifications are written for procurement rather than comparison, and the figure that actually determines whether you can buy a given unit — its cryptographic fit — is frequently not on the datasheet at all.

These pages catalogue four manufacturers: three from the defence world and one from civil marine.

| Manufacturer | Base | Domain | Naming convention |
| --- | --- | --- | --- |
| [Rohde & Schwarz](/equipment/rohde-schwarz) | Munich, Germany | Ground, naval, airborne SDR | Family + model (M3SR, XK4115A) |
| [Furuno](/equipment/furuno-marine) | Nishinomiya, Japan | Civil marine, GMDSS | Type letters + number (FM-8900S) |
| [Thales](/equipment/thales) | Paris, France | Land, naval, dismounted | TRC numbers and AN/PRC designations |
| [L3Harris](/equipment/l3harris) | Melbourne, Florida | Tactical, airborne, HCLOS | AN/PRC and RF-78xx in parallel |
| [Cobham SATCOM](/equipment/cobham-satcom) | Lyngby, Denmark | Maritime GMDSS and satellite | SAILOR / EXPLORER plus number |
| [Lars Thrane](/equipment/lars-thrane) | Lyngby, Denmark | Iridium satellite, GNSS, GMDSS | LT- plus number, S for GMDSS |

Three further pages survey the rest of the field: [other tactical and HF
manufacturers](/equipment/tactical-manufacturers), [other marine
manufacturers](/equipment/marine-manufacturers), and [land mobile and amateur
radio](/equipment/land-mobile-radio).

## Designation systems

### AN/PRC nomenclature

American military equipment uses the **Joint Electronics Type Designation System**, which is more readable than it looks. In `AN/PRC-152`:

- **AN** — Army-Navy, a historical prefix that now means nothing in particular
- **P** — portable, carried by one person
- **R** — radio
- **C** — communications, two-way voice
- **152** — the sequential model number

So `AN/VRC-` is vehicular, `AN/GRC-` is ground fixed, `AN/ARC-` is airborne. A suffix letter marks a revision: the `AN/PRC-152A` is a later build than the original.

This system tells you the platform and function, but nothing about frequency coverage, power, or waveforms — those have to come from the datasheet.

### Manufacturer part numbers

Alongside the military designation, manufacturers use their own numbering, and the two coexist for the same hardware. L3Harris is the worst offender: the `AN/PRC-171` and the `RF-9820S` are one radio, sold under different names to different customers. Export variants frequently carry only the company number, because they are not procured under a US military contract.

Rohde & Schwarz uses a family-plus-model scheme where the leading letters encode the role. In the M3SR Series4100, `EK` is a receiver, `XK` a medium-power transceiver, `GX` a high-power transceiver, `SK` a high-power transmitter.

### Marine type numbers

Furuno's scheme is the simplest of the four because the regulatory framework does the classifying. `FM-` is a VHF radiotelephone, `FS-` an MF/HF radiotelephone, `NX-` a NAVTEX receiver, `FELCOM` an Inmarsat terminal, `FA-` an AIS transponder. Which ones you need is set by [GMDSS sea area](/equipment/furuno-marine), not by preference.

## Reading frequency coverage

Coverage figures in this field are rarely a single continuous span. An airborne V/UHF radio quoted as "30 to 400 MHz" usually means three separate bands with deliberate gaps:

```
 30 –  88 MHz    VHF-low, combat net radio
108 – 174 MHz    VHF-high, includes civil air band
225 – 400 MHz    UHF, military air and satellite
```

The gaps are not limitations so much as deliberate exclusions — the 88–108 MHz broadcast band sits between the first two, and filtering it out keeps a powerful FM transmitter from desensitising the receiver.

[[calc:wavelength]]

## Power figures and how to compare them

Transmit power is quoted several ways, and mixing them up produces nonsense comparisons.

**PEP (peak envelope power)** is the standard for SSB HF transmitters, measured at the peak of the modulation envelope. **Average power** is considerably lower for voice SSB — often a fifth of PEP — but equal to PEP for a continuous carrier mode such as data. An HF transmitter rated "5 kW PEP/average" can run either.

**Carrier power** applies to AM and FM. For FM the carrier is continuous, so the transmitter runs at full output the whole time it keys.

A useful reference point: doubling transmit power buys 3 dB, which on a typical path is worth rather less than raising an antenna or improving its gain. See [link budget](/wiki/link-budget) for where power actually sits in the chain.

## What separates variants

For most of these families, the models within a series share RF hardware and differ in ways that do not appear as performance numbers:

- **Waveform fit.** Whether a set supports HAVE QUICK, SATURN, SINCGARS, or a national wideband waveform.
- **Cryptographic fit.** Type-1 protected equipment is restricted to specific nations; the export variant of the same radio carries different or no embedded crypto.
- **Form factor.** Airborne variants are defined by the tray they fit — ARINC600, or a direct ARC-164 replacement for retrofits.
- **Interface set.** Which data buses, remote-control protocols and IP stacks are fitted.

This is why three models in a series can share a single specification table. The R&S XT4410A, M and L are all 100 MHz–512 MHz at up to 100 W; they differ only by waveform and security fit.

## Export control

Almost everything on the defence side is export-controlled — **ITAR** for US-origin equipment, national and EU regimes for the European makers. In practice this means:

- Published specifications describe the exportable variant, which may be less capable than the domestic one.
- Availability depends on the buyer's nationality and end-use, not on the catalogue.
- Second-hand defence radios are frequently sold with the crypto module removed or disabled, which is what makes them legal to sell.

Furuno's marine equipment is the exception here. It is commercial, type-approved rather than export-controlled, and anyone can buy it.

## A caution on catalogues

Defence product pages are marketing material. They are accurate about what a radio does and vague about the numbers that would let you compare it against a competitor. For anything consequential, work from the datasheet, and expect the datasheet to describe a configuration rather than a fixed product.

Legacy families also stay in service for decades after they stop being marketed. A radio's absence from a current catalogue says nothing about whether it is still in the field — the SINCGARS lineage has been in service since the 1980s.
