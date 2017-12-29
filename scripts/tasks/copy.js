const gulp = require('gulp');
const uglify = require('gulp-uglify');
const print = require('gulp-print');
const del = require('del');
const gzip = require('gulp-gzip');
const concat = require('gulp-concat');
const sequence = require('gulp-sequence');


var copyjs = gulp.task('copy:js', function () {
  return gulp.src([ // glob pattern !
    './node_modules/core-js/client/core.js',
    './node_modules/zone.js/dist/zone.js',
    './node_modules/systemjs/dist/system.js'
  ])
    .pipe(print())
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(gzip())
    .pipe(gulp.dest('./dist/assets/js'));
});

var copyidx = gulp.task('copy:index', function () {
  return gulp.src(['./src/index.html'])
    .pipe(gulp.dest('./dist'));
});

var copyng = gulp.task('copy:angular', function () {
  return gulp.src([
    './node_modules/@angular/**/bundles/*.umd.js',
    '!./node_modules/@angular/**/bundles/*-testing.*'
  ])
    .pipe(uglify())
    .pipe(gulp.dest('./dist/assets/js/lib/@angular'));
});

var copyhtm = gulp.task('copy:html', function () {
  return gulp.src('./src/app/**/*.+(html|css)')
    .pipe(print())
    .pipe(gulp.dest('./dist/app'));
});

var copyfav = gulp.task('copy:fav', function () {
  return gulp.src('./src/assets/favicon.ico')
    .pipe(print())
    .pipe(gulp.dest('./dist'));
});

var copycss = gulp.task('copy:css', function () {
  return gulp.src([
    './node_modules/material-design-icons/iconfont/MaterialIcons-Regular.svg',
    './node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff',
    './node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff2'
  ])
    .pipe(print())
    .pipe(gulp.dest('./dist/assets/styles'));
});

exports.copycss = copycss;
exports.copyjs = copyjs;
exports.copyhtm = copyhtm;
exports.copyidx = copyidx;
exports.copyng = copyng;
exports.copyfav = copyfav;
