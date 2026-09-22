import {
  single,
  num,
  str,
  list,
  type CalculatorDef,
} from '@/lib/calculator-types';

export const ohmsLaw: CalculatorDef = {
  id: 'ohms-law',
  title: "Ohm's Law",
  category: 'fundamentals',
  summary:
    'Relate voltage, current and resistance — and get the dissipated power for free. Pick which quantity you are solving for.',
  tags: ['ohm', 'voltage', 'current', 'resistance', 'power', 'V=IR'],
  modes: [
    {
      id: 'voltage',
      label: 'Solve for voltage',
      formula: 'V = I \\cdot R',
      fields: [
        { kind: 'number', key: 'i', label: 'Current', quantity: 'current', default: 100, defaultUnit: 'mA' },
        { kind: 'number', key: 'r', label: 'Resistance', quantity: 'resistance', default: 220 },
      ],
      outputs: [
        { key: 'v', label: 'Voltage', quantity: 'voltage', primary: true },
        { key: 'p', label: 'Power dissipated', quantity: 'power' },
      ],
      compute: (v) => {
        const i = num(v, 'i');
        const r = num(v, 'r');
        return { v: i * r, p: i * i * r };
      },
    },
    {
      id: 'current',
      label: 'Solve for current',
      formula: 'I = \\dfrac{V}{R}',
      fields: [
        { kind: 'number', key: 'v', label: 'Voltage', quantity: 'voltage', default: 5 },
        { kind: 'number', key: 'r', label: 'Resistance', quantity: 'resistance', default: 220 },
      ],
      outputs: [
        { key: 'i', label: 'Current', quantity: 'current', primary: true },
        { key: 'p', label: 'Power dissipated', quantity: 'power' },
      ],
      compute: (v) => {
        const vv = num(v, 'v');
        const r = num(v, 'r');
        return { i: vv / r, p: (vv * vv) / r };
      },
    },
    {
      id: 'resistance',
      label: 'Solve for resistance',
      formula: 'R = \\dfrac{V}{I}',
      fields: [
        { kind: 'number', key: 'v', label: 'Voltage', quantity: 'voltage', default: 5 },
        { kind: 'number', key: 'i', label: 'Current', quantity: 'current', default: 20, defaultUnit: 'mA' },
      ],
      outputs: [
        { key: 'r', label: 'Resistance', quantity: 'resistance', primary: true },
        { key: 'p', label: 'Power dissipated', quantity: 'power' },
      ],
      compute: (v) => {
        const vv = num(v, 'v');
        const i = num(v, 'i');
        return { r: vv / i, p: vv * i };
      },
    },
  ],
  assumptions: [
    'Assumes a linear, ohmic resistance at a constant temperature.',
    'For AC circuits, substitute impedance Z for R and use RMS values.',
  ],
};

