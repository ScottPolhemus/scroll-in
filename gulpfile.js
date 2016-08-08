var gulp = require('gulp');

require('./tasks/browserify');

/**
 * Defines the "build" task for Gulp.
 */
gulp.task('build', ['browserify']);

/**
 * Defines the default (development) task for Gulp.
 */
gulp.task('default', ['watchify']);
