import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import {
    getSelectedAUser,
    getIsAssignOpen,
    getUserByEmailRolesRelation,
    getRoles
} from '../../../reducers';
import { connect } from 'react-redux';
import * as actionsModal from '../../../actions/modalAssign';
import Chip from '@material-ui/core/Chip';
import { Field, reduxForm, reset } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';


const description = {
    1: 'Administrador',
    2: 'Asistente',
    3: 'Auxiliar oficina',
    4: 'Miembro asociación',
    5: 'Miembro taller',
    6: 'Miembro equipo',
    7: 'Miembro club',
    8: 'Auxiliar eventos'
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => {
    return (
        <FormControl error={touched && error}>
            <InputLabel>{label}</InputLabel>
            <Select
                onChange={(value) => input.onChange(value)}
                {...input}
                {...custom}
                input={<Input />}
                renderValue={(selected) => (
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {selected.map((value) => (
                            <Chip key={value} variant="outlined" label={description[value]} />
                        ))}
                    </div>
                )}
                fullWidth
                MenuProps={MenuProps}
            >
                {children}
            </Select>
        </FormControl>
    );
};


let Assign = ({ open, onHandle, roles, handleSubmit, onAssign }) => {
    return (
        <MDBContainer>
            <MDBModal backdrop={false} isOpen={open} side position="bottom-right">
                <MDBModalHeader toggle={onHandle}><b>Asigna los roles al usuario</b></MDBModalHeader>
                <MDBModalBody>
                    <Field name="idrs" component={renderSelectField} label="Roles" multiple>
                        {roles.map((role) => (
                            <MenuItem key={role.id} value={role.id}>
                                {role.role}
                            </MenuItem>
                        ))}
                    </Field>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="red" onClick={onHandle}>Cerrar</MDBBtn>
                    <MDBBtn color="green" onClick={handleSubmit(onAssign)}>Asignar</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    );
};

Assign = reduxForm({
    form: 'AssignModal'
})(Assign);

Assign = connect(
    state => ({
        open: getIsAssignOpen(state),
        selected: getSelectedAUser(state),
        user: getUserByEmailRolesRelation(state, getSelectedAUser(state)),
        roles: getRoles(state),
        initialValues: {
            idrs: [],
        },
    }),
    dispatch => ({
        onHandle() {
            dispatch(actionsModal.changeAssign(false));
        },
        onAssign({ idrs }) {
            console.log(idrs);
        },
    }),
    (stateProps, dispatchProps, ownProps) => {
        return ({
            ...stateProps,
            ...dispatchProps,
            ...ownProps,
        });
    }
)(Assign);

export default Assign;