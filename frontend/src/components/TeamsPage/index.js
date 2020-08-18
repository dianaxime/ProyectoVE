import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { getAuthToken, getIsOpen } from '../../reducers';
import { URL } from '../../settings';
import Nav from '../Nav';
import Teams from '../Teams';
import * as actions from '../../actions/teams';
import { makeStyles } from '@material-ui/core/styles';

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

const TeamsPage = ({open}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Nav/>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <Teams/>
            </main>
        </div>
    );
}

export default connect(
    state => ({
        isAuth: getAuthToken(state) !== null,
        open: getIsOpen(state),
    }),
    dispatch => ({
        onLoad() {
          dispatch(actions.startFetchingTeams());
        },
    }),
    (stateProps, disptachProps, ownProps) => {
        if (!stateProps.isAuth) {
            window.location.href = URL + 'auth';
        }
        return({
            ...stateProps,
            ...disptachProps,
            ...ownProps,
        });
    }
)(TeamsPage);