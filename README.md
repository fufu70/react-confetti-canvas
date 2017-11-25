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

To simply add the confetti canvas on to the page import it and include it into the container. The styling must be manually applied through your CSS environment, there is no styling added on to the page from the `react-confetti-canvas`.

```javascript
import React from 'react';
import ConfettiCanvas from 'react-confetti-canvas';

const App = () => {
  return (
    <ConfettiCanvas />
  );
};

export default App;
```

#### Color

To Change the colors of the ribbon and paper confetti falling down pass an array of arrays that represent the front and back hex color of a ribbon or paper.

```javascript
const App = () => {
  ...
  return (
    <ConfettiCanvas
      colors={[
        ['#F1948A', '#C39BD3'],
        ['#7FB3D5', '#76D7C4'],
        ['#F0B27A', '#7DCEA0']
      ]} />
  );
  ...
};
```


#### Duration

The rate at which confetti pieces fall is determined by the duration. The duration stands for the amount of time that has passed in seconds in each frame. The higher the number the faster the confetti pieces fall, the lower the number the slower the confetti pieces fall.

```javascript
const App = () => {
  ...
  return (
    <ConfettiCanvas
      duration={0.001} />
  );
  ...
};
```

#### Paper Count

How many paper pieces will fall at one time on the canvas.

```javascript
const App = () => {
  ...
  return (
    <ConfettiCanvas
      paperCount={100} />
  );
  ...
};
```

#### Ribbon Count

How many ribbons will fall at one time on the canvas.

```javascript
const App = () => {
  ...
  return (
    <ConfettiCanvas
      ribbonCount={11} />
  );
  ...
};
```

#### Ribbon Particle Count

How many connected elements are inside of the ribbon, the higher the number the longer the ribbon will be.

```javascript
const App = () => {
  ...
  return (
    <ConfettiCanvas
      ribbonParticleCount={30} />
  );
  ...
};
```

#### Ribbon Particle Dist

How far apart each particle is on the ribbon, the higher the number the farther apart the connected particles are.

```javascript
const App = () => {
  ...
  return (
    <ConfettiCanvas
      ribbonParticleDist={8.0} />
  );
  ...
};
```

#### Ribbon Particle Thick

The thickness of the ribbon itself.

```javascript
const App = () => {
  ...
  return (
    <ConfettiCanvas
      ribbonParticleThick={8.0} />
  );
  ...
};
```

#### Ribbon Particle Angle

The angle at which the ribbons twist to show the backside of the ribbon.

```javascript
const App = () => {
  ...
  return (
    <ConfettiCanvas
      ribbonParticleAngle={45} />
  );
  ...
};
```

#### Ribbon Particle Mass

How much the ribbon will be affected by the drag produced by its fall. The higher the value the more it will be affected by drag, the lower the number the less it will be effected; The lower the number the faster it will fall.

```javascript
const App = () => {
  ...
  return (
    <ConfettiCanvas
      ribbonParticleMass={1} />
  );
  ...
};
```

#### Ribbon Particle Drag

How much the ribbon will be effected by its mass as it falls. The lower the value the slower it falls and flutters.

```javascript
const App = () => {
  ...
  return (
    <ConfettiCanvas
      ribbonParticleDrag={0.05} />
  );
  ...
};
```


## Notes

The latest version will work with packages `react` and `react-dom` version `^16.0.0`.

If you are running `react` and `react-dom` version `15.0.0` you can use the `v0.1.1`, it was tested with `react` and `react-dom` version `15.6.2`.

To install for react's `15.0.0`:

```bash
$ npm install react-confetti-canvas@0.1.1
```