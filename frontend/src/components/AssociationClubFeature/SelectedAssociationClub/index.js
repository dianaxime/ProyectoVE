import React from 'react';
import { connect } from 'react-redux';
import { MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon, MDBCardText } from
    'mdbreact';
import {
    getAuthToken,
    getAssociationClub,
    getSelectedAssociationClub
} from '../../../reducers';
import './styles.css';
import moment from 'moment';
import { Link } from "react-router-dom";

let SelectedAssociationClub = ({
    name, startdate, enddate, type, description,
}) => {
    return (
        <div className="dataAC">
            <MDBCard wide style={{ width: "22rem" }}>
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
                    <MDBCol md='0'>
                        <Link to="/asociacionesClubs">
                            <button className="kc_fab_main_btn">
                                <MDBIcon icon='chevron-left' />
                            </button>
                        </Link>
                    </MDBCol>
                    <MDBCol md='12'>
                        <div className='text-center' style={{ padding: '1rem' }}>
                            {type}
                        </div>
                    </MDBCol>
                </MDBRow>
                <MDBCardBody cascade className='text-center'>
                    <MDBCardText>{description}</MDBCardText>
                </MDBCardBody>
            </MDBCard>
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