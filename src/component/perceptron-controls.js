import React, { Component } from 'react';
import styled from 'styled-components';
import nj from 'numjs';
import { Phone, Tablet, Laptop, Desktop } from '../style/responsive';

const GradientContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  
  @media ${ Phone } {
    margin-left: 2em;
    margin-right: 2em;
  }
  @media ${ Tablet } {
    width: 20em;
  }
  @media ${ Laptop } {
    width: 30em;
  }
  @media ${ Desktop } {
    width: 30em;
  }
`;

const create = (WorkerClient, Gradient, Graph) => class PerceptronControls extends Component {

  constructor(props) {
    super(props);

    this.state = {
      iteration: 0,
      loss: 1,
      isTraining: false
    };

    this._worker = new WorkerClient();
    this._worker.start();
    this._worker.send('create', {
      inputs: 2,
      hiddenLayer: 2,
      hiddenUnits: 32,
      outputs: 1
    });

    const size = 10;
    this._worker.on('trainingLoss', ({ loss, iteration }) => {
      this.setState({
        iteration,
        loss
      });
      this.refs.graph.addData(iteration, loss);

      this.updateGradient(size);
    });
    this._worker.on('prediction', ({ data }) => {
      const converted = data.map((e) => e[0]);
      this.refs.gradient.update(size, size, converted);
    });
    this.updateGradient(size);
  }

  updateGradient(size) {
    const n = size, m = size, values = new Array(n * m);
    for(let i = 0, k = 0; i < n; i++) {
      for(let j = 0; j < m; j++, k++) {
        values[k] = [i / size, j / size];
      }
    }

    this._worker.send('predict', { data: values });
  }

  startTraining() {
    this.setState({
      isTraining: true
    });

    this._worker.send('startTraining');
  }

  stopTraining() {
    this.setState({
      isTraining: false
    });

    this._worker.send('stopTraining');
  }

  render() {
    const loss = this.state.loss;
    const startTraining = () => this.startTraining();
    const stopTraining = () => this.stopTraining();
    const button = this.state.isTraining ? (<button onClick={stopTraining}>Stop</button>) : (<button onClick={startTraining}>Start</button>);
    const f = (x, y) => {
      // return this._perceptron.predict(nj.array([x, y]));
      return x;
    };

    return (<div>
      {button}
      <br />
      <span>loss: {loss}</span>
      <GradientContainer>
        <Gradient ref="gradient" f={f}/>
      </GradientContainer>
      <Graph ref="graph" />
    </div>);
  }
};

export default create;