export const dcPower: CalculatorDef = {
  id: 'dc-power',
  title: 'DC Power',
  category: 'fundamentals',
  summary:
    'Power from any two of voltage, current and resistance, plus the energy consumed over a chosen period.',
  tags: ['power', 'watts', 'energy', 'dissipation'],
  modes: [
    {
      id: 'vi',
      label: 'From voltage and current',
      formula: 'P = V \\cdot I',
      fields: [
        { kind: 'number', key: 'v', label: 'Voltage', quantity: 'voltage', default: 12 },
        { kind: 'number', key: 'i', label: 'Current', quantity: 'current', default: 500, defaultUnit: 'mA' },
        { kind: 'number', key: 't', label: 'Over a period of', quantity: 'time', default: 3600 },
      ],
      outputs: [
        { key: 'p', label: 'Power', quantity: 'power', primary: true },
        { key: 'r', label: 'Equivalent resistance', quantity: 'resistance' },
        { key: 'e', label: 'Energy consumed', quantity: 'energy' },
      ],
      compute: (v) => {
        const vv = num(v, 'v');
        const i = num(v, 'i');
        const t = num(v, 't');
        const p = vv * i;
        return { p, r: vv / i, e: p * t };
      },
    },
    {
      id: 'ir',
      label: 'From current and resistance',
      formula: 'P = I^2 R',
      fields: [
        { kind: 'number', key: 'i', label: 'Current', quantity: 'current', default: 500, defaultUnit: 'mA' },
        { kind: 'number', key: 'r', label: 'Resistance', quantity: 'resistance', default: 24 },
        { kind: 'number', key: 't', label: 'Over a period of', quantity: 'time', default: 3600 },
      ],
      outputs: [
        { key: 'p', label: 'Power', quantity: 'power', primary: true },
        { key: 'v', label: 'Voltage across', quantity: 'voltage' },
        { key: 'e', label: 'Energy consumed', quantity: 'energy' },
      ],
      compute: (v) => {
        const i = num(v, 'i');
        const r = num(v, 'r');
        const t = num(v, 't');
        const p = i * i * r;
        return { p, v: i * r, e: p * t };
      },
    },
    {
      id: 'vr',
      label: 'From voltage and resistance',
      formula: 'P = \\dfrac{V^2}{R}',
      fields: [
        { kind: 'number', key: 'v', label: 'Voltage', quantity: 'voltage', default: 12 },
        { kind: 'number', key: 'r', label: 'Resistance', quantity: 'resistance', default: 24 },
        { kind: 'number', key: 't', label: 'Over a period of', quantity: 'time', default: 3600 },
      ],
      outputs: [
        { key: 'p', label: 'Power', quantity: 'power', primary: true },
        { key: 'i', label: 'Current', quantity: 'current' },
        { key: 'e', label: 'Energy consumed', quantity: 'energy' },
      ],
      compute: (v) => {
        const vv = num(v, 'v');
        const r = num(v, 'r');
        const t = num(v, 't');
        const p = (vv * vv) / r;
        return { p, i: vv / r, e: p * t };
      },
    },
  ],
  assumptions: ['DC or, with RMS values and a purely resistive load, AC.'],
};

export const resistorNetwork = single({
  id: 'resistor-network',
  title: 'Series & Parallel Resistors',
  category: 'fundamentals',
  summary:
    'Combine any number of resistors in series or in parallel. Also works for inductors; for capacitors the two rules swap over.',
  tags: ['series', 'parallel', 'network', 'equivalent resistance'],
  formula: 'R_{s} = \\sum R_i \\qquad \\dfrac{1}{R_p} = \\sum \\dfrac{1}{R_i}',
  fields: [
    {
      kind: 'select',
      key: 'topology',
      label: 'Topology',
      options: [
        { value: 'series', label: 'Series' },
        { value: 'parallel', label: 'Parallel' },
      ],
      default: 'parallel',
    },
    {
      kind: 'list',
      key: 'r',
      label: 'Resistor values',
      quantity: 'resistance',
      default: [100, 220, 470],
      help: 'Comma-separated. All values share the selected unit.',
    },
    {
      kind: 'number',
      key: 'v',
      label: 'Applied voltage',
      quantity: 'voltage',
      default: 5,
      help: 'Used for the current and power figures.',
    },
  ],
  outputs: [
    { key: 'req', label: 'Equivalent resistance', quantity: 'resistance', primary: true },
    { key: 'n', label: 'Resistors combined', quantity: 'count', digits: 3 },
    { key: 'i', label: 'Total current', quantity: 'current' },
    { key: 'p', label: 'Total power', quantity: 'power' },
  ],
  compute: (v) => {
    const rs = list(v, 'r').filter((x) => x > 0);
    const vv = num(v, 'v');
    if (rs.length === 0) return { req: null, n: 0, i: null, p: null };
    const req =
      str(v, 'topology') === 'series'
        ? rs.reduce((a, b) => a + b, 0)
        : 1 / rs.reduce((a, b) => a + 1 / b, 0);
    return { req, n: rs.length, i: vv / req, p: (vv * vv) / req };
  },
  assumptions: ['Ideal resistors; parasitic inductance and capacitance are ignored.'],
});

