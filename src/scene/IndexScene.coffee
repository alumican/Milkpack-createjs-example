# 名前空間のインポート
jpp.util.Namespace('app').use()
jpp.util.Namespace('jpp.command').use()
jpp.util.Namespace('jpp.util').use()


# トップページの挙動を定義したシーンクラス
class IndexScene extends app.AbstractDisplayScene

    # このシーンクラスが初めて必要になったときに一度だけ呼び出される初期化メソッドをオーバーライドする
    _onInit: () =>
        super('Index')

        # ページタイトルテキストを作成する
        @titleText = new createjs.Text('MilkpackJS with CreateJS\nPushState Example', '60px Arial', '#333')
        @titleText.textAlign = 'center'
        @titleText.lineHeight = 80
        @titleTextOffsetY = 50
        @titleTextMoveY = 50
        @titleText.y = @titleTextOffsetY - @titleTextMoveY
        @titleText.r = @titleText.g = @titleText.b = 0
        @titleTextArea = new createjs.Shape()
        @titleTextArea.graphics.beginFill('#000').drawRect(-340, 0, 680, 150)
        @titleText.hitArea = @titleTextArea
        @container.addChild(@titleText)

        # ページタイトルテキストをボタン化する
        app.Util.setButtonHandlers(@manager, @titleText, @getFragment())

        # 下層ページへの遷移ボタンを作成する
        app.Util.createButton(@manager, @container, ['/about', '/gallery'], 230)

        @resize()

    # このシーンが目的地である場合、もしくはこのシーンよりも下層シーンに遷移する場合に、このシーンに遷移を開始した瞬間に呼び出される
    _onHello: () =>
        console.log("#{@getFragment()} : Hello")

        # 実行したいコマンドを登録する
        @addCommand(
            () =>
                # ウィンドウのリサイズを監視する
                @manager.addEventListener('resize', @_resizeHandler)

                # 現在のウィンドウサイズにコンテンツを合わせる
                @resize()

            # スライド / フェードアニメーション
            new jpp.command.Parallel(
                new jpp.command.Tween(@titleText, { y: @titleTextOffsetY }, null, 1, jpp.util.Easing.easeOutBounce)
                new jpp.command.Tween(@container, { alpha: 1 }, null, 1, jpp.util.Easing.easeOutQuart)
            )
        )

    # このシーンが目的地である場合に、このシーンに遷移を開始した瞬間に呼び出される
    _onArrive: () =>
        console.log("#{@getFragment()} : Arrive")

        # 実行したいコマンドを登録する
        @addCommand(
            # カラーアニメーション
            new jpp.command.Tween(@titleText, { r: 1 }, null, 0.5, jpp.util.Easing.easeOutQuart, null, @_applyTitleColor)
        )

    # このシーンが出発点である場合に、このシーンに遷移を開始した瞬間に呼び出される
    _onLeave: () =>
        console.log("#{@getFragment()} : Leave")

        # 実行したいコマンドを登録する
        @addCommand(
            # カラーアニメーション
            new jpp.command.Tween(@titleText, { r: 0 }, null, 0.5, jpp.util.Easing.easeOutQuart, null, @_applyTitleColor)
        )

    # このシーンが出発点である場合、もしくはこのシーンよりも上層シーンに、このシーンに遷移を開始した瞬間に呼び出される
    _onBye: () =>
        console.log("#{@getFragment()} : Bye")

        # 実行したいコマンドを登録する
        @addCommand(
            # スライド / フェードアニメーション
            new jpp.command.Parallel(
                new jpp.command.Tween(@titleText, { y: @titleTextOffsetY - @titleTextMoveY }, null, 1, jpp.util.Easing.easeOutQuart)
                new jpp.command.Tween(@container, { alpha: 0 }, null, 1, jpp.util.Easing.easeOutQuart)
            )

            # ウィンドウのリサイズ監視を停止する
            () => @manager.removeEventListener('resize', @_resizeHandler)
        )

    # ページタイトルテキストのカラーを変更する
    _applyTitleColor: () =>
        @titleText.color = app.Util.getCssColor(@titleText.r, @titleText.g, @titleText.b)


# クラスを名前空間に登録する
jpp.util.Namespace('app').register('IndexScene', IndexScene)
