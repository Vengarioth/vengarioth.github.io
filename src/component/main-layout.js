import React, { Component } from 'react';
import styled from 'styled-components';
import { Phone, Tablet, Laptop, Desktop } from '../style/responsive';

const AppContainer = styled.div`
  
`;

const ContentContainer = styled.div`
  margin: 0;
  padding: 0;
  margin-left: auto;
  margin-right: auto;
  margin-top: 4em;
  margin-bottom: 3em;
  
  @media ${ Phone } {
    margin-left: 0.5em;
    margin-right: 0.5em;
  }
  @media ${ Tablet } {
    width: 40em;
  }
  @media ${ Laptop } {
    width: 55em;
  }
  @media ${ Desktop } {
    width: 65em;
  }
`;

const create = (TopNav, Article) => class MainLayout extends Component {
  render() {

    const articles = this.props.articles.map((article) => (<Article header={article.getHeader()} content={article.getContent()} key={article.getId()} />));

    return (
    <AppContainer>
      <TopNav/>
      <ContentContainer>
        {articles}
      </ContentContainer>
    </AppContainer>
  );
  }
};

export default create;
