module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean: {
			scripts: ['js/scripts.js', 'js/scripts.min.js'],
			vendors: ['js/vendors.js', 'js/vendors.min.js'],
			styles: ['css/styles.css', 'css/styles.min.css']
		},

		// Concats all javascript and SASS
		concat: {
			scripts: {
				src: ['js/src/scripts/*.js'],
				dest: 'js/scripts.js'
			},
			vendors: {
				src: ['js/src/vendors/*.js'],
				dest: 'js/vendors.js'
			}
		},

		// Minifies javascript
		uglify: {
			scripts: {
				src: 'js/scripts.js',
				dest: 'js/scripts.min.js'
			},
			vendors: {
				src: 'js/vendors.js',
				dest: 'js/vendors.min.js'
			}
		},

		// Converts SASS to CSS
		sass: {
			dist: {
				options: {
					style: 'expanded',
					cacheLocation: 'css/src/.sass-cache',
					sourcemap: true
				},
				files: {
					'css/styles.css': 'css/src/vitamins.scss'
				}
			}
		},

		// Applies vendor prefixes to CSS
		autoprefixer: {
			options: {
				browsers: ['last 2 version', 'ie 8', 'ie 9']
			},
			no_dest: {
				src: 'css/styles.css'
			}
		},

		// Minifies CSS
		cssmin: {
			minify: {
				expand: true,
				cwd: 'css',
				src: ['styles.css'],
				dest: 'css',
				ext: '.min.css'
			}
		},

		// Watch command
		watch: {
			scripts: {
				files: 'js/src/scripts/**/*.js',
				tasks: ['clean:scripts', 'dist-scripts']
			},
			vendors: {
				files: 'js/src/vendors/**/*.js',
				tasks: ['clean:scripts', 'dist-vendors']
			},
			styles: {
				files: 'css/**/*.scss',
				tasks: ['clean:styles', 'dist-styles'],
				options: {
					livereload: true,
				}
			}
		}

	});

	// Loads grunt dependencies
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Scripts distribution task
	grunt.registerTask('dist-scripts', ['clean:scripts', 'concat:scripts', 'uglify:scripts']);

	// Vendors distribution task
	grunt.registerTask('dist-vendors', ['clean:vendors', 'concat:vendors', 'uglify:vendors']);

	// Styles distribution task
	grunt.registerTask('dist-styles', ['clean:styles', 'sass', 'autoprefixer', 'cssmin']);

	// Full distribution task
	grunt.registerTask('dist', ['dist-scripts', 'dist-vendors', 'dist-styles']);

	// Default grunt task
	grunt.registerTask('default', ['dist', 'watch']);

};