import React from 'react';
import ReactDOM from 'react-dom';
import createArticle from './component/article';
import createTopNav from './component/top-nav';
import createMainLayout from './component/main-layout';
import SyntaxHighlighter from 'react-syntax-highlighter';
import ReactMarkdown from 'react-markdown';

import createMarkdown from './component/markdown';
import createRust from './component/rust';
import createGradient from './component/gradient';

import createHelloWorld from './article/hello-world/hello-world';

((global) => {
  const Article = createArticle();
  const TopNav = createTopNav();
  const MainLayout = createMainLayout(TopNav, Article);
  const Gradient = createGradient();

  const markdown = createMarkdown(ReactMarkdown);
  const rust = createRust(SyntaxHighlighter);

  const dependencies = {
    markdown,
    rust,
    Gradient
  };

  const articles = [
    createHelloWorld(dependencies)
  ];

  const container = global.document.createElement('div');
  global.document.body.appendChild(container);

  const render = () => ReactDOM.render(<MainLayout articles={articles} />, container);

  render();
})(window);
