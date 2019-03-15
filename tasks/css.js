<<<<<<< HEAD
import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import args from './util/args';

gulp.task('css',()=>{
  return gulp.src('app/**/*.css')
    .pipe(gulp.dest('server/public'))

=======
import gulp from 'gulp'
import gulpif from 'gulp-if'
import livereload from 'gulp-livereload'
import args from './util/args'

gulp.task('css', () => {
  return gulp
    .src('app/**/*.css')
    .pipe(gulp.dest('server/public'))
    .pipe(gulpif(args.watch, livereload()))
>>>>>>> 81bc43c745f2cfe50f67c2303779bc5a3bc7b537
})
