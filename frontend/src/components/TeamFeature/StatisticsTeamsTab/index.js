import { connect } from 'react-redux';
import {
  getAuthToken,
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
import { VictoryChart, VictoryBar, VictoryGroup, VictoryLabel, VictoryLegend } from 'victory';


let StatisticsTeamsTab = ({ players, playersSport, teamsT, teamstSport, genderM, genderF }) => {
  const [activeItem, changeActiveItem] = useState('2');
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
          <div style={{ width: "500px", height: "400px" }}>
            {
              genderF !== null && genderM !== null && (
                <VictoryChart>
                  <VictoryLegend 
                    x={125} y={10}
                    orientation="horizontal"
                    gutter={20}
                    style={{ border: { stroke: "black" }}}
                    data={[
                      { name: "F", symbol: { fill: "orange" } },
                      { name: "M", symbol: { fill: "gold" } }
                    ]}
                  />
                  <VictoryGroup offset={25}
                    colorScale={["orange", "gold"]}
                  >
                    <VictoryBar
                      data={genderF}
                      x={"sport"}
                      y={"count"}
                      labels={({ datum }) => datum.count}
                      style={{ labels: { fill: "white" } }}
                      labelComponent={<VictoryLabel dy={30} />}
                    />
                    <VictoryBar
                      data={genderM}
                      x={"sport"}
                      y={"count"}
                      labels={({ datum }) => datum.count}
                      style={{ labels: { fill: "white" } }}
                      labelComponent={<VictoryLabel dy={30} />}
                    />
                  </VictoryGroup>
                </VictoryChart>
              )
            }
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
