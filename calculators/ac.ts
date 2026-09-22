import { single, num, str, type CalculatorDef } from '@/lib/calculator-types';

export const rmsPeak = single({
  id: 'rms-peak',
  title: 'RMS, Peak & Average',
  category: 'ac',
  summary:
    'Convert between RMS, peak, peak-to-peak and rectified-average values for the common waveforms.',
  tags: ['rms', 'peak', 'peak-to-peak', 'average', 'crest factor', 'waveform'],
  formula: 'V_{rms} = \\dfrac{V_{pk}}{\\sqrt{2}} \\quad \\text{(sine)}',
  fields: [
    {
      kind: 'select',
      key: 'wave',
      label: 'Waveform',
      options: [
        { value: 'sine', label: 'Sine' },
        { value: 'square', label: 'Square' },
        { value: 'triangle', label: 'Triangle / sawtooth' },
      ],
      default: 'sine',
    },
    {
      kind: 'select',
      key: 'known',
      label: 'Value you know',
      options: [
        { value: 'rms', label: 'RMS' },
        { value: 'peak', label: 'Peak' },
        { value: 'pkpk', label: 'Peak-to-peak' },
      ],
      default: 'rms',
    },
    { kind: 'number', key: 'val', label: 'Value', quantity: 'voltage', default: 230 },
    {
      kind: 'number',
      key: 'r',
      label: 'Into a load of',
      quantity: 'resistance',
      default: 50,
      help: 'Used for the power figure.',
    },
  ],
  outputs: [
    { key: 'rms', label: 'RMS', quantity: 'voltage', primary: true },
    { key: 'peak', label: 'Peak', quantity: 'voltage' },
    { key: 'pkpk', label: 'Peak-to-peak', quantity: 'voltage' },
    { key: 'avg', label: 'Rectified average', quantity: 'voltage' },
    { key: 'crest', label: 'Crest factor', quantity: 'ratio' },
    { key: 'p', label: 'Power into load', quantity: 'power' },
  ],
  compute: (v) => {
    const wave = str(v, 'wave');
    const known = str(v, 'known');
    const val = num(v, 'val');
    const r = num(v, 'r');

    // Ratios relative to the peak value.
    const rmsPerPeak = wave === 'square' ? 1 : wave === 'triangle' ? 1 / Math.sqrt(3) : 1 / Math.SQRT2;
    const avgPerPeak = wave === 'square' ? 1 : wave === 'triangle' ? 0.5 : 2 / Math.PI;

    const peak = known === 'peak' ? val : known === 'pkpk' ? val / 2 : val / rmsPerPeak;
    const rms = peak * rmsPerPeak;

    return {
      rms,
      peak,
      pkpk: peak * 2,
      avg: peak * avgPerPeak,
      crest: peak / rms,
      p: (rms * rms) / r,
    };
  },
  assumptions: [
    'Assumes a symmetrical waveform with no DC offset.',
    'Cheap multimeters measure the rectified average and scale it assuming a sine — they read badly on distorted waveforms.',
  ],
});

