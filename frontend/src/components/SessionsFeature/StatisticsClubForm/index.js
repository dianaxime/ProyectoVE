import React from 'react';
import { connect } from 'react-redux';
import {
    getAuthToken,
    getSelectedAssociationClub,
} from '../../../reducers';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../../actions/statistics';
import './styles.css';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import "react-toastify/dist/ReactToastify.css";
import gtLocale from 'date-fns/locale/es';
import SearchIcon from '@material-ui/icons/Search';
import moment from 'moment';

const validate = values => {
    const errors = {};
    const requiredFields = ['startdate', 'enddate'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Obligatorio*';
        }
    })
    return errors;
}

const renderDateTimePicker = ({ input: { onChange, value }, label, meta: { touched, error }, showTime }) => (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={gtLocale}>
        <KeyboardDatePicker
            autoOk
            className="inputAssociationClub"
            disableToolbar
            variant="inline"
            format="yyyy/MM/dd"
            margin="normal"
            label={label}
            helperText={touched && error}
            onChange={onChange}
            time={showTime}
            value={!value ? new Date() : new Date(value)}
            fullWidth
        />
    </MuiPickersUtilsProvider>
);

let SearchClubStatistics = ({
    onSubmit,
    isLoading,
    handleSubmit, }) => {
    return (
        <div className="datosStatic">
            <form className="formStatistic">
                <div className="div-inputs">
                    <Field name="startdate" component={renderDateTimePicker} label="Inicio" />
                    <p className="space">es solo espacio</p>
                    <Field name="enddate" component={renderDateTimePicker} label="Fin" />
                </div>
                <p>
                    {
                        isLoading ? (
                            <strong>{'Cargando...'}</strong>
                        ) : (
                                <button className="buttonformST" type="submit" onClick={handleSubmit(onSubmit)}>
                                    <SearchIcon />
                                </button>
                            )
                    }
                </p>
            </form>
        </div>
    );
}

SearchClubStatistics = reduxForm({
    form: 'sessionStatsForm',
    validate
})(SearchClubStatistics);

SearchClubStatistics = connect(
    (state, { id }) => ({
        isLoading: false,
        isAuth: getAuthToken(state) !== null,
        idac: getSelectedAssociationClub(state) === id,
        idac1: getSelectedAssociationClub(state),
    }),
    dispatch => ({
        onSubmit(startdate, enddate, idac) {
            dispatch(
                actions.startFetchingAssistanceClub(
                    idac,
                    moment(startdate).format('YYYY-MM-DD'),
                    moment(enddate).format('YYYY-MM-DD'),
                )
            );
        },
    }),
    (stateProps, dispatchProps, ownProps) => {
        return ({
            ...stateProps,
            ...dispatchProps,
            ...ownProps,
            onSubmit({ startdate, enddate }) {
                dispatchProps.onSubmit(startdate, enddate, stateProps.idac1);
            }
        });
    },
)(SearchClubStatistics);

export default SearchClubStatistics;