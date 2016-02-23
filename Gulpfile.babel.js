import gulp from 'gulp';
import clean from 'gulp-clean';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import qunit from 'gulp-qunit';

gulp.task('clean', () => {
    let read = false;

    return gulp.src('dist/*.js', { read }).
        pipe(clean());
});

gulp.task('concat', ['clean'], () => {
    return gulp.src(['src/_intro.js', 'src/main.js', 'src/_outro.js']).
        pipe(concat('style.js')).
        pipe(gulp.dest('dist/'));
});

gulp.task('compress', ['clean', 'concat'], () => {
    return gulp.src('dist/style.js').
        pipe(uglify()).
        pipe(rename((path) => { path.basename = `${path.basename}.min` })).
        pipe(gulp.dest('dist/'));
});

gulp.task('test', () => {
    return gulp.src('test/all.html').
        pipe(qunit());
});

gulp.task('build', ['clean', 'concat', 'compress']);
gulp.task('default', ['build', 'test']);
