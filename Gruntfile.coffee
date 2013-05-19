module.exports = (grunt) ->
  'use strict'

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.initConfig

    coffee:
      example:
        files:
          'deploy/script/application.js': [
            # クラス同士に依存関係が存在するのでワイルドカードでなくちゃんと順番を指定する
            'src/util/Util.coffee'
            'src/Application.coffee'
            'src/scene/AbstractDisplayScene.coffee'
            'src/scene/AbstractPageScene.coffee'
            'src/scene/IndexScene.coffee'
            'src/scene/PageAboutScene.coffee'
            'src/scene/PageGalleryScene.coffee'
            'src/scene/PagePhotoScene.coffee'
          ]

    watch:
      example:
        files:
          'src/**/*.coffee'
        tasks:
          'coffee:example'

  grunt.registerTask 'default', ['watch']
