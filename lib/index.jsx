
import React from 'react';
import drawCanvas from './DrawCanvas';

export default React.createClass({

	handleCanvas(el) {

		if (el === null) {
			window.removeEventListener('resize', window.resizeConfetti, false);
			return;
		}

		drawCanvas(el);
	},

	render() {

		return (
			<canvas id="confetti" height="1" width="1" ref={ this.handleCanvas } />
		);
	}
});
