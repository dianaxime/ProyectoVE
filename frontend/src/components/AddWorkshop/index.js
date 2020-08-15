import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import {
    getAuthToken,
    getIsOpen
} from '../../reducers';
import Nav from '../Nav';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { reset, Field, reduxForm } from 'redux-form';
import * as actions from '../../actions/workshops';
import './styles.css';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const drawerWidth = 240;

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

const renderDateTimePicker = ({ input: { onChange, value }, label, showTime }) => (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          className="inputWorkshop"
          disableToolbar
          variant="inline"
          format="yyyy/MM/dd"
          margin="normal"
          id="date-picker-inline"
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

let AddWorkshop = ({ open,
    onSubmit,
    isLoading,
    handleSubmit, }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Nav />
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <center><b><h2 className="tituloformW">{'Nuevo Taller'}</h2></b></center>
                <div className="addWorkshop">
                    <div className="datosWorkshop">
                        <form className="formW">
                            <h3 className="subw">Datos</h3>
                            <div className="div-field">
                                <Field name="name" component={renderTextField} label="Nombre"/>
                            </div>
                            <div className="div-field">
                                <Field name="description" component={renderTextField} label="Descripción"/>
                            </div>
                            <div className="div-field">
                                <Field name="classroom" component={renderTextField} label="Salon"/>
                            </div>
                            <div>
                                <Field name="startdate" component={renderDateTimePicker} label="Fecha de Inicio"/>
                            </div>
                            <div>
                                <Field name="enddate" component={renderDateTimePicker} label="Fecha de Finalización"/>
                            </div>
                            <p>
                                {
                                    isLoading ? (
                                        <strong>{'Cargando...'}</strong>
                                    ) : (
                                            <button className="buttonformW" type="submit" onClick={handleSubmit(onSubmit)}>
                                                {'Crear'}
                                            </button>
                                        )
                                }
                            </p>
                        </form>
                    </div>
                    <div className="personasWorkshop">
                        <div className="datosWorkshop">
                            <div className="formP">
                                <h1 className="subP">Personas</h1>
                                <input placeholder="Buscar"></input>
                                <div className="personas">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

AddWorkshop = reduxForm({
    form: 'workshopForm',
    validate
})(AddWorkshop);

AddWorkshop = connect(
    state => ({
        isLoading: false,
        isAuth: getAuthToken(state) !== null,
        open: getIsOpen(state),
    }),
    dispatch => ({
        onSubmit({ name, startdate, enddate, classroom, description }) {
            dispatch(
                actions.startAddingWorkshop(
                    uuidv4(),
                    name,
                    classroom,
                    description,
                    startdate,
                    enddate
                ),
                dispatch(reset('workshopForm')),
            );
        },
    }),
)(AddWorkshop);

export default AddWorkshop;