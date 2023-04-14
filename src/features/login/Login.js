import React, { useState, useEffect } from "react";
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
import backgroundImage from "../../images/RampHome1.jpg";
// import backgroundImage2 from "../../images/rampHome2.jpg";
import backgroundImage3 from "../../images/ramphome3.jpg";
import backgroundImage4 from "../../images/ramphome4.jpg";
import backgroundImage5 from "../../images/ramphome5.jpg";
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
import useStepper from "hooks/useStepper";
import useDataRef from "hooks/useDataRef";

// import { useNavigate } from "react-router-dom";
import { MediaQueryBreakpointEnum } from "constants/Global";

function Login(props) {
  const [age, setAge] = React.useState("");
  const [regData, setRegData] = React.useState({
    email: "",
    password: "",
  });
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
    //  localStorage.setItem("il", true);
    history("/dashboard");
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

  const onChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setRegData({
      ...regData,
      [e.target.name]: e.target.value,
    });
  };
  

    const configs = [
      {
        bgColor: "HomeTopSectionBackgroundColor_WomanInRedImage",
        textColor: "text-secondary-main",
        image: backgroundImage,
      },
      {
        bgColor: "HomeTopSectionBackgroundColor_ManInDreadsImage",
        textColor: "text-white",
        image: backgroundImage3,
      },
      {
        bgColor: "HomeTopSectionBackgroundColor_headerImage",
        textColor: "text-secondary-main",
        image: backgroundImage4,
      },
      {
        bgColor: "HomeTopSectionBackgroundColor_headerImage",
        textColor: "text-secondary-main",
        image: backgroundImage5,
      },
    ];

    const stepper = useStepper({
      maxStep: configs.length - 1,
    });

    const config = configs[stepper.step];

    const dataRef = useDataRef({ stepper });

    useEffect(() => {
      const intervalId = setInterval(() => {
        if (dataRef.current.stepper.canNextStep()) {
          dataRef.current.stepper.nextStep();
        } else {
          dataRef.current.stepper.reset();
        }
      }, 1000 * 2);
      return () => {
        clearInterval(intervalId);
      };

      //  console.log(stepper)
    }, [dataRef]);

  const pay = async () => {
    // let payload = {
    //   email: "mosesocho+company@gmail.com",
    //   password: "password",
    // };

    const res = await post({
      endpoint: `auth/signin`,
      body: { ...regData },
      auth: false,
    });
    console.log(res);
    if (res.status == 200) {
      localStorage.setItem("token", res?.data?.data?.token);
      localStorage.setItem("role", res?.data?.data?.role[0]);
      localStorage.setItem("firstname", res?.data?.data?.firstname);
      localStorage.setItem("lastname", res?.data?.data?.lastname);
      // console.log(res?.data?.data?.role[0])

      //  handleOpen();
      //  localStorage.setItem("il", true);
      redirect();
      enqueueSnackbar(
        res?.data?.message || "Please wait while we re-direct you to Paystack",
        {
          variant: "success",
        }
      );
      // setTimeout((window.location.href = `${res?.data?.url}`), 2000);
    } else {
      enqueueSnackbar(res?.data?.message || "Something went Wrond", {
        variant: "error",
      });
    }
  };

  // if (authUser.accessToken) {
  //   return <Navigate to={RouteEnum.HOME} />;
  // }

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
      <div className="lg:flex ">
        <div
          style={{
            // background: `url('${configs[0]?.image}')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            minWidth: "48%",
          }}
          className="lg:block items-stretch flex relative min-h-screen bg-black/20 text-primary-main px-16 py-10 w-2/5"
          // className="relative min-h-screen flex-vertical bg-primary-main text-white pl-10  w-2/5"
          // style={{
          //   minWidth: "40%",
          //   // minHeight: "100%",
          //   position: "relative",
          // }}
        >
          <img
            className="absolute min-h-screen -z-10 top-0 left-0 w-[100%] h-[100%]"
            src={configs[0]?.image}
          />
          <div className="flex flex-col gap-16 my-12 text-white">
            {/* <img className="w-1/5" src={educatiaLogo} /> */}
            <Typography className=" font-bold" variant="h2">
              RAMP
            </Typography>
            <Typography variant="h4" className=" font-bold md:mt-24">
              {/* Earn */}
              Get access to unlimited funds
            </Typography>
            <Typography className="text-base">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad Lorem ipsum dolor sit amet,
            </Typography>
          </div>
        </div>
        <div className="p-8 pr-[12%] pl-[8%] pt-16 w-full">
          {/* <LoginHeader /> */}
          {/* <img
            className="w-1/3 lg:hidden max-w-[120px] max-h-[130px] bg-primary-main p-4"
            src={educatiaLogo}
          /> */}
          <Typography variant="h4">RAMP</Typography>

          <div className="flex flex-col">
            <div className="">
              <Typography variant="h4" className="mb-2 mt-3 font-bold">
                Welcome Back
              </Typography>

              <Typography>Login to continue</Typography>
              {/* <p>Enter your credentials to create your account.</p> */}
            </div>

            {/* <form

            // onSubmit={formik.handleSubmit}
            > */}
            <Divider className="my-4" />
            {/* <Typography variant="h6" className="mb-2">
                Email Address
              </Typography> */}
            {individual && (
              <div className="flex flex-col gap-8">
                <TextField
                  size="medium"
                  className="w-full"
                  placeholder="Enter your username"
                  label="Email "
                  name="email"
                  value={regData.email}
                  onChange={onChange}

                  // {...getTextFieldFormikProps(formik, "username")}
                />

                <PasswordTextField
                  className="w-full "
                  placeholder="Enter your Password"
                  label="Password"
                  name="password"
                  value={regData.password}
                  onChange={onChange}

                  // {...getTextFieldFormikProps(formik, "password")}
                />
              </div>
            )}

            {/* <Input placeholder='Location' className='m-b-20'/> */}

            <div className="text-white m-b-30 mt-5  ">
              <Button
                className="p-3 w-full text-base text-white"
                type="submit"
                // onClick={pay}
                onClick={pay}

                // className=' '
              >
                Log in
              </Button>
            </div>
            {/* </form> */}

            <a className="text-left" href="">
              <Typography>Forgot Password</Typography>
              <Typography className="mt-5">
                Don't have an account?
                <a href="/signup" className="ml-1 text-primary-main font-bold ">
                  Sign Up
                </a>
              </Typography>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
