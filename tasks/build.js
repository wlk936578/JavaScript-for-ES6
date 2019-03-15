<<<<<<< HEAD
import gulp from 'gulp';
import gulpSequence from 'gulp-sequence';

gulp.task('build',gulpSequence('clean','css','pages','scripts',['browser','serve']));
=======
import gulp from 'gulp'
import gulpSequence from 'gulp-sequence'

gulp.task(
  'build',
  gulpSequence('clean', 'css', 'pages', 'scripts', ['browser', 'server'])
)
>>>>>>> 81bc43c745f2cfe50f67c2303779bc5a3bc7b537
