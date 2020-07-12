import React from "react";
import { connect } from 'react-redux';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { Field, reduxForm, reset } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {
    getIsRegistering,
    getRegisteringError
} from '../../reducers';
import * as actions from '../../actions/auth';
import Loader from 'react-loaders';
import './style_SignIn.css';

const validate = values => {
    const errors = {};
    const requiredFields = ['email', 'first_name', 'last_name', 'carne', 'sex', 'type', 'career', 'faculty'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Obligatorio*';
        }
    })
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    return errors;
}

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField placeholder={label}
        label={label}
        helperText={touched && error}
        {...input}
        {...custom}
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

let SigninForm = ({ Message, onSubmit, signinStatus, handleSubmit }) => {
    return (
        <MDBContainer className="contenedor">
            <div>
                <MDBCol>
                    <MDBRow md="6">
                        <form>
                            <p className="titulo">Registro</p>
                            <div className="formulario">
                                <div>
                                    <div>
                                        <Field name="email" component={renderTextField} label="Correo Electrónico" className="input" />
                                    </div>
                                    <div>
                                        <Field name="first_name" component={renderTextField} label="Primer Nombre" className="input" />
                                    </div>
                                    <div>
                                        <Field name="sex" component={renderSelectField} label="Género" className="input">
                                            <MenuItem value="F">F</MenuItem>
                                            <MenuItem value="M">M</MenuItem>
                                        </Field>

                                    </div>
                                    <div>
                                        <Field name="career" component={renderSelectField} label="Carrera" className="input">
                                            <MenuItem value="Bioinformática">Bioinformática</MenuItem>
                                            <MenuItem value="Biomédica">Biomédica</MenuItem>
                                            <MenuItem value="Biotecnología_Industrial">Biotecnología Industrial</MenuItem>
                                            <MenuItem value="Ciencias_de_Alimentos">Ciencias de Alimentos</MenuItem>
                                            <MenuItem value="Ciencia_de_la_Administración">Ciencia de la Administración</MenuItem>
                                            <MenuItem value="Ciencia_de_Datos">Ciencia de Datos</MenuItem>
                                            <MenuItem value="Civil">Civil</MenuItem>
                                            <MenuItem value="Civil_Ambiental">Civil Ambiental</MenuItem>
                                            <MenuItem value="Civil_Arquitectónica">Civil Arquitectónica</MenuItem>
                                            <MenuItem value="Civil_Industrial">Civil Industrial</MenuItem>
                                            <MenuItem value="Computación">Ciencia de la Computación y Tecnologías de la Información</MenuItem>
                                            <MenuItem value="Electrónica">Electrónica</MenuItem>
                                            <MenuItem value="Industrial">Industrial</MenuItem>
                                            <MenuItem value="Mecánica">Mecánica</MenuItem>
                                            <MenuItem value="Mecánica_Industrial">Mecánica Industrial</MenuItem>
                                            <MenuItem value="Mecatrónica">Mecatrónica</MenuItem>
                                            <MenuItem value="Ingeniería_Química">Ingeniería Química</MenuItem>
                                            <MenuItem value="Ingeniería_Química_Industrial">Ingeniería Química Industrial</MenuItem>
                                            <MenuItem value="Licenciatura_en_Educación">Licenciatura en Educación</MenuItem>
                                            <MenuItem value="Ciencias_Biológicas_y_Químicas">Profesorado y Licenciatura en Educación con Especialidad en Ciencias Biológicas y Químicas</MenuItem>
                                            <MenuItem value="Ciencias_Sociales">Profesorado y Licenciatura en Educación con Especialidad en Ciencias Sociales</MenuItem>
                                            <MenuItem value="Comunicación_y_Lenguaje">Profesorado y Licenciatura en Educación con Especialidad en Comunicación y Lenguaje</MenuItem>
                                            <MenuItem value="Educación_Inclusiva">Profesorado y Licenciatura en Educación con Especialidad en Educación Inclusiva</MenuItem>
                                            <MenuItem value="Educación_Musical">Profesorado y Licenciatura en Educación con Especialidad en Educación Musical</MenuItem>
                                            <MenuItem value="Educación_Primaria">Profesorado y Licenciatura en Educación con Especialidad en Educación Primaria</MenuItem>
                                            <MenuItem value="English_Language_Teaching">Profesorado y Licenciatura en Educación con Especialidad en English Language Teaching</MenuItem>
                                            <MenuItem value="Matemática_y_Ciencias_Físicas">Profesorado y Licenciatura en Educación con Especialidad en Matemática y Ciencias Físicas</MenuItem>
                                            <MenuItem value="Comunidad_Educativa">Programas de Actualización para la Comunidad Educativa</MenuItem>
                                            <MenuItem value="Biología">Biología</MenuItem>
                                            <MenuItem value="Bioquímica_y_Microbiología">Bioquímica y Microbiología</MenuItem>
                                            <MenuItem value="Biotecnología_Molecular">Biotecnología Molecular</MenuItem>
                                            <MenuItem value="Comunicación_y_Letras">Comunicación y Letras</MenuItem>
                                            <MenuItem value="Física">Física</MenuItem>
                                            <MenuItem value="Matemática_Aplicada">Matemática Aplicada</MenuItem>
                                            <MenuItem value="Nutrición">Nutrición</MenuItem>
                                            <MenuItem value="Química">Química</MenuItem>
                                            <MenuItem value="Química_Farmacéutica">Química Farmacéutica</MenuItem>
                                            <MenuItem value="Antropología_y_Sociología">Antropología y Sociología</MenuItem>
                                            <MenuItem value="Arqueología">Arqueología</MenuItem>
                                            <MenuItem value="Psicología">Psicología</MenuItem>
                                            <MenuItem value="Relaciones_Internacionales">Relaciones Internacionales y Master of Arts in Global Affairs</MenuItem>
                                        </Field>

                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <Field name="carne" component={renderTextField} label="Carne" className="input" />
                                    </div>
                                    <div>
                                        <Field name="last_name" component={renderTextField} label="Primer Apellido" className="input" />
                                    </div>
                                    <div>
                                        <Field name="type" component={renderSelectField} label="Tipo" className="input">
                                            <MenuItem value="student">Student</MenuItem>
                                            <MenuItem value="graduate">Graduate</MenuItem>
                                            <MenuItem value="collaborator">Collaborator</MenuItem>
                                            <MenuItem value="graduate/collaborator">Graduate/Collaborator</MenuItem>
                                        </Field>

                                    </div>
                                    <div>
                                        <Field name="faculty" component={renderSelectField} label="Facultad" className="input">
                                            <MenuItem value="ingenieria">Ingeniería</MenuItem>
                                            <MenuItem value="ciencias_y_humanidades">Ciencias y Humanidades</MenuItem>
                                            <MenuItem value="Ciencias_Sociales">Ciencias Sociales</MenuItem>
                                            <MenuItem value="Ciencias_Sociales">Educación</MenuItem>
                                        </Field>

                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                {signinStatus ? <Loader type="ball-spin-fade-loader" /> :
                                    <div >
                                        <MDBBtn
                                            outline
                                            color="black"
                                            className="boton"
                                            onClick={handleSubmit(onSubmit)}
                                        >Registrarse</MDBBtn>
                                    </div>
                                }
                            </div>
                        </form>
                    </MDBRow>
                </MDBCol>
                <div>{Message}</div>
            </div>
        </MDBContainer>
    );
};

SigninForm = reduxForm({
    form: 'signinForm',
    validate
})(SigninForm);

SigninForm = connect(
    state => ({
        Message:
            getIsRegistering(state) !== null
                ? getIsRegistering(state)
                    ? "Loading"
                    : getRegisteringError(state)
                : undefined,
        signinStatus: getIsRegistering(state),
    }),
    dispatch => ({
        onSubmit({
            email,
            first_name,
            last_name,
            carne,
            sex,
            type,
            career,
            faculty,
        }) {
            dispatch(actions.startRegister(email, first_name, last_name, carne, sex, type, career, faculty));
            dispatch(reset('signinForm'));
        },
    })
)(SigninForm);

export default SigninForm;