"use strict";

const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject("tsconfig.json");

const distPath = 'dist';

exports.default = (cb) =>
	tsProject
		.src()
		.pipe(tsProject())
		.js.pipe(gulp.dest(distPath));
