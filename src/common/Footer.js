import {
  FacebookOutlined,
  Instagram,
  LinkedIn,
  Twitter,
} from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import { RouteEnum } from "constants/RouteConstants";
import React from "react";
import RampFooter from "images/RampFooter.svg";
import { Link } from "react-router-dom";
// import ReactDOM from 'react-dom';
// import { BsYoutube,BsFacebook,BsInstagram, BsApple, BsFillFileEarmarkCodeFill } from 'react-icons/bs';
// import { AiFillAndroid,AiOutlineCopyright, AiFillUnlock } from 'react-icons/ai';

const Footer = ({ change }) => {
  return (
    <div className="mt-8">
      <div className="bg-[#FCF6FC] lg:h-[441px] w- flex flex-col justify-center">
        {/* <Typography className="text-center pt-14 text-xl lg:text-2xl ">
          Stay Connected to RAMP:
        </Typography> */}
        <Typography
          className={`${"text-center pt-3 pb-5 text-xl lg:text-2xl"} ${
            change && "font-bold"
          }`}
        >
          {change
            ? "SIGN UP TODAY TO MAKE A DONATION "
            : "Subscribe to Our NewsLetter!"}
        </Typography>
        {!change && (
          <div className="w-9/12 lg:w-6/12 flex mx-auto">
            <Typography className="text-center pt-3 pb-5 text-sm">
              Be the first to know about the inspiring stories of impact,
              upcoming projects, and exciting updates from RAMP. Our newsletter
              is your gateway to stay connected with our mission of empowering
              nonprofit organizations in Africa and creating sustainable change.
            </Typography>
          </div>
        )}
        <div class="flex justify-center">
          <div class="flex flex-col justify-center items-center pb-12 gap-5 md:w-1/2 w-full p-4">
            {!change && (
              <TextField fullWidth placeholder="Email" className="w-full" />
            )}
            <Link to={RouteEnum.SIGNUP}>
              <Button className="py-4 px-16">
                {change ? "Sign Up" : "Feed the poor"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full lg:h-[256px] py-10 bg-[#3E4095]">
        <div className="flex flex-col justify-center items-center">
          <img src={RampFooter} alt="Ramp Footer" />
          <ul className="flex flex-col items-center lg:flex-row gap-5 lg:justify-center font-normal text-white">
            <li>About</li>
            <li>How It Works</li>
            <li>Blogs</li>
            <li>Resources</li>
            <Link
              to={RouteEnum.TEAM}
              className="hover:text-[#C654D1] text-white"
            >
              Our Team
            </Link>
            <Link
              to={RouteEnum.CAREERS}
              className="hover:text-[#C654D1] text-white"
            >
              Careers
            </Link>
            <li>Help</li>
            <li>Privacy Policy</li> <li>FAQ</li>
          </ul>
        </div>

        <div className="flex md:justify-between mt-6  w-full flex-col md:flex-row md:gap-20 gap-6 items-center px-20 py-5 text-white ">
          <div className="container text-center">
            <p className="">
              &copy; {new Date().getFullYear()} Resource Accessibility and
              Mobilization Program. All rights reserved.
            </p>
          </div>
          <ul className="flex gap-5 items-center font-bold ">
            <Link to={RouteEnum.SIGNUP}>
              <li>DONORS</li>
            </Link>
            <Link to={RouteEnum.SIGNUP}>
              <li>NGOS</li>
            </Link>
            <Link to={RouteEnum.SIGNUP}>
              <li>EXPERTS</li>
            </Link>
          </ul>
          <ul className="flex space-x-4">
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter fontSize="large" />
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookOutlined fontSize="large" />
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram fontSize="large" />
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedIn fontSize="large" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Footer;
