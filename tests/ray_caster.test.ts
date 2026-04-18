import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { GameManager } from '../src/game_manager.js';
import { RayCaster, RAY_COUNT } from '../src/ray_caster.js';
import { debugOptions } from '../src/debug_options.js';
import { p5Mock } from './helpers/p5Mock.js';

beforeEach(() => {
  (GameManager as any)._instance = new GameManager();
});

describe('RayCaster', () => {
  it('should initialize rays with length RAY_COUNT', () => {
    const caster = new RayCaster();
    expect(caster.rays).toHaveLength(RAY_COUNT);
  });

  it('should set a non-origin collision point on rays[0] after update', () => {
    const caster = new RayCaster();

    caster.update();

    const cp = (caster as any).rays[0].collisionPoint;
    expect(cp.x !== 0 || cp.y !== 0).toBe(true);
  });

  it('should not throw on render', () => {
    const caster = new RayCaster();

    caster.update();

    expect(() => caster.render(p5Mock)).not.toThrow();
  });
});

describe('RayCaster.render', () => {
  afterEach(() => {
    debugOptions.render.singleRay = false;
  });

  it('should render all rays when singleRay is false', () => {
    const caster = new RayCaster();
    caster.update();

    const rays: any[] = (caster as any).rays;
    const renderSpies = rays.map((r) => vi.spyOn(r, 'render'));

    debugOptions.render.singleRay = false;
    caster.render(p5Mock);

    expect(renderSpies.every((s) => s.mock.calls.length === 1)).toBe(true);
    renderSpies.forEach((s) => s.mockRestore());
  });

  it('should render only rays[0] when singleRay is true', () => {
    const caster = new RayCaster();
    caster.update();

    const rays: any[] = (caster as any).rays;
    const renderSpies = rays.map((r) => vi.spyOn(r, 'render'));

    debugOptions.render.singleRay = true;
    caster.render(p5Mock);

    expect(renderSpies[0]).toHaveBeenCalledOnce();
    expect(renderSpies.slice(1).every((s) => s.mock.calls.length === 0)).toBe(true);
    renderSpies.forEach((s) => s.mockRestore());
  });
});
