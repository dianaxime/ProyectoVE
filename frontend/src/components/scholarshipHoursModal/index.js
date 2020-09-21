import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import * as actionsModal from '../../actions/modalScholarship';
import * as actions from '../../actions/scholars';
import { v4 as uuidv4 } from 'uuid';
import {
    getIsScholarOpen,
    getScholarStatus,
} from '../../reducers';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <div>
        <TextField placeholder={label}
            label={label}
            //helperText={touched && error}
            {...input}
            {...custom}
            size="small"
            variant="outlined"
            fullWidth
            margin="dense"
        />
    </div>
);

let scholarship_hours = ({ open, onHandle, onSubmit, handleSubmit }) => {
    return (
        <MDBContainer>
            <MDBModal backdrop={false} isOpen={open} side position="bottom-left">
                <MDBModalHeader toggle={onHandle}><b>Horas de Beca</b></MDBModalHeader>
                <MDBModalBody>
                    <MDBContainer>
                        <Field name="hours" component={renderTextField} label="Cantidad de horas" />
                        <hr />
                        <h6><b>¿Qué habilidades posee?</b>(Ingresar valores entre 1-10)</h6>
                        <div className="d-flex flex-row">
                            <Field name="publicSpeaking" component={renderTextField} label="¿Hablar en público?" />
                            <Field name="organization" component={renderTextField} label="¿Organización?" />
                        </div>
                        <div className="d-flex flex-row">
                            <Field name="leader" component={renderTextField} label="¿Liderazgo?" />
                            <Field name="graphicDesign" component={renderTextField} label="¿Diseño gráfico?" />
                        </div>
                        <Field name="photoVideoEditing" component={renderTextField} label="¿Edición de fotos/video?" />
                        <Field name="other" component={renderTextField} label="Otros:" multiline rows={2} />
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
                    <MDBBtn color="red" onClick={onHandle}>Cerrar</MDBBtn>
                    <MDBBtn color="green" onClick={handleSubmit(onSubmit)}>Confirmar</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    );
}

scholarship_hours = reduxForm({
    form: 'scholarshipForm',
    //validate
})(scholarship_hours);

scholarship_hours = connect(
    state => ({
        open: getIsScholarOpen(state),
        status: getScholarStatus(state),
    }),
    dispatch => ({
        onSubmit({ hours, publicSpeaking, organization, photoVideoEditing, graphicDesign, leader, other }) {
            if (!hours || !publicSpeaking || !organization || !photoVideoEditing || !graphicDesign || !leader || !other){
                toast.warn("Por favor completa los campos");
            }
            else{
                dispatch(actions.startAddingScholar(uuidv4(), hours, photoVideoEditing, graphicDesign, publicSpeaking, organization, leader, other));
                dispatch(reset('scholarshipForm'));
            }
        },
        onHandle() {
            dispatch(reset('scholarshipForm'));
            dispatch(actionsModal.changeScholar(false));
        },
        onChangeStatus() {
            dispatch(actions.changeScholarStatus());
        },
    }),
    (stateProps, dispatchProps, ownProps) => {
        if (stateProps !== null){
            if (stateProps.status === 'SUCCESS') {
                toast.success("Tu formulario se ha agregado exitosamente");
                dispatchProps.onChangeStatus();
            } else{
                toast.error(stateProps.status);
                dispatchProps.onChangeStatus();
            }

        }
        return ({
            ...stateProps,
            ...dispatchProps,
            ...ownProps,
        });
    },
)(scholarship_hours);

export default scholarship_hours;