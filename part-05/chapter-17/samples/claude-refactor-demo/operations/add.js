import { increment } from '../counter.js';

export function add(a, b) {
  increment();
  return a + b;
}
