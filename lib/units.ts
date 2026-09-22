/**
 * Unit system.
 *
 * Every numeric value that crosses into a calculator's `compute()` is expressed
 * in the SI base unit for its quantity (ohms, volts, hertz, metres, seconds...).
 * The UI is responsible for converting the user's chosen prefix into that base
 * unit, and for converting results back out again. Calculator authors therefore
 * never deal with prefixes.
 */

export type UnitOption = {
  /** Symbol shown in the unit dropdown. */
  symbol: string;
  /** value_in_base = value_as_typed * factor */
  factor: number;
};

export type Quantity = {
  /** SI base unit symbol, used when formatting with an automatic prefix. */
  base: string;
  /** Units offered in the input dropdown. */
  units: UnitOption[];
  /**
   * When true, results are formatted with an automatically chosen engineering
   * prefix (p, n, µ, m, k, M, G...). When false the base symbol is used as-is,
   * which is what you want for dB, degrees, counts and ratios.
   */
  autoPrefix: boolean;
};

const SI = (base: string, extra: UnitOption[] = []): Quantity => ({
  base,
  units: [{ symbol: base, factor: 1 }, ...extra],
  autoPrefix: true,
});

/** Standard engineering prefixes, ordered small to large. */
export const SI_PREFIXES: { symbol: string; exp: number }[] = [
  { symbol: 'f', exp: -15 },
  { symbol: 'p', exp: -12 },
  { symbol: 'n', exp: -9 },
  { symbol: 'µ', exp: -6 },
  { symbol: 'm', exp: -3 },
  { symbol: '', exp: 0 },
  { symbol: 'k', exp: 3 },
  { symbol: 'M', exp: 6 },
  { symbol: 'G', exp: 9 },
  { symbol: 'T', exp: 12 },
];

const p = (prefix: string, base: string, exp: number): UnitOption => ({
  symbol: `${prefix}${base}`,
  factor: Math.pow(10, exp),
});

export const QUANTITIES = {
  resistance: SI('Ω', [p('m', 'Ω', -3), p('k', 'Ω', 3), p('M', 'Ω', 6)]),
  voltage: SI('V', [p('µ', 'V', -6), p('m', 'V', -3), p('k', 'V', 3)]),
  current: SI('A', [p('n', 'A', -9), p('µ', 'A', -6), p('m', 'A', -3), p('k', 'A', 3)]),
  power: SI('W', [
    p('n', 'W', -9),
    p('µ', 'W', -6),
    p('m', 'W', -3),
    p('k', 'W', 3),
    p('M', 'W', 6),
  ]),
  capacitance: SI('F', [p('p', 'F', -12), p('n', 'F', -9), p('µ', 'F', -6), p('m', 'F', -3)]),
  inductance: SI('H', [p('n', 'H', -9), p('µ', 'H', -6), p('m', 'H', -3)]),
  frequency: SI('Hz', [p('k', 'Hz', 3), p('M', 'Hz', 6), p('G', 'Hz', 9)]),
  time: SI('s', [p('p', 's', -12), p('n', 's', -9), p('µ', 's', -6), p('m', 's', -3)]),
  energy: SI('J', [p('µ', 'J', -6), p('m', 'J', -3), p('k', 'J', 3), { symbol: 'Wh', factor: 3600 }]),
  charge: SI('C', [p('p', 'C', -12), p('n', 'C', -9), p('µ', 'C', -6), p('m', 'C', -3)]),

  length: {
    base: 'm',
    units: [
      { symbol: 'm', factor: 1 },
      { symbol: 'mm', factor: 1e-3 },
      { symbol: 'cm', factor: 1e-2 },
      { symbol: 'µm', factor: 1e-6 },
      { symbol: 'km', factor: 1e3 },
      { symbol: 'mil', factor: 2.54e-5 },
      { symbol: 'in', factor: 0.0254 },
      { symbol: 'ft', factor: 0.3048 },
      { symbol: 'mi', factor: 1609.344 },
    ],
    autoPrefix: true,
  } as Quantity,

  // Non-prefixed quantities: the symbol is shown verbatim.
  decibel: { base: 'dB', units: [{ symbol: 'dB', factor: 1 }], autoPrefix: false },
  dBm: { base: 'dBm', units: [{ symbol: 'dBm', factor: 1 }], autoPrefix: false },
  dBW: { base: 'dBW', units: [{ symbol: 'dBW', factor: 1 }], autoPrefix: false },
  dBi: { base: 'dBi', units: [{ symbol: 'dBi', factor: 1 }], autoPrefix: false },
  ratio: { base: '', units: [{ symbol: '', factor: 1 }], autoPrefix: false },
  percent: { base: '%', units: [{ symbol: '%', factor: 1 }], autoPrefix: false },
  angle: {
    base: '°',
    units: [
      { symbol: '°', factor: 1 },
      { symbol: 'rad', factor: 180 / Math.PI },
    ],
    autoPrefix: false,
  } as Quantity,
  temperature: { base: 'K', units: [{ symbol: 'K', factor: 1 }], autoPrefix: false },
  velocity: { base: 'm/s', units: [{ symbol: 'm/s', factor: 1 }], autoPrefix: true },
  count: { base: '', units: [{ symbol: '', factor: 1 }], autoPrefix: false },
} satisfies Record<string, Quantity>;

export type QuantityKey = keyof typeof QUANTITIES;

export function quantityOf(key: QuantityKey): Quantity {
  return QUANTITIES[key] as Quantity;
}

export function unitFactor(key: QuantityKey, symbol: string): number {
  const q = quantityOf(key);
  return q.units.find((u) => u.symbol === symbol)?.factor ?? 1;
}

/** Physical constants used across the calculators. */
export const C0 = 299_792_458; // speed of light in vacuum, m/s
export const MU0 = 4e-7 * Math.PI; // permeability of free space, H/m
export const EPS0 = 1 / (MU0 * C0 * C0); // permittivity of free space, F/m
export const K_BOLTZMANN = 1.380649e-23; // J/K
export const T0_NOISE = 290; // reference noise temperature, K
