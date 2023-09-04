import React, { useEffect, useState } from "react";
import UserApi from "apis/UserApi";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import educatiaLogo from "images/Ramp2.png";
// import educatiaLogo from "images/RAMP.jpg";
import educatiaSuccess from "images/EducatiaSuccess.png";
import { FcGoogle } from "react-icons/fc";
import backgroundImage from "../../images/RampHome1.jpg";
// import backgroundImage2 from "../../images/rampHome2.jpg";
import backgroundImage3 from "../../images/ramphome3.jpg";
import backgroundImage4 from "../../images/ramphome4.jpg";
import backgroundImage5 from "../../images/ramphome5.jpg";
// import { Button, TextField, Typography } from "@mui/material";
import PasswordTextField from "common/PasswordTextField";
import { getTextFieldFormikProps } from "utils/FormikUtils";
// import { Typography, Container, Box, Tab, Tabs, Paper, Button } from "@mui/material";
import ourStory from "images/Chizoba-Okpala-Atsu.jpg";
import chidi from "images/homelanding/CHIDI2023new.jpg";
// import { Link } from "react-router-dom";

import useAuthUser from "hooks/useAuthUser";
import { Link, Navigate } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";
import image from "images/Ramp1.png";
import LoginHeader from "common/LoginHeader";
import lineElipse from "images/homelanding/Ellipse 2.svg";
import svg1 from "images/homelanding/Frame 84.svg";

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
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Drawer,
  Container,
} from "@mui/material";
import useStepper from "hooks/useStepper";
import useDataRef from "hooks/useDataRef";
// import about from "images/Chizoba-Okpala-Atsu.jpg";
import about from "images/homelanding/ourStory.jpg";

import { useNavigate } from "react-router-dom";
import { MediaQueryBreakpointEnum } from "constants/Global";
import Footer from "common/Footer";

