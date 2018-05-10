module.exports = function() {
  $.gulp.task('fonts', function () {
    return $.gulp.src($.fonts + '**/*.{ttf,eot,woff,woff2}')
      .pipe($.gulp.dest($.assets + 'fonts/'));
    }
  );
}