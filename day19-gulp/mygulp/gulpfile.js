const { series, parallel } = require('gulp');
const gulp = require('gulp');
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

gulp.task('babel', () =>
  gulp
    .src('./src/js/*js') //读取某目录的文件可读流
    .pipe(
      babel({
        // 把es6转为es5
        // 把es6模块转为common JS模块
        presets: ['@babel/env'],
      })
    )
    .pipe(gulp.dest('./dist/js')) //把处理的流写入到某个文件
    .pipe(connect.reload())
);

// Basic usage
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

// 配置less任务
gulp.task('less', function () {
  return gulp.src('./src/less/*less').pipe(less({})).pipe(concat('all.css')).pipe(gulp.dest('./dist/css')).pipe(connect.reload());
});

// html配置
gulp.task('html', function () {
  return gulp.src('./src/index.html').pipe(gulp.dest('./dist')).pipe(connect.reload());
});

// 配置服务器任务
gulp.task('connect', function () {
  connect.server({
    port: 3000,
    root: ['./dist'],
    livereload: true,
  });
  exec('start http://127.0.0.1:3000');
  // 自动监视文变化
  gulp.watch('./src/js/*js', gulp.series(['js-dev']));
  gulp.watch('./src/less/*less', gulp.series(['less']));
  gulp.watch('./src/index.html', gulp.series(['html']));
});

// 压缩配置
gulp.task('uglify', function () {
  return gulp.src('./dist/js/build.js').pipe(uglify()).pipe(rename('build.min.js')).pipe(gulp.dest('./dist/js'));
});
gulp.task('cssmin', function () {
  return gulp.src('./dist/css/all.css').pipe(cssmin()).pipe(rename('all.min.css')).pipe(gulp.dest('./dist/css'));
});
gulp.task('htmlmin', function () {
  return gulp
    .src('./src/index.html')
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest('./dist'));
});

// 统一配置js任务
gulp.task('js-dev', series(['babel', 'browserify']));

gulp.task('dev', parallel(['js-dev', 'less', 'html']));

gulp.task('watch', series(['dev', 'connect']));

// 统一配置压缩任务
gulp.task('js-prod', series(['js-dev', 'uglify']));
gulp.task('css-prod', series(['less', 'cssmin']));
gulp.task('build', parallel(['js-prod', 'css-prod', 'htmlmin']));
