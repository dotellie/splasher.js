// Creates the main splash scene (if you can even call it a scene)
//
// times: [Array<SplashTime>] All of the timing objects of your splash
//
// If you assign an onEnd property to the object and it's a function, it'll fire
// once the splash is completed.

class Splash {
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
// effects: [Array<SplashEffect>] What effects to use
// parts: {
//     open: [Float] How long opening does this timer have (seconds)
//     stay: [Float] How long does it stay (the middle part) (seconds)
//     out: [Float] How long does it take it to end (seconds)
// }
//
// If one of the parts isn't present, a value of 0 seconds will be assumed.

class SplashTimer {
	constructor(delay, effects, parts) {
		this.delay = delay;
		this.effect = effects;
		this.parts = {
			parts.opening || 0,
			parts.stay || 0,
			parts.out || 0
		}
	}

	update(delta) {
		this.seconds += delta;

		let partTime = [
			this.parts.open,
			this.parts.open + this.parts.stay,
			this.parts.open + this.parts.stay + this.parts.out
		];

		if (this.seconds <= partTime[0]) {
			let value = this.seconds / this.parts.open;

			for (let effect of this.effects) {
				effect.in(value);
			}
		} else if (this.seconds <= partTime[1]) {
			let value = (this.seconds - partTime[0]) / this.parts.stay;

			for (let effect of this.effects) {
				effect.stay(value);
			}
		} else if (this.seconds <= partTime[2]) {
			let value = (this.seconds - partTime[1]) / this.parts.out;

			for (let effect of this.effects) {
				effect.out(value);
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
class SplashEffect {
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

class GrowAndShrink extends SplashEffect {
	constructor(element, min, max) {
		super(element);

		this.min = min;
		if (typeof max == "undefined") max = 1;
	}

	in(value) {
		this.setStyle("transform", "scale(" + value + ")");
	}

	out(value) {
		this.setStyle("transform", "scale(" + (value * -1 + 1) + ")");
	}
}

class FadeIn extends SplashEffect {

}
