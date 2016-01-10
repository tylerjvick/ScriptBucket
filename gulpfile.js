var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    cleanhtml = require('gulp-cleanhtml'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    cssnano = require('gulp-cssnano'),
    path = require('path'),
    concat = require('gulp-concat'),
    zip = require('gulp-zip'),
    del = require('del'),
    sourcemaps = require('gulp-sourcemaps'),
    debug = require('gulp-debug');

gulp.task('clean', function () {

    return del(['build/*']);

});

gulp.task('copy', function () {

    gulp.src('src/manifest.json')
        .pipe(gulp.dest('build'));

    gulp.src('src/images/icon*.png')
        .pipe(gulp.dest('build/icons/'));

});

gulp.task('html', function () {
    return gulp.src('src/**/*.html')
        .pipe(cleanhtml())
        .pipe(gulp.dest('build'))

});

gulp.task('jshint', function () {
    return gulp.src(['src/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', ['jshint'], function () {
    gulp.src('src/inject/*.js')
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest('build/inject'));


    return gulp.src('src/browser_action/js/app.js')
        .pipe(browserify({
            insertGlobals: true,
            debug: false
        }))
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(uglify({
            mangle: false,
            outSourceMap: true
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build/browser_action/js'));
});

gulp.task('less', function () {
    gulp.src('src/browser_action/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('src/browser_action/css'));

    return gulp.src('src/inject/*.less')
        .pipe(less())
        .pipe(gulp.dest('src/inject/css'));
});

gulp.task('styles', ['less'], function () {

    gulp.src('node_modules/angular-material/angular-material.min.css')
        .pipe(gulp.dest('build/vendor/css'));

    return gulp.src('src/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/'));

});

gulp.task('build', ['clean'], function () {
    gulp.start([
        'html',
        'scripts',
        'styles',
        'copy'
    ]);
});

gulp.task('watch', ['build'], function () {

    gulp.watch('src/**/*.js', ['scripts']);

    gulp.watch('src/**/*.html', ['html']);

    gulp.watch(['src/**/*.css', 'src/**/*.less'], ['styles']);

});

gulp.task('zip', function () {
    var manifest = require('./src/manifest.json'),
        destFileName = manifest.name + ' v' + manifest.version + '.zip';

    return gulp.src('build/**')
        .pipe(zip(destFileName))
        .pipe(debug())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', function () {
    gulp.start('build');
});
