import type { CalculatorDef } from '@/lib/calculator-types';
import { fundamentalsCalculators } from './fundamentals';
import { acCalculators } from './ac';
import { rfCalculators } from './rf';

export const CATEGORIES = [
  {
    id: 'fundamentals',
    title: 'Fundamentals',
    blurb: 'DC circuits, components and the arithmetic every other page depends on.',
  },
  {
    id: 'ac',
    title: 'AC & Signals',
    blurb: 'Reactance, resonance, filters, decibels and power in alternating-current systems.',
  },
  {
    id: 'rf',
    title: 'RF & Microwave',
    blurb: 'Transmission lines, matching, antennas, noise and propagation.',
  },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]['id'];

export const ALL_CALCULATORS: CalculatorDef[] = [
  ...fundamentalsCalculators,
  ...acCalculators,
  ...rfCalculators,
];

const byId = new Map(ALL_CALCULATORS.map((c) => [c.id, c]));

export function getCalculator(id: string): CalculatorDef | undefined {
  return byId.get(id);
}

export function calculatorsInCategory(category: string): CalculatorDef[] {
  return ALL_CALCULATORS.filter((c) => c.category === category);
}

export function categoryTitle(id: string): string {
  return CATEGORIES.find((c) => c.id === id)?.title ?? id;
}
