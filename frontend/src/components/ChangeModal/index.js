import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import * as actionsModal from '../../actions/modalChange';
import * as actions from '../../actions/auth';
import TextField from '@material-ui/core/TextField';
import { 
    getIsChanging,
    getChangingError,
    getIsChangeOpen
} from '../../reducers';

const validate = values => {
    const errors = {};
    const requiredFields = ['oldPassword', 'newPassword'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Obligatorio*';
        }
    })
    if (values.newPassword && (values.newPassword < 8)) {
        errors.newPassword = 'La contraseña tiene que tener 8 o más caracteres';
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

let Change = ({ open, onHandle, onSubmit, handleSubmit, Message }) => {
    return (
        <MDBContainer>
            <MDBModal isOpen={open} side position="bottom-left">
                <MDBModalHeader ><b>Cambiar Contraseña</b></MDBModalHeader>
                <MDBModalBody>
                    <div>
                        <Field name="oldPassword" component={renderTextField} label="Contraseña Actual" type="password" />
                        <p></p>
                        <Field name="newPassword" component={renderTextField} label="Contraseña Nueva" type="password" />
                        <div>{Message}</div>
                    </div>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="red" onClick={onHandle}>Cerrar</MDBBtn>
                    <MDBBtn color="green" onClick={handleSubmit(onSubmit)}>Cambiar Contraseña</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    );
}

Change = reduxForm({
    form: 'changePass',
    validate
})(Change);


Change = connect(
    state => ({
        Message:
            getIsChanging(state) !== null
                ? getIsChanging(state)
                    ? "Loading"
                    : getChangingError(state)
                : undefined,
        open: getIsChangeOpen(state),
    }),
    dispatch => ({
        onSubmit({ oldPassword, newPassword }) {
            dispatch(actions.startChangePass(oldPassword, newPassword));
            dispatch(reset('changePass'));
        },
        onHandle() {
            dispatch(reset('changePass'));
            dispatch(actionsModal.changeChange(false));
        },
    })
)(Change);

export default Change;