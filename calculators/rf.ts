import { single, num, str, list, type CalculatorDef } from '@/lib/calculator-types';
import { C0, MU0, K_BOLTZMANN, T0_NOISE } from '@/lib/units';

export const wavelength = single({
  id: 'wavelength',
  title: 'Wavelength & Frequency',
  category: 'rf',
  summary:
    'Convert frequency to wavelength in free space or in a medium, with the half- and quarter-wave lengths you actually cut hardware to.',
  tags: ['wavelength', 'frequency', 'lambda', 'velocity factor', 'quarter wave'],
  formula: '\\lambda = \\dfrac{c}{f\\sqrt{\\varepsilon_r}} = \\dfrac{v_f \\cdot c}{f}',
  fields: [
    { kind: 'number', key: 'f', label: 'Frequency', quantity: 'frequency', default: 145, defaultUnit: 'MHz' },
    {
      kind: 'select',
      key: 'mode',
      label: 'Medium given as',
      options: [
        { value: 'vf', label: 'Velocity factor' },
        { value: 'er', label: 'Relative permittivity εr' },
      ],
      default: 'vf',
    },
    {
      kind: 'number',
      key: 'vf',
      label: 'Velocity factor',
      quantity: 'ratio',
      default: 1,
      help: '1.0 in free space, ≈0.66 for solid PE coax, ≈0.95 for bare wire.',
    },
    { kind: 'number', key: 'er', label: 'Relative permittivity εr', quantity: 'ratio', default: 2.25 },
  ],
  outputs: [
    { key: 'lambda', label: 'Wavelength λ', quantity: 'length', primary: true },
    { key: 'half', label: 'Half wave (λ/2)', quantity: 'length' },
    { key: 'quarter', label: 'Quarter wave (λ/4)', quantity: 'length' },
    { key: 'eighth', label: 'Eighth wave (λ/8)', quantity: 'length' },
    { key: 'period', label: 'Period', quantity: 'time' },
    { key: 'v', label: 'Propagation velocity', quantity: 'velocity' },
  ],
  compute: (v) => {
    const f = num(v, 'f');
    const vf = str(v, 'mode') === 'er' ? 1 / Math.sqrt(num(v, 'er')) : num(v, 'vf');
    const velocity = C0 * vf;
    const lambda = velocity / f;
    return {
      lambda,
      half: lambda / 2,
      quarter: lambda / 4,
      eighth: lambda / 8,
      period: 1 / f,
      v: velocity,
    };
  },
  assumptions: [
    'Velocity factor and εr are related by vf = 1/√εr for a uniform dielectric.',
    'A real antenna element is a few percent shorter than the free-space figure because of end effects and conductor thickness.',
  ],
});

export const vswr: CalculatorDef = {
  id: 'vswr',
  title: 'VSWR, Return Loss & Reflection',
  category: 'rf',
  summary:
    'Convert freely between VSWR, reflection coefficient, return loss and mismatch loss — or work them out from a load impedance.',
  tags: ['vswr', 'swr', 'return loss', 'reflection coefficient', 'gamma', 'mismatch', 'match'],
  modes: [
    {
      id: 'from-vswr',
      label: 'From VSWR',
      formula: '\\Gamma = \\dfrac{VSWR - 1}{VSWR + 1}',
      fields: [{ kind: 'number', key: 'vswr', label: 'VSWR (n:1)', quantity: 'ratio', default: 2, min: 1 }],
      outputs: vswrOutputs(),
      compute: (v) => {
        const s = Math.max(num(v, 'vswr'), 1);
        return fromGamma((s - 1) / (s + 1));
      },
    },
    {
      id: 'from-rl',
      label: 'From return loss',
      formula: 'RL = -20\\log_{10}|\\Gamma|',
      fields: [
        {
          kind: 'number',
          key: 'rl',
          label: 'Return loss',
          quantity: 'decibel',
          default: 14,
          help: 'Enter as a positive number of dB.',
        },
      ],
      outputs: vswrOutputs(),
      compute: (v) => fromGamma(Math.pow(10, -Math.abs(num(v, 'rl')) / 20)),
    },
    {
      id: 'from-gamma',
      label: 'From reflection coefficient',
      formula: '|\\Gamma| = \\dfrac{V_{refl}}{V_{fwd}}',
      fields: [
        { kind: 'number', key: 'g', label: 'Magnitude of Γ', quantity: 'ratio', default: 0.333, min: 0, max: 1 },
      ],
      outputs: vswrOutputs(),
      compute: (v) => fromGamma(Math.min(Math.abs(num(v, 'g')), 0.999999)),
    },
    {
      id: 'from-impedance',
      label: 'From load impedance',
      formula: '\\Gamma = \\dfrac{Z_L - Z_0}{Z_L + Z_0}',
      fields: [
        { kind: 'number', key: 'z0', label: 'System impedance Z₀', quantity: 'resistance', default: 50 },
        { kind: 'number', key: 'rl', label: 'Load resistance', quantity: 'resistance', default: 75 },
        {
          kind: 'number',
          key: 'xl',
          label: 'Load reactance',
          quantity: 'resistance',
          default: 0,
          help: 'Positive for inductive, negative for capacitive.',
        },
      ],
      outputs: [
        ...vswrOutputs(),
        { key: 'gphase', label: 'Phase of Γ', quantity: 'angle' },
      ],
      compute: (v) => {
        const z0 = num(v, 'z0');
        const r = num(v, 'rl');
        const x = num(v, 'xl');
        // Γ = (R + jX - Z0) / (R + jX + Z0)
        const nRe = r - z0;
        const nIm = x;
        const dRe = r + z0;
        const dIm = x;
        const den = dRe * dRe + dIm * dIm;
        const gRe = (nRe * dRe + nIm * dIm) / den;
        const gIm = (nIm * dRe - nRe * dIm) / den;
        const mag = Math.hypot(gRe, gIm);
        return {
          ...fromGamma(Math.min(mag, 0.999999)),
          gphase: (Math.atan2(gIm, gRe) * 180) / Math.PI,
        };
      },
    },
  ],
  assumptions: [
    'Assumes a lossless, uniform transmission line. Real cable loss makes the VSWR measured at the input look better than the VSWR at the antenna.',
    'Mismatch loss is the power not accepted by the load; it is not the same as the extra loss caused by standing waves in a lossy line.',
  ],
};

