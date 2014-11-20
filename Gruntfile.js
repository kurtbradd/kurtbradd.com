// Gruntfile.js
module.exports = function(grunt) {
	grunt.initConfig({
		cssmin: {
			generated: {
				expand: true,
				cwd: 'site/src/assets/css/',
		    src: ['*.css', '!*.min.css'],
		    dest: 'site/dist/assets/css/',
		    ext: '.min.css'
			}
		},
		htmlmin: {
			production: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'site/dist/index.html':'site/src/index.html'
				}
			}
		},
		copy: {
			html: {
				src:'site/src/index.html',
				dest:'site/dist/index.html'
			},
			images: {
				src:'site/src/assets/img/break-things.jpg',
				dest:'site/dist/assets/img/break-things.jpg'
			}
		},
		useminPrepare: {
			html:'site/src/index.html',
			options: {
				dest:'site/dist'
			}
		},
		usemin: {
	    html: ['site/dist/index.html']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-usemin');

	grunt.registerTask('cpfiles', ['copy:html', 'copy:images']);
	grunt.registerTask('build',['cpfiles', 'useminPrepare', 'cssmin','usemin','htmlmin']);
	grunt.registerTask('default', ['build']);
};
