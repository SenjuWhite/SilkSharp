import React from "react";
import logo from "../images/logo2.png";
const Footer = () => {
  return (
    <div className=" container-fluid  footer">
      <div className="footer-content row">
        <div className="col-4"></div>
        <div
          className="col-4 footer-info"
          style={{ textAlign: "center", marginTop: "1em", marginBottom: "2em" }}
        >
          <div>
            <img src={logo} style={{ height: "1.7em" }}></img>
            SilkSharp
          </div>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
};

export default Footer;
