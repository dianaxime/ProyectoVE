import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import {
    getAuthToken,
    getIsOpen
} from '../../reducers';
import Nav from '../Nav';
import { makeStyles } from '@material-ui/core/styles';
import { reset, Field, reduxForm } from 'redux-form';
import * as actions from '../../actions/workshops';
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
                        <form className="formW" onSubmit={handleSubmit}>
                            <h3 className="subw">Datos</h3>
                            <p>
                                <Field className="inputWorkshop"
                                    name="name"
                                    type="text"
                                    placeholder="Nombre"
                                    component="input"
                                />
                            </p>
                            <p>
                                <Field className="inputWorkshop"
                                    name="startdate"
                                    type="text"
                                    placeholder="Fecha de inicio (YYYY-MM-DD)"
                                    component="input"
                                />
                            </p>
                            <p>
                                <Field className="inputWorkshop"
                                    name="enddate"
                                    type="text"
                                    placeholder="Fecha de fin (YYYY-MM-DD)"
                                    component="input"
                                />
                            </p>
                            <p>
                                <Field className="inputWorkshop"
                                    name="classroom"
                                    type="text"
                                    placeholder="Salon"
                                    component="input"
                                />
                            </p>
                            <p>
                                {
                                    isLoading ? (
                                        <strong>{'Cargando...'}</strong>
                                    ) : (
                                            <button className="buttonformW" type="submit" onClick={onSubmit}>
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
        onSubmit({ name, startdate, enddate, classroom }) {
            dispatch(
                actions.startAddingWorkshop({
                    id: uuidv4(),
                    name,
                    startdate,
                    enddate,
                    classroom,
                }),
                console.log("Taller creado!"),
                dispatch(reset('workshopForm')),
            );
        },
    }),
)(AddWorkshop);

export default AddWorkshop;