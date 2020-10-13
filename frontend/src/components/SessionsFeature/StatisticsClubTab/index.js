import { connect } from 'react-redux';
import { getAuthToken, getIsOpen, getAssistanceClub } from '../../../reducers';
import { URL } from '../../../settings';
import StatisticsClubForm from '../StatisticsClubForm';
import React, { useState } from "react";
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import { VictoryPie } from 'victory';

let StatisticsClubTab = ({ statistics }) => {
  const [activeItem, changeActiveItem] = useState('1');
  return (
    <MDBContainer className="chart-background" >
      <MDBNav className="nav-tabs mt-5">
        <MDBNavItem>
          <MDBNavLink link to="#" active={activeItem === "1"} onClick={() => changeActiveItem("1")} role="tab">
            Asistencia
            </MDBNavLink>
        </MDBNavItem>
      </MDBNav>
      <MDBTabContent activeItem={activeItem} >
        <MDBTabPane tabId="1" role="tabpanel" >
          <div className="mt-2">
            <StatisticsClubForm />
          </div>
          <MDBContainer>
            <div style={{ width: "450px", height: "400px" }}>
              {
                statistics !== null && (
                  <VictoryPie data={statistics}
                    x={"late"}
                    y={"porcentaje"}
                    colorScale={["green", "#57A61F", "#0C591E"]}
                    labels={({ datum }) => `${datum.late}: ${(datum.porcentaje * 100).toFixed(2)}%`}
                    labelPosition={({ index }) => index
                      ? "centroid"
                      : "startAngle"
                    }
                  />
                )
              }
            </div>
          </MDBContainer>
        </MDBTabPane>
      </MDBTabContent>
    </MDBContainer >
  );
}

export default connect(
  state => ({
    isAuth: getAuthToken(state) !== null,
    open: getIsOpen(state),
    statistics: getAssistanceClub(state),
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
)(StatisticsClubTab);