function vswrOutputs() {
  return [
    { key: 'vswr', label: 'VSWR', quantity: 'ratio' as const, primary: true },
    { key: 'gamma', label: 'Reflection coefficient |Γ|', quantity: 'ratio' as const },
    { key: 'rl', label: 'Return loss', quantity: 'decibel' as const },
    { key: 'ml', label: 'Mismatch loss', quantity: 'decibel' as const },
    { key: 'pref', label: 'Power reflected', quantity: 'percent' as const },
    { key: 'ptrans', label: 'Power delivered', quantity: 'percent' as const },
  ];
}

function fromGamma(g: number) {
  const vswrValue = (1 + g) / (1 - g);
  return {
    vswr: vswrValue,
    gamma: g,
    rl: g > 0 ? -20 * Math.log10(g) : Infinity,
    ml: -10 * Math.log10(1 - g * g),
    pref: g * g * 100,
    ptrans: (1 - g * g) * 100,
  };
}

export const microstrip: CalculatorDef = {
  id: 'microstrip',
  title: 'Microstrip Impedance',
  category: 'rf',
  summary:
    'Characteristic impedance of a microstrip trace from its geometry, or the trace width needed to hit a target impedance.',
  tags: ['microstrip', 'pcb', 'impedance', 'trace width', 'z0', '50 ohm', 'hammerstad'],
  modes: [
    {
      id: 'analysis',
      label: 'Geometry → impedance',
      formula:
        'Z_0 = \\dfrac{120\\pi}{\\sqrt{\\varepsilon_{eff}}\\left[\\frac{W}{h} + 1.393 + 0.667\\ln\\!\\left(\\frac{W}{h}+1.444\\right)\\right]}',
      fields: [
        { kind: 'number', key: 'w', label: 'Trace width W', quantity: 'length', default: 1.4, defaultUnit: 'mm' },
        { kind: 'number', key: 'h', label: 'Dielectric height h', quantity: 'length', default: 0.8, defaultUnit: 'mm' },
        {
          kind: 'number',
          key: 'er',
          label: 'Relative permittivity εr',
          quantity: 'ratio',
          default: 4.4,
          help: 'FR-4 ≈ 4.2–4.6, Rogers 4350B ≈ 3.48, PTFE ≈ 2.2.',
        },
        { kind: 'number', key: 'f', label: 'Frequency', quantity: 'frequency', default: 1, defaultUnit: 'GHz' },
        {
          kind: 'number',
          key: 'len',
          label: 'Trace length',
          quantity: 'length',
          default: 25,
          defaultUnit: 'mm',
          help: 'Used for the electrical length.',
        },
      ],
      outputs: [
        { key: 'z0', label: 'Characteristic impedance Z₀', quantity: 'resistance', primary: true },
        { key: 'eeff', label: 'Effective permittivity εeff', quantity: 'ratio' },
        { key: 'lambda_g', label: 'Guided wavelength λg', quantity: 'length' },
        { key: 'quarter', label: 'Quarter-wave length', quantity: 'length' },
        { key: 'elen', label: 'Electrical length of trace', quantity: 'angle' },
        { key: 'delay', label: 'Propagation delay of trace', quantity: 'time' },
        { key: 'wh', label: 'W/h ratio', quantity: 'ratio' },
      ],
      compute: (v) => {
        const w = num(v, 'w');
        const h = num(v, 'h');
        const er = num(v, 'er');
        const f = num(v, 'f');
        const len = num(v, 'len');
        const { z0, eeff } = microstripZ0(w, h, er);
        const lambdaG = C0 / (f * Math.sqrt(eeff));
        return {
          z0,
          eeff,
          lambda_g: lambdaG,
          quarter: lambdaG / 4,
          elen: (len / lambdaG) * 360,
          delay: (len * Math.sqrt(eeff)) / C0,
          wh: w / h,
        };
      },
    },
    {
      id: 'synthesis',
      label: 'Impedance → width',
      formula: '\\text{Wheeler synthesis for } W/h',
      fields: [
        { kind: 'number', key: 'z0', label: 'Target impedance', quantity: 'resistance', default: 50 },
        { kind: 'number', key: 'h', label: 'Dielectric height h', quantity: 'length', default: 0.8, defaultUnit: 'mm' },
        { kind: 'number', key: 'er', label: 'Relative permittivity εr', quantity: 'ratio', default: 4.4 },
        { kind: 'number', key: 'f', label: 'Frequency', quantity: 'frequency', default: 1, defaultUnit: 'GHz' },
      ],
      outputs: [
        { key: 'w', label: 'Trace width required', quantity: 'length', primary: true },
        { key: 'wh', label: 'W/h ratio', quantity: 'ratio' },
        { key: 'z0_check', label: 'Impedance of that width', quantity: 'resistance', note: 'analysis check' },
        { key: 'eeff', label: 'Effective permittivity εeff', quantity: 'ratio' },
        { key: 'lambda_g', label: 'Guided wavelength λg', quantity: 'length' },
        { key: 'quarter', label: 'Quarter-wave length', quantity: 'length' },
      ],
      compute: (v) => {
        const z0 = num(v, 'z0');
        const h = num(v, 'h');
        const er = num(v, 'er');
        const f = num(v, 'f');
        const wh = microstripWidthRatio(z0, er);
        const w = wh * h;
        const check = microstripZ0(w, h, er);
        const lambdaG = C0 / (f * Math.sqrt(check.eeff));
        return {
          w,
          wh,
          z0_check: check.z0,
          eeff: check.eeff,
          lambda_g: lambdaG,
          quarter: lambdaG / 4,
        };
      },
    },
  ],
  assumptions: [
    'Hammerstad–Wheeler closed-form model: zero conductor thickness, non-dispersive dielectric, infinite ground plane.',
    'Typically within a few percent below about 10 GHz. For controlled impedance in production, confirm with a field solver and your fabricator’s stackup.',
    'εr of FR-4 varies with resin content, glass weave and frequency — treat 4.4 as a placeholder, not a specification.',
  ],
};

