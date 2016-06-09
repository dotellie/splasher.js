// Creates the main splash scene (if you can even call it a scene)
//
// times: [Array<SplashTime>] All of the timing objects of your splash
//
// If you assign an onEnd property to the object and it's a function, it'll fire
// once the splash is completed.

export class Splash {
	constructor(times) {
		this._times = times;
	}

	run() {
		this._previousTime = window.performance.now();

		for (let time of this._times) {
			time.start();
		}

		this._update();
	}

	_update() {
		let now = window.performance.now(),
			delta = now - this._previousTime;
		this._previousTime = now;

		for (let time of this._times) {
			time.update(delta);
		}

		requestAnimationFrame(this._update.bind(this));
	}
}

// Creates a splash instace from an array of objects.
//
// Example:
// ```
// from([
//     {
//         delay: 1, in: 0.5, out: 0.5,
//         effects: [new GrowAndShrink(element)]
//     },
//     {
//         delay: 2, in: 1, stay: 0.2, out: 1
//         effects: [new FadeInAndOut(element)]
//     }
// ]);
// ```
// (Yes, I am aware that this would be pointless to do, but whatever)
export function splashFromArray(array) {
	let splashTimers = [];
	for (let time of array) {
		splashTimers.push(new SplashTimer(
			time.delay || 0,
			time.effects,
			{
				open: time.in || 0,
				stay: time.stay || 0,
				out: time.out || 0
			}
		));
	}
	return new Splash(splashTimers);
}

// Creates a splash timer object. Used for timing all the effects.
//
// delay: How much should this timer be delayed after the splash was started (seconds)
// effects: [Array<SplashEffect>] What effects to use
// parts: {
//     open: [Float] How long opening does this timer have (seconds)
//     stay: [Float] How long does it stay (the middle part) (seconds)
//     out: [Float] How long does it take it to end (seconds)
// }
//
// If one of the parts isn't present, a value of 0 seconds will be assumed.

export class SplashTimer {
	constructor(delay, effects, parts) {
		this.delay = delay;
		this.effects = effects;
		this.parts = {
			open: parts.open || 0,
			stay: parts.stay || 0,
			out: parts.out || 0
		}
	}

	update(delta) {
		this.seconds += delta / 1000;

		if (this.started) {
			if (this.seconds <= this._times[0]) {
				let value = this.seconds / this.parts.open;
				this._runEffect("in", value);
			} else if (this.seconds <= this._times[1]) {
				if (this._count == 0) {
					this._runEffect("in", 1);
					this._count = 1;
				}

				let value = (this.seconds - this._times[0]) / this.parts.stay;
				this._runEffect("stay", value);
			} else if (this.seconds <= this._times[2]) {
				if (this._count == 1) {
					this._runEffect("stay", 1);
					this._count = 2;
				}

				let value = (this.seconds - this._times[1]) / this.parts.out;
				this._runEffect("out", value);
			} else if (this._count == 2) {
				this._runEffect("out", 1);
				this._count = 3;
			}
		} else {
			this._runEffect("in", 0);

			if (this.seconds >= this.delay) {
				this.seconds = 0;
				this.started = true;
			}
		}
	}

	_runEffect(stage, value) {
		for (let effect of this.effects) {
			if (typeof effect[stage] == "function") effect[stage](value);
		}
	}

	start() {
		this.seconds = 0;
		this._times = [
			this.parts.open,
			this.parts.open + this.parts.stay,
			this.parts.open + this.parts.stay + this.parts.out
		];
		this._count = 0;
	}
}

import * as effects from "./effects";
import * as interpolation from "./interpolation.js";

export { effects };
export { interpolation };
