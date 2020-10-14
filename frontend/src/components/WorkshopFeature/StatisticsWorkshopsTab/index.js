import { connect } from 'react-redux';
import { getAuthToken, 
getIsOpen,
getParticipationwkTime,
getParticipationwk,
getParticipationwkTimeg,
getParticipationwkG,
} from '../../../reducers';
import { URL } from '../../../settings';
import StatisticsWorkshopsForm from '../StatisticsWorkshopsForm';
import React, { useState } from "react";
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import { VictoryChart, VictoryBar, VictoryGroup, VictoryLabel, VictoryLegend, VictoryAxis } from 'victory';

let StatisticsWorkshopsTab = ({partwk, partwkTime, wkGF, wkTimeGM}) => {
  const [activeItem, changeActiveItem] = useState('1');
  return (
    <MDBContainer className="chart-background">
      <MDBNav className="nav-tabs mt-5">
        <MDBNavItem>
          <MDBNavLink link to="#" active={activeItem === "1"} onClick={() => changeActiveItem("1")} role="tab">
            Por taller
          </MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink link to="#" active={activeItem === "2"} onClick={() => changeActiveItem("2")} role="tab">
            Por genero
          </MDBNavLink>
        </MDBNavItem>
      </MDBNav>
      <MDBTabContent activeItem={activeItem} >
        <MDBTabPane tabId="1" role="tabpanel" >
          <div className="mt-2">
            <StatisticsWorkshopsForm />
          </div>
          <MDBContainer>
          <h3 className="title-graphs">Participación Talleres | {partwkTime.count}</h3>
          <div style={{ width: "500px", height: "400px" }} className="grafs">
            {
              partwk !== null && (
                <VictoryChart 
                  domainPadding={25} >
                    <VictoryAxis
                      label="Talleres"
                      style={{
                        axisLabel: { padding: 40 }
                      }}
                    />
                    <VictoryAxis dependentAxis
                      label="estudiantes"
                      style={{
                        axisLabel: { padding: 40 }
                      }}
                    />
                    <VictoryGroup offset={25}
                    colorScale={["green"]}>
                      <VictoryBar
                      data={partwk}
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
            <StatisticsWorkshopsForm />
          </div>
          <MDBContainer>
          <h3 className="title-graphs">Participación Talleres | {partwkTime.count}</h3>
          <div style={{ width: "500px", height: "400px" }}>
            {
              wkGF !== null && wkTimeGM !== null && (
                <VictoryChart domainPadding={30} >
                  <VictoryAxis
                    label="Talleres"
                    style={{
                      axisLabel: { padding: 40 }
                    }}
                  />
                  <VictoryAxis dependentAxis
                    label="Participación"
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
                      data={wkGF}
                      x={"name"}
                      y={"count"}
                      labels={({ datum }) => datum.count}
                      style={{ labels: { fill: "white" } }}
                      labelComponent={<VictoryLabel dy={30} />}
                    />
                    <VictoryBar
                      data={wkTimeGM}
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
    partwkTime: getParticipationwkTime(state),
    partwk: getParticipationwk(state),
    wkTimeGM: getParticipationwkTimeg(state),
    wkGF: getParticipationwkG(state),
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
)(StatisticsWorkshopsTab);
