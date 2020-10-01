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
import DateRangeIcon from '@material-ui/icons/DateRange';
import BarChartIcon from '@material-ui/icons/BarChart';

const AssociationClubSession = ({
  associationClub,
  onClick,
  onEdit = false,
}) => (
    <div className='SessionBox'>
      <MDBCard style={{ height: '14rem' }}>
        <MDBCardBody className='elegant-color white-text rounded-bottom, carta'>
          <MDBRow>
            <MDBCol size="8">
              <MDBCardTitle className="tituloSession">{((Object.entries(associationClub)[1])[1])}</MDBCardTitle>
            </MDBCol>
            <MDBCol size="2" style={{ paddingRight: '5px', paddingLeft: '5px' }}>
              <Link to='/editarAsociacionClub'>
                <IconButton onClick={onEdit} style={{ padding: '0px' }}>
                  <EditIcon className="iconosessions" />
                </IconButton>
              </Link>
            </MDBCol>
            <MDBCol size="2" style={{ paddingLeft: '5px', paddingRight: '5px' }}>
              <Link to='/session' onClick={onEdit}>
                <IconButton style={{ padding: '0px' }} >
                  <AddIcon className="iconosessions" />
                </IconButton>
              </Link>
            </MDBCol>
          </MDBRow>
          <hr className='hr-light' />
          <MDBCardText className='dessessions line-clamp'>
            {((Object.entries(associationClub)[3])[1])}
          </MDBCardText>
          <MDBRow>
            <MDBCol md='6'>
              <Link to='/session'>
                <button className='all-sessions1'>
                  <DateRangeIcon className="iconosessions"/>
                </button>
              </Link>
            </MDBCol>
            <MDBCol md='6'>
              <Link to='/session'>
                <button className='all-sessions'>
                  <BarChartIcon className="iconosessions"/>
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
