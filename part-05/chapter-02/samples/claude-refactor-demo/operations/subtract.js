import { increment } from '../counter.js';

export function subtract(a, b) {
  increment();
  return a - b;
}
