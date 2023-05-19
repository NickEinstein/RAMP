import React from 'react';
import ReactDOM from 'react-dom';
// import trustedBy1 from './images/Vector.png'
// import educatiaLogo from 'images/RAMP.jpg'
import trustedBy3 from '../images/Rectangle 78.png'
import educatiaLogo from "images/Ramp2.png";
// import trustedBy3 from './images/trustedBy-3.png'
// import trustedBy4 from './images/trustedBy-4.png'
import { useNavigate } from "react-router-dom";
import { Button, Input, MenuItem, Select, TextField, Typography } from '@mui/material';
import { RouteEnum } from 'constants/RouteConstants';


const LoginHeader = (prop) => {
    const history = useNavigate();
    const redirect = ()=>{
//   localStorage.setItem('auth', null)
      // history(RouteEnum.HOME);
  }
    return (
      <div className="flex items-center justify-center w-full">
        <div className="flex relative items-center justify-center w-full">
          <img
              src={educatiaLogo}
              style={{ width: "70px" }}
              alt="ramp-logo"
              className="cursor-pointer"
              // onClick={redirect}
            />
          {/* <Typography variant="h4">RAMP</Typography> */}
        </div>
      </div>
    );
}
export default LoginHeader;
