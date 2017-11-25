
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Config from './Config';
import drawCanvas from './DrawCanvas';

// A basic key to value object to help setup the config values
// from the given properties.
const propsToConfig = {
	colors: 'COLORS',
	duration: 'DURATION',
	paperCount: 'PAPER_COUNT',
	ribbonCount: 'RIBBON_COUNT',
	ribbonParticleCount: 'RIBBON_PARTICLE_COUNT',
	ribbonParticleDist: 'RIBBON_PARTICLE_DIST',
	ribbonParticleThick: 'RIBBON_PARTICLE_THICK',
	ribbonParticleAngle: 'RIBBON_PARTICLE_ANGLE',
	ribbonParticleMass: 'RIBBON_PARTICLE_MASS',
	ribbonParticleDrag: 'RIBBON_PARTICLE_DRAG',
}

export default class ConfettiCanvas extends Component {

	static propTypes = {
		colors: PropTypes.array,
		duration: PropTypes.number,
		paperCount: PropTypes.number,
		ribbonCount: PropTypes.number,
		ribbonParticleCount: PropTypes.number,
		ribbonParticleDist: PropTypes.number,
		ribbonParticleThick: PropTypes.number,
		ribbonParticleAngle: PropTypes.number,
		ribbonParticleMass: PropTypes.number,
		ribbonParticleDrag: PropTypes.number,
	};

	handleCanvas = (el) => {

		if (el === null) {
			window.removeEventListener('resize', window.resizeConfetti, false);
			return;
		}

		console.log(this.getConfig());

		drawCanvas(el, this.getConfig());
	}

	getConfig = () => {
		let configCopy = Object.assign({}, Config);

		for (var property in propsToConfig) {
			if (this.props[property] !== undefined) {
				configCopy[propsToConfig[property]] = this.props[property];
			}
		}

		return configCopy;
	}

	render() {

		return (
			<canvas id="confetti" height="1" width="1" ref={ this.handleCanvas } />
		);
	}
}