export const reactance: CalculatorDef = {
  id: 'reactance',
  title: 'Capacitive & Inductive Reactance',
  category: 'ac',
  summary:
    'Reactance of a capacitor or inductor at a given frequency, and the component value needed to hit a target reactance.',
  tags: ['reactance', 'impedance', 'capacitor', 'inductor', 'Xc', 'Xl'],
  modes: [
    {
      id: 'capacitive',
      label: 'Capacitor',
      formula: 'X_C = \\dfrac{1}{2\\pi f C}',
      fields: [
        { kind: 'number', key: 'f', label: 'Frequency', quantity: 'frequency', default: 1, defaultUnit: 'kHz' },
        { kind: 'number', key: 'c', label: 'Capacitance', quantity: 'capacitance', default: 100, defaultUnit: 'nF' },
      ],
      outputs: [
        { key: 'x', label: 'Reactance |Xc|', quantity: 'resistance', primary: true },
        { key: 'b', label: 'Susceptance', quantity: 'ratio', unitLabel: 'S' },
        { key: 'phase', label: 'Phase of current vs voltage', quantity: 'angle', note: 'current leads' },
      ],
      compute: (v) => {
        const f = num(v, 'f');
        const c = num(v, 'c');
        const x = 1 / (2 * Math.PI * f * c);
        return { x, b: 1 / x, phase: 90 };
      },
    },
    {
      id: 'inductive',
      label: 'Inductor',
      formula: 'X_L = 2\\pi f L',
      fields: [
        { kind: 'number', key: 'f', label: 'Frequency', quantity: 'frequency', default: 1, defaultUnit: 'kHz' },
        { kind: 'number', key: 'l', label: 'Inductance', quantity: 'inductance', default: 10, defaultUnit: 'mH' },
      ],
      outputs: [
        { key: 'x', label: 'Reactance Xl', quantity: 'resistance', primary: true },
        { key: 'b', label: 'Susceptance', quantity: 'ratio', unitLabel: 'S' },
        { key: 'phase', label: 'Phase of current vs voltage', quantity: 'angle', note: 'current lags' },
      ],
      compute: (v) => {
        const f = num(v, 'f');
        const l = num(v, 'l');
        const x = 2 * Math.PI * f * l;
        return { x, b: 1 / x, phase: -90 };
      },
    },
    {
      id: 'solve-c',
      label: 'Capacitance for a target reactance',
      formula: 'C = \\dfrac{1}{2\\pi f X_C}',
      fields: [
        { kind: 'number', key: 'f', label: 'Frequency', quantity: 'frequency', default: 100, defaultUnit: 'MHz' },
        { kind: 'number', key: 'x', label: 'Target reactance', quantity: 'resistance', default: 50 },
      ],
      outputs: [{ key: 'c', label: 'Capacitance', quantity: 'capacitance', primary: true }],
      compute: (v) => ({ c: 1 / (2 * Math.PI * num(v, 'f') * num(v, 'x')) }),
    },
    {
      id: 'solve-l',
      label: 'Inductance for a target reactance',
      formula: 'L = \\dfrac{X_L}{2\\pi f}',
      fields: [
        { kind: 'number', key: 'f', label: 'Frequency', quantity: 'frequency', default: 100, defaultUnit: 'MHz' },
        { kind: 'number', key: 'x', label: 'Target reactance', quantity: 'resistance', default: 50 },
      ],
      outputs: [{ key: 'l', label: 'Inductance', quantity: 'inductance', primary: true }],
      compute: (v) => ({ l: num(v, 'x') / (2 * Math.PI * num(v, 'f')) }),
    },
  ],
  assumptions: [
    'Ideal components. Real capacitors have ESR and series inductance; above their self-resonant frequency they behave inductively.',
  ],
};

export const seriesRlc = single({
  id: 'series-rlc',
  title: 'Series RLC Impedance',
  category: 'ac',
  summary:
    'Magnitude and phase of a series R-L-C branch at a chosen frequency, with the resonant frequency for reference.',
  tags: ['rlc', 'impedance', 'phase', 'series', 'complex'],
  formula: 'Z = R + j\\left(2\\pi f L - \\dfrac{1}{2\\pi f C}\\right)',
  fields: [
    { kind: 'number', key: 'f', label: 'Frequency', quantity: 'frequency', default: 10, defaultUnit: 'kHz' },
    { kind: 'number', key: 'r', label: 'Resistance', quantity: 'resistance', default: 10 },
    { kind: 'number', key: 'l', label: 'Inductance', quantity: 'inductance', default: 1, defaultUnit: 'mH' },
    { kind: 'number', key: 'c', label: 'Capacitance', quantity: 'capacitance', default: 250, defaultUnit: 'nF' },
  ],
  outputs: [
    { key: 'z', label: 'Impedance magnitude |Z|', quantity: 'resistance', primary: true },
    { key: 'phase', label: 'Phase angle', quantity: 'angle', note: 'positive = inductive' },
    { key: 'xl', label: 'Inductive reactance Xl', quantity: 'resistance' },
    { key: 'xc', label: 'Capacitive reactance Xc', quantity: 'resistance' },
    { key: 'x', label: 'Net reactance', quantity: 'resistance' },
    { key: 'f0', label: 'Resonant frequency', quantity: 'frequency' },
    { key: 'q', label: 'Q at resonance', quantity: 'ratio' },
  ],
  compute: (v) => {
    const f = num(v, 'f');
    const r = num(v, 'r');
    const l = num(v, 'l');
    const c = num(v, 'c');
    const w = 2 * Math.PI * f;
    const xl = w * l;
    const xc = 1 / (w * c);
    const x = xl - xc;
    return {
      z: Math.hypot(r, x),
      phase: (Math.atan2(x, r) * 180) / Math.PI,
      xl,
      xc,
      x,
      f0: 1 / (2 * Math.PI * Math.sqrt(l * c)),
      q: (1 / r) * Math.sqrt(l / c),
    };
  },
  assumptions: ['Ideal components; winding resistance and capacitor ESR are not modelled separately.'],
});

