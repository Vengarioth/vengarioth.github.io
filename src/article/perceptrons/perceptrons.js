import React from 'react';
import introduction from './introduction.md';

export default function create({ markdown, PerceptronControls }) {
  const getId = () => 'perceptrons';

  const getHeader = () => (<span>Concerning perceptrons</span>);

  const getContent = () => {

    return (
    <div>
      {markdown(introduction)}
      <PerceptronControls />
    </div>);
  };

  return {
    getId,
    getHeader,
    getContent
  };
}
