const gulp = require('gulp');
const gzip = require('gulp-gzip');

var zip = gulp.task('bundle:zip', function () {
  return gulp.src('./dist/main.bundle.js').pipe(gzip()).pipe(gulp.dest('./dist'));
});

exports.zip = zip;
