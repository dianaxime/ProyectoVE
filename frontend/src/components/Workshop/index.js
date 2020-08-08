import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBIcon } from 'mdbreact';
import { connect } from 'react-redux';
import clsx from 'clsx';
import {
    getAuthToken,
    getIsOpen
} from '../../reducers';
import * as selectors from '../../reducers';
import Nav from '../Nav';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { reset, Field, reduxForm } from 'redux-form';
import * as actions from '../../actions/workshops';
import * as selectedActions from '../../actions/selectedWorkshop';
import './styles.css';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const drawerWidth = 240;

const validate = values => {
    const errors = {};
    const requiredFields = [ 'name', 'startdate', 'enddate', 'classroom', 'description'];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Obligatorio*';
        }
    })
    return errors;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

const Workshop = ({ 
    workshop,
    name, 
    isConfirmed = false,
    isSelected = false,
    onClick,
  }) => (
      <div className='workshopBox'>
    <MDBRow>
      <MDBCol md='4'>
        <MDBCard>
          <MDBCardBody className='elegant-color white-text rounded-bottom'>
            <MDBCardTitle>{((Object.entries(workshop)[1])[1])}</MDBCardTitle>
            <hr className='hr-light' />
            <MDBCardText className='white-text'>
            {((Object.entries(workshop)[3])[1])}
            </MDBCardText>
            <MDBCardText className='white-text'>
            Salón: {((Object.entries(workshop)[2])[1])}
            </MDBCardText>
            <a href='/' className='black-text d-flex justify-content-end'>
              <h5 className='white-text'>
                Ver más
                <MDBIcon icon='angle-double-right' className='ml-2' />
              </h5>
            </a>
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
      
      
      /*isSelected: selectors.getSelectedworkshop(state) === index,*/
    }),
    (dispatch, {id}) => ({
      onClick() {
        dispatch(selectedActions.selectedWorkshop(id));
        console.log(((Object.entries(id)[1])[1]))
      },
    }),
  )(Workshop);

  /*
<div
      className={
        `
        workshop-wrapper
          ${isSelected ? 'workshop--clicked' : ''}
        `
        
      }
      onClick={onClick}
    >  
          <div className="workshop">            
            <div className="workshop_name">
              <p className="contenido">
                 {((Object.entries(workshop)[1])[1])}
                 </p>
            </div>
          </div>
        </div>*/