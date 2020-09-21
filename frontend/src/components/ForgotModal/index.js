import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import {
    getRecoveringStatus,
    getIsForgotOpen
} from '../../reducers';
import * as actions from '../../actions/auth';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import * as actionsModal from '../../actions/modalForgot';
import TextField from '@material-ui/core/TextField';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validate = values => {
    const errors = {};
    const requiredFields = ['email'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Obligatorio*';
        }
    })
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Correo electrónico invalido';
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

let Forgot = ({ open, onHandle, Message, onSubmit, handleSubmit }) => {
    return (
        <MDBContainer>
            <MDBModal backdrop={false} isOpen={open}>
                <MDBModalHeader toggle={onHandle}><b>Recuperar Contraseña</b></MDBModalHeader>
                <MDBModalBody>
                    <div>
                        <div>
                            <p>Se mandará un correo electrónico a la cuenta ingresada con la nueva contraseña.</p>
                            <Field name="email" component={renderTextField} label="Correo Electrónico" />
                        </div>
                        <div>{Message}</div>
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
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="red" onClick={onHandle}>Cerrar</MDBBtn>
                    <MDBBtn color="green" onClick={handleSubmit(onSubmit)}>Enviar</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    );
}

Forgot = reduxForm({
    form: 'forgotPass',
    validate
})(Forgot);

Forgot = connect(
    state => ({
        status: getRecoveringStatus(state),
        open: getIsForgotOpen(state),
    }),
    dispatch => ({
        onSubmit({ email }) {
            dispatch(actions.startRecover(email));
            dispatch(reset('forgotPass'));
        },
        onHandle() {
            dispatch(reset('forgotPass'));
            dispatch(actionsModal.changeForgot(false));
        },
        onChangeStatus() {
            dispatch(actions.setStatus());
        },
    }),
    (stateProps, dispatchProps, ownProps) => {
        if (stateProps.status === 'SUCCESS') {
            toast.success("Verifica tu correo, se te ha enviado una nueva contraseña");
            dispatchProps.onChangeStatus();
        }
        if (stateProps.status === 'ERROR') {
            toast.error("Un error inesperado ha ocurrido. Por favor inténtalo de nuevo");
            dispatchProps.onChangeStatus();
        }
        return ({
            ...stateProps,
            ...dispatchProps,
            ...ownProps,
        });
    },
)(Forgot);

export default Forgot;