import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { connect } from 'react-redux';
import {
    getAuthToken,
    getEventStatus,
} from '../../../reducers';
import TextField from '@material-ui/core/TextField';
import { reset, Field, reduxForm } from 'redux-form';
import * as actions from '../../../actions/events';
import './styles.css';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
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

const renderDateTimePicker = ({ input: { onChange, value }, label, showTime }) => (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
            autoOk
            className="inputEvent"
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
    <TextField className="inputEvent" placeholder={label}
        label={label}
        helperText={touched && error}
        {...input}
        {...custom}
        margin="dense"
        fullWidth
    />
);

let AddEvent = ({
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
                                    {'Crear'}
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

AddEvent = reduxForm({
    form: 'eventForm',
    validate
})(AddEvent);

AddEvent = connect(
    state => ({
        isLoading: false,
        isAuth: getAuthToken(state) !== null,
        status: getEventStatus(state),
    }),
    dispatch => ({
        onSubmit({ name, classroom, description, date }) {
            dispatch(
                actions.startAddingEvent(
                    uuidv4(),
                    name,
                    classroom,
                    description,
                    date
                ),
                dispatch(reset('eventForm')),
            );
        },
        onChangeStatus() {
            dispatch(actions.changeEventStatus());
        }
    }),
    (stateProps, dispatchProps, ownProps) => {
        if (stateProps.status === 'SUCCESS') {
            toast.success("El evento se ha agregado exitosamente")
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
        });
    },
)(AddEvent);

export default AddEvent;