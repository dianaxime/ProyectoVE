import React from 'react';
import { connect } from 'react-redux';
import {
    getAuthToken,
    getIsOpen,
    getEvent,
    getSelectedEvent,
} from '../../../reducers';
import './styles.css';
import ShowPerson from '../ShowPerson';
// import { getSelectedEvent } from '../../../reducers/selectedEvent';


let ShowPersons = ({
    selectEvent,
    event,
}) => {
    return (
        <div className="personasWorkshop">
            <div className="formP">
                <h1 className="subP">Personas</h1>
                {
                    selectEvent ? (

                        <p className="subtituloT">{((Object.entries(event)[1])[1])}</p>
                    ) :
                        (
                            <p className="subtituloT">*Seleccione un evento*</p>
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
        selectEvent: getSelectedEvent(state) !== null,
        event: getEvent(state, getSelectedEvent(state)),
    }),
    undefined,
)(ShowPersons);

export default ShowPersons;