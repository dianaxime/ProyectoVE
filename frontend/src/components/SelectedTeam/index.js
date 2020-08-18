import React from 'react';
import { connect } from 'react-redux';
import { MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol } from
'mdbreact';
import clsx from 'clsx';
import {
    getAuthToken,
    getIsOpen,
    getTeam,
    getSelectedTeam
} from '../../reducers';
import Nav from '../Nav';
import { makeStyles } from '@material-ui/core/styles';
import './style.css';

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

let SelectedTeam = ({ open,
    name, startdate, enddate, classroom, description,
     }) => {
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
                <div className="selectedTeam">
                    <div className="dataTeam">
                        <MDBRow>
                            <MDBCol col='4'>
                                <MDBCard>
                                <MDBCardImage
                                    className="tituloTeam"
                                    tag='div'
                                >
                                    <h2>{name}</h2>
                                </MDBCardImage>
                                <MDBCardBody cascade className='text-center'>
                                    <h5 className="des">{description}</h5>
                                    <h5 className="sdatetitle">Inicio</h5>   
                                    <h5 className="sdate">{startdate}</h5>
                                    <h5 className="edatetitle">Fin</h5>
                                    <h5 className="edate">{enddate}</h5>
                                    <hr />
                                    <div className='text-center'>
                                    {classroom}
                                    </div>
                                </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </div>
                    <div className="personasTeam">
                        <h1>Personas</h1>
                    </div>
                </div>
            </main>
        </div>
    );
}

SelectedTeam = connect(
    state => ({
        isLoading: false,
        isAuth: getAuthToken(state) !== null,
        open: getIsOpen(state),
        name: getTeam(state, getSelectedTeam(state)).name,
        description: getTeam(state, getSelectedTeam(state)).description,
        startdate: getTeam(state, getSelectedTeam(state)).startdate,
        enddate: getTeam(state, getSelectedTeam(state)).enddate,
        classroom: getTeam(state, getSelectedTeam(state)).classroom,
    }),
)(SelectedTeam);

export default SelectedTeam;