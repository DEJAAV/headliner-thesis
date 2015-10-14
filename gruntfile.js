module.exports = function(grunt){
  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

/* Linting -- Overrides (force === true) over any errors/warnings */
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

/* Concatenation */
    concat: {
      options: {
        separator: ";\n",
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
      },
      dist: {
        src: ['client/app/**/*.js', 'client/specs/**/*.js'],
        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
      }
    },

/* Angluar Annotation for Minifying */
    ngAnnotate: {
      options: {
        singleQuotes: true,
        add: true,
        force: true
      },
      dist: {
        files: [
          { 
            expand: true,
            src: ['dist/<%= pkg.name %>-<%= pkg.version %>.js'],
            ext: '.annotated.js',
            extDot: 'last'
          }
        ]
      }
    },

/* JS Minification */
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        mangle: false,
      },
      target: {
        src: 'dist/*.annotated.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true, 
          cwd: 'client/',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/',
          ext: '.min.css'
        }]
      }
    },

/* Watches for any changes from any files, runs jshint if so */
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
            spawn: false,
            livereload: true
        }
      }
    },

/* Run nodemon to connect to localhost:3000 */
    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    },

/* Runs jshint, nodemon, & watch concurrently */
    concurrent: {
      dev: {
        tasks: [
          'nodemon',
          'watch'
        ],
        options: {
          logConcurrentOutput: true
        }
      }
    },
  });

/* Loading plugins that provide tasks */
  grunt.loadNpmTasks('grunt-contrib-jshint'); 
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-auto-install');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-install-dependencies');
  grunt.loadNpmTasks('grunt-ng-annotate');

/*=======Registering Tasks for CLI=======*/

  //npm install (>>grunt install)
  grunt.registerTask('install', ['install-dependencies']);

  //default (>> grunt)
  grunt.registerTask('default', [
        'bower',
        'install',
        'jshint',
        'minify',
        'concurrent'
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
        'jshint',
        'concat',
        'ngAnnotate',
        'uglify',
        'cssmin'
    ]);
};