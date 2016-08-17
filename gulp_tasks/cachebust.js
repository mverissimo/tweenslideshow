var cachebust = require('gulp-cache-bust');

module.exports = function (gulp, $) {
  'use strict';

  return function() {
    gulp.src('./dist/index.html')
        .pipe(cachebust())
        .pipe(gulp.dest('./dist'));

    };

};
