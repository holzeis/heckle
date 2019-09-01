var gulp = require('gulp'), nodemon = require('gulp-nodemon'), ts = require('gulp-typescript'), clean = require('gulp-clean');;
var tsProject = ts.createProject('tsconfig.json');

gulp.task('typescript', function() {
  return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
  return gulp.src('dist', {allowEmpty: true, read: false}).pipe(clean());
});

gulp.task('watch', function() {
  gulp.watch('**/*.ts', gulp.series('clean', 'typescript'));
});

gulp.task('start', function () {
  nodemon({
    script: 'dist/app.js',
    ext: 'js',
    delay: 1000,
    ignore: ["node_modules/**"]
  });
});

gulp.task('default', gulp.parallel('watch', gulp.series('clean', 'typescript', 'start')));