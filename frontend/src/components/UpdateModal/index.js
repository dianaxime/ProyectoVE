import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBCol } from 'mdbreact';
import {
    getIsUpdating,
    getUpdatingError,
    getIsUpdateOpen,
    getUser
} from '../../reducers';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';
import { Field, reduxForm } from 'redux-form';
import * as actionsModal from '../../actions/modalUpdate';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const validate = values => {
    const errors = {};
    const requiredFields = ['first_name', 'last_name', 'carne', 'sex', 'type', 'career', 'faculty'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required';
        }
    })
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

const renderSelectField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField placeholder={label}
        label={label}
        helperText={touched && error}
        {...input}
        {...custom}
        id="select"
        select
    />
);

let UpdateUserForm = ({ open, onHandle, onSubmit, handleSubmit, Message }) => {
    return (
        <MDBContainer>
            <MDBModal isOpen={open} fullHeight position="right">
                <MDBModalHeader>Update Profile</MDBModalHeader>
                <MDBModalBody>
                    <MDBCol>
                        <div>

                            <div>
                                <Field name="first_name" component={renderTextField} label="First Name" />
                            </div>
                            <div>
                                <Field name="last_name" component={renderTextField} label="Last Name" />
                            </div>
                            <div>
                                <Field name="carne" component={renderTextField} label="Carne" />
                            </div>
                            <div>
                                <Field name="sex" component={renderSelectField} label="Gender">
                                    <MenuItem value="F">F</MenuItem>
                                    <MenuItem value="M">M</MenuItem>
                                </Field>
                            </div>
                            <div>
                                <Field name="type" component={renderSelectField} label="Type">
                                    <MenuItem value="student">Student</MenuItem>
                                    <MenuItem value="graduate">Graduate</MenuItem>
                                    <MenuItem value="collaborator">Collaborator</MenuItem>
                                    <MenuItem value="graduate/collaborator">Graduate/Collaborator</MenuItem>
                                </Field>
                            </div>
                            <div>
                                <Field name="career" component={renderSelectField} label="Career">
                                    <MenuItem value="compu">Compu</MenuItem>
                                    <MenuItem value="admin">Admin</MenuItem>
                                </Field>

                            </div>
                            <div>
                                <Field name="faculty" component={renderSelectField} label="Faculty">
                                    <MenuItem value="ingenieria">Ingeniería</MenuItem>
                                    <MenuItem value="ciencias_y_humanidades">Ciencias y Humanidades</MenuItem>
                                </Field>
                            </div>
                            <div>{Message}</div>
                        </div>
                    </MDBCol>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={onHandle}>Close</MDBBtn>
                    <MDBBtn color="primary" onClick={handleSubmit(onSubmit)}>Update Profile</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    );
}

UpdateUserForm = reduxForm({
    form: 'updateUserForm',
    validate
})(UpdateUserForm)

UpdateUserForm = connect(
    state => ({
        Message:
            getIsUpdating(state) !== null
                ? getIsUpdating(state)
                    ? "Loading"
                    : getUpdatingError(state)
                : undefined,
        open: getIsUpdateOpen(state),
        initialValues: getUser(state),
    }),
    dispatch => ({
        onSubmit({ first_name, last_name, carne, sex, type, career, faculty }) {
            dispatch(actions.startUpdateUser(first_name, last_name, carne, sex, type, career, faculty));
        },
        onHandle() {
            dispatch(actionsModal.changeUpdate(false));
        },
    })
)(UpdateUserForm);

export default UpdateUserForm;