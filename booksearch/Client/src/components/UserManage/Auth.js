import React from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import LoginForm from "./LoginForm";

/**ログイン済であれば子コンポーネントを表示し、未ログインであればトップ画面を表示する */
const Auth = (props) => {
    const isAuthorized = useSelector(state => state.session.isAuthorized)
    return isAuthorized ? props.children : <Redirect to={LoginForm} />
}

export default Auth