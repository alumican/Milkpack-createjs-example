# 名前空間のインポート
jpp.util.Namespace('app').use()
jpp.util.Namespace('jpp.command').use()
jpp.util.Namespace('jpp.util').use()


# 下層ページの基底クラス
class AbstractPageScene extends app.AbstractDisplayScene

    # このシーンクラスが初めて必要になったときに一度だけ呼び出される初期化メソッドをオーバーライドする
    _onInit: (text, offsetY = 0, subFragments = []) =>
        super(text)

        # ページタイトルテキストを作成する
        @titleText = new createjs.Text(text, '40px Arial', '#333')
        @titleText.textAlign = 'center'
        @titleTextMoveX = 300
        @titleText.x = @titleTextMoveX
        @titleText.y = offsetY + 260
        @titleText.r = @titleText.g = @titleText.b = 0
        @titleTextArea = new createjs.Shape()
        @titleTextArea.graphics.beginFill('#000').drawRect(-60, 0, 120, 40)
        @titleText.hitArea = @titleTextArea
        @container.addChild(@titleText)

        # ページタイトルテキストをボタン化する
        app.Util.setButtonHandlers(@manager, @titleText, @getFragment())

        # 下層ページへの遷移ボタンを作成する
        app.Util.createButton(@manager, @container, subFragments, offsetY + 340)

        # 現在のウィンドウサイズにコンテンツを合わせる
        @resize(@manager.stageWidth, @manager.stageHeight)

    # このシーンが目的地である場合、もしくはこのシーンよりも下層シーンに遷移する場合に、このシーンに遷移を開始した瞬間に呼び出される
    _onHello: () =>
        console.log("#{@getFragment()} : Hello")

        # 実行したいコマンドを登録する
        @addCommand(
            new jpp.command.Parallel(
                new jpp.command.Tween(@titleText, { x: 0 }, { x: @titleTextMoveX }, 1, jpp.util.Easing.easeOutBounce)
                new jpp.command.Tween(@container, { alpha: 1 }, null, 1, jpp.util.Easing.easeOutQuart)
            )
        )

    # このシーンが目的地である場合に、このシーンに遷移を開始した瞬間に呼び出される
    _onArrive: () =>
        console.log("#{@getFragment()} : Arrive")

        # 実行したいコマンドを登録する
        @addCommand(
            new jpp.command.Tween(@titleText, { r: 1 }, null, 0.5, jpp.util.Easing.easeOutQuart, null, @_applyTitleColor)
        )

    # このシーンが出発点である場合に、このシーンに遷移を開始した瞬間に呼び出される
    _onLeave: () =>
        console.log("#{@getFragment()} : Leave")

        # 実行したいコマンドを登録する
        @addCommand(
            new jpp.command.Tween(@titleText, { r: 0 }, null, 0.5, jpp.util.Easing.easeOutQuart, null, @_applyTitleColor)
        )

    # このシーンが出発点である場合、もしくはこのシーンよりも上層シーンに、このシーンに遷移を開始した瞬間に呼び出される
    _onBye: () =>
        console.log("#{@getFragment()} : Bye")

        # 実行したいコマンドを登録する
        @addCommand(
            new jpp.command.Parallel(
                new jpp.command.Tween(@titleText, { x: -@titleTextMoveX }, { x: 0 }, 1, jpp.util.Easing.easeOutBounce)
                new jpp.command.Tween(@container, { alpha: 0 }, null, 1, jpp.util.Easing.easeOutQuart)
            )
        )

    # ページタイトルテキストのカラーを変更する
    _applyTitleColor: () =>
        @titleText.color = app.Util.getCssColor(@titleText.r, @titleText.g, @titleText.b)


# クラスを名前空間に登録する
jpp.util.Namespace('app').register('AbstractPageScene', AbstractPageScene)
