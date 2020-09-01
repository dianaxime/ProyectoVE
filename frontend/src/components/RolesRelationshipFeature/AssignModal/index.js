import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import {
    getSelectedAUser,
    getIsAssignOpen,
} from '../../../reducers';
import { connect } from 'react-redux';
import * as actionsModal from '../../../actions/modalAssign';
import TextField from '@material-ui/core/TextField';
import { Field, reduxForm, reset, FieldArray } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';

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

const renderMembers = ({ fields, meta: { error, submitFailed } }) => (
    <ul>
        <li>
            <button type="button" onClick={() => fields.push({})}>
                Añadir Rol
        </button>
        </li>
        {fields.map((member, index) => (
            <li key={index}>
                <button
                    type="button"
                    title="Remove Member"
                    onClick={() => fields.remove(index)}
                />
                <Field
                    name={`${member}.value`}
                    component={renderSelectField}>
                    <MenuItem value="1">Administrador</MenuItem>
                    <MenuItem value="2">Asistente</MenuItem>
                    <MenuItem value="3">Auxiliar oficina</MenuItem>
                    <MenuItem value="4">Miembro asociación</MenuItem>
                    <MenuItem value="5">Miembro taller</MenuItem>
                    <MenuItem value="6">Miembro equipo</MenuItem>
                    <MenuItem value="7">Miembro club</MenuItem>
                    <MenuItem value="8">Auxiliar eventos</MenuItem>
                </Field>
            </li>
        ))}
    </ul>
)


let Assign = ({ open, onHandle }) => {
    return (
        <MDBContainer>
            <MDBModal isOpen={open} side position="bottom-right">
                <MDBModalHeader toggle={onHandle}><b>Permisos del:</b></MDBModalHeader>
                <MDBModalBody>
                    <FieldArray name="idrs" component={renderMembers} />
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="red" onClick={onHandle}>Cerrar</MDBBtn>
                    <MDBBtn color="green" >Asignar</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    );
}

Assign = reduxForm({
    form: 'AssignModal'
})(Assign);

Assign = connect(
    state => ({
        open: getIsAssignOpen(state),
        selected: getSelectedAUser(state),
    }),
    dispatch => ({
        onHandle() {
            dispatch(actionsModal.changeAssign(false));
        },
    })
)(Assign);

export default Assign;