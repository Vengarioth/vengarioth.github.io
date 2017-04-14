import nj from 'numjs';

export function random(shape) {
  nj.random(shape);
}

export function meanZero(shape) {
  nj.ones(shape)
  .multiply(2)
  .multiply(nj.random(shape))
  .subtract(nj.ones(shape));
}
