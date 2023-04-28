
import React, { useState } from 'react';
import UserApi from "apis/UserApi";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
// import { Button, TextField, Typography } from "@mui/material";
import Modal from "common/Modal";
import { getTextFieldFormikProps } from "utils/FormikUtils";

import { HiOutlineTrash } from "react-icons/hi";
import { TbMessage2, TbPhoneCall } from "react-icons/tb";

import { MdOutlineKeyboardArrowDown,MdKeyboardArrowRight } from 'react-icons/md';
import useAuthUser from "hooks/useAuthUser";
import { Navigate } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";
import LoginHeader from 'common/LoginHeader';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import toDoorLogo from 'images/Ellipse 30.png'
// import ManageCompanyCard from 'common/ManageCompanyCard'

// import { RouteEnum } from "constants/RouteConstants";
// import ReactDOM from 'react-dom';
// import trustedBy1 from './images/Vector.png'
import gigLogo from 'images/Ellipse 56.png'
import trustedBy3 from 'images/Rectangle 106.png'
// import LoginHeader from './LoginHeader';
// import trustedBy3 from './images/trustedBy-3.png'
// import trustedBy4 from './images/trustedBy-4.png'
import { Button, Card, CardActions, CardContent, Input, MenuItem, Rating, Select, TextField, Typography, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WallCards from 'common/WallCards';
import ManageCompanyCard from './ManageCompanyCard';
import clsx from 'clsx';
import { MediaQueryBreakpointEnum } from "constants/Global";
import moment from 'moment/moment';


function ManageCompaniesTable(props) {
  const [suspend, setSuspend] = React.useState(false);
  const [closeModal, setCloseModal] = React.useState("");
  const [show, setShow] = React.useState('');
  // const handleChange = (event) => {
  //   setAge(event.target.value);
  //   console.log(event)
  // };
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);

  const history = useNavigate();
console.log(props.jj)

const openModal = (bol)=>{
  setCloseModal(!closeModal)
  setSuspend(bol)

}

  const redirect = () => {

    history('/complete-signUp');
  }


const tableArrayz = [
    {
        date:"Nickky Samuel jonas  ",
        company:"GIG Logistics",
        Id:"2234456",
        ratings:"4",
    },

    {
        date:"John jimmy Samuel  ",
        reason:"GIG Logistics",
        amount:"2234456",
        status:"4",
    }
]


const openBelow =()=>{
    setShow(!show)
}

  // if (authUser.accessToken) {
  //   return <Navigate to={RouteEnum.HOME} />;
  // }

  const className ={

  }

  return (
    <div>
      {/* { props.tableArray.map((e)=> */}
      <div>
        <div
          // onClick={openBelow}
          className=" mt-2 flex gap-2 w-full  min-h-[50%]"
        >
          <div
            className={
              props?.jj == "loan"
                ? " text-left p-3  md:w-[14%] w-full "
                : " text-center p-3  md:w-1/5 w-full "
            }
          >
            <Typography variant="">
              {moment(props?.tableArray?.created_at)?.format("ll")}
            </Typography>
          </div>
          <div
            className={
              props?.jj == "loan"
                ? " text-left p-3  md:w-[14%] w-full "
                : " text-center p-3  md:w-1/5 w-full "
            }
          >
            {props?.jj == "loan" ? (
              <Typography variant="">
                {props?.tableArray?.typeOfLoan || "-"}
              </Typography>
            ) : (
              <Typography variant="">{props?.tableArray?.reason}</Typography>
            )}
          </div>
          <div
            className={
              props?.jj == "loan"
                ? " text-left p-3  md:w-[14%] w-full "
                : " text-center p-3  md:w-1/5 w-full "
            }
          >
            <Typography variant="">{props?.tableArray?.amount}</Typography>
          </div>

          {props?.jj == "loan" && (
            <div
              className={
                props?.jj == "loan"
                  ? " text-left p-3  md:w-[14%] w-full "
                  : " text-center p-3  md:w-1/5 w-full "
              }
            >
              <Typography variant="">
                {props?.tableArray?.tenure} years
              </Typography>
            </div>
          )}
          {props?.jj == "loan" && (
            <div
              className={
                props?.jj == "loan"
                  ? " text-left p-3  md:w-[14%] w-full "
                  : " text-center p-3  md:w-1/5 w-full "
              }
            >
              <Typography variant="">
                {props?.tableArray?.amountToReturn || "-"}
              </Typography>
            </div>
          )}

          <div
            className={
              props?.jj == "loan"
                ? " text-center p-3  md:w-[14%] w-full "
                : " text-center p-3  md:w-1/5 w-full"
            }
          >
            <Typography
              className="rounded-3xl text-[12px]"
              style={{
                backgroundColor:
                  props?.tableArray?.status == "open"
                    ? "#E2FEF0"
                    : props?.tableArray?.status == "declined"
                    ? "#FFF1F0"
                    : props?.tableArray?.status == "disbursed"
                    ? "#E2FEF0"
                    : "#FFECC7",

                color:
                  props?.tableArray?.status == "open"
                    ? "#05944F"
                    : props?.tableArray?.status == "declined"
                    ? "#B81500"
                    : props?.tableArray?.status == "disbursed"
                    ? "#05944F"
                    : "#A87000",
              }}
              variant="h6"
            >
              {props.tableArray?.status == "open"
                ? "Approved"
                : props.tableArray?.status}
            </Typography>
          </div>
          {/* <div
            className={
              props?.jj == "loan"
                ? " text-center p-3  md:w-[14%] w-full  hover:text-primary-main cursor-pointer "
                : " text-center p-3  md:w-1/5 w-full  hover:text-primary-main cursor-pointer  "
            }
          >
            <Typography
              onClick={() => {
                props.setSection(1);
                props.setCurrentDetail(props.tableArray);
              }}
              className="font-bold"
            >
              View Details
            </Typography>
          </div> */}
        </div>
      </div>
      {/* )} */}
    </div>
  );
}

export default ManageCompaniesTable;
