import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { connect } from 'react-redux';
import {
    getAuthToken,
    getTeamStatus,
} from '../../../reducers';
import { reset, Field, reduxForm } from 'redux-form';
import * as actions from '../../../actions/sessions';
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

const validate = values => {
    const errors = {};
    const requiredFields = ['date'];
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
                    <Field name="startdate" component={renderDateTimePicker} label="Inicio"/>
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
                                    <SearchIcon/>
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
    form: 'teamsStatisticsForm',
    validate
})(SearchTeamsSportStatistics);

SearchTeamsSportStatistics = connect(
    (state, { id }) => ({
        isLoading: false,
        isAuth: getAuthToken(state) !== null,
        status: getTeamStatus(state),
    }),
    dispatch => ({
        onSubmit(date, idac) {
            dispatch(
                actions.startAddingSession(
                    uuidv4(),
                    idac,
                    date
                ),
                dispatch(reset('sessionForm')),
            );
        },
        onChangeStatus() {
            dispatch(actions.changeSessionStatus());
        },
    }),
    (stateProps, dispatchProps, ownProps) => {
        if (stateProps.status === 'SUCCESS') {
            toast.success("La sesión se ha agregado exitosamente")
            dispatchProps.onChangeStatus();
        }
        if (stateProps.status === 'ERROR') {
            toast.error("Un error inesperado ha ocurrido. Por favor inténtalo de nuevo")
            dispatchProps.onChangeStatus();
        }
        return ({
            ...stateProps,
            ...dispatchProps,
            ...ownProps,
            onSubmit({date}){
                console.log(date, stateProps.idac1)
                dispatchProps.onSubmit(date, stateProps.idac1);
            }
        });
    },
)(SearchTeamsSportStatistics);

export default SearchTeamsSportStatistics;