var gulp = require("gulp");
var browserify = require("browserify");
var reactify = require("reactify");
var source = require("vinyl-source-stream");

//TODO: move main.jsx into separate jsx files?
gulp.task("bundle_main", function () {
    return browserify({
        entries: "./app/main.jsx",
        debug: true
    }).transform(reactify)
        .bundle()
        .pipe(source("main.js"))
        .pipe(gulp.dest("app/dist"))
});

gulp.task("bundle_artist", function () {
    return browserify({
        entries: "./app/artist.jsx",
        debug: true
    }).transform(reactify)
        .bundle()
        .pipe(source("artist.js"))
        .pipe(gulp.dest("app/dist"))
});

gulp.task("bundle_album", function () {
    return browserify({
        entries: "./app/album.jsx",
        debug: true
    }).transform(reactify)
        .bundle()
        .pipe(source("album.js"))
        .pipe(gulp.dest("app/dist"))
});

gulp.task("bundle_track", function () {
    return browserify({
        entries: "./app/track.jsx",
        debug: true
    }).transform(reactify)
        .bundle()
        .pipe(source("track.js"))
        .pipe(gulp.dest("app/dist"))
});

gulp.task("copy", ["bundle_main", "bundle_artist", "bundle_album", "bundle_track"], function () {
    return gulp.src(["app/index.html", "app/artist.html", "app/album.html", "app/track.html"/*,"app/lib/bootstrap-css/css/bootstrap.min.css","app/style.css"*/])
        .pipe(gulp.dest("app/dist"));
});

gulp.task("default",["copy"],function(){
   console.log("Webapp built...");
});
