import React, { Component } from 'react';
import styled from 'styled-components';
import { NightBlue, LightAzure } from '../style/color';
import { PtSans } from '../style/font';

const Container = styled.div`
  position: fixed;
  top: 0;
  margin: none;
  padding: 0.2em;
  padding-left: 2em;
  height: 2.8em;
  background-color: ${ NightBlue };
  width: 100%;
`;

const Brand = styled.span`
  font-family: ${ PtSans };
  font-size: 2em;
  cursor: default;
  color: ${ LightAzure };
`;

const create = () => class TopNav extends Component {
  render() {
    return (
      <Container>
        <Brand>vengarioth.github.io</Brand>
      </Container>
    );
  }
};

export default create;
