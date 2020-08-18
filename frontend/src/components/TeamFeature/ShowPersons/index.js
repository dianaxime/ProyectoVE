import React from 'react';
import { connect } from 'react-redux';
import {
    getAuthToken,
    getIsOpen,
    getTeam,
    getSelectedTeam,
} from '../../../reducers';
import './styles.css';
import ShowPerson from '../ShowPerson';


let ShowPersons = ({
    selectTeam,
    team,
}) => {
    return (
        <div className="personasWorkshop">
            <div className="formP">
                <h1 className="subP">Personas</h1>
                {
                    selectTeam ? (

                        <p className="subtituloT">{((Object.entries(team)[1])[1])}</p>
                    ) :
                        (
                            <p className="subtituloT">*Seleccione un taller*</p>
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
        selectTeam: getSelectedTeam(state) !== null,
        team: getTeam(state, getSelectedTeam(state)),
    }),
    undefined,
)(ShowPersons);

export default ShowPersons;