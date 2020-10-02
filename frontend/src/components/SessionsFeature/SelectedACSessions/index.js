import React from 'react';
import { connect } from 'react-redux';
import { MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon, MDBCardText } from
    'mdbreact';
import {
    getAuthToken,
    getAssociationClub,
    getSelectedAssociationClub
} from '../../../reducers';
import './styles.css';
import moment from 'moment';
import { Link } from "react-router-dom";
import { reset, Field, reduxForm } from 'redux-form';
/*import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';*/
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";

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

const MONTHS = [
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
];

const WEEKDAYS_LONG = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
];

const WEEKDAYS_SHORT = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];

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
  

const renderDateTimePicker = ({ input: { onChange, value }, label, meta: { touched, error }, showTime }) => {
    /*const modifiers = {
        disabled: { daysOfWeek: [6] },
        birthday: new Date(2020, 10, 23),
        monday: { daysOfWeek: [1] },
    };*/
    return (
        /*<>
            <style>{`
          .DayPicker-Day--birthday {
            background-color: #00bcd4;
            color: white;
          }
          .DayPicker-Day--monday {
            color: #00bcd4;
          }
          `}</style>
            <DayPicker
                months={MONTHS}
                weekdaysLong={WEEKDAYS_LONG}
                weekdaysShort={WEEKDAYS_SHORT}
                onDayClick={onChange}
                selectedDays={!value ? new Date() : new Date(value)}
                modifiers={modifiers}
            />
        </>*/
        <Calendar
            value={value}
            onChange={onChange}
            locale={myCustomLocale}
            /*
            shouldHighlightWeekends
            customDaysClassName={[
                // here we add some CSS classes
                { year: 2019, month: 3, day: 4, className: 'purpleDay' },
                { year: 2019, month: 3, day: 12, className: 'orangeDay' },
                { year: 2019, month: 3, day: 18, className: 'yellowDay' },
                { year: 2019, month: 3, day: 26, className: 'navyBlueDay' },
            ]}
            */
        />
    );
}

let SelectedACSession = ({
    name,
}) => {
    return (
        <div className="dataAC">
            <MDBCard wide style={{ width: "22rem", maxHeight: "31rem" }}>
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
                        <button className="kc_fab_main_btn1">
                            <MDBIcon icon="pen" />
                        </button>
                    </MDBCol>
                    <MDBCol md='2'>
                        <button className="kc_fab_main_btn1">
                            <MDBIcon icon="search" />
                        </button>
                    </MDBCol>
                </MDBRow>
                <MDBCardBody cascade className='text-center'>
                    <Field name="date" component={renderDateTimePicker} label="Fecha" />
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

SelectedACSession = reduxForm({
    form: 'sessionForm',
    validate
})(SelectedACSession);

SelectedACSession = connect(
    state => ({
        isLoading: false,
        isAuth: getAuthToken(state) !== null,
        name: getAssociationClub(state, getSelectedAssociationClub(state)).name,
        description: getAssociationClub(state, getSelectedAssociationClub(state)).description,
        startdate: getAssociationClub(state, getSelectedAssociationClub(state)).startdate,
        enddate: getAssociationClub(state, getSelectedAssociationClub(state)).enddate,
        type: getAssociationClub(state, getSelectedAssociationClub(state)).type,
    }),
)(SelectedACSession);

export default SelectedACSession;