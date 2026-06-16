import { increment } from '../counter.js';

export function multiply(a, b) {
  increment();
  return a * b;
}
