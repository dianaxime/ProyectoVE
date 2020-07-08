import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { getIsForgotOpen } from '../../reducers';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import * as actionsModal from '../../actions/modalForgot';
import TextField from '@material-ui/core/TextField';

const validate = values => {
    const errors = {};
    const requiredFields = [ 'email'];
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

const Forgot = ({open, onHandle}) => {
    return (
        <MDBContainer>
            <MDBModal isOpen={open} fullHeight position="bottom">
                <MDBModalHeader>Recover Password</MDBModalHeader>
                <MDBModalBody>
                    <div>
                        <Field name="email" component={renderTextField} label="Email"/>
                    </div>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={onHandle}>Close</MDBBtn>
                    <MDBBtn color="primary">Send</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    );
}

export default reduxForm({form: 'forgotPass', validate})(
    connect(
        state => ({
            /*Message:
                getIsAuthenticating(state) !== null
                ? getIsAuthenticating(state)
                    ? "Loading"
                    : getAuthenticatingError(state)
                : undefined,
            loginStatus: getIsAuthenticating(state),*/
            open: getIsForgotOpen(state),
        }),
        dispatch => ({
            /*onSubmit(values){
                const {email, password} = values;
                dispatch(actions.startLogin(email, password));
                dispatch(reset('forgotPass'));
            },*/
            onHandle(){
                dispatch(actionsModal.changeForgot(false));
            },
      })
    )(Forgot)
);