# ユーティリティクラス
class Util

    # 黒丸ボタンを作成する
    @createButton: (manager, container, fragments, offsetY) ->
        buttonLength = fragments.length
        buttons = new Array(buttonLength)
        buttonMargin = 50
        buttonIndex = 0
        buttonRadius = 10
        while (buttonIndex < buttonLength)
            button = new createjs.Shape()
            button.graphics.beginFill('#000').drawCircle(0, 0, buttonRadius)
            button.x = buttonMargin * (buttonIndex - (buttonLength - 1) / 2)
            button.y = container.y + offsetY
            Util.setButtonHandlers(manager, button, fragments[buttonIndex])
            container.addChild(button)
            buttons[buttonIndex] = button
            ++buttonIndex
        return buttons

    # ボタンにマウスハンドラを設定する
    @setButtonHandlers: (manager, button, fragment) ->
        button.onMouseOver = (event) =>
            button.alpha = 0.3
            $('#canvas').css('cursor', 'pointer')
        button.onMouseOut = (event) =>
            button.alpha = 1
            $('#canvas').css('cursor', 'default')
        button.onClick = (event) =>
            manager.goto(fragment)

    # RGBの値(0〜1)からCSSカラー表現を取得する
    @getCssColor: (r, g, b) ->
        return "##{Math.round(r * 15).toString(16)}#{Math.round(g * 15).toString(16)}#{Math.round(b * 15).toString(16)}"


# クラスを名前空間に登録する
jpp.util.Namespace('app').register('Util', Util)
