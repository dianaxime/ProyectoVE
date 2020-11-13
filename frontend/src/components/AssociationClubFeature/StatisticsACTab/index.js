import { connect } from 'react-redux';
import {
  getAuthToken,
  getIsOpen,
  getParticipationArtClub,
  getParticipationArtClubs,
  getParticipationArtClubF,
  getParticipationArtClubM,
  getParticipationSportClub,
  getParticipationSportClubs,
  getParticipationSportClubF,
  getParticipationSportClubM,
  getParticipationAcadClub,
  getParticipationAcadClubs,
  getParticipationAcadClubF,
  getParticipationAcadClubM,
  getParticipationAgrupation,
  getParticipationAgrupations,
  getParticipationAgrupationF,
  getParticipationAgrupationM,
  getParticipationAssociation,
  getParticipationAssociations,
  getParticipationAssociationF,
  getParticipationAssociationM,
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

let StatisticsACTab = ({
  artClub,
  artClubs,
  artClubF,
  artClubM,

  sportClub,
  sportClubs,
  sportClubF,
  sportClubM,

  acadClub,
  acadClubs,
  acadClubF,
  acadClubM,

  agrupation,
  agrupations,
  agrupationF,
  agrupationM,

  association,
  associations,
  associationF,
  associationM
}) => {
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
            <h3 className="title-graphs">Participación | {associations.count}</h3>
            <div className="estadisticas" style={{ width: "500px", height: "400px" }}>
              {
                association !== null && (
                  <VictoryChart
                    domainPadding={30} >
                    <VictoryAxis
                      label="asociaciones"
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
                        data={association}
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
            <h3 className="title-graphs">Participación por género | {associations.count}</h3>
            <div style={{ width: "500px", height: "400px" }}>
              {
                associationF !== null && associationM !== null && (
                  <VictoryChart domainPadding={30} >
                    <VictoryAxis
                      label="asociaciones"
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
                        data={associationM}
                        x={"name"}
                        y={"count"}
                        labels={({ datum }) => datum.count}
                        style={{ labels: { fill: "white" } }}
                        labelComponent={<VictoryLabel dy={30} />}
                      />
                      <VictoryBar
                        data={associationF}
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
            <h3 className="title-graphs">Participación | {acadClubs.count}</h3>
            <div className="estadisticas" style={{ width: "500px", height: "400px" }}>
              {
                acadClub !== null && (
                  <VictoryChart
                    domainPadding={30} >
                    <VictoryAxis
                      label="clubes académicos"
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
                        data={acadClub}
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
            <h3 className="title-graphs">Participación por género | {acadClubs.count}</h3>
            <div style={{ width: "500px", height: "400px" }}>
              {
                acadClubF !== null && acadClubM !== null && (
                  <VictoryChart domainPadding={30} >
                    <VictoryAxis
                      label="clubes académicos"
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
                        data={acadClubM}
                        x={"name"}
                        y={"count"}
                        labels={({ datum }) => datum.count}
                        style={{ labels: { fill: "white" } }}
                        labelComponent={<VictoryLabel dy={30} />}
                      />
                      <VictoryBar
                        data={acadClubF}
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
        <MDBTabPane tabId="4" role="tabpanel" >
          <div className="mt-2">
            <DeportForm />
          </div>
          <MDBContainer>
            <h3 className="mt-5">Clubes Deportivos</h3>
            <h3 className="title-graphs">Participación | {sportClubs.count}</h3>
            <div className="estadisticas" style={{ width: "500px", height: "400px" }}>
              {
                sportClub !== null && (
                  <VictoryChart
                    domainPadding={30} >
                    <VictoryAxis
                      label="clubes deportivos"
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
                        data={sportClub}
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
            <h3 className="title-graphs">Participación por género | {sportClubs.count}</h3>
            <div style={{ width: "500px", height: "400px" }}>
              {
                sportClubF !== null && sportClubM !== null && (
                  <VictoryChart domainPadding={30} >
                    <VictoryAxis
                      label="clubes deportivos"
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
                        data={sportClubM}
                        x={"name"}
                        y={"count"}
                        labels={({ datum }) => datum.count}
                        style={{ labels: { fill: "white" } }}
                        labelComponent={<VictoryLabel dy={30} />}
                      />
                      <VictoryBar
                        data={sportClubF}
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
        <MDBTabPane tabId="5" role="tabpanel" >
          <div className="mt-2">
            <AgrupForm />
          </div>
          <MDBContainer>
            <h3 className="mt-5">Agrupaciones</h3>
            <h3 className="title-graphs">Participación | {agrupations.count}</h3>
            <div className="estadisticas" style={{ width: "500px", height: "400px" }}>
              {
                agrupation !== null && (
                  <VictoryChart
                    domainPadding={30} >
                    <VictoryAxis
                      label="agrupaciones"
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
                        data={agrupation}
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
            <h3 className="title-graphs">Participación por género | {agrupations.count}</h3>
            <div style={{ width: "500px", height: "400px" }}>
              {
                agrupationF !== null && agrupationM !== null && (
                  <VictoryChart domainPadding={30} >
                    <VictoryAxis
                      label="agrupaciones"
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
                        data={agrupationM}
                        x={"name"}
                        y={"count"}
                        labels={({ datum }) => datum.count}
                        style={{ labels: { fill: "white" } }}
                        labelComponent={<VictoryLabel dy={30} />}
                      />
                      <VictoryBar
                        data={agrupationF}
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
    artClubM: getParticipationArtClubM(state),

    sportClubs: getParticipationSportClubs(state),
    sportClub: getParticipationSportClub(state),
    sportClubF: getParticipationSportClubF(state),
    sportClubM: getParticipationSportClubM(state),

    acadClubs: getParticipationAcadClubs(state),
    acadClub: getParticipationAcadClub(state),
    acadClubF: getParticipationAcadClubF(state),
    acadClubM: getParticipationAcadClubM(state),

    agrupations: getParticipationAgrupations(state),
    agrupation: getParticipationAgrupation(state),
    agrupationF: getParticipationAgrupationF(state),
    agrupationM: getParticipationAgrupationM(state),

    associations: getParticipationAssociations(state),
    association: getParticipationAssociation(state),
    associationF: getParticipationAssociationF(state),
    associationM: getParticipationAssociationM(state),
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
