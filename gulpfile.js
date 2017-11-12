const gulp = require('gulp');
const inlineNg2Template = require('gulp-inline-ng2-template');
const sass = require('node-sass');

const styleProcessor = (stylePath, ext, styleFile, callback) => {
	if (ext[0] === '.scss') {
		let sassObj = sass.renderSync({ file: stylePath });
		if (sassObj && sassObj['css']){
			styleFile = sassObj.css.toString('utf8');
		}
	}
	return callback(null, styleFile);
};

const OPTIONS = {
  target: 'es5',
  useRelativePaths: true,
  styleProcessor: styleProcessor
};


gulp.task('inline-build-templates', () => {
    return gulp.src(['./src/app/systelab-preferences/**/*.ts', '!./src/app/systelab-preferences/**/**.spec.ts'])
             .pipe(inlineNg2Template(OPTIONS))
        .pipe(gulp.dest('./build'));

});
