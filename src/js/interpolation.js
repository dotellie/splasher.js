export class Linear {
	interpolate(value) {
		return value;
	}
}

export class Cosine {
	interpolate(value) {
		return((1 - Math.cos(value * Math.PI)) / 2);
		console.log("hi");
	}
}