/** Hammerstad analysis: microstrip Z0 and effective permittivity. */
export function microstripZ0(w: number, h: number, er: number): { z0: number; eeff: number } {
  const u = w / h;
  let eeff: number;
  if (u < 1) {
    eeff =
      (er + 1) / 2 +
      ((er - 1) / 2) * (Math.pow(1 + 12 / u, -0.5) + 0.04 * Math.pow(1 - u, 2));
  } else {
    eeff = (er + 1) / 2 + ((er - 1) / 2) * Math.pow(1 + 12 / u, -0.5);
  }
  const z0 =
    u <= 1
      ? (60 / Math.sqrt(eeff)) * Math.log(8 / u + u / 4)
      : (120 * Math.PI) /
        (Math.sqrt(eeff) * (u + 1.393 + 0.667 * Math.log(u + 1.444)));
  return { z0, eeff };
}

/** Wheeler synthesis: W/h for a target Z0. */
export function microstripWidthRatio(z0: number, er: number): number {
  const A =
    (z0 / 60) * Math.sqrt((er + 1) / 2) +
    ((er - 1) / (er + 1)) * (0.23 + 0.11 / er);
  const B = (377 * Math.PI) / (2 * z0 * Math.sqrt(er));
  const whNarrow = (8 * Math.exp(A)) / (Math.exp(2 * A) - 2);
  if (whNarrow < 2) return whNarrow;
  return (
    (2 / Math.PI) *
    (B -
      1 -
      Math.log(2 * B - 1) +
      ((er - 1) / (2 * er)) * (Math.log(B - 1) + 0.39 - 0.61 / er))
  );
}

export const coax = single({
  id: 'coax-impedance',
  title: 'Coaxial Cable Impedance',
  category: 'rf',
  summary:
    'Characteristic impedance, velocity factor and per-metre L and C of a coaxial line from its dimensions, plus the frequency at which it stops being single-mode.',
  tags: ['coax', 'coaxial', 'impedance', 'z0', 'velocity factor', 'transmission line'],
  formula: 'Z_0 = \\dfrac{138}{\\sqrt{\\varepsilon_r}}\\log_{10}\\dfrac{D}{d}',
  fields: [
    {
      kind: 'number',
      key: 'd_inner',
      label: 'Inner conductor diameter d',
      quantity: 'length',
      default: 0.9,
      defaultUnit: 'mm',
    },
    {
      kind: 'number',
      key: 'd_outer',
      label: 'Shield inner diameter D',
      quantity: 'length',
      default: 2.95,
      defaultUnit: 'mm',
    },
    {
      kind: 'number',
      key: 'er',
      label: 'Dielectric εr',
      quantity: 'ratio',
      default: 2.25,
      help: 'Solid PE 2.25, foam PE ≈ 1.5, PTFE 2.1, air 1.0.',
    },
    { kind: 'number', key: 'len', label: 'Cable length', quantity: 'length', default: 10 },
  ],
  outputs: [
    { key: 'z0', label: 'Characteristic impedance', quantity: 'resistance', primary: true },
    { key: 'vf', label: 'Velocity factor', quantity: 'ratio' },
    { key: 'cperm', label: 'Capacitance per metre', quantity: 'ratio', unitLabel: 'pF/m' },
    { key: 'lperm', label: 'Inductance per metre', quantity: 'ratio', unitLabel: 'nH/m' },
    { key: 'delay', label: 'Delay over length', quantity: 'time' },
    { key: 'fmax', label: 'Highest single-mode frequency', quantity: 'frequency', note: 'TE₁₁ cut-off' },
  ],
  compute: (v) => {
    const d = num(v, 'd_inner');
    const D = num(v, 'd_outer');
    const er = num(v, 'er');
    const len = num(v, 'len');
    if (!(D > d) || d <= 0) {
      return { z0: null, vf: null, cperm: null, lperm: null, delay: null, fmax: null };
    }
    const ratio = Math.log(D / d);
    const z0 = (59.9585 / Math.sqrt(er)) * ratio;
    const vf = 1 / Math.sqrt(er);
    const cPerM = (2 * Math.PI * 8.8541878128e-12 * er) / ratio;
    const lPerM = (MU0 / (2 * Math.PI)) * ratio;
    return {
      z0,
      vf,
      cperm: cPerM * 1e12,
      lperm: lPerM * 1e9,
      delay: len / (C0 * vf),
      fmax: (2 * C0) / (Math.PI * (D + d) * Math.sqrt(er)),
    };
  },
  assumptions: [
    'Ideal concentric geometry with a homogeneous dielectric; braid and foil shields behave slightly differently.',
    'Above the TE₁₁ cut-off the cable supports a higher-order mode and stops behaving as a clean transmission line.',
    'Does not model loss — conductor and dielectric loss both rise with frequency.',
  ],
});

