import { connect } from 'react-redux';
import { 
    getIsAuthenticating,
    getAuthenticatingError
} from '../../reducers';
import * as actions from '../../actions/auth';
import React from 'react';
import { 
    MDBContainer, 
    MDBRow, 
    MDBCol, 
    MDBBtn 
} from 'mdbreact';
import { Field, reduxForm, reset } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Loader from 'react-loaders';

const validate = values => {
    const errors = {};
    const requiredFields = [ 'email', 'password'];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
        errors[ field ] = 'Required';
        }
    })
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    return errors;
}

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField placeholder={label}
        label={label}
        helperText={touched && error}
        {...input}
        {...custom}
    />
);

const Login = ({ Message, onSubmit, loginStatus, handleSubmit }) => {
    return (
        <MDBContainer style={{
            background: "rgba(63,62,64,1)",
            height: "30rem"
        }}>
            <div>
                <MDBCol className="d-flex align-items-center mb-4">
                    <MDBRow md="6">
                        <form>
                            <p className="h5 text-center mb-4 green-text">Log in</p>
                            <div>
                                <Field name="email" component={renderTextField} label="Email"/>
                            </div>
                            <div>
                                <Field name="password" component={renderTextField} label="Password" type="password" />
                            </div>
                            <div className="text-center">
                                { loginStatus ? <Loader type="ball-spin-fade-loader"/> :
                                    <div >
                                        <MDBBtn
                                            outline
                                            color="dark-green"
                                            className="btn-block z-depth-1a"
                                            onClick={handleSubmit(onSubmit)}
                                        >Log In</MDBBtn>
                                    </div>
                                }
                            </div>
                        </form>
                    </MDBRow>
                </MDBCol>
                <div>{Message}</div>
            </div>
        </MDBContainer>
    );
};

export default connect(
    state => ({
        Message:
            getIsAuthenticating(state) !== null
            ? getIsAuthenticating(state)
                ? "Loading"
                : getAuthenticatingError(state)
            : undefined,
        loginStatus: getIsAuthenticating(state),
    })
    )(
    reduxForm({
        form:'loginForm',
        validate,
        onSubmit({email, password},  dispatch){
            dispatch(actions.startLogin(email, password));
            dispatch(reset('loginForm'));
        },
    })(Login)
);