export const voltageDivider: CalculatorDef = {
  id: 'voltage-divider',
  title: 'Voltage Divider',
  category: 'fundamentals',
  summary:
    'Output voltage of a two-resistor divider, with an optional load resistance so you can see how much the divider sags.',
  tags: ['divider', 'potential divider', 'attenuator', 'bias'],
  modes: [
    {
      id: 'unloaded',
      label: 'Find output voltage',
      formula: 'V_{out} = V_{in}\\,\\dfrac{R_2}{R_1 + R_2}',
      fields: [
        { kind: 'number', key: 'vin', label: 'Input voltage', quantity: 'voltage', default: 12 },
        { kind: 'number', key: 'r1', label: 'R1 (top)', quantity: 'resistance', default: 10, defaultUnit: 'kΩ' },
        { kind: 'number', key: 'r2', label: 'R2 (bottom)', quantity: 'resistance', default: 4.7, defaultUnit: 'kΩ' },
        {
          kind: 'number',
          key: 'rl',
          label: 'Load resistance',
          quantity: 'resistance',
          default: 0,
          defaultUnit: 'kΩ',
          help: 'Leave at 0 for an unloaded divider.',
        },
      ],
      outputs: [
        { key: 'vout', label: 'Output voltage', quantity: 'voltage', primary: true },
        { key: 'ratio', label: 'Division ratio', quantity: 'ratio' },
        { key: 'i', label: 'Quiescent current', quantity: 'current' },
        { key: 'p', label: 'Power in divider', quantity: 'power' },
        { key: 'zout', label: 'Output impedance', quantity: 'resistance', note: 'R1 ∥ R2' },
      ],
      compute: (v) => {
        const vin = num(v, 'vin');
        const r1 = num(v, 'r1');
        const r2 = num(v, 'r2');
        const rl = num(v, 'rl');
        const r2eff = rl > 0 ? (r2 * rl) / (r2 + rl) : r2;
        const vout = vin * (r2eff / (r1 + r2eff));
        const i = vin / (r1 + r2eff);
        return {
          vout,
          ratio: r2eff / (r1 + r2eff),
          i,
          p: vin * i,
          zout: (r1 * r2) / (r1 + r2),
        };
      },
    },
    {
      id: 'solve-r2',
      label: 'Find R2 for a target output',
      formula: 'R_2 = R_1\\,\\dfrac{V_{out}}{V_{in} - V_{out}}',
      fields: [
        { kind: 'number', key: 'vin', label: 'Input voltage', quantity: 'voltage', default: 12 },
        { kind: 'number', key: 'vout', label: 'Wanted output voltage', quantity: 'voltage', default: 3.3 },
        { kind: 'number', key: 'r1', label: 'R1 (top)', quantity: 'resistance', default: 10, defaultUnit: 'kΩ' },
      ],
      outputs: [
        { key: 'r2', label: 'R2 required', quantity: 'resistance', primary: true },
        { key: 'e24', label: 'Nearest E24 value', quantity: 'resistance', note: '5 % series' },
        { key: 'vout_e24', label: 'Output with E24 value', quantity: 'voltage' },
        { key: 'i', label: 'Quiescent current', quantity: 'current' },
      ],
      compute: (v) => {
        const vin = num(v, 'vin');
        const vout = num(v, 'vout');
        const r1 = num(v, 'r1');
        if (vout >= vin) return { r2: null, e24: null, vout_e24: null, i: null };
        const r2 = (r1 * vout) / (vin - vout);
        const e24 = nearestE24(r2);
        return {
          r2,
          e24,
          vout_e24: vin * (e24 / (r1 + e24)),
          i: vin / (r1 + r2),
        };
      },
    },
  ],
  assumptions: [
    'A divider is only a voltage source for loads much larger than R1 ∥ R2.',
    'Real resistors have tolerance: a pair of 5 % parts can shift the output by several percent.',
  ],
};

/** E24 (5 %) preferred values, one decade. */
const E24 = [
  1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6,
  6.2, 6.8, 7.5, 8.2, 9.1,
];