function Home(props) {
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);
  const islg = useMediaQuery(MediaQueryBreakpointEnum.lg);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [age, setAge] = React.useState("");
  const [individual, setindividual] = React.useState(true);
  const [verificationOTP, setVerificationOTP] = React.useState("");

  return (
    <div>
      <LoginHeader color={true} />

      <div
        className="h-[400px] flex justify-center items-center"
        style={{
          backgroundImage: `url(${ourStory})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          // backgroundColor: carouselSlides[activeSlideIndex].backgroundColor,
        }}
      >
        <Typography className="text-white" variant={islg ? "h1" : ismd ? "h2" : "h2"}  gutterBottom>
          Our Story
        </Typography>
      </div>

      <Container className="py-12" maxWidth="xl">
        <Box className="">
          <Typography className="text-center lg:px-32 pb-16" variant={islg ? "h4" : ismd ? "h4" : "h5"}>
            “With experience gathered from over 14years designing accelerator
            programs, leading changemakers from 20 African countries and
            different continents; RAMP is designed to help organizations scale
            up their impact in the communities they serve and transform their
            countries.”
          </Typography>
          <div className="w-full  text-base">
            <Typography className=" font-bold mb-5" variant="h4">
              The Power of a Table and Chair
            </Typography>
            <div className="grid grid-cols-1 lg:grid-cols-2 items-start justify-between gap-6 lg:gap-16 w-full">
              {/* For Mobile */}
            <div className="flex flex-col lg:hidden">
                <div
                  className="h-[200px] md:h-[500px] w-full pl-40 flex justify-center items-center rounded-3xl"
                  style={{
                    backgroundImage: `url(${chidi})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    // width: "100%",
                    // backgroundColor: carouselSlides[activeSlideIndex].backgroundColor,
                  }}
                >
                  {/* <img className="w-5/12 h-[400px] rounded-3xl" src={ourStory} /> */}
                </div>
                <div className="p-3 ">
                  <Typography className="text-base font-bold">
                    Chidi Koldsweat
                  </Typography>
                  <Typography className="text-sm italic">
                    Founder and CEO
                  </Typography>
                  <Typography className="text-base font-bold italic">
                    Donors for Africa Foundation
                  </Typography>
                </div>
              </div>
              <div class="flex flex-col gap- text-base w-full">
                <Typography className="text-base">
                  In 2017 our founder, sat on her sons chair with her laptop
                  placed on the bed, working on the new vision that is to become
                  Donors for Africa Foundation. As she bemoaned the growing pain
                  on her waist as a result of her posture, she took a break to
                  scroll through instagram.
                </Typography>
                <Typography className="text-base">
                  Few minutes later she read a post asking people to ‘’Make an
                  Ask’’. She did.
                </Typography>
                <Typography className="text-base">
                  She asked for a Table and Chair.
                </Typography>
                <Typography className="text-base">
                  The next day, Chizoba O. Atsu delivered a brown mahogany table
                  to her home and the rest they say is history. Since then, she
                  has gone on to;
                </Typography>
                <ul className="list-inside list-disc pl-8">
                  <li>Birth the DFA Vision</li>
                  <li>
                    Trained over 5000+ nonprofits who have raised over $30M in
                    funding
                  </li>
                  <li>
                    Funds have been used to launch school libraries, back to
                    school programs, women empowerment campaigns and so much
                    more which has directly transformed the lives of so many
                    Africans reaching over 51,000 people weekly with life
                    changing stories, learning and solutions. and so many more
                    results.
                  </li>
                </ul>
                <Typography className="text-base">
                  With experience gathered from over 14years designing
                  accelerator programs, leading changemakers from 20 African
                  countries and different continents; RAMP is designed to help
                  organizations scale up their impact in the communities they
                  serve and transform their countries.
                </Typography>
                <div>
                  <span className="text-base mr-2">
                    You can make direct donations as
                  </span>
                  <span className="text-base font-bold mr-2">
                    An Individual,
                  </span>
                  <span className="text-base font-bold mr-2">
                    A Government,
                  </span>
                  <span className="text-base font-bold mr-2">
                    A Technical Expert,
                  </span>
                  <span className="text-base font-bold mr-2">
                    A Growing Business,
                  </span>
                  <span className="text-base font-bold mr-2">
                    A multinational or private sector company, to trusted
                    organizations across Africa.
                  </span>
                </div>
                {/* <div className="text-base font-bold w-full flex justify-start mt-16">
                  <div className=" ">
                    <Typography className="text-base font-bold ">
                      Thank You!
                    </Typography>
                    <Typography className="text-base font-bold  my-3">
                      Signature
                    </Typography>{" "}
                    <Typography className="text-base font-bold  my-3">
                      Chidi Koldsweat (Founder and CEO)
                    </Typography>
                    <Typography className="text-base font-bold ">
                      Donors for Africa Foundation
                    </Typography>
                  </div>
                </div> */}
              </div>
              {/* For Tablet and Laptops */}
              <div className="hidden lg:flex flex-col">
                <div
                  className="md:h-[400px] w-full pl-40 flex justify-center items-center rounded-3xl"
                  style={{
                    backgroundImage: `url(${chidi})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    // width: "100%",
                    // backgroundColor: carouselSlides[activeSlideIndex].backgroundColor,
                  }}
                >
                  {/* <img className="w-5/12 h-[400px] rounded-3xl" src={ourStory} /> */}
                </div>
                <div className="p-3 ">
                  <Typography className="text-base font-bold">
                    Chidi Koldsweat
                  </Typography>
                  <Typography className="text-sm italic">
                    Founder and CEO
                  </Typography>
                  <Typography className="text-base font-bold italic">
                    Donors for Africa Foundation
                  </Typography>
                </div>
              </div>
              {/* <img src={girlpic} /> */}
            </div>

            <div className="my-16">
              <Typography className="text-center font-bold mb-8" variant="h3">
                Our Values
              </Typography>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                  <img src={svg1} />
                  <Typography
                    variant="h4"
                    className="mt-5 mb-2 font-bold text-[#01B6AC]"
                  >
                    Intergrity
                  </Typography>
                  <Typography className="mt-2 text-base">
                    We maintain the highest standards of professional and ethical
                    behavior and value transparency and honesty in our
                    communications, relationships, and action with donors and
                    beneficiaries. All donation reports are tracked and delivered
                    straight to your inbox with opportunity to verify
                  </Typography>
                </div>
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                  <img src={svg1} />
                  <Typography
                    variant="h4"
                    className="mt-5 mb-2 font-bold text-[#01B6AC]"
                  >
                    Excellence
                  </Typography>
                  <Typography className="mt-2 text-base">
                    We don’t settle for anything less. We do it right the first
                    time, ensuring that all reports, request and needs once filed
                    are automatically reviewed and feedback providied
                  </Typography>
                </div>
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                  <img src={svg1} />
                  <Typography
                    variant="h4"
                    className="mt-5 mb-2 font-bold text-[#01B6AC]"
                  >
                    Professionalism
                  </Typography>
                  <Typography className="mt-2 text-base">
                    Our team of developers, staff, board and champions are
                    ‘’trustworthy, competent, direct, a self-starter, and a
                    constant professional.”
                  </Typography>
                </div>
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                  <img src={svg1} />
                  <Typography
                    variant="h4"
                    className="mt-5 mb-2 font-bold text-[#01B6AC]"
                  >
                    Our Recepient’s
                  </Typography>
                  <Typography className="mt-2 text-base">
                    First You are guaranteed that the needs of all our
                    beneficiaries are prioritized and delivered. We ensure that
                    all
                  </Typography>
                </div>
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                  <img src={svg1} />
                  <Typography
                    variant="h4"
                    className="mt-5 mb-2 font-bold text-[#01B6AC]"
                  >
                    Collaboration
                  </Typography>
                  <Typography className="mt-2 text-base">
                    We leverage the power of many to achieve our results. We do
                    not work in silos. Team spirit, healthy work environment and
                    increased partnership with internal and external stakeholders.
                  </Typography>
                </div>
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                  <img src={svg1} />
                  <Typography
                    variant="h4"
                    className="mt-5 mb-2 font-bold text-[#01B6AC]"
                  >
                    Impact/Solution Driven:
                  </Typography>
                  <Typography className="mt-2 text-base">
                    We are not weighed down by problems. We strongly believe in
                    solving problems one at a time. We are result driven
                  </Typography>
                </div>
              </div>
            </div>

            
          </div>
        </Box>
      </Container>
      <Footer change={true}/>
    </div>
  );
}

export default Home;
