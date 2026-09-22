import { SI_PREFIXES, quantityOf, type QuantityKey } from './units';

/**
 * Round to a number of significant figures without falling into the
 * toPrecision() exponential-notation trap for mid-range values.
 */
export function toSigFigs(value: number, digits: number): number {
  if (!isFinite(value) || value === 0) return value;
  const mag = Math.ceil(Math.log10(Math.abs(value)));
  const power = digits - mag;
  const factor = Math.pow(10, power);
  return Math.round(value * factor) / factor;
}

/** Trim trailing zeros from a fixed-decimal string: "1.500" -> "1.5" */
function trim(s: string): string {
  return s.includes('.') ? s.replace(/0+$/, '').replace(/\.$/, '') : s;
}

/**
 * Format a plain number with `digits` significant figures, falling back to
 * exponential notation only when the value is genuinely out of human range.
 */
export function formatNumber(value: number, digits = 4): string {
  if (!isFinite(value)) return value > 0 ? '∞' : value < 0 ? '−∞' : 'n/a';
  if (value === 0) return '0';
  const abs = Math.abs(value);
  if (abs >= 1e12 || abs < 1e-12) return value.toExponential(Math.max(0, digits - 1));
  const rounded = toSigFigs(value, digits);
  const mag = Math.floor(Math.log10(Math.abs(rounded)));
  const decimals = Math.max(0, Math.min(12, digits - 1 - mag));
  return trim(rounded.toFixed(decimals));
}

export type FormattedValue = {
  /** Numeric part, already rounded and prefix-scaled. */
  value: string;
  /** Unit including any engineering prefix, e.g. "kΩ". May be empty. */
  unit: string;
  /** "12.5 kΩ" */
  text: string;
};

/**
 * Format a base-SI value using the best engineering prefix for its magnitude.
 * Quantities flagged `autoPrefix: false` (dB, degrees, ratios) are returned
 * with their base symbol untouched.
 */
export function formatQuantity(
  value: number,
  quantity: QuantityKey,
  digits = 4
): FormattedValue {
  const q = quantityOf(quantity);

  if (!isFinite(value)) {
    return { value: value > 0 ? '∞' : '−∞', unit: q.base, text: value > 0 ? '∞' : '−∞' };
  }

  if (!q.autoPrefix || value === 0) {
    const v = formatNumber(value, digits);
    return { value: v, unit: q.base, text: q.base ? `${v} ${q.base}` : v };
  }

  const abs = Math.abs(value);
  // Choose the prefix that puts the mantissa in [1, 1000).
  let chosen = SI_PREFIXES[0];
  for (const p of SI_PREFIXES) {
    if (abs >= Math.pow(10, p.exp)) chosen = p;
  }
  if (abs < Math.pow(10, SI_PREFIXES[0].exp)) chosen = SI_PREFIXES[0];

  const scaled = value / Math.pow(10, chosen.exp);
  const unit = `${chosen.symbol}${q.base}`;
  const v = formatNumber(scaled, digits);
  return { value: v, unit, text: unit ? `${v} ${unit}` : v };
}

/** Human-readable timestamp for exported reports. */
export function timestamp(d = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ` +
    `${pad(d.getHours())}:${pad(d.getMinutes())}`
  );
}
