import React from 'react';
import {
  Link,
  Redirect,
} from "react-router-dom";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol } from 'mdbreact';
import { connect } from 'react-redux';
import * as selectors from '../../reducers';
import * as selectedActions from '../../actions/selectedWorkshop';
import './styles.css';
import { Button } from '@material-ui/core';

const Workshop = ({ 
    workshop,
    onClick,
    onEdit=false,
  }) => (
      <div className='workshopBox'>
    <MDBRow>
      <MDBCol md='4'>
        <MDBCard>
          <MDBCardBody className='elegant-color white-text rounded-bottom, carta'>
            <div className="tituloCard">
              <MDBCardTitle className="titulotaller">{((Object.entries(workshop)[1])[1])}</MDBCardTitle>
              <Link to='/editartaller'>
                <Button onClick={onEdit} className='edit_button'>
                <img className='icono'src="https://www.materialui.co/materialIcons/editor/mode_edit_white_192x192.png" alt="img"/>
                </Button>
              </Link>
            </div>
            <hr className='hr-light' />
            <MDBCardText className='des'>
            {((Object.entries(workshop)[3])[1])}
            </MDBCardText>
            <MDBCardText className='white-text'>
            Salón: {((Object.entries(workshop)[2])[1])}
            </MDBCardText>
            <Link to='/taller'>
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
      ...selectors.getWorkshop(state, id),
      workshop: selectors.getWorkshop(state, id),
      isSelected: selectors.getSelectedWorkshop(state) === id,
      //name: ((Object.entries(workshop)[1])[1]),
    }),
    (dispatch, {id}) => ({
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