export const lcResonance: CalculatorDef = {
  id: 'lc-resonance',
  title: 'LC Resonance',
  category: 'ac',
  summary:
    'Resonant frequency of an LC tank, or the component value needed to resonate at a chosen frequency.',
  tags: ['resonance', 'tank', 'lc', 'tuned circuit', 'oscillator'],
  modes: [
    {
      id: 'frequency',
      label: 'Solve for frequency',
      formula: 'f_0 = \\dfrac{1}{2\\pi\\sqrt{LC}}',
      fields: [
        { kind: 'number', key: 'l', label: 'Inductance', quantity: 'inductance', default: 100, defaultUnit: 'nH' },
        { kind: 'number', key: 'c', label: 'Capacitance', quantity: 'capacitance', default: 25, defaultUnit: 'pF' },
      ],
      outputs: [
        { key: 'f0', label: 'Resonant frequency', quantity: 'frequency', primary: true },
        { key: 'x', label: 'Reactance at resonance', quantity: 'resistance', note: 'Xl = Xc' },
        { key: 'z0', label: 'Characteristic impedance √(L/C)', quantity: 'resistance' },
      ],
      compute: (v) => {
        const l = num(v, 'l');
        const c = num(v, 'c');
        const f0 = 1 / (2 * Math.PI * Math.sqrt(l * c));
        return { f0, x: 2 * Math.PI * f0 * l, z0: Math.sqrt(l / c) };
      },
    },
    {
      id: 'capacitance',
      label: 'Solve for capacitance',
      formula: 'C = \\dfrac{1}{(2\\pi f_0)^2 L}',
      fields: [
        { kind: 'number', key: 'f0', label: 'Target frequency', quantity: 'frequency', default: 100, defaultUnit: 'MHz' },
        { kind: 'number', key: 'l', label: 'Inductance', quantity: 'inductance', default: 100, defaultUnit: 'nH' },
      ],
      outputs: [{ key: 'c', label: 'Capacitance needed', quantity: 'capacitance', primary: true }],
      compute: (v) => {
        const w = 2 * Math.PI * num(v, 'f0');
        return { c: 1 / (w * w * num(v, 'l')) };
      },
    },
    {
      id: 'inductance',
      label: 'Solve for inductance',
      formula: 'L = \\dfrac{1}{(2\\pi f_0)^2 C}',
      fields: [
        { kind: 'number', key: 'f0', label: 'Target frequency', quantity: 'frequency', default: 100, defaultUnit: 'MHz' },
        { kind: 'number', key: 'c', label: 'Capacitance', quantity: 'capacitance', default: 25, defaultUnit: 'pF' },
      ],
      outputs: [{ key: 'l', label: 'Inductance needed', quantity: 'inductance', primary: true }],
      compute: (v) => {
        const w = 2 * Math.PI * num(v, 'f0');
        return { l: 1 / (w * w * num(v, 'c')) };
      },
    },
  ],
  assumptions: [
    'Ignores component parasitics, which pull the real resonance lower — noticeably so above a few hundred MHz.',
  ],
};

