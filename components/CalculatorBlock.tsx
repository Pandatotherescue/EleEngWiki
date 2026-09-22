import { getCalculator } from '@/calculators';
import { renderTex } from '@/lib/katex-server';
import Calculator from './Calculator';

/**
 * Server wrapper around the interactive calculator.
 *
 * Its only job is to pre-render each mode's formula with KaTeX so the maths
 * arrives as finished HTML and the KaTeX library never has to reach the
 * browser. The calculator itself is a client component because the compute
 * functions have to run as the user types.
 */
export default function CalculatorBlock({
  id,
  standalone = false,
}: {
  id: string;
  standalone?: boolean;
}) {
  const def = getCalculator(id);

  if (!def) {
    return (
      <div className="my-6 rounded-lg border border-dashed border-line bg-raised/50 p-4 text-sm text-muted">
        Unknown calculator: <code className="font-mono">{id}</code>
      </div>
    );
  }

  const formulas: Record<string, string> = {};
  for (const mode of def.modes) {
    if (mode.formula) formulas[mode.id] = renderTex(mode.formula, true);
  }

  return <Calculator id={id} formulas={formulas} standalone={standalone} />;
}
