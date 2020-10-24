import React from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import LoginForm from "./LoginForm";

const Auth = (props) => {
    const isAuthorized = useSelector(state => state.session.isAuthorized)
    return isAuthorized ? props.children : <Redirect to={LoginForm} />
}

export default Auth