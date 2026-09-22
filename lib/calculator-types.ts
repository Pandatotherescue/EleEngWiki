import type { QuantityKey } from './units';

/** A numeric input with a unit dropdown. Value reaches compute() in base SI. */
export type NumberField = {
  kind: 'number';
  key: string;
  label: string;
  quantity: QuantityKey;
  /** Default value expressed in `defaultUnit`. */
  default: number;
  /** Unit symbol pre-selected in the dropdown. Defaults to the base unit. */
  defaultUnit?: string;
  /** Inclusive bounds, in base SI units. Violations surface as a warning. */
  min?: number;
  max?: number;
  help?: string;
};

/** A discrete choice. Reaches compute() as a string. */
export type SelectField = {
  kind: 'select';
  key: string;
  label: string;
  options: { value: string; label: string }[];
  default: string;
  help?: string;
};

/**
 * A comma-separated list of numbers sharing one unit — component networks,
 * cascade stages and the like. compute() receives the base-SI values joined
 * by commas; use `list()` to read it back as number[].
 */
export type ListField = {
  kind: 'list';
  key: string;
  label: string;
  quantity: QuantityKey;
  /** Defaults expressed in `defaultUnit`. */
  default: number[];
  defaultUnit?: string;
  help?: string;
};

export type Field = NumberField | SelectField | ListField;

export type Output = {
  key: string;
  label: string;
  /** Format the value with this quantity's units and prefixes. */
  quantity?: QuantityKey;
  /**
   * Overrides the unit shown after the value. Use for compound units that do
   * not warrant their own quantity, e.g. "mm²" or "Ω/km". Only meaningful
   * alongside a non-prefixed quantity such as `ratio`.
   */
  unitLabel?: string;
  /** Significant figures. Default 4. */
  digits?: number;
  /** Shown under the value. */
  note?: string;
  /** Highlight as the headline result. */
  primary?: boolean;
};

export type ComputeInput = Record<string, number | string>;
export type ComputeResult = Record<string, number | string | null>;

/**
 * A calculator can expose several modes — most often "solve for X" variants of
 * the same relationship. Each mode has its own fields, outputs and formula.
 */
export type Mode = {
  id: string;
  label: string;
  /** KaTeX source shown above the inputs. */
  formula?: string;
  fields: Field[];
  outputs: Output[];
  compute: (v: ComputeInput) => ComputeResult;
};

export type CalculatorDef = {
  id: string;
  title: string;
  /** Matches a wiki category id. */
  category: string;
  summary: string;
  tags?: string[];
  modes: Mode[];
  /** Caveats worth stating on the page and in exported reports. */
  assumptions?: string[];
};

/** Convenience for the common single-mode calculator. */
export function single(
  def: Omit<CalculatorDef, 'modes'> & Omit<Mode, 'id' | 'label'>
): CalculatorDef {
  const { fields, outputs, compute, formula, ...rest } = def;
  return {
    ...rest,
    modes: [{ id: 'default', label: 'Default', fields, outputs, compute, formula }],
  };
}

/** Read a numeric field out of the compute input, guarding against NaN. */
export function num(v: ComputeInput, key: string): number {
  const x = v[key];
  return typeof x === 'number' && isFinite(x) ? x : NaN;
}

export function str(v: ComputeInput, key: string): string {
  return String(v[key] ?? '');
}

/** Read a ListField back as an array of finite base-SI numbers. */
export function list(v: ComputeInput, key: string): number[] {
  return String(v[key] ?? '')
    .split(',')
    .map((s) => Number(s.trim()))
    .filter((n) => isFinite(n));
}
