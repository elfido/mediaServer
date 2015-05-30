module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // uglify: {
    //   options: {
    //     mangle: {
    //       except: ['external.js']
    //     },
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    //   },
    //   build: {
    //     files:{
    //       "src/public/resources/js/global/<%= pkg.name %>.min.js": ["src/public/resources/js/global/*.js"]
    //     }
    //   }
    // },
    concat: {
      //jQuery, Bootstrap, CanJS, underscore
      externalJS: {
        dest: "src/public/resources/js/global/external.min.js",
        src: ["bower_components/jquery/dist/jquery.min.js","bower_components/bootstrap/dist/js/bootstrap.min.js", "bower_components/canjs/can.jquery.min.js", "bower_components/underscore/underscore-min.js"]
      },
      externalCSS: {
        dest: "src/public/resources/css/globalstyles.min.css",
        src: ["bower_components/bootstrap/dist/css/bootstrap.min.css"]
      }
    },
    comments: {
      src: "public/resources/js/glboal/*.min.js"
    },
    copy: {
      main: {
        files: [
          {expand: false, src: ['bower_components/jquery/dist/jquery.min.map'], dest: 'src/public/resources/js/global/jquery.min.map', filter: 'isFile'}
        ]
      },
      fonts: {
        files:[
          {expand: true, flatten: true, src: 'bower_components/bootstrap/dist/fonts/*.*', dest: 'src/public/resources/fonts/', filter: 'isFile'}
        ]
      }
    },
    stylus:{
      compile: {
        files: {
          'src/public/resources/css/main.css': 'css/main.styl'
        }
      }
    },
    mocha: {
      test: {
        src: ['tests/**/*.html'],
      },
    },
    watch:{
      webTemplates: {
        files: ['views/**/*.*', 'src/public/**/*.*'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['css/*.styl'],
        tasks: ['stylus'],
        options: {
          livereload: true
        }
      }
    },
    clean: ["src/public/resources/js/global/<%= pkg.name %>.min.js","src/public/resources/js/global/jquery.min.map","src/public/resources/js/global/external.min.js","src/public/resources/css/globalstyles.css"]
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-stripcomments');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha');
  //grunt.loadNpmTasks('grunt-http-server');

  // Default task(s). Always clean and uglify first
  //grunt.registerTask('default', 'Always clean, compiles CSS, compresses, copy dependencies, strips comments and finally concatenates',['clean', 'stylus','uglify','copy','comments','concat']);
  grunt.registerTask('setup', ['copy:main', 'concat', 'stylus']);
  //grunt.registerTask('default', 'Start server', ['http-server']);
};
