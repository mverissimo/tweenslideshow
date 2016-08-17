var gulp = require('gulp');
var glob = require('glob');

var args = require('yargs')
	.default('production', false)
	.alias('prod', 'production')
	.argv;

glob.sync('gulp_tasks/*.js', { realpath: true })
	.forEach(function(file) {
		require(file)(args);
	});

gulp.task('default', ['browserSync', 'watch', 'jade', 'stylesheet', 'javascript', 'copy']);
