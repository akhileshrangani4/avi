/**
 * `Math.sumPrecise` polyfill.
 *
 * pdf.js calls `Math.sumPrecise`, which only landed in Chrome ~148, Safari
 * 26.4 and Firefox 146. On anything older the call throws, react-pdf bubbles
 * it up, and the resume page renders the error boundary instead of the
 * document.
 *
 * `react-pdf` is pinned to an exact version in package.json for the same
 * reason: pdfjs-dist 6.x additionally requires `Map.prototype.getOrInsert`
 * and `getOrInsertComputed`, which would each need a polyfill of their own.
 * Unpin react-pdf and the page breaks again on older browsers.
 *
 * Runs in the main thread and, via scripts/build-resume.sh, in the pdf.js
 * worker, so it stays dependency-free and side-effect-only.
 *
 * Uses Neumaier compensated summation. Not bit-exact like the spec's
 * arbitrary-precision accumulator, but pdf.js only sums small arrays of text
 * lengths, where the compensated result is identical.
 */
declare global {
  interface Math {
    sumPrecise?(values: Iterable<number>): number;
  }
}

if (typeof Math.sumPrecise !== 'function') {
  Math.sumPrecise = function sumPrecise(values: Iterable<number>): number {
    let sum = 0;
    let compensation = 0;
    let count = 0;

    for (const value of values) {
      const n = Number(value);
      const t = sum + n;
      compensation += Math.abs(sum) >= Math.abs(n) ? sum - t + n : n - t + sum;
      sum = t;
      count += 1;
    }

    // The spec returns -0 for an empty iterable.
    if (count === 0) return -0;

    return sum + compensation;
  };
}

export {};
