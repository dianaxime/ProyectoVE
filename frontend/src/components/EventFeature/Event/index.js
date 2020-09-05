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
    onEdit=false,
  }) => (
      <div className='eventBox'>
    <MDBRow>
      <MDBCol md='4'>
        <MDBCard>
          <MDBCardBody className='elegant-color white-text rounded-bottom, carta'>
            <div className="tituloCard">
              <MDBCardTitle className="tituloevento">{((Object.entries(event)[1])[1])}</MDBCardTitle>
              <Link to='/editarevento'>
              <IconButton onClick={onEdit}>
               <EditIcon  className="iconoedit"/>
              </IconButton>
              </Link>
            </div>
            <hr className='hr-light' />
            <MDBCardText className='des'>
            {((Object.entries(event)[3])[1])}
            </MDBCardText>
            <MDBCardText className='white-text'>
            Salón: {((Object.entries(event)[2])[1])}
            </MDBCardText>
            <Link to='/evento'>
              <button className='more_button' onClick={onClick}>
              VER MÁS
              </button>
            </Link>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
    </div>
  );
  
  export default connect(
    (state, { id }) => ({
      ...selectors.getEvent(state, id),
      event: selectors.getEvent(state, id),
      isSelected: selectors.getSelectedEvent(state) === id,
    }),
    (dispatch, {id}) => ({
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
