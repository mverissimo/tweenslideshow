var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');

module.exports = function(args) {
  'use strict';

  gulp.task('style:main', function() {
    var isProduction = args.production;

    return gulp.src(['./app/assets/stylesheet/**/*.scss'])
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.init())
      .pipe(autoprefixer({
        browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
      }))
      .pipe(gulpif(isProduction, sass({
        outputStyle: 'compressed'
      })))
      .pipe(gulpif(isProduction, rename('application.min.css')))
      .pipe(sourcemaps.write('./maps/'))
      .pipe(gulp.dest('./dist/assets/stylesheet/')

      );

  });

  gulp.task('stylesheet', ['style:main']);

};
