import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import * as actionsModal from '../../actions/modalScholarship';
import * as actions from '../../actions/scholars';
import { v4 as uuidv4 } from 'uuid';
import {
    getIsScholarOpen
} from '../../reducers';

const validate = values => {
    const errors = {};
    const requiredFields = ['hours', 'public_speaking', 'organization', 'photo_editing', 'video_editing'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Obligatorio*';
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

let scholarship_hours= ({ open, onHandle, onSubmit, handleSubmit }) => {
    return (
        <MDBContainer>
            <MDBModal  isOpen={open} side position="bottom-left">
                <MDBModalHeader><b>Horas de Beca</b></MDBModalHeader>
                <MDBModalBody>
                    <div>
                        <Field name="hours" component={renderTextField} label="Cantidad de horas" />
                        <p>¿Que habilidades posee? Debe colocar un número del 1 al 100.</p>
                        <Field name="public_speaking" component={renderTextField} label="¿Hablar en público?" />
                        <Field name="organization" component={renderTextField} label="¿Organización?" />
                        <Field name="photo_editing" component={renderTextField} label="¿Edición de fotos?" />
                        <Field name="video_editing" component={renderTextField} label="¿Edición de video?" />
                    </div>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="red" onClick={onHandle}>Cerrar</MDBBtn>
                    <MDBBtn color="green" onClick={handleSubmit(onSubmit)}>Confirmar</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    );
}

scholarship_hours = reduxForm({
    form: 'scholarshipForm',
    validate
})(scholarship_hours);

scholarship_hours = connect(
    state => ({
        open: getIsScholarOpen(state),
    }),
    dispatch => ({
        onSubmit({ hours, public_speaking, organization, photo_editing, video_editing}) {
            dispatch(actions.startAddingScholar(uuidv4(), hours, public_speaking, organization, photo_editing, video_editing));
            dispatch(reset('scholarshipForm'));
        },
        onHandle() {
            dispatch(reset('scholarshipForm'));
            dispatch(actionsModal.changeScholar(false));
        },
    })
)(scholarship_hours);

export default scholarship_hours;