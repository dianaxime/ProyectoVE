import React from "react";
import Login from "../LoginForm";
import SignIn from "../SigninForm";
import { connect } from 'react-redux';
import { getAuthToken } from '../../reducers';
import { URL } from '../../settings';
import "./styles.css";

const Auth = () => (
    <div className="auth-container">
        <Login/>
        <SignIn/>
    </div>
);

export default connect(
    state => ({
        isAuth: getAuthToken(state) !== null,
      }),
    undefined,
    (stateProps, disptachProps) => {
        if(stateProps.isAuth){
            window.location.href = URL;
        }
        return {disptachProps};
    }
)(Auth);