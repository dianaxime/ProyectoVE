import React from 'react';
import SelectedEvent from '../SelectedEvent';
import ShowPersons from '../ShowPersons';
import { connect } from 'react-redux';
import { getAuthToken, getIsOpen } from '../../../reducers';
import { URL } from '../../../settings';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Nav from '../../Nav';
import './styles.css';
import Footer from '../../Footer';

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

const SelectedEventPage = ({open}) => {
    const classes = useStyles();
    return (

        <div className="bgse">
            <Nav />
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <div className="contenedorE">
                    <SelectedEvent />
                    <ShowPersons />
                </div>
            </main>
            <div className="footer">
                <Footer />
            </div>
        </div>
    );
}

export default connect(
    state => ({
        isAuth: getAuthToken(state) !== null,
        open: getIsOpen(state),
    }),
    undefined,
    (stateProps, disptachProps, ownProps) => {
        if (!stateProps.isAuth) {
            window.location.href = URL + 'auth';
        }
        return ({
            ...stateProps,
            ...disptachProps,
            ...ownProps,
        });
    }
)(SelectedEventPage);
