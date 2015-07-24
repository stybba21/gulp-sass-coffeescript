var gulp = require ('gulp'),
        gutil = require ('gulp-util'),
        uglify = require ('gulp-uglify'),
        sass = require ('gulp-sass'),
        coffee = require ('gulp-coffee'),
        concat = require ('gulp-concat'),
        livereload = require ('gulp-livereload');

var jsSources = [
    'components/lib/jquery/jquery-2.1.4.js',
    'components/scripts/*.js'
];

var coffeeSources = [
    'components/coffee/*.coffee'
];

var sassSources = [
    'components/sass/main.scss'
];

gulp.task('js', function(){
    //gulp.src('*.js')
    gulp.src(jsSources)
        .pipe(uglify())
        .pipe(concat('script.js'))
        .pipe(gulp.dest('builds/development/js'))
        .pipe(livereload());
});

gulp.task('coffee', function() {
    gulp.src(coffeeSources)
    .pipe(coffee({bare: true})
        .on('error', gutil.log))
    .pipe(gulp.dest('components/scripts'))
});

gulp.task('sass', function() {
    gulp.src(sassSources)
    .pipe(sass({
        outputStyle: 'expanded',
        lineNumbers: true
    }))
        .on('error', gutil.log)
    .pipe(concat('style.css'))
    .pipe(gulp.dest('builds/development/css'))
    .pipe(livereload());
});

gulp.task('html', function() {
    gulp.src('builds/development/*.html')
    .pipe(livereload());
});

gulp.task('watch', function(){
    gulp.watch(jsSources, ['js']);
    gulp.watch(sassSources, ['sass']);
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch('builds/development/*.html', ['html']);
    gulp.watch(['builds/development/js/script.js', '*.html']);
    //not sure about this one ^
    gulp.watch(['*.html', '*.html']);
    //not sure on this one either ^
    livereload.listen();
});

gulp.task('default', ['js', 'html', 'sass', 'coffee', 'watch']);