export function nearestE24(value: number): number {
  if (!isFinite(value) || value <= 0) return NaN;
  const decade = Math.floor(Math.log10(value));
  const mant = value / Math.pow(10, decade);
  let best = E24[0];
  let bestErr = Infinity;
  for (const cand of [...E24, 10]) {
    const err = Math.abs(Math.log(cand) - Math.log(mant));
    if (err < bestErr) {
      bestErr = err;
      best = cand;
    }
  }
  return best * Math.pow(10, decade);
}

export const rcTimeConstant = single({
  id: 'rc-time-constant',
  title: 'RC Time Constant',
  category: 'fundamentals',
  summary:
    'Charge and discharge timing of an RC network: the time constant, the time to reach a given percentage, and the settled-state rule of thumb.',
  tags: ['rc', 'time constant', 'tau', 'charging', 'transient', 'debounce'],
  formula: '\\tau = R C \\qquad V(t) = V_f\\left(1 - e^{-t/\\tau}\\right)',
  fields: [
    { kind: 'number', key: 'r', label: 'Resistance', quantity: 'resistance', default: 10, defaultUnit: 'kΩ' },
    { kind: 'number', key: 'c', label: 'Capacitance', quantity: 'capacitance', default: 100, defaultUnit: 'nF' },
    {
      kind: 'number',
      key: 'pct',
      label: 'Target charge level',
      quantity: 'percent',
      default: 90,
      help: 'Percentage of the final voltage.',
    },
  ],
  outputs: [
    { key: 'tau', label: 'Time constant τ', quantity: 'time', primary: true },
    { key: 't_pct', label: 'Time to reach target', quantity: 'time' },
    { key: 't5', label: 'Settled (5τ, 99.3 %)', quantity: 'time' },
    { key: 'fc', label: 'Corner frequency', quantity: 'frequency', note: 'f = 1 / (2πRC)' },
  ],
  compute: (v) => {
    const r = num(v, 'r');
    const c = num(v, 'c');
    const pct = num(v, 'pct');
    const tau = r * c;
    const frac = Math.min(Math.max(pct / 100, 0), 0.999999);
    return {
      tau,
      t_pct: -tau * Math.log(1 - frac),
      t5: 5 * tau,
      fc: 1 / (2 * Math.PI * tau),
    };
  },
  assumptions: [
    'Assumes a step input driven from a source impedance already included in R.',
    'Real capacitors add ESR and dielectric absorption; electrolytics drift widely with temperature.',
  ],
});

export const ledResistor = single({
  id: 'led-resistor',
  title: 'LED Series Resistor',
  category: 'fundamentals',
  summary:
    'Size the current-limiting resistor for an LED, and check the power it will have to dissipate.',
  tags: ['led', 'series resistor', 'current limiting', 'forward voltage'],
  formula: 'R = \\dfrac{V_{supply} - V_f}{I_f}',
  fields: [
    { kind: 'number', key: 'vs', label: 'Supply voltage', quantity: 'voltage', default: 5 },
    {
      kind: 'number',
      key: 'vf',
      label: 'LED forward voltage',
      quantity: 'voltage',
      default: 2.0,
      help: 'Red ≈ 1.8–2.2 V, green/blue/white ≈ 3.0–3.4 V.',
    },
    { kind: 'number', key: 'if', label: 'Forward current', quantity: 'current', default: 20, defaultUnit: 'mA' },
    {
      kind: 'number',
      key: 'n',
      label: 'LEDs in series',
      quantity: 'count',
      default: 1,
    },
  ],
  outputs: [
    { key: 'r', label: 'Resistor required', quantity: 'resistance', primary: true },
    { key: 'e24', label: 'Nearest E24 value', quantity: 'resistance', note: '5 % series' },
    { key: 'i_actual', label: 'Current with E24 value', quantity: 'current' },
    { key: 'pr', label: 'Power in resistor', quantity: 'power' },
    { key: 'pled', label: 'Power in LED(s)', quantity: 'power' },
  ],
  compute: (v) => {
    const vs = num(v, 'vs');
    const vf = num(v, 'vf');
    const i = num(v, 'if');
    const n = Math.max(1, Math.round(num(v, 'n')));
    const headroom = vs - vf * n;
    if (headroom <= 0) return { r: null, e24: null, i_actual: null, pr: null, pled: null };
    const r = headroom / i;
    const e24 = nearestE24(r);
    const iActual = headroom / e24;
    return {
      r,
      e24,
      i_actual: iActual,
      pr: iActual * iActual * e24,
      pled: vf * n * iActual,
    };
  },
  assumptions: [
    'Forward voltage varies with current, temperature and part-to-part spread — treat the result as a starting point.',
    'A series resistor is fine for indicators. For power LEDs use a constant-current driver.',
  ],
});

