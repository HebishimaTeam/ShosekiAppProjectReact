import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginForm from './components/UserManage/LoginForm'
import BookSearchForm from './components/BookManage/BookSearchForm'
import BookAddForm from './components/BookManage/BookAddForm'
import NavBar from './components/Navigation/NavBar'
import { Provider } from "react-redux";
import store from "./redux/store";

class Routing extends Component {
  render() {
    return (
      // storeをどのコンポーネントでも呼び出せるようにするために、Providerコンポーネントですべての画面をラップする
      <Provider store={store}>
        <div className="wrap-router">
          <Router >
            <div className="header">
              <NavBar />
            </div>
            <div className="body">
              <nav></nav>
              <main>
                <Switch>
                  {/* 指定なしの場合はログイン画面 */}
                  <Route exact path="/" component={LoginForm} />
                  {/* ログイン画面 */}
                  <Route exact path="/Login" component={LoginForm} />
                  {/* 検索画面 */}
                  {/* TODO: 検索内容をBookSearchFormに受け渡す処理追加 */}
                  <Route exact path="/BookSearch" component={() => <BookSearchForm searchTitle="" />} />
                  {/* 書籍追加画面 */}
                  <Route exact path="/BookAdd" component={BookAddForm} />
                </Switch>
              </main>
              <aside></aside>
            </div>
            <div className="footer">
            </div>
          </Router>
        </div>
      </Provider>
    )
  }
}

export default Routing