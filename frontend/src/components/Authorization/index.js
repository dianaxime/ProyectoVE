import React, { forwardRef, useEffect } from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import clsx from 'clsx';
import {
    getAuthToken,
    getIsOpen,
    getPendingUsers
} from '../../reducers';
import { URL } from '../../settings';
import Nav from '../Nav';
import { makeStyles } from '@material-ui/core/styles';
import * as actions from '../../actions/auth';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props.rest} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props.rest} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props.rest} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props.rest} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props.rest} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props.rest} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props.rest} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props.rest} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props.rest} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props.rest} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props.rest} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props.rest} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props.rest} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props.rest} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props.rest} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props.rest} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props.rest} ref={ref} />)
};

const columns = [
    { title: 'Email', field: 'email' },
    { title: 'First Name', field: 'first_name' },
    { title: 'Last Name', field: 'last_name' },
    { title: 'Status', field: 'status' },
];

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

let Authorization = ({ open, data, onLoad }) => {
    useEffect(onLoad, []);
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
                <div style={{ maxWidth: "100%" }}>
                    <MaterialTable
                        icons={tableIcons}
                        title="Authorization"
                        columns={columns}
                        data={data}
                        editable={{
                            /* onRowUpdate: (newData, oldData) =>
                                 new Promise((resolve) => {
                                     setTimeout(() => {
                                         resolve();
                                         if (oldData) {
                                             setState((prevState) => {
                                                 const data = [...prevState.data];
                                                 data[data.indexOf(oldData)] = newData;
                                                 return { ...prevState, data };
                                             });
                                         }
                                     }, 600);
                                 }),*/
                        }}
                    />
                </div>
            </main>
        </div>
    );
}

export default connect(
    state => ({
        isAuth: getAuthToken(state) !== null,
        open: getIsOpen(state),
        data: getPendingUsers(state),
    }),
    dispatch => ({
        onLoad() {
            dispatch(actions.startFetchingUsers());
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
)(Authorization);