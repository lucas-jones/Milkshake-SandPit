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
					hostname: "0.0.0.0",
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
							src: [ '**', "!spritesheets/**" ],
							dest: 'bin/assets'
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

	grunt.registerTask('spritesheets', function()
	{
		var exec = require('child_process').exec;
		var fs = require('fs');
		var path = require('path');

		var spritesheets = "assets/spritesheets";

		var spritesheetDirectories = fs.readdirSync(spritesheets).filter(function (file)
		{
			var fileUrl = path.resolve(spritesheets, file);

    		return fs.statSync(fileUrl).isDirectory();
		});

		for(spritesheetKey in spritesheetDirectories)
		{
			var spritesheetId = spritesheetDirectories[spritesheetKey];

			console.log("Generating " + spritesheetId + " spritesheet");
			exec("spritesheet-js -n " + spritesheetId + " -p bin/assets/spritesheets/ assets/spritesheets/" + spritesheetId + "/*.png");
		}
	});


	grunt.registerTask('build', ['copy', 'haxe:main']);
	grunt.registerTask('default', ['build', 'connect', 'watch']);
}