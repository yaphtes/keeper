'use strict';
const gulp = require('gulp');
const babel = require('gulp-babel');
const uglifly = require('gulp-uglyfly');
const rename = require('gulp-rename');
const browserify = require('gulp-browserify');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const path = {
	javascript: {
		watching: './client/javascript/**/*.js',
		src: './client/javascript/main.js',
		bundle: './server/public/'
	},
	sass: {
		watching: './client/sass/**/*.s*ss',
		src: './client/sass/main.scss',
		bundle: './server/public/'
	}
};



gulp.task('scripts', () => {
	gulp.src(path.javascript.src)
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglifly())
		.pipe(browserify({
			insertGlobals: true
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.javascript.bundle));
});

gulp.task('styles', () => {
	gulp.src(path.sass.src)
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.sass.bundle));
});


gulp.task('scripts:watch', () => {
	gulp.watch(path.javascript.watching, ['scripts']);
});

gulp.task('styles:watch', () => {
	gulp.src(path.sass.watching, ['styles']);
});

gulp.task('default', ['scripts', 'scripts:watch', 'styles', 'styles:watch']);

