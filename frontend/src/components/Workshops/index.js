import { v4 as uuidv4 } from 'uuid';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import {
    getAuthToken,
    getIsOpen
} from '../../reducers';
import * as selectors from '../../reducers';
import Nav from '../Nav';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { reset, Field, reduxForm } from 'redux-form';
import * as actions from '../../actions/workshops';
import * as selectedActions from '../../actions/selectedWorkshop';
import Workshop from '../Workshop';
import './styles.css';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const drawerWidth = 240;

const validate = values => {
    const errors = {};
    const requiredFields = ['name', 'startdate', 'enddate', 'classroom', 'description'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Obligatorio*';
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

const Workshops = ({ workshop, isLoading, onLoad }) => {
    useEffect(onLoad, []);
    return (

        <div>
            {
                workshop.length > 0 && !isLoading && (

                    <div className="workshopsContainer">

                        {
                            workshop.map(id => <Workshop key={id}
                                id={id} />)
                        }
                    </div>
                )
            }
        </div>
    );
};

export default connect(
    state => ({
        workshop: selectors.getWorkshops(state),
        isLoading: selectors.isFetchingWorkshops(state),
    }),
    dispatch => ({
        onLoad() {
            dispatch(actions.startFetchingWorkshops());
        },
    }),
)(Workshops);
