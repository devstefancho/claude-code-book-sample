import { increment } from '../counter.js';

export function divide(a, b) {
  increment();
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}
