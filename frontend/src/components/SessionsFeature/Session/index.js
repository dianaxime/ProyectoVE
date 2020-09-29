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
import AddIcon from '@material-ui/icons/Add';

const AssociationClubSession = ({
  associationClub,
  onClick,
  onEdit = false,
}) => (
    <div className='associationClubBox'>
      <MDBCard style={{ height: '14rem' }}>
        <MDBCardBody className='elegant-color white-text rounded-bottom, carta'>
          <MDBRow>
            <MDBCol >
              <MDBCardTitle className="tituloAC">{((Object.entries(associationClub)[1])[1])}</MDBCardTitle>
            </MDBCol>
            <MDBCol size="2">
              <Link to='/editarAsociacionClub'>
                <IconButton onClick={onEdit}>
                  <EditIcon className="iconoedit" />
                </IconButton>
              </Link>
            </MDBCol>
            <MDBCol size="3">
              <Link to='/session'>
                <IconButton  >
                  <AddIcon className="iconoedit"/>
                </IconButton>
              </Link>
            </MDBCol>
          </MDBRow>
          <hr className='hr-light' />
          <MDBCardText className='desevent line-clamp'>
            {((Object.entries(associationClub)[3])[1])}
          </MDBCardText>
          <MDBRow>
            <MDBCol md='6'>
              <MDBCardText className='white-text'>
                Tipo: {((Object.entries(associationClub)[2])[1])}
              </MDBCardText>
            </MDBCol>
            <MDBCol md='6'>
              <Link to='/asociacionesClub'>
                <button className='more_ac' onClick={onClick}>
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
    ...selectors.getAssociationClub(state, id),
    associationClub: selectors.getAssociationClub(state, id),
    isSelected: selectors.getSelectedAssociationClub(state) === id,
    //name: ((Object.entries(associationClub)[1])[1]),
  }),
  (dispatch, { id }) => ({
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
)(AssociationClubSession);
