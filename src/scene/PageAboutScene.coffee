# 名前空間のインポート
jpp.util.Namespace('app').use()


# About ページの挙動を定義したシーンクラス
class PageAboutScene extends app.AbstractPageScene

    # このシーンクラスが初めて必要になったときに一度だけ呼び出される初期化メソッドをオーバーライドする
    _onInit: () =>
        super('About')


# クラスを名前空間に登録する
jpp.util.Namespace('app').register('PageAboutScene', PageAboutScene)
