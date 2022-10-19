const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();

// css Task
function scssTask() {
  return src('app/scss/style.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(postcss([cssnano()]))
    .pipe(dest('dist', { sourcemaps: '.' }));
}

// Js Task
function jsTask() {
  return src('app/js/*.js', { sourcemaps: true })
    // .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(terser())
    .pipe(dest('dist', { sourcemaps: '.' }));
}

function browserSyncServer(cb) {
  browserSync.init({
    server: {
      baseDir: './',
    },
    notify: {
      styles: {
        top: 'auto',
        bottom: '0',
      },
    },
  });
  cb();

}

function browserSyncReload(cb) {
  browserSync.reload();
  cb();
}

function watchTasks(cb) {
  watch('*.html', browserSyncReload);
  watch(
    ['app/scss/**/*.scss', 'app/js/*.js'],
    series(scssTask, jsTask, browserSyncReload)
  );
  cb();
}
exports.default = series(scssTask, jsTask, browserSyncServer, watchTasks);

exports.build = series(scssTask, jsTask);
