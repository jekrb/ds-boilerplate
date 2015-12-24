/**
 * Gulp - Sass
 * -----------------
 */

// Build and
var config = require('../config');
var gulp = require('gulp');
var sass = require('gulp-sass');
var util = require('gulp-util');
var gulpif = require('gulp-if');
var crypto = require('crypto');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');

module.exports = function() {

    //store if we're requesting maps
    var useMaps = util.env.maps ? true : false

    console.log('Building with source maps?' + useMaps);

    return gulp.src(config.paths.sassSourceRoot + '/**/**/*.scss')
            .pipe(plumber(function(error) {
                this.emit('end');
            }))
            // .pipe(cache('sassing', ['optimizeMemory']))
            .pipe(gulpif(useMaps, sourcemaps.init()))
            .pipe(sass({
                check: true,
                outputStyle: util.env.prod ? "compressed" : "expanded",
                includePaths: [config.paths.sassSourceRoot]
            }))
            .on('error', notify.onError({
                    title: 'You dun goofed.',
                    message: '<%= error.message %> and the consequences, will never be the same!'
            }))
            .pipe(gulpif(useMaps, sourcemaps.write('maps', {
                includeContent: false,
                sourceRoot: config.paths.sassSourceRoot
            })))
            .pipe(gulp.dest(config.paths.dist + '/css'));
    };
