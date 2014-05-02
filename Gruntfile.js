module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        banner: '/* <%= pkg.name %> <%= pkg.version %> (<%= pkg.license %> license) */\n',
        separator: "\n\n"
      },
      dist: {
        src: [
          'src/_intro.js',
          'src/main.js',
          'src/_outro.js'
        ],
        dest: 'dist/<%= pkg.name.replace(".js", "") %>.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name.replace(".js", "") %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    qunit: {
      files: ['test/*.html']
    },

    watch: {
      files: ['src/**/*.js', 'test/**/*.js', 'test/**/*.html'],
      tasks: ['concat', 'qunit']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('test', ['concat', 'qunit']);
  grunt.registerTask('default', ['concat', 'qunit', 'uglify']);
};
