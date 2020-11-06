import React from 'react';
import { connect } from 'react-redux';
import {
    getAuthToken,
} from '../../../reducers';
import { reset, Field, reduxForm } from 'redux-form';
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

let SearchACStatistics = ({
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

SearchACStatistics = reduxForm({
    form: 'acStatisticsForm',
    validate
})(SearchACStatistics);

SearchACStatistics = connect(
    state => ({
        isLoading: false,
        isAuth: getAuthToken(state) !== null,
    }),
    dispatch => ({
        onSubmit({ startdate, enddate }) {
            dispatch(
                actions.startFetchingParticipationArtClubs(moment(startdate).format('YYYY-MM-DD'), moment(enddate).format('YYYY-MM-DD'))
            );
            dispatch(
                actions.startFetchingParticipationArtClub(moment(startdate).format('YYYY-MM-DD'), moment(enddate).format('YYYY-MM-DD'))
            );
            dispatch(
                actions.startFetchingParticipationArtClubF(moment(startdate).format('YYYY-MM-DD'), moment(enddate).format('YYYY-MM-DD'))
            );
            dispatch(
                actions.startFetchingParticipationArtClubM(moment(startdate).format('YYYY-MM-DD'), moment(enddate).format('YYYY-MM-DD'))
            );
            dispatch(
                actions.startFetchingParticipationSportClubs(moment(startdate).format('YYYY-MM-DD'), moment(enddate).format('YYYY-MM-DD'))
            );
            dispatch(
                actions.startFetchingParticipationSportClub(moment(startdate).format('YYYY-MM-DD'), moment(enddate).format('YYYY-MM-DD'))
            );
            dispatch(
                actions.startFetchingParticipationSportClubF(moment(startdate).format('YYYY-MM-DD'), moment(enddate).format('YYYY-MM-DD'))
            );
            dispatch(
                actions.startFetchingParticipationSportClubM(moment(startdate).format('YYYY-MM-DD'), moment(enddate).format('YYYY-MM-DD'))
            );
            dispatch(
                actions.startFetchingParticipationAcadClubs(moment(startdate).format('YYYY-MM-DD'), moment(enddate).format('YYYY-MM-DD'))
            );
            dispatch(
                actions.startFetchingParticipationAcadClub(moment(startdate).format('YYYY-MM-DD'), moment(enddate).format('YYYY-MM-DD'))
            );
            dispatch(
                actions.startFetchingParticipationAcadClubF(moment(startdate).format('YYYY-MM-DD'), moment(enddate).format('YYYY-MM-DD'))
            );
            dispatch(
                actions.startFetchingParticipationAcadClubM(moment(startdate).format('YYYY-MM-DD'), moment(enddate).format('YYYY-MM-DD'))
            );
            dispatch(
                actions.startFetchingParticipationAgrupations(moment(startdate).format('YYYY-MM-DD'), moment(enddate).format('YYYY-MM-DD'))
            );
            dispatch(
                actions.startFetchingParticipationAgrupation(moment(startdate).format('YYYY-MM-DD'), moment(enddate).format('YYYY-MM-DD'))
            );
            dispatch(
                actions.startFetchingParticipationAgrupationF(moment(startdate).format('YYYY-MM-DD'), moment(enddate).format('YYYY-MM-DD'))
            );
            dispatch(
                actions.startFetchingParticipationAgrupationM(moment(startdate).format('YYYY-MM-DD'), moment(enddate).format('YYYY-MM-DD'))
            );
            //dispatch(reset('acStatisticsForm'));
        },
    }),
    (stateProps, dispatchProps, ownProps) => {
        return ({
            ...stateProps,
            ...dispatchProps,
            ...ownProps,
        });
    },
)(SearchACStatistics);

export default SearchACStatistics;