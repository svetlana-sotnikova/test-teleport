var gulp = require('gulp');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var nib = require('nib');
var browserSync = require('browser-sync');

var public = './build/';

gulp.task('sync', function () {
  browserSync.init({
    server: {
      baseDir: public
    },
    port: '8800',
    open: false,
    serveStatic: [
      './src',
      {
        route: '/api',
        dir: './src/blocks'
      }
    ]
  });

  gulp.watch(
    [ '*.html' ],
    { cwd: public },
    browserSync.reload
  );
});

gulp.task('stylus', function() {
  gulp
    .src('./src/style.styl')
    .pipe(stylus({
      compress: false,
      use:[
        nib()
      ]
    }))
    // .pipe(autoprefixer({
    //   browsers: ['last 2 versions'],
    //   cascade: false
    // }))
    .pipe(gulp.dest(public))
    .pipe(browserSync.stream());
});

gulp.task('pug', function () {
  gulp
    .src('./src/index.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(public));
});

gulp.task('watchers', function() {
  gulp.watch('./src/**/*.styl', ['stylus']);
  gulp.watch('./src/**/*.pug', ['pug']);
  gulp.watch('./src/**/*.js', browserSync.reload);
});

gulp.task(
  'default',
  [
    'watchers',
    'stylus',
    'pug',
    'sync'
  ]
);

gulp.task(
  'build',
  [
    'stylus',
    'pug'
  ]
);
