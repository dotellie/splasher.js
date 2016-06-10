import { SplashEffect } from "./effect.js";
import { Linear } from "../interpolation.js";

export class DrawSVG extends SplashEffect {
	constructor(element, options) {
		super(element);

		options = options || {};

		this.interpolation = options.interpolation || new Linear();

		this.fadeToFill = options.toFillFade;
		this.fadeToFillDelay = options.toFillDelay || 0;

		this.length = element.getTotalLength();
		this.setStyle("stroke-dasharray", this.length);
		this.setStyle("stroke-dashoffset", this.length);
	}

	in(value) {
		this.setStyle("stroke-dashoffset", (value * -1 + 1) * this.length);

		if (this.fadeToFill) {
			if (value > this.fadeToFillDelay) {
				let amount = (value - this.fadeToFillDelay) / (1 - this.fadeToFillDelay);
				this.setStyle("fill-opacity", amount);
				this.setStyle("stroke-opacity", amount * -1 + 1);
			}
		}
	}

	out(value) {
		this.setStyle("stroke-dashoffset", value * this.length);
	}
}
