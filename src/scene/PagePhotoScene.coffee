# 名前空間のインポート
jpp.util.Namespace('app').use()


# Photo ページの挙動を定義したシーンクラス
class PagePhotoScene extends app.AbstractPageScene

    # このシーンクラスが初めて必要になったときに一度だけ呼び出される初期化メソッドをオーバーライドする
    _onInit: () =>
        super("Photo #{@getParams()[0]}", 120)


# クラスを名前空間に登録する
jpp.util.Namespace('app').register('PagePhotoScene', PagePhotoScene)
