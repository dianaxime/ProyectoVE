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
    MDBBtn
} from 'mdbreact';
import { Field, reduxForm, reset } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Loader from 'react-loaders';
import './style_login.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validate = values => {
    const errors = {};
    const requiredFields = ['email', 'password'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Obligatorio*';
        }
    })
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Correo electronico invalido';
    }
    return errors;
}

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField placeholder={label}
        label={label}
        helperText={touched && error}
        {...input}
        {...custom}
        fullWidth
    />
);

let Login = ({ Message, onSubmit, loginStatus, handleSubmit, onHandle }) => {
    return (
        <MDBContainer className="contenedor_" size="sm">
            <div>
                <form>
                    <p className="titulo_">Iniciar Sesión</p>
                    <div>
                        <Field name="email" component={renderTextField} label="Correo Electrónico" className="input"/>
                    </div>
                    <div>
                        <Field name="password" component={renderTextField} label="Contraseña" type="password" className="input"/>
                    </div>
                    <p className="font-small grey-text d-flex justify-content-end" onClick={onHandle}>
                        Olvide mi
                                <b
                            className="dark-grey-text font-weight-bold ml-1"
                        >
                            Contraseña?
                                </b>
                    </p>
                    <div className="text-center">
                        {loginStatus ? <Loader type="ball-spin-fade-loader" /> :
                            <div >
                                <MDBBtn
                                    outline
                                    color="dark-green"
                                    className="boton_inicio"
                                    onClick={handleSubmit(onSubmit)}
                                >Iniciar Sesión</MDBBtn>
                            </div>
                        }
                    </div>
                </form>
                <ToastContainer position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover />
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
        Message: getAuthenticatingError(state),
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
    }),
    (stateProps, dispatchProps, ownProps) => {
        if (stateProps.Message !== null) {
            toast.error(stateProps.Message);

        }
        return ({
            ...stateProps,
            ...dispatchProps,
            ...ownProps,
        });
    },
)(Login);

export default Login;