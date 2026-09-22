---
title: Decibels
category: ac
summary: Why 10log and 20log are both correct, what dBm actually references, and the handful of values worth memorising.
tags: [db, decibel, dbm, dbw, dbi, gain, loss, logarithmic, ratio]
order: 26
related: [ac-fundamentals, link-budget, noise-figure, eirp-and-erp]
---

The decibel is a logarithmic ratio. It exists because the quantities in electronics and acoustics span enormous ranges, and because cascaded gains and losses become simple addition once you take logarithms.

For **power** ratios:

$$
dB = 10 \log_{10}\frac{P_2}{P_1}
$$

For **voltage** or current ratios, in a system where the impedance is the same at both points:

$$
dB = 20 \log_{10}\frac{V_2}{V_1}
$$

[[calc:db-converter]]

## Why there are two formulas

There is only one definition — the power one. The factor of 20 appears because power is proportional to the square of voltage, and squaring inside a logarithm becomes a factor of two outside it:

$$
10\log_{10}\frac{V_2^2/R}{V_1^2/R} = 20 \log_{10}\frac{V_2}{V_1}
$$

So both are correct, applied to their own quantity. The trap is comparing voltages across *different* impedances and using 20 log — that gives a voltage ratio in dB, but it is not the power ratio, and calling it "gain" without qualification will mislead someone.

## Values worth knowing by heart

| dB | Power ratio | Voltage ratio |
| --- | --- | --- |
| 0 | 1 | 1 |
| 1 | 1.26 | 1.12 |
| 3 | 2 | 1.41 |
| 6 | 4 | 2 |
| 10 | 10 | 3.16 |
| 20 | 100 | 10 |
| 30 | 1 000 | 31.6 |
| 40 | 10 000 | 100 |
| 60 | 10⁶ | 1 000 |

With three of these you can do most mental arithmetic, because dB add: 3 dB doubles power, 10 dB multiplies it by ten, and 20 dB by a hundred. So 23 dB is ×200, and 37 dB is 40 − 3, so ×5000.

Negative dB is the reciprocal: −3 dB is half the power, −20 dB is one hundredth.

## Absolute levels: the suffix matters

Plain dB is always a ratio between two things. Add a suffix and it becomes an absolute level referenced to a defined quantity:

| Unit | Reference | Notes |
| --- | --- | --- |
| dBm | 1 mW | The RF standard. 0 dBm = 1 mW. |
| dBW | 1 W | 0 dBW = 30 dBm. |
| dBµV | 1 µV | EMC measurements. |
| dBFS | Digital full scale | Always negative in practice. |
| dBi | Isotropic radiator | Antenna gain. |
| dBd | Half-wave dipole | dBi = dBd + 2.15. |
| dBc | The carrier | Spurious and phase-noise levels. |

A useful anchor: **0 dBm into 50 Ω is 223 mV RMS**, or 632 mV peak-to-peak. And +30 dBm is 1 W.

## Adding levels versus adding ratios

Cascading a chain is simple — gains and losses in dB add:

`−10 dBm source → +20 dB amp → −3 dB filter → +13 dB gain → +20 dBm output`

This is the entire reason RF engineering is conducted in dB. A [link budget](/wiki/link-budget) is a column of additions.

But **combining two signals is not addition in dB**. Two uncorrelated signals of equal power sum to 3 dB more, not double the dB value. Two *coherent* signals of equal amplitude in phase sum to 6 dB more, since voltages add and power goes as the square. To combine levels properly, convert to linear, add, convert back.

## Common errors

**Mixing up dB and dBm.** "The amplifier output is 20 dB" is meaningless. Gain is in dB; output level is in dBm.

**Using 20 log for a power ratio.** This doubles your answer and is the single most frequent decibel mistake.

**Treating dBi and dBd as interchangeable.** They differ by 2.15 dB, which is not negligible in a link budget or a regulatory submission.

**Averaging dB values.** The mean of −10 dBm and −30 dBm is not −20 dBm. Convert to linear power first: 100 µW and 1 µW average to 50.5 µW, which is −13 dBm.
