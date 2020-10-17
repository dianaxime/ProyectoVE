import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { connect } from 'react-redux';
import {
    getAuthToken,
    getAssociationClubStatus,
} from '../../../reducers';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { reset, Field, reduxForm } from 'redux-form';
import * as actions from '../../../actions/associationClub';
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
    const requiredFields = ['name',  'type', 'description', 'startdate', 'enddate',];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Obligatorio*';
        }
    })
    return errors;
}

const renderDateTimePicker = ({ input: { onChange, value }, label, meta: { touched, error },showTime }) => (
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
    <TextField className="inputAssociationClub" placeholder={label}
        label={label}
        helperText={touched && error}
        {...input}
        {...custom}
        margin="dense"
        fullWidth
    />
);

const renderSelectField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField placeholder={label}
        label={label}
        helperText={touched && error}
        {...input}
        {...custom}
        id="select"
        select
    />
);



let AddAssociationClub = ({
    onSubmit,
    isLoading,
    handleSubmit, }) => {
    return (
        <div className="datosAssociationClub">
            <form className="formAC">
                <h3 className="subAC">Datos</h3>
                <div className="div-field">
                    <Field name="name" component={renderTextField} label="Nombre" />
                </div>
                <div className="div-field">
                    <Field name="type" component={renderSelectField} label="Tipo" className="selectType_">
                        <MenuItem value="Asociacion">Asociación</MenuItem>
                        <MenuItem value="Club artistico">Club artístico</MenuItem>
                        <MenuItem value="Club academico">Club académico</MenuItem>
                        <MenuItem value="Club deportivo">Club deportivo</MenuItem>
                        <MenuItem value="Agrupacion">Agrupación</MenuItem>
                    </Field>
                </div>
                <div className="div-field">
                    <Field name="description" component={renderTextField} label="Descripción" />
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
                                <button className="buttonformAC" type="submit" onClick={handleSubmit(onSubmit)}>
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

AddAssociationClub = reduxForm({
    form: 'associationClubForm',
    validate
})(AddAssociationClub);

AddAssociationClub = connect(
    state => ({
        isLoading: false,
        isAuth: getAuthToken(state) !== null,
        status: getAssociationClubStatus(state),
    }),
    dispatch => ({
        onSubmit({ name, type, description, startdate, enddate, }) {
            dispatch(
                actions.startAddingAssociationClub(
                    uuidv4(),
                    name,
                    type,
                    description,
                    startdate,
                    enddate
                ),
                dispatch(reset('associationClubForm')),
            );
        },
        onChangeStatus() {
            dispatch(actions.changeAssociationClubStatus());
        },
    }),
    (stateProps, dispatchProps, ownProps) => {
        if (stateProps.status === 'SUCCESS') {
            toast.success("Se ha agregado exitosamente")
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
)(AddAssociationClub);

export default AddAssociationClub;