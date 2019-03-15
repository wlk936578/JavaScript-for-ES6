<<<<<<< HEAD
import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import args from './util/args';

gulp.task('pages',()=>{
  return gulp.src('app/**/*.ejs')
    .pipe(gulp.dest('server'))
    .pipe(gulpif(args.watch,livereload()))
=======
import gulp from 'gulp'
import gulpif from 'gulp-if'
import livereload from 'gulp-livereload'
import args from './util/args'

gulp.task('pages', () => {
  return gulp
    .src('app/**/*.ejs')
    .pipe(gulp.dest('server'))
    .pipe(gulpif(args.watch, livereload()))
>>>>>>> 81bc43c745f2cfe50f67c2303779bc5a3bc7b537
})
