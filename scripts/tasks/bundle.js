const gulp = require('gulp');
const print = require('gulp-print');
const systemBuilder = require('systemjs-builder');
const sequence = require('gulp-sequence');
const inlineBuilder = require('../inline-resources');

const zip = require('./zip');

var pack = gulp.task('pack', function () {
  return inlineBuilder('./dist/app');
});

gulp.task('bundle:create', function () {
  var builder = new systemBuilder('.', {
    paths: { 'npm:': './node_modules/' },
    map: {
      '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
      '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
      '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js', '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/material': 'npm:@angular/material/bundles/material.umd.js',
      '@angular/material/menu': 'npm:@angular/material/bundles/material.umd.js',
      '@angular/material/icon': 'npm:@angular/material/bundles/material.umd.js',
      '@angular/material/core': 'npm:@angular/material/bundles/material.umd.js',
      '@angular/material/button': 'npm:@angular/material/bundles/material.umd.js',
      '@angular/material/toolbar': 'npm:@angular/material/bundles/material.umd.js',
      '@angular/material/card': 'npm:@angular/material/bundles/material.umd.js',
      '@angular/material/datepicker': 'npm:@angular/material/bundles/material.umd.js',
      '@angular/material/radio': 'npm:@angular/material/bundles/material.umd.js',
      '@angular/material/checkbox': 'npm:@angular/material/bundles/material.umd.js',
      '@angular/material/chips': 'npm:@angular/material/bundles/material.umd.js',
      '@angular/material/list': 'npm:@angular/material/bundles/material.umd.js',
      '@angular/material/input': 'npm:@angular/material/bundles/material.umd.js',
      '@angular/material/form-field': 'npm:@angular/material/bundles/material.umd.js',
      '@angular/material/select': 'npm:@angular/material/bundles/material.umd.js',
      '@angular/material/progress-spinner': 'npm:@angular/material/bundles/material.umd.js',
      '@angular/cdk': 'npm:@angular/cdk/bundles/cdk.umd.js',
      '@angular/cdk/a11y': 'npm:/@angular/cdk/bundles/cdk-a11y.umd.js',
      '@angular/cdk/accordion': 'npm:/@angular/cdk/bundles/cdk-accordion.umd.js',
      '@angular/cdk/bidi': 'npm:/@angular/cdk/bundles/cdk-bidi.umd.js',
      '@angular/cdk/layout': 'npm:/@angular/cdk/bundles/cdk-layout.umd.js',
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
      'rxjs': 'npm:rxjs',
      'tslib': 'npm:tslib/tslib.js'
    },
    packages: {
      "app": { main: 'main.js', defaultExtension: "js" },
      "rxjs": { main: "Rx.js", defaultExtension: "js" }
    }
  });
  builder.loader.defaultJSExtensions = true;
  return builder
    .buildStatic('./dist/main.js', './dist/main.bundle.js', {
      sourceMaps: true,
      minify: true,
      mangle: false,
      rollup: true
    })
    .then(function () {
      console.log('Bundle completed');
    });
});

var bundle = gulp.task('bundle', sequence('bundle:create', 'bundle:zip'));

exports.pack = pack;
exports.bundle = bundle;
