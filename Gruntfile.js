// Generated on 2014-10-30 using generator-angular 0.9.8
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

// Import the grunt-connect-proxy
var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

// Import connect-modrewrite
var modRewrite = require('connect-modrewrite');

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || __dirname,
    dist: 'dist'
  };

  // Function to be passed to 'rename' when globbing
  // is used in 'src' in folder names
  // It takes the filename from the src path and appends
  // it to the dest path.
  // E.g. for a copy task
  // dest: 'move/files/here'
  // src: ['look/in/**/these/folders']
  // rename: stripSrcPath
  //
  // Without stripSrcPath, the files will be placed here:
  // move/files/here/look/in/folder_name/these/folders/filename.ext
  //
  // With stripSrcPath, they will be placed here:
  // move/files/here/filename.ext
  var stripSrcPath = function(dest, src) {

    var path = require('path');
    var srcSplit = src.split(path.sep);
    var filename = srcSplit[srcSplit.length - 1];

    return path.join(dest, filename);

  };


  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    sassDir: 'assets/sass',

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= yeoman.app %>/{,*/}*.js'],
        tasks: ['newer:jshint:all', 'ngdocs'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/**/*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {
        files: ['assets/sass/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/**/*.html',
          '!<%= yeoman.app %>/docs/**/*',
          '.tmp/assets/css/{,*/}*.css',
          'assets/imgs/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        // hostname: 'localhost',
        hostname: 'localhost',
        livereload: 35729,
      },
      proxies: [
        {
          context: '/json/',
          host: 'localhost',
          port: 8181,
          changeOrigin: true,
          rewrite: {
            '^/json' : ''
          }
        }
      ],
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              proxySnippet,
              modRewrite (['!\\.html|\\.js|\\.css|\\.svg|\\.png|\\.jpg|\\.jpeg|\\.gif|\\.eot|\\.ttf|\\.woff$ /index.html [L]']),
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>',
          middleware: function (connect) {
            return [
              proxySnippet,
              modRewrite (['!\\.html|\\.js|\\.css|\\.svg|\\.png|\\.jpg|\\.jpeg|\\.gif|\\.eot|\\.ttf|\\.woff$ /index.html [L]']),
              connect.static('.tmp'),
              connect.static(appConfig.dist)
            ];
          }
        }

      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/{,*/}*.js',
          '!<%= yeoman.app %>/bower_components/{,*/}*.js',
          '!<%= yeoman.app %>/docs/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      dev: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/assets/css',
          src: '{,*/}*.css',
          dest: '.tmp/assets/css/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['index.html'],
        ignorePath:  /\.\.\//
      },
      sass: {
        src: ['assets/sass/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '.tmp/sass/<%= sassDir %>',
        cssDir: '.tmp/assets/css',
        generatedImagesDir: '.tmp/assets/imgs/generated',
        imagesDir: 'assets/imgs',
        javascriptsDir: 'assets/js',
        fontsDir: 'assets/fonts',
        importPath: './bower_components',
        httpImagesPath: '/assets/imgs',
        httpGeneratedImagesPath: '/assets/imgs/generated',
        httpFontsPath: '/assets/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'     
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/assets/imgs/generated'
        }
      },
      server: {
        options: {
          debugInfo: true,
          sourcemap: true
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/app/js/{,*/}*.js',
          '<%= yeoman.dist %>/app/vendor/{,*/}*.js',
          '<%= yeoman.dist %>/assets/css/{,*/}*.css',
          '<%= yeoman.dist %>/assets/fonts/*',
          '<%= yeoman.dist %>/assets/imgs/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: 'index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/**/*.html'],
      css: ['<%= yeoman.dist %>/assets/css/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>','<%= yeoman.dist %>/assets/imgs']
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'app/components/{,*/}*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/app/js',
          src: ['**/*.js', '!oldieshim.js'],
          dest: '.tmp/concat/app/js'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'app/**/*.{html,txt}',
            'assets/sched/*'
          ]
        }, {
          expand: true,
          cwd: 'assets/imgs',
          dest: '<%= yeoman.dist %>/assets/imgs',
          src: ['*']
        }, {
          expand: true,
          cwd: 'assets/fonts',
          dest: '<%= yeoman.dist %>/assets/fonts',
          src: ['*']
        }, {
          expand: true,
          cwd: 'bower_components',
          dest: '<%= yeoman.dist %>/assets/imgs',
          src: ['SC-app-*/release/assets/imgs/*'],
          filter: 'isFile',
          rename: stripSrcPath
        }, {
          expand: true,
          cwd: 'bower_components',
          dest: '<%= yeoman.dist %>/assets/fonts',
          src: ['SC-app-*/release/assets/fonts/*'],
          filter: 'isFile',
          rename: stripSrcPath
        }]
      },
      dev: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'app/**',
            'docs/**'
          ]
        }, {
          expand: true,
          cwd: 'assets/imgs',
          dest: '<%= yeoman.dist %>/assets/imgs',
          src: ['*']
        },
        {
          expand: true,
          cwd: 'assets/fonts',
          dest: '<%= yeoman.dist %>/assets/fonts',
          src: ['*']
        }, {
          expand: true,
          cwd: 'bower_components',
          dest: '<%= yeoman.dist %>/assets/imgs',
          src: ['SC-app-*/release/assets/imgs/*'],
          filter: 'isFile',
          rename: stripSrcPath
        }, {
          expand: true,
          cwd: 'bower_components',
          dest: '<%= yeoman.dist %>/assets/fonts',
          src: ['SC-app-*/release/assets/fonts/*'],
          filter: 'isFile',
          rename: stripSrcPath
        }]
      },
      appStyles: {
        expand: true,
        dest: '.tmp/sass',
        src: [
          '<%= sassDir %>/**/*'
        ]
      },
      moduleStyles: {
        expand: true,
        dest: '.tmp/sass/<%= sassDir %>/modulePartials',
        src: [
          'bower_components/SC-app-*/release/assets/sass/**/*'
        ],
        rename: stripSrcPath
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist',
      ],
      dev: [
        'compass:dist',
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/unit/karma.conf.js',
        singleRun: true
      }
    },

    // Docular documentation
    ngdocs: {
        options: {
        dest: 'docs',
        html5Mode: false,
        title: 'WOW Festival Website Front-end Documentation',
        bestMatch: true,
      },
      api: {
        src: ['<%= yeoman.app %>/app/{,**/}*.js'],
        title: 'Angular App Documentation'
      }
    }

  });

  grunt.registerTask('prepareSASS', ['copy:appStyles', 'copy:moduleStyles', 'includeModuleSASS']);

  grunt.registerTask('includeModuleSASS', 'Looks through the SC-app modules and imports any sass files it finds into the main.scss of the current app', function() {

    var sassDir = grunt.config.data.sassDir;
    var modulePartialsDir = '.tmp/sass/' + sassDir + '/modulePartials';
    var fs = require('fs');

    // Try opening the folder where module partials have been moved to
    try {

      var modulePartials = fs.readdirSync(modulePartialsDir);
      var writeToSASS = '';

      modulePartials.forEach(function(modulePartial) {

        if (modulePartial.charAt(0) === '_') {
          modulePartial = modulePartial.substring(1);
        }

        writeToSASS = writeToSASS + '@import "modulePartials/' + modulePartial + '";';

      });

      // Add the module SASS partial includes to the main sass file
      fs.appendFileSync('.tmp/sass/' + sassDir + '/main.scss', writeToSASS);

    } catch(ex) {

      // If -2 error it is because there are no module partials
      if (ex.errno === -2) {
        grunt.log.error('No module partials to process.');

      // Display error if not a -2
      } else {
        grunt.log.error(ex);
      }

    }
    



    // -> Append the @imports to that file

    // Change sassDir so that compass reads from that instead
    //grunt.config.sassDir = '.tmp/' + sassDir;

  });

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      //return grunt.task.run(['build', 'connect:dist:keepalive']);
      return grunt.task.run([
        'clean:' + target,
        'wiredep',
        'configureProxies',
        'ngdocs',
        'useminPrepare',
        'prepareSASS',
        'concurrent:server',
        'autoprefixer',
        'concat',
        'ngAnnotate',
        'copy:' + target,
        'cdnify',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin',
        'connect:dist:keepalive'
      ]);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'configureProxies',
      'prepareSASS',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'prepareSASS',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', 'Build the app for distribution', function(target) {

    if (!target) {
      target = 'dist';
    }

    grunt.task.run([
      'clean:' + target,
      'wiredep',
      'ngdocs',
      'useminPrepare',
      'prepareSASS',
      'concurrent:' + target,
      'autoprefixer',
      'concat',
      'ngAnnotate',
      'copy:' + target,
      'cdnify',
      'cssmin',
      'uglify',
      'filerev',
      'usemin',
      'htmlmin'
    ]);
  });

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
