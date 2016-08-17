var gulp = require('gulp');
var browserSync = require('browser-sync');

module.exports = function() {

	gulp.task('server', function() {
		return browserSync.init(['dist/index.html', 'dist/assets/stylesheet/**/*.css', 'dist/assets/javascript/**/*.js'], {
			open: 'external',
			server: {
				baseDir: './dist/',
			},

		});

	});

	gulp.task('browserSync', ['server']);

};