import gulp from 'gulp';
import eslint from 'gulp-eslint';
import debug from 'gulp-debug';

// https://gist.github.com/nkbt/9efd4facb391edbf8048
gulp.task('eslint', () => {
  return gulp.src(['app/*.js', 'app/@(components|services)/**/*.js', 'vendor/electron_boilerplate/*.js'])
    .pipe(debug({
      title: 'eslint:'
    }))
    // eslint() attaches the lint output to the eslint property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failOnError last.
    .pipe(eslint.failOnError());
});
