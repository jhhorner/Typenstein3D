import type p5 from 'p5';

export const p5Mock = {
  stroke: () => {},
  noStroke: () => {},
  fill: () => {},
  rect: () => {},
  circle: () => {},
  line: () => {},
} as unknown as p5;
