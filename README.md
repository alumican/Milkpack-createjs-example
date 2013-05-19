CreateJS勉強会発表サンプル
==========================

第3回CreateJS勉強会での発表サンプル。

実際に動くものを見る
------
[http://lab.alumican.net/createjs_seminar/03/example/](http://lab.alumican.net/createjs_seminar/03/example/)

ブラウザのデバッグコンソールを起動すると Hello → Arrive → Leave → Bye の処理の流れが分かります。

自分の環境で動かす
------
deployディレクトリがホストのルートになるようにapacheローカルサーバ上で動かしてください。

apache以外の環境で動かす場合は、下層ページへのダイレクトアクセスをルートにリダイレクトする処理を適宜設定してください。
つまり、[https://github.com/glassesfactory/kazitori.js](kazitori.js)が動く環境であれば動きます。

改造する
------
srcディレクトリの中にコメント付きのソースコード一式が入っています。
Application.coffeが起点となっているのでそちらから読み進めるのがよいでしょう。

CoffeeScriptのコンパイルには[http://gruntjs.com/](grunt)のバージョン0.4以降を使用しています。
coffee-cli、node.jsがインストールされている環境であれば、package.jsonがあるディレクトリで `npm install` を実行するとgruntの環境が構築されるはずです。

ライセンス
------
お好きにどうぞ
