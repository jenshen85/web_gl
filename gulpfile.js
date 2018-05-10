'use strict'

global.$ = {

  dev: !process.env.NODE_ENV || process.env.NODE_ENV === "development",

  // path - start
  html: './src/template/',
  style: './src/sass/',
  js: './src/js/',
  img: './src/img/',
  fonts: './src/fonts/',
  sprite: './src/img/srcSprite/',
  dist: './dist/',
  assets: './dist/assets/',
  // path - end

  // packages - start
  gulp: require('gulp'),
  browserSync: require('browser-sync').create(),
  prettify: require('gulp-html-prettify'),
  njkRender: require('gulp-nunjucks-render'),
  gulpIf: require('gulp-if'),
  htmlmin: require('gulp-htmlmin'),
  del: require('del'),
  sass: require("gulp-sass"),
  sourcemaps: require("gulp-sourcemaps"),
  postcss: require("gulp-postcss"),
  autoprefixer: require("autoprefixer"),
  csso: require("postcss-csso"),
  plumber: require("gulp-plumber"),
  notify: require("gulp-notify"),
  rename: require("gulp-rename"),
  normalize: require("node-normalize-scss").includePaths,
  imagemin: require('gulp-imagemin'),

  webpack: require("webpack"),
  gulpWebpack: require("webpack-stream"),
  webpackConfig: require("./webpack.config"),
  // packages - end

  // not installed packages - start
  // svgSprite: require("gulp-svg-sprite"),
  // svgmin: require("gulp-svgmin"),
  // replace: require("gulp-replace"),
  // cheerio: require("gulp-cheerio"),
  // merge: require("merge-stream"),
  // spritesmith: require("gulp.spritesmith"),
  // not installed packages - end

  // path for tasks - start
  tasks: require('./gulp/config/tasks'),
  // path for tasks - end
}

console.log( ($.dev) ? 'DEVELOPMENT' : 'PRODUCTION' );

$.tasks.forEach((taskPath) => {
  require(taskPath)();
});

$.gulp.task('build',
  $.gulp.series(
    "clean",
    $.gulp.parallel("fonts", "img", "html", "sass", "webpack")
  )
);

$.gulp.task('default',
  $.gulp.series(
    "clean",
    $.gulp.parallel("fonts", "img", "html", "sass", "webpack"),
    $.gulp.parallel("watch", "serve")
  )
);
