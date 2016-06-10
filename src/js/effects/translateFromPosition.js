import { SplashEffect } from "./effect.js";
import { Linear } from "../interpolation.js";

export class TranslateFromPosition extends SplashEffect {
	constructor(element, options) {
		super(element);

		options = options || {};

		this.x = options.x || 0;
		this.y = options.y || 0;

		this.interpolation = options.interpolation || new Linear();
	}

	in(value) {
		let x = this.interpolation.in(value * -1 + 1) * this.x,
			y = this.interpolation.in(value * -1 + 1) * this.y;
		this.setStyle("left", x + "px");
		this.setStyle("top", y + "px");
	}

	out(value) {
		let x = this.interpolation.out(value) * this.x,
			y = this.interpolation.out(value) * this.y;
		this.setStyle("left", x + "px");
		this.setStyle("top", y + "px");
	}
}
