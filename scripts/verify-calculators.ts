/**
 * Numerical checks for the calculator library.
 *
 * Two jobs:
 *  1. Every mode of every calculator runs on its defaults without producing
 *     NaN, and every declared output key is actually returned.
 *  2. A set of hand-checked reference cases still give the expected answers.
 *
 * Run with: npx tsx scripts/verify-calculators.ts
 */
import { ALL_CALCULATORS, getCalculator } from '../calculators';
import { unitFactor } from '../lib/units';
import type { ComputeInput } from '../lib/calculator-types';

let failures = 0;
let checks = 0;

function fail(msg: string) {
  failures++;
  console.error(`  FAIL  ${msg}`);
}

function ok(msg: string) {
  checks++;
  console.log(`  ok    ${msg}`);
}

/** Build the compute input for a mode from its declared defaults. */
function defaultsFor(fields: any[]): ComputeInput {
  const v: ComputeInput = {};
  for (const f of fields) {
    if (f.kind === 'number') {
      const factor = unitFactor(f.quantity, f.defaultUnit ?? '');
      const useFactor = f.defaultUnit ? factor : 1;
      v[f.key] = f.default * useFactor;
    } else if (f.kind === 'list') {
      const factor = f.defaultUnit ? unitFactor(f.quantity, f.defaultUnit) : 1;
      v[f.key] = f.default.map((n: number) => n * factor).join(',');
    } else {
      v[f.key] = f.default;
    }
  }
  return v;
}

console.log('\n1. Smoke test — every mode on its defaults\n');

for (const calc of ALL_CALCULATORS) {
  for (const mode of calc.modes) {
    const label = `${calc.id}/${mode.id}`;
    let result: Record<string, unknown>;
    try {
      result = mode.compute(defaultsFor(mode.fields));
    } catch (e) {
      fail(`${label} threw: ${(e as Error).message}`);
      continue;
    }

    const problems: string[] = [];
    for (const out of mode.outputs) {
      if (!(out.key in result)) {
        problems.push(`missing output "${out.key}"`);
        continue;
      }
      const value = result[out.key];
      if (typeof value === 'number' && Number.isNaN(value)) {
        problems.push(`output "${out.key}" is NaN`);
      }
    }
    const extra = Object.keys(result).filter(
      (k) => !mode.outputs.some((o) => o.key === k)
    );
    if (extra.length) problems.push(`unused keys: ${extra.join(', ')}`);

    if (problems.length) fail(`${label}: ${problems.join('; ')}`);
    else ok(label);
  }
}

console.log('\n2. Reference cases\n');

type Case = {
  name: string;
  calc: string;
  mode?: string;
  input: ComputeInput;
  expect: Record<string, number>;
  /** Relative tolerance, default 0.5 %. */
  tol?: number;
};

