/**
 * Enum values double as file names and encode the asset sub-directory via a
 * `<directory>_<file>` naming convention (e.g. `wall_brick.png` lives under
 * `src/assets/images/wall/`). Names without an underscore are placed directly
 * under `src/assets/images/`.
 */
export enum ImageName {
  Fail = 'goofed.png',
  WallBrick = 'wall_brick.png',
  WallSteel = 'wall_steel.png',
  WallRock = 'wall_rock.png',
  WallSkull = 'wall_skull.png',
  WallBlue = 'wall_blue.png',
  WallSlate = 'wall_slate.png',
}
