import React from 'react';
import { connect } from 'react-redux';
import { MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon, MDBCardText } from
    'mdbreact';
import {
    getAuthToken,
    getEvent,
    getSelectedEvent
} from '../../../reducers';
import './styles.css';
import moment from 'moment';
import { Link } from "react-router-dom";

let SelectedEvent = ({
    name, classroom, description, date
}) => {
    return (
        <div className="dataEvent">
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
                                <MDBIcon far icon='calendar' />  {moment(date).format('L')}
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBCardImage>
                <MDBRow start>
                    <MDBCol md='0'>
                        <Link to="/eventos">
                            <button className="kc_fab_main_btn">
                                <MDBIcon icon='chevron-left' />
                            </button>
                        </Link>
                    </MDBCol>
                    <MDBCol md='12'>
                        <div className='text-center' style={{ padding: '1rem' }}>
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

SelectedEvent = connect(
    state => ({
        isLoading: false,
        isAuth: getAuthToken(state) !== null,
        name: getEvent(state, getSelectedEvent(state)).name,
        description: getEvent(state, getSelectedEvent(state)).description,
        classroom: getEvent(state, getSelectedEvent(state)).classroom,
        date: getEvent(state, getSelectedEvent(state)).date,
    }),
)(SelectedEvent);

export default SelectedEvent;