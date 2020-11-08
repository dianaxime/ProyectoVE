import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import * as actionsModal from '../../actions/modalUserScholarHours';
import * as actions from '../../actions/events';
import { v4 as uuidv4 } from 'uuid';
import {
    getIsScholarHoursOpen,
    getAuthToken,
    getScholarsHours
} from '../../reducers';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import gtLocale from 'date-fns/locale/es';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment';

/*const validate = values => {
    const errors = {};
    const requiredFields = ['hours', 'publicSpeaking', 'organization', 'photoVideoEditing', 'graphicDesign', 'leader', 'other'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Obligatorio*';
        }
    })
    return errors;
}*/

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


let user_scholarhours = ({ open, onHandle, onSubmit, handleSubmit, totalH }) => {
    return (
        <MDBContainer>
            <MDBModal backdrop={false} isOpen={open} side position="bottom-left">
                <MDBModalHeader toggle={onHandle}><b>Tus Horas de Beca</b></MDBModalHeader>
                <MDBModalBody>
                    <MDBContainer>
                        <Field name="startdate" component={renderDateTimePicker} label="Inicio" />
                        <Field name="enddate" component={renderDateTimePicker} label="Fin" />
                        <hr />
                        <h6><b> Totales: {totalH.sum}</b></h6>
                        {console.log(totalH)}
                    </MDBContainer>
                    <ToastContainer position="bottom-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover />
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="green" onClick={handleSubmit(onSubmit)}>Revisar</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    );
}

user_scholarhours = reduxForm({
    form: 'scholarhoursForm',
    //validate
})(user_scholarhours);

user_scholarhours = connect(
    state => ({
        open: getIsScholarHoursOpen(state),
        isAuth: getAuthToken(state) !== null,
        totalH: getScholarsHours(state),
    }),
    dispatch => ({
        onSubmit({ startdate, enddate}) {
            if (!startdate || !enddate){
                toast.warn("Por favor completa los campos");
            }
            else{
                dispatch(actions.startFetchingScholarsHours(moment(startdate).format('YYYY-MM-DD'), moment(enddate).format('YYYY-MM-DD')));
                dispatch(reset('scholarhoursForm'));
            }
        },
        onHandle() {
            dispatch(reset('scholarhoursForm'));
            dispatch(actionsModal.checkScholarHours(false));
        },
    }),
    (stateProps, dispatchProps, ownProps) => {
        return ({
            ...stateProps,
            ...dispatchProps,
            ...ownProps,
        });
    },
)(user_scholarhours);

export default user_scholarhours;