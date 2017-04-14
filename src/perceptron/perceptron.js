import nj from 'numjs';

const deriveSigmoid = (output) => {
  return output.multiply(nj.ones(output.shape).subtract(output));
};

class Layer {
  constructor(inputSize, outputSize) {
    this.W = nj.ones([inputSize, outputSize])
      .multiply(2)
      .multiply(nj.random([inputSize, outputSize]))
      .subtract(nj.ones([inputSize, outputSize]));
  }

  forward(x) {
    this._activation = nj.sigmoid(nj.dot(x, this.W));
    return this._activation;
  }

  backward(error) {
    return error.multiply(deriveSigmoid(this._activation));
  }
}

class Perceptron {
  constructor(inputs = 3, hiddenUnits = 32, outputs = 1) {

    this._layer = [
      new Layer(inputs, hiddenUnits),
      new Layer(hiddenUnits, hiddenUnits),
      new Layer(hiddenUnits, hiddenUnits),
      new Layer(hiddenUnits, outputs)
    ];

    this.train(
      nj.array([[0, 0, 1], [0, 1, 1], [1, 0, 1], [1, 1, 1]]),
      nj.array([[0], [1], [1], [0]]));
  }

  train(x, y) {
    let e = 0;
    const epoch = () => {

      const activations = [x];
      for(let i = 0; i < this._layer.length; i++) {
        activations[i + 1] = this._layer[i].forward(activations[i]);
      }

      let delta;
      let error = activations[activations.length - 1].subtract(y);
      if(e % 100 < 1) {
        console.log('loss: ' + nj.abs(error).mean());
      }
      for(let i = activations.length - 1; i > 0; i--) {
        delta = this._layer[i - 1].backward(error);
        error = delta.dot(this._layer[i - 1].W.T);

        this._layer[i - 1].W = this._layer[i - 1].W.subtract(activations[i - 1].T.dot(delta).multiply(1));
      }

      window.requestAnimationFrame(() => epoch());
      e++;
    };

    epoch();
  }
}

export default Perceptron;
