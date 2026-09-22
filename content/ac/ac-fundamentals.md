---
title: AC Fundamentals
category: ac
summary: RMS, peak and average values, why RMS is the one that matters, and how cheap meters get it wrong.
tags: [ac, rms, peak, peak-to-peak, average, crest factor, sine, waveform]
order: 20
related: [reactance-and-impedance, ac-power, decibels]
---

An alternating voltage has no single value — it changes continuously. So we describe it with several different figures, and the first source of confusion is which one a given number refers to.

[[calc:rms-peak]]

## The four ways to state an AC value

**Peak** is the maximum instantaneous excursion from zero.

**Peak-to-peak** is the full swing, from most negative to most positive. For a symmetrical waveform it is twice the peak. Oscilloscopes usually show this.

**Average** of a symmetrical AC waveform is zero, so what people mean is the **rectified average** — the mean of the absolute value.

**RMS** (root mean square) is the value that matters, because it is the DC voltage that would deliver the same power into a resistive load:

$$
V_{rms} = \sqrt{\frac{1}{T}\int_0^T v(t)^2 \, dt}
$$

For a sine wave this works out to a clean relationship:

$$
V_{rms} = \frac{V_{peak}}{\sqrt{2}} \approx 0.707 \, V_{peak}
$$

So a 230 V mains supply — 230 V RMS — peaks at about 325 V, and swings 650 V peak to peak. This is why a rectifier and smoothing capacitor across 230 V mains produces roughly 325 V DC, and why capacitors in such a supply need a 400 V rating.

## Waveform factors

The relationships above hold for sine waves only. Other shapes have their own factors:

| Waveform | RMS / peak | Average / peak | Crest factor |
| --- | --- | --- | --- |
| Sine | 0.707 | 0.637 | 1.414 |
| Square | 1.000 | 1.000 | 1.000 |
| Triangle / sawtooth | 0.577 | 0.500 | 1.732 |

**Crest factor** is peak divided by RMS. It matters because it tells you how much headroom a system needs beyond its RMS handling. A square wave has a crest factor of 1 — completely undemanding. Speech and music can exceed 4, and a narrow pulse train can reach 10 or more, which is why an amplifier rated for a given RMS power may still clip on programme material.

## How multimeters get this wrong

This is a genuinely common source of measurement error.

A **rectifying average-responding** meter — which covers most inexpensive multimeters — measures the rectified average and multiplies by 1.11, the ratio of RMS to average for a sine wave. On a clean sine it reads correctly. On anything else it is simply wrong:

- On a square wave it reads about 11 % high.
- On a triangle wave it reads about 4 % low.
- On the chopped waveform from a phase-controlled dimmer, or the current drawn by a switch-mode supply, it can be wildly off.

A **true RMS** meter computes the actual RMS and is correct for any waveform within its bandwidth and crest-factor specification. Both of those limits are real: a meter rated for a crest factor of 3 will under-read a spiky current waveform.

One more subtlety: most true-RMS meters are **AC-coupled**, so they report the RMS of the AC component only and ignore any DC offset. Where the total matters, you need $\sqrt{V_{DC}^2 + V_{AC,rms}^2}$.

## Frequency, period and phase

$$
f = \frac{1}{T} \qquad \omega = 2\pi f
$$

Angular frequency $\omega$ in radians per second is what appears in most of the maths, because the derivatives come out cleanly.

**Phase** describes the time offset between two waveforms of the same frequency, expressed as an angle. A quarter-cycle shift is 90°. In AC circuit analysis, phase is where all the interesting behaviour lives — it is what distinguishes a resistor from a capacitor, and what makes [power factor](/wiki/ac-power) a thing.

## Harmonics

A non-sinusoidal periodic waveform is a sum of sine waves at integer multiples of the fundamental. A square wave contains only odd harmonics, with amplitudes falling as $1/n$; a triangle wave also only odd, falling as $1/n^2$.

This matters practically. The harmonic content of a switching waveform is what radiates and couples into neighbouring circuits, and harmonic currents drawn by non-linear loads are what distribution networks have to cope with.
