var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var wrap = require('gulp-wrap');

var browserSync = require('browser-sync');
var reload      = browserSync.reload;

function handleError(err) {
  console.log(err);
  this.emit('end');
}

gulp.task('build', function() {
  gulp.src('pages/*.html')
    .pipe(wrap({src: "layout/default.html"}))
    .pipe(gulp.dest('..'))
    .pipe(reload({stream: true}));;
})

gulp.task('sass', function() {
  gulp.src('styles/main.scss')
    .pipe(sass().on('error', handleError))
    .pipe(prefix())
    .pipe(gulp.dest('../styles'))
    .pipe(reload({stream: true}));
});

gulp.task('rebuild', ['build'], function() {
  reload();
})

gulp.task('cp', function() {
  gulp.src(['js/**/*.js', 'assets/*'], {base: '.'})
    .pipe(gulp.dest('..'));
})

gulp.task('watch', function() {
  gulp.watch(['**/*.html'], ['rebuild']);
  gulp.watch(['styles/*.scss'], ['sass']);
  gulp.watch(['js/*.js', 'assets/*'], ['cp']);
});

gulp.task('browserSync', ['build', 'sass', 'cp'], function() {
  browserSync({server: {
    baseDir: '../'
  }});
})

gulp.task('default', ['browserSync', 'watch']);
