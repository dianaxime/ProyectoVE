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
import SearchIcon from '@material-ui/icons/Search';
import moment from 'moment';

const validate = values => {
    const errors = {};
    const requiredFields = ['startdate', 'enddate'];
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

let SearchEventsStatistics = ({
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

SearchEventsStatistics = reduxForm({
    form: 'eventsStatisticsForm',
    validate
})(SearchEventsStatistics);

SearchEventsStatistics = connect(
    state => ({
        isLoading: false,
        isAuth: getAuthToken(state) !== null,
    }),
    dispatch => ({
        onSubmit({ startdate, enddate }) {
            /*dispatch(
                actions.startFetchingPlayers(moment(startdate).format('YYYY-MM-DD'), moment(enddate).format('YYYY-MM-DD'))
            );
            dispatch(
                actions.startFetchingEvents(moment(startdate).format('YYYY-MM-DD'), moment(enddate).format('YYYY-MM-DD'))
            );
            dispatch(
                actions.startFetchingGendert(moment(startdate).format('YYYY-MM-DD'), moment(enddate).format('YYYY-MM-DD'))
            );
            dispatch(reset('eventsStatisticsForm'));*/
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
)(SearchEventsStatistics);

export default SearchEventsStatistics;