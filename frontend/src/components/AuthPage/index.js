import Login from "../LoginForm";
import SignUp from "../SigninForm";
import React from "react";
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import "./styles.css";

const Auth = () => (
    <div className="auth-container">
        <Login/>
        <SignUp/>
        <MDBContainer>
            <MDBRow middle={true}>
                <MDBCol md="6">
                </MDBCol>
                <MDBCol md="6">
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    </div>
);

export default Auth;