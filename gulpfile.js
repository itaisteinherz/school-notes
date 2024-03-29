const path = require("path");

const dotenv = require("dotenv");
const gulp = require("gulp");
const del = require("del");
const rename = require("gulp-rename");
const {transform} = require("gulp-insert");

dotenv.config();

gulp.task("clean", () => {
	return del(["src/pages/notes/**", "!src/pages/notes", "!src/pages/notes/Example/**"]);
});

gulp.task("fetch:md", async () => {
	const notesDir = process.env.NOTES_SOURCE;

	return gulp.src(path.join(notesDir, "/**/*.md"))
		.pipe(rename(path => {
			path.dirname += `/${path.basename}`;
			path.basename = "index";
		}))
		.pipe(transform((contents, file) => `
---
title: "${file.dirname.split(path.sep).pop()}"
date: ${new Date(file.stat.ctime).toISOString()}
---

${contents}
			`.trim()))
		.pipe(gulp.dest("src/pages/notes"));
});

gulp.task("fetch", gulp.series("fetch:md"));

gulp.task("default", gulp.series("clean", "fetch"));
