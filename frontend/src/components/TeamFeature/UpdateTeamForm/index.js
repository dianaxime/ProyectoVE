import React from 'react';
import { connect } from 'react-redux';
import {
    getAuthToken,
    getIsOpen,
    getTeam,
    getSelectedTeam,
    getTeamStatus,
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import gtLocale from 'date-fns/locale/es';

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

const renderDateTimePicker = ({ input: { onChange, value }, label, meta: { touched, error }, showTime }) => (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={gtLocale}>
        <KeyboardDatePicker
            autoOk
            className="inputAssociationClub"
            disableToolbar
            variant="inline"
            format="yyyy/MM/dd"
            margin="normal"
            label={label}
            helperText={touched && error}
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
                <ToastContainer position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover />
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
        status: getTeamStatus(state),
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
        },
        onChangeStatus() {
            dispatch(actions.changeTeamStatus());
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
        if (stateProps.status === 'ERROR') {
            toast.error("Un error inesperado ha ocurrido. Por favor inténtalo de nuevo");
            dispatchProps.onChangeStatus();
        }
        if (stateProps.status === 'SUCCESS') {
            dispatchProps.onChangeStatus();
            window.location.href = URL + 'equipos';
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