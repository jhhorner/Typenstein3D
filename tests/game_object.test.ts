import { describe, it, expect } from 'vitest';
import type p5 from 'p5';
import { DefaultGameObject } from '../src/game_object.js';
import { p5Mock } from './helpers/p5Mock.js';

class ConcreteGameObject extends DefaultGameObject {
  renderCalled = false;
  render(_p: p5) {
    this.renderCalled = true;
  }
}

describe('DefaultGameObject', () => {
  it('update() is a no-op and does not throw', () => {
    const obj = new ConcreteGameObject();

    expect(() => obj.update()).not.toThrow();
  });

  it('render() delegates to the subclass implementation', () => {
    const obj = new ConcreteGameObject();

    obj.render(p5Mock);

    expect(obj.renderCalled).toBe(true);
  });
});
