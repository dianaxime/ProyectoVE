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
import { Field, reduxForm, reset, FieldArray } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


/*const renderAutoComplete = ({ input, label, options, meta: { touched, error }, ...custom }) => {
    console.log(input, custom)
    return (
        <Autocomplete
            multiple
            options={options}
            getOptionLabel={(option) => option.role}
            renderTags={(options, getTagProps) =>
                options.map((option, index) => (
                    <Chip variant="outlined" key={option.id} label={option.role} {...getTagProps({ index })} />
                ))
            }
            onChange={(event, newValue) => (newValue)}
            {...input}
            {...custom}
            renderInput={(params) => (
                <TextField {...params} variant="outlined" label={label} />
            )}
        />
    );
};*/

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

const renderSelectField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <Select placeholder={label}
        label={label}
        onChange={value => input.onChange(value)}
        {...input}
        {...custom}
        renderValue={(selected) => (
            <div style={{display:'flex', flexWrap:'wrap'}}>
            {selected.map((value) => (
                <Chip key={value} variant="outlined" label={description[value]} />
            ))}
            </div>
        )}
        fullWidth
    />
);


let Assign = ({ open, onHandle, roles, handleSubmit, onAssign }) => {
    return (
        <MDBContainer>
            <MDBModal isOpen={open} side position="bottom-right">
                <MDBModalHeader toggle={onHandle}><b>Asigna los roles al usuario</b></MDBModalHeader>
                <MDBModalBody>
                    {
                        /*<Field name="idrs" label="Roles" options={roles} component={renderAutoComplete}></Field>*/
                    }
                    <Field name="idrs" component={renderSelectField} label="Roles" className="input" multiple>
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
    })
)(Assign);

export default Assign;