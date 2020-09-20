import React from 'react';
import {
  Link,
  Redirect,
} from "react-router-dom";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol } from 'mdbreact';
import { connect } from 'react-redux';
import * as selectors from '../../../reducers';
import * as selectedActions from '../../../actions/selectedWorkshop';
import './styles.css';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const Workshop = ({
  workshop,
  onClick,
  onEdit = false,
}) => (
    <div className='workshopBoxs'>
      <MDBCard style={{ height: '14rem' }}>
        <MDBCardBody className='elegant-color white-text rounded-bottom, carta'>
          <MDBRow>
            <MDBCol md='8'>
              <MDBCardTitle className="titulotallers">{((Object.entries(workshop)[1])[1])}</MDBCardTitle>
            </MDBCol>
            <MDBCol md='4'>
              <Link to='/editartaller'>
                <IconButton onClick={onEdit}>
                  <EditIcon className="iconoedit" />
                </IconButton>
              </Link>
            </MDBCol>
          </MDBRow>
          <hr className='hr-light' />
          <MDBCardText className='dess line-clamp'>
            {((Object.entries(workshop)[3])[1])}
          </MDBCardText>
          <MDBRow>
            <MDBCol md='6'>
              <MDBCardText className='white-text'>
                Salón: {((Object.entries(workshop)[2])[1])}
              </MDBCardText>
            </MDBCol>
            <MDBCol md='6'>
              <Link to='/taller'>
                <button className='more_buttons' onClick={onClick}>
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
    ...selectors.getWorkshop(state, id),
    workshop: selectors.getWorkshop(state, id),
    isSelected: selectors.getSelectedWorkshop(state) === id,
    //name: ((Object.entries(workshop)[1])[1]),
  }),
  (dispatch, { id }) => ({
    onClick() {
      dispatch(selectedActions.selectedWorkshop(id));
      dispatch(<Redirect to='/' />);
      // console.log(((Object.entries(id)[1])[1]))
    },
    onEdit() {
      dispatch(selectedActions.selectedWorkshop(id));
      dispatch(<Redirect to='/' />);
      //console.log(((Object.entries(id)[1])[1]))
    },
  }),
)(Workshop);
