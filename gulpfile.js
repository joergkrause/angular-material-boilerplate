const gulp = require('gulp');
const uglify = require('gulp-uglify');
const print = require('gulp-print');
const del = require('del');
const systemBuilder = require('systemjs-builder');
const inlineBuilder = require('./scripts/inline-resources');
const gzip = require('gulp-gzip');
const concat = require('gulp-concat');
const sequence = require('gulp-sequence');
const gulpSass = require('gulp-sass');
const cssClean = require('gulp-clean-css');

gulp.task('clean', function () {
  return del('./dist');
});

gulp.task('copy:js', function () {
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

gulp.task('copy:index', function () {
  return gulp.src(['./src/index.html'])
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy:angular', function () {
  return gulp.src([
    './node_modules/@angular/**/bundles/*.umd.js',
    '!./node_modules/@angular/**/bundles/*-testing.*'
  ])
    .pipe(uglify())
    .pipe(gulp.dest('./dist/assets/js/lib/@angular'));
});

gulp.task('copy:html', function () {
  return gulp.src('./src/app/**/*.+(html|css)')
    .pipe(print())
    .pipe(gulp.dest('./dist/app'));
})

gulp.task('pack', function () {
  return inlineBuilder('./dist/app');
});


gulp.task('bundle:create', function () {
  var builder = new systemBuilder('.', {
    paths: { 'npm:': './node_modules/' },
    map: {
      '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
      '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
      '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',         '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/material': 'npm:@angular/material/bundles/material.umd.js',
      '@angular/cdk': 'npm:@angular/cdk/bundles/cdk.umd.js',
      '@angular/cdk/a11y': 'npm:/@angular/cdk/bundles/cdk-a11y.umd.js',
      '@angular/cdk/bidi': 'npm:/@angular/cdk/bundles/cdk-bidi.umd.js',
      '@angular/cdk/observers': 'npm:/@angular/cdk/bundles/cdk-observers.umd.js',
      '@angular/cdk/overlay': 'npm:/@angular/cdk/bundles/cdk-overlay.umd.js',
      '@angular/cdk/portal': 'npm:/@angular/cdk/bundles/cdk-portal.umd.js',
      '@angular/cdk/stepper': 'npm:/@angular/cdk/bundles/cdk-stepper.umd.js',
      '@angular/cdk/scrolling': 'npm:/@angular/cdk/bundles/cdk-scrolling.umd.js',
      '@angular/cdk/platform': 'npm:/@angular/cdk/bundles/cdk-platform.umd.js',
      '@angular/cdk/keycodes': 'npm:/@angular/cdk/bundles/cdk-keycodes.umd.js',
      '@angular/cdk/coercion': 'npm:/@angular/cdk/bundles/cdk-coercion.umd.js',
      '@angular/cdk/collections': 'npm:/@angular/cdk/bundles/cdk-collections.umd.js',
      '@angular/cdk/rxjs': 'npm:/@angular/cdk/bundles/cdk-rxjs.umd.js',
      '@angular/cdk/table': 'npm:/@angular/cdk/bundles/cdk-table.umd.js',
      'rxjs': 'npm:rxjs'
    },
    packages: {
      "app": { main: 'main.js', defaultExtension: "js" },
      "rxjs": { main: "Rx.js", defaultExtension: "js" }
    }
  });
  //builder.reset();
  builder.loader.defaultJSExtensions = true;
  return builder
    .buildStatic('./dist/app/main.js', './dist/main.bundle.js', {
      sourceMaps: true,
      minify: true,
      mangle: true,
      rollup: true
    })
    .then(function () {
      console.log('Bundle completed');
    });
});

gulp.task('bundle:zip', function () {
  return gulp.src('./dist/main.bundle.js').pipe(gzip()).pipe(gulp.dest('./dist'));
});

gulp.task('bundle', sequence('bundle:create', 'bundle:zip'));

gulp.task('sass', function () {
  return gulp.src('./src/**/*.scss')
    .pipe(gulpSass({
      includePaths: [
        './node_modules/@angular/material'
      ]
    }).on('error', gulpSass.logError))
    .pipe(cssClean())
    .pipe(gulp.dest('./dist'));
});

gulp.task('tidyup', function(){
  return del(['./dist/app/**', './dist/buildingblocks/**', './dist/shared/**'])
});

gulp.task('copy:debug', ['copy:js', 'copy:html', 'copy:index', 'copy:angular']);
gulp.task('copy', ['copy:js', 'copy:html', 'copy:index']);

gulp.task('default', sequence('copy', 'sass', 'pack', 'bundle', 'tidyup'));