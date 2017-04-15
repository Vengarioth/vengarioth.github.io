import React from 'react';
import ReactDOM from 'react-dom';
import createArticle from './component/article';
import createTopNav from './component/top-nav';
import createMainLayout from './component/main-layout';
import createPerceptronControls from './component/perceptron-controls';
import SyntaxHighlighter from 'react-syntax-highlighter';
import ReactMarkdown from 'react-markdown';

import createMarkdown from './component/markdown';
import createRust from './component/rust';
import createGradient from './component/gradient';
import Perceptron from './perceptron/perceptron';
import generateXorData from './perceptron/generate-xor-data';

import createHelloWorld from './article/hello-world/hello-world';
import createPerceptrons from './article/perceptrons/perceptrons';

((global) => {
  const Article = createArticle();
  const TopNav = createTopNav();
  const MainLayout = createMainLayout(TopNav, Article);
  const Gradient = createGradient();
  const PerceptronControls = createPerceptronControls(Perceptron, Gradient, generateXorData);

  const markdown = createMarkdown(ReactMarkdown);
  const rust = createRust(SyntaxHighlighter);

  const dependencies = {
    markdown,
    rust,
    PerceptronControls
  };

  const articles = [
    createPerceptrons(dependencies),
    createHelloWorld(dependencies)
  ];

  const container = global.document.createElement('div');
  global.document.body.appendChild(container);

  const render = () => ReactDOM.render(<MainLayout articles={articles} />, container);

  render();
})(window);