const CASES: Case[] = [
  {
    name: "Ohm's law: 5 V across 220 Ω",
    calc: 'ohms-law',
    mode: 'current',
    input: { v: 5, r: 220 },
    expect: { i: 0.0227272, p: 0.113636 },
  },
  {
    name: 'Voltage divider: 12 V, 10k/4k7 unloaded',
    calc: 'voltage-divider',
    mode: 'unloaded',
    input: { vin: 12, r1: 10000, r2: 4700, rl: 0 },
    expect: { vout: 3.83673, zout: 3197.28 },
  },
  {
    name: 'Parallel resistors: 100 ∥ 220 ∥ 470',
    calc: 'resistor-network',
    input: { topology: 'parallel', r: '100,220,470', v: 5 },
    expect: { req: 59.97680 },
  },
  {
    name: 'RC time constant: 10k × 100n',
    calc: 'rc-time-constant',
    input: { r: 10000, c: 100e-9, pct: 90 },
    expect: { tau: 1e-3, t_pct: 2.302585e-3, fc: 159.1549 },
  },
  {
    name: 'Mains RMS 230 V sine → peak',
    calc: 'rms-peak',
    input: { wave: 'sine', known: 'rms', val: 230, r: 50 },
    expect: { peak: 325.269, pkpk: 650.538, crest: 1.414214 },
  },
  {
    name: 'Capacitive reactance: 100 nF at 1 kHz',
    calc: 'reactance',
    mode: 'capacitive',
    input: { f: 1000, c: 100e-9 },
    expect: { x: 1591.549 },
  },
  {
    name: 'LC resonance: 100 nH + 25 pF',
    calc: 'lc-resonance',
    mode: 'frequency',
    input: { l: 100e-9, c: 25e-12 },
    expect: { f0: 100.6584e6, z0: 63.2456 },
  },
  {
    name: 'RC low-pass: 1k + 100n, corner',
    calc: 'rc-filter',
    input: { kind: 'rc-lp', r: 1000, c: 100e-9, l: 0.01, f: 1591.549 },
    expect: { fc: 1591.549, gain_db: -3.0103, phase: -45 },
  },
  {
    name: '3 dB is a power ratio of 2',
    calc: 'db-converter',
    mode: 'db-to-ratio',
    input: { db: 3.0103 },
    expect: { power_ratio: 2, amp_ratio: 1.414214 },
  },
  {
    name: '1 W into 50 Ω is +30 dBm',
    calc: 'db-converter',
    mode: 'watts-to-dbm',
    input: { p: 1, z: 50 },
    expect: { dbm: 30, dbw: 0, vrms: 7.07107 },
  },
  {
    name: 'Three-phase: 400 V, 10 A, pf 0.85',
    calc: 'three-phase',
    input: { conn: 'star', vl: 400, il: 10, pf: 0.85 },
    expect: { p: 5888.97, s: 6928.20, vphase: 230.94 },
  },
  {
    name: 'VSWR 2:1',
    calc: 'vswr',
    mode: 'from-vswr',
    input: { vswr: 2 },
    expect: { gamma: 0.333333, rl: 9.542425, pref: 11.1111, ml: 0.511525 },
  },
  {
    name: '75 Ω load in a 50 Ω system',
    calc: 'vswr',
    mode: 'from-impedance',
    input: { z0: 50, rl: 75, xl: 0 },
    expect: { vswr: 1.5, gamma: 0.2, rl: 13.9794 },
  },
  {
    name: 'Wavelength at 145 MHz in free space',
    calc: 'wavelength',
    input: { f: 145e6, mode: 'vf', vf: 1, er: 1 },
    expect: { lambda: 2.067534, quarter: 0.516884 },
  },
  {
    name: 'FSPL: 10 km at 2.45 GHz',
    calc: 'fspl',
    input: { d: 10000, f: 2.45e9 },
    expect: { fspl: 120.2266 },
  },
  {
    name: 'Microstrip 50 Ω synthesis on 0.8 mm FR-4',
    calc: 'microstrip',
    mode: 'synthesis',
    input: { z0: 50, h: 0.0008, er: 4.4, f: 1e9 },
    // Published figures for this stackup sit in the 1.45-1.55 mm band depending
    // on the model and whether copper thickness is included. The check that
    // actually matters is that the synthesised width analyses back to 50 ohm.
    expect: { w: 0.0015295, z0_check: 50.0 },
    tol: 0.01,
  },
  {
    name: 'Cascaded NF: 1.2/3/8 dB with 15/12/20 dB gain',
    calc: 'noise-figure',
    input: { nf: '1.2,3,8', gain: '15,12,20', bw: 1e6 },
    expect: { nf_total: 1.33597, gain_total: 47, thermal: -113.9755 },
  },
  {
    name: 'Copper skin depth at 10 MHz',
    calc: 'skin-depth',
    input: { f: 10e6, material: '1.724e-8|1', d: 0.001, len: 1 },
    expect: { delta: 20.895e-6 },
  },
  {
    name: '6 dB attenuator in 50 Ω',
    calc: 'attenuator-pad',
    input: { a: 6, z0: 50, p: 1 },
    expect: { t_series: 16.6097, t_shunt: 66.9307, pi_shunt: 150.476, pi_series: 37.3495 },
  },
  {
    name: 'WR-90 waveguide TE10 cut-off',
    calc: 'waveguide',
    input: { a: 0.02286, b: 0.01016, er: 1, f: 10e9 },
    expect: { fc10: 6.5569e9, fc20: 13.1139e9 },
  },
  {
    name: 'L-match 50 Ω to 200 Ω at 14.2 MHz',
    calc: 'l-match',
    input: { rs: 50, rl: 200, f: 14.2e6 },
    expect: { q: 1.732051, xs: 86.6025, xp: 115.470, l_lp: 970.6e-9, c_lp: 97.03e-12 },
  },
  {
    name: 'EIRP: 30 dBm, 2 dB loss, 12 dBi',
    calc: 'eirp',
    input: { ptx: 30, loss: 2, gain: 12 },
    expect: { eirp_dbm: 40, eirp_w: 10, erp_dbm: 37.85 },
  },
  {
    name: 'Parabolic dish: 1.2 m at 10 GHz, 55 %',
    calc: 'parabolic-antenna',
    input: { d: 1.2, f: 10e9, eff: 55 },
    expect: { gain: 39.3899, hpbw: 1.74884 },
  },
  {
    name: 'Fresnel zone: 5.8 GHz, 3 km + 7 km',
    calc: 'fresnel-zone',
    input: { f: 5.8e9, d1: 3000, d2: 7000, n: 1 },
    expect: { r: 10.4159, r60: 6.24954 },
  },
  {
    name: 'AWG 18 copper diameter',
    calc: 'awg-wire',
    input: { awg: 18, material: 'cu', len: 10, i: 5, vsys: 12 },
    expect: { d: 1.02362e-3, rperkm: 20.9455 },
    tol: 0.01,
  },
  {
    name: 'Resistor colour code: brown-black-red-gold',
    calc: 'resistor-color-code',
    input: { bands: '4', b1: '1', b2: '0', b3: '0', mult: '2', tol: '5' },
    expect: { r: 1000, rmin: 950, rmax: 1050 },
  },
  {
    name: 'LED: 5 V supply, 2 V red LED at 20 mA',
    calc: 'led-resistor',
    input: { vs: 5, vf: 2, if: 0.02, n: 1 },
    expect: { r: 150 },
  },
  {
    name: 'Coax RG-58 geometry',
    calc: 'coax-impedance',
    input: { d_inner: 0.0009, d_outer: 0.00295, er: 2.25, len: 10 },
    expect: { z0: 47.4534, vf: 0.666667 },
  },
  {
    name: 'Transformer 230 V, 4:1 into 8 Ω',
    calc: 'transformer',
    input: { np: 100, ns: 25, vp: 230, zs: 8, eff: 95 },
    expect: { vs: 57.5, zp: 128, is: 7.1875, ps: 413.281 },
  },
  {
    name: 'Series RLC at 10 kHz',
    calc: 'series-rlc',
    input: { f: 10000, r: 10, l: 1e-3, c: 250e-9 },
    expect: { xl: 62.8319, xc: 63.6620, f0: 10065.8 },
  },
  {
    name: 'PCB trace: 2 A external, 10 K rise, 1 oz',
    calc: 'pcb-trace-width',
    input: { i: 2, layer: 'external', dt: 10, oz: 1, len: 0.05 },
    // A = (2 / (0.048 * 10^0.44))^(1/0.725) = 42.4 mil^2, over 1.378 mil of
    // copper = 30.8 mil = 0.781 mm.
    expect: { w_mm: 0.0007814, w_mil: 30.762 },
    tol: 0.01,
  },
  {
    name: 'Power factor correction 0.7 → 0.95, 5 kW at 230 V',
    calc: 'power-factor-correction',
    input: { phases: '1', p: 5000, v: 230, f: 50, pf1: 0.7, pf2: 0.95 },
    expect: { qc: 3458.13, c: 2.08051e-4 },
  },
  {
    name: 'Q and bandwidth of a parallel tank',
    calc: 'q-bandwidth',
    input: { topology: 'parallel', l: 100e-9, c: 25e-12, r: 5000 },
    expect: { q: 79.0569, f0: 100.6584e6, bw: 1.27317e6 },
  },
  {
    name: 'Link budget at 5 km, 2.45 GHz',
    calc: 'link-budget',
    input: {
      ptx: 20, gtx: 6, ltx: 1, grx: 6, lrx: 1,
      f: 2.45e9, d: 5000, lmisc: 3, sens: -90,
    },
    expect: { fspl: 114.2063, prx: -87.2063, margin: 2.79373 },
  },
];

