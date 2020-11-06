import { connect } from 'react-redux';
import {
  getAuthToken,
  getIsOpen,
  getParticipationArtClub,
  getParticipationArtClubs,
  getParticipationArtClubF,
  getParticipationArtClubM,
} from '../../../reducers';
import { URL } from '../../../settings';
import StatisticsACForm from '../StatisticsACForm';
import ArtForm from '../ArtForm';
import AgrupForm from '../AgrupForm';
import DeportForm from '../DeportForm';
import AcadForm from '../AcadForm';
import React, { useState } from "react";
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import { VictoryChart, VictoryBar, VictoryGroup, VictoryLabel, VictoryLegend, VictoryAxis } from 'victory';

let StatisticsACTab = ({ artClub, artClubs, artClubF, artClubM }) => {
  const [activeItem, changeActiveItem] = useState('1');
  return (
    <MDBContainer className="chart-background">
      <MDBNav className="nav-tabs mt-5">
        <MDBNavItem>
          <MDBNavLink link to="#" active={activeItem === "1"} onClick={() => changeActiveItem("1")} role="tab">
            Asociaciones
            </MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink link to="#" active={activeItem === "2"} onClick={() => changeActiveItem("2")} role="tab">
            Clubes Artísticos
            </MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink link to="#" active={activeItem === "3"} onClick={() => changeActiveItem("3")} role="tab">
            Clubes Académicos
            </MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink link to="#" active={activeItem === "4"} onClick={() => changeActiveItem("4")} role="tab">
            Clubes Deportivos
            </MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink link to="#" active={activeItem === "5"} onClick={() => changeActiveItem("5")} role="tab">
            Agrupaciones
            </MDBNavLink>
        </MDBNavItem>
      </MDBNav>
      <MDBTabContent activeItem={activeItem} >
        <MDBTabPane tabId="1" role="tabpanel" >
          <div className="mt-2">
            <StatisticsACForm />
          </div>
          <MDBContainer>
            <h3 className="mt-5">Asociaciones</h3>
          </MDBContainer>
        </MDBTabPane>
        <MDBTabPane tabId="2" role="tabpanel" >
          <div className="mt-2">
            <ArtForm />
          </div>
          <MDBContainer>
            <h3 className="mt-5">Clubes Artísticos</h3>
            <h3 className="title-graphs">Participación | {artClubs.count}</h3>
            <div className="estadisticas" style={{ width: "500px", height: "400px" }}>
              {
                artClub !== null && (
                  <VictoryChart
                    domainPadding={30} >
                    <VictoryAxis
                      label="clubes artísticos"
                      style={{
                        axisLabel: { padding: 30 }
                      }}
                    />
                    <VictoryAxis dependentAxis
                      label="participantes"
                      style={{
                        axisLabel: { padding: 40 }
                      }}
                    />
                    <VictoryGroup offset={25}
                      colorScale={["green"]}>
                      <VictoryBar
                        data={artClub}
                        x={"name"}
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
            <h3 className="title-graphs">Participación por género | {artClubs.count}</h3>
            <div style={{ width: "500px", height: "400px" }}>
              {
                artClubF !== null && artClubM !== null && (
                  <VictoryChart domainPadding={30} >
                    <VictoryAxis
                      label="clubes artísticos"
                      style={{
                        axisLabel: { padding: 30 }
                      }}
                    />
                    <VictoryAxis dependentAxis
                      label="participantes"
                      style={{
                        axisLabel: { padding: 40 }
                      }}
                    />
                    <VictoryLegend
                      x={125} y={10}
                      orientation="horizontal"
                      gutter={20}
                      style={{ border: { stroke: "black" } }}
                      data={[
                        { name: "F", symbol: { fill: "green" } },
                        { name: "M", symbol: { fill: "#0C591E" } }
                      ]}
                    />
                    <VictoryGroup offset={25}
                      colorScale={["green", "#0C591E"]}
                    >
                      <VictoryBar
                        data={artClubM}
                        x={"name"}
                        y={"count"}
                        labels={({ datum }) => datum.count}
                        style={{ labels: { fill: "white" } }}
                        labelComponent={<VictoryLabel dy={30} />}
                      />
                      <VictoryBar
                        data={artClubF}
                        x={"name"}
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
          </MDBContainer>
        </MDBTabPane>
        <MDBTabPane tabId="3" role="tabpanel" >
          <div className="mt-2">
            <AcadForm />
          </div>
          <MDBContainer>
            <h3 className="mt-5">Clubes Académicos</h3>
          </MDBContainer>
        </MDBTabPane>
        <MDBTabPane tabId="4" role="tabpanel" >
          <div className="mt-2">
            <DeportForm />
          </div>
          <MDBContainer>
            <h3 className="mt-5">Clubes Deportivos</h3>
          </MDBContainer>
        </MDBTabPane>
        <MDBTabPane tabId="5" role="tabpanel" >
          <div className="mt-2">
            <AgrupForm />
          </div>
          <MDBContainer>
            <h3 className="mt-5">Agrupaciones</h3>
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
    artClubs: getParticipationArtClubs(state),
    artClub: getParticipationArtClub(state),
    artClubF: getParticipationArtClubF(state),
    artClubM: getParticipationArtClub(state),
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
)(StatisticsACTab);
