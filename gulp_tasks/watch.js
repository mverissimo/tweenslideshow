var gulp = require('gulp');

module.exports = function() {
  'use strict';

  gulp.task('watch', function() {
    gulp.watch(['app/templates/index.jade', 'app/templates/_views/!(_)*.jade', 'app/templates/_includes/!(_)*.jade', 'app/templates/_components/!(_)*.jade'], ['jade']); //- [!()_*] ignore files in folder and not compile
    gulp.watch('app/**/*.scss', ['stylesheet']);
    gulp.watch('app/**/*.js', ['javascript']);
    gulp.watch('app/**/*.jade', ['jade']);

  });

};
