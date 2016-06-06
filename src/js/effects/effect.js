// Splash effects are created as follows:
// Create a new class and extend it with this class. Then add a constructor
// which calls super with the element you want to modify. Add functions in, out
// and stay respectively as needed. If you don't want to use one of them, skip it.
//
// When implementing the in, out and stay functions, you most likely want to use
// css styles, which you do with `this.setStyle(style, value)`. Keep in mind that
// if you want to use transforms, you should use `this.setTransform(key, valye)`.

export class SplashEffect {
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