export const lMatch = single({
  id: 'l-match',
  title: 'L-Network Matching',
  category: 'rf',
  summary:
    'Two-component L-network to match one resistance to another, given in both low-pass and high-pass form.',
  tags: ['matching', 'l network', 'impedance matching', 'tuner', 'q factor'],
  formula: 'Q = \\sqrt{\\dfrac{R_{high}}{R_{low}} - 1}',
  fields: [
    { kind: 'number', key: 'rs', label: 'Source resistance', quantity: 'resistance', default: 50 },
    { kind: 'number', key: 'rl', label: 'Load resistance', quantity: 'resistance', default: 200 },
    { kind: 'number', key: 'f', label: 'Frequency', quantity: 'frequency', default: 14.2, defaultUnit: 'MHz' },
  ],
  outputs: [
    { key: 'q', label: 'Network Q', quantity: 'ratio', primary: true },
    { key: 'bw', label: 'Approximate bandwidth', quantity: 'frequency' },
    { key: 'xs', label: 'Series reactance |Xs|', quantity: 'resistance' },
    { key: 'xp', label: 'Shunt reactance |Xp|', quantity: 'resistance' },
    { key: 'l_lp', label: 'Low-pass: series L', quantity: 'inductance' },
    { key: 'c_lp', label: 'Low-pass: shunt C', quantity: 'capacitance' },
    { key: 'c_hp', label: 'High-pass: series C', quantity: 'capacitance' },
    { key: 'l_hp', label: 'High-pass: shunt L', quantity: 'inductance' },
  ],
  compute: (v) => {
    const rs = num(v, 'rs');
    const rl = num(v, 'rl');
    const f = num(v, 'f');
    const rHigh = Math.max(rs, rl);
    const rLow = Math.min(rs, rl);
    if (!(rHigh > rLow) || rLow <= 0) {
      return { q: null, bw: null, xs: null, xp: null, l_lp: null, c_lp: null, c_hp: null, l_hp: null };
    }
    const q = Math.sqrt(rHigh / rLow - 1);
    const xs = q * rLow; // series element, on the low-resistance side
    const xp = rHigh / q; // shunt element, across the high-resistance side
    const w = 2 * Math.PI * f;
    return {
      q,
      bw: f / q,
      xs,
      xp,
      l_lp: xs / w,
      c_lp: 1 / (w * xp),
      c_hp: 1 / (w * xs),
      l_hp: xp / w,
    };
  },
  assumptions: [
    'The shunt element goes across the higher resistance, the series element towards the lower one.',
    'Both resistances are assumed purely real. Cancel any load reactance first, or absorb it into the network.',
    'An L-network has no free choice of Q — the ratio of the two resistances fixes it. Use a Pi or T network if you need to set Q independently.',
  ],
});

export const fspl = single({
  id: 'fspl',
  title: 'Free-Space Path Loss',
  category: 'rf',
  summary:
    'Loss between two isotropic antennas in free space, the single biggest term in most link budgets.',
  tags: ['fspl', 'path loss', 'propagation', 'link', 'friis', 'range'],
  formula: 'FSPL_{dB} = 20\\log_{10}(d) + 20\\log_{10}(f) + 20\\log_{10}\\!\\left(\\dfrac{4\\pi}{c}\\right)',
  fields: [
    { kind: 'number', key: 'd', label: 'Distance', quantity: 'length', default: 10, defaultUnit: 'km' },
    { kind: 'number', key: 'f', label: 'Frequency', quantity: 'frequency', default: 2.45, defaultUnit: 'GHz' },
  ],
  outputs: [
    { key: 'fspl', label: 'Free-space path loss', quantity: 'decibel', primary: true },
    { key: 'lambda', label: 'Wavelength', quantity: 'length' },
    { key: 'ratio', label: 'Power fraction received by an isotropic antenna', quantity: 'ratio' },
    { key: 'delay', label: 'Propagation delay', quantity: 'time' },
  ],
  compute: (v) => {
    const d = num(v, 'd');
    const f = num(v, 'f');
    if (d <= 0 || f <= 0) return { fspl: null, lambda: null, ratio: null, delay: null };
    const loss = 20 * Math.log10((4 * Math.PI * d * f) / C0);
    return {
      fspl: loss,
      lambda: C0 / f,
      ratio: Math.pow(10, -loss / 10),
      delay: d / C0,
    };
  },
  assumptions: [
    'Free space only: no ground reflection, no obstruction, no atmospheric absorption.',
    'Real terrestrial links lose considerably more. Path loss exponents of 3–4 are typical indoors and in cluttered environments.',
  ],
});

