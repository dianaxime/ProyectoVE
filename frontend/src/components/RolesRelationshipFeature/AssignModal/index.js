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
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import { Field, reduxForm, reset } from 'redux-form';


const renderAutoComplete = ({ input, label, options, meta: { touched, error }, ...custom }) => {
    return (
        <Autocomplete
            multiple
            options={options}
            getOptionLabel={(option) => option.role}
            onChange={(event, newValue) => newValue}
            //{...input}
            //{...custom}
            renderTags={(options, getTagProps) =>
                options.map((option, index) => (
                    <Chip variant="outlined" key={option.id} label={option.role} {...getTagProps({ index })} />
                ))
            }
            renderInput={(params) => (
                <TextField {...params} variant="outlined" label={label} />
            )}
        />
    );
};


let Assign = ({ open, onHandle, user, roles }) => {
    return (
        <MDBContainer>
            <MDBModal isOpen={open} side position="bottom-right">
                <MDBModalHeader toggle={onHandle}><b>Asigna los roles al usuario</b></MDBModalHeader>
                <MDBModalBody>
                    <Field name="idrs" label="Roles" options={roles} component={renderAutoComplete}></Field>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="red" onClick={onHandle}>Cerrar</MDBBtn>
                    <MDBBtn color="green">Asignar</MDBBtn>
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
        /*onAssign({idrs}) {
            console.log(idrs);
        },*/
    })
)(Assign);

export default Assign;