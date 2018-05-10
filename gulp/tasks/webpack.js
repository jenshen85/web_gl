module.exports = function() {
  $.gulp.task("webpack", function() {
    return $.gulp
      .src($.js + "index.js")
      .pipe(
        $.plumber({
          errorHandler: $.notify.onError(function(error) {
            return {
              title: "Scripts",
              message: error.message
            };
          })
        })
      )
      .pipe($.gulpWebpack({config : $.webpackConfig}, $.webpack))
      .pipe($.gulp.dest($.assets + 'js/'));
    }
  );
}