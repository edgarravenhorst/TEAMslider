module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    concat:{
    	basic:{
    		src: [
    		'assets/js/build/slider.js', 
    		'assets/js/build/animations/fade.animation.js'
    		],
    		dest: 'assets/js/combined/slider-combined-basic.js',
    	},
    	full:{
    		src: [
    		'assets/js/external/jquery.touchSwipe.js',
    		'assets/js/build/slider.js', 
    		'assets/js/build/animations/fade.animation.js',
    		'assets/js/build/animations/slide.animation.js',
    		],
    		dest: 'assets/js/combined/slider-combined.js',
    	}
    },
    uglify: {
      basic: {
      	src: 'assets/js/combined/slider-combined-basic.js',
        dest: 'assets/js/min/slider-basic.min.js'
      },
      full: {
      	src: 'assets/js/combined/slider-combined.js',
        dest: 'assets/js/min/slider.min.js'
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'assets/js/build/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Default task(s).
  
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};