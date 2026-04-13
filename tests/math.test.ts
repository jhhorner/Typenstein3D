import { describe, it, expect } from 'vitest';
import { degreesToRadians, radiansToDegrees, distance } from '../src/math.js';

describe('degreesToRadians', () => {
  it('converts 0° to 0', () => {
    expect(degreesToRadians(0)).toBe(0);
  });

  it('converts 90° to π/2', () => {
    expect(degreesToRadians(90)).toBeCloseTo(Math.PI / 2);
  });

  it('converts 180° to π', () => {
    expect(degreesToRadians(180)).toBeCloseTo(Math.PI);
  });

  it('converts 360° to 2π', () => {
    expect(degreesToRadians(360)).toBeCloseTo(2 * Math.PI);
  });

  it('converts negative angles', () => {
    expect(degreesToRadians(-90)).toBeCloseTo(-Math.PI / 2);
  });
});

describe('radiansToDegrees', () => {
  it('converts 0 to 0°', () => {
    expect(radiansToDegrees(0)).toBe(0);
  });

  it('converts π/2 to 90°', () => {
    expect(radiansToDegrees(Math.PI / 2)).toBeCloseTo(90);
  });

  it('converts π to 180°', () => {
    expect(radiansToDegrees(Math.PI)).toBeCloseTo(180);
  });

  it('converts 2π to 360°', () => {
    expect(radiansToDegrees(2 * Math.PI)).toBeCloseTo(360);
  });

  it('round-trips with degreesToRadians', () => {
    expect(radiansToDegrees(degreesToRadians(45))).toBeCloseTo(45);
  });
});

describe('distance', () => {
  it('returns 0 for the same point', () => {
    expect(distance({ x: 5, y: 5 }, { x: 5, y: 5 })).toBe(0);
  });

  it('computes a 3-4-5 right triangle', () => {
    expect(distance({ x: 0, y: 0 }, { x: 3, y: 4 })).toBeCloseTo(5);
  });

  it('is symmetric', () => {
    const a = { x: 1, y: 2 };
    const b = { x: 4, y: 6 };

    expect(distance(a, b)).toBeCloseTo(distance(b, a));
  });

  it('works along a single axis', () => {
    expect(distance({ x: 0, y: 0 }, { x: 10, y: 0 })).toBeCloseTo(10);
    expect(distance({ x: 0, y: 0 }, { x: 0, y: 7 })).toBeCloseTo(7);
  });
});
