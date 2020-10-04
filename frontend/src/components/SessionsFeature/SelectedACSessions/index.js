import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon } from
    'mdbreact';
import {
    getAuthToken,
    getAssociationClub,
    getSelectedAssociationClub,
    getSessionFormat,
} from '../../../reducers';
import './styles.css';
import moment from 'moment';
import { Link, Redirect } from "react-router-dom";
import { reset, Field, reduxForm } from 'redux-form';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import * as sessionActions from '../../../actions/sessions';
import * as actions from '../../../actions/assistances';
import * as selectSessions from '../../../actions/selectedSession';

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

const myCustomLocale = {
    // months list by order
    months: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
    ],

    // week days by order
    weekDays: [
        {
            name: 'Domingo', // used for accessibility 
            short: 'Do', // displayed at the top of days' rows
            isWeekend: true, // is it a formal weekend or not?
        },
        {
            name: 'Lunes',
            short: 'Lu',
        },
        {
            name: 'Martes',
            short: 'Ma',
        },
        {
            name: 'Miércoles',
            short: 'Mi',
        },
        {
            name: 'Jueves',
            short: 'Ju',
        },
        {
            name: 'Viernes',
            short: 'Vi',
        },
        {
            name: 'Sábado',
            short: 'Sa',
            isWeekend: true,
        },
    ],

    // just play around with this number between 0 and 6
    weekStartingIndex: 0,

    // return a { year: number, month: number, day: number } object
    getToday(gregorainTodayObject) {
        return gregorainTodayObject;
    },

    // return a native JavaScript date here
    toNativeDate(date) {
        return new Date(date.year, date.month - 1, date.day);
    },

    // return a number for date's month length
    getMonthLength(date) {
        return new Date(date.year, date.month, 0).getDate();
    },

    // return a transformed digit to your locale
    transformDigit(digit) {
        return digit;
    },

    // texts in the date picker
    nextMonth: 'Mes siguiente',
    previousMonth: 'Mes previo',
    openMonthSelector: 'Seleccionar mes',
    openYearSelector: 'Seleccionar año',
    closeMonthSelector: 'Cerrar',
    closeYearSelector: 'Cerrar',
    defaultPlaceholder: 'Seleccionar...',

    // for input range value
    from: 'Desde',
    to: 'hasta',


    // used for input value when multi dates are selected
    digitSeparator: ',',

    // if your provide -2 for example, year will be 2 digited
    yearLetterSkip: 0,

    // is your language rtl or ltr?
    isRtl: false,
}


const renderDateTimePicker = ({ input: { onChange, value }, label, meta, ...custom }) => {
    return (
        <Calendar
            value={value}
            onChange={onChange}
            locale={myCustomLocale}
            {...custom}
        />
    );
}

let SelectedACSession = ({
    name, onLoad, format, onSearch, handleSubmit, onEdit
}) => {
    useEffect(onLoad, []);
    return (
        <div className="dataAC">
            <MDBCard wide style={{ width: "24rem", maxHeight: "32rem" }}>
                <MDBCardImage
                    className='view view-cascade gradient-card-header heavy-rain-gradient'
                    cascade
                    tag='div'
                >
                    <h2 className='h2-responsive mb-2' style={{ padding: '1rem' }}>{name}</h2>
                </MDBCardImage>
                <MDBRow start>
                    <MDBCol md='2'>
                        <Link to="/sessions">
                            <button className="kc_fab_main_btn">
                                <MDBIcon icon='chevron-left' />
                            </button>
                        </Link>
                    </MDBCol>
                    <MDBCol md='2'>
                            <button className="kc_fab_main_btn1" onClick={handleSubmit(onEdit)}>
                        <Link to="/editarsession" style={{color: 'white'}}>
                                <MDBIcon icon="pen" />
                        </Link>
                            </button>
                    </MDBCol>
                    <MDBCol md='2'>
                        <button className="kc_fab_main_btn1" onClick={handleSubmit(onSearch)}>
                            <MDBIcon icon="search" />
                        </button>
                    </MDBCol>
                </MDBRow>
                <MDBCardBody cascade className='text-center'>
                    {
                        format !== null && (
                            <Field name="date" component={renderDateTimePicker} label="Fecha" customDaysClassName={format} />
                        )
                    }
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

SelectedACSession = reduxForm({
    form: 'assistanceForm',
    validate
})(SelectedACSession);

SelectedACSession = connect(
    state => ({
        isLoading: false,
        isAuth: getAuthToken(state) !== null,
        name: getAssociationClub(state, getSelectedAssociationClub(state)).name,
        idac: getSelectedAssociationClub(state),
        format: getSessionFormat(state),
    }),
    dispatch => ({
        onLoad(idac) {
            dispatch(sessionActions.startFetchingSessionsFormat(idac));
        },
        onSearch(date, idac) {
            const newDate = moment({ year: date.year, month: date.month - 1, day: date.day }).format('YYYY-MM-DD');
            dispatch(actions.startFetchingAssistances(newDate, idac));
            dispatch(selectSessions.selectedSession(newDate));
            dispatch(reset('assistanceForm'));
        },
        onEdit(date, idac) {
            dispatch(selectSessions.selectedSession(null));
            const newDate = moment({ year: date.year, month: date.month - 1, day: date.day }).format('YYYY-MM-DD');
            dispatch(sessionActions.startFetchingSessions(idac, newDate));
            dispatch(reset('assistanceForm'));
            dispatch(<Redirect to='/' />);
            //console.log("por que???")
        }
    }),
    (stateProps, dispatchProps, ownProps) => ({
        ...ownProps,
        ...stateProps,
        ...dispatchProps,
        onLoad() {
            dispatchProps.onLoad(stateProps.idac);
        },
        onSearch({ date }) {
            dispatchProps.onSearch(date, stateProps.idac);
        },
        onEdit({ date }) {
            dispatchProps.onEdit(date, stateProps.idac);
        },
    })
)(SelectedACSession);

export default SelectedACSession;