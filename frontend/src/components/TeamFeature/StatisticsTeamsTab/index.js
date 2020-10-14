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
import { VictoryChart, VictoryBar, VictoryGroup, VictoryLabel, VictoryLegend, VictoryAxis } from 'victory';
import './styles.css';


let StatisticsTeamsTab = ({ players, playersSport, teamsT, teamstSport, genderM, genderF }) => {
  const [activeItem, changeActiveItem] = useState('2');
  return (
    <MDBContainer className="chart-background">
      <MDBNav className="nav-tabs mt-5">
        <MDBNavItem>
          <MDBNavLink link to="#" active={activeItem === "1"} onClick={() => changeActiveItem("1")} role="tab">
            Por deporte
            </MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink link to="#" active={activeItem === "2"} onClick={() => changeActiveItem("2")} role="tab" >
            Por genero
            </MDBNavLink>
        </MDBNavItem>
      </MDBNav>
      <MDBTabContent activeItem={activeItem} >
        <MDBTabPane tabId="1" role="tabpanel" >
          <div className="mt-2">
            <StatisticsTeamsForm />
          </div>
          <h3 className="title-graphs">Torneos Internos | {players.count}</h3>
          <div className="estadisticas" style={{ width: "500px", height: "400px" }}>
            {
              playersSport !== null && (
                <VictoryChart 
                  domainPadding={30} >
                    <VictoryAxis
                      label="deporte"
                      style={{
                        axisLabel: { padding: 30 }
                      }}
                    />
                    <VictoryAxis dependentAxis
                      label="jugadores"
                      style={{
                        axisLabel: { padding: 40 }
                      }}
                    />
                    <VictoryGroup offset={25}
                    colorScale={["green"]}>
                      <VictoryBar
                      data={playersSport}
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
          <h3 className="title-graphs2">Equipos | {teamstSport.count}</h3>
          <div className="estadisticas" style={{ width: "500px", height: "400px" }}>
            {
              teamsT !== null && (
                <VictoryChart 
                  domainPadding={30} >
                    <VictoryAxis
                      label="deporte"
                      style={{
                        axisLabel: { padding: 30 }
                      }}
                    />
                    <VictoryAxis dependentAxis
                      label="equipos"
                      style={{
                        axisLabel: { padding: 40 }
                      }}
                    />
                    <VictoryGroup offset={25}
                    colorScale={["#0C591E"]}>
                      <VictoryBar
                      data={teamsT}
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
          <MDBContainer>
          </MDBContainer>
        </MDBTabPane>
        <MDBTabPane tabId="2" role="tabpanel">
          <div className="mt-2">
            <StatisticsTeamsSportForm />
          </div>
          <h3 className="title-graphs">Torneos Internos | {players.count}</h3>
          <div style={{ width: "500px", height: "400px" }}>
            {
              genderF !== null && genderM !== null && (
                <VictoryChart domainPadding={30} >
                  <VictoryAxis
                    label="deporte"
                    style={{
                      axisLabel: { padding: 30 }
                    }}
                  />
                  <VictoryAxis dependentAxis
                    label="jugadores"
                    style={{
                      axisLabel: { padding: 40 }
                    }}
                  />
                  <VictoryLegend 
                    x={125} y={10}
                    orientation="horizontal"
                    gutter={20}
                    style={{ border: { stroke: "black" }}}
                    data={[
                      { name: "F", symbol: { fill: "green" } },
                      { name: "M", symbol: { fill: "#0C591E" } }
                    ]}
                  />
                  <VictoryGroup offset={25}
                    colorScale={["green", "#0C591E"]}
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
