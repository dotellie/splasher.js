import { SplashEffect } from "./effect.js";
import { Linear } from "../interpolation.js";

export class TranslateFromPosition extends SplashEffect {
	constructor(element, options) {
		super(element);

		options = options || {};

		this.x = options.x || 0;
		this.y = options.y || 0;

		// Can be whatever, but the effect won't do
		// anything if it isn't a valid css unit.
		this.unit = options.unit || "px";
		// Can be either "transform" or "position"
		this.translationType = options.translationType || "transform";

		this.interpolation = options.interpolation || new Linear();
	}

	in(value) {
		this._set(
			this.interpolation.in(value * -1 + 1) * this.x,
			this.interpolation.in(value * -1 + 1) * this.y
		);
	}

	out(value) {
		this._set(
			this.interpolation.out(value) * this.x,
			this.interpolation.out(value) * this.y
		);
	}

	_set(x, y) {
		if (this.translationType = "transform") {
			this.setTransform("translateX", x + this.unit);
			this.setTransform("translateY", y + this.unit);
		} else if (this.translationType = "position") {
			this.setStyle("left", x + this.unit);
			this.setStyle("top", y + this.unit);
		} else {
			console.error("Unknown translation type: " + this.translationType);
		}
	}
}
