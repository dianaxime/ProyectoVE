import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBIcon } from 'mdbreact';
import { connect } from 'react-redux';
import {
    getAuthToken,
    getIsOpen
} from '../../reducers';
import * as selectors from '../../reducers';
import Nav from '../Nav';
import * as actions from '../../actions/workshops';
import * as selectedActions from '../../actions/selectedWorkshop';
import './styles.css';
import { Button } from '@material-ui/core';

const drawerWidth = 240;


const Workshop = ({ 
    workshop,
    name, 
    isConfirmed = false,
    isSelected = false,
    onClick,
    onEdit=false,
  }) => (
      <div className='workshopBox'>
    <MDBRow>
      <MDBCol md='4'>
        <MDBCard>
          <MDBCardBody className='elegant-color white-text rounded-bottom'>
            <MDBCardTitle>{((Object.entries(workshop)[1])[1])}
            <Link to='/editartaller'>
              <Button onClick={onEdit} className='edit_button'>
              <img className='icono'src="https://www.materialui.co/materialIcons/editor/mode_edit_white_192x192.png"/>
              </Button>
            </Link>
            </MDBCardTitle>
            <hr className='hr-light' />
            <MDBCardText className='white-text'>
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
      workshop: id,
      isSelected: selectors.getSelectedWorkshop(state) === id,
      name: ((Object.entries(id)[1])[1]),
    }),
    (dispatch, {id}) => ({
      onClick() {
        dispatch(selectedActions.selectedWorkshop(id));
        dispatch(<Redirect to='/' />);
        console.log(((Object.entries(id)[1])[1]))
      },
      onEdit() {
        dispatch(selectedActions.selectedWorkshop(id));
        dispatch(<Redirect to='/' />);
        console.log(((Object.entries(id)[1])[1]))
      },
    }),
  )(Workshop);
