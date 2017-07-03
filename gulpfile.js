var gulp = require('gulp');
var babel = require('gulp-babel')
var useref = require('gulp-useref')
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var gulpif = require('gulp-if');
var minify = require('gulp-minify');
const deploy = require('s3-website').deploy
    , config = require('./config')
    , AWS = require('aws-sdk')
    , s3 = new AWS.S3({ region: config.region });






gulp.task('build', function(callback) {
  runSequence('remove','transpile','copy','combine',callback);
});



gulp.task('deploy', function(callback) {
  runSequence('remove','transpile','copy','combine','upload',callback);
});


gulp.task('upload', function(callback) {


deploy(s3, config, (err, website) => {
  if(err) {
    throw err;
  }
  console.log(website.url);
})





});

gulp.task('copy', function () {
    gulp.src('src/favicon.png')
        .pipe(gulp.dest('dist'));
});

gulp.task('combine', function() {
console.log("Building Production Version")
return gulp.src('src/*.html')
.pipe(useref({
            transformPath: function(filePath) {
                return filePath.replace('/js','/js/transpiled')
            }
        }))
.pipe(gulpif('*.js', minify({
    ext:{
        min:'.js'
    },
    noSource:true
})))


.pipe(gulp.dest('dist'))
});

gulp.task('transpile',function(){
  return gulp.src('src/js/*.js')
   .pipe(babel({
         presets: ['es2015']
     }))
     .pipe(gulp.dest('src/js/transpiled'))
    

})

gulp.task('remove', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});
