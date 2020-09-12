import React from 'react';
import {
  Link,
  Redirect,
} from "react-router-dom";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol } from 'mdbreact';
import { connect } from 'react-redux';
import * as selectors from '../../../reducers';
import * as selectedActions from '../../../actions/selectedAssociationClub';
import './styles.css';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const AssociationClub = ({ 
    associationClub,
    onClick,
    onEdit=false,
  }) => (
      <div className='associationClubBox'>
    <MDBRow>
      <MDBCol md='4'>
        <MDBCard>
          <MDBCardBody className='elegant-color white-text rounded-bottom, carta'>
            <div className="tituloCard">
              <MDBCardTitle className="tituloAC">{((Object.entries(associationClub)[1])[1])}</MDBCardTitle>
              <Link to='/editarAsociacionClub'>
              <IconButton onClick={onEdit}>
               <EditIcon  className="iconoedit"/>
              </IconButton>
              </Link>
            </div>
            <hr className='hr-light' />
            <MDBCardText className='des'>
            {((Object.entries(associationClub)[3])[1])}
            </MDBCardText>
            <MDBCardText className='white-text'>
            Tipo: {((Object.entries(associationClub)[2])[1])}
            </MDBCardText>
            <Link to='/asociacionClub'>
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
      ...selectors.getAssociationClub(state, id),
      associationClub: selectors.getAssociationClub(state, id),
      isSelected: selectors.getSelectedAssociationClub(state) === id,
      //name: ((Object.entries(associationClub)[1])[1]),
    }),
    (dispatch, {id}) => ({
      onClick() {
        dispatch(selectedActions.selectedAssociationClub(id));
        dispatch(<Redirect to='/' />);
        // console.log(((Object.entries(id)[1])[1]))
      },
      onEdit() {
        dispatch(selectedActions.selectedAssociationClub(id));
        dispatch(<Redirect to='/' />);
        //console.log(((Object.entries(id)[1])[1]))
      },
    }),
  )(AssociationClub);
