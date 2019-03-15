<<<<<<< HEAD
import gulp from 'gulp';
import del from 'del';
import args from './util/args';

gulp.task('clean',()=>{
  return del(['server/public','server/views'])
=======
import gulp from 'gulp'
import del from 'del'
import args from './util/args'

gulp.task('clean', () => {
  return del(['server/public', 'server/views'])
>>>>>>> 81bc43c745f2cfe50f67c2303779bc5a3bc7b537
})
