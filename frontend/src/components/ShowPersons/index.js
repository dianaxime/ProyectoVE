import React from 'react';
import { connect } from 'react-redux';
import {
    getAuthToken,
    getIsOpen,
    getWorkshop,
    getSelectedWorkshop,
} from '../../reducers';
import './styles.css';
import ShowPerson from '../ShowPerson';


let ShowPersons = ({
    selectWorkshop,
    workshop,
}) => {
    return (
        <div className="personasWorkshop">
            <div className="formP">
                <h1 className="subP">Personas</h1>
                {
                    selectWorkshop ? (

                        <p className="subtituloT">{((Object.entries(workshop)[1])[1])}</p>
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
        selectWorkshop: getSelectedWorkshop(state) !== null,
        workshop: getWorkshop(state, getSelectedWorkshop(state)),
    }),
    undefined,
)(ShowPersons);

export default ShowPersons;