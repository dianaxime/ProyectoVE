import React from 'react';
import { connect } from 'react-redux';
import { MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol } from
'mdbreact';
import {
    getAuthToken,
    getAssociationClub,
    getSelectedAssociationClub
} from '../../../reducers';
import './styles.css';
import moment from 'moment';

let SelectedAssociationClub = ({
    name, startdate, enddate, type, description,
    }) => {
    return (
        <div className="dataWorkshop">
            <MDBRow>
                <MDBCol col='4'>
                    <MDBCard className="cartaT">
                    <MDBCardImage
                        className="tituloWorkshop"
                        tag='div'
                    >
                        <h2>{name}</h2>
                    </MDBCardImage>
                    <MDBCardBody cascade className='text-center'>
                        <h5 className="descr">{description}</h5>
                        <h5 className="sdatetitle">Inicio</h5>   
                        <h5 className="sdate">{moment(startdate).format('L')}</h5>
                        <h5 className="edatetitle">Fin</h5>
                        <h5 className="edate">{moment(enddate).format('L')}</h5>
                        <hr />
                        <div className='text-center'>
                        {type}
                        </div>
                    </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </div>
    );
}

SelectedAssociationClub = connect(
    state => ({
        isLoading: false,
        isAuth: getAuthToken(state) !== null,
        name: getAssociationClub(state, getSelectedAssociationClub(state)).name,
        description: getAssociationClub(state, getSelectedAssociationClub(state)).description,
        startdate: getAssociationClub(state, getSelectedAssociationClub(state)).startdate,
        enddate: getAssociationClub(state, getSelectedAssociationClub(state)).enddate,
        type: getAssociationClub(state, getSelectedAssociationClub(state)).type,
    }),
)(SelectedAssociationClub);

export default SelectedAssociationClub;