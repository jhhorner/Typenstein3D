import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { GameManager } from '../src/game_manager.js';
import { Player } from '../src/player.js';
import { debugOptions } from '../src/debug_options.js';
import { theme } from '../src/theme.js';
import { p5Mock } from './helpers/p5Mock.js';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../src/constants.js';

// Minimal p5 keyCode stub used for key event tests
function keyStub(keyCode: number) {
  return {
    keyCode,
    UP_ARROW: 38,
    DOWN_ARROW: 40,
    LEFT_ARROW: 37,
    RIGHT_ARROW: 39,
  } as any;
}

beforeEach(() => {
  (GameManager as any)._instance = new GameManager();
});

describe('Player initial state', () => {
  it('starts at the center of the map', () => {
    const player = GameManager.instance.player;

    expect(player.position.x).toBeCloseTo(WINDOW_WIDTH / 2);
    expect(player.position.y).toBeCloseTo(WINDOW_HEIGHT / 2);
  });

  it('starts with zero walk and turn direction', () => {
    const player = GameManager.instance.player;

    expect(player.walkDirection).toBe(0);
    expect(player.turnDirection).toBe(0);
  });
});

describe('Player.handleKeyPressed', () => {
  it('sets walkDirection to 1 on UP_ARROW', () => {
    const player = new Player();

    player.handleKeyPressed(keyStub(38));

    expect(player.walkDirection).toBe(1);
  });

  it('sets walkDirection to -1 on DOWN_ARROW', () => {
    const player = new Player();

    player.handleKeyPressed(keyStub(40));

    expect(player.walkDirection).toBe(-1);
  });

  it('sets turnDirection to -1 on LEFT_ARROW', () => {
    const player = new Player();

    player.handleKeyPressed(keyStub(37));

    expect(player.turnDirection).toBe(-1);
  });

  it('sets turnDirection to 1 on RIGHT_ARROW', () => {
    const player = new Player();

    player.handleKeyPressed(keyStub(39));

    expect(player.turnDirection).toBe(1);
  });

  it('ignores unknown keys', () => {
    const player = new Player();

    player.handleKeyPressed(keyStub(65)); // 'A'

    expect(player.walkDirection).toBe(0);
    expect(player.turnDirection).toBe(0);
  });
});

describe('Player.handleKeyReleased', () => {
  it('resets walkDirection on UP_ARROW release', () => {
    const player = new Player();

    player.handleKeyPressed(keyStub(38));
    player.handleKeyReleased(keyStub(38));

    expect(player.walkDirection).toBe(0);
  });

  it('resets walkDirection on DOWN_ARROW release', () => {
    const player = new Player();

    player.handleKeyPressed(keyStub(40));
    player.handleKeyReleased(keyStub(40));

    expect(player.walkDirection).toBe(0);
  });

  it('resets turnDirection on LEFT_ARROW release', () => {
    const player = new Player();

    player.handleKeyPressed(keyStub(37));
    player.handleKeyReleased(keyStub(37));

    expect(player.turnDirection).toBe(0);
  });

  it('resets turnDirection on RIGHT_ARROW release', () => {
    const player = new Player();

    player.handleKeyPressed(keyStub(39));
    player.handleKeyReleased(keyStub(39));

    expect(player.turnDirection).toBe(0);
  });
});

describe('Player.update', () => {
  it('does not move when walkDirection is 0', () => {
    const player = GameManager.instance.player;
    const startX = player.position.x;
    const startY = player.position.y;

    player.update();

    expect(player.position.x).toBeCloseTo(startX);
    expect(player.position.y).toBeCloseTo(startY);
  });

  it('advances position into open space', () => {
    const player = GameManager.instance.player;
    player.rotationAngle = 0; // facing right (+x)
    player.walkDirection = 1;
    const startX = player.position.x;

    player.update();

    expect(player.position.x).toBeGreaterThan(startX);
  });

  it('does not move into a wall', () => {
    const player = GameManager.instance.player;
    // Place the player just inside the left wall and face left into it
    player.position.x = 4;
    player.position.y = WINDOW_HEIGHT / 2;
    player.rotationAngle = Math.PI; // facing left (-x)
    player.walkDirection = 1;
    const startX = player.position.x;

    player.update();

    expect(player.position.x).toBeCloseTo(startX);
  });

  it('advances rotationAngle when turning', () => {
    const player = GameManager.instance.player;
    const startAngle = player.rotationAngle;
    player.turnDirection = 1;

    player.update();

    expect(player.rotationAngle).toBeGreaterThan(startAngle);
  });
});

describe('Player.render', () => {
  afterEach(() => {
    debugOptions.render.rotationAngle = false;
  });

  it('renders without throwing', () => {
    const player = GameManager.instance.player;
    expect(() => player.render(p5Mock)).not.toThrow();
  });

  it('does not draw rotation line when rotationAngle is false', () => {
    const lineSpy = vi.spyOn(p5Mock, 'line');
    const player = GameManager.instance.player;

    debugOptions.render.rotationAngle = false;
    player.render(p5Mock);

    expect(lineSpy).not.toHaveBeenCalled();
    lineSpy.mockRestore();
  });

  it('draws rotation line when rotationAngle is true', () => {
    const lineSpy = vi.spyOn(p5Mock, 'line');
    const player = GameManager.instance.player;

    debugOptions.render.rotationAngle = true;
    player.render(p5Mock);

    expect(lineSpy).toHaveBeenCalledOnce();
    lineSpy.mockRestore();
  });

  it('uses theme.map.player color for fill', () => {
    const fillSpy = vi.spyOn(p5Mock, 'fill');
    const player = GameManager.instance.player;

    player.render(p5Mock);

    expect(fillSpy).toHaveBeenCalledWith(theme.map.player);
    fillSpy.mockRestore();
  });

  it('uses theme.map.rotationAngle color for stroke when rotationAngle debug is enabled', () => {
    const strokeSpy = vi.spyOn(p5Mock, 'stroke');
    const player = GameManager.instance.player;

    debugOptions.render.rotationAngle = true;
    player.render(p5Mock);

    expect(strokeSpy).toHaveBeenCalledWith(theme.map.rotationAngle);
    strokeSpy.mockRestore();
  });
});
