import React, { Component } from 'react';
import styled from 'styled-components';
import { Quicksand } from '../style/font';

const Header = styled.h1`
  padding-top: 0.4em;
  padding-bottom: 0.1em;
  font-size: 1.4em;
  font-family: ${ Quicksand };
`;

const Content = styled.div`
  font-family: ${ Quicksand };
`;

const create = () => class Article extends Component {
  render() {

    const header = this.props.header;
    const content = this.props.content;

    return (
      <div>
        <Header>{header}</Header>
        <hr/>
        <div>
          <Content>{content}</Content>
        </div>
      </div>
    );
  }
};

export default create;
