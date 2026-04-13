import { describe, it, expect, vi } from 'vitest';
import { GameMap } from '../src/game_map.js';
import { MAP_TILE_SIZE } from '../src/constants.js';
import { TileAttribute } from '../src/game_map.js';
import { theme } from '../src/theme.js';
import { p5Mock } from './helpers/p5Mock.js';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../src/constants.js';

describe('GameMap.isWithinBounds', () => {
  const map = new GameMap();

  it('returns true for the origin', () => {
    expect(map.isWithinBounds({ x: 0, y: 0 })).toBe(true);
  });

  it('returns true for the far corner', () => {
    expect(map.isWithinBounds({ x: WINDOW_WIDTH, y: WINDOW_HEIGHT })).toBe(true);
  });

  it('returns false for negative x', () => {
    expect(map.isWithinBounds({ x: -1, y: 0 })).toBe(false);
  });

  it('returns false for negative y', () => {
    expect(map.isWithinBounds({ x: 0, y: -1 })).toBe(false);
  });

  it('returns false beyond WINDOW_WIDTH', () => {
    expect(map.isWithinBounds({ x: WINDOW_WIDTH + 1, y: 0 })).toBe(false);
  });

  it('returns false beyond MAP_HEIGHT', () => {
    expect(map.isWithinBounds({ x: 0, y: WINDOW_HEIGHT + 1 })).toBe(false);
  });
});

describe('GameMap.hasAttributeAt', () => {
  const map = new GameMap();

  it('detects a wall tile at the top-left corner', () => {
    // Grid row 0, col 0 = 1 (wall)
    expect(map.hasAttributeAt({ x: 0, y: 0 }, TileAttribute.Wall)).toBe(true);
  });

  it('detects a floor tile inside the map', () => {
    // Grid row 1, col 1 = 0 (floor) → pixel (32, 32)
    expect(map.hasAttributeAt({ x: MAP_TILE_SIZE + 1, y: MAP_TILE_SIZE + 1 }, TileAttribute.Floor)).toBe(true);
  });

  it('floor tile is not a wall', () => {
    expect(map.hasAttributeAt({ x: MAP_TILE_SIZE + 1, y: MAP_TILE_SIZE + 1 }, TileAttribute.Wall)).toBe(false);
  });

  it('wall tile is not a floor', () => {
    expect(map.hasAttributeAt({ x: 0, y: 0 }, TileAttribute.Floor)).toBe(false);
  });
});

describe('GameMap grid invariants', () => {
  it('has the expected number of rows and columns', () => {
    const map = new GameMap();
    const grid = (map as any).grid as number[][];
    const expectedRows = WINDOW_HEIGHT / MAP_TILE_SIZE;
    const expectedCols = WINDOW_WIDTH / MAP_TILE_SIZE;

    console.log(WINDOW_WIDTH, WINDOW_HEIGHT);

    expect(grid).toHaveLength(expectedRows);
    grid.forEach((row) => expect(row).toHaveLength(expectedCols));
  });

  it('contains only valid tile values (0 or 1)', () => {
    const map = new GameMap();
    const grid = (map as any).grid as number[][];
    const validValues = new Set([TileAttribute.Floor, TileAttribute.Wall]);

    grid.forEach((row) => row.forEach((cell) => expect(validValues.has(cell)).toBe(true)));
  });
});

describe('GameMap.render', () => {
  it('renders without throwing', () => {
    const map = new GameMap();

    expect(() => map.render(p5Mock)).not.toThrow();
  });

  it('uses theme.map.tileBorder for stroke', () => {
    const strokeSpy = vi.spyOn(p5Mock, 'stroke');
    const map = new GameMap();

    map.render(p5Mock);

    expect(strokeSpy).toHaveBeenCalledWith(theme.map.tileBorder);
    strokeSpy.mockRestore();
  });

  it('uses theme.map.wall color for wall tiles', () => {
    const fillSpy = vi.spyOn(p5Mock, 'fill');
    const map = new GameMap();

    map.render(p5Mock);

    expect(fillSpy).toHaveBeenCalledWith(theme.map.wall);
    fillSpy.mockRestore();
  });

  it('uses theme.map.floor color for floor tiles', () => {
    const fillSpy = vi.spyOn(p5Mock, 'fill');
    const map = new GameMap();

    map.render(p5Mock);

    expect(fillSpy).toHaveBeenCalledWith(theme.map.floor);
    fillSpy.mockRestore();
  });
});
