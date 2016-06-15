# Splasher.js
Splasher.js is a library meant to help you with making quick animations and a
bit more specifically, splash screens. It's farily lightweight and helps you
create awesome animations for every project you're working on!

## Why Splasher.js?
Well, here's a challenge for you: create an as nice looking splash screen as
[this](https://magnon.net) while having it still be modular. You may be fine,
right until the moment you have to deal with the path drawing. When you come to
that, you essentially have no choice but to either hard-code the values or use
CSS. Besides, I personally have never been able to understand the whole CSS
animation thing. What this library provides you with is easy to make and
maintain animations that you can easily call from JavaScript.

## Great, how do I get started?
Documentation is something which still needs some love, but I encourage you to
read through the code to understand everything that's going on since it's very
simple. To get you started though, here is some example code:

##### logic.js
```javascript
var splasher = require("splasher.js");

var splash1 = document.getElementById("splash1"),
	splash2 = document.getElementById("splash2"),
	splash3 = document.getElementById("splash3"),
	splash4 = document.getElementById("splash4");

var splash = splasher.splashFromArray([
	{
		delay: 0.2, in: 0.2, stay: 1, out: 0.1,
		effects: [
			new splasher.effects.FadeInAndOut(splash1)
		]
	},
	{
		delay: 1.6, in: 0.3, stay: 1.5, out: 0.2,
		effects: [
			new splasher.effects.FadeInAndOut(splash2),
			new splasher.effects.GrowAndShrink(splash2, { min: 0.5 })
		]
	},
	{
		delay: 3.5, in: 0.5,
		effects: [
			new splasher.effects.FadeInAndOut(splash3),
			new splasher.effects.GrowAndShrink(splash3, { min: 0.7 }),
			new splasher.effects.TranslateFromPosition(splash3, { y: 100 })
		]
	},
	{
		delay: 4.5, in: 0.5,
		effects: [
			new splasher.effects.TranslateFromPosition(splash4, { y: 100 })
		]
	}
]);

splash.run();
```
##### index.html
```html
<!DOCTYPE html>
<html>
	<head>
		<title>Splasher.js Example</title>
		<style>
			body {
				background: #DC4786;
				color: white;
				overflow: hidden;
			}

			#splash1, #splash2, #splash3 {
				position: absolute;
				top: 0; right: 0; bottom: 0; left: 0;
				font-size: 30px;
				width: 100%;
				height: 25px;
				text-align: center;
				vertical-align: middle;
				margin: auto;
			}

			#splash4 {
				position: absolute;
				bottom: calc(-100vh + 50px);
				font-size: 15px;
				width: 100%;
				height: 25px;
				text-align: center;
				vertical-align: middle;
				margin: auto;
			}

			a {
				color: #73C861;
				transition: color 0.2s;
			}

			a:hover {
				color: #6CA662;
			}
		</style>
	</head>
	<body>
		<span id="splash1">Hello, World!</span>
		<span id="splash2">This is how an example splasher.js program looks like</span>
		<span id="splash3">Enjoy using splasher.js!</span>
		<span id="splash4">
			Send questions to
			<a href="https://twitter.com/magnontobi">@magnontobi</a>
			on Twitter!
		</span>

		<script src="logic.js"></script>
	</body>
</html>
```
This needs to be run through browserify before executing (so don't try it without it!).