export const qBandwidth = single({
  id: 'q-bandwidth',
  title: 'Q Factor & Bandwidth',
  category: 'ac',
  summary:
    'Relate quality factor, centre frequency and −3 dB bandwidth for a resonant circuit, in either series or parallel form.',
  tags: ['q factor', 'bandwidth', 'selectivity', 'resonance', 'filter'],
  formula: 'Q = \\dfrac{f_0}{BW}',
  fields: [
    {
      kind: 'select',
      key: 'topology',
      label: 'Circuit',
      options: [
        { value: 'series', label: 'Series RLC' },
        { value: 'parallel', label: 'Parallel RLC' },
      ],
      default: 'parallel',
    },
    { kind: 'number', key: 'l', label: 'Inductance', quantity: 'inductance', default: 100, defaultUnit: 'nH' },
    { kind: 'number', key: 'c', label: 'Capacitance', quantity: 'capacitance', default: 25, defaultUnit: 'pF' },
    { kind: 'number', key: 'r', label: 'Resistance', quantity: 'resistance', default: 5, defaultUnit: 'kΩ' },
  ],
  outputs: [
    { key: 'q', label: 'Q factor', quantity: 'ratio', primary: true },
    { key: 'f0', label: 'Resonant frequency', quantity: 'frequency' },
    { key: 'bw', label: '−3 dB bandwidth', quantity: 'frequency' },
    { key: 'flow', label: 'Lower −3 dB point', quantity: 'frequency' },
    { key: 'fhigh', label: 'Upper −3 dB point', quantity: 'frequency' },
    { key: 'z0', label: 'Characteristic impedance √(L/C)', quantity: 'resistance' },
  ],
  compute: (v) => {
    const l = num(v, 'l');
    const c = num(v, 'c');
    const r = num(v, 'r');
    const f0 = 1 / (2 * Math.PI * Math.sqrt(l * c));
    const z0 = Math.sqrt(l / c);
    const q = str(v, 'topology') === 'series' ? z0 / r : r / z0;
    const bw = f0 / q;
    return {
      q,
      f0,
      bw,
      flow: f0 * (Math.sqrt(1 + 1 / (4 * q * q)) - 1 / (2 * q)),
      fhigh: f0 * (Math.sqrt(1 + 1 / (4 * q * q)) + 1 / (2 * q)),
      z0,
    };
  },
  assumptions: [
    'In a series circuit R is the loss in the loop; in a parallel circuit it is the shunt loading, including whatever the source and load present.',
    'Loaded Q is what sets the bandwidth you actually get — unloaded Q of the inductor is usually the limiting factor.',
  ],
});

export const rcFilter = single({
  id: 'rc-filter',
  title: 'First-Order Filter',
  category: 'ac',
  summary:
    'Cut-off frequency of a single-pole RC or RL filter, plus the attenuation and phase shift at any frequency you choose.',
  tags: ['filter', 'low pass', 'high pass', 'cutoff', 'rc', 'rl', 'corner frequency'],
  formula: 'f_c = \\dfrac{1}{2\\pi R C} \\qquad |H| = \\dfrac{1}{\\sqrt{1 + (f/f_c)^2}}',
  fields: [
    {
      kind: 'select',
      key: 'kind',
      label: 'Filter type',
      options: [
        { value: 'rc-lp', label: 'RC low-pass' },
        { value: 'rc-hp', label: 'RC high-pass' },
        { value: 'rl-lp', label: 'RL low-pass' },
        { value: 'rl-hp', label: 'RL high-pass' },
      ],
      default: 'rc-lp',
    },
    { kind: 'number', key: 'r', label: 'Resistance', quantity: 'resistance', default: 1, defaultUnit: 'kΩ' },
    {
      kind: 'number',
      key: 'c',
      label: 'Capacitance',
      quantity: 'capacitance',
      default: 100,
      defaultUnit: 'nF',
      help: 'Used for the RC types.',
    },
    {
      kind: 'number',
      key: 'l',
      label: 'Inductance',
      quantity: 'inductance',
      default: 10,
      defaultUnit: 'mH',
      help: 'Used for the RL types.',
    },
    { kind: 'number', key: 'f', label: 'Evaluate at frequency', quantity: 'frequency', default: 10, defaultUnit: 'kHz' },
  ],
  outputs: [
    { key: 'fc', label: 'Cut-off frequency (−3 dB)', quantity: 'frequency', primary: true },
    { key: 'gain_db', label: 'Attenuation at chosen frequency', quantity: 'decibel' },
    { key: 'gain', label: 'Voltage ratio at chosen frequency', quantity: 'ratio' },
    { key: 'phase', label: 'Phase shift', quantity: 'angle' },
    { key: 'tau', label: 'Time constant', quantity: 'time' },
  ],
  compute: (v) => {
    const kind = str(v, 'kind');
    const r = num(v, 'r');
    const c = num(v, 'c');
    const l = num(v, 'l');
    const f = num(v, 'f');
    const isRC = kind.startsWith('rc');
    const highPass = kind.endsWith('hp');
    const tau = isRC ? r * c : l / r;
    const fc = 1 / (2 * Math.PI * tau);
    const ratio = f / fc;
    const gain = highPass
      ? ratio / Math.sqrt(1 + ratio * ratio)
      : 1 / Math.sqrt(1 + ratio * ratio);
    const phase = highPass
      ? (Math.atan(1 / ratio) * 180) / Math.PI
      : (-Math.atan(ratio) * 180) / Math.PI;
    return { fc, gain, gain_db: 20 * Math.log10(gain), phase, tau };
  },
  assumptions: [
    'Assumes an ideal voltage source and no load on the output — loading shifts the corner.',
    'A single pole rolls off at 20 dB/decade (6 dB/octave) well past the corner.',
  ],
});

