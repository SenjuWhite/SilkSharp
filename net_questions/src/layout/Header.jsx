import logo from "../images/logo2.png";
import "../styles/bootstrap.css";
import { Link } from "react-router-dom";
import React, { useState,useEffect } from "react";
const Header = () => {
const [isMobile, setIsMobile] = useState(window.innerWidth <= 820);
  return (
    <div>
    {isMobile ? <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
    <div class="container-fluid">
    <img src={logo} style={{height:"2.8rem"}} className="ml-75"></img>
        <Link className="navbar-brand" style={{marginRight:"auto"}} to="/">
                SilkSharp
              
              </Link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Увімкнути навігацію">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarColor02">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a class="nav-link active" href="/">Головна
             
            </a>
          </li>
          <li class="nav-item">
          <Link className="nav-link" to="/quiz">
                Вікторина
              </Link>
          </li>
          <li class="nav-item">
          <Link className="nav-link" to="/interviews">
                Співбесіди
              </Link>
          </li>
        </ul>
       
      </div>
    </div>
  </nav>
  :
    <nav className="navbar navbar-expand  " data-bs-theme="dark">
      <div className="container-fluid">
        <img src={logo} style={{height:"2.8rem"}} className="ml-75"></img>
        <Link className="navbar-brand" style={{marginRight:"auto"}} to="/">
                SilkSharp
              
              </Link>
           
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Головна
                <span className="visually-hidden">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/quiz">
                Вікторина
              </Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/interviews">
                Співбесіди
              </Link>
            </li>
           
           
          </ul>

        </div>

      </div>
    </nav>
}
    </div>
  );
}
export default Header;
