module.exports = function(grunt){
  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        force: true,
        reporter: require('jshint-stylish')
      },
      build: [
        'Gruntfile.js', 
        'client/app/**/*.js',
        'client/specs/*.js',
        'server/**/*.js',
        'test/*.js' 
      ] 
    },
/* Npm install/update */

    'install-dependencies':{
      options: {
        stdout: true,
        stderr: true,
        failOnError: true
      }
    },

    // auto_install: {
    //   subdir: {
    //     options: {
    //       cwd: './',
    //       stdout: true,
    //       stderr: true,
    //       failOnError: true,
    //       bower: false
    //     }
    //   }
    // },

/* Bower install/update */ 
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

/* Minification */
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
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 3000,
          keepalive: true
        }
      }
    },

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
    },

    //run nodemon
    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    },

    concurrent: {
      dev: {
        tasks: [
          'jshint',
          'nodemon',
          'watch'
        ],
        options: {
          logConcurrentOutput: true
        }
      }
    },
  });

  // Loading plugins that provide tasks
  grunt.loadNpmTasks('grunt-contrib-jshint'); 
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-auto-install');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-install-dependencies');

  /*====Registering Tasks for CLI====*/
  //npm install (>>grunt install)
  grunt.registerTask('install', ['install-dependencies']);

  //default (>> grunt)
  grunt.registerTask('default', [
        'bower',
        'install',
        'jshint',        
        'connect'
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