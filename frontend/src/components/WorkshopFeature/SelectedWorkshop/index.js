import React from 'react';
import { connect } from 'react-redux';
import { MDBCard, MDBCardBody, MDBIcon, MDBCardImage, MDBRow, MDBCol, MDBCardText } from 'mdbreact';
import {
    getAuthToken,
    getWorkshop,
    getSelectedWorkshop
} from '../../../reducers';
import './styles.css';
import moment from 'moment';
import { Link } from "react-router-dom";


let SelectedWorkshop = ({
    name, startdate, enddate, classroom, description,
}) => {
    return (
        <div className="dataWorkshopw">
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
                    <MDBCol md='4'>
                        <Link to="/talleres">
                            <button className="kc_fab_main_btn">
                                <MDBIcon icon='chevron-left' />
                            </button>
                        </Link>
                    </MDBCol>
                    <MDBCol md='8'>
                        <div style={{ padding: '1rem' }}>
                            {classroom}
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

SelectedWorkshop = connect(
    state => ({
        isLoading: false,
        isAuth: getAuthToken(state) !== null,
        name: getWorkshop(state, getSelectedWorkshop(state)).name,
        description: getWorkshop(state, getSelectedWorkshop(state)).description,
        startdate: getWorkshop(state, getSelectedWorkshop(state)).startdate,
        enddate: getWorkshop(state, getSelectedWorkshop(state)).enddate,
        classroom: getWorkshop(state, getSelectedWorkshop(state)).classroom,
    }),
)(SelectedWorkshop);

export default SelectedWorkshop;