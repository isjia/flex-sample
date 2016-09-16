var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var wrap = require('gulp-wrap');
var browserSync = require('browser-sync').create();

function handleError(err){
  console.log(err.toString());
  this.emit('end');
}

gulp.task('sass', function(){
  return gulp.src('src/styles/*.scss')
      .pipe(sass()).on('error', handleError)
      .pipe(autoprefixer())
      .pipe(gulp.dest('_site/styles'))
      .pipe(browserSync.stream());
});

gulp.task('copy-assets', function(){
  gulp.src(['src/js/*.js'], {base: './src'})
      .pipe(gulp.dest('_site/'));
});

gulp.task('build', function(){
  gulp.src("src/pages/*.html")
      .pipe(wrap({src:"src/layout/default.html"}))
      .pipe(gulp.dest('_site'));
});

gulp.task('imagemin', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('_site/images'))
);

gulp.task('serve', ['sass', 'build', 'copy-assets', 'imagemin'], function(){
  browserSync.init({
    server: {
      baseDir: './_site'
    }
  });

  gulp.watch('src/styles/*.scss', ['sass']);
  gulp.watch('src/**/*.html', ['build']);
  gulp.watch('src/js/*.js', ['copy-assets']);
  gulp.watch('_site/*.html').on('change', browserSync.reload);
});

gulp.task('watch', function(){
  gulp.watch(['src/*.html'], ['copy-assets']);
  gulp.watch(['src/styles/*.scss'], ['sass']);
  gulp.watch(['src/pages/*.html', 'src/layout/*.html'], ['build']);
});

gulp.task('default', ['serve']);

