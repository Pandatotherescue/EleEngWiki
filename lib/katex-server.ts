import katex from 'katex';

/**
 * Render TeX to HTML on the server. Doing it here rather than in the browser
 * keeps the KaTeX bundle out of the client entirely — pages ship finished
 * markup instead.
 */
export function renderTex(tex: string, display = true): string {
  try {
    return katex.renderToString(tex, {
      displayMode: display,
      throwOnError: false,
      strict: false,
      output: 'html',
    });
  } catch {
    return `<code>${tex.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[c]!)}</code>`;
  }
}
