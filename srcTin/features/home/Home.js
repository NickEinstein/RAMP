import React, { useState } from "react";
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
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home(props) {
  const [age, setAge] = React.useState("");
  const [individual, setindividual] = React.useState(true);
  const [verificationOTP, setVerificationOTP] = React.useState("");

  const [regData, setRegData] = React.useState({
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
  const handleChange = (event) => {
    setAge(event.target.value);
    console.log(event);
  };

  // console.log(localStorage.getItem('authUser'))
  const history = useNavigate();

  const redirect = () => {
    // localStorage.setItem('authUser', 'true')

    history("/verify-account");
  };

  // console.log(localStorage.getItem('authUser'))

  // const authUser = useAuthUser();
  const [open, setOpen] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { enqueueSnackbar } = useSnackbar();
  const [loginMuation, loginMutationResult] = UserApi.useLoginMutation();

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

  const onChange = (e) => {
    if (e.target.name == "account_type") {
      setindividual((prev) => !prev);
    }

    console.log(e.target.name);
    console.log(e.target.value);
    setRegData({
      ...regData,
      [e.target.name]: e.target.value,
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
      account_type: regData?.account_type,
      role: regData?.role,

      email: regData?.email,
      password: regData?.password,
      password_confirmation: regData?.password_confirmation,
      // ...regData,
    };

    let payloadCorporate = {
      phone: `+234${phoneNumber}`,

      ...regData,
    };

    console.log(payloadIndividual);
    console.log(payloadCorporate);

    const res = await post({
      endpoint: `auth/register`,
      body: individual ? payloadIndividual : payloadCorporate,
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

  const currencies = [
    {
      value: "corporate_brand",
      label: "Corporate Brands",
    },

    {
      value: "educational_institution",
      label: "Educational Institutions",
    },
    {
      value: "alumni",
      label: "Alumnis",
    },
    {
      value: "community",
      label: "Communities",
    },
    {
      value: "training_firm",
      label: " Training Firms",
    },
    {
      value: "vocational_institution",
      label: "Vocational Institutions",
    },
  ];

  const role = [
    {
      value: "edufunder",
      label: "Donor",
    },

    {
      value: "eduinitiator",
      label: "Initiator",
    },
  ];

  console.log(regData);
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
          className="hidden lg:block relative min-h-screen bg-primary-main text-white px-16 py-10 w-2/5"
          style={{
            minWidth: "40%",
            // minHeight: "100%",
            position: "relative",
            // backgroundImage: `url(${snake})`,
            // minHeight:"500px"
            // backgroundColor: "green",
          }}
        >
          <div className="flex flex-col gap-16">
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
        <div className="p-8 pr-[12%] pl-[6%] w-full">
          {/* <LoginHeader /> */}
          <img
            className="w-1/3 lg:hidden max-w-[120px] max-h-[130px] bg-primary-main p-4"
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
            <FormControl className="w-full">
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
            </FormControl>
            <Divider className="my-4" />
            {/* <Typography variant="h6" className="mb-2">
                Email Address
              </Typography> */}
            {
              <div className="flex flex-col gap-5">
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
                  <FormControl className="w-full">
                    {!regData.role && (
                      <InputLabel htmlFor="name-multiple">Role</InputLabel>
                    )}
                    <TextField
                      fullWidth
                      select
                      placeholder="Type Of Organisation"
                      name="role"
                      displayEmpty
                      // label="Select"
                      value={regData.role}
                      defaultValue="Coorporate Organisation"
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
                  </FormControl>

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
                {!individual && (
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
                {!individual && (
                  <div className="w-full ">
                    <FormControl className="w-full">
                      {!regData.company_type && (
                        <InputLabel htmlFor="name-multiple">
                          Division/Company Type
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
                        {currencies.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
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
            }

            {/* <Input placeholder='Location' className='m-b-20'/> */}

            <div className="text-white m-b-30 mt-5  ">
              <Button
                className="p-3 w-full text-base text-white"
                type="submit"
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
            {/* </form> */}

            <a className="text-center" href="">
              <Typography>
                By signing up you have agreed to terms and conditions of the
                application
              </Typography>
              <Typography className="mt-5">
                Already have an account?
                <a href="/" className="ml-1 text-primary-main font-bold ">
                  Log In
                </a>
              </Typography>
            </a>
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
