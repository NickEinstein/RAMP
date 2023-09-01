import React, { useEffect, useState } from "react";
import UserApi from "apis/UserApi";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import educatiaLogo from "images/Ramp2.png";
import educatiaSuccess from "images/EducatiaSuccess.png";
import { FcGoogle } from "react-icons/fc";
import backgroundImage from "../../images/homepagefirstsection/pexels-curtis-loy-5196014.jpg";
// import backgroundImage2 from "../../images/rampHome2.jpg";
import backgroundImage3 from "../../images/homepagefirstsection/smartworks-coworking-cW4lLTavU80-unsplash.jpg";
// import backgroundImage4 from "../../images/ramphome4.jpg";
import backgroundImage5 from "../../images/homepagefirstsection/doug-linstedt-jEEYZsaxbH4-unsplash.jpg";
// import { Button, TextField, Typography } from "@mui/material";
import carouselpic2 from "images/homepagefirstsection/pexels-curtis-loy-5196014.jpg";


import PasswordTextField from "common/PasswordTextField";
import { getTextFieldFormikProps } from "utils/FormikUtils";
import useAuthUser from "hooks/useAuthUser";
import { Link, Navigate } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";
import LoginHeader from "common/LoginHeader";
import polygon from "images/homelanding/Polygon 1.svg";
import vector1 from "images/homelanding/Vector2.svg";
import userz from "images/homelanding/user.svg";
import Tech from "images/homelanding/cpu.svg";
import { post } from "services/fetch";

// import ReactDOM from 'react-dom';
// import trustedBy1 from './images/Vector.png'
import trustedBy2 from "images/Rectangle 7.png";
import trustedBy3 from "images/Rectangle 106.png";
// import LoginHeader from './LoginHeader';
// import trustedBy3 from './images/trustedBy-3.png'
// import trustedBy4 from './images/trustedBy-4.png'
import {
  Box,
  Button,
  Divider,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormLabel,
  Input,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  InputLabel,
  Chip,
  OutlinedInput,
  useMediaQuery,
  Fade,
  FormControlLabel,
} from "@mui/material";
import useStepper from "hooks/useStepper";
import useDataRef from "hooks/useDataRef";

import { useNavigate } from "react-router-dom";
import { MediaQueryBreakpointEnum } from "constants/Global";
import { BackspaceTwoTone } from "@mui/icons-material";

