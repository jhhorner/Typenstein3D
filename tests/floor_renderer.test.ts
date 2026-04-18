import { describe, it, expect, vi } from 'vitest';
import { FloorRenderer } from '../src/floor_renderer.js';
import { theme } from '../src/theme.js';
import { p5Mock } from './helpers/p5Mock.js';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../src/constants.js';

describe('FloorRenderer.render', () => {
  it('should not throw', () => {
    const renderer = new FloorRenderer();
    expect(() => renderer.render(p5Mock)).not.toThrow();
  });

  it('should fill with the theme floor color', () => {
    const renderer = new FloorRenderer();
    const fillSpy = vi.spyOn(p5Mock, 'fill');

    renderer.render(p5Mock);

    expect(fillSpy).toHaveBeenCalledWith(theme.floor);
    fillSpy.mockRestore();
  });

  it('should call noStroke', () => {
    const renderer = new FloorRenderer();
    const noStrokeSpy = vi.spyOn(p5Mock, 'noStroke');

    renderer.render(p5Mock);

    expect(noStrokeSpy).toHaveBeenCalledOnce();
    noStrokeSpy.mockRestore();
  });

  it('should draw a rect covering the bottom portion of the window', () => {
    const renderer = new FloorRenderer();
    const rectSpy = vi.spyOn(p5Mock, 'rect');

    renderer.render(p5Mock);

    expect(rectSpy).toHaveBeenCalledWith(9, WINDOW_HEIGHT / 1.5, WINDOW_WIDTH, WINDOW_HEIGHT / 1.5);
    rectSpy.mockRestore();
  });

  it('should reflect theme.floor changes at render time', () => {
    const original = theme.floor;
    theme.floor = '#fedcba';

    const renderer = new FloorRenderer();
    const fillSpy = vi.spyOn(p5Mock, 'fill');

    renderer.render(p5Mock);

    expect(fillSpy).toHaveBeenCalledWith('#fedcba');

    theme.floor = original;
    fillSpy.mockRestore();
  });
});
