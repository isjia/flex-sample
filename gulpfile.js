var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');


gulp.task('sass', function(){
  gulp.src('src/styles/*.scss')
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulp.dest('_site/styles'));
});

gulp.task('copy-assets', function(){
  gulp.src('src/*.html')
      .pipe(gulp.dest('_site/'));
});


gulp.task('imagemin', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('_site/images'))
);

gulp.task('default', ['sass', 'copy-assets', 'imagemin']);

