import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBCol } from 'mdbreact';
import { getIsUpdateOpen } from '../../reducers';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import * as actionsModal from '../../actions/modalUpdate';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const validate = values => {
    const errors = {};
    const requiredFields = [ 'first_name', 'last_name', 'carne', 'sex', 'type', 'career', 'faculty'];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Required';
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

const Update = ({ open, onHandle }) => {
    return (
        <MDBContainer>
            <MDBModal isOpen={open} fullHeight position="right">
                <MDBModalHeader>Update Profile</MDBModalHeader>
                <MDBModalBody>
                    <MDBCol>
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
                    </MDBCol>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={onHandle}>Close</MDBBtn>
                    <MDBBtn color="primary">Update Profile</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    );
}

export default reduxForm({form: 'updateUser', validate})(
    connect(
        state => ({
            /*Message:
                getIsAuthenticating(state) !== null
                ? getIsAuthenticating(state)
                    ? "Loading"
                    : getAuthenticatingError(state)
                : undefined,
            loginStatus: getIsAuthenticating(state),*/
            open: getIsUpdateOpen(state),
        }),
        dispatch => ({
            /*onSubmit(values){
                const {email, password} = values;
                dispatch(actions.startLogin(email, password));
                dispatch(reset('UpdatePass'));
            },*/
            onHandle(){
                dispatch(actionsModal.changeUpdate(false));
            },
      })
    )(Update)
);