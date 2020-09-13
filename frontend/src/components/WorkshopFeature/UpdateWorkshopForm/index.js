import React from 'react';
import { connect } from 'react-redux';
import {
    getAuthToken,
    getWorkshop,
    getSelectedWorkshop,
    getWorkshopStatus,
} from '../../../reducers';
import TextField from '@material-ui/core/TextField';
import { reset, Field, reduxForm } from 'redux-form';
import * as actions from '../../../actions/workshops';
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
    const requiredFields = ['name', 'startdate', 'enddate', 'classroom', 'description'];
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

let UpdateWorkshop = ({
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
                <div className="div-field">
                    <Field name="description" component={renderTextField} label="Descripción" />
                </div>
                <div className="div-field">
                    <Field name="classroom" component={renderTextField} label="Salon" />
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

UpdateWorkshop = reduxForm({
    form: 'updateWorkshopForm',
    validate
})(UpdateWorkshop);

UpdateWorkshop = connect(
    state => ({
        isLoading: false,
        isAuth: getAuthToken(state) !== null,
        initialValues: getWorkshop(state, getSelectedWorkshop(state)),
        idWorkshop: getSelectedWorkshop(state),
        status: getWorkshopStatus(state),
    }),
    dispatch => ({
        onSubmit({ name, startdate, enddate, classroom, description }, id) {
            dispatch(
                actions.startUpdatingWorkshop(
                    id,
                    name,
                    classroom,
                    description,
                    startdate,
                    enddate
                ),
                console.log("Taller actualizado!"),
                dispatch(reset('updateWorkshopForm')),
            );
        },
        onChangeStatus() {
            dispatch(actions.changeWorkshopStatus());
        },
    }),
    (stateProps, dispatchProps, ownProps) => {
        if (stateProps.status === 'ERROR') {
            toast.error("Un error inesperado ha ocurrido. Por favor inténtalo de nuevo");
            dispatchProps.onChangeStatus();
        }
        if (stateProps.status === 'SUCCESS') {
            dispatchProps.onChangeStatus();
            window.location.href = URL + 'talleres';
        }
        return ({
            ...stateProps,
            ...dispatchProps,
            ...ownProps,
            onSubmit({ name, startdate, enddate, classroom, description }) {
                dispatchProps.onSubmit({ name, startdate, enddate, classroom, description }, stateProps.idWorkshop);
            },
        });
    },
)(UpdateWorkshop);

export default UpdateWorkshop;