import React from "react";
import { connect } from 'react-redux';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { Field, reduxForm, reset } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {
    getIsRegistering,
    getRegisteringError
} from '../../reducers';
import * as actions from '../../actions/auth';
import Loader from 'react-loaders';

const validate = values => {
    const errors = {};
    const requiredFields = ['email', 'first_name', 'last_name', 'carne', 'sex', 'type', 'career', 'faculty'];
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

let SigninForm = ({ Message, onSubmit, signinStatus, handleSubmit }) => {
    return (
        <MDBContainer style={{
            background: "linear-gradient(200deg, rgba(63,62,64,1) 0%, rgba(8,140,66,1) 75%)",
            height: "30rem"
        }}>
            <div>
                <MDBCol>
                    <MDBRow md="6">
                        <form>
                            <p className="h5 text-center mb-4 grey-text">Sign up</p>
                            <div className="row my-3 d-flex justify-content-center">
                                <div>
                                    <div>
                                        <Field name="email" component={renderTextField} label="Email" />
                                    </div>
                                    <div>
                                        <Field name="first_name" component={renderTextField} label="First Name" />
                                    </div>
                                    <div>
                                        <Field name="sex" component={renderSelectField} label="Gender">
                                            <MenuItem value="F">F</MenuItem>
                                            <MenuItem value="M">M</MenuItem>
                                        </Field>

                                    </div>
                                    <div>
                                        <Field name="career" component={renderSelectField} label="Career">
                                            <MenuItem value="compu">Compu</MenuItem>
                                            <MenuItem value="admin">Admin</MenuItem>
                                        </Field>

                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <Field name="carne" component={renderTextField} label="Carne" />
                                    </div>
                                    <div>
                                        <Field name="last_name" component={renderTextField} label="Last Name" />
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
                                        <Field name="faculty" component={renderSelectField} label="Faculty">
                                            <MenuItem value="ingenieria">Ingeniería</MenuItem>
                                            <MenuItem value="ciencias_y_humanidades">Ciencias y Humanidades</MenuItem>
                                        </Field>

                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                {signinStatus ? <Loader type="ball-spin-fade-loader" /> :
                                    <div >
                                        <MDBBtn
                                            outline
                                            color="black"
                                            className="btn-block z-depth-1a"
                                            onClick={handleSubmit(onSubmit)}
                                        >Sign In</MDBBtn>
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

SigninForm = reduxForm({
    form: 'signinForm',
    validate
})(SigninForm);

SigninForm = connect(
    state => ({
        Message:
            getIsRegistering(state) !== null
                ? getIsRegistering(state)
                    ? "Loading"
                    : getRegisteringError(state)
                : undefined,
        signinStatus: getIsRegistering(state),
    }),
    dispatch => ({
        onSubmit({
            email,
            first_name,
            last_name,
            carne,
            sex,
            type,
            career,
            faculty,
        }) {
            dispatch(actions.startRegister(email, first_name, last_name, carne, sex, type, career, faculty));
            dispatch(reset('signinForm'));
        },
    })
)(SigninForm);

export default SigninForm;