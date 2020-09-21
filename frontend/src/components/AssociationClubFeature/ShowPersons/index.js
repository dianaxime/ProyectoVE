import React from 'react';
import { connect } from 'react-redux';
import {
    getAuthToken,
    getIsOpen,
    getAssociationClub,
    getSelectedAssociationClub,
} from '../../../reducers';
import './styles.css';
import ShowPerson from '../ShowPerson';


let ShowPersons = ({
    selectAC,
    associationClub,
}) => {
    return (
        <div className="personasWorkshop">
            <div className="formP">
                <h1 className="subP">Personas</h1>
                {
                    selectAC ? (

                        <p className="subtituloT">{((Object.entries(associationClub)[1])[1])}</p>
                    ) :
                        (
                            <p className="subtituloT">*Seleccione una Asociación o Club*</p>
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
        selectAC: getSelectedAssociationClub(state) !== null,
        associationClub: getAssociationClub(state, getSelectedAssociationClub(state)),
    }),
    undefined,
)(ShowPersons);

export default ShowPersons;