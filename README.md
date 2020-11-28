## このプロジェクトについて

書籍を管理するあれこれです。

## エミュレータを利用して開発する方法

### 環境構築

1. ターミナルから`npm install -g cross-env`コマンドを実行し、`cross-env`コマンドを有効化する
2. [JDK](https://www.oracle.com/java/technologies/javase-downloads.html)をインストール

### 実行方法

1. `/Server/functions`のnpm script `emulate` または `emulate-with-data` を実行してfirestore, functionsのエミュレータを実行

    `localhost:4000`から実行中のエミュレータの状態を確認できます

2. (Webアプリからエミュレータを呼び出す場合)`Client`のnpm script `start-emu` を実行

    ※このコマンドでの実行時はリクエストurlを`http://localhost:5001/shosekiappproject/us-central1/api/`から始まるものに変更するよう実装する