module.exports = function(grunt) {

    grunt.initConfig({
        mochaTest: {
			options: {
				timeout: 3000,
				reporter: 'spec'
			},
			src: ['test/*.js']
		},
        copy: {
          main: {
            files: [{
                nonull: true,
                src: ['lib/js2xmlparser.js'],
                dest: 'android/assets/ti.js2xml.js',
                flatten: true
            },{
                nonull: true,
                src: ['lib/js2xmlparser.js'],
                dest: 'ios/assets/ti.js2xml.js',
                flatten: true
            }]
          },
        },
    });

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('test', ['mochaTest']);
    grunt.registerTask('default', ['mochaTest', 'copy']);

};