export const dbConverter: CalculatorDef = {
  id: 'db-converter',
  title: 'Decibel Converter',
  category: 'ac',
  summary:
    'Convert between ratios and decibels, and between absolute power levels in watts, dBm and dBW.',
  tags: ['db', 'dbm', 'dbw', 'decibel', 'gain', 'loss', 'ratio', 'logarithmic'],
  modes: [
    {
      id: 'ratio-to-db',
      label: 'Ratio → dB',
      formula: 'dB = 10\\log_{10}\\dfrac{P_2}{P_1} = 20\\log_{10}\\dfrac{V_2}{V_1}',
      fields: [
        { kind: 'number', key: 'ratio', label: 'Ratio', quantity: 'ratio', default: 2 },
      ],
      outputs: [
        { key: 'power_db', label: 'As a power ratio', quantity: 'decibel', primary: true },
        { key: 'amp_db', label: 'As a voltage/current ratio', quantity: 'decibel' },
      ],
      compute: (v) => {
        const r = num(v, 'ratio');
        if (r <= 0) return { power_db: null, amp_db: null };
        return { power_db: 10 * Math.log10(r), amp_db: 20 * Math.log10(r) };
      },
    },
    {
      id: 'db-to-ratio',
      label: 'dB → ratio',
      formula: '\\dfrac{P_2}{P_1} = 10^{dB/10}',
      fields: [{ kind: 'number', key: 'db', label: 'Decibels', quantity: 'decibel', default: 3 }],
      outputs: [
        { key: 'power_ratio', label: 'Power ratio', quantity: 'ratio', primary: true },
        { key: 'amp_ratio', label: 'Voltage/current ratio', quantity: 'ratio' },
      ],
      compute: (v) => {
        const db = num(v, 'db');
        return { power_ratio: Math.pow(10, db / 10), amp_ratio: Math.pow(10, db / 20) };
      },
    },
    {
      id: 'watts-to-dbm',
      label: 'Power → dBm',
      formula: 'P_{dBm} = 10\\log_{10}\\dfrac{P}{1\\,\\text{mW}}',
      fields: [
        { kind: 'number', key: 'p', label: 'Power', quantity: 'power', default: 100, defaultUnit: 'mW' },
        {
          kind: 'number',
          key: 'z',
          label: 'System impedance',
          quantity: 'resistance',
          default: 50,
          help: 'Used for the equivalent RMS voltage.',
        },
      ],
      outputs: [
        { key: 'dbm', label: 'Level', quantity: 'dBm', primary: true },
        { key: 'dbw', label: 'Level', quantity: 'dBW' },
        { key: 'vrms', label: 'Equivalent RMS voltage', quantity: 'voltage' },
        { key: 'vpp', label: 'Equivalent peak-to-peak', quantity: 'voltage' },
      ],
      compute: (v) => {
        const p = num(v, 'p');
        const z = num(v, 'z');
        if (p <= 0) return { dbm: null, dbw: null, vrms: null, vpp: null };
        const vrms = Math.sqrt(p * z);
        return {
          dbm: 10 * Math.log10(p / 1e-3),
          dbw: 10 * Math.log10(p),
          vrms,
          vpp: vrms * 2 * Math.SQRT2,
        };
      },
    },
    {
      id: 'dbm-to-watts',
      label: 'dBm → power',
      formula: 'P = 10^{(P_{dBm}-30)/10}',
      fields: [
        { kind: 'number', key: 'dbm', label: 'Level', quantity: 'dBm', default: 20 },
        { kind: 'number', key: 'z', label: 'System impedance', quantity: 'resistance', default: 50 },
      ],
      outputs: [
        { key: 'p', label: 'Power', quantity: 'power', primary: true },
        { key: 'dbw', label: 'Level', quantity: 'dBW' },
        { key: 'vrms', label: 'RMS voltage', quantity: 'voltage' },
        { key: 'vpp', label: 'Peak-to-peak voltage', quantity: 'voltage' },
      ],
      compute: (v) => {
        const dbm = num(v, 'dbm');
        const z = num(v, 'z');
        const p = Math.pow(10, (dbm - 30) / 10);
        const vrms = Math.sqrt(p * z);
        return { p, dbw: dbm - 30, vrms, vpp: vrms * 2 * Math.SQRT2 };
      },
    },
  ],
  assumptions: [
    'dBm and dBW are absolute levels; dB on its own is always a ratio between two quantities.',
    'The voltage conversion assumes the stated impedance is purely resistive.',
  ],
};

