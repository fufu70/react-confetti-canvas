
export default Object.freeze({

	DEG_TO_RAD: Math.PI / 180,
	DURATION: (1.0 / 50),
	RIBBON_COUNT: 11,
	PAPER_COUNT: 95,
	RIBBON_PARTICLE_COUNT: 30,
	RIBBON_PARTICLE_DIST: 8.0,
	RIBBON_PARTICLE_THICK: 8.0,
	RIBBON_PARTICLE_ANGLE: 45,
	RIBBON_PARTICLE_MASS: 1,
	RIBBON_PARTICLE_DRAG: 0.05,
	COLORS: [
		['#df0049', '#660671'],
		['#00e857', '#005291'],
		['#2bebbc', '#05798a'],
		['#ffd200', '#b06c00']
	],

	COLOR_INDEX: () => Math.round(Math.random() * (this.COLORS.length - 1)),
});
