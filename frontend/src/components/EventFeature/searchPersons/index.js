import React from 'react';
import { connect } from 'react-redux';
import {
    getAuthToken,
    getIsOpen,
    getEvent,
    getSelectedEvent,
} from '../../../reducers';
import InputBase from '@material-ui/core/InputBase';
import { reset, Field, reduxForm } from 'redux-form';
import * as actions from '../../../actions/eventParticipation';
import './styles.css';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Persons from '../Persons';

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
    selectEvent,
    event,
}) => {
    return (
        <div className="personasWorkshop">
            <div className="formP">
                <h1 className="subP">Personas</h1>
                {
                    selectEvent ? (

                        <p className="subtituloT">{((Object.entries(event)[1])[1])}</p>
                    ) :
                        (
                            <p className="subtituloT">*Seleccione un evento*</p>
                        )
                }
                <div className="barrabus">
                    <Field name="email" component={renderTextField} label="Buscar..." className="inputBuscar"></Field>
                    <IconButton edge="end" aria-label="agregar" onClick={handleSubmit(onSubmit)}>
                        <SearchIcon className="iconoBusc" />
                    </IconButton>
                </div>
                <div>
                    <Persons />
                </div>
                <hr></hr>
            </div>
        </div>
    );
}

SearchPersons = reduxForm({
    form: 'searchPersonEventForm',
    validate
})(SearchPersons);

SearchPersons = connect(
    state => ({
        isLoading: false,
        isAuth: getAuthToken(state) !== null,
        open: getIsOpen(state),
        selectEvent: getSelectedEvent(state) !== null,
        event: getEvent(state, getSelectedEvent(state)),
    }),
    dispatch => ({
        onSubmit({ email }) {
            dispatch(
                actions.startFetchingUsersByEmail(email),
                dispatch(reset('searchPersonEventForm')),
            );
        },
    }),
)(SearchPersons);

export default SearchPersons;

