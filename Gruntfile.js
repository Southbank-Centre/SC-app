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


  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

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
        files: ['test/spec/{,*/}*.js'],
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
          '!<%= yeoman.app %>/bower_components/{,*/}*.js'
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
        sassDir: 'assets/sass',
        cssDir: '.tmp/assets/css',
        generatedImagesDir: '.tmp/assets/imgs/generated',
        imagesDir: 'assets/imgs',
        javascriptsDir: 'assets/js',
        //javascriptsDir: '<%= yeoman.dist %>/scripts.js',
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
          '<%= yeoman.dist %>/assets/js/{,*/}*.js',
          '<%= yeoman.dist %>/assets/css/{,*/}*.css',
          '<%= yeoman.dist %>/assets/fonts/*'
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
              //js: ['concat'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
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

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/assets/imgs',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/assets/imgs'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/assets/imgs',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.app %>/assets/imgs'
        }]
      }
    },

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
          src: ['*.html', 'components/{,*/}*.html'],
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
          cwd: '.tmp/concat/scripts',
          src: ['**/*.js', '!oldieshim.js'],
          dest: '.tmp/concat/scripts'
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
            'views/{,*/}*.html',
            'images/{,*/}*.{webp}',
            'fonts/*',
            'app/**'
          ]
        }, {
          expand: true,
          cwd: '.tmp/assets/imgs',
          dest: '<%= yeoman.dist %>/assets/imgs',
          src: ['generated/*']
        },
        {
          expand: true,
          cwd: 'assets/fonts',
          dest: '<%= yeoman.dist %>/assets/fonts',
          src: ['*']
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
            'views/{,*/}*.html',
            'images/{,*/}*.{webp}',
            'fonts/*',
            'app/**',
            'docs/**'
          ]
        }, {
          expand: true,
          cwd: '.tmp/assets/imgs',
          dest: '<%= yeoman.dist %>/assets/imgs',
          src: ['generated/*']
        },
        {
          expand: true,
          cwd: 'assets/fonts',
          dest: '<%= yeoman.dist %>/assets/fonts',
          src: ['*']
        }]
      },
      styles: {
        expand: true,
        cwd: 'assets/sass',
        dest: '.tmp/assets/css',
        src: '{,*/}*.css'
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
        'imagemin',
        'svgmin'
      ],
      dev: [
        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
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


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      //return grunt.task.run(['build', 'connect:dist:keepalive']);
      return grunt.task.run([
        //'build', 

        'clean:' + target,
        'wiredep',
        'configureProxies',
        'ngdocs',
        'useminPrepare',
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
