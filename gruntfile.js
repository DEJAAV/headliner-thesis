module.exports = function(grunt){
  // Project configuration
  grunt.initConfig({
  	pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: [
        'gruntfile.js', 
        'client/app/**/*.js', 
        'server/**/*.js',
        'test/**/*.js' // ./**/*.js === test folder
      ], 
    },

    bower: {
      install: {
        options: {
          install: true,
          copy: false,
          targetDir: 'client/bower_components',
        }
      }
    },

  	uglify: {
  		options: {
  			banner: '/*! <%= Headliner %> <% grunt.template.today("yyyy-mm-dd") %> */\n',
        mangle: false
  		},
      build: {
        src: [
          'client/app/**/*.js', 
          'client/specs/**/*.js',
          'server/**/*.js',
          'test/**/*.js'
        ],
        dest: 'build/<%= pkg.name %>.min.js'
      }
  	},

    //  For connecting to localhost:3000 (later on)
    // connect: {
    //   server: {
    //     options: {
    //       hostname: 'localhost',
    //       port: 3000
    //     }
    //   }
    // },

    watch: {
      scripts: { 
        files: [
          'clients/app/**/*.js',
          'client/specs/**/*.js',
          'server/**/*.js',
          'test/**/*.js'
        ],
        tasks: ['jshint'],
        options: {
            spawn: false
        }
      }
    }
  });

  // Loading plugins that provide tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');	
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-connect');

  /*====Registering Tasks for CLI====*/
  //default (>> grunt)
  grunt.registerTask('default', [
        'jshint',
        'bower'
        'watch'
  ]);

  //testing (>> grunt test) 
  //need to add mocha/karma/jasmine tests here
  // grunt.registerTask('test', [
  //       'bower', 
  //       'jshint'
  //   ])
  
  //minification (>> grunt minify) 
  //can add to default task once app is up & running
  grunt.registerTask('minify', [
        'bower',
        'jshint',
        'uglify'
    ]);
};