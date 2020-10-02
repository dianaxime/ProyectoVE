import React from 'react';
import { connect } from 'react-redux';
import {
    getAuthToken,
    getIsOpen,
    getSession,
    getSelectedSession
} from '../../../reducers';
import './styles.css';
import ShowPerson from '../ShowPerson';


let ShowPersons = ({
    selectAC,
    assistances,
}) => {
    return (
        <div className="personasWorkshop">
            <div className="formP">
                <h1 className="subP">Personas</h1>
                {
                    selectAC ? (

                        <p className="subtituloT">{((Object.entries(assistances)[1])[1])}</p>
                    ) :
                        (
                            <p className="subtituloT">*Seleccione una Sesión*</p>
                        )
                }
                {
                }
                <div className="personas">
                    <ShowPerson />
                </div>
                <hr></hr>
            </div>
        </div>
    );
}

ShowPersons = connect(
    state => ({
        isLoading: false,
        isAuth: getAuthToken(state) !== null,
        open: getIsOpen(state),
        selectAC: getSelectedSession(state) !== null,
        assistances: getSession(state, getSelectedSession(state)),
    }),
    undefined,
)(ShowPersons);

export default ShowPersons;