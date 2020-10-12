import { connect } from 'react-redux';
import { getAuthToken, getIsOpen } from '../../../reducers';
import { URL } from '../../../settings';
import StatisticsACForm from '../StatisticsACForm';
import React, { Component } from "react";
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import { Bar } from "react-chartjs-2";

const stateBar = {
    dataBar: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "% of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 134,159,0.4)",
          "rgba(98,  182, 239,0.4)",
          "rgba(255, 218, 128,0.4)",
          "rgba(113, 205, 205,0.4)",
          "rgba(170, 128, 252,0.4)",
          "rgba(255, 177, 101,0.4)"
        ],
        borderWidth: 2,
        borderColor: [
          "rgba(255, 134, 159, 1)",
          "rgba(98,  182, 239, 1)",
          "rgba(255, 218, 128, 1)",
          "rgba(113, 205, 205, 1)",
          "rgba(170, 128, 252, 1)",
          "rgba(255, 177, 101, 1)"
        ]
      }
    ]
  },
  barChartOptions: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          barPercentage: 1,
          gridLines: {
            display: true,
            color: "rgba(0, 0, 0, 0.1)"
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: true,
            color: "rgba(0, 0, 0, 0.1)"
          },
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }}

class StatisticsACTab extends Component {
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
      <MDBContainer className="chart-background">
        <MDBNav className="nav-tabs mt-5">
          <MDBNavItem>
            <MDBNavLink link to="#" active={this.state.activeItem === "1"} onClick={this.toggle("1")} role="tab">
              Asistencia
            </MDBNavLink>
          </MDBNavItem>
        </MDBNav>
        <MDBTabContent activeItem={this.state.activeItem} >
          <MDBTabPane tabId="1" role="tabpanel" >
            <div className="mt-2">
              <StatisticsACForm />
            </div>
            <MDBContainer>
              <h3 className="mt-5">Bar chart</h3>
              <Bar data={stateBar.dataBar} options={stateBar.barChartOptions} />
            </MDBContainer>
          </MDBTabPane>
        </MDBTabContent>
      </MDBContainer>
    );
  }
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
