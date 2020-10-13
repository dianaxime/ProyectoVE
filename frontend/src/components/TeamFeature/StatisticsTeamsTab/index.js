import { connect } from 'react-redux';
import { getAuthToken, 
getIsOpen,
getPlayers,
getPlayersSport,
getTeamsT,
getTeamsTSport,
getGendert,
getGendertSport 
} from '../../../reducers';
import { URL } from '../../../settings';
import StatisticsTeamsForm from '../StatisticsTeamsForm';
import StatisticsTeamsSportForm from '../StatisticsTeamsSportForm';
import React, { useState } from "react";
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";


let StatisticsTeamsTab = ({players, playersSport, teamsT, teamstSport, genderM, genderF}) => {
  const [activeItem, changeActiveItem] = useState('1');
  return (
      <MDBContainer className="chart-background">
        <MDBNav className="nav-tabs mt-5">
          <MDBNavItem>
            <MDBNavLink link to="#" active={activeItem === "1"} onClick={() => changeActiveItem("1")} role="tab">
              Por fecha
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink link to="#" active={activeItem === "2"} onClick={() => changeActiveItem("2")} role="tab" >
              Por deporte
            </MDBNavLink>
          </MDBNavItem>
        </MDBNav>
        <MDBTabContent activeItem={activeItem} >
          <MDBTabPane tabId="1" role="tabpanel" >
            <div className="mt-2">
              <StatisticsTeamsForm />
            </div>
            <MDBContainer>
            </MDBContainer>
          </MDBTabPane>
          <MDBTabPane tabId="2" role="tabpanel">
            <div className="mt-2">
              <StatisticsTeamsSportForm />
            </div>
          </MDBTabPane>
        </MDBTabContent>
      </MDBContainer>
    );
}

export default connect(
  state => ({
      isAuth: getAuthToken(state) !== null,
      open: getIsOpen(state),
      players: getPlayers(state),
      playersSport: getPlayersSport(state),
      teamsT: getTeamsT(state),
      teamstSport: getTeamsTSport(state),
      genderM: getGendert(state),
      genderF: getGendertSport(state),
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
)(StatisticsTeamsTab);
