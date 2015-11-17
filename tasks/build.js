import path from 'path';
import gulp from 'gulp';
import jetpack from 'fs-jetpack';
import childProcess from 'child_process';
import del from 'del';
import tape from 'gulp-tape';
import tapColorize from 'tap-colorize';

let $ = require('gulp-load-plugins')({
  lazy: true,
});
let utils = require('./utils');
let config = require('./gulp.config')();
let generateSpecsImportFile = require('./generate_specs_import');

let projectDir = jetpack;
let srcDir = projectDir.cwd('./app');
let destDir = projectDir.cwd('./build');

// -------------------------------------
// Tasks
// -------------------------------------

gulp.task('clean', () => del('./build'));

var transpileTask = function() {
  return gulp.src(config.transpileFromAppDir)
    .pipe($.sourcemaps.init())
    .pipe($.babel(projectDir.read('.babelrc', 'json')))
    .pipe($.sourcemaps.write("."))
    .pipe(gulp.dest(destDir.path()));
};

gulp.task('transpile', ['clean'], transpileTask);
gulp.task('transpile-watch', transpileTask);


var copyTask = function() {
  return projectDir.copyAsync('app', destDir.path(), {
    overwrite: true,
    matching: config.copyFromAppDir,
  });
};

gulp.task('copy', ['clean'], copyTask);
gulp.task('copy-watch', copyTask);


var stylusTask = function() {
  return gulp.src('app/stylus/*.styl').pipe($.stylus({
    'include css': true,
    'paths': ['css', 'jspm_packages'],
  })).pipe(gulp.dest(destDir.path('stylesheets')));
};
gulp.task('stylus', ['clean'], stylusTask);
gulp.task('stylus-watch', stylusTask);


gulp.task('finalize', ['clean'], () => {
  var manifest = srcDir.read('package.json', 'json');
  // Add "dev" or "test" suffix to name, so Electron will write all data
  // like cookies and localStorage in separate places for each environment.
  switch (utils.getEnvName()) {
    case 'development':
      manifest.name += '-dev';
      manifest.productName += ' Dev';
      break;
    case 'test':
      manifest.name += '-test';
      manifest.productName += ' Test';
      break;
  }
  destDir.write('package.json', manifest);

  destDir.copy(projectDir.path(`config/env_${utils.getEnvName()}.json`), 'env_config.json');
});


gulp.task('watch', function() {
  gulp.watch(config.transpileFromAppDir, ['transpile-watch']);
  gulp.watch(config.copyFromAppDir, {
    cwd: 'app'
  }, ['copy-watch']);
  gulp.watch('app/**/*.styl', ['stylus-watch']);
});


gulp.task('build', ['transpile', 'stylus', 'copy', 'finalize']);


var copyTapeTask = function() {
  let matching = ['./**/*.tape.js'];
  return projectDir.copyAsync('app', destDir.path(), {
    overwrite: true,
    matching: matching.concat('.babelrc'),
  }).then(() => {
    return destDir.findAsync('.', {
      matching: matching,
    });
  });
};

var runTapeTask = function() {
  return copyTapeTask().then((tapePaths) => {
    return gulp.src(tapePaths, {
      cwd: destDir.path(),
    }).pipe(tape({
      reporter: tapColorize(),
    }));
  });
};

gulp.task('tape-copy', copyTapeTask);
gulp.task('tape-only', runTapeTask);
gulp.task('tape', ['build'], runTapeTask);
