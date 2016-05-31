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
			delta = this._previousTime - now;
		this._previousTime = now;

		for (let time of this._times) {
			time.update(delta);
		}

		requestAnimationFrame(this._update.bind(this));
	}
}

// Creates a splash timer object. Used for timing all the effects.
//
// delay: How much should this timer be delayed after the splash was started (seconds)
// parts: {
//     open: {
//         length: [Float] For how long does this part last (seconds)
//         effects: [Array<SplashEffect>] What effects to use
//     },
//     stay: {
//         length: [Float] For how long does this part last (seconds)
//         effects: [Array<SplashEffect>] What effects to use
//     }
//     end: {
//         length: [Float] For how long does this part last (seconds)
//         effects: [Array<SplashEffect>] What effects to use
//     }
// }

export class SplashTimer {
	constructor(delay, parts) {
		this.delay = delay;
		this.parts = parts;
	}

	update(delta) {
		this.seconds += delta;

		for (let part of this.parts) { // TODO: Don't do this if already done
			let partTime = [
				part.open.length,
				part.open.length + part.stay.length,
				part.open.length + part.stay.length + part.end.length
			];
			if (this.seconds <= partTime[0]) {
				let value = this.seconds / part.length;

				for (let effect of part.effects) {
					effect.in(value);
				}
			} else if (this.seconds <= partTime[1]) {
				let value = (this.seconds - partTime[0]) / part.length;

				for (let effect of part.effects) {
					effect.stay(value);
				}
			} else if (this.seconds <= partTime[2]) {
				let value = (this.seconds - partTime[1]) / part.length;

				for (let effect of part.effects) {
					effect.end(value);
				}
			}
		}
	}

	start() {
		this.seconds = 0;
	}
}

// ### Splash effect base class ###

// Splash effects are created as follows:
// Create a new class and extend it with this class. Then add a constructor
// which calls super with the element you want to modify. Add functions in, out
// and stay respectively as needed. If you don't want to use one of them, skip it.
//
// When implementing the in, out and stay functions, you most likely want to use
// css styles, which you do with `this.setStyle(style, value)`.
export class SplashEffect {
	constructor(element) {
		this.element = element;
	}

	setStyle(style, value) {
		if (style != "transform") {
			this.element.style[style] = value;
		} else {
			this.element.style[style] += value;
		}
	}
}


// ### Some basic effects ###

export class GrowAndShrink extends SplashEffect {
	constructor(element, min, max) {
		super(element);

		this.min = min;
		if (typeof max == "undefined") max = 1;
	}

	in(value) {

	}

	out(value) {

	}
}

export class FadeIn extends SplashEffect {

}
