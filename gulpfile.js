'use strict';


//---------//
// Imports //
//---------//

var gulp = require('gulp')
  , express = require('express')
  , gulpBrowserify = require('gulp-browserify')
  , gulpSass = require('gulp-sass')
  , path = require('path')
  , bPromise = require('bluebird')
  , http = require('http')
  , gulpLivereload = require('gulp-livereload')
  , vFs = require('vinyl-fs')
  , rimrafAsync = bPromise.promisify(require('rimraf'));


//------//
// Init //
//------//

var SERVER_PORT = 8081
  , app = express();


//-------//
// Tasks //
//-------//

gulp.task('serve', ['build-html', 'build-js', 'build-scss', 'build-fonts', 'watch-html', 'watch-js', 'watch-scss', 'watch-fonts'], function() {
  app.use(express.static(path.join(process.cwd(), 'dist')));
  var server = http.createServer(app);
  server.listen(SERVER_PORT);
});

gulp.task('clean', function clean() {
  return rimrafAsync('dist/*');
});

gulp.task('build-html', function() {
  return vFs.src(['./src/**/*.html', './src/vendor/angular-bootstrap-npm/**/*.html'])
        .pipe(vFs.dest('./dist'))
        .pipe(gulpLivereload({ start: true }));
});

gulp.task('build-js', function() {
  return vFs.src('./src/app/index.js')
      .pipe(gulpBrowserify({
        insertGlobals: true
        , debug: true
      }))
      .pipe(vFs.dest('./dist'))
      .pipe(gulpLivereload({ start: true }));
});

gulp.task('build-scss', function() {
    return vFs.src('./src/assets/scss/**/*.scss')
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(vFs.dest('./dist'))
        .pipe(gulpLivereload({ start: true }));
});

gulp.task('build-fonts', function() {
    return vFs.src(['./src/assets/fonts/**/*.*', './src/assets/fonts/@(bootstrap)/**/*.*'])
        .pipe(vFs.dest('./dist/fonts'))
        .pipe(gulpLivereload({ start: true }));
});

gulp.task('watch-html', function() {
  gulp.watch('./src/**/*.html', ['build-html']);
});

gulp.task('watch-js', function() {
  gulp.watch('./src/**/*.js', ['build-js']);
});

gulp.task('watch-scss', function() {
  gulp.watch('./src/assets/scss/**/*.scss', ['build-scss']);
});

gulp.task('watch-fonts', function() {
  gulp.watch('./src/assets/fonts/**/*.*', ['build-fonts']);
});
