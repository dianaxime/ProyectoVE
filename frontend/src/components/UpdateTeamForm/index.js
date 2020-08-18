import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import {
    getAuthToken,
    getIsOpen,
    getTeam,
    getSelectedTeam,
} from '../../reducers';
import Nav from '../Nav';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { reset, Field, reduxForm } from 'redux-form';
import * as actions from '../../actions/teams';
import './style.css';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { URL } from '../../settings';

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
          className="inputTeam"
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
    <TextField className="inputTeam" placeholder={label}
        label={label}
        helperText={touched && error}
        {...input}
        {...custom}
        margin="normal"
        fullWidth
    />
);

let UpdateTeam = ({ open,
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
                <div className="addTeam">
                    <div className="datosTeam">
                        <h2 className="tituloformW">{'Editar Equipo'}</h2>
                        <form className="formW">
                            <h3 className="subw">Datos</h3>
                            <div className="div-field">
                                <Field name="name" component={renderTextField} label="Nombre"/>
                            </div>
                            <div className="div-field">
                                <Field name="description" component={renderTextField} label="Descripcion"/>
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
                                                {'Actualizar'}
                                            </button>
                                        )
                                }
                            </p>
                        </form>
                    </div>
                    <div className="personasTeam">
                        <h1>Personas</h1>
                    </div>
                </div>
            </main>
        </div>
    );
}

UpdateTeam = reduxForm({
    form: 'updateTeamForm',
    validate
})(UpdateTeam);

UpdateTeam = connect(
    state => ({
        isLoading: false,
        isAuth: getAuthToken(state) !== null,
        open: getIsOpen(state),
        initialValues: getTeam(state, getSelectedTeam(state)),
        idTeam: getSelectedTeam(state),
    }),
    dispatch => ({
        onSubmit({ name, startdate, enddate, classroom, description }, id) {
            dispatch(
                actions.startUpdatingTeam(
                    id,
                    name,
                    classroom,
                    description,
                    startdate,
                    enddate
                ),
                console.log("Equipo actualizado!"),
                dispatch(reset('updateTeamForm')),
            );
            window.location.href = URL + 'equipos';
        },
    }),
    (stateProps, dispatchProps, ownProps) => ({
        ...stateProps,
        ...dispatchProps,
        ...ownProps,
        onSubmit({ name, startdate, enddate, classroom, description}) {
            dispatchProps.onSubmit({ name, startdate, enddate, classroom, description}, stateProps.idTeam);
        },
    })
)(UpdateTeam);

export default UpdateTeam;