export const linkBudget = single({
  id: 'link-budget',
  title: 'RF Link Budget',
  category: 'rf',
  summary:
    'Work a link end to end: transmit power through antennas and losses to the received level, the margin over receiver sensitivity, and the range at which the margin runs out.',
  tags: ['link budget', 'margin', 'sensitivity', 'range', 'eirp', 'fade margin'],
  formula: 'P_{rx} = P_{tx} + G_{tx} - L_{tx} - FSPL - L_{misc} + G_{rx} - L_{rx}',
  fields: [
    { kind: 'number', key: 'ptx', label: 'Transmit power', quantity: 'dBm', default: 20 },
    { kind: 'number', key: 'gtx', label: 'Transmit antenna gain', quantity: 'dBi', default: 6 },
    { kind: 'number', key: 'ltx', label: 'Transmit feedline loss', quantity: 'decibel', default: 1 },
    { kind: 'number', key: 'grx', label: 'Receive antenna gain', quantity: 'dBi', default: 6 },
    { kind: 'number', key: 'lrx', label: 'Receive feedline loss', quantity: 'decibel', default: 1 },
    { kind: 'number', key: 'f', label: 'Frequency', quantity: 'frequency', default: 2.45, defaultUnit: 'GHz' },
    { kind: 'number', key: 'd', label: 'Distance', quantity: 'length', default: 5, defaultUnit: 'km' },
    {
      kind: 'number',
      key: 'lmisc',
      label: 'Miscellaneous losses',
      quantity: 'decibel',
      default: 3,
      help: 'Rain, foliage, polarisation mismatch, pointing error.',
    },
    { kind: 'number', key: 'sens', label: 'Receiver sensitivity', quantity: 'dBm', default: -90 },
  ],
  outputs: [
    { key: 'margin', label: 'Link margin', quantity: 'decibel', primary: true },
    { key: 'prx', label: 'Received power', quantity: 'dBm' },
    { key: 'fspl', label: 'Free-space path loss', quantity: 'decibel' },
    { key: 'eirp', label: 'EIRP', quantity: 'dBm' },
    { key: 'prx_w', label: 'Received power', quantity: 'power' },
    { key: 'dmax', label: 'Range at zero margin', quantity: 'length' },
  ],
  compute: (v) => {
    const ptx = num(v, 'ptx');
    const gtx = num(v, 'gtx');
    const ltx = num(v, 'ltx');
    const grx = num(v, 'grx');
    const lrx = num(v, 'lrx');
    const f = num(v, 'f');
    const d = num(v, 'd');
    const lmisc = num(v, 'lmisc');
    const sens = num(v, 'sens');

    const loss = 20 * Math.log10((4 * Math.PI * d * f) / C0);
    const eirp = ptx + gtx - ltx;
    const prx = eirp - loss - lmisc + grx - lrx;
    const margin = prx - sens;
    // Distance at which margin reaches zero: FSPL may grow by `margin` dB.
    const fsplMax = loss + margin;
    const dmax = (Math.pow(10, fsplMax / 20) * C0) / (4 * Math.PI * f);

    return {
      margin,
      prx,
      fspl: loss,
      eirp,
      prx_w: Math.pow(10, (prx - 30) / 10),
      dmax,
    };
  },
  assumptions: [
    'Free-space propagation. On a terrestrial path add terrain, clutter and multipath allowances.',
    'A margin of 10–20 dB is normal practice for a link expected to stay up in bad weather.',
    'The range figure scales free-space loss only; it will be optimistic on any real path.',
  ],
});

export const noiseFigure = single({
  id: 'noise-figure',
  title: 'Cascaded Noise Figure',
  category: 'rf',
  summary:
    'Friis cascade: total noise figure and gain of a receive chain, the equivalent noise temperature, and the resulting noise floor.',
  tags: ['noise figure', 'friis', 'cascade', 'nf', 'noise temperature', 'sensitivity', 'lna'],
  formula: 'F = F_1 + \\dfrac{F_2 - 1}{G_1} + \\dfrac{F_3 - 1}{G_1 G_2} + \\cdots',
  fields: [
    {
      kind: 'list',
      key: 'nf',
      label: 'Noise figure of each stage',
      quantity: 'decibel',
      default: [1.2, 3, 8],
      help: 'Comma-separated, in dB, source first. For a passive loss, NF equals the loss.',
    },
    {
      kind: 'list',
      key: 'gain',
      label: 'Gain of each stage',
      quantity: 'decibel',
      default: [15, 12, 20],
      help: 'Comma-separated, in dB. Use a negative value for a lossy stage.',
    },
    { kind: 'number', key: 'bw', label: 'Noise bandwidth', quantity: 'frequency', default: 1, defaultUnit: 'MHz' },
  ],
  outputs: [
    { key: 'nf_total', label: 'Total noise figure', quantity: 'decibel', primary: true },
    { key: 'gain_total', label: 'Total gain', quantity: 'decibel' },
    { key: 'te', label: 'Equivalent noise temperature', quantity: 'temperature' },
    { key: 'floor', label: 'Noise floor at output of chain', quantity: 'dBm' },
    { key: 'floor_in', label: 'Input-referred noise floor', quantity: 'dBm' },
    { key: 'thermal', label: 'Thermal noise in bandwidth', quantity: 'dBm', note: 'kTB at 290 K' },
  ],
  compute: (v) => {
    const nfs = list(v, 'nf');
    const gains = list(v, 'gain');
    const bw = num(v, 'bw');
    const n = Math.min(nfs.length, gains.length);
    if (n === 0) {
      return { nf_total: null, gain_total: null, te: null, floor: null, floor_in: null, thermal: null };
    }

    let fTotal = 0;
    let gainAccum = 1; // linear gain of all preceding stages
    let gainTotal = 1;
    for (let i = 0; i < n; i++) {
      const f = Math.pow(10, nfs[i] / 10);
      const g = Math.pow(10, gains[i] / 10);
      fTotal += (f - 1) / gainAccum;
      gainAccum *= g;
      gainTotal *= g;
    }
    fTotal += 1; // the leading 1 of F1

    const nfDb = 10 * Math.log10(fTotal);
    const gainDb = 10 * Math.log10(gainTotal);
    const thermalDbm = 10 * Math.log10(K_BOLTZMANN * T0_NOISE * bw / 1e-3);

    return {
      nf_total: nfDb,
      gain_total: gainDb,
      te: T0_NOISE * (fTotal - 1),
      floor: thermalDbm + nfDb + gainDb,
      floor_in: thermalDbm + nfDb,
      thermal: thermalDbm,
    };
  },
  assumptions: [
    'The first stage dominates — which is exactly why the low-noise amplifier goes first, before any lossy cable.',
    'Noise figures are referenced to 290 K.',
    'Assumes every stage is impedance-matched; mismatch changes the effective noise figure.',
  ],
});

const CONDUCTORS = [
  { value: '1.724e-8|1', label: 'Copper' },
  { value: '2.82e-8|1', label: 'Aluminium' },
  { value: '2.44e-8|1', label: 'Gold' },
  { value: '1.59e-8|1', label: 'Silver' },
  { value: '6.99e-8|1', label: 'Brass' },
  { value: '9.71e-8|1000', label: 'Iron (µr ≈ 1000)' },
];

