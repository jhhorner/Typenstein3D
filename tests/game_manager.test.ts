import { describe, it, expect, beforeEach } from 'vitest';
import { GameManager } from '../src/game_manager.js';
import { GameMap } from '../src/game_map.js';
import { Player } from '../src/player.js';
import { RayCaster } from '../src/ray_caster.js';
import { RayProjector } from '../src/ray_projector.js';
import { SkyRenderer } from '../src/sky_renderer.js';
import { FloorRenderer } from '../src/floor_renderer.js';

beforeEach(() => {
  GameManager._resetInstance();
});

describe('GameManager constructor', () => {
  let gameManager: GameManager;

  beforeEach(() => {
    gameManager = new GameManager();
  });

  it('should create a map, player, and rayCaster', () => {
    expect(gameManager.map).toBeInstanceOf(GameMap);
    expect(gameManager.player).toBeInstanceOf(Player);
    expect(gameManager.rayCaster).toBeInstanceOf(RayCaster);
  });

  it('should create a rayProjector, skyRenderer, and floorRenderer', () => {
    expect(gameManager.rayProjector).toBeInstanceOf(RayProjector);
    expect(gameManager.skyRenderer).toBeInstanceOf(SkyRenderer);
    expect(gameManager.floorRenderer).toBeInstanceOf(FloorRenderer);
  });

  it('should populate mapObjects', () => {
    expect(gameManager.mapObjects).toContain(gameManager.map);
    expect(gameManager.mapObjects).toContain(gameManager.rayCaster);
    expect(gameManager.mapObjects).toContain(gameManager.player);
  });

  it('should populate sceneObjects', () => {
    expect(gameManager.sceneObjects).toContain(gameManager.skyRenderer);
    expect(gameManager.sceneObjects).toContain(gameManager.floorRenderer);
    expect(gameManager.sceneObjects).toContain(gameManager.rayProjector);
  });

});

describe('GameManager singleton', () => {
  it('should return the same instance on repeated access', () => {
    const a = GameManager.instance;
    const b = GameManager.instance;

    expect(a).toBe(b);
  });

  it('should create a new instance after reset', () => {
    const a = GameManager.instance;
    GameManager._resetInstance();

    const b = GameManager.instance;

    expect(a).not.toBe(b);
  });
});
