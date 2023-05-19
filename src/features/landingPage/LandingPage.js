import React, { useEffect, useState } from "react";
import NGO from "images/LandingNGO.jpg";
import Expertise from "images/LandingExpertise.jpg";
import Donor from "images/LandingDonate.jpg";
import { AppBar, Button, TextField, Toolbar, Typography } from "@mui/material";
import image from "images/Ramp1.png";
import { RouteEnum } from "constants/RouteConstants";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const carouselSlides = [
    {
      image: NGO,
      backgroundColor: "#9a7b4f",
      caption: "Welcome To RAMP",
      subText: "Resource Accessibility and Mobilization Program",
      color: "#3944bc",
    },

    {
      image: NGO,
      backgroundColor: "#9a7b4f",
      caption: "Register As An NGO",
      // subText: "Resource Accessibility and Mobilization Program",
      // color: "#3944bc",
      howItWorks: [
        `Tell us about yourself and your organization.`,
        `Create your profile.`,
        ` Once approved, proceed to make a request .`,
        ` The more complete your profile is, the better chance you'll be approved on time and your most valued need met.`,
      ],
    },
    {
      image: Expertise,
      backgroundColor: "#b3bdb6",
      caption: "Register As A Technical Expert",
      howItWorks: [
        ` Create your profile`,
        `Search our pool of vibrant and vetted NGOs/CSOs`,
        ` Reach out and connect`,
        ` When you've found NGO’s |CSO’s you’ll like to provide technical expertise to, introduce yourself! and share how youwish to support them and for what time frame`,
      ],
    },
    {
      image: Donor,
      backgroundColor: "white",
      caption: "Register As A Donor",
      howItWorks: [
        `  Create your profile by sharing who you are, your vision and
                       useful information .`,
        ` As a financial donor, search our NGO/CSO profiles to choose
                        the nonprofit. you will like to fund. You can view their
                        areas of interest, specialization , country etc.`,
        `  Choose an amount and how often you wish to make this
                        donation Once you make a donation.`,
        `  Look out for an official email from us to guarantee maximum
                        impact`,
      ],
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
      caption: "Slide 1",
    },
    {
      image: Expertise,
      backgroundColor: "#b3bdb6",
      caption: "Slide 2",
    },
    {
      image: Donor,
      backgroundColor: "white",
      caption: "Slide 3",
    },
    {
      image: NGO,
      backgroundColor: "#9a7b4f",
      caption: "Slide 1",
    },
    {
      image: Expertise,
      backgroundColor: "#b3bdb6",
      caption: "Slide 2",
    },
    {
      image: Donor,
      backgroundColor: "white",
      caption: "Slide 3",
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
              <img src={image} className="max-w-[120px]" />
            </Typography>
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
        <div>
          <div
            className={`h-[90vh] w-full flex items-center justify-center transition-opacity duration-500  bg-gray-900 bg-opacity-75 `}
          >
            <div className="w-full h-full mx-auto justify-between p-8 flex">
              <div className="w-1/2 flex flex-col mt-32 items-start">
                <Typography
                  variant="h2"
                  className=" font-bold mb-4 text-[#da663f]"
                >
                  {carouselSlides[activeSlideIndex].caption}
                </Typography>
                <Typography variant="h5" className={`text-white -mt-5`}>
                  {carouselSlides[activeSlideIndex].subText}
                </Typography>

                <Link className="px-10 py-2" to="/">
                  <Button className="flex items-start px-20 py-4 mt-8">
                    Sign In
                  </Button>
                </Link>
              </div>
              <ul className="w-2/5 flex flex-col mt-32 items-start gap-3 font-bold text-white">
                {carouselSlides[activeSlideIndex].howItWorks && (
                  <Typography variant="h3" className="text-white">
                    How it Works
                  </Typography>
                )}
                {carouselSlides[activeSlideIndex].howItWorks?.map((text) => (
                  <li className="list-disc">
                    <Typography
                      variant="h6"
                      className=" font-bold  text-white list-disc "
                    >
                      {text}
                    </Typography>
                  </li>
                ))}
                {/* <li className="list-disc">
                  <Typography variant="h6" className=" font-bold  text-white ">
                    As a financial donor, search our NGO/CSO profiles to choose
                    the nonprofit. you will like to fund. You can view their
                    areas of interest, specialization , country etc.
                  </Typography>
                </li>{" "}
                <li className="list-disc">
                  <Typography variant="h6" className=" font-bold  text-white ">
                    Choose an amount and how often you wish to make this
                    donation Once you make a donation.
                  </Typography>
                </li>{" "}
                <li className="list-disc">
                  <Typography variant="h6" className=" font-bold  text-white ">
                    Look out for an official email from us to guarantee maximum
                    impact
                  </Typography>
                </li> */}
              </ul>
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
      <div className="flex gap-6 justify-around mt-8">
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
      <div className="bg-white py-12 px-12 ">
        <Typography className="text-center py-6 scrollb" variant="h4">
          Featured Campaigns
        </Typography>
        <div className="flex gap-5 max-w-full overflow-y-scroll scrollbar-hide">
          {carouselSlides2.map((slides) => (
            <img className="h-[300px] min-w-[400px]" src={slides.image} />
          ))}
        </div>
      </div>
      <div className="bg-white py-12 px-12 ">
        <Typography className="text-center py-6 scrollb" variant="h4">
          Testimonials
        </Typography>
        <div className="w-full relative h-[400px]">
          {/* {carouselSlides3.map((slide, index) => ( */}
          <div
            className={`flex w-full justify-center items-center gap-6 ${activeSlideIndex%2 !==0 && 'flex-row-reverse'}`}
          >
            <div className="w-1/2">
              <img
                // key={index}
                src={carouselSlides3[activeSlideIndex]?.image}
                alt={carouselSlides3[activeSlideIndex]?.caption}
                className={`w-full transition-opacity duration-500 h-[400px]`}
              />
            </div>
            <Typography variant="h6" className="font-bold w-1/2 text-black">
              {carouselSlides3[activeSlideIndex]?.caption}
            </Typography>
          </div>
          {/* ))} */}
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
          <div class="flex flex-col justify-center items-center pb-12 gap-5 w-1/2">
            <TextField fullWidth placeholder="Email" className="w-full" />
            <Button className="py-4 px-16">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
