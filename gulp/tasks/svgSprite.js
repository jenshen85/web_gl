module.exports = function() {

  var conf = {
    mode: {
      symbol: {
        sprite: "../sprite.svg",
        example: {
          dest: "../tmp/spriteSvgDemo.html" // демо html
        }
      }
    }
  };

  $.gulp.task("svg:sprite", function() {
    return (
      gulp
        .src("src/img/**/*.svg")
        // минифицируем svg
        .pipe(
          $.svgmin({
            js2svg: {
              pretty: true
            }
          })
        )
        // удалить все атрибуты fill, style and stroke в фигурах
        .pipe(
          $.cheerio({
            run: function($) {
              $("[fill]").removeAttr("fill");
              $("[stroke]").removeAttr("stroke");
              $("[style]").removeAttr("style");
            },
            parserOptions: {
              xmlMode: true
            }
          })
        )
        // cheerio плагин заменит, если появилась, скобка '&gt;', на нормальную.
        .pipe($.replace("&gt;", ">"))
        // build svg sprite
        .pipe($.svgSprite(conf))
        .pipe($.gulp.dest("src/img/sprite/"))
    );
  });
}