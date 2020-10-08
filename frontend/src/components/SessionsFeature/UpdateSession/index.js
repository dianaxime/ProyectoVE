import React from 'react';
import { connect } from 'react-redux';
import {
    getAuthToken,
    getSelectedAssociationClub,
    getSessionStatus,
    getSession,
    getSelectedSession
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

let UpdateSession = ({
    onSubmit,
    isLoading,
    handleSubmit, }) => {
    return (
        <div className="datosEvent">
            <form className="formE">
                <h3 className="sube">Datos</h3>
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

UpdateSession = reduxForm({
    form: 'sessionUpdateForm',
    validate
})(UpdateSession);

UpdateSession = connect(
    (state, { id }) => ({
        isLoading: false,
        isAuth: getAuthToken(state) !== null,
        idac: getSelectedAssociationClub(state) === id,
        idac1: getSelectedAssociationClub(state),
        status: getSessionStatus(state),
        initialValues: getSession(state, getSelectedSession(state)),
        idSession: getSelectedSession(state),
    }),
    dispatch => ({
        onSubmit(date, idac) {
            dispatch(
                actions.startUpdatingSession(
                    idac,
                    date
                ),
                dispatch(reset('sessionUpdateForm')),
            );
        },
        onChangeStatus() {
            dispatch(actions.changeSessionStatus());
        },
    }),
    (stateProps, dispatchProps, ownProps) => {
        if (stateProps.status === 'SUCCESS') {
            toast.success("La sesión se ha modificado exitosamente")
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
                dispatchProps.onSubmit(date, stateProps.idSession);
            }
        });
    },
)(UpdateSession);

export default UpdateSession;