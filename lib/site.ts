/**
 * Site-wide constants that more than one page needs to agree on.
 */

/**
 * The copyright year is fixed when the site is built, not when it is viewed.
 * Every deploy refreshes it, which for a site that gets edited is the right
 * behaviour — a year that ticks over on a page nobody has touched since would
 * be claiming more than it should.
 */
export const BUILD_YEAR = new Date().getFullYear();

/** The name on the copyright notice, in the footer and on the About page. */
export const COPYRIGHT_HOLDER = 'Jakob Persson';
