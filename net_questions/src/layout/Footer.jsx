import React from 'react'
import logo from "../images/logo2.png";
const Footer = () => {
  return (
    <div className=' container-fluid  footer'>
        <div className='footer-content row'>
            <div className='col-4'></div>
            <div className='col-4 footer-info' style={{textAlign:'center',marginTop:'1em',marginBottom:'2em'}}>
            <div >
              <img src={logo} style={{height:"1.7em"}}></img>
             SilkSharp by Скряга Нікіта
             <div style={{fontSize:'1.5em',marginTop:'0.2em'}}>
            <a href='https://t.me/SenjuWhite' target="_blank"><i class="bi bi-telegram m-1"></i></a>
            <a href='https://github.com/SenjuWhite' target="_blank"><i class="bi bi-github m-1"></i></a>
            <a href="mailto:nikitaskraga6@gmail.com"><i class="bi bi-envelope m-1"></i></a>
            </div>
              </div>
              {/* <div style={{marginTop:"1em"}}>
             <p  style={{opacity:0.5, marginBottom:'0.5em'}}> &copy; 2024 SilkSharp. All rights reserved.</p>
             </div> */}
              </div>
            <div className='col-4'></div>
        </div>
    </div>
  )
}

export default Footer