import { GameMap } from './game_map.js';
import { GameObject } from './game_object.js';
import { Player } from './player.js';
import { RayCaster } from './ray_caster.js';
import { RayProjector } from './ray_projector.js';
import { SkyRenderer } from './sky_renderer.js';
import { FloorRenderer } from './floor_renderer.js';
import { ConsoleLogger } from './console_logger.js';
import { Logger } from './logger.js';
import { Singleton } from './singleton.js';

/**
 * Singleton coordinator for all game objects.
 *
 * Owns the authoritative list of {@link GameObject}s that the main loop iterates
 * each frame to update and render.
 */
export class GameManager extends Singleton {
  public static get instance(): GameManager {
    return super.instance as GameManager;
  }

  /** Tile-based map defining walls, floors, and other objects. */
  map: GameMap;

  /** The player character reference containing position, rotation, and movement state. */
  player: Player;

  /** Responsible for creating and casts rays from the player's FOV each frame. */
  rayCaster: RayCaster;

  /** Responsible for projecting casted rays in pseudo 3D space. */
  rayProjector: RayProjector;

  /** Responsible for rendering the sky background rectangle above the horizon. */
  skyRenderer: SkyRenderer;

  /** Responsible for rendering the floor background rectangle below the horizon. */
  floorRenderer: FloorRenderer;

  /** Responsible for logging messages throughout the game */
  logger: Logger;

  readonly mapObjects: GameObject[];
  readonly sceneObjects: GameObject[];

  constructor() {
    super();
    this.map = new GameMap();
    this.player = new Player();
    this.rayCaster = new RayCaster();
    this.rayProjector = new RayProjector();
    this.skyRenderer = new SkyRenderer();
    this.floorRenderer = new FloorRenderer();
    this.logger = ConsoleLogger.instance;

    this.mapObjects = [this.map, this.rayCaster, this.player];
    this.sceneObjects = [this.skyRenderer, this.floorRenderer, this.rayProjector];
  }
}