const COLOR_DIGITS = [
  { value: '0', label: 'Black (0)' },
  { value: '1', label: 'Brown (1)' },
  { value: '2', label: 'Red (2)' },
  { value: '3', label: 'Orange (3)' },
  { value: '4', label: 'Yellow (4)' },
  { value: '5', label: 'Green (5)' },
  { value: '6', label: 'Blue (6)' },
  { value: '7', label: 'Violet (7)' },
  { value: '8', label: 'Grey (8)' },
  { value: '9', label: 'White (9)' },
];

const COLOR_MULT = [
  { value: '-2', label: 'Silver (÷100)' },
  { value: '-1', label: 'Gold (÷10)' },
  { value: '0', label: 'Black (×1)' },
  { value: '1', label: 'Brown (×10)' },
  { value: '2', label: 'Red (×100)' },
  { value: '3', label: 'Orange (×1 k)' },
  { value: '4', label: 'Yellow (×10 k)' },
  { value: '5', label: 'Green (×100 k)' },
  { value: '6', label: 'Blue (×1 M)' },
  { value: '7', label: 'Violet (×10 M)' },
];

const COLOR_TOL = [
  { value: '1', label: 'Brown (±1 %)' },
  { value: '2', label: 'Red (±2 %)' },
  { value: '0.5', label: 'Green (±0.5 %)' },
  { value: '0.25', label: 'Blue (±0.25 %)' },
  { value: '0.1', label: 'Violet (±0.1 %)' },
  { value: '5', label: 'Gold (±5 %)' },
  { value: '10', label: 'Silver (±10 %)' },
];

export const resistorColorCode = single({
  id: 'resistor-color-code',
  title: 'Resistor Colour Code',
  category: 'fundamentals',
  summary:
    'Decode a 4-, 5- or 6-band axial resistor into its value, tolerance and temperature coefficient.',
  tags: ['colour code', 'color code', 'bands', 'axial', 'decode'],
  fields: [
    {
      kind: 'select',
      key: 'bands',
      label: 'Number of bands',
      options: [
        { value: '4', label: '4 bands' },
        { value: '5', label: '5 bands' },
        { value: '6', label: '6 bands' },
      ],
      default: '4',
    },
    { kind: 'select', key: 'b1', label: 'Band 1', options: COLOR_DIGITS, default: '1' },
    { kind: 'select', key: 'b2', label: 'Band 2', options: COLOR_DIGITS, default: '0' },
    {
      kind: 'select',
      key: 'b3',
      label: 'Band 3 (5/6-band only)',
      options: COLOR_DIGITS,
      default: '0',
      help: 'Ignored when 4 bands is selected.',
    },
    { kind: 'select', key: 'mult', label: 'Multiplier', options: COLOR_MULT, default: '2' },
    { kind: 'select', key: 'tol', label: 'Tolerance', options: COLOR_TOL, default: '5' },
  ],
  outputs: [
    { key: 'r', label: 'Resistance', quantity: 'resistance', primary: true },
    { key: 'tol', label: 'Tolerance', quantity: 'percent' },
    { key: 'rmin', label: 'Minimum', quantity: 'resistance' },
    { key: 'rmax', label: 'Maximum', quantity: 'resistance' },
  ],
  compute: (v) => {
    const bands = parseInt(str(v, 'bands'), 10);
    const d1 = parseInt(str(v, 'b1'), 10);
    const d2 = parseInt(str(v, 'b2'), 10);
    const d3 = parseInt(str(v, 'b3'), 10);
    const mult = Math.pow(10, parseInt(str(v, 'mult'), 10));
    const tol = parseFloat(str(v, 'tol'));
    const digits = bands >= 5 ? d1 * 100 + d2 * 10 + d3 : d1 * 10 + d2;
    const r = digits * mult;
    return { r, tol, rmin: r * (1 - tol / 100), rmax: r * (1 + tol / 100) };
  },
  assumptions: [
    'Read the bands with the tolerance band (gold, silver or a wider band) on the right.',
    'A 6th band gives the temperature coefficient in ppm/K and does not affect the value.',
  ],
});

