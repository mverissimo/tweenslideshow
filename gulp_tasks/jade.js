var gulp = require('gulp');
var jade = require('gulp-jade');
var env = require('minimist')(process.argv.slice(2));
var gulpif = require('gulp-if');

module.exports = function(args) {
  'use strict';

  gulp.task('jade:main', function() {

    var isProduction = args.production;

    return gulp.src('app/templates/index.jade')
      .pipe(jade({
        pretty: isProduction
      }))
      .on('error', function(error) {
        console.error('' + error);
      })
      .pipe(gulp.dest('./dist'));

  });

  gulp.task('jade', ['jade:main']);

};
