import { timestamp } from './format';
import { PDF_MONO, PDF_SANS, registerPdfFonts, transliterate } from './pdf-fonts';

export type ReportRow = { label: string; value: string; note?: string; primary?: boolean };

export type Report = {
  title: string;
  mode?: string;
  summary?: string;
  url: string;
  inputs: ReportRow[];
  outputs: ReportRow[];
  formula?: string;
  assumptions?: string[];
};

/* ------------------------------------------------------------------ */
/* Markdown                                                            */
/* ------------------------------------------------------------------ */

/**
 * Escape characters that would break a Markdown table cell. Labels such as
 * "Reflection coefficient |Γ|" contain literal pipes.
 */
function cell(text: string): string {
  return text.replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

export function reportToMarkdown(r: Report): string {
  const lines: string[] = [];
  lines.push(`## ${r.title}${r.mode ? ` — ${r.mode}` : ''}`);
  lines.push('');
  if (r.summary) {
    lines.push(`_${r.summary}_`);
    lines.push('');
  }

  lines.push('| Input | Value |');
  lines.push('| --- | --- |');
  for (const row of r.inputs) lines.push(`| ${cell(row.label)} | ${cell(row.value)} |`);
  lines.push('');

  lines.push('| Result | Value |');
  lines.push('| --- | --- |');
  for (const row of r.outputs) {
    const label = row.primary ? `**${cell(row.label)}**` : cell(row.label);
    const value = row.primary ? `**${cell(row.value)}**` : cell(row.value);
    lines.push(`| ${label} | ${value}${row.note ? ` <br><sub>${cell(row.note)}</sub>` : ''} |`);
  }
  lines.push('');

  if (r.assumptions?.length) {
    lines.push('**Assumptions**');
    lines.push('');
    for (const a of r.assumptions) lines.push(`- ${a}`);
    lines.push('');
  }

  lines.push(`_Calculated ${timestamp()} — ${r.url}_`);
  return lines.join('\n');
}

export async function copyMarkdown(r: Report): Promise<boolean> {
  const text = reportToMarkdown(r);
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Clipboard API needs a secure context and permission; fall back to a
    // hidden textarea, which still works in most browsers.
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const okResult = document.execCommand('copy');
      document.body.removeChild(ta);
      return okResult;
    } catch {
      return false;
    }
  }
}

/* ------------------------------------------------------------------ */
/* PDF                                                                 */
/* ------------------------------------------------------------------ */

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 18;
const CONTENT_W = PAGE_W - MARGIN * 2;

/**
 * Render a calculation as a one-page A4 report. jsPDF is imported lazily so
 * the library only reaches the browser when someone actually exports.
 */
