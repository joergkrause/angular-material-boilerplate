const gulp = require('gulp');
const print = require('gulp-print');
const gulpSass = require('gulp-sass');
const cssClean = require('gulp-clean-css');
const gzip = require('gulp-gzip');

var sass = gulp.task('sass', function () {
  return gulp.src('./src/**/*.scss')
    .pipe(gulpSass({
      includePaths: [
        './node_modules/@angular/material'
      ]
    }).on('error', gulpSass.logError))
    .pipe(cssClean())
    .pipe(gulp.dest('./dist'))
    .pipe(gzip())
    .pipe(gulp.dest('./dist'));
});

exports.sass = sass;
