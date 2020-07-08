import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBRow } from 'mdbreact';
import { getIsChangeOpen } from '../../reducers';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import * as actionsModal from '../../actions/modalChange';
import TextField from '@material-ui/core/TextField';

const validate = values => {
    const errors = {};
    const requiredFields = [ 'oldPassword', 'newPassword'];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Required';
        }
    })
    if (values.newPassword && !(values.newPassword >= 8)) {
        errors.newPassword = 'Password lenght eight(8) or more';
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

const Change = ({open, onHandle}) => {
    return (
        <MDBContainer>
            <MDBModal isOpen={open} fullHeight position="bottom">
                <MDBModalHeader>Change Password</MDBModalHeader>
                <MDBModalBody>
                    <MDBRow>
                        <div>
                            <Field name="oldPassword" component={renderTextField} label="Old Password" type="password" />
                        </div>
                        <div>
                            <Field name="newPassword" component={renderTextField} label="New Password" type="password" />
                        </div>
                    </MDBRow>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={onHandle}>Close</MDBBtn>
                    <MDBBtn color="primary">Change Password</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    );
}

export default reduxForm({form: 'changePass', validate})(
    connect(
        state => ({
            /*Message:
                getIsAuthenticating(state) !== null
                ? getIsAuthenticating(state)
                    ? "Loading"
                    : getAuthenticatingError(state)
                : undefined,
            loginStatus: getIsAuthenticating(state),*/
            open: getIsChangeOpen(state),
        }),
        dispatch => ({
            /*onSubmit(values){
                const {email, password} = values;
                dispatch(actions.startLogin(email, password));
                dispatch(reset('ChangePass'));
            },*/
            onHandle(){
                dispatch(actionsModal.changeChange(false));
            },
      })
    )(Change)
);