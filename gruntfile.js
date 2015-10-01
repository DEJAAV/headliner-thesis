module.exports = function(grunt){
  // Project configuration
  grunt.initConfig({
  	pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: [
        'gruntfile.js', 
        'client/app/**/*.js', 
        'server/**/*.js',
        'test/*.js' 
      ], 
    },
/* All bower shit */
    // auto_install: {
    //   local: {},
    //   subdir: {
    //     cwd: '',
    //     stdout: true,
    //     stderr: true,
    //     failOnError: true
    //   }
    // },

    bower: {
      install: {
        options: {
          install: true,
          copy: false,
          targetDir: 'client/bower_components',
          cleanTargetDir: true,
          verbose: true,
          bowerOptions: {
            forceLatest: true
          }
        }
      }
    },

/* Bower shit ends here */
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
  grunt.loadNpmTasks('grunt-auto-install');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-connect');

  /*====Registering Tasks for CLI====*/

  // grunt.registerTask('install', 'install and/or update front-end dependencies', function() {
  //   var exec = require('child_process').exec, child;
  //   var call = this.async();
  //   child = exec('bower install', {pwd: 'client/'}, function(error, stdout, stderr) {
  //     console.log('stdout: ' + stdout);
  //     console.log('stderr: ' + stderr);
  //     if(error !== null){
  //       console.log('exec error: ' + error);
  //     }
  //   });
  // });

  //default (>> grunt)
  grunt.registerTask('default', [
        'bower'
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