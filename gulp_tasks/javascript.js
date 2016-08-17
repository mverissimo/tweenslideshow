var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');

module.exports = function(args) {
  'use strict';

  gulp.task('script:main', function() {
    var isProduction = args.production;

    return gulp.src(['./app/assets/javascript/tweenslide.js', './app/assets/javascript/script.js'])
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(gulpif(isProduction, uglify()))
      .pipe(concat('script.js'))
      .pipe(gulpif(isProduction, rename('script.min.js')))
      .pipe(gulp.dest('./dist/assets/javascript/'));

  });

  gulp.task('javascript', ['script:main']);

};
