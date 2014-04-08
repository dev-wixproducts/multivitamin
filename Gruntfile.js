module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean: {
			styles: ['css/*.css'],
			scripts: ['js/*.js']
		},

		concat: {
			options: {
				separator: ';',
			},
			dist: {
				src: ['js/src/plugins/*.js', 'js/src/*.js'],
				dest: 'js/scripts.js'
			}
		},

		uglify: {
			build: {
				src: 'js/scripts.js',
				dest: 'js/scripts.min.js'
			}
		},

		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'css/styles.css': 'css/src/vitamins.scss'
				}
			}
		},

		autoprefixer: {
			options: {
				browsers: ['last 2 version', 'ie 8', 'ie 9']
			},
			no_dest: {
				src: 'css/styles.css'
			}
		},

		cssmin: {
			minify: {
				expand: true,
				cwd: 'css',
				src: ['styles.css'],
				dest: 'css',
				ext: '.min.css'
			}
		},

		watch: {
			scripts: {
				files: 'js/**/*.js',
				tasks: ['clean:scripts', 'dist-js']
			},
			styles: {
				files: 'css/**/*.scss',
				tasks: ['clean:styles', 'dist-css'],
				options: {
					livereload: true,
				}
			}
		}

	});

	// These plugins provide necessary tasks
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

	// JS distribution task
	grunt.registerTask('dist-js', ['clean:scripts', 'concat', 'uglify']);

	// CSS distribution task
	grunt.registerTask('dist-css', ['clean:styles', 'sass', 'autoprefixer', 'cssmin']);

	// Full distribution task
	grunt.registerTask('dist', ['dist-css', 'dist-js']);

	// Default task
	grunt.registerTask('default', ['dist', 'watch']);

};