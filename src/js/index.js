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
function from(array) {
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

function cosineInterpolate(value) {
	return((1 - Math.cos(value * Math.PI)) / 2);
}

class GrowAndShrink extends SplashEffect {
	constructor(element, min, max) {
		super(element);

		this.min = min || 0;
		this.max = max || 1;
	}

	in(value) {
		this.setTransform("scale", cosineInterpolate(
			(this.max - this.min) * value + this.min)
		);
	}

	out(value) {
		this.setTransform("scale", cosineInterpolate(
			(this.max - this.min) * (value * -1 + 1) + this.min)
		);
	}
}

class FadeInAndOut extends SplashEffect {
	in(value) {
		this.setStyle("opacity", value);
	}

	out(value) {
		this.setStyle("opacity", value * -1 + 1);
	}
}
