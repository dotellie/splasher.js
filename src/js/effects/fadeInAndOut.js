import { SplashEffect } from "./effect.js";

export class FadeInAndOut extends SplashEffect {
	in(value) {
		this.setStyle("opacity", value);
	}

	out(value) {
		this.setStyle("opacity", value * -1 + 1);
	}
}

function cosineInterpolate(value) {
	return((1 - Math.cos(value * Math.PI)) / 2);
}
