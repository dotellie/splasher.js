import { SplashEffect } from "./effect.js";
import { Linear } from "../interpolation.js";

export class FadeInAndOut extends SplashEffect {
	constructor(element, options) {
		super(element);

		this.interpolation = options.interpolation || new Linear();
	}

	in(value) {
		this.setStyle("opacity", this.interpolation.interpolate(value));
	}

	out(value) {
		this.setStyle("opacity", this.interpolation.interpolate(value * -1 + 1));
	}
}
