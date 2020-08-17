import React from 'react';
import { connect } from 'react-redux';
import {
    getAuthToken,
    getIsOpen,
    getWorkshop,
    getSelectedWorkshop,
} from '../../reducers';
import TextField from '@material-ui/core/TextField';
import { reset, Field, reduxForm } from 'redux-form';
import * as actions from '../../actions/workshops';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { URL } from '../../settings';

const validate = values => {
    const errors = {};
    const requiredFields = [ 'name', 'startdate', 'enddate', 'classroom', 'description'];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Obligatorio*';
        }
    })
    return errors;
}

const renderDateTimePicker = ({ input: { onChange, value }, label, showTime }) => (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          className="inputWorkshop"
          disableToolbar
          variant="inline"
          format="yyyy/MM/dd"
          margin="normal"
          //id="date-picker-inline"
          label={label}
          onChange={onChange}
          time={showTime}
          value={!value ? new Date() : new Date(value)}
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

let UpdateWorkshop = ({ open,
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
                <div>
                    <Field name="startdate" component={renderDateTimePicker} label="Fecha de Inicio" />
                </div>
                <div>
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
        open: getIsOpen(state),
        initialValues: getWorkshop(state, getSelectedWorkshop(state)),
        idWorkshop: getSelectedWorkshop(state),
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
            window.location.href = URL + 'talleres';
        },
    }),
    (stateProps, dispatchProps, ownProps) => ({
        ...stateProps,
        ...dispatchProps,
        ...ownProps,
        onSubmit({ name, startdate, enddate, classroom, description}) {
            dispatchProps.onSubmit({ name, startdate, enddate, classroom, description}, stateProps.idWorkshop);
        },
    })
)(UpdateWorkshop);

export default UpdateWorkshop;