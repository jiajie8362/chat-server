import gulp;
import babel from 'gulp-babel';
import start from 'gulp-start-process';

gulp.task('default', [spec]);

gulp.task('spec', (done) => {
  start('./node_modules/.bin/mocha --harmony --opts mocha.opts "specs/**/*Spec.js"', done)
});

gulp.task('build', ['build:babel']);

gulp.task('build:babel', () =>
  gulp.src('src/*.js')
		.pipe(babel())
		.pipe(gulp.dest('lib'))
)
