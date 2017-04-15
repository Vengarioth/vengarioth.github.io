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

const create = (Perceptron, Gradient, Graph, generateXorData) => class PerceptronControls extends Component {

  constructor(props) {
    super(props);

    this.state = {
      iteration: 0,
      loss: 1,
      isTraining: false
    };

    this._perceptron = new Perceptron();
    this._data = generateXorData();
  }

  startTraining() {
    this.setState({
      isTraining: true
    });

    const train = () => {
      const losses = [];
      for(let i = 0; i < this._data.length; i++) {
        const loss = this._perceptron.train(
          //nj.array([[0, 0], [0, 1], [1, 0], [1, 1]]),
          //nj.array([[0], [1], [1], [0]])
          this._data[i].x,
          this._data[i].y
        );

        losses.push(loss);
      }

      const loss = nj.array(losses).mean();

      this.setState({
        iteration: this.state.iteration + 1,
        loss
      });
      this.refs.graph.addData(this.state.iteration, this.state.loss);

      this.refs.gradient.updateDimensions(true);

      if(this.state.isTraining) {
        window.requestAnimationFrame(train);
      }
    };

    window.requestAnimationFrame(train);
  }

  stopTraining() {
    this.setState({
      isTraining: false
    });
  }

  render() {
    const loss = this.state.loss;
    const startTraining = () => this.startTraining();
    const stopTraining = () => this.stopTraining();
    const button = this.state.isTraining ? (<button onClick={stopTraining}>Stop</button>) : (<button onClick={startTraining}>Start</button>);
    const f = (x, y) => {
      return this._perceptron.predict(nj.array([x, y]));
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
