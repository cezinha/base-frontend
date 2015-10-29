module.exports = function(grunt) {
  // Do grunt-related things in here

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      uses_defaults: ['Gruntfile.js', 'src/**/*.js']
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
                'bower_components/ki/ki.min.js',
                'node_modules/nanoajax/nanoajax.min.js',
                'node_modules/dot/doT.min.js',
                'src/js/script.js'
              ],
        dest: 'js/script.js',
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      dist: {
        options: {
          sourceMap: true,
          sourceMapName: 'js/script.map'
        },
        files: {
          'js/script.min.js': ['js/script.js']
        }
      }
    },
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "css/main.css": "src/less/main.less" // destination file and source file
        }
      }
    },
    watch: {
      options: {
          livereload: true
      },
      js: {
          files: ["Gruntfile.js", "src/js/*.js", 'bower_components/**/*.js'],
          tasks: ["jshint", "concat", "uglify"]
      },
      less: {
          files: ["src/less/**/*.less"],
          tasks: ["less"]
      },
      html: {
          files: "/*.html"
      }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          base: ".",
          hostname: "127.0.0.1",
          livereload: true,
          open: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', ['less', 'jshint', 'concat', 'uglify']);

  // Default task(s).
  grunt.registerTask('default', ['connect', 'watch']);
};