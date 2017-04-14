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
      new Layer(hiddenUnits, outputs)
    ];

    this.train(
      nj.array([[0, 0, 1], [0, 1, 1], [1, 0, 1], [1, 1, 1]]),
      nj.array([[0], [1], [1], [0]]));
  }

  train(x, y) {
    let i = 0;
    const epoch = () => {
      const layer_0 = x;
      //const layer_1 = nj.sigmoid(nj.dot(layer_0, this._layer[0].W));
      //const layer_2 = nj.sigmoid(nj.dot(layer_1, this._layer[1].W));
      const layer_1 = this._layer[0].forward(layer_0);
      const layer_2 = this._layer[1].forward(layer_1);

      const layer_2_error = layer_2.subtract(y);
      const layer_2_delta = this._layer[1].backward(layer_2_error);

      const layer_1_error = layer_2_delta.dot(this._layer[1].W.T);
      const layer_1_delta = this._layer[0].backward(layer_1_error);

      this._layer[1].W = this._layer[1].W.subtract(layer_1.T.dot(layer_2_delta).multiply(1));
      this._layer[0].W = this._layer[0].W.subtract(layer_0.T.dot(layer_1_delta).multiply(1));

      if(i % 100 < 1) {
        console.log('loss: ' + nj.abs(layer_2_error).mean());
      }

      window.requestAnimationFrame(() => epoch());
      i++;
    };

    epoch();
  }
}

export default Perceptron;
