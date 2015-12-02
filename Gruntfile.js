'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    project: {
      app: ['./source'],
      build: ['./build'],
      css: ['<%= project.app %>/styles'],
      js: ['<%= project.app %>/scripts'],
      components: ['<%= project.app %>/components'],
      templates: ['<%= project.app %>/templates']
    },
    // Sass -> CSS
    sass: {
      dist: {
        options: {
          style: 'expanded',
          compass: true
        },
        files: {
            "<%= project.build %>/styles.css": "<%= project.css %>/styles.sass"
        }
      }
    },
    // Coffeescript -> JS
    coffee: {
      compile: {
        options: {
          bare: true,
          sourceMap: true
        },
        expand: true,
        flatten: false,
        cwd: '<%= project.app %>/',
        src: ['**/*.{coffee,litcoffee}','<%= project.components %>/**/*.{coffee,litcoffee}'],
        dest: '<%= project.build %>/',
        ext: '.js'
      }
    },
    // Jade -> HTML
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [{
          expand: true,
          cwd: '<%= project.app %>/',
          src: ['**/*.jade','!**/_*.jade'],
          dest: '<%= project.build %>/',
          ext: '.html'
        }]
      }
    },
    // Adds any relevate autoprefixers supporting IE 9 and above
    autoprefixer: {
      options: {
        browsers: ["> 1%", "ie > 8"],
        map: true
      },
      target: {
        files: {
            "<%= project.build %>/styles.css": "<%= project.build %>/styles.css"
        }
      }
    },
    // Minify CSS
    cssmin: {
      options: {
        sourceMap: true
      },
      target: {
        files: {
          "<%= project.build %>/styles.min.css": ['<%= project.build %>/styles.css']
        }
      }
    },
    // Minify JS
    uglify: {
      options: {
        mangle: true
      },
      target: {
        files: {
          "<%= project.build %>/scripts/portfolio.min.js":   ["<%= project.build %>/scripts/portfolio.js"]
        }
      }
    },
    notify: {
      sass:{
        options:{
          title: "Portfolio Project",
          message: "Sass Compiled Successfully.",
          duration: 2,
          max_jshint_notifications: 1
        }
      },
      coffee:{
        options:{
          title: "Portfolio Project",
          message: "Coffeescript Compiled Successfully.",
          duration: 2,
          max_jshint_notifications: 1
        }
      },
      jade:{
        options:{
          title: "Portfolio Project",
          message: "Jade Compiled Successfully.",
          duration: 2,
          max_jshint_notifications: 1
        }
      },
      uglify:{
        options:{
          title: "Portfolio Project",
          message: "JS Minified Successfully.",
          duration: 2,
          max_jshint_notifications: 1
        }
      }
    },
    // Copies remaining files to places other tasks can use
    copy: {
      main: {
        expand: true,
        cwd: '<%= project.app %>/',
        src: 'content/**',
        dest: '<%= project.build %>/',
      }
    },
    // Empties folders to start fresh
    clean: {
      main: {
        files: [{
          dot: true,
          src: [
            '<%= project.build %>/{,*/}*'
          ]
        }]
      }
    },
    watch: {
      sass: {
        files: ['<%= project.css %>/**/*.{scss,sass}','<%= project.components %>/**/*.{scss,sass}'],
        tasks: ['sass','notify:sass']
      },
      coffee: {
        files: ['<%= project.js %>/**/*.{coffee,litcoffee}','<%= project.components %>/**/*.{coffee,litcoffee}'],
        tasks: ['coffee', 'notify:coffee']
      },
      jade: {
        files: ['<%= project.app %>/**/*.jade'],
        tasks: ['jade', 'notify:jade']
      },
      autoprefixer:{
        files: ['<%= project.build %>/styles.css'],
        tasks: ['autoprefixer', 'cssmin']
      },
      uglify: {
        files: ['<%= project.build %>/**/*.js'],
        tasks:['uglify','notify:uglify']
      }
    },
    // Server setup
    browserSync: {
      dev: {
        bsFiles: {
          src : [
              '<%= project.build %>/styles.min.css',
              '<%= project.build %>/**/*.js'
          ]
        },
        options: {
          watchTask: true,
          server: '<%= project.build %>/'
        }
      }
    }
  });
  
  // Default task(s).
  grunt.registerTask('default', [
    'browserSync',
    'clean',
    'copy',
    'sass',
    'coffee',
    'jade',
    'autoprefixer',
    'cssmin',
    'uglify',
    'watch'
  ]);
  grunt.registerTask('build', [
    'copy',
    'sass',
    'coffee',
    'jade',
    'autoprefixer',
    'cssmin',
    'uglify'
  ]);
};