export const threePhase = single({
  id: 'three-phase',
  title: 'Three-Phase Power',
  category: 'ac',
  summary:
    'Real, reactive and apparent power in a balanced three-phase system, with line and phase quantities for both star and delta.',
  tags: ['three phase', '3-phase', 'star', 'delta', 'power factor', 'kva', 'kvar'],
  formula: 'P = \\sqrt{3}\\,V_L I_L \\cos\\varphi',
  fields: [
    {
      kind: 'select',
      key: 'conn',
      label: 'Connection',
      options: [
        { value: 'star', label: 'Star (wye)' },
        { value: 'delta', label: 'Delta' },
      ],
      default: 'star',
    },
    { kind: 'number', key: 'vl', label: 'Line voltage', quantity: 'voltage', default: 400 },
    { kind: 'number', key: 'il', label: 'Line current', quantity: 'current', default: 10 },
    { kind: 'number', key: 'pf', label: 'Power factor', quantity: 'ratio', default: 0.85, min: 0, max: 1 },
  ],
  outputs: [
    { key: 'p', label: 'Real power P', quantity: 'power', primary: true },
    { key: 's', label: 'Apparent power S', quantity: 'ratio', unitLabel: 'VA' },
    { key: 'q', label: 'Reactive power Q', quantity: 'ratio', unitLabel: 'var' },
    { key: 'phi', label: 'Phase angle', quantity: 'angle' },
    { key: 'vphase', label: 'Phase voltage', quantity: 'voltage' },
    { key: 'iphase', label: 'Phase current', quantity: 'current' },
  ],
  compute: (v) => {
    const conn = str(v, 'conn');
    const vl = num(v, 'vl');
    const il = num(v, 'il');
    const pf = Math.min(Math.max(num(v, 'pf'), -1), 1);
    const s = Math.sqrt(3) * vl * il;
    const phi = (Math.acos(pf) * 180) / Math.PI;
    return {
      p: s * pf,
      s,
      q: s * Math.sqrt(1 - pf * pf),
      phi,
      vphase: conn === 'star' ? vl / Math.sqrt(3) : vl,
      iphase: conn === 'star' ? il : il / Math.sqrt(3),
    };
  },
  assumptions: [
    'Assumes a balanced load and sinusoidal supply.',
    'Harmonics add distortion power that this simple model does not capture; the true power factor is then lower than cos φ.',
  ],
});

export const transformer = single({
  id: 'transformer',
  title: 'Transformer Ratios',
  category: 'ac',
  summary:
    'Turns ratio worked through to secondary voltage, current and reflected impedance.',
  tags: ['transformer', 'turns ratio', 'impedance matching', 'balun', 'winding'],
  formula:
    '\\dfrac{V_s}{V_p} = \\dfrac{N_s}{N_p} \\qquad \\dfrac{Z_p}{Z_s} = \\left(\\dfrac{N_p}{N_s}\\right)^2',
  fields: [
    { kind: 'number', key: 'np', label: 'Primary turns', quantity: 'count', default: 100 },
    { kind: 'number', key: 'ns', label: 'Secondary turns', quantity: 'count', default: 25 },
    { kind: 'number', key: 'vp', label: 'Primary voltage', quantity: 'voltage', default: 230 },
    { kind: 'number', key: 'zs', label: 'Secondary load impedance', quantity: 'resistance', default: 8 },
    { kind: 'number', key: 'eff', label: 'Efficiency', quantity: 'percent', default: 95 },
  ],
  outputs: [
    { key: 'vs', label: 'Secondary voltage', quantity: 'voltage', primary: true },
    { key: 'ratio', label: 'Turns ratio Np:Ns', quantity: 'ratio' },
    { key: 'zp', label: 'Impedance seen at primary', quantity: 'resistance' },
    { key: 'is', label: 'Secondary current', quantity: 'current' },
    { key: 'ip', label: 'Primary current', quantity: 'current' },
    { key: 'ps', label: 'Power delivered to load', quantity: 'power' },
    { key: 'pp', label: 'Power drawn from source', quantity: 'power' },
  ],
  compute: (v) => {
    const np = num(v, 'np');
    const ns = num(v, 'ns');
    const vp = num(v, 'vp');
    const zs = num(v, 'zs');
    const eff = Math.min(Math.max(num(v, 'eff') / 100, 0.01), 1);
    const n = np / ns;
    const vs = vp / n;
    const is = vs / zs;
    const ps = vs * is;
    const pp = ps / eff;
    return { vs, ratio: n, zp: zs * n * n, is, ip: pp / vp, ps, pp };
  },
  assumptions: [
    'Ideal coupling. Leakage inductance, core loss and winding resistance are folded into the efficiency figure only.',
    'Valid at the transformer’s design frequency — a 50 Hz mains transformer behaves very differently at 50 kHz.',
  ],
});