export async function downloadPdf(r: Report): Promise<void> {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  // Embedded Unicode fonts so Greek and maths symbols survive. If they cannot
  // be fetched, fall back to the built-in fonts and transliterate.
  const unicode = await registerPdfFonts(doc);
  const sans = unicode ? PDF_SANS : 'helvetica';
  const mono = unicode ? PDF_MONO : 'courier';
  const t = (text: string) => (unicode ? text : transliterate(text));

  let y = MARGIN;

  const ensureRoom = (needed: number) => {
    if (y + needed > PAGE_H - MARGIN - 8) {
      doc.addPage();
      y = MARGIN;
    }
  };

  // ---- Header -----------------------------------------------------
  doc.setFont(sans, 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(120);
  doc.text('ELEENGWIKI', MARGIN, y);
  doc.setFont(sans, 'normal');
  doc.text(timestamp(), PAGE_W - MARGIN, y, { align: 'right' });
  y += 2.5;
  doc.setDrawColor(200);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 8;

  // ---- Title ------------------------------------------------------
  doc.setTextColor(20);
  doc.setFont(sans, 'bold');
  doc.setFontSize(17);
  const titleLines = doc.splitTextToSize(t(r.title), CONTENT_W) as string[];
  doc.text(titleLines, MARGIN, y);
  y += titleLines.length * 7;

  if (r.mode) {
    doc.setFont(sans, 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(110);
    doc.text(t(r.mode), MARGIN, y);
    y += 6;
  }

  if (r.summary) {
    doc.setFont(sans, 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(105);
    const lines = doc.splitTextToSize(t(r.summary), CONTENT_W) as string[];
    doc.text(lines, MARGIN, y);
    y += lines.length * 4.6 + 2;
  }

  y += 4;

  // ---- Section renderer -------------------------------------------
  const section = (heading: string, rows: ReportRow[], accent: boolean) => {
    ensureRoom(16);
    doc.setFont(sans, 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(accent ? 13 : 130);
    if (accent) doc.setTextColor(13, 110, 130);
    doc.text(t(heading.toUpperCase()), MARGIN, y);
    y += 2;
    doc.setDrawColor(accent ? 13 : 215, accent ? 110 : 215, accent ? 130 : 215);
    doc.setLineWidth(accent ? 0.5 : 0.3);
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += 5.5;

    for (const row of rows) {
      ensureRoom(9);
      const isPrimary = Boolean(row.primary);
      doc.setFontSize(isPrimary ? 11 : 9.5);

      // Label on the left, value right-aligned.
      doc.setFont(sans, isPrimary ? 'bold' : 'normal');
      doc.setTextColor(isPrimary ? 20 : 75);
      const labelLines = doc.splitTextToSize(t(row.label), CONTENT_W * 0.58) as string[];
      doc.text(labelLines, MARGIN, y);

      doc.setFont(mono, isPrimary ? 'bold' : 'normal');
      doc.setTextColor(isPrimary ? 13 : 30, isPrimary ? 110 : 30, isPrimary ? 130 : 30);
      doc.text(t(row.value), PAGE_W - MARGIN, y, { align: 'right' });

      y += Math.max(labelLines.length, 1) * (isPrimary ? 5.6 : 5);

      if (row.note) {
        doc.setFont(sans, 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(140);
        const noteLines = doc.splitTextToSize(t(row.note), CONTENT_W) as string[];
        doc.text(noteLines, MARGIN, y);
        y += noteLines.length * 3.4;
      }
      y += 1.2;
    }
    y += 5;
  };

  section('Inputs', r.inputs, false);
  section('Results', r.outputs, true);

  // ---- Assumptions -------------------------------------------------
  if (r.assumptions?.length) {
    ensureRoom(14);
    doc.setFont(sans, 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(130);
    doc.text('ASSUMPTIONS & CAVEATS', MARGIN, y);
    y += 2;
    doc.setDrawColor(215);
    doc.setLineWidth(0.3);
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += 5;

    doc.setFont(sans, 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(95);
    for (const a of r.assumptions) {
      const lines = doc.splitTextToSize(t(a), CONTENT_W - 4) as string[];
      ensureRoom(lines.length * 4 + 2);
      doc.text(unicode ? '\u2022' : '-', MARGIN, y);
      doc.text(lines, MARGIN + 4, y);
      y += lines.length * 4 + 1.5;
    }
  }

  // ---- Footer on every page ---------------------------------------
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont(sans, 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(150);
    doc.setDrawColor(225);
    doc.setLineWidth(0.3);
    doc.line(MARGIN, PAGE_H - MARGIN - 4, PAGE_W - MARGIN, PAGE_H - MARGIN - 4);
    const url = doc.splitTextToSize(t(r.url), CONTENT_W * 0.75) as string[];
    doc.text(url[0] ?? '', MARGIN, PAGE_H - MARGIN);
    if (pageCount > 1) {
      doc.text(`${i} / ${pageCount}`, PAGE_W - MARGIN, PAGE_H - MARGIN, { align: 'right' });
    }
  }

  const safe = r.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  doc.save(`${safe || 'calculation'}.pdf`);
}
