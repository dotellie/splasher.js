import { SplashEffect } from "./effect.js";
import { Linear } from "../interpolation.js";

export class FadeInAndOut extends SplashEffect {
	constructor(element, options) {
		super(element);

		options = options || {};

		this.interpolation = options.interpolation || new Linear();
	}

	in(value) {
		this.setStyle("opacity", this.interpolation.in(value));
	}

	out(value) {
		this.setStyle("opacity", this.interpolation.out(value * -1 + 1));
	}
}
