import { describe, it, expect, beforeEach } from 'vitest';
import type p5 from 'p5';
import { DefaultGameObject } from '../src/game_object.js';
import { makeP5Mock } from './helpers/p5Mock.js';

let p5Mock: p5;

beforeEach(() => {
  p5Mock = makeP5Mock();
});

class ConcreteGameObject extends DefaultGameObject {
  renderCalled = false;
  render(_p: p5) {
    this.renderCalled = true;
  }
}

describe('DefaultGameObject', () => {
  it('should be a no-op and not throw on update()', () => {
    const obj = new ConcreteGameObject();

    expect(() => obj.update()).not.toThrow();
  });

  it('should delegate render() to the subclass implementation', () => {
    const obj = new ConcreteGameObject();

    obj.render(p5Mock);

    expect(obj.renderCalled).toBe(true);
  });
});
