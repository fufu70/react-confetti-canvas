
import Vector2D from './Vector2D';
import Config from './Config';

/**
 * Draws a falling Square on a canvas.
 *
 * @param  {Number} x   The x starting position of the Paper.
 * @param  {Number} y   The y starting position of the Paper.
 * @return {Object}     A moveable and drawable paper object.
 */
export default function Paper(x, y) {

	let angle = Config.DEG_TO_RAD * Math.random() * 360;
	let corners = [];
	let randomIndex = Config.COLOR_INDEX();

	for (let i = 0; i < 4; i++) {
		let dx = Math.cos(angle + Config.DEG_TO_RAD * (i * 90 + 45));
		let dy = Math.sin(angle + Config.DEG_TO_RAD * (i * 90 + 45));
		corners[i] = new Vector2D(dx, dy);
	}

	return {
		position: new Vector2D(x, y),
		rotationSpeed: (Math.random() * 600 + 800),
		angle: angle,
		rotation: Config.DEG_TO_RAD * Math.random() * 360,
		cosA: 1.0,
		size: 5.0,
		oscillationSpeed: (Math.random() * 1.5 + 0.5),
		xSpeed: 40.0,
		ySpeed: (Math.random() * 60 + 50.0),
		corners: corners,
		time: Math.random(),
		frontColor: Config.COLORS[randomIndex][0],
		backColor: Config.COLORS[randomIndex][1],
		bounds: new Vector2D(0, 0),

		/**
		 * Moves the paper points to a new position.
		 *
		 * Rotates paper, updates the x position by the oscillation of the object,
		 * updates the y position by appling the current ySpeed as well as the duration
		 * passed. If the element is out of bounds the paper is transported back to the
		 * top.
		 *
		 * @param {Number} duration     The amount of time that has passed.
		 */
		update(duration) {

			this.time += duration;
			this.rotation += this.rotationSpeed * duration;
			this.cosA = Math.cos(Config.DEG_TO_RAD * this.rotation);
			this.position.x += Math.cos(this.time * this.oscillationSpeed) * this.xSpeed * duration;
			this.position.y += this.ySpeed * duration;
			if (this.position.y > Paper.bounds.y) {
				this.position.x = Math.random() * Paper.bounds.x;
				this.position.y = 0;
			}
		},

		/**
		 * Draws the paper on the given canvas.
		 *
		 * @param {CanvasRenderingContext2D} canvas     What to draw on.
		 */
		draw(canvas) {

			if (this.cosA > 0) {
				canvas.fillStyle = this.frontColor;
			} else {
				canvas.fillStyle = this.backColor;
			}

			canvas.beginPath();
			canvas.moveTo(
				(this.position.x + this.corners[0].x * this.size) * window.devicePixelRatio,
				(this.position.y + this.corners[0].y * this.size * this.cosA) * window.devicePixelRatio
			);

			for (let i = 1; i < 4; i++) {
				canvas.lineTo(
					(this.position.x + this.corners[i].x * this.size) * window.devicePixelRatio,
					(this.position.y + this.corners[i].y * this.size * this.cosA) * window.devicePixelRatio
				);
			}

			canvas.closePath();
			canvas.fill();
		}
	};
}
