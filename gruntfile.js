module.exports = function(grunt){
  //Project configuration
  grunt.initConfig({
  	pkg: grunt.file.readJSON('package.json'),
  	uglify: {
  		options: {
  			banner: '/*! <%= Headliner %> <% grunt.template.today("yyyy-mm-dd") %> */\n'
  		},
      dist: {
        src: ''
      }
  	}
  })



	grunt.loadNpmTasks('grunt-contrib-uglify');
}