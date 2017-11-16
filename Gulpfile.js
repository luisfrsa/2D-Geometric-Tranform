var gulp = require('../node_modules/gulp');
var jshint = require('../node_modules/gulp-jshint');
var concat = require('../node_modules/gulp-concat');
var rename = require('../node_modules/gulp-rename');
var sass = require('../node_modules/gulp-sass');
var livereload = require('../node_modules/gulp-livereload');

// Definimos o diretorio dos arquivos para evitar repetição futuramente
var filesJS = ([
    "./js/table.js",
    "./js/script.js",
    "./js/click.js",
]);

var filesCSS = ([
    "./css/css.scss",
]);

gulp.task('lint', function () {
    gulp.src(filesJS)
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
});



gulp.task('dist', function () {
    gulp.src(filesJS)
            .pipe(concat('./*.js'))
            .pipe(rename('js.js'))
            .pipe(gulp.dest('./js/'))
            .pipe(livereload());
});
gulp.task('sass', function () {
    return gulp.src(filesCSS)
            .pipe(concat('./*.scss'))
            .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
            .pipe(rename('css.css'))
            .pipe(gulp.dest('./css/'))
            .pipe(livereload());
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(filesJS, ['lint', 'dist']);
    gulp.watch(filesCSS, ['sass']);
});

gulp.task('default', ['lint', 'dist', 'sass',  'watch']);
