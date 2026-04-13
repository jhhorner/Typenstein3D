import { describe, it, expect, vi } from 'vitest';
import { SkyRenderer } from '../src/sky_renderer.js';
import { theme } from '../src/theme.js';
import { p5Mock } from './helpers/p5Mock.js';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../src/constants.js';

describe('SkyRenderer.render', () => {
  it('does not throw', () => {
    const renderer = new SkyRenderer();
    expect(() => renderer.render(p5Mock)).not.toThrow();
  });

  it('fills with the theme sky color', () => {
    const renderer = new SkyRenderer();
    const fillSpy = vi.spyOn(p5Mock, 'fill');

    renderer.render(p5Mock);

    expect(fillSpy).toHaveBeenCalledWith(theme.sky);
    fillSpy.mockRestore();
  });

  it('calls noStroke', () => {
    const renderer = new SkyRenderer();
    const noStrokeSpy = vi.spyOn(p5Mock, 'noStroke');

    renderer.render(p5Mock);

    expect(noStrokeSpy).toHaveBeenCalledOnce();
    noStrokeSpy.mockRestore();
  });

  it('draws a rect covering the top portion of the window', () => {
    const renderer = new SkyRenderer();
    const rectSpy = vi.spyOn(p5Mock, 'rect');

    renderer.render(p5Mock);

    expect(rectSpy).toHaveBeenCalledWith(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT / 1.5);
    rectSpy.mockRestore();
  });

  it('reflects theme.sky changes at render time', () => {
    const original = theme.sky;
    theme.sky = '#abcdef';

    const renderer = new SkyRenderer();
    const fillSpy = vi.spyOn(p5Mock, 'fill');

    renderer.render(p5Mock);

    expect(fillSpy).toHaveBeenCalledWith('#abcdef');

    theme.sky = original;
    fillSpy.mockRestore();
  });
});
