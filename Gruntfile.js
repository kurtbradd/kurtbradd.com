// Gruntfile.js
module.exports = function(grunt) {
	var server = require('./server.js');
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
					'site/dist/index.html':'site/dist/index.html'
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
		},
		connect: {
			dist: {
				options: {
					port: 9001,
					base:'site/dist',
					keepalive: true
				}
			},
			src: {
				options: {
					port: 9001,
					base:'site/src',
					keepalive: true
				}
			}
		},
		rsync: {
			options: {
				args: ['-avz', '--verbose'],
				exclude:["'.DS_Store'"],
				recursive: true
			},
			production: {
				options: {
					src:'./site/dist/',
					dest: server.kurtbradd.landingpage.destination,
					host: server.kurtbradd.landingpage.host
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-rsync');

	grunt.registerTask('cpfiles', ['copy:html', 'copy:images']);
	grunt.registerTask('build',['cpfiles', 'useminPrepare', 'cssmin','usemin','htmlmin']);
	grunt.registerTask('deploy', ['rsync:production']);
	grunt.registerTask('serve-dist', ['connect:dist']);
	grunt.registerTask('serve-src', ['connect:src']);
	grunt.registerTask('default', ['build']);
};
