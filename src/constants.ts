import { degreesToRadians } from './math.js';

/** Pixel size of each map tile. */
export const MAP_TILE_SIZE = 64;

/** Number of tile rows in the map grid. */
export const MAP_ROW_COUNT = 11;

/** Number of tile columns in the map grid. */
export const MAP_COLUMN_COUNT = 15;

/** Default scale factor applied to the minimap overlay. */
export const MAP_SCALE = 0.2;

/** Player's horizontal field of view in radians. */
export const FOV_ANGLE = degreesToRadians(60);

/** Canvas width in pixels. */
export const WINDOW_WIDTH = MAP_COLUMN_COUNT * MAP_TILE_SIZE;

/** Canvas height in pixels. */
export const WINDOW_HEIGHT = MAP_ROW_COUNT * MAP_TILE_SIZE;

/** Number of milliseconds in a minute */
export const SECOND_IN_MILLISECONDS = 1000;
