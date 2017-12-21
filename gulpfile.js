const gulp = require('gulp');
const print = require('gulp-print');
const sequence = require('gulp-sequence');

require('./scripts/tasks/clean');
require('./scripts/tasks/copy');
require('./scripts/tasks/aot');
require('./scripts/tasks/bundle');
require('./scripts/tasks/sass');

gulp.task('copy-debug', ['copy:js', 'copy:html', 'copy:css', 'copy:index', 'copy:angular']);
gulp.task('copy', ['copy:js', 'copy:html', 'copy:css', 'copy:index']);

gulp.task('default', sequence('copy', 'sass', 'pack', 'bundle', 'tidyup'));
gulp.task('aot', sequence('copy', 'sass', 'bundle-aot', 'tidyup-aot'));