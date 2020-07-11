import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginForm from './components/UserManage/LoginForm';
import BookSearchForm from './components/BookManage/BookSearchForm';

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
        </Switch>
        </div>
      </Router>
    )
  }
}

export default Routing;