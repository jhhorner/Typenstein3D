import { describe, it, expect, beforeEach } from 'vitest';
import { GameManager } from '../src/game_manager.js';
import { GameMap } from '../src/game_map.js';
import { Player } from '../src/player.js';
import { RayCaster } from '../src/ray_caster.js';
import { RayProjector } from '../src/ray_projector.js';
import { SkyRenderer } from '../src/sky_renderer.js';
import { FloorRenderer } from '../src/floor_renderer.js';

beforeEach(() => {
  (GameManager as any)._instance = undefined;
});

describe('GameManager constructor', () => {
  let gameManager: GameManager;

  beforeEach(() => {
    gameManager = new GameManager();
  });

  it('creates a map, player, and rayCaster', () => {
    expect(gameManager.map).toBeInstanceOf(GameMap);
    expect(gameManager.player).toBeInstanceOf(Player);
    expect(gameManager.rayCaster).toBeInstanceOf(RayCaster);
  });

  it('creates a rayProjector, skyRenderer, and floorRenderer', () => {
    expect(gameManager.rayProjector).toBeInstanceOf(RayProjector);
    expect(gameManager.skyRenderer).toBeInstanceOf(SkyRenderer);
    expect(gameManager.floorRenderer).toBeInstanceOf(FloorRenderer);
  });

  it('populates mapObjects', () => {
    expect(gameManager.mapObjects).toContain(gameManager.map);
    expect(gameManager.mapObjects).toContain(gameManager.rayCaster);
    expect(gameManager.mapObjects).toContain(gameManager.player);
  });

  it('populates sceneObjects', () => {
    expect(gameManager.sceneObjects).toContain(gameManager.skyRenderer);
    expect(gameManager.sceneObjects).toContain(gameManager.floorRenderer);
    expect(gameManager.sceneObjects).toContain(gameManager.rayProjector);
  });

  it('appends game objects to custom mapObjects and sceneObjects arrays', () => {
    const customMapObjects = [{ update: () => {}, render: () => {} }] as any[];
    const customSceneObjects = [{ update: () => {}, render: () => {} }] as any[];
    const gm = new GameManager(customMapObjects, customSceneObjects);

    expect(gm.mapObjects).toHaveLength(4);
    expect(gm.sceneObjects).toHaveLength(4);
    expect(gm.mapObjects[0]).toBe(customMapObjects[0]);
    expect(gm.sceneObjects[0]).toBe(customSceneObjects[0]);
  });
});

describe('GameManager singleton', () => {
  it('returns the same instance on repeated access', () => {
    const a = GameManager.instance;
    const b = GameManager.instance;

    expect(a).toBe(b);
  });

  it('creates a new instance after reset', () => {
    const a = GameManager.instance;
    (GameManager as any)._instance = undefined;

    const b = GameManager.instance;

    expect(a).not.toBe(b);
  });
});
