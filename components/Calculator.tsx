'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { getCalculator } from '@/calculators';
import { quantityOf, unitFactor } from '@/lib/units';
import { formatNumber, formatQuantity } from '@/lib/format';
import { copyMarkdown, downloadPdf, type Report, type ReportRow } from '@/lib/export';
import type { ComputeInput, Field } from '@/lib/calculator-types';

type FieldState = { raw: string; unit: string };

type Props = {
  id: string;
  /** Mode id -> KaTeX HTML, rendered on the server. */
  formulas: Record<string, string>;
  /** Rendered standalone rather than embedded in a wiki page. */
  standalone?: boolean;
};

function initialState(fields: Field[]): Record<string, FieldState> {
  const state: Record<string, FieldState> = {};
  for (const f of fields) {
    if (f.kind === 'select') {
      state[f.key] = { raw: f.default, unit: '' };
    } else if (f.kind === 'list') {
      const unit = f.defaultUnit ?? quantityOf(f.quantity).base;
      state[f.key] = { raw: f.default.join(', '), unit };
    } else {
      const unit = f.defaultUnit ?? quantityOf(f.quantity).base;
      state[f.key] = { raw: String(f.default), unit };
    }
  }
  return state;
}

export default function Calculator({ id, formulas, standalone = false }: Props) {
  const def = getCalculator(id);
  const [modeIndex, setModeIndex] = useState(0);
  const mode = def?.modes[Math.min(modeIndex, (def?.modes.length ?? 1) - 1)];

  const [state, setState] = useState<Record<string, FieldState>>(() =>
    mode ? initialState(mode.fields) : {}
  );
  const [copied, setCopied] = useState<'idle' | 'done' | 'failed'>('idle');
  const [showAssumptions, setShowAssumptions] = useState(false);

  // Reset the inputs whenever the mode changes — each mode has its own fields.
  useEffect(() => {
    if (mode) setState(initialState(mode.fields));
  }, [mode]);

  useEffect(() => {
    if (copied === 'idle') return;
    const t = setTimeout(() => setCopied('idle'), 2200);
    return () => clearTimeout(t);
  }, [copied]);

  const computeInput: ComputeInput = useMemo(() => {
    if (!mode) return {};
    const v: ComputeInput = {};
    for (const f of mode.fields) {
      const s = state[f.key];
      if (!s) continue;
      if (f.kind === 'select') {
        v[f.key] = s.raw;
      } else if (f.kind === 'list') {
        const factor = unitFactor(f.quantity, s.unit);
        v[f.key] = s.raw
          .split(',')
          .map((part) => Number(part.trim()) * factor)
          .filter((n) => isFinite(n))
          .join(',');
      } else {
        const factor = unitFactor(f.quantity, s.unit);
        v[f.key] = Number(s.raw) * factor;
      }
    }
    return v;
  }, [mode, state]);

  const results = useMemo(() => {
    if (!mode) return {};
    try {
      return mode.compute(computeInput);
    } catch {
      return {};
    }
  }, [mode, computeInput]);

  const formatOutputValue = useCallback(
    (outKey: string) => {
      if (!mode) return '—';
      const out = mode.outputs.find((o) => o.key === outKey);
      if (!out) return '—';
      const value = results[outKey];
      if (value === null || value === undefined) return '—';
      if (typeof value === 'string') return value;
      if (!isFinite(value)) return value > 0 ? '∞' : '−∞';

      if (out.unitLabel) {
        return `${formatNumber(value, out.digits ?? 4)} ${out.unitLabel}`;
      }
      if (out.quantity) {
        return formatQuantity(value, out.quantity, out.digits ?? 4).text;
      }
      return formatNumber(value, out.digits ?? 4);
    },
    [mode, results]
  );

  const buildReport = useCallback((): Report | null => {
    if (!def || !mode) return null;
    const inputs: ReportRow[] = mode.fields.map((f) => {
      const s = state[f.key];
      if (f.kind === 'select') {
        const label = f.options.find((o) => o.value === s?.raw)?.label ?? s?.raw ?? '';
        return { label: f.label, value: label };
      }
      return { label: f.label, value: `${s?.raw ?? ''} ${s?.unit ?? ''}`.trim() };
    });

    const outputs: ReportRow[] = mode.outputs.map((o) => ({
      label: o.label,
      value: formatOutputValue(o.key),
      note: o.note,
      primary: o.primary,
    }));

    const url =
      typeof window !== 'undefined'
        ? window.location.origin + window.location.pathname
        : `/calculators/${def.id}`;

    return {
      title: def.title,
      mode: def.modes.length > 1 ? mode.label : undefined,
      summary: def.summary,
      url,
      inputs,
      outputs,
      assumptions: def.assumptions,
    };
  }, [def, mode, state, formatOutputValue]);

  if (!def || !mode) {
    return (
      <div className="my-6 rounded-lg border border-dashed border-line bg-raised/50 p-4 text-sm text-muted">
        Calculator <code className="font-mono">{id}</code> not found.
      </div>
    );
  }

  const primary = mode.outputs.filter((o) => o.primary);
  const secondary = mode.outputs.filter((o) => !o.primary);

  return (
    <section
      className={`not-prose my-7 overflow-hidden rounded-xl border border-line bg-surface shadow-sm ${
        standalone ? '' : 'scroll-mt-24'
      }`}
      id={`calc-${def.id}`}
    >
      {/* ---- Header ---------------------------------------------------- */}
      <header className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b border-line bg-raised/60 px-4 py-3 sm:px-5">
        <div className="min-w-0">
          <h3 className="text-[0.95rem] font-semibold tracking-tight text-ink">{def.title}</h3>
          {standalone && (
            <p className="mt-0.5 text-[0.82rem] leading-snug text-muted">{def.summary}</p>
          )}
        </div>
        <span className="shrink-0 font-mono text-[0.68rem] uppercase tracking-wider text-faint">
          calculator
        </span>
      </header>

      {/* ---- Mode tabs ------------------------------------------------- */}
      {def.modes.length > 1 && (
        <div className="scroll-slim flex gap-1 overflow-x-auto border-b border-line px-3 py-2 sm:px-4">
          {def.modes.map((m, i) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setModeIndex(i)}
              aria-pressed={i === modeIndex}
              className={`shrink-0 rounded-md px-2.5 py-1 text-[0.8rem] font-medium transition-colors ${
                i === modeIndex
                  ? 'bg-accent-soft text-accent'
                  : 'text-muted hover:bg-raised hover:text-ink'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      )}

      {/* ---- Formula --------------------------------------------------- */}
      {formulas[mode.id] && (
        <div
          className="scroll-slim overflow-x-auto border-b border-line bg-bg/60 px-4 py-3 text-center sm:px-5"
          dangerouslySetInnerHTML={{ __html: formulas[mode.id] }}
        />
      )}

      <div className="grid gap-px bg-line/60 md:grid-cols-2">
        {/* ---- Inputs -------------------------------------------------- */}
        <div className="bg-surface p-4 sm:p-5">
          <h4 className="mb-3 font-mono text-[0.68rem] uppercase tracking-wider text-faint">
            Inputs
          </h4>
          <div className="space-y-3.5">
            {mode.fields.map((f) => (
              <FieldRow
                key={f.key}
                field={f}
                state={state[f.key] ?? { raw: '', unit: '' }}
                onChange={(next) => setState((prev) => ({ ...prev, [f.key]: next }))}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setState(initialState(mode.fields))}
            className="mt-4 text-[0.78rem] text-muted underline decoration-line underline-offset-2 transition-colors hover:text-ink"
          >
            Reset to defaults
          </button>
        </div>

        {/* ---- Results ------------------------------------------------- */}
        <div className="bg-surface p-4 sm:p-5">
          <h4 className="mb-3 font-mono text-[0.68rem] uppercase tracking-wider text-faint">
            Results
          </h4>

          {primary.map((o) => (
            <div key={o.key} className="mb-4 rounded-lg border border-accent/25 bg-accent-soft px-3.5 py-3">
              <div className="text-[0.78rem] font-medium text-accent/90">{o.label}</div>
              <div className="mt-0.5 break-words font-mono text-[1.45rem] font-semibold leading-tight tracking-tight text-accent">
                {formatOutputValue(o.key)}
              </div>
              {o.note && <div className="mt-1 text-[0.72rem] text-accent/70">{o.note}</div>}
            </div>
          ))}

          <dl className="space-y-0">
            {secondary.map((o) => (
              <div
                key={o.key}
                className="flex items-baseline justify-between gap-3 border-b border-line/60 py-[0.44rem] last:border-b-0"
              >
                <dt className="min-w-0 text-[0.84rem] leading-snug text-muted">
                  {o.label}
                  {o.note && (
                    <span className="ml-1.5 text-[0.72rem] text-faint">({o.note})</span>
                  )}
                </dt>
                <dd className="shrink-0 whitespace-nowrap font-mono text-[0.88rem] tabular-nums text-ink">
                  {formatOutputValue(o.key)}
                </dd>
              </div>
            ))}
          </dl>

          {/* ---- Export ------------------------------------------------ */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="btn btn-accent"
              onClick={() => {
                const report = buildReport();
                if (report) void downloadPdf(report);
              }}
            >
              <PdfIcon />
              Export PDF
            </button>
            <button
              type="button"
              className="btn"
              onClick={async () => {
                const report = buildReport();
                if (!report) return;
                setCopied((await copyMarkdown(report)) ? 'done' : 'failed');
              }}
            >
              <CopyIcon />
              {copied === 'done' ? 'Copied' : copied === 'failed' ? 'Copy failed' : 'Copy Markdown'}
            </button>
          </div>
        </div>
      </div>

      {/* ---- Assumptions ---------------------------------------------- */}
      {def.assumptions && def.assumptions.length > 0 && (
        <div className="border-t border-line bg-raised/40 px-4 py-2.5 sm:px-5">
          <button
            type="button"
            onClick={() => setShowAssumptions((s) => !s)}
            aria-expanded={showAssumptions}
            className="flex w-full items-center gap-1.5 text-left text-[0.78rem] font-medium text-muted transition-colors hover:text-ink"
          >
            <svg
              viewBox="0 0 12 12"
              className={`h-2.5 w-2.5 shrink-0 transition-transform ${showAssumptions ? 'rotate-90' : ''}`}
              aria-hidden="true"
            >
              <path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Assumptions &amp; caveats
            <span className="text-faint">({def.assumptions.length})</span>
          </button>
          {showAssumptions && (
            <ul className="mt-2 space-y-1.5 pl-4 text-[0.8rem] leading-relaxed text-muted">
              {def.assumptions.map((a, i) => (
                <li key={i} className="list-disc marker:text-faint">
                  {a}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */

function FieldRow({
  field,
  state,
  onChange,
}: {
  field: Field;
  state: FieldState;
  onChange: (next: FieldState) => void;
}) {
  const inputId = `f-${field.key}-${field.label.replace(/\W+/g, '')}`;

  if (field.kind === 'select') {
    return (
      <div>
        <label htmlFor={inputId} className="mb-1 block text-[0.82rem] font-medium text-ink/85">
          {field.label}
        </label>
        <select
          id={inputId}
          className="field-select"
          value={state.raw}
          onChange={(e) => onChange({ ...state, raw: e.target.value })}
        >
          {field.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {field.help && <p className="mt-1 text-[0.72rem] leading-snug text-faint">{field.help}</p>}
      </div>
    );
  }

  const quantity = quantityOf(field.quantity);
  const showUnits = quantity.units.length > 1;
  const isList = field.kind === 'list';
  const numeric = !isList && state.raw.trim() !== '' && !isFinite(Number(state.raw));

  return (
    <div>
      <label htmlFor={inputId} className="mb-1 block text-[0.82rem] font-medium text-ink/85">
        {field.label}
      </label>
      <div className="flex">
        <input
          id={inputId}
          type={isList ? 'text' : 'number'}
          inputMode={isList ? 'text' : 'decimal'}
          step="any"
          className={`field-input ${showUnits ? '' : 'rounded-r-md'} ${
            numeric ? 'border-red-400/70' : ''
          }`}
          value={state.raw}
          onChange={(e) => onChange({ ...state, raw: e.target.value })}
          aria-invalid={numeric || undefined}
        />
        {showUnits ? (
          <select
            className="field-unit"
            value={state.unit}
            onChange={(e) => onChange({ ...state, unit: e.target.value })}
            aria-label={`Unit for ${field.label}`}
          >
            {quantity.units.map((u) => (
              <option key={u.symbol} value={u.symbol}>
                {u.symbol}
              </option>
            ))}
          </select>
        ) : quantity.base ? (
          <span className="field-unit pointer-events-none select-none">{quantity.base}</span>
        ) : null}
      </div>
      {field.help && <p className="mt-1 text-[0.72rem] leading-snug text-faint">{field.help}</p>}
    </div>
  );
}

function PdfIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 1.5v8M5 7l3 3 3-3M2.5 12.5v1a1 1 0 001 1h9a1 1 0 001-1v-1" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.2" />
      <path d="M10.5 3.5v-1a1 1 0 00-1-1h-7a1 1 0 00-1 1v7a1 1 0 001 1h1" />
    </svg>
  );
}
