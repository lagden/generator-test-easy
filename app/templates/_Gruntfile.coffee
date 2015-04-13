'use strict'

module.exports = (grunt) ->

  require('load-grunt-tasks')(grunt)
  require('time-grunt')(grunt)

  grunt.file.defaultEncoding = 'utf8'

  grunt.initConfig
    pkg: grunt.file.readJSON "package.json"

    browserSync:
      bsFiles:
        src: 'css/*.css'
      options:
        notify: true
        port: 8183
        server:
          baseDir: ['./']

  grunt.registerTask 'default', [
    'browserSync'
  ]

  return
