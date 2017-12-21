# How it Works

The project has two ways of being build. The classic mode and the AOT (ahead of time) compiler mode. The latter produces the better results, of course, but may have limitations in bigger projects. The gain is 30%. This may matter or not, it depends on your requirements. Hence, it makes sense to have different options.

## The Gulp Build System

## The System Builder

I'm using SystemJS. I was in SystemJS from the beginning because it was the recommandation from the Angular team. That's a long time ago and meanwhile everybody is using WebPack for good reason. But I like the flexibility of Gulp, doing things completely unrelated to Angular in the very same environment. It's also more flexible regarding debugging and error tracing. It's more powerful, because I'm straight on NodeJs and can do everything without adding more and more plug-ins. Of course, some projects may not use this. But it's worth looking into alternative ways as long as they produce similar results.

### Steps to Create

The creating procedure has three steps:

1. Clean Up
2. Compile
3. Bundle

See [here for a map](classic-map.html) of the classic bundle.

See [here for a map](aot-map.html) of the aot bundle.

The bundler is [SystemJS-Builder](https://github.com/systemjs/builder) from the [SystemJs](https://github.com/systemjs/systemjs) project.

The instruction in *package.json* looks like this:

~~~
"build": "gulp clean && tsc && gulp"
~~~

The TypeScript task has nothing special. The hard work happens in the Gulp task:

~~~
gulp.task('default', sequence('copy', 'sass', 'pack', 'bundle', 'tidyup'));
~~~

This consists of multiple steps:

* copy: Copy all static parts, including css, scss, html into the ./dist folder
* sass: Convert scss files into css in place
* pack: Inline external templates and styles (see below)
* bundle: Make one self executing bundle (see below)
* tidyup: Clean the temporary files in the ./dist folder

#### Pack

The packer looks for components with the `styleUrls` and `templateUrl` properties set. It reads the static files (hence the copy step) and copies the content, shrinked and converted, into the component's file. Is styles are made with SASS (scss), the SASS-compiler will be asked to create the proper CSS.

The actual packer is in the file *scripts/inline-resources.js*. The core function looks like this:

~~~
function inlineResources(globs) {
  if (typeof globs == 'string') {
    globs = [globs];
  }
  /**
   * For every argument, inline the templates and styles under it and write the new file.
   */
  return Promise.all(globs.map(pattern => {
    if (pattern.indexOf('*') < 0) {
      // Argument is a directory target, add glob patterns to include every files.
      pattern = path.join(pattern, '**', '*');
    }
    // Matches only JavaScript/TypeScript files.
    const files = glob.sync(pattern, {})
      .filter(name => /\.[jt]s$/.test(name));  

    // Generate all files content with inlined templates.
    return Promise.all(files.map(filePath => {
      return readFilePromise(filePath, 'utf-8')
        .then(content => inlineResourcesFromString(content, url => {
          if (path.extname(url) === '.scss') {
            url = url.substr(0, url.lastIndexOf('.')) + '.css';
          }
          return path.join(path.dirname(filePath), url);
        }))
        .then(content => writeFilePromise(filePath, content))
        .catch(err => {
          console.error('An error occurred: ', filePath + ' ==> ' + err);
        });
    }));
  }));
}
~~~

See the full script for all details. The core work happens in the *readFilePromise* and *writeFilePromise* parts.

#### Bundling

The actual bundling is merely a configuration task. And this is how the task looks like:

~~~
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
      '@angular/material/menu': 'npm:@angular/material/bundles/material.umd.js',
      '@angular/material/icon': 'npm:@angular/material/bundles/material.umd.js',
      '@angular/material/core': 'npm:@angular/material/bundles/material.umd.js',
      '@angular/material/button': 'npm:@angular/material/bundles/material.umd.js',
      '@angular/material/toolbar': 'npm:@angular/material/bundles/material.umd.js',
      '@angular/material/card': 'npm:@angular/material/bundles/material.umd.js',
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
      sourceMaps: false,
      minify: true,
      mangle: true,
      rollup: true
    })
    .then(function () {
      console.log('Bundle completed');
    });
});
~~~

The mapping resolves all modules neede for Angular 5 and the Material CDK. Watch the *tslib* at the end. This is required for the new *@angular/common/http" module. The builder is set to minify as aggressive as possible: 

* minify: Minify the JavaScript
* mangle: Simplify longer variable names (MyCoolVariable turns into e4 if possible, for instance)
* rollup: Make one huge file 

After this step the whole project is in one file: *main.bundle.js*. It includes Angular, the CDK, and the custom parts. That's different to WebPack. We still have a *vendor.js* file, but only for the polyfills that some elder browsers require.

#### Vendor

The vendor part excludes Angular and RXJS, it's just to handle the polyfills separately. Eventually this stuff becomes part of the regular browser and we can get rid of it (apart from *system.js*, which is the actual loader):

~~~
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
~~~

The files are being concatenated, then uglified and a pre-zipped copy is created to have an instant measure of size. The *print()* function is just for debugging.
