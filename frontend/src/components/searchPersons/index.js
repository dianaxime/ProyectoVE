import React from 'react';
import { connect } from 'react-redux';
import {
    getAuthToken,
    getIsOpen
} from '../../reducers';
import TextField from '@material-ui/core/TextField';
import { reset, Field, reduxForm } from 'redux-form';
import * as actions from '../../actions/users';
import './styles.css';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Persons from '../Persons';

const validate = values => {
    const errors = {};
    const requiredFields = [ 'email'];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Obligatorio*';
        }
    })
    return errors;
}


const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField className="inputWorkshop" placeholder={label}
        label={label}
        helperText={touched && error}
        {...input}
        {...custom}
        margin="normal"
        fullWidth
    />
);

let SearchPersons = ({
    onSubmit,
    isLoading,
    handleSubmit, }) => {
    return (
        <div className="personasWorkshop">
            <div className="datosWorkshop">
                <div className="formP">
                    <h1 className="subP">Personas</h1>
                    <p className="subtituloT">(*aqui nombre del taller*)</p>
                    <div>
                        <div className="inputbuscar">
                            <Field name="email" component={renderTextField} label="Buscar..."></Field>
                        </div>
                        <IconButton edge="end" aria-label="agregar" onClick={handleSubmit(onSubmit)}>
                            <SearchIcon className="iconoBusc" />
                        </IconButton>
                    </div>
                    <div className="personas">
                        <Persons />
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

SearchPersons = reduxForm({
    form: 'searchPersonForm',
    validate
})(SearchPersons);

SearchPersons = connect(
    state => ({
        isLoading: false,
        isAuth: getAuthToken(state) !== null,
        open: getIsOpen(state),
    }),
    dispatch => ({
        onSubmit({ email }) {
            dispatch(
                actions.startFetchingUsersByEmail(email),
                dispatch(reset('searchPersonForm')),
            );
        },
    }),
)(SearchPersons);

export default SearchPersons;

