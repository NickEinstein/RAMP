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
} from "@mui/material";
import useStepper from "hooks/useStepper";
import useDataRef from "hooks/useDataRef";
import about from "images/homelanding/whatwedo.jpg";
import { useNavigate } from "react-router-dom";
import { MediaQueryBreakpointEnum } from "constants/Global";

function Home(props) {
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [age, setAge] = React.useState("");
  const [individual, setindividual] = React.useState(true);
  const [verificationOTP, setVerificationOTP] = React.useState("");

  return (
    <div>
      <AppBar position="static">
        <Toolbar className="flex justify-between bg-white text-black">
          <Typography variant="h6" component="div">
            <img src={image} className="max-w-[120px]" alt="Logo" />
          </Typography>
          <div className="flex items-center cursor-pointer">
            <div className="md:hidden" onClick={() => setDrawerOpen(true)}>
              <svg className="w-6 h-6 text-black" viewBox="0 0 24 24">
                <path
                  className="fill-current"
                  d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"
                />
              </svg>
            </div>
            <div className="hidden md:flex md:items-center">
              <ul className="md:flex md:gap-8 text-base font-bold">
                <Link to={RouteEnum.ABOUT}>
                  <li className="hover:text-[#da663f]">About</li>
                </Link>
                <li className="hover:text-[#da663f]">How it Works</li>
                <li className="hover:text-[#da663f]">Contact</li>
              </ul>
              <div className="md:flex md:gap-4">
                <Link to={RouteEnum.SIGNUP}>
                  <Button className="px-10 py-2">Sign Up</Button>
                </Link>
                <Link to={RouteEnum.LOGIN}>
                  <Button className="px-10 py-2">Sign In</Button>
                </Link>
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "-box",
            width: 240,
          },
        }}
        anchor="left"
        className="w-64"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Link to={RouteEnum.LANDING}>
          <img src={image} className="max-w-[128px]" alt="Logo" />
        </Link>

        <List>
          <Link to={RouteEnum.ABOUT}>
            <ListItem button>
              <ListItemText primary="About" />
            </ListItem>
          </Link>
          <ListItem button>
            <ListItemText primary="How it Works" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Contact" />
          </ListItem>
        </List>
      </Drawer>
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
          What we do
        </Typography>
      </div>

      <Container className="py-12" maxWidth="xl">
        <Box>
          <div className="w-10/12 text-base">
            <div className="flex flex-col gap-5">
              <Typography
                className="text-base
                  "
              >
                We are the only platform that provides a one stop solution to
                all nonprofit and donor needs.
              </Typography>
              <Typography
                className="text-base
                  "
              >
                We connect nonprofits across Africa to all the valuable
                resources that they need to be sustainable and improve the lives
                of people living in poverty.{" "}
              </Typography>

              <Typography
                className="text-base
                  "
              >
                RAMP is a platform that lets donors like you send money,
                technical expertise and in-kind donations directly to trusted
                and vetted organizations tackling life threatening issues (SDGs)
                in Africa; improving the world’s poorest households and ensuring
                they remain out of the poverty line by ensuring their solutions
                are sustainable.{" "}
              </Typography>

              <Typography
                className="text-base
                  "
              >
                We provide resource mobilization, capacity building and a rich
                pool of diverse funding needs for nonprofit organizations
              </Typography>

              <Typography
                className="text-base
                  "
              >
                We believe that for many Africans to stay out of poverty then
                investment must be sustainable.{" "}
              </Typography>

              <Typography
                className="text-base
                  "
              >
                Since 2018, we’ve delivered $30M+ to nonprofits in Nigeria,
                Ghana and Tanzania and other countries . These funds were used
                to build libraries in garbage centered communities, empower
                young people in tech, enroll thousands of children back in
                school, empower over 5000 women from extremely poor communities
                with business skills and grants to enable them consistently
                support their families amongst many others
              </Typography>

              <Typography
                className="text-base
                  "
              >
                RAMP is funded by individual donors, foundations, businesses,
                and institutions.
              </Typography>
            </div>
          </div>
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
