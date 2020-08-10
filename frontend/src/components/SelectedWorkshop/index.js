import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { connect } from 'react-redux';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBIcon } from
'mdbreact';
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
import * as selectedActions from '../../actions/selectedWorkshop';

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

let SelectedWorkshop = ({ open,
    name, startdate, enddate, classroom, description,
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
                <div className="selectedWorkshop">
                    <div className="dataWorkshop">
                        <MDBRow>
                            <MDBCol col='4'>
                                <MDBCard>
                                <MDBCardImage
                                    className="tituloWorkshop"
                                    tag='div'
                                >
                                    <h2>{name}</h2>
                                </MDBCardImage>
                                <MDBCardBody cascade className='text-center'>
                                    <MDBCardText>
                                    <h5 className="des">{description}</h5>
                                    </MDBCardText>
                                    <MDBCardText>
                                    <h5 className="sdatetitle">Inicio</h5>   
                                    <h5 className="sdate">{startdate}</h5>
                                    </MDBCardText>
                                    <MDBCardText>
                                    <h5 className="edatetitle">Fin</h5>
                                    <h5 className="edate">{enddate}</h5>
                                    </MDBCardText>
                                    <hr />
                                    <div className='text-center'>
                                    <MDBCardText>
                                    {classroom}
                                    </MDBCardText>
                                    </div>
                                </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </div>
                    <div className="personasWorkshop">
                        <h1>Personas</h1>
                    </div>
                </div>
            </main>
        </div>
    );
}

SelectedWorkshop = connect(
    state => ({
        isLoading: false,
        isAuth: getAuthToken(state) !== null,
        open: getIsOpen(state),
        name: selectedActions.selectedWorkshop(state).payload.selectedWorkshop.name,
        description: selectedActions.selectedWorkshop(state).payload.selectedWorkshop.description,
        startdate: selectedActions.selectedWorkshop(state).payload.selectedWorkshop.startdate,
        enddate: selectedActions.selectedWorkshop(state).payload.selectedWorkshop.enddate,
        classroom: selectedActions.selectedWorkshop(state).payload.selectedWorkshop.classroom,
    }),
)(SelectedWorkshop);

export default SelectedWorkshop;