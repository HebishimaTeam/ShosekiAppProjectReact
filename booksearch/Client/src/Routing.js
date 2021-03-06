import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginForm from './components/UserManage/LoginForm'
import BookSearchForm from './components/BookManage/BookSearchForm'
import BookAddForm from './components/BookManage/BookAddForm'
import NavBar from './components/Navigation/NavBar'
import { Provider } from "react-redux";
import store from "./redux/store";
import Auth from "./components/UserManage/Auth";

class Routing extends Component {
  render() {
    return (
      // storeをどのコンポーネントでも呼び出せるようにするために、Providerコンポーネントですべての画面をラップする
      <Provider store={store}>
        <div className="wrap-router">
          <Router >
            <main>
              <Switch>
                {/* 指定なしの場合はログイン画面 */}
                <Route exact path="/" component={LoginForm} />
                {/* ログイン画面 */}
                <Route exact path="/Login" component={LoginForm} />
                {/* Authの子要素にログイン後画面を入れる */}
                <Auth>
                  <div className="header">
                    <NavBar />
                  </div>
                  <Switch>
                    {/* 検索画面 */}
                    {/* TODO: 検索内容をBookSearchFormに受け渡す処理追加 */}
                    <Route exact path="/BookSearch" component={() => <BookSearchForm />} />
                    {/* 書籍追加画面 */}
                    <Route exact path="/BookAdd" component={BookAddForm} />
                  </Switch>
                </Auth>
              </Switch>
            </main>
            <aside></aside>
            <div className="footer">
            </div>
          </Router>
        </div>
      </Provider>
    )
  }
}

export default Routing