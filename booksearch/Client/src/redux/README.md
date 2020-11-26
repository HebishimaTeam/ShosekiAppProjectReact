# このディレクトリについて

reduxディレクトリではReduxというライブラリに関係するデータを配置しています。

## Reduxとは
<hr><br>

[Redux](https://redux.js.org/)はアプリケーション全体の状態管理用のライブラリです。

また、記述を簡易にする為に、[Redux Toolkit](https://redux-toolkit.js.org/)というライブラリを入れています。

### 参考URL

- [Reduxを分かりやすく解説してみた](https://future-architect.github.io/articles/20200429/)
- [HookとRedux ToolkitでReact Reduxに入門する](https://www.hypertextcandy.com/learn-react-redux-with-hooks-and-redux-starter-kit)

## 概説
<hr><br>

補足説明を記載します。

### なぜreduxを使用するのか？

ちょっとだけ簡単に説明。主観です。

Reduxを導入した目的は、

Reduxで扱うデータ(state)では、
*どのデータを使うか*や*データをどのように変化させるか*に集中することができるようになります。

これによって、
> このコンポーネントでこのデータを使うから、このデータをこのコンポーネントに渡して...

といったコンポーネント同士でのデータ管理を廃して、
- コンポーネント同士の結合を疎にすることができる
- 画面とアプリケーションとの結合を疎にすることができる

といったメリットを享受することが出来るからです。


### どんな動作をするのか？

Reduxでは、クラスコンポーネントが画面状態を格納するstateを扱うように、アプリケーション全体の情報を格納したstateオブジェクトを管理します。

通常のReactでstateが変化すると画面状態が再描画されるのと同様に、Reduxのアプリケーション全体のstateが変化した場合も画面状態が再描画されます。

Reduxで管理するstateを画面コンポーネントで扱うためには、
- `useSelect()`
- `dispatch()`

といった関数を使用します。

`useSelect()`では、Reduxで管理するstateをコンポーネントから参照することができます。
引数によってstate全体や、特定のプロパティなど参照する箇所を指定出来ます。
useSelectの引数には、
*アプリケーション全体のstateを引数*に、*stateの一部を返す関数*を与えます。

`dispatch()`をコンポーネントから呼び出すことで、Reduxで管理するstateを書き換えることができます。

dispatchの引数には、どのような種類の書き換えを実行するかを示すオブジェクト(action)を与えます。


初めてこのライブラリに触れる人のために、

- `src/redux/store.js`
- `src/redux/slices/session/session.js`
- `src/components/Navigation/NavBar.js`

あたりには過剰にコメントを挟んでいます。

### storeについて

Reduxでは、stateをstoreと呼ばれるオブジェクトの中で管理しています。

storeは、アプリケーションの状態を保持するstateと、アプリケーションの状態を書き換える関数のreducerを格納しています。

上述のdispatch()関数がコンポーネントから呼び出されると、reducer関数が実行され、dispatch()引数の種類に対応した処理によってstateが書き換えられます。

コンポーネントでは、どのstate変更処理を呼び出すかだけを記述し、(つまり、どのactionをdispatchするか指定し)

reducer関数の処理内には、action毎に対応したstateの書き換え処理を記載します。

### sliceについて

Reduxでは、アプリケーション全体のデータを管理していますが、様々な種類のデータを分割して扱いたい場合にstoreを分割することができます。

Redux Toolkitによって分割した場合に、それをsliceと呼びます。
sliceはstoreと同様にstateとreducerを持ったオブジェクトです。

### 用語解説

簡単にコメント内で使用している用語について纏めます

- Redux
    アプリケーション全体での状態管理をするライブラリ
- Redux Toolkit
    Reduxを簡単に書けるようにするライブラリ
- state
    状態を管理する*オブジェクト*
- reducer
    stateを書き換える*関数*
    引数のactionによってどのstateを書き換えるのか分岐する
- action
    reducerで、どのようにstateを書き換えるのかを定義した*オブジェクト*
- store
    stateとreducerを格納したもの
- dispatch
    reducerにactionを送信するための関数
- slice
    管理する状態の種類などに応じてstoreを分割したもの. 振る舞いはstoreと同様