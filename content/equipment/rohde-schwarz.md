---
title: Rohde & Schwarz Radios
category: equipment
summary: The M3SR software-defined radio family — HF, V/UHF and airborne — plus the naval systems that tie them together.
tags: [rohde schwarz, M3SR, M3AR, software defined radio, SDR, HF, VHF, UHF, naval, germany]
order: 71
related: [radio-manufacturers, thales, l3harris, wavelength-and-frequency]
---

Rohde & Schwarz is better known for test and measurement equipment, but its defence arm builds one of the more complete software-defined radio portfolios in Europe. The catalogue is unusually easy to navigate because it splits cleanly by band and platform rather than by customer or programme.

The **M3SR** family covers ground and naval installations, divided into Series4100 for HF and Series4400 for V/UHF. **M3AR** is the airborne line. A typical ground station or ship pairs a Series4100 HF set with several Series4400 V/UHF sets in the same rack.

## M3SR Series4100 — HF

Transmit 1.5–30 MHz, receive from 10 kHz. The series scales further than most: from a receive-only unit up to a 10 kW transmitter, with the same control interface and waveform set throughout.

| Model | Role | Output |
| --- | --- | --- |
| R&S EK4100A | Receiver only | RX 10 kHz – 30 MHz |
| R&S EK4100D | Receiver only, digital variant | RX 10 kHz – 30 MHz |
| R&S XK4115A | Transceiver | 150 W PEP |
| R&S XK4115D | Transceiver, digital variant | 150 W PEP |
| R&S GX4100A | Transceiver, high power | 500 W / 1 kW PEP |
| R&S GX4100D | Transceiver, high power | 500 W / 1 kW PEP |
| R&S GV4190D | Transceiver, high power | 500 W / 1 kW PEP |
| R&S SK4105 | High-power transmitter | 5 kW PEP / average |
| R&S SK4110 | High-power transmitter | 10 kW PEP / average |

The leading letters encode the role: **EK** receiver, **XK** medium-power transceiver, **GX** and **GV** high-power transceiver, **SK** high-power transmitter. An `A` or `D` suffix marks the analogue-interface or digital-interface variant.

Note that the 5 kW and 10 kW units are rated *PEP and average* — they will run a continuous data carrier at the full figure, not just SSB voice peaks. That matters for anything other than voice.

## M3SR Series4400 — V/UHF

100–512 MHz, up to 100 W, for stationary and shipborne use. The three models are RF-identical; they differ entirely in waveform and security fit.

| Model | Distinguishing fit |
| --- | --- |
| R&S XT4410A | Air traffic control per EUROCAE; STANAG 4205, STANAG 5511 |
| R&S XT4410M | Adds STANAG 4372 — HAVE QUICK frequency hopping |
| R&S XT4410L | Adds R&S SECOS 5/16 TDMA |

This is a good illustration of the point made on the [manufacturers page](/equipment/radio-manufacturers): the specification table cannot tell these apart. STANAG 5511 is the Link 11 tactical data link; STANAG 4372 is HAVE QUICK, the NATO anti-jam hopping scheme for UHF air-ground communication.

The 100–512 MHz span covers civil VHF air band, military UHF air band and land tactical VHF in one radio, which is why these sets appear in air traffic control and joint-service ground stations alike.

## M3AR — airborne V/UHF

30–88, 108–174 and 225–400 MHz, in three disjoint bands. All three models cover the same frequencies; the difference is the tray they fit and the power that follows from it.

| Model | Form factor | Output |
| --- | --- | --- |
| R&S MR6000A | ARINC600 | AM ≥ 20 W · FM/MSK ≥ 30 W |
| R&S MR6000L | ARC-164 replacement | AM ≥ 10 W · FM/MSK ≥ 15 W |
| R&S MR6000R | ARC-164 replacement | AM ≥ 10 W · FM/MSK ≥ 15 W |

The **ARC-164** variants exist for retrofit. The AN/ARC-164 has been the standard US military UHF airborne radio since the 1970s, and thousands of aircraft have a tray sized for it. Building a modern SDR into that exact envelope means an upgrade without touching the airframe.

Options across the family include HAVE QUICK I/II, SATURN — the faster NATO successor to HAVE QUICK — and R&S SECOS encryption.

Rohde & Schwarz supplies these for the German Navy's NH90 helicopters among other platforms.

## Newer and adjacent

Named for completeness. Confirm specifications against a current datasheet before relying on them.

| Family | Role |
| --- | --- |
| R&S SDAR | Software defined airborne radio; successor generation to M3AR |
| R&S SDTR | Software defined tactical radio, land |
| R&S NAVICS | IP-based naval integrated communications system |

**NAVICS** is not a radio. It is the shipboard backbone that ties radios, intercom and telephony onto one IP network, with the individual transceivers as attached resources. Understanding that distinction matters when reading naval tenders, where the integrated system and the radios in it are often procured separately.

## Where this fits

The Series4100 HF sets are the ones worth understanding first if you come from an amateur or marine background — they are recognisably HF SSB transceivers, scaled up and with automatic link establishment and hopping added. The jump from a 150 W XK4115 to a 10 kW SK4110 is about reliable long-range circuits under poor ionospheric conditions rather than about raw reach; see [path loss](/wiki/path-loss) for why the last few decibels cost so much.
