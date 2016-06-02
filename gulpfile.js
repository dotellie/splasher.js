var gulp = require("gulp"),
	webserver = require("gulp-webserver"),
	notify = require("gulp-notify"),
	babelify = require("babelify"),
	sourcemaps = require("gulp-sourcemaps"),
	gutil = require("gulp-util"),
	browserify = require("browserify"),
	watchify = require("watchify"),
	source = require("vinyl-source-stream"),
	buffer = require("vinyl-buffer");

var htmlPath = "src/html/**/*.html";

function handleError(error) {
	notify.onError({
		title: "Build Error!",
		message: "<%= error.message %>"
	})(error);

	this.emit("end");
}

function buildJS(watch) {
	var browserifyInstance = browserify({
			entries: ["./src/js/index.js"],
			debug: true,
			cache: {},
		    packageCache: {},
		    fullPaths: watch
		}).transform("babelify", {
			presets: ["es2015"]
		});

	var b = watch ? watchify(browserifyInstance) : browserifyInstance;

 	var build = function() {
		return b.bundle()
			.on("error", handleError)
			.pipe(source("splasher.js"))
			.pipe(buffer())
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(sourcemaps.write("."))
			.pipe(gulp.dest("lib/"));
	}

	if (watch) {
		b.on("update", function() {
			gutil.log("Rebundling...");
			build();
		});
		b.on("log", function(e) {
			gutil.log("Bundling Successful: " + gutil.colors.gray(e));
		});
	}

	return build();
}

gulp.task("js", function() {
	return buildJS(false);
});

gulp.task("html", function() {
	return gulp.src(htmlPath)
		.pipe(gulp.dest("bin"));
});

gulp.task("default", ["html", "js"]);

gulp.task("watch", ["default"], function() {
	gulp.watch(htmlPath, ["html"]);
	buildJS(true);

	// Local web-server
	gulp.src("bin").pipe(webserver({ livereload: true }));
});
