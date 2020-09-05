import React from 'react';
import { connect } from 'react-redux';
import { MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol } from
'mdbreact';
import {
    getAuthToken,
    getEvent,
    getSelectedEvent
} from '../../../reducers';
import './styles.css';
import moment from 'moment';


let SelectedEvent = ({
    name, classroom, description, date
    }) => {
    return (
        <div className="dataEvent">
            <MDBRow>
                <MDBCol col='4'>
                    <MDBCard className="cartaE">
                    <MDBCardImage
                        className="tituloEvent"
                        tag='div'
                    >
                        <h2>{name}</h2>
                    </MDBCardImage>
                    <MDBCardBody cascade className='text-center'>
                        <h5 className="descr">{description}</h5>
                        <h5 className="sdatetitle">Fecha</h5>
                        <h5 className="edate">{moment(date).format('L')}</h5>
                        <hr />
                        <div className='text-center'>
                        {classroom}
                        </div>
                    </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
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