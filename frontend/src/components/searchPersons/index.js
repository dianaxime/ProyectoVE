import React from 'react';
import { connect } from 'react-redux';
import {
    getAuthToken,
    getIsOpen,
    getWorkshop,
    getSelectedWorkshop,
} from '../../reducers';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import { reset, Field, reduxForm } from 'redux-form';
import * as actions from '../../actions/users';
import './styles.css';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Persons from '../Persons';
import { red } from '@material-ui/core/colors';

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
    <InputBase className="inputWorkshop" placeholder={label}
        label={label}
        helperText={touched && error}
        {...input}
        {...custom}
        margin="normal"
        fullWidth
    />
);

const useStyles = makeStyles(theme => ({
    textField: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(1),
    },
    dense: {
        marginTop: 19,
    },
  }));

let SearchPersons = ({
    onSubmit,
    isLoading,
    handleSubmit,
    selectWorkshop,
    workshop,
 }) => {
    const classes = useStyles();
    return (
        <div className="personasWorkshop">
            <div className="formP">
                <h1 className="subP">Personas</h1>
                {
                    selectWorkshop ? (

                        <p className="subtituloT">{((Object.entries(workshop)[1])[1])}</p>
                    ) :
                    (
                        <p className="subtituloT">*Seleccione un taller*</p>
                    )
                }
                <div className="barrabus">
                    <Field name="email" component={renderTextField} label="Buscar..." className="inputBuscar" color="white"></Field>
                    <IconButton edge="end" aria-label="agregar" onClick={handleSubmit(onSubmit)}>
                        <SearchIcon className="iconoBusc" />
                    </IconButton>
                </div>
                <div className="personas">
                    <Persons />
                </div>
                <hr></hr>
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
        selectWorkshop: getSelectedWorkshop(state) !== null,
        workshop: getWorkshop(state, getSelectedWorkshop(state)),
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

