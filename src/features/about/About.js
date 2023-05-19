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
import useAuthUser from "hooks/useAuthUser";
import { Link, Navigate } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";
import image from "images/Ramp1.png";
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
  AppBar,
  Toolbar,
} from "@mui/material";
import useStepper from "hooks/useStepper";
import useDataRef from "hooks/useDataRef";
import about from 'images/aboutImage.jpg'
import { useNavigate } from "react-router-dom";
import { MediaQueryBreakpointEnum } from "constants/Global";

function Home(props) {
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);

  const [age, setAge] = React.useState("");
  const [individual, setindividual] = React.useState(true);
  const [verificationOTP, setVerificationOTP] = React.useState("");

  
  return (
    <div>
      <AppBar position="static">
        <Toolbar className="flex justify-between bg-white text-black">
          <Link to={RouteEnum.LANDING}>
              <Typography variant="h6" component="div">
                <img src={image} className="max-w-[120px]" />
              </Typography>
          </Link>
          <div className="gap-20 flex items-center">
            <ul className="flex gap-8 text-base font-bold">
              <Link to={RouteEnum.ABOUT}>
                <li className="hover:text-[#da663f]">About</li>
              </Link>
              <li className="hover:text-[#da663f]">How it Works</li>
              <li className="hover:text-[#da663f]">Contact</li>
            </ul>
            <div className="flex gap-4">
              <Link to={RouteEnum.SIGNUP}>
                <Button className="px-10 py-2">Sign Up</Button>
              </Link>
              <Link to={RouteEnum.LOGIN}>
                <Button className="px-10 py-2">Sign In</Button>
              </Link>
            </div>
          </div>
          {/* Add your navigation links here */}
        </Toolbar>
      </AppBar>
      <div
        className="h-[400px] flex justify-center items-center"
        style={{
          backgroundImage: `url(${about})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          // backgroundColor: carouselSlides[activeSlideIndex].backgroundColor,
        }}
      >
        <Typography className="text-white font-bold" variant="h2">
          ABOUT US
        </Typography>
      </div>

      <div class="p-16 flex flex-col gap-8 items-center">
        <div className="w-1/2 flex flex-col gap-3">
          <Typography className="text-black font-bold text-center" variant="h4">
            What we do
          </Typography>
          <Typography>
            We are the only platform that provides a one stop solution to all
            nonprofit and donor needs. We connect nonprofits across Africa to
            all the valuable resources that they need to be sustainable and
            improve the lives of people living in poverty.
          </Typography>
          <Typography>
            RAMP is a platform that lets donors like you send money, technical
            expertise and in-kind donations directly to trusted and vetted
            organizations tackling life threatening issues (SDGs) in Africa;
            improving the world’s poorest households and ensuring they remain
            out of the poverty line by ensuring their solutions are sustainable.
          </Typography>
          <Typography>
            We provide resource mobilization, capacity building and a rich pool
            of diverse funding needs for nonprofit organizations
          </Typography>
          <Typography>
            We believe that for many Africans to stay out of poverty then
            investment must be sustainable.
          </Typography>
          <Typography>
            Since 2018, we’ve delivered $30M+ to nonprofits in Nigeria, Ghana
            and Tanzania with funds used to build libraries in garbage centered
            communities, empower young people in tech, enroll thousands of
            children back in school, empower over 5000 women from extremely poor
            communities with business skills and grants to enable them
            consistently support their families amongst many others erty then
            investment must be sustainable.
          </Typography>
          <Typography>
            RAMP is funded by individual donors, foundations, businesses, and
            institutions.
          </Typography>
        </div>
        <div className="w-1/2 flex flex-col gap-3">
          <Typography className="text-black font-bold text-center" variant="h4">
            Our Values
          </Typography>
          <Typography>Intergrity</Typography>
          <Typography>
            Excellence: We don’t settle for anything less. We do it right the
            first time, ensuring that all reports, request and needs once filed
            are automatically reviewed and feedback providied
          </Typography>
          <Typography>
            Professionalism: Our Recepient’s First: Collaboration
            Impact/Solution
          </Typography>
          <Typography>
            Driven: We are not weighed down by problems. We strongly believe in
            solving problems one at a time. We are result driven
          </Typography>
        </div>
        <div className="w-4/5 flex flex-col gap-3">
          <Typography className="text-black font-bold text-center" variant="h4">
            Our Team
          </Typography>
          <div className="flex justify-between gap-5 w-full"></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
