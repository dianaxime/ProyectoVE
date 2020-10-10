import { connect } from 'react-redux';
import { getAuthToken, getIsOpen } from '../../../reducers';
import { URL } from '../../../settings';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Nav from '../../Nav';
import './styles.css';
import Footer from '../../Footer';
import StatisticsTeamsForm from '../StatisticsTeamsForm';
import StatisticsTeamsSportForm from '../StatisticsTeamsSportForm';
import React, { Component } from "react";
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";

  class StatisticsTeamsTab extends Component {
    state = {
      activeItem: "1"
    };

    toggle = tab => e => {
      if (this.state.activeItem !== tab) {
        this.setState({
          activeItem: tab
        });
      }
    };

    render() {
      return (
        <MDBContainer>
        <MDBNav className="nav-tabs mt-5">
          <MDBNavItem>
            <MDBNavLink link to="#" active={this.state.activeItem === "1"} onClick={this.toggle("1")} role="tab">
              Por fecha
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink link to="#" active={this.state.activeItem === "2"} onClick={this.toggle("2")} role="tab" >
              Por deporte
            </MDBNavLink>
          </MDBNavItem>
        </MDBNav>
        <MDBTabContent activeItem={this.state.activeItem} >
          <MDBTabPane tabId="1" role="tabpanel">
            <div className="mt-2">
                <StatisticsTeamsForm/>
            </div>
          </MDBTabPane>
          <MDBTabPane tabId="2" role="tabpanel">
            <div className="mt-2">
                <StatisticsTeamsSportForm/>
            </div>
          </MDBTabPane>
        </MDBTabContent>
      </MDBContainer>
    );
  }
}
export default StatisticsTeamsTab;