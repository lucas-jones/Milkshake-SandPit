module.exports = function (grunt)
{
	
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-haxe');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-open');

	grunt.initConfig(
	{
		connect:
		{
			local_server:
			{
				options:
				{
					port: 8080,
					base: 'bin',
					livereload: true,
					debug: true,
					open:
					{
						target: 'http://127.0.0.1:8080'
					}            
				}
			}
		},

		open:
		{
			dev: {
				path: 'http://localhost:8080/index.html'
			}
		},

		copy:
		{
			main:
			{
				files: [{
							cwd: 'assets/',
							expand: true,
							src: ['**'],
							dest: 'bin'
						}]
			}
		},

		haxe:
		{
			main:
			{
				hxml: 'build.hxml'
			}
		},

		watch:
		{
			options:
			{
				livereload: true,
				livereloadOnError: false,
			},
			haxe:
			{
				files: '**/*.hx',
				tasks: ['haxe:main']
			}
		},

		concurrent:
		{
			options:
			{
			   logConcurrentOutput: true
			},
			watch:
			{
				tasks: [ "watch:haxe", "connect" ]
			}
		},

	});


	grunt.registerTask('build', ['copy', 'haxe:main']);
	grunt.registerTask('default', ['build', 'connect', 'watch']);
}