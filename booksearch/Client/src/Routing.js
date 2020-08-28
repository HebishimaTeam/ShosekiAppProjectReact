import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginForm from './components/UserManage/LoginForm';
import BookSearchForm from './components/BookManage/BookSearchForm';
import BookAddForm from './components/BookManage/BookAddForm';

class Routing extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            {/* 指定なしの場合はログイン画面 */}
            <Route exact path="/" component={LoginForm} />
            {/* ログイン画面 */}
            <Route exact path="/Login" component={LoginForm} />
            {/* 検索画面 */}
            <Route exact path="/BookSearch" component={BookSearchForm} />
            {/* 書籍追加画面 */}
            <Route exact path="/BookAdd" component={BookAddForm} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default Routing;