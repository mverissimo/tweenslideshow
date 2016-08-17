var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var svgSprite = require('gulp-svg-sprite');

module.exports = function() {
  'use strict';

  gulp.task('copy:images', function(args) {
    return gulp.src('./app/assets/images/**/*')
      .pipe(imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true
      }))

    .pipe(gulp.dest('./dist/assets/images/'));

  });

  gulp.task('copy:svg', function(args) {
    var option = {
      mode: {
        symbol: {
          render: {
            css: true,
            scss: false
          },
          dest: 'icons',
          sprite: 'icons.svg',
        },
      },
      shape: {
        id: {
          separator: '-',
        }
      }
    };

    return gulp.src('app/assets/images/icons/*.svg')
      .pipe(svgSprite(option))
      .pipe(gulp.dest('dist/assets/images'));

  });

  gulp.task('copy:json', function(args) {

    return gulp.src('./app/assets/javascript/json/**/*')
      .pipe(gulp.dest('./dist/assets/javascript/json/'));

  });

  gulp.task('copy:fonts', function(args) {
    return gulp.src('app/assets/fonts/**/*')
      .pipe(gulp.dest('dist/assets/fonts/'));

  });

  gulp.task('copy', ['copy:images', 'copy:svg', 'copy:json', 'copy:fonts']);

};
