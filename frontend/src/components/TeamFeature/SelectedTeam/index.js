import React from 'react';
import { connect } from 'react-redux';
import { MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon } from
    'mdbreact';
import {
    getAuthToken,
    getTeam,
    getSelectedTeam
} from '../../../reducers';
import './styles.css';
import moment from 'moment';
import { Link } from "react-router-dom";

let SelectedTeam = ({
    name, startdate, enddate, sport,
}) => {
    return (
        <div className="dataWorkshop">
            <MDBCard className="cartaT">
                <MDBCardImage
                    className='view view-cascade gradient-card-header heavy-rain-gradient'
                    cascade
                    tag='div'
                >
                    <h2 className='h2-responsive mb-2' style={{ padding: '1rem' }}>{name}</h2>
                    <MDBRow>
                        <MDBCol>
                            <p>
                                <MDBIcon far icon='calendar' />  {moment(startdate).format('L')}
                            </p>
                        </MDBCol>
                        <MDBCol>
                            <p>
                                <MDBIcon far icon='calendar' />  {moment(enddate).format('L')}
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBCardImage>
                <MDBRow start>
                    <Link to="/equipos">
                        <button className="kc_fab_main_btn">
                            <MDBIcon icon='chevron-left' />
                        </button>
                    </Link>
                </MDBRow>
                <MDBCardBody cascade className='text-center'>
                    <h5 className="descr">{sport}</h5>
                </MDBCardBody>
            </MDBCard>
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