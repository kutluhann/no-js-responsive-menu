const gulp = require('gulp');
const pug = require('gulp-pug');
const prettify = require('gulp-prettify');
const sass = require('gulp-sass');
const minifyCss = require('gulp-csso');
const prefix = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

gulp.task('browser-sync', () => {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./pug/**/*.pug', ['html'])
  gulp.watch('./scss/**/*.scss', ['css'])
})

gulp.task('html', () => {
  return gulp.src('./pug/*.pug')
    .pipe(pug())
    .pipe(prettify({
      indent_size: 2,
      unformatted: ['pre', 'code'],
      preserve_newlines: true
    }))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream())
})

gulp.task('css', () => {
  return gulp.src('./scss/*.scss')
    .pipe(sass())
    .pipe(prefix())
    .pipe(gulp.dest('./css'))
    .pipe(minifyCss())
    .pipe(rename((path) => {
      path.extname = '.min.css'
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream())
})

gulp.task('default', ['browser-sync', 'html' , 'css'])