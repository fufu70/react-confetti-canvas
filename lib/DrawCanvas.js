
import Config from './Config';
import Vector2D from './Vector2D';
import Paper from './Paper';
import Ribbon from './Ribbon';

// Local WindowAnimationTiming interface
window.cancelAnimationFrame = window.cancelAnimationFrame || window.cancelRequestAnimationFrame;

/**
 * Utilizes the given canvas to draw a number of Confetti Ribbons and Papers onto it.
 *
 * NOTE:
 * Applies a onresize function to the window called "window.resizeConfetti." Once finished
 * with the DrawCanvas function remove the "window.resizeConfetti" from the resize listener.
 *
 * @param  {CanvasRenderingContext2D} canvas What to draw on.
 */
export default function (canvas) {

	let canvasConfetti = {

		canvasParent: canvas.parentNode,
		canvasWidth: canvas.parentNode.offsetWidth,
		canvasHeight: canvas.parentNode.offsetHeight,
		context: canvas.getContext('2d'),
		interval: null,
		confettiRibbons: [],
		confettiPapers: [],

		/**
		 * Resizes the canvas according to the current width and height of the usable window.
		 */
		resize() {

			this.canvasWidth = this.canvasParent.offsetWidth;
			this.canvasHeight = this.canvasParent.offsetHeight;
			canvas.width = this.canvasWidth * window.devicePixelRatio;
			canvas.height = this.canvasHeight * window.devicePixelRatio;
			Paper.bounds = new Vector2D(this.canvasWidth, this.canvasHeight);
			Ribbon.bounds = new Vector2D(this.canvasWidth, this.canvasHeight);
		},

		/**
		 * Sets up the size of the canvas, creates the Confetti Papers and Ribbons, cancels
		 * any current animation frames and starts the update process.
		 */
		start() {

			this.resize();

			Paper.bounds = new Vector2D(this.canvasWidth, this.canvasHeight);
			for (let i = 0; i < Config.PAPER_COUNT; i++) {
				this.confettiPapers[i] = new Paper(
					Math.random() * this.canvasWidth,
					Math.random() * this.canvasHeight
				);
			}

			Ribbon.bounds = new Vector2D(this.canvasWidth, this.canvasHeight);
			for (let i = 0; i < Config.RIBBON_COUNT; i++) {
				this.confettiRibbons[i] = new Ribbon(
					Math.random() * this.canvasWidth,
					-Math.random() * this.canvasHeight * 2
				);
			}

			this.stop();
			this.update();
		},

		/**
		 * Clears the entire canvas, updates the Confetti Ribbons and Papers, draws them onto
		 * the canvas and then sets the next animation frame to call this function.
		 */
		update() {

			this.context.clearRect(0, 0, canvas.width, canvas.height);

			for (let i = 0; i < Config.RIBBON_COUNT; i++) {
				this.confettiRibbons[i].update(Config.DURATION);
				this.confettiRibbons[i].draw(this.context);
			}

			for (let i = 0; i < Config.PAPER_COUNT; i++) {
				this.confettiPapers[i].update(Config.DURATION);
				this.confettiPapers[i].draw(this.context);
			}

			this.interval = window.requestAnimationFrame(() => canvasConfetti.update());
		},

		stop() {

			window.cancelAnimationFrame(this.interval);
		}
	};

	canvasConfetti.start();
	window.resizeConfetti = () => canvasConfetti.resize();
	window.addEventListener('resize', window.resizeConfetti);
}
