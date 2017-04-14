import React, { Component } from 'react';
import styled from 'styled-components';

const AppContainer = styled.div`
  
`;

const ContentContainer = styled.div`
  margin: 0;
  padding: 0;
  margin-left: 2em;
  margin-right: 2em;
  margin-top: 4em;
  margin-bottom: 3em;
`;

const create = (TopNav, Article) => class MainLayout extends Component {
  render() {

    const articles = this.props.articles.map((article) => (<Article header={article.header} content={article.content} key={article.id} />));

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
