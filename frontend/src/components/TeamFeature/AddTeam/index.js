import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { connect } from 'react-redux';
import {
    getAuthToken
} from '../../../reducers';
import TextField from '@material-ui/core/TextField';
import { reset, Field, reduxForm } from 'redux-form';
import * as actions from '../../../actions/teams';
import './styles.css';
import DateFnsUtils from '@date-io/date-fns';
import MenuItem from '@material-ui/core/MenuItem';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';


const validate = values => {
    const errors = {};
    const requiredFields = ['name', 'startdate', 'enddate', 'sport'];
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
            className="inputWorkshop"
            disableToolbar
            variant="inline"
            format="yyyy/MM/dd"
            margin="normal"
            // id="date-picker-inline"
            label={label}
            onChange={onChange}
            time={showTime}
            value={!value ? new Date() : new Date(value)}
        />
    </MuiPickersUtilsProvider>
);

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

let AddTeam = ({
    onSubmit,
    isLoading,
    handleSubmit, }) => {
    return (
        <div className="datosWorkshop">
            <form className="formW">
                <h3 className="subw">Datos</h3>
                <div className="div-field">
                    <Field name="name" component={renderTextField} label="Nombre" />
                </div>
                <div>
                    <Field name="sport" component={renderSelectField} label="Deporte" className="div-field">
                        <MenuItem value="indoorfootball">Futsal masculino</MenuItem>
                        <MenuItem value="socceradmin">Futsal colaboradores</MenuItem>
                        <MenuItem value="womensfootball">Futsal femenino</MenuItem>
                        <MenuItem value="volleyball">Voleibol</MenuItem>
                        <MenuItem value="basketball">Baloncesto</MenuItem>  
                    </Field>
                </div>
                <div>
                    <Field name="startdate" component={renderDateTimePicker} label="Fecha de Inicio" className="div-field" />
                </div>
                <div>
                    <Field name="enddate" component={renderDateTimePicker} label="Fecha de Finalización" className="div-field" />
                </div>
                <p>
                    {
                        isLoading ? (
                            <strong>{'Cargando...'}</strong>
                        ) : (
                                <button className="buttonformW" type="submit" onClick={handleSubmit(onSubmit)}>
                                    {'Crear'}
                                </button>
                            )
                    }
                </p>
            </form>
        </div>
    );
}

AddTeam = reduxForm({
    form: 'teamForm',
    validate
})(AddTeam);

AddTeam = connect(
    state => ({
        isLoading: false,
        isAuth: getAuthToken(state) !== null,
    }),
    dispatch => ({
        onSubmit({ name, startdate, enddate, sport }) {
            dispatch(
                actions.startAddingTeam(
                    uuidv4(),
                    name,
                    sport,
                    startdate,
                    enddate
                ),
                dispatch(reset('teamForm')),
            );
        },
    }),
)(AddTeam);

export default AddTeam;