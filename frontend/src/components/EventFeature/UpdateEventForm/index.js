import React from 'react';
import { connect } from 'react-redux';
import {
    getAuthToken,
    getEvent,
    getSelectedEvent,
    getEventStatus,
} from '../../../reducers';
import TextField from '@material-ui/core/TextField';
import { reset, Field, reduxForm } from 'redux-form';
import * as actions from '../../../actions/events';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { URL } from '../../../settings';
import './styles.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validate = values => {
    const errors = {};
    const requiredFields = ['name', 'classroom', 'description', 'date'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Obligatorio*';
        }
    })
    return errors;
}

const renderDateTimePicker = ({ input: { onChange, value }, label, meta: { touched, error }, showTime }) => (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
    <TextField className="inputEvent" placeholder={label}
        label={label}
        helperText={touched && error}
        {...input}
        {...custom}
        margin="normal"
        fullWidth
    />
);

let UpdateEvent = ({
    onSubmit,
    isLoading,
    handleSubmit, }) => {
    return (
        <div className="datosEvent">
            <form className="formE">
                <h3 className="sube">Datos</h3>
                <div className="div-field">
                    <Field name="name" component={renderTextField} label="Nombre" />
                </div>
                <div className="div-field">
                    <Field name="description" component={renderTextField} label="Descripción" />
                </div>
                <div className="div-field">
                    <Field name="classroom" component={renderTextField} label="Salon" />
                </div>
                <div className="div-field">
                    <Field name="date" component={renderDateTimePicker} label="Fecha" />
                </div>
                <p>
                    {
                        isLoading ? (
                            <strong>{'Cargando...'}</strong>
                        ) : (
                                <button className="buttonformE" type="submit" onClick={handleSubmit(onSubmit)}>
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

UpdateEvent = reduxForm({
    form: 'updateEventForm',
    validate
})(UpdateEvent);

UpdateEvent = connect(
    state => ({
        isLoading: false,
        isAuth: getAuthToken(state) !== null,
        initialValues: getEvent(state, getSelectedEvent(state)),
        idEvent: getSelectedEvent(state),
        status: getEventStatus(state),
    }),
    dispatch => ({
        onSubmit({ name, classroom, description, date }, id) {
            dispatch(
                actions.startUpdatingEvent(
                    id,
                    name,
                    classroom,
                    description,
                    date,
                ),
                dispatch(reset('updateEventForm')),
            );
        },
        onChangeStatus() {
            dispatch(actions.changeEventStatus());
        },
    }),
    (stateProps, dispatchProps, ownProps) => {
        if (stateProps.status === 'ERROR') {
            toast.error("Un error inesperado ha ocurrido. Por favor inténtalo de nuevo");
            dispatchProps.onChangeStatus();
        }
        if (stateProps.status === 'SUCCESS') {
            dispatchProps.onChangeStatus();
            window.location.href = URL + 'eventos';
        }
        return ({
            ...stateProps,
            ...dispatchProps,
            ...ownProps,
            onSubmit({ name, classroom, description, date }) {
                dispatchProps.onSubmit({ name, classroom, description, date }, stateProps.idEvent);
            },
        });
    },
)(UpdateEvent);

export default UpdateEvent;