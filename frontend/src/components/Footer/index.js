import React from "react";
import { MDBContainer, MDBFooter } from "mdbreact";

const FooterPagePro = () => {
    return (
        <MDBFooter color="elegant-color-dark">
            <div className="footer-copyright text-center py-3">
                <MDBContainer fluid>
                    &copy; {new Date().getFullYear()} Copyright: MeanGirls
                </MDBContainer>
            </div>
        </MDBFooter>
    );
}

export default FooterPagePro;