export const skinDepth = single({
  id: 'skin-depth',
  title: 'Skin Depth',
  category: 'rf',
  summary:
    'How far current penetrates a conductor at a given frequency, and what that does to the resistance of a round wire.',
  tags: ['skin depth', 'skin effect', 'ac resistance', 'conductor', 'proximity effect'],
  formula: '\\delta = \\sqrt{\\dfrac{\\rho}{\\pi f \\mu}}',
  fields: [
    { kind: 'number', key: 'f', label: 'Frequency', quantity: 'frequency', default: 10, defaultUnit: 'MHz' },
    {
      kind: 'select',
      key: 'material',
      label: 'Conductor',
      options: CONDUCTORS,
      default: '1.724e-8|1',
    },
    {
      kind: 'number',
      key: 'd',
      label: 'Wire diameter',
      quantity: 'length',
      default: 1,
      defaultUnit: 'mm',
      help: 'Used for the AC resistance comparison.',
    },
    { kind: 'number', key: 'len', label: 'Wire length', quantity: 'length', default: 1 },
  ],
  outputs: [
    { key: 'delta', label: 'Skin depth δ', quantity: 'length', primary: true },
    { key: 'rdc', label: 'DC resistance', quantity: 'resistance' },
    { key: 'rac', label: 'AC resistance', quantity: 'resistance' },
    { key: 'ratio', label: 'Rac / Rdc', quantity: 'ratio' },
    { key: 'dpen', label: 'Diameter in skin depths', quantity: 'ratio' },
  ],
  compute: (v) => {
    const f = num(v, 'f');
    const [rhoStr, murStr] = str(v, 'material').split('|');
    const rho = parseFloat(rhoStr);
    const mu = MU0 * parseFloat(murStr);
    const d = num(v, 'd');
    const len = num(v, 'len');

    const delta = Math.sqrt(rho / (Math.PI * f * mu));
    const area = Math.PI * Math.pow(d / 2, 2);
    const rdc = (rho * len) / area;
    // Effective conducting annulus of thickness delta; exact for d >> delta.
    const effArea =
      delta >= d / 2 ? area : Math.PI * (Math.pow(d / 2, 2) - Math.pow(d / 2 - delta, 2));
    const rac = (rho * len) / effArea;
    return { delta, rdc, rac, ratio: rac / rdc, dpen: d / delta };
  },
  assumptions: [
    'The AC resistance figure is the annulus approximation — accurate once the diameter is several skin depths, optimistic near DC.',
    'Ignores the proximity effect, which raises losses further in closely wound coils.',
    'Silver plating helps at RF precisely because nearly all the current flows in the outer few microns.',
  ],
});

export const fresnelZone = single({
  id: 'fresnel-zone',
  title: 'Fresnel Zone Clearance',
  category: 'rf',
  summary:
    'Radius of the Fresnel zone along a path, and the 60 % clearance figure used to decide how high to mount antennas.',
  tags: ['fresnel', 'clearance', 'line of sight', 'path', 'obstruction', 'microwave link'],
  formula: 'r_n = \\sqrt{\\dfrac{n\\lambda d_1 d_2}{d_1 + d_2}}',
  fields: [
    { kind: 'number', key: 'f', label: 'Frequency', quantity: 'frequency', default: 5.8, defaultUnit: 'GHz' },
    { kind: 'number', key: 'd1', label: 'Distance from end A', quantity: 'length', default: 3, defaultUnit: 'km' },
    { kind: 'number', key: 'd2', label: 'Distance from end B', quantity: 'length', default: 7, defaultUnit: 'km' },
    { kind: 'number', key: 'n', label: 'Zone number', quantity: 'count', default: 1 },
  ],
  outputs: [
    { key: 'r', label: 'Zone radius at that point', quantity: 'length', primary: true },
    { key: 'r60', label: '60 % clearance needed', quantity: 'length' },
    { key: 'rmid', label: 'First-zone radius at midpoint', quantity: 'length', note: 'the widest point' },
    { key: 'total', label: 'Total path length', quantity: 'length' },
    { key: 'lambda', label: 'Wavelength', quantity: 'length' },
    { key: 'bulge', label: 'Earth bulge at that point', quantity: 'length', note: 'k = 4/3' },
  ],
  compute: (v) => {
    const f = num(v, 'f');
    const d1 = num(v, 'd1');
    const d2 = num(v, 'd2');
    const n = Math.max(1, Math.round(num(v, 'n')));
    const lambda = C0 / f;
    const total = d1 + d2;
    const r = Math.sqrt((n * lambda * d1 * d2) / total);
    const rMid = Math.sqrt((lambda * total) / 4);
    // Earth bulge with the standard 4/3 effective radius, in metres.
    const kRe = (4 / 3) * 6371000;
    const bulge = (d1 * d2) / (2 * kRe);
    return { r, r60: 0.6 * r, rmid: rMid, total, lambda, bulge };
  },
  assumptions: [
    'Keeping 60 % of the first Fresnel zone clear gives roughly free-space loss; blocking it costs several dB.',
    'The earth bulge figure uses the standard k = 4/3 effective earth radius for normal atmospheric refraction.',
  ],
});

