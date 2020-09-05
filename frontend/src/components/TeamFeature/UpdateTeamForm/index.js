import React from 'react';
import { connect } from 'react-redux';
import {
    getAuthToken,
    getIsOpen,
    getTeam,
    getSelectedTeam,
} from '../../../reducers';
import TextField from '@material-ui/core/TextField';
import { reset, Field, reduxForm } from 'redux-form';
import * as actions from '../../../actions/teams';
import DateFnsUtils from '@date-io/date-fns';
import MenuItem from '@material-ui/core/MenuItem';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { URL } from '../../../settings';
import './styles.css';

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
            autoOk
            className="inputWorkshop"
            disableToolbar
            variant="inline"
            format="yyyy/MM/dd"
            margin="normal"
            //id="date-picker-inline"
            label={label}
            onChange={onChange}
            time={showTime}
            value={!value ? new Date() : new Date(value)}
            fullWidth
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
        select
        fullWidth
    />
);

let UpdateTeam = ({ open,
    onSubmit,
    isLoading,
    handleSubmit, }) => {
    return (
        <div className="datosWorkshop">
            <form className="formW">
                <h3 className="subw">Datos</h3>
                <div className="div-field">
                    <Field name="name" component={renderTextField} label="Nombre"/>
                </div>
                <div className="div-field">
                    <Field name="sport" component={renderSelectField} label="Deporte">
                        <MenuItem value="indoorfootball">Futsal masculino</MenuItem>
                        <MenuItem value="socceradmin">Futsal colaboradores</MenuItem>
                        <MenuItem value="womensfootball">Futsal femenino</MenuItem>
                        <MenuItem value="volleyball">Voleibol</MenuItem>
                        <MenuItem value="basketball">Baloncesto</MenuItem>
                    </Field>
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
                                <button className="buttonformW" type="submit" onClick={handleSubmit(onSubmit)}>
                                    {'Actualizar'}
                                </button>
                            )
                    }
                </p>
            </form>
        </div>
    );
}

UpdateTeam = reduxForm({
    form: 'updateTeamForm',
    validate
})(UpdateTeam);

UpdateTeam = connect(
    state => ({
        isLoading: false,
        isAuth: getAuthToken(state) !== null,
        open: getIsOpen(state),
        team: getTeam(state, getSelectedTeam(state)),
        idTeam: getSelectedTeam(state),
    }),
    dispatch => ({
        onSubmit({ name, startdate, enddate, sport }, id) {
            dispatch(
                actions.startUpdatingTeam(
                    id,
                    name,
                    sport,
                    startdate,
                    enddate
                ),
                console.log("Equipo actualizado!"),
                dispatch(reset('updateTeamForm')),
            );
            window.location.href = URL + 'equipos';
        },
    }),
    (stateProps, dispatchProps, ownProps) => {
        let sport = '';
        if (stateProps.team.sport === 'Futsal masculino') {
            sport = 'indoorfootball'
        }
        if (stateProps.team.sport === 'Futsal femenino') {
            sport = 'womensfootball'
        }
        if (stateProps.team.sport === 'Futsal colaboradores') {
            sport = 'socceradmin'
        }
        if (stateProps.team.sport === 'Voleibol') {
            sport = 'volleyball'
        }
        if (stateProps.team.sport === 'Baloncesto') {
            sport = 'basketball'
        }
        return ({
            ...stateProps,
            ...dispatchProps,
            ...ownProps,
            initialValues: {...stateProps.team, sport},
            onSubmit({ name, startdate, enddate, sport }) {
                dispatchProps.onSubmit({ name, startdate, enddate, sport }, stateProps.idTeam);
            },
        })
    }
)(UpdateTeam);

export default UpdateTeam;