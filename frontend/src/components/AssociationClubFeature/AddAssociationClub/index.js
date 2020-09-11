import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { connect } from 'react-redux';
import {
    getAuthToken
} from '../../../reducers';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { reset, Field, reduxForm } from 'redux-form';
import * as actions from '../../../actions/associationClub';
import './styles.css';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';


const validate = values => {
    const errors = {};
    const requiredFields = ['name',  'type', 'description', 'startdate', 'enddate',];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Obligatorio*';
        }
    })
    return errors;
}

const renderDateTimePicker = ({ input: { onChange, value }, label, showTime }) => (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
            autoOk
            className="inputAssociationClub"
            disableToolbar
            variant="inline"
            format="yyyy/MM/dd"
            margin="normal"
            label={label}
            onChange={onChange}
            time={showTime}
            value={!value ? new Date() : new Date(value)}
            fullWidth
        />
    </MuiPickersUtilsProvider>
);

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField className="inputAssociationClub" placeholder={label}
        label={label}
        helperText={touched && error}
        {...input}
        {...custom}
        margin="dense"
        fullWidth
    />
);

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



let AddAssociationClub = ({
    onSubmit,
    isLoading,
    handleSubmit, }) => {
    return (
        <div className="datosAssociationClub">
            <form className="formAC">
                <h3 className="subAC">Datos</h3>
                <div className="div-field">
                    <Field name="name" component={renderTextField} label="Nombre" />
                </div>
                <div className="div-field">
                    <Field name="type" component={renderSelectField} label="Tipó" className="radio_">
                        <MenuItem value="Association">Asociacion</MenuItem>
                        <MenuItem value="Club">Club</MenuItem>
                    </Field>
                </div>
                <div className="div-field">
                    <Field name="description" component={renderTextField} label="Descripción" />
                </div>
                <div className="div-field">
                    <Field name="startdate" component={renderDateTimePicker} label="Fecha de Inicio" />
                </div>
                <div className="div-field">
                    <Field name="enddate" component={renderDateTimePicker} label="Fecha de Finalización" />
                </div>
                <p>
                    {
                        isLoading ? (
                            <strong>{'Cargando...'}</strong>
                        ) : (
                                <button className="buttonformAC" type="submit" onClick={handleSubmit(onSubmit)}>
                                    {'Crear'}
                                </button>
                            )
                    }
                </p>
            </form>
        </div>
    );
}

AddAssociationClub = reduxForm({
    form: 'associationClubForm',
    validate
})(AddAssociationClub);

AddAssociationClub = connect(
    state => ({
        isLoading: false,
        isAuth: getAuthToken(state) !== null,
    }),
    dispatch => ({
        onSubmit({ name, type, description, startdate, enddate, }) {
            dispatch(
                actions.startAddingAssociationClub(
                    uuidv4(),
                    name,
                    type,
                    description,
                    startdate,
                    enddate
                ),
                dispatch(reset('associationClubForm')),
            );
        },
    }),
)(AddAssociationClub);

export default AddAssociationClub;