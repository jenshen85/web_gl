module.exports = function() {
  $.gulp.task('sass', function() {
    return $.gulp.src($.style + "[^_]*.{sass,scss}")
      .pipe(
        $.plumber({
          errorHandler: $.notify.onError(function(error) {
            return {
              title: "Styles",
              message: error.message
            };
          })
        })
      )
      .pipe($.gulpIf($.dev, $.sourcemaps.init()))
      .pipe(
        $.sass({
          outputStyle: $.dev ? "expanded" : "compact", // nested, expanded, compact, compressed
          precision: 5,
          includePaths: $.normalize
        })
      )
      .pipe($.gulpIf(!$.dev, $.postcss([
          $.autoprefixer({
            browsers: ["last 4 versions"],
            cascade: false
          }),
          $.csso
      ])))
      .pipe($.gulpIf(!$.dev, $.rename({
        suffix: ".min"
      })))
      .pipe($.gulpIf($.dev, $.sourcemaps.write("./")))
      .pipe($.gulp.dest($.assets + 'css/'));
  })
}