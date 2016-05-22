var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    del = require('del'),
	runSequence = require('run-sequence'),
	mainBowerFiles = require('main-bower-files'),
	connect = require('gulp-connect'),
	imagemin = require('gulp-imagemin');

    /*


	//livereload = require('gulp-livereload'),
	//cache = require('gulp-cache'),
	//jshint = require('gulp-jshint');
	addStream = require('add-stream'),*/



gulp.task('clean', function() {
    return del(['dist/**', '!dist']);
});

gulp.task('bower', function() {
    return gulp.src(mainBowerFiles())
    .pipe(gulp.dest('dist/assets'));
});


gulp.task('styles', function() {
  return sass('src/css/style.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src('src/**/*.js')
    //.pipe(jshint('.jshintrc'))
    //.pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src(['src/**/*.jpg', 'src/**/*.png'])
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('html', function(){
	return gulp.src( ['src/*.html', 'src/**/*.html'])
	.pipe(gulp.dest('dist'));
});

gulp.task('connect', function() {
  connect.server({
		root: './dist/'
  });
});

gulp.task('default', function() { /*'clean', */
  runSequence('clean',['bower', 'styles', 'scripts', 'html', 'images'], ['connect', 'watch']);
});

gulp.task('watch', function() {
  gulp.watch(['src/**/*.js'], ['scripts']);
  gulp.watch(['src/**/*.html'], ['html']);
  gulp.watch(['src/**/*.scss'], ['styles']);
  gulp.watch(['src/**/*.jpg', 'src/**/*.png'], ['images']);
});
