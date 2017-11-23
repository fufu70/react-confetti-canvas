
import Vector2D from './Vector2D';
import { SubtractVector2D } from './Vector2D';
import Config from './Config';
import EulerMass from './EulerMass';

/**
 * A ribbon that can moves to a specific point and is drawn on a canvas.
 *
 * @param  {Number} x   The x starting position of the Ribbon.
 * @param  {Number} y   The y starting position of the Ribbon.
 * @return {Object}     A moveable and drawable ribbon.
 */
export default function Ribbon(x, y) {

	let ribbon = {

		position: new Vector2D(x, y),
		xOffset: (
			Math.cos(Config.DEG_TO_RAD * Config.RIBBON_PARTICLE_ANGLE) *
			Config.RIBBON_PARTICLE_THICK
		),
		yOffset: (
			Math.sin(Config.DEG_TO_RAD * Config.RIBBON_PARTICLE_ANGLE) *
			Config.RIBBON_PARTICLE_THICK
		),
		bounds: new Vector2D(0, 0),

		/**
		 * Initalizes all of the particales assocaited with the canvas, its
		 * colors, its current time, oscillation information.
		 */
		initialize() {

			let particles = [];
			let colorIndex = Config.COLOR_INDEX();

			for (let i = 0; i < Config.RIBBON_PARTICLE_COUNT; i++) {
				particles[i] = new EulerMass(
					this.position.x,
					this.position.y - i * Config.RIBBON_PARTICLE_DIST,
					Config.RIBBON_PARTICLE_MASS,
					Config.RIBBON_PARTICLE_DRAG
				);
			}

			this.prevPosition = new Vector2D(this.position.x, this.position.y);
			this.velocityInherit = Math.random() * 2 + 4;
			this.time = Math.random() * 100;
			this.oscillationSpeed = Math.random() * 2.0 + 1.5;
			this.oscillationDistance = (Math.random() * 40 + 40);
			this.ySpeed = Math.random() * 40 + 80;
			this.colorIndex = Config.COLOR_INDEX();
			this.frontColor = Config.COLORS[this.colorIndex][0];
			this.backColor = Config.COLORS[this.colorIndex][1];
			this.particles = particles;
		},

		/**
		 * Moves the ribbons particles positions.
		 *
		 * Creates a new position of all particles, applies a force to that partible,
		 * Updates the particles position according to that new force. If the entire ribbon
		 * is out of the bounds of the canvas then reset its position to fall again.
		 *
		 * @param {Integer} duration The amount of time that has passed.
		 */
		update(duration) {

			let i = 0;
			this.time += duration * this.oscillationSpeed;
			this.position.y += this.ySpeed * duration;
			this.position.x += Math.cos(this.time) * this.oscillationDistance * duration;
			this.particles[0].position = this.position;
			const dX = this.prevPosition.x - this.position.x;
			const dY = this.prevPosition.y - this.position.y;
			// get the difference of movement.
			const delta = Math.sqrt(dX * dX + dY * dY);
			this.prevPosition = new Vector2D(this.position.x, this.position.y);

			for (i = 1; i < Config.RIBBON_PARTICLE_COUNT; i++) {
				let dirP = SubtractVector2D(this.particles[i - 1].position, this.particles[i].position);
				dirP.normalize();
				dirP.multiply((delta / duration) * this.velocityInherit);
				this.particles[i].addForce(dirP);
			}

			for (i = 1; i < Config.RIBBON_PARTICLE_COUNT; i++) {
				this.particles[i].integrate(duration);
			}

			for (i = 1; i < Config.RIBBON_PARTICLE_COUNT; i++) {
				let rp2 = new Vector2D(this.particles[i].position.x, this.particles[i].position.y);
				rp2.subtract(this.particles[i - 1].position);
				rp2.normalize();
				rp2.multiply(Config.RIBBON_PARTICLE_DIST);
				rp2.add(this.particles[i - 1].position);
				this.particles[i].position = rp2;
			}

			if (this.position.y > Ribbon.bounds.y + Config.RIBBON_PARTICLE_DIST * Config.RIBBON_PARTICLE_COUNT) {
				this.reset();
			}
		},

		/**
		 * Resets the ribbon position.
		 */
		reset() {

			this.position.y = -Math.random() * Ribbon.bounds.y;
			this.position.x = Math.random() * Ribbon.bounds.x;
			this.prevPosition = new Vector2D(this.position.x, this.position.y);
			this.initialize();
		},

		/**
		 * Draws the ribbon on the given canvas.
		 *
		 * Goes through all of the particles to draw the tip, body, and tail.
		 *
		 * @param {CanvasRenderingContext2D} canvas What to draw on.
		 */
		draw(canvas) {

			for (let i = 0; i < Config.RIBBON_PARTICLE_COUNT - 1; i++) {
				const currentParticlePosition = this.particles[i].position;
				const futureParticlePosition = this.particles[i + 1].position;
				const currentParticleOffset = new Vector2D(
					currentParticlePosition.x + this.xOffset,
					currentParticlePosition.y + this.yOffset
				);
				const futureParticleOffset = new Vector2D(
					futureParticlePosition.x + this.xOffset,
					futureParticlePosition.y + this.yOffset
				);

				this.setColor(
					canvas,
					currentParticlePosition,
					futureParticlePosition,
					futureParticleOffset
				);

				if (i == 0) { // ribbon tip
					this.drawTip(
						canvas,
						currentParticlePosition,
						futureParticlePosition,
						currentParticleOffset,
						futureParticleOffset
					);
				} else if (i == Config.RIBBON_PARTICLE_COUNT - 2) { // ribbon tail
					this.drawTail(
						canvas,
						currentParticlePosition,
						futureParticlePosition,
						currentParticleOffset,
						futureParticleOffset
					);
				} else { // ribbon body
					this.drawBody(
						canvas,
						currentParticlePosition,
						futureParticlePosition,
						currentParticleOffset,
						futureParticleOffset
					);
				}
			}
		},

		/**
		 * Sets the current color of the ribbon be deciding which side its on.
		 *
		 * @param  {CanvasRenderingContext2D} canvas                  What to draw on.
		 * @param  {Vector2D}                  currentParticlePosition The current particle position.
		 * @param  {Vector2D}                  futureParticlePosition  The future particle position.
		 * @param  {Vector2D}                  futureParticleOffset    The future offset of the particle position
		 */
		setColor(
			canvas,
			currentParticlePosition,
			futureParticlePosition,
			futureParticleOffset
		) {
			if (
				this.side(
					currentParticlePosition.x,
					currentParticlePosition.y,
					futureParticlePosition.x,
					futureParticlePosition.y,
					futureParticleOffset.x,
					futureParticleOffset.y
				) < 0
			) {
				canvas.fillStyle = this.frontColor;
				canvas.strokeStyle = this.frontColor;
			} else {
				canvas.fillStyle = this.backColor;
				canvas.strokeStyle = this.backColor;
			}
		},

		/**
		 * Draws the tip of a Ribbon on the given canvas.
		 *
		 * The shape drawn:
		 *
		 *                       |\  /|
		 *                       | \/ |
		 *
		 * @param  {CanvasRenderingContext2D} canvas                  What to draw on.
		 * @param  {Vector2D}                 currentParticlePosition The current particle position.
		 * @param  {Vector2D}                 futureParticlePosition  The future particle position.
		 * @param  {Vector2D}                 currentParticleOffset   The offset of the particle position.
		 * @param  {Vector2D}                 futureParticleOffset    The future offset of the particle position
		 */
		drawTip(
			canvas,
			currentParticlePosition,
			futureParticlePosition,
			currentParticleOffset,
			futureParticleOffset
		) {
			canvas.beginPath();
			canvas.moveTo(
				currentParticlePosition.x * window.devicePixelRatio,
				currentParticlePosition.y * window.devicePixelRatio
			);
			canvas.lineTo(
				futureParticlePosition.x * window.devicePixelRatio,
				futureParticlePosition.y * window.devicePixelRatio
			);
			canvas.lineTo(
				((futureParticlePosition.x + futureParticleOffset.x) * 0.5) * window.devicePixelRatio,
				((futureParticlePosition.y + futureParticleOffset.y) * 0.5) * window.devicePixelRatio
			);
			canvas.closePath();
			canvas.stroke();
			canvas.fill();
			canvas.beginPath();
			canvas.moveTo(
				futureParticleOffset.x * window.devicePixelRatio,
				futureParticleOffset.y * window.devicePixelRatio
			);
			canvas.lineTo(
				currentParticleOffset.x * window.devicePixelRatio,
				currentParticleOffset.y * window.devicePixelRatio
			);
			canvas.lineTo(
				((futureParticlePosition.x + futureParticleOffset.x) * 0.5) * window.devicePixelRatio,
				((futureParticlePosition.y + futureParticleOffset.y) * 0.5) * window.devicePixelRatio
			);
			canvas.closePath();
			canvas.stroke();
			canvas.fill();
		},

		/**
		 * Draws the body of a Ribbon on the given canvas.
		 *
		 * The shape drawn (more or less):
		 *
		 *                        ____
		 *                       |    |
		 *                       |    |
		 *                       |    |
		 *                       |    |
		 *                        ‾‾‾‾
		 *
		 * @param  {CanvasRenderingContext2D} canvas                  What to draw on.
		 * @param  {Vector2D}                 currentParticlePosition The current particle position.
		 * @param  {Vector2D}                 futureParticlePosition  The future particle position.
		 * @param  {Vector2D}                 currentParticleOffset   The offset of the particle position.
		 * @param  {Vector2D}                 futureParticleOffset    The future offset of the particle position
		 */
		drawBody(
			canvas,
			currentParticlePosition,
			futureParticlePosition,
			currentParticleOffset,
			futureParticleOffset
		) {
			canvas.beginPath();
			canvas.moveTo(
				currentParticlePosition.x * window.devicePixelRatio,
				currentParticlePosition.y * window.devicePixelRatio
			);
			canvas.lineTo(
				futureParticlePosition.x * window.devicePixelRatio,
				futureParticlePosition.y * window.devicePixelRatio
			);
			canvas.lineTo(
				futureParticleOffset.x * window.devicePixelRatio,
				futureParticleOffset.y * window.devicePixelRatio
			);
			canvas.lineTo(
				currentParticleOffset.x * window.devicePixelRatio,
				currentParticleOffset.y * window.devicePixelRatio
			);
			canvas.closePath();
			canvas.stroke();
			canvas.fill();
		},

		/**
		 * Draws the tail of a Ribbon on the given canvas.
		 *
		 * The shape drawn:
		 *
		 *                       | /\ |
		 *                       |/  \|
		 *
		 * @param  {CanvasRenderingContext2D} canvas                  What to draw on.
		 * @param  {Vector2D}                  currentParticlePosition The current particle position.
		 * @param  {Vector2D}                  futureParticlePosition  The future particle position.
		 * @param  {Vector2D}                  currentParticleOffset   The offset of the particle position.
		 * @param  {Vector2D}                  futureParticleOffset    The future offset of the particle position
		 */
		drawTail(
			canvas,
			currentParticlePosition,
			futureParticlePosition,
			currentParticleOffset,
			futureParticleOffset
		) {
			canvas.beginPath();
			canvas.moveTo(
				currentParticlePosition.x * window.devicePixelRatio,
				currentParticlePosition.y * window.devicePixelRatio
			);
			canvas.lineTo(
				futureParticlePosition.x * window.devicePixelRatio,
				futureParticlePosition.y * window.devicePixelRatio
			);
			canvas.lineTo(
				((currentParticlePosition.x + currentParticleOffset.x) * 0.5) * window.devicePixelRatio,
				((currentParticlePosition.y + currentParticleOffset.y) * 0.5) * window.devicePixelRatio
			);
			canvas.closePath();
			canvas.stroke();
			canvas.fill();
			canvas.beginPath();
			canvas.moveTo(
				futureParticleOffset.x * window.devicePixelRatio,
				futureParticleOffset.y * window.devicePixelRatio
			);
			canvas.lineTo(
				currentParticleOffset.x * window.devicePixelRatio,
				currentParticleOffset.y * window.devicePixelRatio
			);
			canvas.lineTo(
				((currentParticlePosition.x + currentParticleOffset.x) * 0.5) * window.devicePixelRatio,
				((currentParticlePosition.y + currentParticleOffset.y) * 0.5) * window.devicePixelRatio
			);
			canvas.closePath();
			canvas.stroke();
			canvas.fill();
		},

		/**
		 * Determines the current side of the ribbon particles by getting the difference of 3 x
		 * and y points. If the result is negative then the front of a ribbon is viewed.
		 *
		 * @param  {Number} x1 A particles x value
		 * @param  {Number} y1 A particles y value
		 * @param  {Number} x2 A particles x value
		 * @param  {Number} y2 A particles y value
		 * @param  {Number} x3 A particles x value
		 * @param  {Number} y3 A particles y value
		 * @return {Number}    A integer stating what side the ribbon is on. If its less than 0
		 *                      then the ribbon is facing the front, otherwise its facing the back.
		 */
		side(x1, y1, x2, y2, x3, y3) {
			return ((x1 - x2) * (y3 - y2) - (y1 - y2) * (x3 - x2));
		}
	};

	ribbon.initialize();

	return ribbon;
}
