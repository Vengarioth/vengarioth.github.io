import nj from 'numjs';

export const sigmoid = {
  activation: (x) => {
    return nj.sigmoid(x);
  },

  derivative: (x) => {
    return x.multiply(nj.ones(x.shape).subtract(x));
  }
};
