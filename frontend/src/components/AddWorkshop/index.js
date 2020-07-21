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
          value={!value ? null : new Date(value)}
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
                <div className="addWorkshop">
                    <div className="datosWorkshop">
                        <h2 className="tituloformW">{'Nuevo Taller'}</h2>
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
                        <h1>Personas</h1>
                    </div>
                </div>
            </main>
        </div>
    );
}

AddWorkshop = reduxForm({
    form: 'workshopForm'
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
                console.log("Taller creado!"),
                dispatch(reset('workshopForm')),
            );
        },
    }),
)(AddWorkshop);

export default AddWorkshop;