module.exports = function() {
  $.gulp.task("img", function() {
    return $.gulp
      .src([$.img + "**/*.{jpg,png,jpeg,svg,gif,ico}", '!src/img/srcSprite/**'])
      .pipe($.plumber({
        errorHandler: $.notify.onError(function(error) {
          return {
            title: "Images",
            message: error.message
          };
        })
      }))
      .pipe($.gulpIf(!$.dev, $.imagemin([
        $.imagemin.gifsicle({interlaced: true}),
        $.imagemin.jpegtran({progressive: true}),
        $.imagemin.optipng({optimizationLevel: 5}),
        $.imagemin.svgo({
          plugins: [
            {removeViewBox: false},
            {cleanupIDs: false}
          ]
        })
      ])))
      .pipe($.gulp.dest($.assets + 'img/'));
  });
}