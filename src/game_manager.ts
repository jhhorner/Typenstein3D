import { GameMap } from './game_map.js';
import { GameObject } from './game_object.js';
import { Player } from './player.js';
import { RayCaster } from './ray_caster.js';
import { RayProjector } from './ray_projector.js';
import { SkyRenderer } from './sky_renderer.js';
import { FloorRenderer } from './floor_renderer.js';

/**
 * Singleton coordinator for all game objects.
 *
 * Owns the authoritative list of {@link GameObject}s that the main loop iterates
 * each frame to update and render.
 */
export class GameManager {
  private static _instance: GameManager;
  public static get instance(): GameManager {
    if (!GameManager._instance) {
      GameManager._instance = new GameManager();
    }

    return this._instance;
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

  /**
   * @param mapObjects - Ordered list of objects rendered under the map scale transform
   *   (2D map view). The constructor appends `map`, `rayCaster`, and `player` in that order.
   * @param sceneObjects - Ordered list of objects rendered without scaling (e.g. 3D projection).
   */
  constructor(
    public mapObjects: GameObject[] = [],
    public sceneObjects: GameObject[] = [],
  ) {
    this.map = new GameMap();
    this.player = new Player();
    this.rayCaster = new RayCaster();
    this.rayProjector = new RayProjector();
    this.skyRenderer = new SkyRenderer();
    this.floorRenderer = new FloorRenderer();

    this.sceneObjects.push(this.skyRenderer, this.floorRenderer, this.rayProjector);
    this.mapObjects.push(this.map, this.rayCaster, this.player);
  }
}
