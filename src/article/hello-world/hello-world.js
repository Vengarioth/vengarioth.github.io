import React from 'react';
import MarkdownParagraph from './test.md';
import RustCode from './source.rs';

export default function create({ markdown, rust, Gradient }) {
  const getId = () => 'hello-world';
  const getHeader = () => (<span>First article!</span>);
  const getContent = () => {
    return (
    <div>
      {markdown(MarkdownParagraph)}
      {rust(RustCode)}
      <Gradient />
    </div>);
  };

  return {
    getId,
    getHeader,
    getContent
  };
}
