var gulp = require('gulp-help')(require('gulp'));
var nodemon = require('gulp-nodemon');
var start = require('gulp-start-process');
var __ = require('lodash');
var argv = require('yargs').argv;
var fs = require('graceful-fs');
var colors = require('colors');
var knex = require('knex')({
  client: 'pg'
});

process.env.app = 'gulp';

function runSpecs(done) {
  if (done == null) {
    done = (function() {});
  }
  return start("app=test DEBUG=test* NODE_ENV=Test ./node_modules/.bin/mocha --harmony --opts mocha.opts \"specs/**/*Spec.*\"", done);
}

gulp.task('spec', 'Run spec in watch mode', function() {
  var watch = require('gulp-watch');
  return watch(['**/*.js', '**/*.es', '!node_modules/**', '!.git/**'], function() {
    return runSpecs();
  });
});

gulp.task('api', 'Start api server in NODE_ENV or in dev env by default', function() {
  var apiConfig, ref, ref1;

  apiConfig = {
    verbose: false,
    restartable: "rs",
    ext: 'js,es',
    script: 'bin/api',
    ignore: ['workers', 'node_modules/', 'gulpfile.*'],
    env: {
      env: (ref = process.env.NODE_ENV) != null ? ref : 'development',
      DEBUG: (ref1 = process.env.DEBUG) != null ? ref1 : 'api*'
    }
  };

  return nodemon(apiConfig);
});

gulp.task('login', 'login to facebook', function() {

});
