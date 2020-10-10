import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { connect } from 'react-redux';
import {
    getAuthToken,
} from '../../../reducers';
import { reset, Field, reduxForm } from 'redux-form';
import * as actions from '../../../actions/statistics';
import './styles.css';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import gtLocale from 'date-fns/locale/es';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import moment from 'moment';

const validate = values => {
    const errors = {};
    const requiredFields = ['startdate', 'enddate', 'sport'];
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
            className="inputAssociationTeams"
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

let SearchTeamsSportStatistics = ({
    onSubmit,
    isLoading,
    handleSubmit, }) => {
    return (
        <div className="datosStatic">
            <form className="formStatistic">
                <div className="div-inputs">
                    <Field name="startdate" component={renderDateTimePicker} label="Inicio" />
                    <p className="space">es solo espacio</p>
                    <Field name="enddate" component={renderDateTimePicker} label="Fin" />
                </div>
                <div className="div-sport">
                    <Field name="sport" component={renderSelectField} label="Deporte">
                        <MenuItem value="indoorfootball">Futsal masculino</MenuItem>
                        <MenuItem value="socceradmin">Futsal colaboradores</MenuItem>
                        <MenuItem value="womensfootball">Futsal femenino</MenuItem>
                        <MenuItem value="volleyball">Voleibol</MenuItem>
                        <MenuItem value="basketball">Baloncesto</MenuItem>
                    </Field>
                </div>
                <p>
                    {
                        isLoading ? (
                            <strong>{'Cargando...'}</strong>
                        ) : (
                                <button className="buttonformST" type="submit" onClick={handleSubmit(onSubmit)}>
                                    <SearchIcon />
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

SearchTeamsSportStatistics = reduxForm({
    form: 'teamsStatisticsFormSport',
    validate
})(SearchTeamsSportStatistics);

SearchTeamsSportStatistics = connect(
    state => ({
        isLoading: false,
        isAuth: getAuthToken(state) !== null,
    }),
    dispatch => ({
        onSubmit({ startdate, enddate, sport }) {
            dispatch(
                actions.startFetchingGendertSport(moment(startdate).format('YYYY-MM-DD'), moment(enddate).format('YYYY-MM-DD'), sport)
            );
            dispatch(
                actions.startFetchingPlayersSport(moment(startdate).format('YYYY-MM-DD'), moment(enddate).format('YYYY-MM-DD'), sport)
            );
            dispatch(
                actions.startFetchingTeamstSport(moment(startdate).format('YYYY-MM-DD'), moment(enddate).format('YYYY-MM-DD'), sport)
            );
            dispatch(reset('teamsStatisticsFormSport'));
        },
        /*onChangeStatus() {
            dispatch(actions.changeSessionStatus());
        },*/
    }),
    (stateProps, dispatchProps, ownProps) => {
        /*if (stateProps.status === 'SUCCESS') {
            toast.success("La sesión se ha agregado exitosamente")
            dispatchProps.onChangeStatus();
        }
        if (stateProps.status === 'ERROR') {
            toast.error("Un error inesperado ha ocurrido. Por favor inténtalo de nuevo")
            dispatchProps.onChangeStatus();
        }*/
        return ({
            ...stateProps,
            ...dispatchProps,
            ...ownProps,
        });
    },
)(SearchTeamsSportStatistics);

export default SearchTeamsSportStatistics;