
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Config from './Config';
import drawCanvas from './DrawCanvas';

export default class ConfettiCanvas extends Component {

	static propTypes = {
		colors: PropTypes.array,
	};

	handleCanvas(el) {

		if (el === null) {
			window.removeEventListener('resize', window.resizeConfetti, false);
			return;
		}

		drawCanvas(el, Config);
	}

	render() {

		return (
			<canvas id="confetti" height="1" width="1" ref={ this.handleCanvas } />
		);
	}
}