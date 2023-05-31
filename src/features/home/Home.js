import React, { useEffect, useState } from "react";
import UserApi from "apis/UserApi";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import educatiaLogo from "images/Ramp2.png";
// import educatiaLogo from "images/RAMP.jpg";
import educatiaSuccess from "images/EducatiaSuccess.png";
import { FcGoogle } from "react-icons/fc";
import backgroundImage from "../../images/RampHome1.384e8f4ca8e12fd2e190.jpg-3.svg";
// import backgroundImage2 from "../../images/rampHome2.jpg";
import backgroundImage3 from "../../images/RampHome1.384e8f4ca8e12fd2e190.jpg.svg";
import backgroundImage4 from "../../images/RampHome1.384e8f4ca8e12fd2e190.jpg-1.svg";
import backgroundImage5 from "../../images/RampHome1.384e8f4ca8e12fd2e190.jpg-2.svg";
import polygon from "images/homelanding/Polygon 1.svg";
import polygon1 from "images/homelanding/Polygon 1.svg";
import vector from "images/homelanding/Vector.svg";
import vector1 from "images/homelanding/Vector2.svg";
import userz from "images/homelanding/user.svg";
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
    // console.log(event.target.)
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  console.log(stepper.step);

  const onChange = (e) => {
    if (e.target.name == "account_type") {
      setindividual((prev) => !prev);
    }

    console.log(e.target.name);
    console.log(e.target.value);
    setRegData({
      ...regData,
      [e.target.name]: e.target.value,
      account_type: regData.types,
    });
  };

  // const onChangeCompany = (e) => {
  //   // console.log(e?.target?.value);
  //   // console.log(e);
  //   // console.log(name);

  //   console.log(e.target.name);
  //   console.log(e.target.value);
  //   setRegDataCompany({
  //     ...regDataCompany,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  //  console.log(regData)
  const pay = async () => {
    let payloadIndividual = {
      phone: `+234${phoneNumber}`,
      firstname: regData?.firstname,
      lastname: regData?.lastname,
      account_type: regData.types,
      role: regData?.role == "hi" ? "edufunder" : regData?.role,

      email: regData?.email,
      password: regData?.password,
      password_confirmation: regData?.password_confirmation,
      // ...regData,
    };

    let payloadCorporate = {
      ...regData,
      phone: `+234${phoneNumber}`,
      account_type: regData.types,
      company_type:
        regData.role == "eduinitiator"
          ? "corporate_brand"
          : regData.company_type,
      role: regData?.role == "hi" ? "edufunder" : regData?.role,
    };

    console.log(payloadIndividual);
    console.log(payloadCorporate);

    const res = await post({
      endpoint: `auth/register`,
      body: payloadCorporate,
      auth: false,
    });
    console.log(res);
    if (res.status == 200 || res.status == 201) {
      setVerificationOTP(res?.data?.data?.otp);
      //  () => {
      handleOpen();
      //    // localStorage.setItem("il", true);
      //  redirect();
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

  // ,
  //   ,
  //   ,
  //   ,
  //   ,
  //   ;
  // Health, Education,
  // Women  & Girls, Community Outreach, Tech & Innovation, Human Capacity

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
      label: "Expertise",
    },
    // {
    //   value: "alumni",
    //   label: "Materials",
    // },
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
      value: "edufunder",
      label: "Donor",
      key: 1,
    },

    {
      value: "eduinitiator",
      label: "NGO",
      key: 2,
    },
    {
      value: "hi",
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
    // <div>
    //  {/* <Typography variant="h6">Hi</Typography> */}
    //   <form onSubmit={formik.handleSubmit}>
    //     <TextField
    //       label="Username"
    //
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
            // background: `url('${configs[stepper.step]?.image}')`,
            minHeight: "100vh",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            minWidth: "48%",
          }}
          className="hidden lg:block z-30 "
        ></div>
        <div
          // className="h-screen"
          style={{
            // background: `url('${configs[stepper.step]?.image}')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            minWidth: "48%",
          }}
          className="hidden fixed items-stretch lg:flex  min-h-screen text-primary-main px-16 py-10 w-2/5"
        >
          <div>
            <img
              className=" min-h-screen absolute top-0 -z-20 min-w-[100%] left-0 flex self-stretch"
              src={configs[stepper.step]?.image}
            />
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
              <img className="w-1/5" src={educatiaLogo} />
              {/* <Typography className=" font-bold" variant="h2">
                RAMP
              </Typography> */}
              <Typography variant="h4" className=" font-bold md:mt-24">
                {/* Earn */}
                Get access to unlimited funds
              </Typography>
              <Typography className="text-base">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad Lorem ipsum dolor sit
                amet,
              </Typography>
            </div>
          </div>
        </div>
        {/* +++++++++++++++++++++++++++++++++++++++++ */}
        <div className="p-8 pr-[10%] pl-[6%] w-full">
          {/* <LoginHeader /> */}
          {/* <Typography variant="h4">RAMP</Typography> */}
          <img
            className="w-1/3 md:hidden max-w-[120px] max-h-[130px] bg-primary-main p-4"
            src={educatiaLogo}
          />

          <div className="flex flex-col">
            <div className="">
              <Typography variant="h4" className="mb-2 mt-3 font-bold">
                Get Started
              </Typography>

              <Typography>Sign up to have access to our application</Typography>
              {/* <p>Enter your credentials to create your account.</p> */}
            </div>

            {/* <form

            // onSubmit={formik.handleSubmit}
            > */}
            {/* <FormControl className="w-full">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="individual"
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
            </FormControl> */}

            {regData.role && (
              <div>
                <div className="flex gap-2 items-center mt-4">
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
                <TextField
                  size="medium"
                  className="w-full mt-6"
                  value={regData.role == "edufunder" ? "Donor" : "NGO"}
                />
              </div>
            )}
            <Divider className="my-4" />

            {!regData.role && (
              <div className="w-full my-16 flex flex-col  h-full">
                <Typography>Choose account type:</Typography>
                <div className="w-full flex gap-8 my-4 justify-center border-[#F3F4F9]">
                  <div>
                    <div
                      onClick={() => {
                        setRegData({
                          ...regData,
                          role: "edufunder",
                        });
                      }}
                      className="relative w-[100px] flex border-[#3E4095] border rounded-lg mb-2 cursor-pointer py-12 px-6"
                    >
                      <img
                        className="absolute top-2 left-2 w-[80px]"
                        src={polygon}
                      />
                      <img className="absolute top-10 left-10 " src={vector1} />
                    </div>
                    <Typography className="font-bold text-center">
                      Donor
                    </Typography>
                  </div>
                  <div>
                    <div
                      onClick={() => {
                        setRegData({
                          ...regData,
                          role: "eduinitiator",
                        });
                      }}
                      className="relative w-[100px] flex border-[#3E4095] border rounded-lg mb-2 cursor-pointer py-12 px-6"
                    >
                      <img
                        className="absolute top-2 left-2 w-[80px]"
                        src={polygon}
                      />
                      <img className="absolute top-8 left-8 w-8" src={userz} />
                    </div>
                    <Typography className="font-bold text-center">
                      NGO
                    </Typography>
                  </div>
                  <div>
                    <div
                      onClick={() => {
                        setRegData({
                          ...regData,
                          role: "edufunder",
                        });
                      }}
                      className="relative w-[100px] flex border-[#3E4095] border rounded-lg mb-2 cursor-pointer py-12 px-6"
                    >
                      <img
                        className="absolute top-2 left-2 w-[80px]"
                        src={polygon}
                      />
                      <img className="absolute top-10 left-10 " src={vector1} />
                    </div>
                    <Typography className="font-bold text-center">
                      Technical
                    </Typography>
                  </div>
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
                  By signing up you have agreed to terms and conditions of the
                  application
                </Typography>
              </div>
            )}

            {/* <FormControl className="w-full mb-4">
              {!regData.role && (
                <InputLabel htmlFor="name-multiple">Sign Up As</InputLabel>
              )}
              <TextField
                fullWidth
                select
                placeholder="Sign Up As"
                name="role"
                displayEmpty
                // label="Select"
                value={regData.role}
                // defaultValue="Coorporate Organisation"
                onChange={onChange}
                id="name-multiple"
                // helperText="Please select your currency"
              >
                {role.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl> */}
            {regData.role && (
              <div>
                <div className="flex flex-col gap-5">
                  <div className="w-full flex gap-6">
                    {regData.role == "edufunder" && (
                      <FormControl className="w-full">
                        {!regData.types && (
                          <InputLabel htmlFor="name-multiple">
                            Organisation Type
                          </InputLabel>
                        )}
                        <TextField
                          fullWidth
                          select
                          placeholder=""
                          name="types"
                          displayEmpty
                          // label="Select"
                          value={regData.types}
                          // defaultValue="Coorporate Organisation"
                          onChange={onChange}
                          id="name-multiple"
                          // helperText="Please select your currency"
                        >
                          {types.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </FormControl>
                    )}
                  </div>
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
                  {/* <TextField
                    onChange={onChange}
                    size="medium"
                    className="w-full"
                    placeholder="Enter your email"
                    label="Email "
                    name="email"
                    value={regData.email}
                  /> */}
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
                  {regData.types == "corporate" && (
                    <div className="flex gap-6">
                      <TextField
                        size="medium"
                        className="w-full"
                        placeholder="Enter your company name"
                        // title="company Name"
                        label="Company Name "
                        name="company_name"
                        onChange={onChange}
                        value={regData.company_name}
                      />
                      <TextField
                        size="medium"
                        className="w-full"
                        // placeholder="Enter your username"
                        // title="lastname"
                        label="Company Registration Number"
                        name="company_reg_number"
                        onChange={onChange}
                        value={regData.company_reg_number}
                      />
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
                  {individual && (
                    <div className="w-full ">
                      {regData.role == "edufunder" || regData.role == "hi" ? (
                        <FormControl className="w-full">
                          {!regData.company_type && (
                            <InputLabel htmlFor="name-multiple">
                              Category
                            </InputLabel>
                          )}
                          <TextField
                            fullWidth
                            select
                            placeholder="Type Of Organisation"
                            name="company_type"
                            displayEmpty
                            // name='company_type'
                            // label="Select"
                            value={regData.company_type}
                            defaultValue="Coorporate Organisation"
                            onChange={onChange}
                            id="name-multiple"
                            // helperText="Please select your currency"
                          >
                            {regData.role !== "hi"
                              ? donorx.map((option) => (
                                  <MenuItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </MenuItem>
                                ))
                              : donorxK.map((option) => (
                                  <MenuItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </MenuItem>
                                ))}
                          </TextField>
                        </FormControl>
                      ) : (
                        <FormControl className=" w-full">
                          <InputLabel id="demo-multiple-chip-label">
                            Category
                          </InputLabel>
                          <Select
                            fullWidth
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={personName}
                            onChange={handleChange}
                            input={
                              <OutlinedInput
                                id="select-multiple-chip"
                                label="Chip"
                              />
                            }
                            renderValue={(selected) => (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                }}
                              >
                                {selected.map((value) => (
                                  <Chip key={value} label={value} />
                                ))}
                              </Box>
                            )}
                            // MenuProps={MenuProps}
                          >
                            {ngo.map((name) => (
                              <MenuItem
                                key={name.label}
                                value={name.label}
                                // style={getStyles(name, personName, theme)}
                              >
                                {name.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    </div>
                  )}
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
                    disabled={!regData.role}
                    onClick={
                      pay
                      //   () => {
                      //   handleOpen();
                      // }
                    }
                    // onClick={() => localStorage.setItem('type', 'CLIENT')}
                    // className=' '
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
                    <a
                      href="/login"
                      className="ml-1 text-primary-main font-bold "
                    >
                      Log In
                    </a>
                  </Typography>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        // sx={{ height: "70/px", border: "2px solid red" }}
        maxWidth="lg"

        // fullWidth={true}
        // sx={{padding:"40px 0", border:'2px solid red'}}
        // TransitionComponent={Transition}
      >
        {/* <DialogTitle>Add Drug</DialogTitle> */}
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
              // handleClose();
              redirect();
            }}
            // className=' '
          >
            Login to continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Home;
