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

const NumberInput = styled.input`
  width: 2em;
`;

const create = (WorkerClient, Gradient, Graph) => class PerceptronControls extends Component {

  constructor(props) {
    super(props);

    this.state = {
      model: 0,
      iteration: 0,
      loss: 1,
      isTraining: false,
      hiddenLayer: 2,
      hiddenUnits: 32,
    };

    this._worker = new WorkerClient();
    this._worker.start();
    this._worker.send('create', {
      inputs: 2,
      hiddenLayer: this.state.hiddenLayer,
      hiddenUnits: this.state.hiddenUnits,
      outputs: 1
    });

    const size = 20;
    this._worker.on('trainingLoss', ({ model, loss, iteration }) => {
      if(model < this.state.model) {
        return;
      }
      this.setState({
        iteration,
        loss
      });
      this.refs.graph.addData(iteration, loss);

      this.updateGradient(size);
    });
    this._worker.on('prediction', ({ model, data }) => {
      if(model < this.state.model) {
        return;
      }
      const converted = data.map((e) => e[0]);
      this.refs.gradient.update(size, size, converted);
    });
    this.updateGradient(size);

    this.handleLayersChanged = this.handleLayersChanged.bind(this);
    this.handleUnitsChanged = this.handleUnitsChanged.bind(this);
  }

  handleLayersChanged(event) {
    this.setState({
      hiddenLayer: parseInt(event.target.value)
    });
  }

  handleUnitsChanged(event) {
    this.setState({
      hiddenUnits: parseInt(event.target.value)
    });
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

  rebuild() {
    this._worker.send('create', {
      inputs: 2,
      hiddenLayer: this.state.hiddenLayer,
      hiddenUnits: this.state.hiddenUnits,
      outputs: 1
    });
    this.refs.graph.clear();
    this.setState({
      model: this.state.model + 1
    });
  }

  render() {
    const loss = this.state.loss;
    const startTraining = () => this.startTraining();
    const stopTraining = () => this.stopTraining();
    const rebuild = () => this.rebuild();
    const button = this.state.isTraining ? (<button onClick={stopTraining}>Stop</button>) : (<button onClick={startTraining}>Start</button>);
    const f = (x, y) => {
      // return this._perceptron.predict(nj.array([x, y]));
      return x;
    };

    return (<div>
      {button}
      <br />
      <label>
        Hidden Layers: <NumberInput type="text" name="layers" onChange={this.handleLayersChanged} defaultValue={2}/>
      </label>
      <label>
        Hidden Units: <NumberInput type="text" name="layers" onChange={this.handleUnitsChanged} defaultValue={32}/>
      </label>
      <button onClick={rebuild}>Rebuild</button>
      <GradientContainer>
        <Gradient ref="gradient" f={f}/>
      </GradientContainer>
      <Graph ref="graph" />
    </div>);
  }
};

export default create;
