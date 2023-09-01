import React, { useState, useEffect } from "react";
import UserApi from "apis/UserApi";

import { useSnackbar } from "notistack";
import educatiaLogo from "images/Ramp2.png";

import PasswordTextField from "common/PasswordTextField";

import backgroundImage from "../../images/homepagefirstsection/pexels-curtis-loy-5196014.jpg";
// import backgroundImage2 from "../../images/rampHome2.jpg";
import backgroundImage3 from "../../images/homepagefirstsection/smartworks-coworking-cW4lLTavU80-unsplash.jpg";
// import backgroundImage4 from "../../images/ramphome4.jpg";
import backgroundImage5 from "../../images/homepagefirstsection/doug-linstedt-jEEYZsaxbH4-unsplash.jpg";

import { Button, Divider, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { post } from "services/fetch";
import useStepper from "hooks/useStepper";
import useDataRef from "hooks/useDataRef";

import { RouteEnum } from "constants/RouteConstants";

function Login(props) {
  const [regData, setRegData] = React.useState({
    email: "",
    password: "",
  });
  const [individual, setindividual] = React.useState(true);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const history = useNavigate();

  const redirect = () => {
    history("/dashboard");
  };

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
      textColor: "text-secondary-main",
      image: backgroundImage,
    },
    {
      textColor: "text-white",
      image: backgroundImage3,
    },
    // {
    //   textColor: "text-secondary-main",
    //   image: backgroundImage4,
    // },
    {
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
  }, [dataRef]);

  const login = async () => {
    const res = await post({
      endpoint: `auth/signin`,
      body: { ...regData },
      auth: false,
    });
    console.log(res);
    if (res?.status == 200) {
      localStorage.setItem("token", res?.data?.data?.token);
      localStorage.setItem("role", res?.data?.data?.role[0]);
      localStorage.setItem("firstname", res?.data?.data?.firstname);
      localStorage.setItem("lastname", res?.data?.data?.lastname);

      redirect();
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

  return (
    <div className="">
      <div className="lg:flex ">
        <div
          style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            minWidth: "48%",
          }}
          className="lg:block items-stretch hidden relative min-h-screen bg-black/20 text-primary-main px-16 py-10 w-2/5"
        >
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
            className="absolute min-h-screen -z-10 top-0 left-0 w-[100%] h-[100%]"
            src={configs[0]?.image}
          /> */}
          <Link to={RouteEnum.LANDING}>
            <img className="w-1/5 -mt-5" src={educatiaLogo} />
          </Link>
          <div className="flex flex-col gap-16 my-12 text-white">
            <div className="flex flex-col gap-8">
              <Typography variant="h3" className=" font-bold md:mt-24">
                Welcome to RAMP{" "}
              </Typography>
              <Typography variant="h5" className="">
                For Governments, CSO's, Private and Public Sector Companies,
                Individuals and International Agencies
              </Typography>
            </div>
          </div>
        </div>
        <div className="p-8 pr-[12%] pl-[8%] pt-16 w-full">
          <Link to={RouteEnum.LANDING}>
            <img className="w-1/5 -mt-5" src={educatiaLogo} />
          </Link>

          <div className="flex flex-col">
            <div className="">
              <Typography variant="h4" className="mb-2 mt-3 font-bold">
                Welcome Back
              </Typography>

              <Typography>Login to continue</Typography>
            </div>

            <Divider className="my-4" />

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
                />

                <PasswordTextField
                  className="w-full "
                  placeholder="Enter your Password"
                  label="Password"
                  name="password"
                  value={regData.password}
                  onChange={onChange}
                />
              </div>
            )}

            <div className="text-white m-b-30 mt-5  ">
              <Button
                className="p-3 w-full text-base text-white"
                type="submit"
                onClick={login}
              >
                Log in
              </Button>
            </div>

            <a className="text-left" href="">
              <Typography>Forgot Password</Typography>
              <Typography className="mt-5 flex gap-2">
                Don't have an account?
                <Link to={RouteEnum.SIGNUP}>
                  <Typography className="ml-1 text-primary-main font-bold ">
                    Sign Up
                  </Typography>
                </Link>
              </Typography>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
