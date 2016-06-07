import { SplashEffect } from "./effect.js";

export class GrowAndShrink extends SplashEffect {
	constructor(element, options) {
		super(element);

		this.min = options.min || 0;
		this.max = options.max || 1;
	}

	in(value) {
		this.setTransform("scale", cosineInterpolate(
			(this.max - this.min) * value + this.min)
		);
	}

	out(value) {
		this.setTransform("scale", cosineInterpolate(
			(this.max - this.min) * (value * -1 + 1) + this.min)
		);
	}
}

function cosineInterpolate(value) {
	return((1 - Math.cos(value * Math.PI)) / 2);
}