export const powerFactorCorrection = single({
  id: 'power-factor-correction',
  title: 'Power Factor Correction',
  category: 'ac',
  summary:
    'Capacitance needed to raise the power factor of an inductive load to a target value, single- or three-phase.',
  tags: ['power factor', 'correction', 'capacitor', 'kvar', 'reactive power'],
  formula: 'Q_C = P(\\tan\\varphi_1 - \\tan\\varphi_2)',
  fields: [
    {
      kind: 'select',
      key: 'phases',
      label: 'System',
      options: [
        { value: '1', label: 'Single-phase' },
        { value: '3', label: 'Three-phase (delta-connected caps)' },
      ],
      default: '1',
    },
    { kind: 'number', key: 'p', label: 'Real power', quantity: 'power', default: 5, defaultUnit: 'kW' },
    { kind: 'number', key: 'v', label: 'Line voltage', quantity: 'voltage', default: 230 },
    { kind: 'number', key: 'f', label: 'Supply frequency', quantity: 'frequency', default: 50 },
    { kind: 'number', key: 'pf1', label: 'Present power factor', quantity: 'ratio', default: 0.7, min: 0.01, max: 1 },
    { kind: 'number', key: 'pf2', label: 'Target power factor', quantity: 'ratio', default: 0.95, min: 0.01, max: 1 },
  ],
  outputs: [
    { key: 'c', label: 'Capacitance required', quantity: 'capacitance', primary: true },
    { key: 'qc', label: 'Reactive power to supply', quantity: 'ratio', unitLabel: 'var' },
    { key: 's1', label: 'Apparent power before', quantity: 'ratio', unitLabel: 'VA' },
    { key: 's2', label: 'Apparent power after', quantity: 'ratio', unitLabel: 'VA' },
    { key: 'i1', label: 'Line current before', quantity: 'current' },
    { key: 'i2', label: 'Line current after', quantity: 'current' },
  ],
  compute: (v) => {
    const three = str(v, 'phases') === '3';
    const p = num(v, 'p');
    const vv = num(v, 'v');
    const f = num(v, 'f');
    const pf1 = Math.min(Math.max(num(v, 'pf1'), 0.01), 1);
    const pf2 = Math.min(Math.max(num(v, 'pf2'), 0.01), 1);
    const tan = (pf: number) => Math.tan(Math.acos(pf));
    const qc = p * (tan(pf1) - tan(pf2));
    const s1 = p / pf1;
    const s2 = p / pf2;
    // Three-phase: the bank is split across three delta-connected capacitors.
    const c = three
      ? qc / (3 * 2 * Math.PI * f * vv * vv)
      : qc / (2 * Math.PI * f * vv * vv);
    return {
      c,
      qc,
      s1,
      s2,
      i1: three ? s1 / (Math.sqrt(3) * vv) : s1 / vv,
      i2: three ? s2 / (Math.sqrt(3) * vv) : s2 / vv,
    };
  },
  assumptions: [
    'The three-phase result is the capacitance of each of the three delta-connected capacitors.',
    'Correcting past unity makes the load capacitive and can resonate with supply inductance — leave margin.',
  ],
});

export const acCalculators: CalculatorDef[] = [
  rmsPeak,
  reactance,
  seriesRlc,
  lcResonance,
  qBandwidth,
  rcFilter,
  dbConverter,
  threePhase,
  transformer,
  powerFactorCorrection,
];
