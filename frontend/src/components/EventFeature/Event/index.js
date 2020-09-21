import React from 'react';
import {
  Link,
  Redirect,
} from "react-router-dom";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol } from 'mdbreact';
import { connect } from 'react-redux';
import * as selectors from '../../../reducers';
import * as selectedActions from '../../../actions/selectedEvent';
import './styles.css';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const Event = ({
  event,
  onClick,
  onEdit = false,
}) => (
    <div className='eventBox'>
      <MDBCard style={{ height: '14rem' }}>
        <MDBCardBody className='elegant-color white-text rounded-bottom, carta'>
          <MDBRow>
            <MDBCol md='8'>
              <MDBCardTitle className="tituloevento">{((Object.entries(event)[1])[1])}</MDBCardTitle>
            </MDBCol>
            <MDBCol md='4'>
              <Link to='/editarevento'>
                <IconButton onClick={onEdit}>
                  <EditIcon className="iconoedit" />
                </IconButton>
              </Link>
            </MDBCol>
          </MDBRow>
          <hr className='hr-light' />
          <MDBCardText className='desevent line-clamp'>
            {((Object.entries(event)[3])[1])}
          </MDBCardText>
          <MDBRow>
            <MDBCol md='6'>
              <MDBCardText className='white-text'>
                Salón: {((Object.entries(event)[2])[1])}
              </MDBCardText>
            </MDBCol>
            <MDBCol md='6'>
              <Link to='/evento'>
                <button className='more_event' onClick={onClick}>
                  VER MÁS
                  </button>
              </Link>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </div>
  );

export default connect(
  (state, { id }) => ({
    ...selectors.getEvent(state, id),
    event: selectors.getEvent(state, id),
    isSelected: selectors.getSelectedEvent(state) === id,
  }),
  (dispatch, { id }) => ({
    onClick() {
      dispatch(selectedActions.selectedEvent(id));
      dispatch(<Redirect to='/' />);
    },
    onEdit() {
      dispatch(selectedActions.selectedEvent(id));
      dispatch(<Redirect to='/' />);
    },
  }),
)(Event);
