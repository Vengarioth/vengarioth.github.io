import nj from 'numjs';

const create = (Perceptron, generateXorData) => class PerceptronController {
  constructor(worker) {
    this._worker = worker;
    this._data = generateXorData();
    this._iteration = 0;
    this._worker.on('create', ({inputs, hiddenLayer, hiddenUnits, outputs}) => this.create(inputs, hiddenLayer, hiddenUnits, outputs));
    this._worker.on('startTraining', () => this.startTraining());
    this._worker.on('stopTraining', () => this.stopTraining());
    this._worker.on('predict', ({data}) => this.predict(data));
  }

  create(inputs, hiddenLayer, hiddenUnits, outputs) {
    this._perceptron = new Perceptron(inputs, hiddenLayer, hiddenUnits, outputs);
  }

  startTraining() {
    this._intervalId = setInterval(() => {
      this._iteration += 1;
      const losses = [];
      for(let i = 0; i < this._data.length; i++) {
        const loss = this._perceptron.train(
          this._data[i].x,
          this._data[i].y
        );

        losses.push(loss);
      }

      const loss = nj.array(losses).mean();
      this._worker.send('trainingLoss', { loss, iteration: this._iteration });
    }, 0);
  }

  stopTraining() {
    clearInterval(this._intervalId);
  }

  predict(data) {
    const result = this._perceptron.predict(data);
    this._worker.send('prediction', { data: result });
  }
};

export default create;
