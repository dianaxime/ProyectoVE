import { connect } from 'react-redux';
import { 
    getIsAuthenticating,
    getAuthenticatingError
} from '../../reducers';
import * as actions from '../../actions/auth';
import * as actionsModal from '../../actions/modalForgot';
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
import './style_login.css';

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

let Login = ({ Message, onSubmit, loginStatus, handleSubmit, onHandle }) => {
    return (
        <MDBContainer className="contenedor_">
            <div>
                <MDBCol className="">
                    <MDBRow md="6">
                        <form>
                            <p className="titulo_">Iniciar Sesión</p>
                            <div>
                                <Field name="email" component={renderTextField} label="Correo Electrónico"/>
                            </div>
                            <div>
                                <Field name="password" component={renderTextField} label="Contraseña" type="password" />
                            </div>
                            <p className="font-small grey-text d-flex justify-content-end" onClick={onHandle}>
                                Olvide mi
                                <a
                                    href='!#'
                                    className="dark-grey-text font-weight-bold ml-1"
                                >
                                Contraseña?
                                </a>
                            </p>
                            <div className="text-center">
                                { loginStatus ? <Loader type="ball-spin-fade-loader"/> :
                                    <div >
                                        <MDBBtn
                                            outline
                                            color="dark-green"
                                            className="btn-block z-depth-1a"
                                            onClick={handleSubmit(onSubmit)}
                                        >Iniciar Sesión</MDBBtn>
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

Login = reduxForm({
    form: 'loginForm', 
    validate
})(Login);

Login = connect(
    state => ({
        Message:
            getIsAuthenticating(state) !== null
                ? getIsAuthenticating(state)
                    ? "Loading"
                    : getAuthenticatingError(state)
                : undefined,
        loginStatus: getIsAuthenticating(state),
    }),
    dispatch => ({
        onSubmit(values) {
            const { email, password } = values;
            dispatch(actions.startLogin(email, password));
            dispatch(reset('loginForm'));
        },
        onHandle() {
            dispatch(actionsModal.changeForgot(true));
        },
    })
)(Login);

export default Login;