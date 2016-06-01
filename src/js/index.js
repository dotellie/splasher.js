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
			delta = now - this._previousTime;
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
		this.effects = effects;
		this.parts = {
			open: parts.open || 0,
			stay: parts.stay || 0,
			out: parts.out || 0
		}
	}

	update(delta) {
		this.seconds += delta / 1000;

		let partTime = [
			this.parts.open,
			this.parts.open + this.parts.stay,
			this.parts.open + this.parts.stay + this.parts.out
		];

		if (this.seconds <= partTime[0]) {
			let value = this.seconds / this.parts.open;

			for (let effect of this.effects) {
				if (typeof effect.in == "function") effect.in(value);
			}
		} else if (this.seconds <= partTime[1]) {
			let value = (this.seconds - partTime[0]) / this.parts.stay;

			for (let effect of this.effects) {
				if (typeof effect.stay == "function") effect.stay(value);
			}
		} else if (this.seconds <= partTime[2]) {
			let value = (this.seconds - partTime[1]) / this.parts.out;

			for (let effect of this.effects) {
				if (typeof effect.out == "function") effect.out(value);
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
// css styles, which you do with `this.setStyle(style, value)`. Keep in mind that
// if you want to use transforms, you should use `this.setTransform(key, valye)`.

class SplashEffect {
	constructor(element) {
		this.element = element;
		this.transforms = {};
	}

	setStyle(style, value) {
		this.element.style[style] = value;
	}

	setTransform(key, value) {
		this.transforms[key] = value;
		this.applyTransforms();
	}

	applyTransforms() {
		this.element.style.transform = "";

		for (let transformName in this.transforms) {
			let transformValue = this.transforms[transformName];
			this.element.style.transform += transformName + "(" + transformValue + ")";
		}
	}
}


// ### Some basic effects ###

class GrowAndShrink extends SplashEffect {
	constructor(element, min, max) {
		super(element);

		this.min = min || 0;
		this.max = max || 1;
	}

	in(value) {
		this.setTransform("scale", (this.max - this.min) * value + this.min);
	}

	out(value) {
		this.setTransform("scale", (this.max - this.min) * (value * -1 + 1) + this.min);
	}
}

class FadeIn extends SplashEffect {

}
