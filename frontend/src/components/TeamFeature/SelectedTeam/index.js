import React from 'react';
import { connect } from 'react-redux';
import { MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol } from
'mdbreact';
import {
    getAuthToken,
    getTeam,
    getSelectedTeam
} from '../../../reducers';
import './styles.css';
import moment from 'moment';


let SelectedTeam = ({
    name, startdate, enddate, sport,
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
                        <h5 className="descr">{sport}</h5>
                        <h5 className="sdatetitle">Inicio</h5>   
                        <h5 className="sdate">{moment(startdate).format('L')}</h5>
                        <h5 className="edatetitle">Fin</h5>
                        <h5 className="edate">{moment(enddate).format('L')}</h5>
                    </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </div>
    );
}

SelectedTeam = connect(
    state => ({
        isLoading: false,
        isAuth: getAuthToken(state) !== null,
        name: getTeam(state, getSelectedTeam(state)).name,
        sport: getTeam(state, getSelectedTeam(state)).sport,
        startdate: getTeam(state, getSelectedTeam(state)).startdate,
        enddate: getTeam(state, getSelectedTeam(state)).enddate,
    }),
)(SelectedTeam);

export default SelectedTeam;