export const eirp = single({
  id: 'eirp',
  title: 'EIRP & ERP',
  category: 'rf',
  summary:
    'Effective radiated power from transmitter output, feedline loss and antenna gain — the figure regulators set limits on.',
  tags: ['eirp', 'erp', 'radiated power', 'antenna gain', 'regulatory', 'dbi', 'dbd'],
  formula: 'EIRP_{dBm} = P_{tx} - L_{cable} + G_{dBi}',
  fields: [
    { kind: 'number', key: 'ptx', label: 'Transmitter output', quantity: 'dBm', default: 30 },
    { kind: 'number', key: 'loss', label: 'Feedline and connector loss', quantity: 'decibel', default: 2 },
    { kind: 'number', key: 'gain', label: 'Antenna gain', quantity: 'dBi', default: 12 },
  ],
  outputs: [
    { key: 'eirp_dbm', label: 'EIRP', quantity: 'dBm', primary: true },
    { key: 'eirp_w', label: 'EIRP', quantity: 'power' },
    { key: 'erp_dbm', label: 'ERP (referenced to a dipole)', quantity: 'dBm' },
    { key: 'erp_w', label: 'ERP', quantity: 'power' },
    { key: 'pant', label: 'Power reaching the antenna', quantity: 'power' },
    { key: 'gain_dbd', label: 'Antenna gain in dBd', quantity: 'ratio', unitLabel: 'dBd' },
  ],
  compute: (v) => {
    const ptx = num(v, 'ptx');
    const loss = num(v, 'loss');
    const gain = num(v, 'gain');
    const eirpDbm = ptx - loss + gain;
    const erpDbm = eirpDbm - 2.15;
    return {
      eirp_dbm: eirpDbm,
      eirp_w: Math.pow(10, (eirpDbm - 30) / 10),
      erp_dbm: erpDbm,
      erp_w: Math.pow(10, (erpDbm - 30) / 10),
      pant: Math.pow(10, (ptx - loss - 30) / 10),
      gain_dbd: gain - 2.15,
    };
  },
  assumptions: [
    'EIRP is referenced to an isotropic radiator, ERP to a half-wave dipole — the two differ by 2.15 dB.',
    'Regulatory limits are usually stated as EIRP, so feedline loss genuinely buys you headroom.',
  ],
});

export const attenuatorPad = single({
  id: 'attenuator-pad',
  title: 'Attenuator Pad',
  category: 'rf',
  summary:
    'Resistor values for a matched Pi or T attenuator at a chosen attenuation and system impedance.',
  tags: ['attenuator', 'pad', 'pi pad', 't pad', 'resistive', 'matching', 'isolation'],
  formula: 'K = 10^{A/20}',
  fields: [
    { kind: 'number', key: 'a', label: 'Attenuation', quantity: 'decibel', default: 6, min: 0.1 },
    { kind: 'number', key: 'z0', label: 'System impedance', quantity: 'resistance', default: 50 },
    { kind: 'number', key: 'p', label: 'Input power', quantity: 'power', default: 1, defaultUnit: 'W' },
  ],
  outputs: [
    { key: 'pi_shunt', label: 'Pi: both shunt resistors', quantity: 'resistance', primary: true },
    { key: 'pi_series', label: 'Pi: series resistor', quantity: 'resistance' },
    { key: 't_series', label: 'T: both series resistors', quantity: 'resistance' },
    { key: 't_shunt', label: 'T: shunt resistor', quantity: 'resistance' },
    { key: 'pout', label: 'Output power', quantity: 'power' },
    { key: 'pdiss', label: 'Power dissipated in the pad', quantity: 'power' },
  ],
  compute: (v) => {
    const a = Math.max(num(v, 'a'), 0.0001);
    const z0 = num(v, 'z0');
    const p = num(v, 'p');
    const k = Math.pow(10, a / 20); // voltage ratio
    const pout = p / Math.pow(10, a / 10);
    return {
      pi_shunt: (z0 * (k + 1)) / (k - 1),
      pi_series: (z0 * (k * k - 1)) / (2 * k),
      t_series: (z0 * (k - 1)) / (k + 1),
      t_shunt: (2 * z0 * k) / (k * k - 1),
      pout,
      pdiss: p - pout,
    };
  },
  assumptions: [
    'Purely resistive, matched on both ports, so the input impedance stays Z₀ regardless of what follows.',
    'Check the power rating of each resistor individually — in a Pi pad the series resistor takes most of the heat at low attenuation values.',
    'Resistive pads are broadband but throw away power. They are often used simply to improve the match seen by a sensitive stage.',
  ],
});

export const waveguide = single({
  id: 'waveguide',
  title: 'Rectangular Waveguide Cut-off',
  category: 'rf',
  summary:
    'Cut-off frequencies of the dominant and first higher-order modes in rectangular waveguide, with the usable band and guide wavelength.',
  tags: ['waveguide', 'cutoff', 'te10', 'mode', 'wr-90', 'microwave'],
  formula: 'f_{c,mn} = \\dfrac{c}{2\\sqrt{\\varepsilon_r}}\\sqrt{\\left(\\dfrac{m}{a}\\right)^2 + \\left(\\dfrac{n}{b}\\right)^2}',
  fields: [
    {
      kind: 'number',
      key: 'a',
      label: 'Broad wall a',
      quantity: 'length',
      default: 22.86,
      defaultUnit: 'mm',
      help: 'WR-90 is 22.86 × 10.16 mm.',
    },
    { kind: 'number', key: 'b', label: 'Narrow wall b', quantity: 'length', default: 10.16, defaultUnit: 'mm' },
    { kind: 'number', key: 'er', label: 'Filling εr', quantity: 'ratio', default: 1 },
    { kind: 'number', key: 'f', label: 'Operating frequency', quantity: 'frequency', default: 10, defaultUnit: 'GHz' },
  ],
  outputs: [
    { key: 'fc10', label: 'TE₁₀ cut-off (dominant)', quantity: 'frequency', primary: true },
    { key: 'fc20', label: 'TE₂₀ cut-off', quantity: 'frequency' },
    { key: 'fc01', label: 'TE₀₁ cut-off', quantity: 'frequency' },
    { key: 'band_low', label: 'Recommended band, lower', quantity: 'frequency', note: '1.25 × fc' },
    { key: 'band_high', label: 'Recommended band, upper', quantity: 'frequency', note: '1.9 × fc' },
    { key: 'lambda_g', label: 'Guide wavelength at f', quantity: 'length' },
    { key: 'zte', label: 'Wave impedance at f', quantity: 'resistance' },
  ],
  compute: (v) => {
    const a = num(v, 'a');
    const b = num(v, 'b');
    const er = num(v, 'er');
    const f = num(v, 'f');
    const c = C0 / Math.sqrt(er);
    const fc = (m: number, n: number) => (c / 2) * Math.hypot(m / a, n / b);
    const fc10 = fc(1, 0);
    const lambda0 = c / f;
    const propagating = f > fc10;
    const factor = propagating ? Math.sqrt(1 - Math.pow(fc10 / f, 2)) : NaN;
    return {
      fc10,
      fc20: fc(2, 0),
      fc01: fc(0, 1),
      band_low: 1.25 * fc10,
      band_high: 1.9 * fc10,
      lambda_g: propagating ? lambda0 / factor : null,
      zte: propagating ? (376.730313 / Math.sqrt(er)) / factor : null,
    };
  },
  assumptions: [
    'Below the TE₁₀ cut-off the guide does not propagate at all — the field decays exponentially.',
    'The recommended band stops short of the TE₂₀ cut-off so only the dominant mode can travel.',
    'Assumes perfectly conducting walls; real guide has finite loss that rises near cut-off.',
  ],
});

