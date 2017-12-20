const gulp = require('gulp');
const print = require('gulp-print');
const sequence = require('gulp-sequence');

require('./gulp-tasks/clean');
require('./gulp-tasks/copy');
require('./gulp-tasks/aot');
require('./gulp-tasks/bundle');
require('./gulp-tasks/sass');

gulp.task('copy-debug', ['copy:js', 'copy:html', 'copy:css', 'copy:index', 'copy:angular']);
gulp.task('copy', ['copy:js', 'copy:html', 'copy:css', 'copy:index']);

gulp.task('default', sequence('copy', 'sass', 'pack', 'bundle', 'tidyup'));
gulp.task('aot', sequence('copy', 'sass', 'bundle-aot', 'tidyup-aot'));