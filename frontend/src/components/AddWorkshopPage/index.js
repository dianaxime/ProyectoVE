import React from 'react';
import AddWorkshop from '../AddWorkshop';
import SearchPersons from '../searchPersons';
import { connect } from 'react-redux';
import { getAuthToken } from '../../reducers';
import { URL } from '../../settings';

const AddWorkshopPage = () => (
    <div>
        <center><b><h2 className="tituloformW">{'Nuevo Taller'}</h2></b></center>
        <AddWorkshop />
        <SearchPersons />
    </div>
);

export default connect(
    state => ({
        isAuth: getAuthToken(state) !== null,
    }),
    undefined,
    /*(stateProps, disptachProps, ownProps) => {
        if (stateProps.isAuth) {
            window.location.href = URL;
        }
        return ({
            ...stateProps,
            ...disptachProps,
            ...ownProps,
        });
    }*/
)(AddWorkshopPage);