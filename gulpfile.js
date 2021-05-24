let gulp = require('gulp'),
 sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin');

gulp.task('sass', function (){
   return  gulp.src('app/scss/**/*.scss')
        .pipe(sass({outputStyle:'compressed'}))
        .pipe(rename({suffix : '.min'}))
        .pipe(gulp.dest('app/css'))
       .pipe(browserSync.reload({stream:true}))
       .pipe(autoprefixer({
           overrideBrowserslist: ['last 8 versions']
       }))
}); // Переделывает scss в css

gulp.task('style', function(){
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
        'node_modules/slick-carousel/slick/slick.css',
        'node_modules/magnific-popup/dist/magnific-popup.css',

    ])
        .pipe(concat('libs.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('app/css'))
}); // объединяет и минифицирует css файлы

gulp.task('scripts', function(){
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
        'node_modules/mixitup/dist/mixitup.js',

    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
}) ;// объединяет JS файлы
gulp.task('html',function (){
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({stream:true}))
}) ;// следит за обновлением всех HTML
gulp.task('js',function (){
    return gulp.src('app/js/*.js')
        .pipe(browserSync.reload({stream:true}))
}) ;// следит за обновлением всехJS
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}); // Обновлеяет страцнницу браузера

gulp.task('watch',function (){
    gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch('app/*.html', gulp.parallel('html'));
    gulp.watch('app/js/*.js', gulp.parallel('js'));
}); // Помогает постояснно не вызывать в консоль Task

gulp.task('default',gulp.parallel('style','scripts','sass','watch', 'browser-sync'))// Помогает не открывать много консолей
