
import Vector2D from './Vector2D';

/**
 * A Object that takes an mass of an object and its drag coefficient to calculate
 * the next position of the object.
 *
 * @param  {Integer}   x    The x position of the Vector.
 * @param  {Integer}   y    The y position of the Vector.
 * @param  {Float}     mass The mass of the Euler Object.
 * @param  {Float}     drag The drag caused by the Euler Object.
 * @return {EulerMass}      An object with movement.
 */
export default function (x, y, mass, drag) {

	return {

		position: new Vector2D(x, y),
		mass: mass,
		drag: drag,
		force: new Vector2D(0, 0),
		velocity: new Vector2D(0, 0),

		addForce(force) {

			this.force.add(force);
		},

		integrate(duration) {

			let acc = this.currentForce(this.position);
			acc.divide(this.mass);
			let posDelta = new Vector2D(this.velocity.x, this.velocity.y);
			posDelta.multiply(duration);
			this.position.add(posDelta);
			acc.multiply(duration);
			this.velocity.add(acc);
			this.force = new Vector2D(0, 0);
		},

		currentForce(_pos, _vel) {

			let totalForce = new Vector2D(this.force.x, this.force.y);
			let speed = this.velocity.length();
			let dragVel = new Vector2D(this.velocity.x, this.velocity.y);
			dragVel.multiply(this.drag * this.mass * speed);
			totalForce.subtract(dragVel);
			return totalForce;
		}
	};
}
