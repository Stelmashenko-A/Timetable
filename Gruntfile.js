module.exports = function (grunt) {
    grunt.initConfig({
      jscs:{
          main: ['src']
      }
  });
    grunt.loadNpmTasks('grunt-jscs');
    grunt.registerTask('default', ['jscs']);
};
