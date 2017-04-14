import React from 'react';

const create = (SyntaxHighlighter) => {
  return function markdown(source) {
    return (<SyntaxHighlighter language='rust'>{source}</SyntaxHighlighter>);
  };
};

export default create;
