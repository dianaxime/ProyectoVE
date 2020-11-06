import { connect } from 'react-redux';
import { getAuthToken, getIsOpen } from '../../../reducers';
import { URL } from '../../../settings';
import StatisticsACForm from '../StatisticsACForm';
import ArtForm from '../ArtForm';
import AgrupForm from '../AgrupForm';
import DeportForm from '../DeportForm';
import AcadForm from '../AcadForm';
import React, { useState } from "react";
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";

let StatisticsACTab = () => {
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