/** AWG -> diameter in metres. d = 0.127 mm * 92^((36-n)/39) */
export function awgDiameter(awg: number): number {
  return 0.000127 * Math.pow(92, (36 - awg) / 39);
}

export const awgWire = single({
  id: 'awg-wire',
  title: 'Wire Gauge & Voltage Drop',
  category: 'fundamentals',
  summary:
    'Diameter, cross-section and resistance of an AWG conductor, plus the voltage drop and loss over a run at a given current.',
  tags: ['awg', 'wire', 'gauge', 'voltage drop', 'ampacity', 'copper'],
  formula: 'd = 0.127\\,\\text{mm} \\times 92^{(36-n)/39} \\qquad R = \\rho \\dfrac{l}{A}',
  fields: [
    { kind: 'number', key: 'awg', label: 'AWG', quantity: 'count', default: 18, min: -3, max: 40 },
    {
      kind: 'select',
      key: 'material',
      label: 'Conductor',
      options: [
        { value: 'cu', label: 'Copper' },
        { value: 'al', label: 'Aluminium' },
      ],
      default: 'cu',
    },
    {
      kind: 'number',
      key: 'len',
      label: 'One-way run length',
      quantity: 'length',
      default: 10,
      help: 'Resistance and drop are doubled to account for the return conductor.',
    },
    { kind: 'number', key: 'i', label: 'Current', quantity: 'current', default: 5 },
    { kind: 'number', key: 'vsys', label: 'System voltage', quantity: 'voltage', default: 12 },
  ],
  outputs: [
    { key: 'd', label: 'Conductor diameter', quantity: 'length', primary: true },
    { key: 'a', label: 'Cross-sectional area', quantity: 'ratio', unitLabel: 'mm²' },
    { key: 'rperkm', label: 'Resistance per km', quantity: 'ratio', unitLabel: 'Ω/km', note: 'single conductor' },
    { key: 'rloop', label: 'Loop resistance', quantity: 'resistance', note: 'out and back' },
    { key: 'vdrop', label: 'Voltage drop', quantity: 'voltage' },
    { key: 'vdrop_pct', label: 'Drop as percentage', quantity: 'percent' },
    { key: 'ploss', label: 'Power lost in cable', quantity: 'power' },
  ],
  compute: (v) => {
    const awg = num(v, 'awg');
    const rho = str(v, 'material') === 'al' ? 2.82e-8 : 1.724e-8; // Ω·m at 20 °C
    const len = num(v, 'len');
    const i = num(v, 'i');
    const vsys = num(v, 'vsys');
    const d = awgDiameter(awg);
    const a = Math.PI * Math.pow(d / 2, 2); // m²
    const rPerM = rho / a;
    const rLoop = rPerM * len * 2;
    const vdrop = i * rLoop;
    return {
      d,
      a: a * 1e6,
      rperkm: rPerM * 1000,
      rloop: rLoop,
      vdrop,
      vdrop_pct: (vdrop / vsys) * 100,
      ploss: i * i * rLoop,
    };
  },
  assumptions: [
    'Resistivity is quoted at 20 °C; copper rises about 0.4 % per kelvin.',
    'Solid conductor DC resistance. Stranded wire is a few percent higher, and at RF the skin effect dominates.',
    'Ampacity depends on insulation, bundling and ambient temperature — consult the relevant standard rather than guessing from resistance alone.',
  ],
});