export const dipole = single({
  id: 'dipole-length',
  title: 'Dipole & Vertical Length',
  category: 'rf',
  summary:
    'Physical length to cut a half-wave dipole, quarter-wave vertical or 5/8-wave whip, including the end-effect shortening.',
  tags: ['dipole', 'antenna', 'quarter wave', 'vertical', 'whip', 'element length', 'ham'],
  formula: 'L_{half\\ wave} = \\dfrac{k\\,c}{2f}',
  fields: [
    { kind: 'number', key: 'f', label: 'Frequency', quantity: 'frequency', default: 145, defaultUnit: 'MHz' },
    {
      kind: 'number',
      key: 'k',
      label: 'Velocity / end-effect factor',
      quantity: 'ratio',
      default: 0.95,
      help: '≈0.95 for thin wire, lower for thick elements and insulated wire.',
    },
  ],
  outputs: [
    { key: 'half', label: 'Half-wave dipole, total length', quantity: 'length', primary: true },
    { key: 'leg', label: 'Each leg of the dipole', quantity: 'length' },
    { key: 'quarter', label: 'Quarter-wave vertical', quantity: 'length' },
    { key: 'fivEighth', label: '5/8-wave whip', quantity: 'length' },
    { key: 'lambda', label: 'Free-space wavelength', quantity: 'length' },
    { key: 'radial', label: 'Radial length for a ground plane', quantity: 'length', note: 'λ/4, usually cut slightly longer' },
  ],
  compute: (v) => {
    const f = num(v, 'f');
    const k = num(v, 'k');
    const lambda = C0 / f;
    const half = (lambda / 2) * k;
    return {
      half,
      leg: half / 2,
      quarter: (lambda / 4) * k,
      fivEighth: lambda * 0.625 * k,
      lambda,
      radial: lambda / 4,
    };
  },
  assumptions: [
    'Cut slightly long and trim to the lowest SWR — nearby objects, height above ground and insulation all shift resonance down.',
    'A half-wave dipole in free space presents roughly 73 Ω; a quarter-wave vertical over a good ground plane roughly 36 Ω.',
  ],
});

export const parabolic = single({
  id: 'parabolic-antenna',
  title: 'Parabolic Antenna Gain',
  category: 'rf',
  summary:
    'Gain and beamwidth of a parabolic dish from its diameter, frequency and aperture efficiency.',
  tags: ['parabolic', 'dish', 'antenna gain', 'beamwidth', 'aperture', 'satellite'],
  formula: 'G = \\eta\\left(\\dfrac{\\pi D}{\\lambda}\\right)^2',
  fields: [
    { kind: 'number', key: 'd', label: 'Dish diameter', quantity: 'length', default: 1.2 },
    { kind: 'number', key: 'f', label: 'Frequency', quantity: 'frequency', default: 10, defaultUnit: 'GHz' },
    {
      kind: 'number',
      key: 'eff',
      label: 'Aperture efficiency',
      quantity: 'percent',
      default: 55,
      help: 'Typically 50–70 % for a prime-focus dish.',
    },
  ],
  outputs: [
    { key: 'gain', label: 'Gain', quantity: 'dBi', primary: true },
    { key: 'gain_lin', label: 'Gain as a ratio', quantity: 'ratio' },
    { key: 'hpbw', label: 'Half-power beamwidth', quantity: 'angle' },
    { key: 'nullbw', label: 'Beamwidth to first nulls', quantity: 'angle' },
    { key: 'lambda', label: 'Wavelength', quantity: 'length' },
    { key: 'area', label: 'Effective aperture', quantity: 'ratio', unitLabel: 'm²' },
  ],
  compute: (v) => {
    const d = num(v, 'd');
    const f = num(v, 'f');
    const eff = Math.min(Math.max(num(v, 'eff') / 100, 0.01), 1);
    const lambda = C0 / f;
    const gainLin = eff * Math.pow((Math.PI * d) / lambda, 2);
    return {
      gain: 10 * Math.log10(gainLin),
      gain_lin: gainLin,
      hpbw: (70 * lambda) / d,
      nullbw: (140 * lambda) / d,
      lambda,
      area: eff * Math.PI * Math.pow(d / 2, 2),
    };
  },
  assumptions: [
    'The 70λ/D beamwidth is a rule of thumb; the exact figure depends on the illumination taper.',
    'Valid in the far field only, beyond roughly 2D²/λ.',
    'Surface accuracy matters: RMS errors beyond about λ/16 start eating measurably into gain.',
  ],
});

export const rfCalculators: CalculatorDef[] = [
  wavelength,
  vswr,
  microstrip,
  coax,
  lMatch,
  fspl,
  linkBudget,
  noiseFigure,
  skinDepth,
  fresnelZone,
  eirp,
  attenuatorPad,
  waveguide,
  dipole,
  parabolic,
];
