import React, { useRef, useState } from "react";
import UserApi from "apis/UserApi";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import educatiaLogo from "images/educatiaLogoWhite.svg";
import educatiaSuccess from "images/EducatiaSuccess.png";
import { FcGoogle } from "react-icons/fc";
// import { Button, TextField, Typography } from "@mui/material";
import PasswordTextField from "common/PasswordTextField";
import { getTextFieldFormikProps } from "utils/FormikUtils";
import useAuthUser from "hooks/useAuthUser";
import { Navigate } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";
import LoginHeader from "common/LoginHeader";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import toDoorLogo from "images/Ellipse 30.png";
import background from "images/background.png";
import snake from "images/Mask group.png";

// import ReactDOM from 'react-dom';
// import trustedBy1 from './images/Vector.png'
import trustedBy2 from "images/Rectangle 7.png";
import trustedBy3 from "images/Rectangle 106.png";
// import LoginHeader from './LoginHeader';
// import trustedBy3 from './images/trustedBy-3.png'
// import trustedBy4 from './images/trustedBy-4.png'
import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { post } from "services/fetch";

function OtpPage(props) {
  const [age, setAge] = React.useState("");
  const [individual, setindividual] = React.useState(true);

  const handleChange = (event) => {
    setAge(event.target.value);
    console.log(event);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // console.log(localStorage.getItem('authUser'))
  const history = useNavigate();

  const redirect = () => {
    // localStorage.setItem("il", true);

    // localStorage.setItem('authUser', 'true')

    history("/");
  };

  const pay = async () => {
    console.log(input1Ref.current.value);
    // let createCustomer = {
    let payload = {
      otp: `${input1Ref.current.value}${input2Ref.current.value}${input3Ref.current.value}${input4Ref.current.value}${input5Ref.current.value}${input6Ref.current.value}`,
    };

    console.log(payload);
    // };

    const res = await post({
      endpoint: `auth/verify-otp`,
      body: payload,
      auth: false,
    });
    console.log(res);
    if (res.status == 200 || res.status == 201) {
      //  () => {
      //    handleOpen();
      //    // localStorage.setItem("il", true);
         redirect();
      //  };
      enqueueSnackbar(
        res?.data?.message || "Please wait while we re-direct you to Paystack",
        {
          variant: "success",
        }
      );
      // setTimeout(
      //    redirect()

      // , 2000);
    } else {
      enqueueSnackbar(res?.data?.message || "Something went Wrond", {
        variant: "error",
      });
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "3%",
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  // console.log(localStorage.getItem('authUser'))

  // const authUser = useAuthUser();

  const { enqueueSnackbar } = useSnackbar();
  const [loginMuation, loginMutationResult] = UserApi.useLoginMutation();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup.string().trim().required(),
      password: yup.string().trim().required(),
    }),
    onSubmit: async (values) => {
      console.log(values);
      localStorage.setItem("il", true);
      redirect();
      // history('/dashboard')

      // try {
      //   const data = await loginMuation({ data: values }).unwrap();
      //   // TODO extra login
      //   // redirect()
      //   enqueueSnackbar("Logged in successful", { variant: "success" });
      // } catch (error) {
      //   enqueueSnackbar(error?.data?.message, "Failed to login", {
      //     variant: "error",
      //   });
      // }
    },
  });

  // if (authUser.accessToken) {
  //   return <Navigate to={RouteEnum.HOME} />;
  // }
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const input5Ref = useRef(null);
  const input6Ref = useRef(null);

  const handleInput = (e, ref) => {
    if (e.target.value.length === e.target.maxLength) {
      ref.current.focus();
    }
  };

  return (
    // <div>
    //  {/* <Typography variant="h6">Hi</Typography> */}
    //   <form onSubmit={formik.handleSubmit}>
    //     <TextField
    //       label="Username"
    //       {...getTextFieldFormikProps(formik, "username")}
    //     />
    //     <PasswordTextField
    //       label="Password"
    //       {...getTextFieldFormikProps(formik, "password")}
    //     />
    //     <Button type="submit">Submit</Button>
    //   </form>
    // </div>
    <div className="">
      <div className="flex ">
        <div
          className="relative min-h-screen bg-primary-main text-white px-16 py-10 w-2/5"
          style={{
            minWidth: "40%",
            // minHeight: "100%",
            position: "relative",
            // backgroundImage: `url(${snake})`,
            // minHeight:"500px"
            // backgroundColor: "green",
          }}
        >
          <div className="flex flex-col gap-16 pt-12">
            <img className="w-1/5" src={educatiaLogo} />
            <Typography variant="h4" className=" font-bold">
              {/* Earn */}
              Get access to unlimited funds
            </Typography>
            <Typography className="text-sm">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad Lorem ipsum dolor sit amet,
            </Typography>
          </div>
        </div>
        <div className="p-8 pr-[12%] pl-[8%] pt-16 w-full">
          {/* <LoginHeader /> */}
          <div className=" flex flex-col gap-5">
            <div>
              <Typography className="font-bold" variant="h4">
                VERIFY ACCOUNT
              </Typography>
              <Typography>
                Verify six(6) digit code sent to your phone number email address
              </Typography>
              <Divider className="my-4" />
            </div>
            <div className="flex gap-3">
              <input
                className="w-10 border-2 focus:border-primary-main hover:border-primary-main"
                type="text"
                maxLength={1}
                ref={input1Ref}
                onChange={(e) => handleInput(e, input2Ref)}
              />
              <input
                className="w-10 border"
                type="text"
                maxLength={1}
                ref={input2Ref}
                onChange={(e) => handleInput(e, input3Ref)}
              />
              <input
                className="w-10 border"
                type="text"
                maxLength={1}
                ref={input3Ref}
                onChange={(e) => handleInput(e, input4Ref)}
              />
              <input
                className="w-10 border"
                type="text"
                maxLength={1}
                ref={input4Ref}
                onChange={(e) => handleInput(e, input5Ref)}
              />
              <input
                className="w-10 border"
                type="text"
                maxLength={1}
                ref={input5Ref}
                onChange={(e) => handleInput(e, input6Ref)}
              />
              <input
                className="w-10 border"
                type="text"
                maxLength={1}
                ref={input6Ref}
              />
            </div>

            <button
              onClick={pay}
              className="h-10 bg-primary-main text-white w-full"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpPage;