for (const c of CASES) {
  const calc = getCalculator(c.calc);
  if (!calc) {
    fail(`${c.name}: no calculator "${c.calc}"`);
    continue;
  }
  const mode = c.mode ? calc.modes.find((m) => m.id === c.mode) : calc.modes[0];
  if (!mode) {
    fail(`${c.name}: no mode "${c.mode}" in "${c.calc}"`);
    continue;
  }

  let result: Record<string, unknown>;
  try {
    result = mode.compute(c.input);
  } catch (e) {
    fail(`${c.name}: threw ${(e as Error).message}`);
    continue;
  }

  const tol = c.tol ?? 0.005;
  const bad: string[] = [];
  for (const [key, expected] of Object.entries(c.expect)) {
    const actual = result[key];
    if (typeof actual !== 'number' || !isFinite(actual)) {
      bad.push(`${key}: got ${String(actual)}, expected ${expected}`);
      continue;
    }
    const denom = Math.abs(expected) > 1e-30 ? Math.abs(expected) : 1;
    const relative = Math.abs(actual - expected) / denom;
    if (relative > tol) {
      bad.push(
        `${key}: got ${actual.toPrecision(7)}, expected ${expected} ` +
          `(off by ${(relative * 100).toFixed(2)} %)`
      );
    }
  }

  if (bad.length) fail(`${c.name}\n        ${bad.join('\n        ')}`);
  else ok(c.name);
}

console.log(
  `\n${checks} passed, ${failures} failed, ` +
    `${ALL_CALCULATORS.length} calculators, ` +
    `${ALL_CALCULATORS.reduce((n, c) => n + c.modes.length, 0)} modes\n`
);

process.exit(failures > 0 ? 1 : 0);
