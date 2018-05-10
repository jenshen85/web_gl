module.exports = function() {
  $.gulp.task('serve', function() {
    $.browserSync.init({
      open: false,
      notify: false,
      server: $.dist
    });
    $.browserSync.watch(['src/**/*.*', '!**/*.css'], $.browserSync.reload);
  });
}