function Home(props) {
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);

  const [age, setAge] = React.useState("");
  const [individual, setindividual] = React.useState(true);
  const [verificationOTP, setVerificationOTP] = React.useState("");

  const [regData, setRegData] = React.useState({
    firstname: "",
    lastname: "",
    account_type: "corporate",
    company_name: null,
    company_reg_number: null,
    company_type: null,
    // phone: "",
    email: "",
    password: "",
    password_confirmation: "",
    types: "corporate",
  });

  const [regDataCompany, setRegDataCompany] = React.useState({
    firstname: "",
    lastname: "",
    account_type: "individual",
    company_name: null,
    company_reg_number: null,
    company_type: null,
    // phone: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

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
    // {
    //   bgColor: "HomeTopSectionBackgroundColor_headerImage",
    //   textColor: "text-secondary-main",
    //   image: backgroundImage4,
    // },
    {
      bgColor: "HomeTopSectionBackgroundColor_headerImage",
      textColor: "text-secondary-main",
      image: backgroundImage5,
    },
  ];

  // console.log(localStorage.getItem('authUser'))
  const history = useNavigate();

  const redirect = () => {
    // localStorage.setItem('authUser', 'true')

    history("/verify-account");
  };

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
    }, 1000 * 5);
    return () => {
      clearInterval(intervalId);
    };

    //  console.log(stepper)
  }, [dataRef]);

  // console.log(localStorage.getItem('authUser'))

  // const authUser = useAuthUser();
  const [open, setOpen] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { enqueueSnackbar } = useSnackbar();
  const [loginMuation, loginMutationResult] = UserApi.useLoginMutation();
  const [personName, setPersonName] = React.useState([]);
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

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  console.log(stepper.step);

  const onChange = (e) => {
    if (e.target.name == "account_type") {
      setRegData({
        ...regData,
        [e.target.name]: e.target.value,
        firstname: '',
        lastname: '',
      });
    }
    else
    setRegData({
      ...regData,
      [e.target.name]: e.target.value,
    });
  };

  const pay = async () => {
    let payloadRamp = {
      firstname: regData.firstname,
      lastname: regData.account_type=='individual'?regData.lastname : "Company",
      account_type: regData.account_type,
      phone: `${phoneNumber}`,
      email: regData?.email,
      password: regData?.password,
      password_confirmation: regData?.password_confirmation,
      role: regData?.role,
    };

    const res = await post({
      endpoint: `auth/register`,
      body: payloadRamp,
      auth: false,
    });
    console.log(res);
    if (res.status == 200 || res.status == 201) {
      setVerificationOTP(res?.data?.data?.otp);
      handleOpen();

      enqueueSnackbar(
        res?.data?.message || "Please wait while we re-direct you to Paystack",
        {
          variant: "success",
        }
      );
    } else {
      
      enqueueSnackbar(res?.data?.message || "Something went Wrond", {
        variant: "error",
      });
    }
  };

  const ngo = [
    {
      value: "corporate_brand",
      label: "Health",
    },

    {
      value: "educational_institution",
      label: "Education",
    },
    {
      value: "alumni",
      label: "Women  & Girls",
    },
    {
      value: "community",
      label: "Community Outreach",
    },
    {
      value: "training_firm",
      label: "Tech & Innovation",
    },
    {
      value: "vocational_institution",
      label: "Human Capacity",
    },
  ];
  // CASH RESOURCE MATERIALS

  const donorxK = [
    {
      value: "educational_institution",
      label: "In-Kind",
    },
    {
      value: "alumni",
      label: "Materials",
    },
  ];

  const donorx = [
    {
      value: "corporate_brand",
      label: "Cash",
    },

    {
      value: "educational_institution",
      label: "In-Kind",
    },
    {
      value: "alumni",
      label: "Materials",
    },
  ];

  const role = [
    {
      value: "donor",
      label: "Donor",
      key: 1,
    },

    {
      value: "nonprofit",
      label: "NGO",
      key: 2,
    },
    {
      value: "technical",
      label: "TECHNICAL EXPERTISE",
      key: 3,
    },
  ];

  const types = [
    {
      value: "individual",
      label: "Individual",
    },

    {
      value: "corporate",
      label: "Corporate",
    },
  ];

  console.log(regData);
  console.log(personName[0]);
  return (
    <div className="">
      <div className="lg:flex ">
        <div
          style={{
            // background: `url('${configs[stepper.step]?.image}')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            minWidth: "48%",
          }}
          className="hidden lg:block"
          // className="hidden md:block bg-gray-500/10 z-30 "
        ></div>
        <div
          // className="h-screen"
          style={{
            // background: `url('${configs[stepper.step]?.image}')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            minWidth: "48%",
          }}
          className="hidden fixed items-stretch lg:flex  min-h-screen text-primary-main  w-2/5"
          // className="lg:block fixed items-stretch flex  min-h-screen text-primary-main px-16 py-10 w-2/5"
        >
          <div className="bg-black/30 text-center px-16 py-10">
            <div
              // className="relative"
              className="min-h-screen absolute top-0 -z-20 min-w-[100%] left-0 flex bg-cover "
              style={{
                backgroundImage: `url(${configs[stepper.step].image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100%",
                // backgroundColor: carouselSlides[activeSlideIndex].backgroundColor,
              }}
            ></div>
            {/* <img
              className="min-h-screen absolute top-0 -z-20 min-w-[100%] left-0 flex bg-cover"
              src={configs[stepper.step]?.image}
            /> */}
            {/* <div className="self-stretch w-1/2 hidden md:flex items-end">
              <div className="relative w-full" style={{ height: 620 }}>
                {configs.map((step, index) => (
                  <Fade
                    key={index}
                    in={stepper.step === index}
                    timeout={500}
                    className="absolute block top-0 w-full h-full"
                  >
                    <img alt={index} src={step.image} />
                  </Fade>
                ))}
              </div>
            </div> */}

            <div className="flex flex-col gap-16 relative text-white h-screen">
              <Link to={RouteEnum.LANDING}>
                <img className="w-1/5" src={educatiaLogo} />
              </Link>

              <div className="flex flex-col gap-8">
                <Typography variant="h3" className=" font-bold md:mt-24">
                  {/* Earn */}
                  Welcome to RAMP{" "}
                </Typography>
                <Typography variant="h5" className="">
                  For Governments, CSO's, Private and Public Sector Companies,
                  Individuals and International Agencies
                </Typography>
              </div>
            </div>
          </div>
        </div>
        {/* +++++++++++++++++++++++++++++++++++++++++ */}
        <div className="p-8 pr-[10%] pl-[6%] mt-8 w-full">
          <Link to={RouteEnum.LANDING}>
            <img className="w-1/5 -mt-5" src={educatiaLogo} />
          </Link>
          <div className="flex flex-col">
            <div className="">
              <Typography
                variant="h4"
                className="mb-2 mt-3 font-bold text-center"
              >
                Get Started
              </Typography>
            </div>

            {/* <form

            // onSubmit={formik.handleSubmit}
            > */}
            {regData.role && (
              <div>
                <div className="flex gap-2 items-center my-4">
                  <BackspaceTwoTone
                    className="cursor-pointer text-primary-main "
                    onClick={() => {
                      setRegData({
                        ...regData,
                        role: "",
                      });
                    }}
                  />
                  <Typography className="font-bold">Back</Typography>
                </div>
                {regData.role !== "nonprofit" && (
                  <div className="w-full flex justify-center">
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="corporate"
                        name="account_type"
                        row
                        onChange={(e) => {
                          onChange(e);
                          // onChangeCompany(e);
                        }}
                        className="flex gap-4"
                      >
                        <FormControlLabel
                          value="individual"
                          control={<Radio />}
                          label="Individual"
                          className=""
                        />
                        <FormControlLabel
                          value="corporate"
                          control={<Radio />}
                          label="Corporate"
                          className=" "
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                )}
                <TextField
                  size="medium"
                  className="w-full mt-6"
                  value={regData?.role?.toUpperCase()}
                />
              </div>
            )}

            {!regData.role && (
              <div className="w-full mb-16 flex flex-col my-6 h-full ">
                <Typography className="text-center">Sign up As:</Typography>
                <div className=" w-full flex items-center gap-8 my-4 justify-center border-[#F3F4F9]">
                  <div className="bg-[#C654D1]/75 rounded-2xl py-4 hover:shadow-lg">
                    <div
                      onClick={() => {
                        setRegData({
                          ...regData,
                          role: "donor",
                        });
                      }}
                      className="relative w-[150px] flex rounded-lg mb-2 cursor-pointer py-12 px-6  "
                    >
                      <img
                        className="absolute top-2 left-8 w-[88px]"
                        src={polygon}
                      />
                      <img
                        className="absolute top-11 left-[68px] "
                        src={vector1}
                      />
                    </div>
                    <Typography className="font-bold text-center">
                      Donor
                    </Typography>
                  </div>
                  <div className="bg-[#01B6AC]/75 rounded-2xl py-4 hover:shadow-lg">
                    <div
                      onClick={() => {
                        setRegData({
                          ...regData,
                          role: "nonprofit",
                        });
                      }}
                      className="relative w-[150px] flex rounded-lg mb-2 cursor-pointer py-12 px-6  "
                    >
                      <img
                        className="absolute top-2 left-8 w-[88px]"
                        src={polygon}
                      />
                      <img
                        className="absolute top-11 left-[68px] "
                        src={userz}
                      />
                    </div>
                    <Typography className="font-bold text-center">
                      NGO
                    </Typography>
                  </div>
                  {/* <div className="bg-[#f0c046]/75 rounded-2xl py-4 hover:shadow-lg">
                    <div
                      onClick={() => {
                        setRegData({
                          ...regData,
                          role: "technical",
                        });
                      }}
                      className="relative w-[150px] flex   rounded-lg mb-2 cursor-pointer py-12 px-6  "
                    >
                      <img
                        className="absolute top-2 left-8 w-[88px]"
                        src={polygon}
                      />
                      <img
                        className="absolute top-11 left-[64px] "
                        src={Tech}
                      />
                    </div>
                    <Typography className="font-bold text-center">
                      Technical Expert
                    </Typography>
                  </div> */}
                </div>
                <a className="text-center" href="">
                  <Typography className="mt-12">
                    Already have an account?
                    <a
                      href="/login"
                      className="ml-1 text-primary-main font-bold "
                    >
                      Log In
                    </a>
                  </Typography>
                </a>
                <Typography className="md:absolute bottom-6 mt-12 lg:mt-0 text-center">
                  By signing up you have agreed to the{" "}
                  <span class="underline underline-offset-2 text-[#C654D1] cursor-pointer">
                    terms and conditions
                  </span>{" "}
                  of this platform.
                </Typography>
              </div>
            )}

            {regData.role && (
              <div>
                <div className="flex flex-col gap-5">
                  <div className="w-full flex gap-6"></div>
                  {regData.account_type == "individual" && (
                    <div className="flex gap-6">
                      <TextField
                        onChange={onChange}
                        size="medium"
                        className="w-full"
                        placeholder="Enter your first name"
                        label="First Name"
                        name="firstname"
                        value={regData.firstname}
                      />
                      <TextField
                        onChange={onChange}
                        size="medium"
                        className="w-full"
                        placeholder="Enter your last name"
                        label="Last Name"
                        name="lastname"
                        value={regData.lastname}
                      />
                    </div>
                  )}
                  <div className="w-full flex gap-6">
                    <TextField
                      onChange={onChange}
                      size="medium"
                      className="w-full"
                      placeholder="Enter your email"
                      label="Email "
                      name="email"
                      value={regData.email}
                    />
                  </div>
                  {regData.account_type == "corporate" && (
                    <div className="flex gap-6">
                      <TextField
                        size="medium"
                        className="w-full"
                        placeholder="Enter your company name"
                        label="Company Name "
                        name="firstname"
                        onChange={onChange}
                        value={regData.company_name}
                      />
                      {/* <TextField
                        size="medium"
                        className="w-full"
                        label="Company Registration Number"
                        name="company_reg_number"
                        onChange={onChange}
                        value={regData.company_reg_number}
                      /> */}
                    </div>
                  )}
                  <TextField
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    size="medium"
                    className="w-full"
                    placeholder="Enter your phone number"
                    label="Phone Number"
                    name="phone"
                    value={phoneNumber}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton className="text-black text-sm">
                            +234
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <PasswordTextField
                    onChange={onChange}
                    className="w-full "
                    placeholder="Enter your Password"
                    label="Password"
                    value={regData.password}
                    name="password"
                  />
                  <PasswordTextField
                    onChange={onChange}
                    className="w-full "
                    placeholder="Confirm your Password"
                    label="Confirm Password"
                    name="password_confirmation"
                    value={regData.password_confirmation}
                  />
                </div>

                <div className="text-white m-b-30 mt-5  ">
                  <Button
                    className="p-3 w-full text-base text-white"
                    type="submit"
                    onClick={pay}
                  >
                    Create an account
                  </Button>
                </div>

                <a className="text-center" href="">
                  <Typography>
                    By signing up you have agreed to terms and conditions of the
                    application
                  </Typography>
                  <Typography className="mt-5">
                    Already have an account?
                    <Link to={RouteEnum.LOGIN}>
                      <Typography clTypographyssName="ml-1 text-primary-main font-bold ">
                        Log In
                      </Typography>
                    </Link>
                  </Typography>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={open} maxWidth="lg">
        <DialogContent sx={{ width: "500px" }}>
          <div className="flex flex-col gap-6 justify-center items-center text-center p-20">
            <img src={educatiaSuccess} />
            <Typography variant="h5">Account Creation Successful</Typography>
            <Typography variant="">
              Your account creation was successful
            </Typography>
            <Typography variant="">
              Admin will review the application before acceptance as members of
              the platform
            </Typography>

            <Typography>Please fnd below your verification OTP</Typography>
            <Typography variant="h5">{verificationOTP}</Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            className="p-3 w-full text-base mx-20 mb-10 text-white"
            type="submit"
            onClick={() => {
              redirect();
            }}
          >
            Login to continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Home;
