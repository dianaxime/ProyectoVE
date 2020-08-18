import React from 'react';
import {
  Link,
  Redirect,
} from "react-router-dom";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol } from 'mdbreact';
import { connect } from 'react-redux';
import * as selectors from '../../../reducers';
import * as selectedActions from '../../../actions/selectedTeam';
import './styles.css';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const Team = ({ 
    team,
    onClick,
    onEdit=false,
  }) => (
      <div className='workshopBox'>
    <MDBRow>
      <MDBCol md='4'>
        <MDBCard>
          <MDBCardBody className='elegant-color white-text rounded-bottom, carta'>
            <div className="tituloCard">
              <MDBCardTitle className="titulotaller">{((Object.entries(team)[1])[1])}</MDBCardTitle>
              <Link to='/editarequipo'>
              <IconButton onClick={onEdit}>
               <EditIcon  className="iconoedit"/>
              </IconButton>
              </Link>
            </div>
            <hr className='hr-light' />
            <MDBCardText className='white-text'>
            Deporte: {((Object.entries(team)[2])[1])}
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