export const pcbTraceWidth = single({
  id: 'pcb-trace-width',
  title: 'PCB Trace Width',
  category: 'fundamentals',
  summary:
    'Trace width needed to carry a current within a chosen temperature rise, using the IPC-2221 curves, plus the resistance and drop of the finished trace.',
  tags: ['pcb', 'trace width', 'ipc-2221', 'current', 'copper weight', 'temperature rise'],
  formula: 'A = \\left(\\dfrac{I}{k\\,\\Delta T^{0.44}}\\right)^{1/0.725}',
  fields: [
    { kind: 'number', key: 'i', label: 'Current', quantity: 'current', default: 2 },
    {
      kind: 'select',
      key: 'layer',
      label: 'Trace location',
      options: [
        { value: 'external', label: 'External layer' },
        { value: 'internal', label: 'Internal layer' },
      ],
      default: 'external',
    },
    {
      kind: 'number',
      key: 'dt',
      label: 'Allowed temperature rise',
      quantity: 'temperature',
      default: 10,
      help: 'In kelvin above ambient. 10–20 K is common.',
    },
    {
      kind: 'number',
      key: 'oz',
      label: 'Copper weight',
      quantity: 'ratio',
      default: 1,
      help: 'In oz/ft². 1 oz ≈ 35 µm finished thickness.',
    },
    { kind: 'number', key: 'len', label: 'Trace length', quantity: 'length', default: 50, defaultUnit: 'mm' },
  ],
  outputs: [
    { key: 'w_mm', label: 'Trace width required', quantity: 'length', primary: true },
    { key: 'w_mil', label: 'Trace width', quantity: 'ratio', unitLabel: 'mil' },
    { key: 'thickness', label: 'Copper thickness', quantity: 'length' },
    { key: 'r', label: 'Trace resistance', quantity: 'resistance' },
    { key: 'vdrop', label: 'Voltage drop', quantity: 'voltage' },
    { key: 'ploss', label: 'Power dissipated in trace', quantity: 'power' },
  ],
  compute: (v) => {
    const i = num(v, 'i');
    const k = str(v, 'layer') === 'internal' ? 0.024 : 0.048;
    const dt = num(v, 'dt');
    const oz = num(v, 'oz');
    const len = num(v, 'len');
    if (i <= 0 || dt <= 0 || oz <= 0) {
      return { w_mm: null, w_mil: null, thickness: null, r: null, vdrop: null, ploss: null };
    }
    // IPC-2221 gives the required cross-section in square mils.
    const areaMils2 = Math.pow(i / (k * Math.pow(dt, 0.44)), 1 / 0.725);
    const thicknessMils = oz * 1.378;
    const widthMils = areaMils2 / thicknessMils;
    const widthM = widthMils * 2.54e-5;
    const thicknessM = thicknessMils * 2.54e-5;
    const r = (1.724e-8 * len) / (widthM * thicknessM);
    return {
      w_mm: widthM,
      w_mil: widthMils,
      thickness: thicknessM,
      r,
      vdrop: i * r,
      ploss: i * i * r,
    };
  },
  assumptions: [
    'IPC-2221 is a conservative, empirically derived guideline for a trace in still air with no nearby heat sources.',
    'Assumes the copper weight is the finished thickness after plating.',
    'For high-current or tightly packed boards, thermal simulation beats any closed-form curve.',
  ],
});

export const fundamentalsCalculators: CalculatorDef[] = [
  ohmsLaw,
  dcPower,
  resistorNetwork,
  voltageDivider,
  rcTimeConstant,
  ledResistor,
  resistorColorCode,
  awgWire,
  pcbTraceWidth,
];
