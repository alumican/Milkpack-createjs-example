CreateJS勉強会発表サンプル
==========================

第3回CreateJS勉強会での発表サンプル。

実際に動くものを見る
------
[http://lab.alumican.net/createjs_seminar/03/example/](http://lab.alumican.net/createjs_seminar/03/example/)

ブラウザのデバッグコンソールを起動すると Hello → Arrive → Leave → Bye の処理の流れが分かります。

自分の環境で動かす
------
deploy ディレクトリがホストのルートになるように apache ローカルサーバ上で動かしてください。

apache 以外の環境で動かす場合は、下層ページへのダイレクトアクセスをルートにリダイレクトする処理を適宜設定してください。
つまり、[kazitori.js](https://github.com/glassesfactory/kazitori.js) が動く環境であれば動きます。

改造する
------
src ディレクトリの中にコメント付きのソースコード一式が入っています。
Application.coffe が起点となっているのでそちらから読み進めるのがよいでしょう。

CoffeeScript のコンパイルには [grunt](http://gruntjs.com/) のバージョン0.4以降を使用しています。
grunt-cli、node.js がインストールされている環境であれば、package.json があるディレクトリで `npm install` を実行すると grunt の環境が構築されるはずです。

ライセンス
------
お好きにどうぞ
