import React from 'react';
import { connect } from 'react-redux';
import {
    getAuthToken,
    getIsOpen,
    getAssistance,
    getSelectedAssistances,
} from '../../../reducers';
import InputBase from '@material-ui/core/InputBase';
import { reset, Field, reduxForm } from 'redux-form';
import * as actions from '../../../actions/assistances';
import './styles.css';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Persons from '../Persons';
import { getAssistance } from '../../../reducers/assistances';

const validate = values => {
    const errors = {};
    const requiredFields = ['email'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Obligatorio*';
        }
    })
    return errors;
}


const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <InputBase className="inputWorkshop" placeholder={label}
        label={label}
        {...input}
        {...custom}
        fullWidth
    />
);



let SearchPersons = ({
    onSubmit,
    isLoading,
    handleSubmit,
    selectAC,
    assistances,
}) => {
    return (
        <div className="personasWorkshop">
            <div className="formP">
                <h1 className="subP">Personas</h1>
                {
                    selectAC ? (

                        <p className="subtituloT">{((Object.entries(assistances)[1])[1])}</p>
                    ) :
                        (
                            <p className="subtituloT">*Seleccione su asistencia*</p>
                        )
                }
                <div className="barrabus">
                    <Field name="email" component={renderTextField} label="Buscar..." className="inputBuscar"></Field>
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
        selectAC: getSelectedAssistances(state) !== null,
        assistances: getAssistance(state, getSelectedAssistances(state)),
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

