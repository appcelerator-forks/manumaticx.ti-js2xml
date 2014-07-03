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
            nonull: true,
            src: ['lib/js2xmlparser.js'],
            dest: 'commonjs/src/ti.js2xml.js',
            flatten: true
          },
        },
    });

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('test', ['mochaTest']);
    grunt.registerTask('default', ['mochaTest', 'copy']);

};
