const gulp = require('gulp');
const { series, parallel } = require('gulp');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');
const less = require('gulp-less');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const { exec } = require('child_process');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-cssmin');
const htmlmin = require('gulp-htmlmin');
// babel配置
gulp.task('babel', () => {
  return gulp
    .src('./src/js/*js') //读取文件可读流
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(connect.reload());
});
// browserify配置
gulp.task('browserify', function () {
  // Single entry point to browserify
  return gulp
    .src('./dist/js/index.js')
    .pipe(
      browserify({
        insertGlobals: true,
      })
    )
    .pipe(rename('build.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(connect.reload());
});
//less配置
gulp.task('less', function () {
  return gulp.src('./src/less/*less').pipe(less()).pipe(concat('all.css')).pipe(gulp.dest('./dist/css')).pipe(connect.reload());
});

// html配置
gulp.task('html', function () {
  return gulp.src('./src/index.html').pipe(gulp.dest('./dist')).pipe(connect.reload());
});

// 服务配置
gulp.task('connect', function () {
  connect.server({
    port: 3000,
    root: ['./dist'], //暴露目录
    livereload: true, //开启自动刷新
  });
  // 自动打开浏览器
  exec('start http://127.0.0.1:3000');
  // 监视文件的变化
  gulp.watch('./src/js/*js', gulp.series(['js-dev']));
  gulp.watch('./src/less/*less', gulp.parallel(['less']));
  gulp.watch('./src/index.html', gulp.parallel(['html']));
});

// 生产环境配置
gulp.task('uglify', function () {
  return gulp.src('./dist/js/build.js').pipe(uglify()).pipe(rename('bulid.min.js')).pipe(gulp.dest('./dist/js'));
});
gulp.task('cssmin', function () {
  return gulp.src('./dist/css/all.css').pipe(cssmin()).pipe(rename('all.min.cs')).pipe(gulp.dest('./dist/css'));
});
gulp.task('htmlmin', function () {
  return gulp.src('./src/index.html').pipe(htmlmin()).pipe(gulp.dest('./dist'));
});

// 统一配置
gulp.task('js-dev', series(['babel', 'browserify']));
gulp.task('dev', parallel(['js-dev', 'less', 'html']));
gulp.task('watch', series(['dev', 'connect']));

// 统一配置压缩
gulp.task('js-prod', series(['js-dev', 'uglify']));
gulp.task('css-prod', series(['less', 'cssmin']));
// gulp.task('html-prod'),parallel(['htmlmin'])
gulp.task('build', parallel(['js-prod', 'css-prod', 'htmlmin']));
