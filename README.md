# react-confetti-canvas

![Gif of what it looks like](assets/canvas.gif)

A basic confetti canvas that is missing basic styling to be added to the canvas.

The method for showing the confetti and ribbons was created by [Hemn Chawroka](https://codepen.io/iprodev/) on [Codepen](https://codepen.io/iprodev/pen/azpWBr)

## Installation

This is a [ReactJS](https://reactjs.org/) component available through the
[npm registry](https://www.npmjs.com/).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install react-confetti-canvas
```

## How to Use

```javascript
import React from 'react';
import ConfettiCanvas from 'react-confetti-canvas';


const App = ({ name }) => {
  return (
    <ConfettiCanvas />
  );
};

export default App;
```

## Notes

The latest version will work with packages `react` and `react-dom` version `^16.0.0`.

If you are running `react` and `react-dom` version `15.0.0` you can use the `v0.1.1`, it was tested with `react` and `react-dom` version `15.6.2`.

To install for react's `15.0.0`:

```bash
$ npm install react-confetti-canvas@0.1.1
```