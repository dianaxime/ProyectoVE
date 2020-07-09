import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import {
    getIsRecovering,
    getRecoveringError,
    getIsForgotOpen
} from '../../reducers';
import * as actions from '../../actions/auth';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import * as actionsModal from '../../actions/modalForgot';
import TextField from '@material-ui/core/TextField';

const validate = values => {
    const errors = {};
    const requiredFields = ['email'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required';
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

let Forgot = ({ open, onHandle, Message, onSubmit, handleSubmit }) => {
    return (
        <MDBContainer>
            <MDBModal isOpen={open} fullHeight position="bottom">
                <MDBModalHeader>Recover Password</MDBModalHeader>
                <MDBModalBody>
                    <div>
                        <div>
                            <Field name="email" component={renderTextField} label="Email" />
                        </div>
                        <div>{Message}</div>

                    </div>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={onHandle}>Close</MDBBtn>
                    <MDBBtn color="primary" onClick={handleSubmit(onSubmit)}>Send</MDBBtn>
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
        Message:
            getIsRecovering(state) !== null
                ? getIsRecovering(state)
                    ? "Loading"
                    : getRecoveringError(state)
                : undefined,
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
    })
)(Forgot);

export default Forgot;