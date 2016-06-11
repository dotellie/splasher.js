var gulp = require("gulp"),
	notify = require("gulp-notify"),
	babel = require("gulp-babel"),
	sourcemaps = require("gulp-sourcemaps"),
	gutil = require("gulp-util");

function handleError(error) {
	notify.onError({
		title: "Build Error!",
		message: "<%= error.message %>"
	})(error);

	this.emit("end");
}

gulp.task("js", function() {
	return gulp.src("./src/js/**/*.js")
		.pipe(sourcemaps.init())
		.pipe(babel({ presets: ["es2015"] }))
		.on("error", handleError)
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("lib/"));
});

gulp.task("default", ["js"]);

gulp.task("watch", ["default"], function() {
	gulp.watch("./src/js/**/*.js", ["js"]);
});
