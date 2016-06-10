import { SplashEffect } from "./effect.js";
import { Linear } from "../interpolation.js";

export class DrawSVG extends SplashEffect {
	constructor(element, options) {
		super(element);

		options = options || {};

		this.interpolation = options.interpolation || new Linear();

		this.length = element.getTotalLength();
		this.setStyle("stroke-dasharray", this.length);
		this.setStyle("stroke-dashoffset", this.length);
	}

	in(value) {
		this.setStyle("stroke-dashoffset", (value * -1 + 1) * this.length);
	}

	out(value) {
		this.setStyle("stroke-dashoffset", value * this.length);
	}
}
