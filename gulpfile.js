var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');

function handleError(err){
  console.log(err.toString());
  this.emit('end');
}

gulp.task('sass', function(){
  gulp.src('src/styles/*.scss')
      .pipe(sass()).on('error', handleError)
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

gulp.task('watch', function(){
  gulp.watch(['src/*.html'], ['copy-assets']);
  gulp.watch(['src/styles/*.scss'], ['sass']);
});

gulp.task('default', ['sass', 'copy-assets', 'imagemin', 'watch']);

