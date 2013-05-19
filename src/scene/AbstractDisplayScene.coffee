# 名前空間のインポート
jpp.util.Namespace('jpp.milkpack').use()


# トップページ、下層ページ共通の基底クラス
class AbstractDisplayScene extends jpp.milkpack.Scene

    # このシーンクラスが初めて必要になったときに一度だけ呼び出される初期化メソッドをオーバーライドする
    _onInit: (title) =>
        @manager = @getManager()
        @stage = @manager.stage

        # ページ内容のコンテンツを表示するための CreateJS コンテナを作成する
        @container = new createjs.Container()
        @container.alpha = 0
        @stage.addChild(@container)

        # ブラウザのタイトルバーに表示する文字列を設定する
        @setTitle("#{title} | MilkpackJS with CreateJS Example")

        # ウィンドウのリサイズを監視する
        @manager.addEventListener('resize', @_resizeHandler)

    # ウィンドウリサイズ時に呼び出されるイベントハンドラを定義する
    _resizeHandler: (event) =>
        @resize(event.extra.stageWidth, event.extra.stageHeight)

    # リサイズ処理を定義する
    resize: (stageWidth, stageHeight) =>
        @container.x = stageWidth / 2
        @container.y = 0


# クラスを名前空間に登録する
jpp.util.Namespace('app').register('AbstractDisplayScene', AbstractDisplayScene)
