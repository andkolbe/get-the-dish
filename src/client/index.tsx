import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './scss/app';

render(<App />, document.getElementById("root"));

const textStyle = [
  'background: linear-gradient(#26E000, #19272f)',
  'border: 1px solid #1A8904',
  'color: white',
  'padding: 1px 5px',
  'line-height: 40px',
  'font-weight: bold',
  'font-size: large',
  'font-family: Verdana, sans-serif'
].join(';');

const imageStyle = [
  'background-image: url("https://media3.giphy.com/media/l2JJsJQY6yj9HLaZW/giphy.gif")',
  'background-size: cover',
  'padding: 100px 200px',
].join(';');

console.log('%cLike what you see?', textStyle);
console.log('%cI am looking to get hired', textStyle);
console.log('%ccontact me at kolbe1129@gmail.com', textStyle);
console.log('%c ', imageStyle)