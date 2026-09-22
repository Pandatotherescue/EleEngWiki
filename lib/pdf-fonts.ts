import type { jsPDF } from 'jspdf';

/**
 * jsPDF's built-in fonts (Helvetica, Courier) are WinAnsi-encoded. They cannot
 * render Ω, Γ, λ, δ, µ or ° — which appear in most results on this site, and
 * come out as stray punctuation.
 *
 * The fix is to embed a Unicode font. These are subsets of DejaVu Sans and
 * DejaVu Sans Mono cut down to Latin, Greek and the mathematical symbols the
 * calculators actually produce; see public/fonts/LICENSE.txt. They are fetched
 * only when someone exports, and cached for the rest of the session.
 */

export const PDF_SANS = 'EEWSans';
export const PDF_MONO = 'EEWMono';

const FILES = [
  { file: 'eew-sans-normal.ttf', family: PDF_SANS, style: 'normal' },
  { file: 'eew-sans-bold.ttf', family: PDF_SANS, style: 'bold' },
  { file: 'eew-mono-normal.ttf', family: PDF_MONO, style: 'normal' },
  { file: 'eew-mono-bold.ttf', family: PDF_MONO, style: 'bold' },
] as const;

type Loaded = { file: string; family: string; style: string; base64: string };

let cache: Promise<Loaded[]> | null = null;

function toBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  // Chunked to avoid blowing the argument limit on String.fromCharCode.
  let binary = '';
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(binary);
}

async function loadFonts(): Promise<Loaded[]> {
  const results = await Promise.all(
    FILES.map(async (f) => {
      const res = await fetch(`/fonts/${f.file}`);
      if (!res.ok) throw new Error(`font ${f.file}: HTTP ${res.status}`);
      return { ...f, base64: toBase64(await res.arrayBuffer()) };
    })
  );
  return results;
}

/**
 * Register the embedded fonts on a jsPDF document.
 *
 * Returns true if the Unicode fonts are available. On false, the caller should
 * fall back to the built-in fonts and transliterate symbols — a PDF with
 * slightly wrong glyphs beats no PDF at all.
 */
export async function registerPdfFonts(doc: jsPDF): Promise<boolean> {
  try {
    if (!cache) cache = loadFonts();
    const fonts = await cache;
    for (const f of fonts) {
      doc.addFileToVFS(f.file, f.base64);
      doc.addFont(f.file, f.family, f.style);
    }
    return true;
  } catch {
    cache = null; // let a later attempt retry
    return false;
  }
}

/**
 * Best-effort ASCII rendering of the symbols that matter, used only when the
 * embedded fonts could not be loaded.
 */
const FALLBACK_MAP: Record<string, string> = {
  Ω: 'ohm',
  'Ω': 'ohm',
  µ: 'u',
  μ: 'u',
  Γ: 'Gamma',
  γ: 'gamma',
  λ: 'lambda',
  δ: 'delta',
  Δ: 'Delta',
  ε: 'eps',
  τ: 'tau',
  φ: 'phi',
  π: 'pi',
  θ: 'theta',
  ω: 'w',
  η: 'eta',
  ρ: 'rho',
  '∞': 'inf',
  '≈': '~',
  '≤': '<=',
  '≥': '>=',
  '×': 'x',
  '·': '.',
  '−': '-',
  '∥': '||',
  '√': 'sqrt',
  '²': '^2',
  '³': '^3',
  '₀': '0',
  '₁': '1',
  '₂': '2',
  '°': 'deg',
};

export function transliterate(text: string): string {
  return text.replace(/[^\x00-\xFF]|[µ°²³×·]/g, (ch) => FALLBACK_MAP[ch] ?? ch);
}
