import { connect } from 'react-redux';
import { getAuthToken, getIsOpen } from '../../../reducers';
import { URL } from '../../../settings';
import StatisticsEventsForm from '../StatisticsEventsForm';
import React, { useState } from "react";
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";

let StatisticsEventsTab = () => {
  const [activeItem, changeActiveItem] = useState('1');
  return (
      <MDBContainer className="chart-background">
        <MDBNav className="nav-tabs mt-5">
          <MDBNavItem>
            <MDBNavLink link to="#" active={activeItem === "1"} onClick={() => changeActiveItem("1")} role="tab">
              Participación
            </MDBNavLink>
          </MDBNavItem>
        </MDBNav>
        <MDBTabContent activeItem={activeItem} >
          <MDBTabPane tabId="1" role="tabpanel" >
            <div className="mt-2">
              <StatisticsEventsForm />
            </div>
            <MDBContainer>
              <h3 className="mt-5">Bar chart</h3>
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
