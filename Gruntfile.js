module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

var PathConfig = require('./grunt-settings.js');

  // tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    config: PathConfig,

    //clean files
    clean: {
      options: { force: true },
      temp: {
        src: ["<%= config.cssDir %>**/*.map", "<%= config.imgDir %>", "<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css.map", "./jpgtmp.jpg"]
      }
    },

    postcss: {
      dev: {
        options: {
          map: true,
          processors: [
            require('autoprefixer-core')({browsers: ['last 4 version', 'Android 4']})
          ]
        },
        src: ['<%= config.cssDir %>*.css',
              '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css',
              '!<%= config.cssDir %>bootstrap.css',
              '!<%= config.cssDir %>bootstrap.min.css',
              '!<%= config.cssDir %>ie.css',
              '!<%= config.cssDir %>ie8.css'
              ]
      },
      dist: {
        options: {
          map: false,
          processors: [
            require('autoprefixer-core')({browsers: ['last 4 version', 'Android 4']})
          ]
        },
        src: ['<%= config.cssDir %>*.css',
              '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css',
              '!<%= config.cssDir %>bootstrap.css',
              '!<%= config.cssDir %>bootstrap.min.css',
              '!<%= config.cssDir %>ie.css',
              '!<%= config.cssDir %>ie8.css'
              ]
      }
    },

    //sass
    sass: {
      options: PathConfig.hasBower,
      dev: {
        options: {
          sourceMap: true,
          style: 'nested'
        },
        files: [
          {
            expand: true,
            cwd: '<%= config.sassDir %>',
            src: ['**/*.scss', '!<%= config.sassMainFileName %>.scss'],
            dest: '<%= config.cssDir %>',
            ext: '.css'
          },
          {src: '<%= config.sassDir %><%= config.sassMainFileName %>.scss', dest: '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css'}
        ]
      },
      dist: {
        options: {
          sourceMap: false,
          style: 'nested'
        },
        files: [
          {
            expand: true,
            cwd: '<%= config.sassDir %>',
            src: ['**/*.scss', '!<%= config.sassMainFileName %>.scss'],
            dest: '<%= config.cssDir %>',
            ext: '.css'
          },
          {src: '<%= config.sassDir %><%= config.sassMainFileName %>.scss', dest: '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css'}
        ]
      },
      min: {
        options: {
          sourceMap: false,
          outputStyle: 'compressed'
        },
        files: [
          {
            expand: true,
            cwd: '<%= config.sassDir %>',
            src: ['**/*.scss', '!<%= config.sassMainFileName %>.scss'],
            dest: '<%= config.cssDir %>',
            ext: '.min.css'
          },
          {src: '<%= config.sassDir %><%= config.sassMainFileName %>.scss', dest: '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.min.css'}
        ]
      }
    },

    //watcher project
    watch: {
      options: {
        debounceDelay: 1,
        // livereload: true,
      },
      // images: {
      //   files: ['<%= config.imgSourceDir %>**/*.*'],
      //   tasks: [/*'img:jpg', 'newer:pngmin:all', 'newer:svgmin'*/ 'newer:copy:images'],
      //   options: {
      //       spawn: false
      //   }
      // },
      // svgSprites: {
      //   files: ['<%= config.imgSourceDir %>svg-icons/*.*'],
      //   tasks: ['svgstore', 'svg2string'],
      //   options: {
      //       spawn: false
      //   }
      // },
      css: {
        files: ['<%= config.sassDir %>**/*.scss'],
        tasks: ['sass:dev', 'postcss:dev'],
        options: {
            spawn: false,
        }
      }
    },

    copy: {
      images: {
        expand: true,
        cwd: '<%= config.imgSourceDir %>',
        src: '**',
        dest: '<%= config.imgDir %>',
        //flatten: true,
        filter: 'isFile',
      }
    },

    // lossy image optimizing (compress png images with pngquant)
    // pngmin: {
    //   all: {
    //     options: {
    //       ext: '.png',
    //       force: true
    //     },
    //     files: [
    //       {
    //         expand: true,
    //         src: ['**/*.png'],
    //         cwd: '<%= config.imgSourceDir %>',
    //         dest: '<%= config.imgDir %>'
    //       }
    //     ]
    //   },
    // },

    uncss: {
      dist: {
        options: {
          ignore: ['.animated', 
                    '.wow', 
                    '.fadeIn',
                    '.is-success',
                    /is-/,
                    /is-error/
                  ]
        },
        files: {
          'css/main.css': ['index.html']
        }
      }
    },

    criticalcss: {
        custom: {
            options: {
                url: "index.html",
                width: 1200,
                height: 900,
                outputfile: "css/critical.css",
                filename: "css/main.css", // Using path.resolve( path.join( ... ) ) is a good idea here 
                buffer: 800*1024
            }
        }
    },

    cssmin: {
      target: {
        options: {
          keepSpecialComments: 0
        },
        files: [{
          expand: true,
          cwd: 'css',
          src: ['*.css', '!*.min.css'],
          dest: 'css',
          ext: '.css'
        }]
      }
    },

    // uglify: {
    //   dist: {
    //     files: {
    //       'js/jquery.main.min.js': ['js/jquery.main.js']
    //     }
    //   }
    // },

    // responsive_images: {
    //   myTask: {
    //     options: {
    //       sizes: [{
    //         width: 320,
    //         height: 240
    //       },{
    //         name: 'large',
    //         width: 640
    //       },{
    //         name: "large",
    //         width: 1024,
    //         suffix: "_x2",
    //         quality: 60
    //       }]
    //     },
    //     files: [{
    //       expand: true,
    //       src: ['**.{jpg,gif,png}'],
    //       cwd: 'images/',
    //       dest: 'images/'
    //     }]
    //   }
    // },

    //Keep multiple browsers & devices in sync when building websites.
    browserSync: {
      dev: {
        bsFiles: {
          src : ['*.html','<%= config.cssDir %>*.css', '*.css']
        },
        options: {
          server: {
            baseDir: "./",
            index: "index.html",
            directory: true
          },
          watchTask: true
        }
      }
    },

    notify: {
      options: {
        enabled: true,
        max_js_hint_notifications: 5,
        title: "WP project"
      },
      watch: {
        options: {
          title: 'Task Complete',  // optional
          message: 'SASS finished running', //required
        }
      },
    }, 
  });

// run task
//dev 
  //watch
  grunt.registerTask('w', ['watch']);
  //browser sync
  grunt.registerTask('bs', ['browserSync']);

  //watch + browser sync
  grunt.registerTask('dev', ['browserSync', 'watch']);

  //create svg sprite
//  grunt.registerTask('svgsprite', ['svgmin', 'svgstore', 'svg2string']);
  
  grunt.registerTask('default', ['dev']);

//finally 
  //css beautiful
  grunt.registerTask('cssbeauty', ['sass:dist', 'postcss:dist', 'uncss', 
                                    /*'criticalcss',*/ 'cssmin']);
  //img minify
//  grunt.registerTask('imgmin', ['imagemin', 'pngmin:all', 'svgmin']);

  //final build
//  grunt.registerTask('dist', ['clean:temp', 'imgmin', 'cssbeauty', 'uglify']);

};



