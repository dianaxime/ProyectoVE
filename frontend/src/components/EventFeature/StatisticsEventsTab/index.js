import { connect } from 'react-redux';
import {
  getAuthToken,
  getIsOpen,
  getFemaleScholars,
  getMaleScholars,
  getCountEvents,
} from '../../../reducers';
import { URL } from '../../../settings';
import StatisticsEventsForm from '../StatisticsEventsForm';
import React, { useState } from "react";
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBRow, MDBCol } from "mdbreact";
import Avatar from '@material-ui/core/Avatar';
import EventIcon from '@material-ui/icons/Event';
import FaceIcon from '@material-ui/icons/Face';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import { makeStyles } from '@material-ui/core/styles';
import './styles.css';

const useStyles = makeStyles((theme) => ({
  green: {
    color: '#fff',
    backgroundColor: "#28A745",
  },
  darkgreen: {
    color: '#fff',
    backgroundColor: "#17A638",
  },
  blue: {
    color: '#fff',
    backgroundColor: "#1ED9B3",
  },
  violet: {
    color: '#fff',
    backgroundColor: "#D01ED9",
  },
}));

let StatisticsEventsTab = ({ FS, MS, events }) => {
  const [activeItem, changeActiveItem] = useState('1');
  const classes = useStyles();
  return (
    <MDBContainer className="chart-background">
      <MDBNav className="nav-tabs mt-5">
        <MDBNavItem>
          <MDBNavLink link to="#" active={activeItem === "1"} onClick={() => changeActiveItem("1")} role="tab">
            Participación
            </MDBNavLink>
        </MDBNavItem>
      </MDBNav>
      {
        console.log(FS, MS, events)
      }
      <MDBTabContent activeItem={activeItem} >
        <MDBTabPane tabId="1" role="tabpanel" >
          <div className="mt-2">
            <StatisticsEventsForm />
          </div>
          <MDBContainer>
            <h3 className="mt-5">Participación en eventos de horas beca</h3>
            <MDBRow className="space">
              <MDBCol>
                <MDBRow>
                  <Avatar className={classes.green}>
                    <EventIcon />
                  </Avatar>
                  <h6 className="letra">Eventos | {events.count}</h6>
                </MDBRow>
              </MDBCol>
              <MDBCol>
                <MDBRow>
                  <Avatar className={classes.darkgreen}>
                    <EmojiPeopleIcon />
                  </Avatar>
                  <h6 className="letra">Participantes | {FS.count + MS.count}</h6>
                </MDBRow>
              </MDBCol>
            </MDBRow>
            <MDBRow className="space">
              <MDBCol>
                <MDBRow>
                <Avatar className={classes.blue}>
                  <FaceIcon />
                </Avatar>
                <h6 className="letra">Participantes | {MS.count}</h6>
                </MDBRow>
              </MDBCol>
              <MDBCol>
                <MDBRow>
                  <Avatar className={classes.violet}>
                    <FaceIcon />
                  </Avatar>
                  <h6 className="letra">Participantes | {FS.count}</h6>
                </MDBRow>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBTabPane>
      </MDBTabContent>
    </MDBContainer>
  );
}

export default connect(
  state => ({
    isAuth: getAuthToken(state) !== null,
    open: getIsOpen(state),
    FS: getFemaleScholars(state),
    MS: getMaleScholars(state),
    events: getCountEvents(state),
  }),
  undefined,
  (stateProps, disptachProps, ownProps) => {
    if (!stateProps.isAuth) {
      window.location.href = URL + 'auth';
    }
    return ({
      ...stateProps,
      ...disptachProps,
      ...ownProps,
    });
  }
)(StatisticsEventsTab);
