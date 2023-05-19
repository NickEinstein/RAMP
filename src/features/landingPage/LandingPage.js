import React, { useEffect, useState } from "react";
import NGO from "images/LandingNGO.jpg";
import Expertise from "images/LandingExpertise.jpg";
import Donor from "images/LandingDonate.jpg";
import {
  AppBar,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { MediaQueryBreakpointEnum } from "constants/Global";
import image from "images/Ramp1.png";
import { RouteEnum } from "constants/RouteConstants";
import { Link } from "react-router-dom";
import { Twitter, Facebook, Instagram, LinkedIn } from "@mui/icons-material";

const HomePage = () => {
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const carouselSlides = [
    {
      image: NGO,
      backgroundColor: "#9a7b4f",
      caption: "Welcome to RAMP",
      subText: "Resource Accessibility and Mobilization Program",
      color: "#3944bc",
    },

    {
      image: NGO,
      backgroundColor: "#9a7b4f",
      caption: " NGOs",
      // subText: "Resource Accessibility and Mobilization Program",
      // color: "#3944bc",
      howItWorks:
        "Register on the platform, add all supporting documents,  wait to be verified and approved and then expect a donation soon",
    },
    {
      image: Expertise,
      backgroundColor: "#b3bdb6",
      caption: " Technical Experts",
      howItWorks:
        "You have the free time to deliver on a particular project? This platform is right for you!!. Signup and pick the solution that you can render",
    },
    {
      image: Donor,
      backgroundColor: "white",
      caption: " Donors",
      howItWorks:
        "Find NGOS that needs your contribution and then make a donation towards the one that best suits your interest",
    },
  ];

  const carouselSlides3 = [
    {
      image: NGO,
      backgroundColor: "#9a7b4f",
      caption: ` Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea 1`,
    },
    {
      image: Expertise,
      backgroundColor: `#b3bdb6`,
      caption: ` Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea 2`,
    },
    {
      image: Donor,
      backgroundColor: `white`,
      caption: ` Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea 3`,
    },
  ];

  const carouselSlides2 = [
    {
      image: NGO,
      backgroundColor: "#9a7b4f",
      caption: "Save the child",
    },
    {
      image: Expertise,
      backgroundColor: "#b3bdb6",
      caption: "Feed the poor",
    },
    {
      image: Donor,
      backgroundColor: "white",
      caption: "Build house of Worship",
    },
    {
      image: NGO,
      backgroundColor: "#9a7b4f",
      caption: "Educate the girl child",
    },
    {
      image: Expertise,
      backgroundColor: "#b3bdb6",
      caption: "Save the environment",
    },
    {
      image: Donor,
      backgroundColor: "white",
      caption: "Keep our Oceans safe",
    },
  ];

  const handleSlideChange = (index) => {
    setActiveSlideIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlideIndex(
        (prevIndex) => (prevIndex + 1) % carouselSlides.length
      );
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div>
      {/* <div
        className="border h-screen"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(${carouselSlides[activeSlideIndex].image})`,
          // backgroundImage: `Url${carouselSlides[activeSlideIndex].image}`,
        }}
      ></div> */}
      <div
        className="relative"
        style={{
          backgroundImage: `url(${carouselSlides[activeSlideIndex].image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          // backgroundColor: carouselSlides[activeSlideIndex].backgroundColor,
        }}
      >
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
              <div className="hidden md:flex md:items-center gap-20">
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
              boxSizing: "border-box",
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

        <div>
          <div
            className={`h-[90vh] w-full flex items-center justify-center transition-opacity duration-500  bg-gray-900 bg-opacity-75`}
          >
            <div className="w-full h-full mx-auto justify-between md:p-8 p-4 md:ml-20 flex">
              <div className="w-full flex flex-col mt-32 items-start">
                <Typography
                  variant={ismd ? "h1" : "h3"}
                  className=" font-bold mb-4 text-[#da663f] md:text-center text-left"
                >
                  {carouselSlides[activeSlideIndex].caption}
                </Typography>
                <Typography variant="h5" className={`text-white md:-mt-5`}>
                  {carouselSlides[activeSlideIndex].subText}
                </Typography>

                <Typography variant="h5" className={`text-white mt-5 md:w-1/2`}>
                  {carouselSlides[activeSlideIndex].howItWorks}
                </Typography>

                <Link className=" py-2" to="/">
                  <Button className="flex items-start px-20 py-4 mt-8">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-1/2 ">
            <div className="absolute bottom-4 left-4 flex space-x-2">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  className={`w-4 h-4 rounded-full ${
                    index === activeSlideIndex ? "bg-gray-900" : "bg-gray-400"
                  }`}
                  onClick={() => handleSlideChange(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>{" "}
      <div className="grid md:grid-cols-4 grid-cols-2 gap-6 justify-around mt-8">
        {[
          "Over 30+ NGOS",
          "Over 50+ DONORS",
          "Over 100+ EXPERTS",
          "Donations Worth Over 30 million+ in Value",
        ].map((text, idx) => (
          <div className="bg-white shadow-lg rounded-lg p-6 w-full flex flex-col justify-center items-center py-16 text-center">
            {/* <img
                className="w-full h-32 object-cover rounded-md mb-4"
                src="path/to/image.jpg"
                alt="Card Image"
              /> */}
            <h2 className="text-xl font-bold mb-2">{text}</h2>
            {/* <p className="text-gray-600">{text}</p> */}
            {idx < 3 && <p className="text-gray-600 text-xl">Registered</p>}
          </div>
        ))}
      </div>
      <div className="bg-white py-12 md:px-12 px-4 ">
        <Typography className="text-center py-6 scrollb" variant="h4">
          Featured Campaigns
        </Typography>
        <div className="flex gap-5 max-w-full overflow-y-scroll scrollbar-hide">
          {carouselSlides2.map((slides) => (
            <div className="relative">
              <img className="h-[300px] min-w-[400px]" src={slides?.image} />
              <Button className="absolute bottom-5 md:right-5 left-5 bg-[#da663f]">
                {slides?.caption}
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white md:py-12 md:px-12 p-4 ">
        <Typography className="text-center py-6 scrollb" variant="h4">
          Testimonials
        </Typography>
        <div className="w-full relative md:h-[400px]">
          {/* {carouselSlides3.map((slide, index) => ( */}
          <div
            className={`flex flex-col md:flex-row  w-full justify-center items-center gap-6 ${
              activeSlideIndex % 2 !== 0 &&
              "md:flex-row-reverse flex-col-reverse"
            }`}
          >
            <div className="md:w-1/2 relative">
              <img
                // key={index}
                src={carouselSlides3[activeSlideIndex]?.image}
                alt={carouselSlides3[activeSlideIndex]?.caption}
                className={`w-full transition-opacity duration-500 h-[400px]`}
              />
              <div className="absolute bottom-4 left-4 flex space-x-2">
                {carouselSlides3.map((_, index) => (
                  <button
                    key={index}
                    className={`w-4 h-4 rounded-full ${
                      index === activeSlideIndex ? "bg-gray-900" : "bg-gray-400"
                    }`}
                    onClick={() => handleSlideChange(index)}
                  ></button>
                ))}
              </div>
            </div>
            <Typography variant="h6" className="font-bold md:w-1/2 text-black">
              {carouselSlides3[activeSlideIndex]?.caption}
            </Typography>
          </div>
          {/* ))} */}
        </div>
      </div>
      {/* <footer className="bg-gray-800 py-4 w-full">
        <div className="container w-full mx-auto flex justify-center gap-24 items-center text-center text-white">
          <div className="flex flex-col gap-5">
            <Typography className="mb-6" variant="h5">
              Contacts
            </Typography>
            <Typography variant="h6">+234 890 46746</Typography>
            <Typography variant="h6">+234 890 46746</Typography>
          </div>

          <div className="flex flex-col gap-5">
            <Typography className="mb-6" variant="h5">
              Social Media
            </Typography>
            <Typography variant="h6">+234 890 46746</Typography>
            <Typography variant="h6">+234 890 46746</Typography>
          </div>
        </div>
      </footer> */}
      <div className="bg-[#b3bdb6">
        <Typography className="text-center pt-10 pb-5" variant="h4">
          Subscribe to Our News Letter
        </Typography>
        <div class="flex justify-center">
          <div class="flex flex-col justify-center items-center pb-12 gap-5 md:w-1/2 w-full p-4">
            <TextField fullWidth placeholder="Email" className="w-full" />
            <Button className="py-4 px-16">Subscribe</Button>
          </div>
        </div>
      </div>
      <div className="flex md:justify-between flex-col md:flex-row md:gap-20 gap-6 items-center px-20 py-5 bg-primary-main text-white ">
        <div className="container text-center">
          <p className="">
            &copy; {new Date().getFullYear()} Resource Accessibility and
            Mobilization Program. All rights reserved.
          </p>
        </div>
        <ul className="flex gap-5 items-center font-bold ">
          <Link to={RouteEnum.LOGIN}>
            <li>DONORS</li>
          </Link>
          <Link to={RouteEnum.LOGIN}>
            <li>NGOS</li>
          </Link>
          <Link to={RouteEnum.LOGIN}>
            <li>EXPERTS</li>
          </Link>
        </ul>
        <ul className="flex space-x-4">
          <li>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter fontSize="large" />
            </a>
          </li>
          <li>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook fontSize="large" />
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram fontSize="large" />
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn fontSize="large" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
