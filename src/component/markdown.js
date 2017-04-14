import React from 'react';
import styled from 'styled-components';
import { BrightAzure, NightBlue, NightGrey } from '../style/color';
import { PtSans, Quicksand, Hack } from '../style/font';

const MarkdownStyle = styled.div`
  & h1, h2, h3, h4, h5, h6 {
    font-family: ${ PtSans }
  }
  & h1, h2, h3 {
    border-bottom: 0.01em solid rgba(0, 0, 0, 0.2);
    padding-bottom: 0.2em;
    font-weight: bold;
  }
  
  & h4, h5, h6 {
    font-weight: bold;  
  }
  
  & h1 {
    font-size: 2em;
  }
  & h2 {
    font-size: 1.8em;
  }
  & h3 {
    font-size: 1.6em;
  }
  & h4 {
    font-size: 1.4em;
  }
  & h5 {
    font-size: 1.2em;
  }
  & h6 {
    font-size: 1em;
  }
  
  & code {
    font-family: ${ Hack };
  }
  
  
  & blockquote {
    color: ${ NightGrey };
    margin: 0;
    padding-left: 0.5em;
    border-left: 0.2em solid ${ NightGrey };
  }
  
  & p > code {
    color: ${ NightBlue };
    background-color: ${ BrightAzure };
    border-radius: 0.2em;
    padding-left: 0.4em;
    padding-right: 0.4em;
  }
`;

const create = (ReactMarkdown) => {
  return function markdown(source) {
    return (<MarkdownStyle><ReactMarkdown source={source}/></MarkdownStyle>);
  };
};

export default create;
