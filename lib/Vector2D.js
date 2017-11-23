
/**
 * Subtracts a 2D vector by a 2D vector.
 *
 * @param {Vector2D} vector1
 * @param {Vector2D} vector2
 */
export function SubtractVector2D(vector1, vector2) {

	return new Vector2D(vector1.x - vector2.x, vector1.y - vector2.y);
}

/**
 * Represents a simple 2D vector with x and z values.
 *
 * @param  {Integer} x The x position of the Vector.
 * @param  {Integer} y The y position of the Vector.
 * @return {Vector2D}  A Vector2D object with all the anemities of a Vector class.
 */
export default function Vector2D(x, y) {

	return {

		x: x,
		y: y,

		length() {

			return Math.sqrt(this.sqrtLength());
		},

		sqrtLength() {

			return this.x * this.x + this.y * this.y;
		},

		add(vector) {

			this.x += vector.x;
			this.y += vector.y;
		},
		subtract(vector) {

			this.x -= vector.x;
			this.y -= vector.y;
		},

		divide(divisor) {

			this.x /= divisor;
			this.y /= divisor;
		},

		multiply(multiplier) {

			this.x *= multiplier;
			this.y *= multiplier;
		},

		normalize() {

			let sqrLen = this.sqrtLength();

			if (sqrLen !== 0) {
				let factor = 1.0 / Math.sqrt(sqrLen);
				this.x *= factor;
				this.y *= factor;
			}
		},

		normalized() {

			let sqrLen = this.sqrtLength();

			if (sqrLen !== 0) {
				let factor = 1.0 / Math.sqrt(sqrLen);
				return new Vector2D(this.x * factor, this.y * factor);
			}
			return new Vector2D(0, 0);
		}
	};
}
