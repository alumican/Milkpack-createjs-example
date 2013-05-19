# 名前空間のインポート
jpp.util.Namespace('app').use()
jpp.util.Namespace('jpp.milkpack').use()


# ウェブサイトの定義
class Application extends jpp.milkpack.Milkpack

    # サーバルートからアプリケーションのルートまでのパスを設定する(例 http://example.com/hoge/huga/ の場合は '/hoge/fuga/' となる)
    root: '/'

    # インデックスファイル名を設定する
    rootFile: 'index.html'

    # ルーティングを定義する('URL': 'シーンクラス')
    routes:
        '/': 'app.IndexScene' # トップページ
        '/about': 'app.PageAboutScene' # About ページ
        '/gallery': 'app.PageGalleryScene' # Gallery ページ
        '/gallery/<int:id>': 'app.PagePhotoScene' # Photo ページ

    # アプリケーション初期化時に呼び出されるメソッドをオーバーライドする
    onInit: () ->
        # CreateJS を初期化する
        @stage = new createjs.Stage('canvas')
        @stage.enableMouseOver(30)
        createjs.Ticker.setFPS(60)
        createjs.Ticker.addEventListener('tick', @_tickerTickHandler);

        # フルスクリーン対応のための CSS を設定する
        $('body').css({ margin: 0 })
        $('#sizeref').css({ position: 'absolute', width: '100%', height: '100%' })
        $('#canvas').css({ position: 'absolute' })

        # ウィンドウのリサイズを監視する
        $(window).resize(@_windowResizeHandler)
        @_windowResizeHandler()

    # CreateJS の再描画時に呼び出されるイベントハンドラを定義する
    _tickerTickHandler: (event) =>
        # CreateJS を更新する
        @stage.update()

    # ウィンドウリサイズ時に呼び出されるイベントハンドラを定義する
    _windowResizeHandler: (event) =>
        # ウィンドウサイズ参照用の DOM エレメントを取得する
        sizeref = $('#sizeref')
        @stageWidth = sizeref.width()
        @stageHeight = sizeref.height()

        # canvasをリサイズする
        canvas = $('#canvas')
        canvas.attr({ width: @stageWidth })
        canvas.attr({ height: @stageHeight })

        # カスタムイベントを発行する
        @dispatchEvent('resize', { stageWidth: @stageWidth, stageHeight: @stageHeight })


# クラスを名前空間に登録する
jpp.util.Namespace('app').register('Application', Application)
