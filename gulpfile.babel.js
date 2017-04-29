'use strict';

import gulp from 'gulp';
import clean from 'gulp-clean';
import sass from 'gulp-sass';
import { reload } from 'browser-sync';
import prefix from 'gulp-autoprefixer';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';
import pngquant from 'imagemin-pngquant';
import sourcemaps from 'gulp-sourcemaps';
import eslint from'gulp-eslint';
import deploy from 'gulp-gh-pages';
import spritesmith from 'gulp.spritesmith';
import buffer from 'vinyl-buffer';
import merge from 'merge-stream';
import svgSprite from 'gulp-svg-sprite'
import pug from 'gulp-pug';
import del from 'del';
import webpack  from 'webpack';
import babel from 'gulp-babel';
import path from 'path';
import webpackConfig from './webpack.config';

const browserlist = ['last 2 versions', '> 1%', 'ie 9', 'Firefox ESR'];

const dirs = {
    src : './src/',
    dist : './dist/'
};

const sources = {
    scss : dirs.src + 'scss/**/*.scss',
    js : dirs.src + 'js/app.js',
    html : dirs.src + '*.html',
    templates : dirs.src + '*.pug',
    layouts : dirs.src + 'layouts/**.pug',
    img : dirs.src + 'img/*.png',
    sprite : dirs.src + 'img/sprite/*.png',
    svg : dirs.src + 'img/*.svg',
    fonts : dirs.src + 'fonts/**',
    assets : dirs.src + 'assets/**',
    siteIcons : dirs.src + 'site-icons/**',
};
const destinations = {
    css : dirs.dist + 'css',
    js : dirs.dist + 'js',
    img : dirs.dist + 'img',
    fonts : dirs.dist + 'fonts',
    assets : dirs.dist + 'assets',
    svgSprite : dirs.dist + 'img/sprite.svg',
    scssSprite : dirs.src + 'scss/_sprite.scss' // I need to place generated _sprite.scss file into src/scss
};

gulp.task('clean', () => {
    return del(dirs.dist);
});

gulp.task('scss-lint', function scssLint() {
    return gulp.src(sources.scss)
        .pipe(cache('scsslint'))
        .pipe(scsslint());
});


gulp.task('scss', function scss() {
    return gulp.src(sources.scss)
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths : './node_modules/'
        }).on('error', sass.logError))
        .pipe(prefix(browserlist))
        .pipe(sourcemaps.write('sourcemaps'))
        .pipe(gulp.dest(destinations.css))
        //.pipe(reload({ stream:true }));
        .pipe(browserSync.stream( {match: '**/*.css' } ));
});

gulp.task('scss:build', function scss() {
    return gulp.src(sources.scss)
        .pipe(sass({
            includePaths : './node_modules/'
        }).on('error', sass.logError))
        .pipe(prefix(browserlist))
        .pipe(gulp.dest(destinations.css));
});

gulp.task('js', function js(done) {
    webpack(webpackConfig, function(err, stats) {
        reload({ stream:true })
        done();
    });
});

gulp.task('png-sprite', function pngSprite() {
    const spriteData = gulp.src(sources.sprite)
        .pipe(spritesmith({
            imgName: '../img/sprite.png',
            cssName: '_sprite.css',
            cssFormat : 'css',
            padding: 2
        }));

    const imgStream = spriteData.img
        .pipe(buffer())
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(destinations.img));

    const cssStream = spriteData.css
        .pipe(gulp.dest(dirs.src + 'scss'));

    return merge(imgStream, cssStream);
});

gulp.task('images', () => {
    return gulp.src(sources.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(destinations.img))
        .pipe(reload({stream:true}));
});


/**
 * Task runs against root of the project to generate the _sprite.scss
 * partial, which will be picked up by the scss watcher
 */
gulp.task('svg-sprite',function svgSprite() {
    return gulp.src(sources.svg)
        .pipe(svgSprite({
            shape: {
                spacing: {
                    padding: 5
                }
            },
            mode: {
                css: {
                    // do not create separate css directory
                    dest: './',
                    sprite: destinations.svgSprite,
                    //layout: "diagonal",
                    //bust: false,
                    render: {
                        // this is temporary file, needed for the correct path in the sprite.scss output
                        // http://stackoverflow.com/questions/29838150/modifying-destination-and-filename-of-gulp-svg-sprite
                        css : { dest : dirs.dist + 'tmp/sprite.css' },
                        scss: {
                            dest: destinations.scssSprite
                        }
                    }
                }
            },
        }))
        .pipe(gulp.dest('.'))
        .on('end', () => {
            // remove temporary css file
            gulp.src(dirs.dist + 'tmp', {read: false})
                .pipe(clean());
        });
});

gulp.task('svg', function copySvg() {
    return gulp.src(sources.svg)
        .pipe(gulp.dest(destinations.img))
        .pipe(reload({stream:true}));
});

gulp.task('html', function copyHtml() {
    return gulp.src(sources.html)
        .pipe(gulp.dest(dirs.dist))
        .pipe(reload({stream:true}));
});

gulp.task('templates', function templates() {
    return gulp.src(sources.templates)
        .pipe(pug({

        }))
        .pipe(gulp.dest(dirs.dist))
        .pipe(reload({stream:true}));
});

gulp.task('fonts', function copyFonts() {
    return gulp.src(sources.fonts)
        .pipe(gulp.dest(destinations.fonts))
        .pipe(reload({stream:true}));
});

gulp.task('assets', function copyAssets() {
    return gulp.src(sources.assets)
        .pipe(gulp.dest(destinations.assets))
        .pipe(reload({stream:true}));
});

gulp.task('site-icons', function copyAssets() {
    return gulp.src(sources.siteIcons)
        .pipe(gulp.dest(dirs.dist))
        .pipe(reload({stream:true}));
});

gulp.task('browser-sync', function(done) {
    browserSync({
        server: {
            baseDir: dirs.dist
        }
    }, done);
});

gulp.task('eslint', function runEsLint() {
    return gulp.src([sources.js, '!node_modules/**'])
        .pipe(eslint({
            fix : true
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('deploy', function deploy() {
    return gulp.src(dirs.dist + '/**/*')
        .pipe(deploy());
});

gulp.task('watch', function watch() {
    gulp.watch(sources.img, gulp.series('images'));
    gulp.watch(sources.sprite, gulp.series('png-sprite'));
    gulp.watch(sources.scss, gulp.series('scss'));
    gulp.watch(sources.js, gulp.series('js'));
    //gulp.watch(sources.html, gulp.series('html'));
    gulp.watch(sources.svg, gulp.series('svg-sprite'));
    gulp.watch(sources.fonts, gulp.series('fonts'));
    gulp.watch([sources.templates, sources.layouts], gulp.series('templates'));
});

gulp.task('build', gulp.series('clean', 'png-sprite', gulp.parallel('images', 'scss', 'js', 'assets', 'fonts', 'templates', 'site-icons')));
gulp.task('default', gulp.series('build', 'browser-sync', 'watch'));

