import React, { useEffect, useState } from "react";

// import image from "images/homelanding/howItWorks.jpg";
import LoginHeader from "common/LoginHeader";

import {
  Box,
  Button,
 
  Typography,
  
  useMediaQuery,
  
  Container,
} from "@mui/material";
import useStepper from "hooks/useStepper";
import useDataRef from "hooks/useDataRef";
import about from "images/homelanding/howItWorks.jpg";
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
      <LoginHeader color={true} />

      <Typography className="text-center my-12" variant="h1" gutterBottom>
        How It Works
      </Typography>

      <Container className="py-12" maxWidth="xl">
        <div>
          <div className="flex gap-20">
            <div className="w-2/5">
              <img src={about} />
            </div>
            <div>
              <Typography className="font-bold" variant="h5">For Donors</Typography>
              <Typography className="text-base" component={'div'}>
               <Typography className="text-base my-2">
                 Start by deciding if you are donating funds or your
                  technical expertise.
               </Typography>
                <Typography className="text-base my-2">
                  Create your profile by sharing who you are,
                  your vision and useful information .
                </Typography>
                <Typography className="text-base my-2">
                  As a financial donor,
                  search our NGO/CSO profiles to choose the nonprofit. you will
                  like to fund. You can view their areas of interest,
                  specialization , country etc.
                </Typography>
                <Typography className="text-base my-2">
                  Choose an amount and how often you
                  wish to make this donation
                </Typography>
                <Typography className="text-base my-2">
                  Once you make a donation. Look out
                  for an official email from us to guarantee maximum impact
                </Typography>
              </Typography>
            </div>
          </div>
          <div></div>
        </div>
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
//             <Box hidden={selectedTab !== 0}>
//               <div className="w-10/12 text-base">
//                 <Typography variant="h2" gutterBottom>
//                   Our Story
//                 </Typography>
//                 <Typography
//                   className="underline-offset-2 font-bold underline mb-5"
//                   variant="h5"
//                 >
//                   The Power of a Table and Chair
//                 </Typography>

//                 <div class="flex flex-col gap-4 text-base">
//                   <Typography className="text-base">
//                     In 2017 our founder, sat on her sons chair with her laptop
//                     placed on the bed, working on the new vision that is to
//                     become Donors for Africa Foundation. As she bemoaned the
//                     growing pain on her waist as a result of her posture, she
//                     took a break to scroll through instagram.
//                   </Typography>
//                   <Typography className="text-base">
//                     Few minutes later she read a post asking people to ‘’Make an
//                     Ask’’. She did.
//                   </Typography>
//                   <Typography className="text-base">
//                     She asked for a Table and Chair.
//                   </Typography>
//                   <Typography className="text-base">
//                     The next day, Chizoba O. Atsu delivered a brown mahogany
//                     table to her home and the rest they say is history. Since
//                     then, she has gone on to;
//                   </Typography>
//                   <ul className="list-inside list-disc pl-8">
//                     <li>Birth the DFA Vision</li>
//                     <li>
//                       Trained over 5000+ nonprofits who have raised over $30M in
//                       funding
//                     </li>
//                     <li>
//                       Funds have been used to launch school libraries, back to
//                       school programs, women empowerment campaigns and so much
//                       more which has directly transformed the lives of so many
//                       Africans reaching over 51,000 people weekly with life
//                       changing stories, learning and solutions. and so many more
//                       results.
//                     </li>

//                     <img src={ourStory} />
//                   </ul>

//                   <Typography className="text-base">
//                     With experience gathered from over 14years designing
//                     accelerator programs, leading changemakers from 20 African
//                     countries and different continents; RAMP is designed to help
//                     organizations scale up their impact in the communities they
//                     serve and transform their countries.
//                   </Typography>

//                   <Typography className="text-base">
//                     You can make direct donations as;
//                   </Typography>

//                   <Typography className="text-base font-bold">
//                     An Individual
//                   </Typography>
//                   <Typography className="text-base font-bold">
//                     A Government
//                   </Typography>
//                   <Typography className="text-base font-bold">
//                     A Technical Expert
//                   </Typography>
//                   <Typography className="text-base font-bold">
//                     A Growing Business
//                   </Typography>
//                   <Typography className="text-base font-bold">
//                     A multinational or private sector company, to trusted
//                     organizations across Africa.
//                   </Typography>
//                 </div>

//                 <div className="my-8 flex flex-col justify-center items-center">
//                   <Typography
//                     variant="h4"
//                     className="text-primary-main font-bold text-center"
//                   >
//                     SIGN UP TODAY TO MAKE A DONATION
//                   </Typography>
//                   <Link to={RouteEnum.SIGNUP}>
//                     <Button className="text-base py-3 px-12 my-5">
//                       SING UP
//                     </Button>
//                   </Link>
//                 </div>

//                 <div className="text-base font-bold w-full flex justify-end mt-16">
//                   <div className="">
//                     <Typography className="text-base font-bold text-center">
//                       Thank You!
//                     </Typography>
//                     <Typography className="text-base font-bold text-center my-3">
//                       Signature
//                     </Typography>
//                     <Typography className="text-base font-bold text-center">
//                       Founder and CEO
//                     </Typography>
//                     <Typography className="text-base font-bold text-center">
//                       Donors for Africa Foundation
//                     </Typography>
//                   </div>
//                 </div>
//               </div>
//             </Box>
//             <Box hidden={selectedTab !== 1}>
//               <div className="w-10/12 text-base">
//                 <Typography variant="h2" gutterBottom>
//                   What we do
//                 </Typography>
//                 <div className="flex flex-col gap-5">
//                   <Typography
//                     className="text-base
//                  "
//                   >
//                     We are the only platform that provides a one stop solution
//                     to all nonprofit and donor needs.
//                   </Typography>
//                   <Typography
//                     className="text-base
//                  "
//                   >
//                     We connect nonprofits across Africa to all the valuable
//                     resources that they need to be sustainable and improve the
//                     lives of people living in poverty.{" "}
//                   </Typography>

//                   <Typography
//                     className="text-base
//                  "
//                   >
//                     RAMP is a platform that lets donors like you send money,
//                     technical expertise and in-kind donations directly to
//                     trusted and vetted organizations tackling life threatening
//                     issues (SDGs) in Africa; improving the world’s poorest
//                     households and ensuring they remain out of the poverty line
//                     by ensuring their solutions are sustainable.{" "}
//                   </Typography>

//                   <Typography
//                     className="text-base
//                  "
//                   >
//                     We provide resource mobilization, capacity building and a
//                     rich pool of diverse funding needs for nonprofit
//                     organizations
//                   </Typography>

//                   <Typography
//                     className="text-base
//                  "
//                   >
//                     We believe that for many Africans to stay out of poverty
//                     then investment must be sustainable.{" "}
//                   </Typography>

//                   <Typography
//                     className="text-base
//                  "
//                   >
//                     Since 2018, we’ve delivered $30M+ to nonprofits in Nigeria,
//                     Ghana and Tanzania and other countries . These funds were
//                     used to build libraries in garbage centered communities,
//                     empower young people in tech, enroll thousands of children
//                     back in school, empower over 5000 women from extremely poor
//                     communities with business skills and grants to enable them
//                     consistently support their families amongst many others
//                   </Typography>

//                   <Typography
//                     className="text-base
//                  "
//                   >
//                     RAMP is funded by individual donors, foundations,
//                     businesses, and institutions.
//                   </Typography>
//                 </div>
//               </div>
//             </Box>
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
