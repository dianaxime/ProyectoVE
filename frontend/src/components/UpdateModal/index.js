import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBCol } from 'mdbreact';
import {
    getIsUpdating,
    getUpdatingError,
    getIsUpdateOpen,
    getUser
} from '../../reducers';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';
import { Field, reduxForm } from 'redux-form';
import * as actionsModal from '../../actions/modalUpdate';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import './styles.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
}));

const validate = values => {
    const errors = {};
    const requiredFields = ['first_name', 'last_name', 'carne', 'sex', 'type', 'career', 'faculty'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Obligatorio*';
        }
    })
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

let UpdateUserForm = ({ open, onHandle, onSubmit, handleSubmit, Message }) => {
    const classes = useStyles();
    return (
        <MDBContainer >
            <div className={classes.drawerHeader}></div>
            <MDBModal backdrop={false} isOpen={open} side position="bottom">
                <MDBModalHeader toggle={onHandle}><b>Actualizar Perfil</b></MDBModalHeader>
                <MDBModalBody>
                    <MDBCol>
                        <Field name="first_name" component={renderTextField} label="Primer Nombre" className="input_" />
                        <Field name="last_name" component={renderTextField} label="Primer Apellido" className="input_" />
                    </MDBCol>
                    <MDBCol>
                        <Field name="carne" component={renderTextField} label="Carne" className="input_"/>
                        <Field name="sex" component={renderSelectField} label="Genero" className="input_">
                            <MenuItem value="F">F</MenuItem>
                            <MenuItem value="M">M</MenuItem>
                        </Field>
                    </MDBCol>
                    <MDBCol>
                                <Field name="type" component={renderSelectField} label="Tipo" className="input_">
                                    <MenuItem value="student">Estudiante</MenuItem>
                                    <MenuItem value="graduate">Graduado</MenuItem>
                                    <MenuItem value="collaborator">Colaborador</MenuItem>
                                    <MenuItem value="graduate/collaborator">Graduado/Colaborador</MenuItem>
                                </Field>
                                <Field name="career" component={renderSelectField} label="Carrera" className="input_">
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
                                <Field name="faculty" component={renderSelectField} label="Faculty" className="input_">
                                    <MenuItem value="ingenieria">Ingeniería</MenuItem>
                                    <MenuItem value="ciencias_y_humanidades">Ciencias y Humanidades</MenuItem>
                                    <MenuItem value="Ciencias_Sociales">Ciencias Sociales</MenuItem>
                                    <MenuItem value="Ciencias_Sociales">Educación</MenuItem>
                                </Field>
                            <div>{Message}</div>
                    </MDBCol>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="red" onClick={onHandle}>Cerrar</MDBBtn>
                    <MDBBtn color="green" onClick={handleSubmit(onSubmit)}>Actualizar Perfil</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    );
}

UpdateUserForm = reduxForm({
    form: 'updateUserForm',
    validate
})(UpdateUserForm)

UpdateUserForm = connect(
    state => ({
        Message:
            getIsUpdating(state) !== null
                ? getIsUpdating(state)
                    ? ""
                    : getUpdatingError(state)
                : undefined,
        open: getIsUpdateOpen(state),
        initialValues: getUser(state),
    }),
    dispatch => ({
        onSubmit({ first_name, last_name, carne, sex, type, career, faculty }) {
            dispatch(actions.startUpdateUser(first_name, last_name, carne, sex, type, career, faculty));
        },
        onHandle() {
            dispatch(actionsModal.changeUpdate(false));
        },
    })
)(UpdateUserForm);

export default UpdateUserForm;