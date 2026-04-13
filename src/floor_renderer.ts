import p5 from 'p5';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from './constants.js';
import { DefaultGameObject } from './game_object.js';
import { theme } from './theme.js';

/**
 * Renders the floor background rectangle.
 */
export class FloorRenderer extends DefaultGameObject {
  /**
   * @param color - Fill color for the floor rectangle. Defaults to `theme.floor`.
   */
  constructor(private color: string = theme.floor) {
    super();
  }

  /**
   * Draws the floor rectangle.
   * @param p - p5 instance.
   */
  render(p: p5): void {
    p.fill(this.color);
    p.noStroke();
    p.rect(9, WINDOW_HEIGHT / 1.5, WINDOW_WIDTH, WINDOW_HEIGHT / 1.5);
  }
}
