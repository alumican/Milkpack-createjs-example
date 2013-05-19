# 名前空間のインポート
jpp.util.Namespace('app').use()


# Gallery ページの挙動を定義したシーンクラス
class PageGalleryScene extends app.AbstractPageScene

    # このシーンクラスが初めて必要になったときに一度だけ呼び出される初期化メソッドをオーバーライドする
    _onInit: () =>
        super('Gallery', 0, ['/gallery/1', '/gallery/2', '/gallery/3', '/gallery/4', '/gallery/5'])


# クラスを名前空間に登録する
jpp.util.Namespace('app').register('PageGalleryScene', PageGalleryScene)
