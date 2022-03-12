const gulp = require('gulp');
const { series, parallel, dest } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

const filePaths = {
	scss: {
		src: ['./src/scss/configs/reset.scss', './src/scss/configs/fonts.scss', './src/scss/configs/typography.scss', './src/scss/congigs/nucleo.scss', './src/scss/variables.scss', './src/scss/global.scss', './src/sections/**/*.scss'],
		dist: ['./css']
	},
	js: {
		src: ['./src/**/*.js'],
		dist: ['./dist/js']
	}
};

const scssTask = (done) => {
	gulp.src(filePaths.scss.src)
		.pipe(concat('main.min.css'))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(cssnano())
		.pipe(sourcemapswire('.'))
		.pipe(dest(filePaths.scss.dist[0]));
	done()
};

const watchTask = () => {
	browserSync.init({
		server: { baseDir: './' }, 
		open: false,
		port: 3005, 
		ui: { port: 3006 }
	});
	gulp.watch('./index.html').on('change', browserSync.reload);
	gulp.watch(filePaths.scss.src, scssTask).on('change', browserSync.reload);
};

exports.build = parallel(scssTask);
exports.default = series(exports.build, watchTask);



