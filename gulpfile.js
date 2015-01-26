var browserSync  = require('browser-sync'),
    exec         = require('child_process').exec,
    del          = require('del'),
    gulp         = require('gulp');

gulp.task('clean', function(cb) {
  del('_site', cb);
});

gulp.task('browser-sync', ['jekyll'], function() {
  browserSync({
    server: {
      baseDir: '_site'
    },
    notify: false
  });
});

gulp.task('browser-sync-reload', ['jekyll'], function() {
  browserSync.reload();
});

gulp.task('jekyll', function(cb) {
  exec('jekyll build', function(err) {
    if (err) return cb(err);
    cb();
  });
});

gulp.task('default', ['clean'], function() {
  gulp.start('jekyll');
});

gulp.task('dev', ['browser-sync'], function() {
  gulp.watch(['index.html',
              '404.html',
              '_includes/*',
              '_layouts/*',
              '_posts/*',
              'public/**/*'], ['browser-sync-reload']);
});
