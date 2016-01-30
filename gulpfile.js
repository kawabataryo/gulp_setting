'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var filter = require('gulp-filter');
var bower = require('main-bower-files');
var babel = require('gulp-babel');
var plumber = require("gulp-plumber");

var paths = {
	webroot: 'www/'
};


//Sass
gulp.task('sass', function(){
	gulp_sass();
});

gulp.task('sass:watch', function(){
	gulp_sass();
	gulp.watch(paths.webroot + 'inc/scss/**/*.scss', ['sass']);
});

//TypeScript
gulp.task('typescript', function(){
	gulp_typescript();
});

gulp.task('typescript:watch', function(){
	gulp_typescript();
	gulp.watch(paths.webroot + 'inc/ts/**/*.ts', ['typescript']);
});

//babel
gulp.task('babel', function(){
	gulp_babel();
});

gulp.task('babel:watch', function(){
	gulp_babel();
	gulp.watch(paths.webroot + 'inc/es6/**/*.js', ['babel']);
});

//bower
gulp.task('BowerJS', function(){
	var jsFilter = filter('**/*.js');
	gulp.src(bower())
	.pipe(jsFilter)
	.pipe(concat('lib.js'))
	.pipe(uglify({
		'preserveComments': 'some'
	}))
	.pipe(gulp.dest(paths.webroot + 'inc/js/'))
});


//default
gulp.task('default', function(){
	gulp_sass();
	gulp_typescript();
	gulp_babel();
	gulp.watch(paths.webroot + 'inc/scss/**/*.scss', ['sass']);
	gulp.watch(paths.webroot + 'inc/ts/**/*.ts', ['typescript']);
	gulp.watch(paths.webroot + 'inc/es6/**/*.js', ['babel']);
});


/**
 * function
 */

//sass
function gulp_sass(){
	gulp.src(paths.webroot + 'inc/scss/**/*.scss')
	.pipe(plumber())
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(cssmin())
	.pipe(rename({
		extname: '.min.css'
	}))
	.pipe(sourcemaps.write('../sourcemaps/scss'))
	.pipe(gulp.dest(paths.webroot + 'inc/css/'));
}

//babel
function gulp_babel(){
	gulp.src(paths.webroot + 'inc/es6/**/*.js')
	.pipe(plumber())
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(gulp.dest(paths.webroot + 'inc/js/'));
}