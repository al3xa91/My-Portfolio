/**
 * Shared Portfolio Utilities
 * Common functions used throughout the portfolio data
 */

/**
 * Converts a relative path to a public asset URL
 * Handles base path configuration automatically via Vite's import.meta.env
 * 
 * @param {string} path - The relative path to the asset (e.g., 'vegama/cover.webp')
 * @returns {string} The full public asset URL
 * @example
 * const url = publicAsset('vegama/cover.webp')
 * // Returns: /vegama/cover.webp (or configured base path)
 */
export const publicAsset = path => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`