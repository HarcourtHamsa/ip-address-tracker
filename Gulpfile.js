`use strict`

const { src, dest, watch } = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')

sass.compiler = require('node-sass')

function sassConverter() {
    return src('*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(dest('css/'))
}


exports.default = function () {
    watch('*.scss', sassConverter)
}