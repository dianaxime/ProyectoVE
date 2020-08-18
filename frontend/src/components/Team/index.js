import React from 'react';
import {
  Link,
  Redirect,
} from "react-router-dom";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol } from 'mdbreact';
import { connect } from 'react-redux';
import * as selectors from '../../reducers';
import * as selectedActions from '../../actions/selectedTeam';
import './style.css';
import { Button } from '@material-ui/core';

const ICON_EDIT = "https://www.materialui.co/materialIcons/editor/mode_edit_white_192x192.png"; 

const Team = ({ 
    team,
    onClick,
    onEdit=false,
  }) => (
      <div className='teamBox'>
    <MDBRow>
      <MDBCol md='4'>
        <MDBCard>
          <MDBCardBody className='elegant-color white-text rounded-bottom'>
            <MDBCardTitle>{((Object.entries(team)[1])[1])}
            <Link to='/editartaller'>
              <Button onClick={onEdit} className='edit_button'>
              <img className='icono'src={ICON_EDIT} alt="img"/>
              </Button>
            </Link>
            </MDBCardTitle>
            <hr className='hr-light' />
            <MDBCardText className='white-text'>
            {((Object.entries(team)[3])[1])}
            </MDBCardText>
            <Link to='/equipo'>
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
      ...selectors.getTeam(state, id),
      team: selectors.getTeam(state, id),
      isSelected: selectors.getSelectedTeam(state) === id,
    }),
    (dispatch, {id}) => ({
      onClick() {
        dispatch(selectedActions.selectedTeam(id));
        dispatch(<Redirect to='/' />);
      },
      onEdit() {
        dispatch(selectedActions.selectedTeam(id));
        dispatch(<Redirect to='/' />);
      },
    }),
  )(Team);
