var gulp = require("gulp"),
	webserver = require("gulp-webserver"),
	notify = require("gulp-notify"),
	babel = require("gulp-babel"),
	sourcemaps = require("gulp-sourcemaps"),
	gutil = require("gulp-util");

var htmlPath = "src/html/**/*.html",
	cssPath = "src/css/**/*.css",
	jsPath = "src/js/**/*.js";

gulp.task("js", function() {
	return gulp.src(jsPath)
		.pipe(sourcemaps.init())
		.pipe(babel({ presets: ["es2015"] }))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("bin/js"));
});

gulp.task("html", function() {
	return gulp.src(htmlPath)
		.pipe(gulp.dest("bin"));
});

gulp.task("css", function() {
	return gulp.src(cssPath)
		.pipe(gulp.dest("bin/css"));
});

gulp.task("default", ["html", "css", "js"]);

gulp.task("watch", ["default"], function() {
	gulp.watch(htmlPath, ["html"]);
	gulp.watch(cssPath, ["css"]);
	gulp.watch(jsPath, ["js"]);

	// Local web-server
	gulp.src("bin").pipe(webserver({ livereload: true }));
});
