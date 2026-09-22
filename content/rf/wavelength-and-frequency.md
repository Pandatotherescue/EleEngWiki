---
title: Wavelength & Frequency
category: rf
summary: Converting between frequency and wavelength, what velocity factor does to it, and the band names you will keep meeting.
tags: [wavelength, frequency, lambda, velocity factor, bands, propagation, spectrum]
order: 39
related: [transmission-lines, antenna-fundamentals, coaxial-cable]
---

Frequency and wavelength are two descriptions of the same wave, tied together by its propagation speed:

$$
\lambda = \frac{v}{f}
$$

In free space $v = c = 299\,792\,458$ m/s, which gives the convenient approximation:

$$
\lambda \,[\text{m}] \approx \frac{300}{f\,[\text{MHz}]}
$$

[[calc:wavelength]]

## Why wavelength is the useful unit

Frequency tells you about the signal. Wavelength tells you about the **hardware**, because every physical structure behaves according to its size relative to λ.

- An antenna resonates when it is a specific fraction of a wavelength.
- A wire behaves as a lumped conductor below about λ/10 and as a [transmission line](/wiki/transmission-lines) above it.
- An aperture in a shield leaks badly once it approaches λ/2.
- A PCB trace becomes a distributed structure at a length that depends entirely on λ.

Structures scale with wavelength, which is why a design that works at 145 MHz can often be scaled directly to 435 MHz by dividing every dimension by three.

## In a medium

Inside a dielectric, waves travel more slowly and wavelength shrinks by the same factor:

$$
\lambda = \frac{c}{f\sqrt{\varepsilon_r}} = \frac{v_f \cdot c}{f}
$$

This has a practical consequence that surprises newcomers: a quarter-wave section of coax with a velocity factor of 0.66 is only two thirds the length you would calculate in free space. Cut a matching stub from the free-space figure and it will be a third too long.

**Velocity factor** and permittivity are two ways of saying the same thing, $v_f = 1/\sqrt{\varepsilon_r}$, and different sources quote different ones.

## The spectrum

| Band | Frequency | Wavelength | Typical use |
| --- | --- | --- | --- |
| VLF | 3–30 kHz | 100–10 km | Submarine communication |
| LF | 30–300 kHz | 10–1 km | Time signals, navigation |
| MF | 300 kHz–3 MHz | 1000–100 m | AM broadcast |
| HF | 3–30 MHz | 100–10 m | Long-distance skywave |
| VHF | 30–300 MHz | 10–1 m | FM broadcast, air band, 2 m amateur |
| UHF | 300 MHz–3 GHz | 1 m–10 cm | TV, mobile, Wi-Fi 2.4 GHz |
| SHF | 3–30 GHz | 10–1 cm | Wi-Fi 5/6 GHz, satellite, radar |
| EHF | 30–300 GHz | 10–1 mm | mmWave 5G, automotive radar |

The microwave letter bands overlap with these and are used more in radar and satellite work: L (1–2 GHz), S (2–4), C (4–8), X (8–12), Ku (12–18), K (18–27), Ka (27–40).

The letter bands exist because they were wartime code designations that simply stuck. They are not perfectly standardised between IEEE, NATO and ITU conventions, so where precision matters, state the frequency.

## How behaviour changes across the spectrum

The physics does not change, but which effects dominate does, and this is really what distinguishes the bands.

**HF and below** — waves diffract around terrain and refract off the ionosphere, giving over-the-horizon propagation. Antennas are physically enormous, so compromise and loading are the norm.

**VHF and UHF** — essentially line of sight with useful diffraction around obstacles. Antennas become conveniently sized. This is the sweet spot for mobile communication.

**SHF** — strongly line of sight. Rain begins to attenuate meaningfully above about 10 GHz. [Fresnel zone](/wiki/fresnel-zones) clearance becomes a design concern, and high-gain dishes become practical because they can be small.

**EHF** — heavy atmospheric absorption, particularly the oxygen line near 60 GHz. Range is short, but bandwidth is abundant and antennas can be tiny, so arrays and beam steering become standard.

## Quick conversions worth memorising

- 300 MHz → 1 m
- 1 GHz → 30 cm
- 2.45 GHz → 12.2 cm (quarter wave 3.1 cm)
- 5.8 GHz → 5.2 cm
- 145 MHz → 2.07 m (quarter wave 51.7 cm)
- 435 MHz → 69 cm (quarter wave 17.2 cm)
