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
import ourStory from "images/homelanding/LandingNGO.6976716afed3705df208.jpg.svg";
// import { Link } from "react-router-dom";

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
  List,
  ListItem,
  ListItemText,
  Drawer,
  Container,
  Tab,
  Tabs,
  Paper,
} from "@mui/material";
import useStepper from "hooks/useStepper";
import useDataRef from "hooks/useDataRef";
import about from "images/homelanding/hand-g6c49b2fb9_1280.jpg";
import { useNavigate } from "react-router-dom";
import { MediaQueryBreakpointEnum } from "constants/Global";

function Home(props) {
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [age, setAge] = React.useState("");
  const [individual, setindividual] = React.useState(true);
  const [verificationOTP, setVerificationOTP] = React.useState("");
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
     <LoginHeader/>
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
        <Typography className="text-white" variant="h1" gutterBottom>
          Our Team
        </Typography>
      </div>

      <Container className="py-12" maxWidth="xl">
        <div className="grid grid-cols-3 gap-10 my-12">
          <Typography variant="h3" className="col-span-1">
            We are led by a formidable team of excellent individuals
          </Typography>
          <div className="col-span-2 w-full">
            <div className=" w-10/12 flex flex-col gap-6 ml-auto">
              <Typography variant="h5">
                RAMP is a team of dynamic individuals with a passion for
                change management and depth in their respective areas of
                expertise. Our dedicated employees bring energy, fresh ideas and
                pride to their work.
              </Typography>
              <Typography variant="h5">
                We view RAMP’s culture as a competitive advantage and strive
                to create an environment where smart, motivated and creative
                people succeed. We think big and work hard. We strive for
                excellence in everyday interactions. We constantly push to be
                better. We shoot each other with Nerf guns.
              </Typography>
            </div>
          </div>
        </div>
        <Paper
          className=" w-[35%] mx-auto px-auto flex justify-center"
          sx={{ marginBottom: 4 }}
        >
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Executives" className="font-bold text-base" />
            <Tab label="Tech" className="font-bold text-base" />
            <Tab label="Managers" className="font-bold text-base" />
          </Tabs>
        </Paper>
        <Box className="w-full justify-between grid grid-cols-4 gap-8 px-10">
          {[
            {
              role: "Managing Director",
              name: "Abraham Lincoln",
              img: "Abraham Lincoln",
            },
            { role: "CEO", name: "Abraham Lincoln", img: "Abraham Lincoln" },
            {
              role: "Tech Lead",
              name: "Abraham Lincoln",
              img: "Abraham Lincoln",
            },
            {
              role: "Project Manager",
              name: "Abraham Lincoln",
              img: "Abraham Lincoln",
            },
          ].map((e) => (
            <div
              style={{
                backgroundImage: `url(${about})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100%",
                // backgroundColor: carouselSlides[activeSlideIndex].backgroundColor,
              }}
              className="relative cursor-pointer h-[300px]"
            >
              <div className="absolute  bottom-0 right-0 left-0 top-0  opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="absolute bottom-5 text-center">
                  <Typography className="text-white text-xl font-bold">
                    {e?.name}
                  </Typography>
                  <Typography className="text-white text-base font-bold">
                    {e?.role}
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </Box>
      </Container>
    </div>
  );
}

export default Home;

// import React, { useState } from "react";
// import { Typography, Container, Box, Tab, Tabs, Paper, Button } from "@mui/material";
// import ourStory from "images/homelanding/LandingNGO.6976716afed3705df208.jpg.svg";
// import { RouteEnum } from "constants/RouteConstants";
// import { Link } from "react-router-dom";

// function AboutPage() {
//   const [selectedTab, setSelectedTab] = useState(0);

//   const handleTabChange = (event, newValue) => {
//     setSelectedTab(newValue);
//   };

//   return (
//     <div class=" w-full py-10">
//       <Container className="" maxWidth="xl">
//         <Box sx={{ display: "flex", alignItems: "top" }}>
//           <Paper sx={{ marginRight: 4 }} className="w-3/12 h-full px-5">
//             <Typography className="text-center mb-6" variant="h3">
//               About Us
//             </Typography>
//             <Tabs
//               value={selectedTab}
//               onChange={handleTabChange}
//               orientation="vertical"
//               variant="scrollable"
//               scrollButtons="auto"
//               aria-label="Vertical tabs"
//             >
//               <Tab label="Our Story" />
//               <Tab label="What we do" />
//               <Tab label="Our Values" />
//               <Tab label="Our Team" />
//               <Tab label="Careers" />
//               <Tab label="FAQ" />
//             </Tabs>
//           </Paper>
//           <Typography className="w-full" component="div">
//
//
//             <Box hidden={selectedTab !== 2}>
//               <div className="flex flex-col gap-5 w-8/12">
//                 <Typography variant="h2" gutterBottom>
//                   Our Values
//                 </Typography>
//                 <Typography className='text-base'>
//                   <span class="font-bold">Intergrity:</span> We maintain the
//                   highest standards of professional and ethical behavior and
//                   value transparency and honesty in our communications,
//                   relationships, and action with donors and beneficiaries. All
//                   donation reports are tracked and delivered straight to your
//                   inbox with opportunity to verify
//                 </Typography>
//                 <Typography className='text-base'>
//                   <span class="font-bold">Excellence:</span> We don’t settle for
//                   anything less. We do it right the first time, ensuring that
//                   all reports, request and needs once filed are automatically
//                   reviewed and feedback providied
//                 </Typography>
//                 <Typography className='text-base'>
//                   <span class="font-bold">Professionalism:</span> Our team of
//                   developers, staff, board and champions are ‘’trustworthy,
//                   competent, direct, a self-starter, and a constant
//                   professional.”
//                 </Typography>
//                 <Typography className='text-base'>
//                  <span class="font-bold"> Our Recepient’s:</span> First You are
//                   guaranteed that the needs of all our beneficiaries are
//                   prioritized and delivered. We ensure that all{" "}
//                 </Typography>
//                 <Typography className='text-base'>
//                   <span class="font-bold">Collaboration:</span> We leverage the
//                   power of many to achieve our results. We do not work in silos.
//                   Team spirit, healthy work environment and increased
//                   partnership with internal and external stakeholders.
//                 </Typography>
//                 <Typography className='text-base'>
//                   <span class="font-bold">Impact/Solution Driven:</span> We are
//                   not weighed down by problems. We strongly believe in solving
//                   problems one at a time. We are result driven
//                 </Typography>
//               </div>
//             </Box>
//             <Box hidden={selectedTab !== 3}>
//               <div>
//                 <Typography variant="h2" gutterBottom>
//                   Our Team
//                 </Typography>
//                 <p>Add your content for "Our Team" here...</p>
//               </div>
//             </Box>
//             <Box hidden={selectedTab !== 4}>
//               <div>
//                 <Typography variant="h2" gutterBottom>
//                   Careers
//                 </Typography>
//                 <p>Add your content for "Careers" here...</p>
//               </div>
//             </Box>
//             <Box hidden={selectedTab !== 5}>
//               <div>
//                 <Typography variant="h2" gutterBottom>
//                   FAQ
//                 </Typography>
//                 <div>
//                   <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-md">
//                     Question 1?
//                   </button>
//                   <div className="bg-white p-4 mt-2 shadow-md">
//                     <p className="text-gray-700">Answer 1...</p>
//                   </div>
//                 </div>
//                 <div>
//                   <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-md">
//                     Question 2?
//                   </button>
//                   <div className="bg-white p-4 mt-2 shadow-md">
//                     <p className="text-gray-700">Answer 2...</p>
//                   </div>
//                 </div>
//               </div>
//             </Box>
//           </Typography>
//         </Box>
//       </Container>
//     </div>
//   );
// }

// export default AboutPage;
