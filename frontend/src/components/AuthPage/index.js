import React from 'react';
import Login from '../LoginForm';
import SignIn from '../SigninForm';
import ForgotModal from '../ForgotModal';
import { connect } from 'react-redux';
import { getAuthToken } from '../../reducers';
import { URL } from '../../settings';
import './styles.css';

const Auth = () => (
    <div className="body">
        <div className='auth-container'>
            <Login />
            <SignIn />
        </div>
        <ForgotModal />
    </div>
);

export default connect(
    state => ({
        isAuth: getAuthToken(state) !== null,
    }),
    undefined,
    (stateProps, disptachProps, ownProps) => {
        if (stateProps.isAuth) {
            window.location.href = URL;
        }
        return ({
            ...stateProps,
            ...disptachProps,
            ...ownProps,
        });
    }
)(Auth);