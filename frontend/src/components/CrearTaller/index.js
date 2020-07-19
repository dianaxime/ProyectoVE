import { v4 as uuidv4 } from 'uuid';
import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import {
    getAuthToken,
    getIsOpen
} from '../../reducers';
import { URL } from '../../settings';
import Nav from '../Nav';
import { makeStyles } from '@material-ui/core/styles';
import { reset, Field, reduxForm } from 'redux-form';
import * as selectors from '../../reducers';
import * as actions from '../../actions/talleres';
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

const CrearTaller = ({ open, 
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
                <div className="addTaller"> 
                    <div className="datosTaller"> 
                    <h2 className="tituloformT">{'Nuevo Taller'}</h2>
                    <form className="formT" onSubmit={handleSubmit}>
                    <h3 className="subt">Datos</h3>
                    <p>
                        <Field className="inputTaller"
                        name="name"
                        type="text"
                        placeholder="Nombre" 
                        component="input"
                        />
                    </p>
                    <p>
                        <Field className="inputTaller"
                        name="date"
                        type="text"
                        placeholder="Fecha (YYYY-MM-DD)"
                        component="input"
                        />
                    </p>
                    <p>
                        <Field className="inputTaller"
                        name="salon"
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
                            <button className="buttonformT" type="submit" onClick={onSubmit}>
                                {'Crear'}
                            </button>
                        )
                        }
                    </p>
                    </form>
                    </div>
                    <div className="personasTaller">
                        <h1>Personas</h1>
                    </div>
                </div>



            </main>
        </div>
    );
}

export default reduxForm({form: 'tallerform'})(    
    connect(
    state => ({
        isLoading: false,
        isAuth: getAuthToken(state) !== null,
        open: getIsOpen(state),
    }),
    dispatch => ({
        onSubmit({name, date, salon}) {
          dispatch(
            actions.startAddingTaller({
              id: uuidv4(),
              name,
              date,
              salon,
            }),
          console.log("Taller creado!"),
          dispatch(reset('tallerform')),
          );
        },
      }),
    (stateProps, disptachProps, ownProps) => {
        if (!stateProps.isAuth) {
            window.location.href = URL + 'auth';
        }
        return ({
            ...stateProps,
            ...disptachProps,
            ...ownProps,
        });
        
    },
)(CrearTaller)
);