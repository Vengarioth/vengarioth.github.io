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
  constructor(inputs = 2, hiddenLayer = 2, hiddenUnits = 16, outputs = 1) {
    this._layer = [];
    this._layer.push(new Layer(inputs, hiddenUnits));

    for(let i = 0; i < hiddenLayer; i++) {
      this._layer.push(new Layer(hiddenUnits, hiddenUnits));
    }

    this._layer.push(new Layer(hiddenUnits, outputs));
  }

  train(x, y, alpha = 0.5) {
    const activations = [x];
    for(let i = 0; i < this._layer.length; i++) {
      activations[i + 1] = this._layer[i].forward(activations[i]);
    }

    let delta;
    let error = activations[activations.length - 1].subtract(y);
    const loss = nj.abs(error).mean(); // TODO xentropy loss
    for(let i = activations.length - 1; i > 0; i--) {
      delta = this._layer[i - 1].backward(error);
      error = delta.dot(this._layer[i - 1].W.T);

      this._layer[i - 1].W = this._layer[i - 1].W.subtract(activations[i - 1].T.dot(delta).multiply(alpha));
    }

    return loss;
  }

  predict(x) {
    let activation = x;
    for(let i = 0; i < this._layer.length; i++) {
      activation = this._layer[i].forward(activation);
    }

    return activation.get(0);
  }
}

export default Perceptron;
