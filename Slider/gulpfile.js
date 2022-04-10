const gulp = require('gulp');
const sass = require('sass');
const gulpSass = require('gulp-sass');

const scssCompiler = gulpSass(sass);


// Компилировать scss в css
gulp.task('styles', () => {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(scssCompiler().on('error', scssCompiler.logError))
        .pipe(gulp.dest('./dist/css'));
});


// LiveServer
gulp.task('watch', () => {
    return gulp.watch('./src/scss/**/*.scss', gulp.series('styles'))
});
