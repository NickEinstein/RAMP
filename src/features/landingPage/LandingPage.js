import React, { useEffect, useState } from "react";
import NGO from "images/LandingNGO.jpg";
import Giving from "images/Giving.png";
import Hands from "images/homelanding/hand-g6c49b2fb9_1280.jpg";
import Kidss from "images/homelanding/kids-g92fbd2d9c_1280.jpg";
import Africa from "images/homelanding/africa-g354936ced_1280.jpg";
import Expertise from "images/LandingExpertise.jpg";
import WhoWeAre from "images/homelanding/whowearee.svg";
import WhoWeAreNGO from "images/homelanding/NGOpic.svg";
// import WhoWeAre from "images/whoWeAre.png";
import Kids from "images/children.png";
import Office from "images/office.png";
import Rocks from "images/rocks.png";
import Donate from "images/donate.png";
import SmilingGirl from "images/Bukola Bamiduro, Founder, Karis & Eleos Foundation..png";
import Quote from "images/quote.svg";
import User from "images/user.svg";
import Cpu from "images/cpu.svg";
// import Carousel from "react-multi-carousel";

import carouselpic from "images/homepagefirstsection/doug-linstedt-jEEYZsaxbH4-unsplash.jpg";
import carouselpic2 from "images/homepagefirstsection/pexels-curtis-loy-5196014.jpg";
import videoz from "images/featuredCampaign/MVI_9411 (1).mp4";

import ReactPlayer from "react-player";

import Briefcase from "images/Briefcase.svg";
import SDG from "images/SDGs (1).png";
import SDG1 from "images/sdg/E-WEB-Goal-01.png";
import SDG2 from "images/sdg/E-WEB-Goal-02.png";
import SDG3 from "images/sdg/E-WEB-Goal-03.png";
import SDG4 from "images/sdg/E-WEB-Goal-04.png";
import SDG5 from "images/sdg/E-WEB-Goal-05.png";
import SDG6 from "images/sdg/E-WEB-Goal-06.png";
import SDG7 from "images/sdg/E-WEB-Goal-07.png";
import SDG9 from "images/sdg/E-WEB-Goal-08.png";
import SDG8 from "images/sdg/E-WEB-Goal-09.png";
import SDG10 from "images/sdg/E-WEB-Goal-10.png";
import SDG11 from "images/sdg/E-WEB-Goal-11.png";
import SDG12 from "images/sdg/E-WEB-Goal-12.png";
import SDG13 from "images/sdg/E-WEB-Goal-13.png";
import SDG14 from "images/sdg/E-WEB-Goal-14.png";
import SDG15 from "images/sdg/E-WEB-Goal-15.png";
import SDG16 from "images/sdg/E-WEB-Goal-16.png";
import SDG17 from "images/sdg/E-WEB-Goal-17.png";
import FEATUREDCAMP1 from "images/featuredCampaign/WhatsApp Image 2023-06-26 at 5.28.07 PM.jpeg";
import FEATUREDCAMP2 from "images/featuredCampaign/WhatsApp Image 2023-06-28 at 11.53.13 AM (1).jpeg";
import FEATUREDCAMP3 from "images/featuredCampaign/WhatsApp Image 2023-07-01 at 2.41.22 PM.jpeg";
import Outstreched from "images/Outstreched.png";
import Solutions from "images/Solutions.png";
import HelpingHands from "images/HelpingHands.png";
import Flowers from "images/Flowers.png";
import Preserving from "images/Preserving.png";
import Empowerment from "images/Empowerment.png";
import Gallery from "images/homelanding/bina.PNG";
import NewSide from "images/homelanding/NewToSide.svg";
import Knowledge from "images/Knowledge.png";
import Gallery1 from "images/Gallery1.png";
import Gallery2 from "images/Gallery2.png";
import Gallery3 from "images/Gallery3.png";
import RampFooter from "images/RampFooter.svg";
import {
  AppBar,
  Button,
  Drawer,
  List,
  Fade,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  LinearProgress,
  Rating,
} from "@mui/material";
import { MediaQueryBreakpointEnum } from "constants/Global";
import image from "images/logo2.svg";
// import image from "images/Ramp1.png";
import { RouteEnum } from "constants/RouteConstants";
import { Link } from "react-router-dom";
import {
  Twitter,
  Facebook,
  Instagram,
  LinkedIn,
  ArrowBackIosNewOutlined,
  ArrowLeft,
  ArrowRight,
  ArrowRightOutlined,
  ArrowForward,
  ArrowBack,
} from "@mui/icons-material";
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import LoginHeader from "common/LoginHeader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "common/Footer";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const HomePage = () => {
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);
  const islg = useMediaQuery(MediaQueryBreakpointEnum.lg);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [activeSlideIndex3, setActiveSlideIndex3] = useState(0);
  const [activeSlideIndex4, setActiveSlideIndex4] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    // dots: true,
    // infinite: true,
    //  fade: true,
    //  speed: 100,
    // slidesToShow: 3,
    // slidesToScroll: 2,
    autoplay: true,
    // speed: 2000,
    autoplaySpeed: 7000,
    cssEase: "linear",
    //  pauseOnHover: true,
    responsive: [
      // {
      //   breakpoint: 1024,
      //   settings: {
      //     slidesToShow: 3,
      //     slidesToScroll: 3,
      //     infinite: true,
      //     dots: true,
      //   },
      // },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const settings2 = {
    dots: true,
    infinite: true,
    fade: true,
    //  speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    //  pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const {
      carouselState: { currentSlide },
    } = rest;
    // remember to give it position:absolute

    return (
      <div className="absolute top-0 right-0 mb-10 gap-3">
        <Button
          className={
            currentSlide === 0 ? "disable p-2 mb-4 mr-4" : "p-2 mb-4 mr-4"
          }
          onClick={() => previous()}
        >
          {<ArrowBack className="text-lg" />}
        </Button>
        <Button className="p-2 mb-4" onClick={() => next()}>
          {<ArrowForward className="text-lg" />}
        </Button>
      </div>
    );
  };

  const carouselSlides = [
    // {
    //   image: NGO,
    //   backgroundColor: "#9a7b4f",
    //   caption: "Welcome to RAMP",
    //   subText: "Resource Accessibility and Mobilization Program",
    //   color: "#3944bc",
    // },

    {
      image: NewSide,
      backgroundColor: "#9a7b4f",
      caption: "Welcome to",
      caption2: "RAMP",
      subCaption:
        "For Governments, CSO's, Private and Public Sector Companies, Individuals and International Agencies",
      //  "Resource Acceleration & Mobilization Platform",
      // subText: "Experience the true impact of your generosity by joining RAMP, the leading platform connecting donors like you with trusted nonprofits in Africa. Together, we can break the chains of poverty, empower communities, and create a sustainable future. Sign up today and be a catalyst for change.",
      color: "#C654D1",
    },
    // {
    //   image: carouselpic,
    //   backgroundColor: "#9a7b4f",
    //   caption: "Welcome to",
    //   caption2: "RAMP",
    //   subCaption: "Resource Acceleration & Mobilization Platform",
    //   // subText: "Experience the true impact of your generosity by joining RAMP, the leading platform connecting donors like you with trusted nonprofits in Africa. Together, we can break the chains of poverty, empower communities, and create a sustainable future. Sign up today and be a catalyst for change.",
    //   color: "#C654D1",
    // },

    // {
    //   image: Kidss,
    //   backgroundColor: "#9a7b4f",
    //   caption: "Send Support Directly to ",
    //   caption2: " Those in Need!",
    //   subCaption:
    //     "For Governments, CSO's, Private and Public Sector Companies, Individuals and International Agencies",
    //   // subText: "Experience the true impact of your generosity by joining RAMP, the leading platform connecting donors like you with trusted nonprofits in Africa. Together, we can break the chains of poverty, empower communities, and create a sustainable future. Sign up today and be a catalyst for change.",
    //   color: "#C654D1",
    // },
    // {
    //   image: carouselpic2,
    //   backgroundColor: "#9a7b4f",
    //   caption: "Send Support Directly to ",
    //   caption2: " Those in Need!",
    //   subCaption:
    //     "For Governments, CSO's, Private and Public Sector Companies, Individuals and International Agencies",
    //   // subText: "Experience the true impact of your generosity by joining RAMP, the leading platform connecting donors like you with trusted nonprofits in Africa. Together, we can break the chains of poverty, empower communities, and create a sustainable future. Sign up today and be a catalyst for change.",
    //   color: "#C654D1",
    // },
  ];

  const carouselSlides3 = [
    {
      image: SmilingGirl,
      backgroundColor: "#9a7b4f",
      name: "Bukola Bamiduro, Founder, Karis Eleos.",
      company: "",
      captionHeader: "A GAME CHANGER",
      caption: `We have leveraged DFA’s expertise to access our first grant of $300,000 and since then we continue to grow in leaps and bounds. Indeed, DFA  is tested and trusted. They deliver with top-notch excellence."`,
    },
    {
      image: SmilingGirl,
      backgroundColor: "#9a7b4f",
      name: "Bukola Bamiduro, Founder, Karis Eleos.",
      company: "",
      captionHeader: "A GAME CHANGER",
      caption: `We have leveraged DFA’s expertise to access our first grant of $300,000 and since then we continue to grow in leaps and bounds. Indeed, DFA  is tested and trusted. They deliver with top-notch excellence."`,
    },
    {
      image: SmilingGirl,
      backgroundColor: "#9a7b4f",
      name: "Bukola Bamiduro, Founder, Karis Eleos.",
      company: "",
      captionHeader: "A GAME CHANGER",
      caption: `We have leveraged DFA’s expertise to access our first grant of $300,000 and since then we continue to grow in leaps and bounds. Indeed, DFA  is tested and trusted. They deliver with top-notch excellence."`,
    },
    // {
    //   image: Expertise,
    //   backgroundColor: `#b3bdb6`,
    //   caption: ` Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
    //           nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
    //           erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
    //           tation ullamcorper suscipit lobortis nisl ut aliquip ex ea 2`,
    // },
    // {
    //   image: Donor,
    //   backgroundColor: `white`,
    //   caption: ` Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
    //           nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
    //           erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
    //           tation ullamcorper suscipit lobortis nisl ut aliquip ex ea 3`,
    // },
  ];

  const sdg = [
    {
      sdg: SmilingGirl,
      caption: `We have leveraged DFA’s expertise to access our first grant of $300,000 and since then we continue to grow in leaps and bounds. Indeed, DFA  is tested and trusted. They deliver with top-notch excellence."`,
    },
    {
      sdg: SmilingGirl,
      caption: `We have leveraged DFA’s expertise to access our first grant of $300,000 and since then we continue to grow in leaps and bounds. Indeed, DFA  is tested and trusted. They deliver with top-notch excellence."`,
    },
    {
      sdg: SmilingGirl,
      caption: `We have leveraged DFA’s expertise to access our first grant of $300,000 and since then we continue to grow in leaps and bounds. Indeed, DFA  is tested and trusted. They deliver with top-notch excellence."`,
    },
    {
      sdg: SmilingGirl,
      caption: `We have leveraged DFA’s expertise to access our first grant of $300,000 and since then we continue to grow in leaps and bounds. Indeed, DFA  is tested and trusted. They deliver with top-notch excellence."`,
    },
    {
      sdg: SmilingGirl,
      caption: `We have leveraged DFA’s expertise to access our first grant of $300,000 and since then we continue to grow in leaps and bounds. Indeed, DFA  is tested and trusted. They deliver with top-notch excellence."`,
    },
    // { sdg: SDG6 },
    // { sdg: SDG7 },
    // { sdg: SDG9 },
    // { sdg: SDG8 },
    // { sdg: SDG10 },
    // { sdg: SDG11 },
    // { sdg: SDG12 },
    // { sdg: SDG13 },
    // { sdg: SDG14 },
    // { sdg: SDG15 },
    // { sdg: SDG16 },
    // { sdg: SDG17 },
  ];

  const FeaturedCampaign = [
    {
      featuredCamp: FEATUREDCAMP1,
      caption: "Support Them",
      text: "This project is focused on inspiring young minds and edveloping creative thinkers with 21st century job skills. Children from the ages of 5 are introduced to tech skills Robotics, Website Development, Engineering, Programming etc.",
    },
    {
      featuredCamp: FEATUREDCAMP2,
      caption: "Support Them",
      text: "The digital and entrepreneurship training for persons living with disabilities (PWDs) is a skills program that equips young persons with disability with technical know how on how to thrive in the work place and earn an income. This project prepares them for the workplace so  that rather than stay hidden, they can  earn and income contribute their skills toward development",
    },
  ];

  const carouselSlides2 = [
    {
      image: Kids,
      backgroundColor: "#9a7b4f",
      caption: "Save the child",
    },
    {
      image: Donate,
      backgroundColor: "#b3bdb6",
      caption: "Feed the poor",
    },
    {
      image: Rocks,
      backgroundColor: "white",
      caption: "Build house of Worship",
    },
    {
      image: Office,
      backgroundColor: "#9a7b4f",
      caption: "Educate the girl child",
    },
    // {
    //   image: Expertise,
    //   backgroundColor: "#b3bdb6",
    //   caption: "Save the environment",
    // },
    // {
    //   image: Donor,
    //   backgroundColor: "white",
    //   caption: "Keep our Oceans safe",
    // },
  ];

  const carouselSlides4 = [
    {
      id: 1,
      image: FEATUREDCAMP1,
      alt: "Gallery",
      caption:
        "This project is focused on inspiring young minds and edveloping creative thinkers with 21st century job skills. Children from the ages of 5 are introduced to tech skills Robotics, Website Development, Engineering, Programming etc.",
      header:
        "Prepare African Children for the Future - Catch them Young (Ghana)",
    },
    {
      id: 2,
      image: FEATUREDCAMP2,
      caption: `
        The digital and entrepreneurship training for persons living with disabilities (PWDs) is a skills program that equips young persons with disability with technical know how on how to thrive in the work place and earn an income. This project prepares them for the workplace so  that rather than stay hidden, they can  earn and income contribute their skills toward development
      `,
      alt: "Gallery",
      header:
        "Fund a Youth/Person Living with Disability - PWDs Digital and Entrepreneurship Training ",
    },
    {
      id: 3,
      image: Gallery,
      caption: "",
      alt: "Gallery",
      header:
        "Help Survivors of Domestic Abuse become empowered- Bina Al-Amal Foundation- Nigeria",
    },
    {
      id: 4,
      caption:
        "provide children and young persons with disabilities access to technology such as robotics, artificial intelligence, digital and vocational skills to become self reliant and unleash the abilities in their disability. ",
      image: FEATUREDCAMP3,
      alt: "Gallery",
      header: "Build A Disability Empowerment Center",
    },
  ];

  // const videoSource = "https://www.youtube.com/watch?v=2po9_CIRW7I";

  const stats = [
    {
      id: 1,
      num: "$30M+",
      subTextBold: "Donations",
      subText: " Raised",
    },
    {
      id: 2,
      num: "500+",
      subTextBold: "Nonprofits",
      subText: "Vetted",
    },
    {
      id: 3,
      num: "100+",
      subTextBold: "DONORS",
      subText: "Registered",
    },
    {
      id: 4,
      num: "100+",
      subTextBold: "TECHNICAL EXPERTS",
      subText: "Registered",
    },
  ];

  const donors = [
    {
      id: 1,
      image: Outstreched,
      alt: "Outstreched",
    },
    {
      id: 2,
      image: Solutions,
      alt: "Solutions",
    },
    {
      id: 3,
      image: HelpingHands,
      alt: "HelpingHands",
    },
    {
      id: 4,
      image: Flowers,
      alt: "Flowers",
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
      setActiveSlideIndex3(
        (prevIndex) => (prevIndex + 1) % carouselSlides3.length
      );
      setActiveSlideIndex4(
        (prevIndex) => (prevIndex + 1) % carouselSlides3.length
      );
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  console.log(activeSlideIndex3);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

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
        style={{
          // backgroundImage: `url(${carouselSlides[activeSlideIndex].image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          // carouselpic2,
          backgroundColor: "#F9EEFA",
        }}
      >
        <LoginHeader />

        <div className="bg-black/10">
          <div
            className={` lg:h-[90vh] w-full md:px-20 p-4 flex items-center justify-between transition-opacity duration-500 
             `}
          >
            <div className="w- h-full w-full flex flex-col">
              <div className="flex flex-col items-center md:items-start md:mt-28 mt-2">
                <Typography
                  variant={islg ? "h1" : ismd ? "h2" : "h2"}
                  className=" font-bold text-left md:w-4/5 text-[#01B6AC]"
                >
                  {carouselSlides[activeSlideIndex].caption}
                </Typography>
                <Typography
                  variant={islg ? "h1" : ismd ? "h2" : "h2"}
                  className=" font-bold mb-4 text-left md:w-4/5 text-[#01B6AC]"
                >
                  {carouselSlides[activeSlideIndex].caption2}
                </Typography>

                <Typography
                  variant={islg ? "h5" : ismd ? "h5" : "h6"}
                  className=" font-medium mb-4 text-[#555555] text-left md:w-[70%] mt-6"
                >
                  {carouselSlides[activeSlideIndex].subCaption}
                </Typography>

                {/* <div className="w-full flex justify-center">
                  <Typography className={`text-white md:-mt-5 lg:mt-5 md:w-2/3 text-sm md:text-base text-center`}>
                    {carouselSlides[activeSlideIndex].subText}
                  </Typography>
                    
                </div> */}

                {/* <Typography  className="text-white mt-5 md:w-1/2 text-sm md:text-base">
                  {carouselSlides[activeSlideIndex].howItWorks}
                </Typography> */}
              </div>
              <div className="flex md:flex-row gap-5 items-center md:justify-start justify-center w-full mt-12">
                <Link className=" py-2" to={RouteEnum.SIGNUP}>
                  <Button className="flex w-full rounded-xl mx-auto text-[14px] px-10 md:w-full items-center   lg:py-4 lg:mt-8 border-solid border-2  border-[#C654D1] bg-[#C654D1] font-bold hover:border-[#C654D1] hover:bg-[#C654D1]">
                    Sign Up
                  </Button>
                </Link>

                <Link className=" py-2" to={RouteEnum.SIGNUP}>
                  <Button className="flex mx-auto text-[14px] rounded-xl w-full  md:w-full items-center px-4  lg:py-4 lg:mt-8 border-solid border-2  border-white bg-white text-[#C654D1] font-bold">
                    Fund a Nonprofit
                  </Button>
                </Link>

                {/* <Link className=" py-2" to={RouteEnum.SIGNUP}>
                  <Button className="flex mx-auto text-[14px] rounded-xl w-full  md:w-full items-center px-4  lg:py-4 lg:mt-8 border-solid border-2  border-white bg-transparent hover:border-[#C654D1] hover:bg-[#C654D1]">
                    Request Technical Expertise
                  </Button>
                </Link>

                <Link className=" py-2" to={RouteEnum.SIGNUP}>
                  <Button className="flex mx-auto text-[14px] rounded-xl w-full  md:w-full items-center px-4  lg:py-4 lg:mt-8 border-solid border-2  border-white bg-transparent hover:border-[#C654D1] hover:bg-[#C654D1]">
                    Make an In-Kind Donation
                  </Button>
                </Link> */}
              </div>
            </div>

            <div className="md:flex justify-end w-full hidden">
              {/* <div className=" relative h-[543px] w-[556px] bg-white px-16 rounded-2xl">
                <Button className="bg-[#3E40951A] text-[#01B6AC] min-w-[100px] rounded-xl font-bold p-2 mt-8">
                  Education
                </Button>
                <Typography variant="h5" className="font-bold my-5 w-11/12">
                  Build A Disability Empowerment Center
                </Typography>{" "}
                <Typography className="text-[14px] text-[#6F7775] w-11/12">
                  provide children and young persons with disabilities access to
                  technology such as robotics, artificial intelligence, digital
                  and vocational skills to become self reliant and unleash the
                  abilities in their disability.
                </Typography>
                <div className="bg-slate-300/30 py-10 mt-6  items-center w-full rounded-lg p-4">
                  <div>
                    <LinearProgress
                      variant="determinate"
                      className="h-2 rounded-xl text-[#01B6AC] bg-white"
                      // color="red"
                      value={30}
                      sx={{
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#01B6AC", // Use the custom color class here
                        },
                      }}
                    />
                    <div className="flex justify-between font-bold mt-2">
                      <span>
                        Raised:<span className="text-[#C654D1]"> $8,000</span>
                      </span>
                      <span>
                        Goal: <spam className="text-[#01B6AC]">$10,000</spam>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-8 font-bold">
                  <div className="font-bold">
                    <Typography className="font-bold">Initiated by:</Typography>
                    <Typography className="font-bold">
                      Donor For Africa
                    </Typography>
                  </div>
                  <div>
                    <Button className="p-4 w-44 bg-[#01B6AC]">
                      Support Them
                    </Button>
                  </div>
                </div>
                <div className="absolute rounded-2xl -right-5  w-1/2 -bottom-5 h-[400px] bg-[#01B6AC] -z-10"></div>
              </div> */}
              <img src={NewSide} className="w-[90%]" />
            </div>
          </div>
          {/* <div className="w-1/2 ">
            <div className="absolute bottom-4 inset-x-24  flex justify-center space-x-2">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  className={`w-4 h-4 rounded-full justify-center items-center ${
                    index === activeSlideIndex ? "bg-gray-900" : "bg-gray-400"
                  }`}
                  onClick={() => handleSlideChange(index)}
                ></button>/10
              ))}
            </div>
          </div> */}
        </div>
      </div>{" "}
      <div className="relative md:px-5 lg:px-0 w-full flex  justify-center">
        <div className="grid md:grid-cols-4 bg-[#01B6AC] shadow-xl w-full text-white border-white lg:w-full grid-cols-2 md:gap-6 justify-around">
          {stats.map((stat) => (
            <div className="flex">
              <div
                key={stat.id}
                className=" rounded-lg p-6 md:py-16 py-8 w-full flex flex-col md:flex-row justify-center items-center text-center gap-4"
              >
                {/* <img
                  className="w-full h-32 object-cover rounded-md mb-4"
                  src="path/to/image.jpg"
                  alt="Card Image"
                /> */}
                <Typography variant="h2" className="font-bold mb-2 text-white">
                  {stat.num}
                </Typography>
                <div className=" ">
                  <Typography className=" text-white text-sm lg:text-base font-bold w-full">{`${stat.subTextBold}`}</Typography>
                  <Typography className=" text-white text-sm lg:text-base font-normal mt-1">{`${stat.subText}`}</Typography>
                </div>
              </div>
              <div className="hidden md:flex mr-1 w-[1px] my-4 bg-white/30"></div>
              {/* {idx < 3 && <p className="text-gray-600 text-xl">Registered</p>} */}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex-col mt-5 md:px-20 mt-12">
        <div className="flex w-full flex-col md:flex-row mt-4 ">
          {/* <div className="md:w-5/12 mx-5 md:mx-0 flex flex-col gap-8 mt-12">
            <Typography variant="h4" className="text-[#C654D1] font-medium">
              How we help
            </Typography>
            <Typography className="font-bold" variant="h2">
              Building a Better Future. Empowering Change
            </Typography>
            <Typography
              variant="h2"
              className={`font-bold  ${
                activeSlideIndex3 == 0
                  ? "font-bold text-[#F49A1C]"
                  : "text-[#3E409533]"
              }`}
            >
              FOR DONORS
            </Typography>
            <Typography
              variant="h2"
              className={`font-bold  ${
                activeSlideIndex3 == 1
                  ? "font-bold text-[#F49A1C]"
                  : "text-[#3E409533]"
              }`}
            >
              FOR NGOs,
            </Typography>
            <Typography
              variant="h2"
              className={`font-bold  ${
                activeSlideIndex3 == 2
                  ? "font-bold text-[#F49A1C]"
                  : "text-[#3E409533]"
              }`}
            >
              FOR TECHNICAL EXPERTS.
            </Typography>
          </div> */}
          <div className=" md:w-full items-center md:mt-5 lg:mt-0 lg:items-start md:mx-0">
            <Carousel
              className="mt-4 py-8"
              responsive={responsive}
              arrows={false}
              customButtonGroup={<ButtonGroup />}
            >
              <div>
                {" "}
                <img
                  src={WhoWeAre}
                  className="md:h-[300px] lg:h-[400px] w-full"
                  alt="Who We Are"
                />
                <div className="px-8 ">
                  <Typography className="font-bold pb-5" variant="h3">
                    Donors
                  </Typography>
                  <Typography className="text-sm lg:text-lg ">
                    At RAMP, we are a dedicated team driven by a single mission:
                    to empower nonprofit organizations across Africa for
                    sustainable impact. We serve as a bridge, connecting
                    generous donors like you with trusted nonprofits working
                    tirelessly to address life-threatening issues and uplift
                    communities living in poverty. With our comprehensive
                    platform, we provide the resources, support, and funding
                    needed to create lasting change. Together, we can build a
                    brighter future and transform lives across the continent.
                  </Typography>
                  <Link className="w-full" to={RouteEnum.ABOUT}>
                    <Button className="w-6/12 lg:w-4/12 flex text-[14px] items-start px-10 py-2 lg:mt-8 mt-4 border-solid border-2 rounded-2xl border-[#01B6AC] bg-[#01B6AC]">
                      Donate
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="">
                {" "}
                <img
                  src={WhoWeAreNGO}
                  className="md:h-[300px] lg:h-[400px] w-full"
                  alt="Who We Are"
                />
                <div className="px-8 ">
                  <Typography className="font-bold pb-5" variant="h3">
                    NGOs
                  </Typography>
                  <Typography className="text-sm lg:text-lg ">
                    Making a difference is just a click away. Join our cause and
                    support us in empowering lives through your generous
                    donation. Visit our website to discover multiple hassle-free
                    donation options and contribute towards creating a brighter
                    future for those in need.
                  </Typography>
                  <Link className="w-full" to={RouteEnum.ABOUT}>
                    <Button className="w-6/12 lg:w-4/12 flex text-[14px] items-start px-10 py-2 lg:mt-8 mt-4 border-solid border-2 rounded-2xl border-[#01B6AC] bg-[#01B6AC]">
                      Donate
                    </Button>
                  </Link>
                </div>
              </div>
              <div>
                {" "}
                <img
                  src={WhoWeAre}
                  className="md:h-[300px] lg:h-[400px] w-full"
                  alt="Who We Are"
                />
                <div className="px-8 ">
                  <Typography className="font-bold pb-5" variant="h3">
                    Donors
                  </Typography>
                  <Typography className="text-sm lg:text-lg ">
                    At RAMP, we are a dedicated team driven by a single mission:
                    to empower nonprofit organizations across Africa for
                    sustainable impact. We serve as a bridge, connecting
                    generous donors like you with trusted nonprofits working
                    tirelessly to address life-threatening issues and uplift
                    communities living in poverty. With our comprehensive
                    platform, we provide the resources, support, and funding
                    needed to create lasting change. Together, we can build a
                    brighter future and transform lives across the continent.
                  </Typography>
                  <Link className="w-full" to={RouteEnum.ABOUT}>
                    <Button className="w-6/12 lg:w-4/12 flex text-[14px] items-start px-10 py-2 lg:mt-8 mt-4 border-solid border-2 rounded-2xl border-[#01B6AC] bg-[#01B6AC]">
                      Donate
                    </Button>
                  </Link>
                </div>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
      {/* <div className="w-full flex gap-5 justify-center items-center mt-10 px-3  md:px-0  md:mt-14">
        <div className="w-full flex gap-8 justify-center  lg:w-[1010px]">
          <div className="w-[270px] flex flex-col gap-3 items-center text-center">
            <img
              src={User}
              alt="User"
              className=" w-10 h-10 md:w-[70px] md:h-[70px]"
            />
            <p className="text-[#202020] text-sm md:text-[20px] font-semibold">
              Donate Items
            </p>
            <p className="text-[#425466] text-xs md:text-base">
              Collect reviews, Q&A and other content from your customers
              started.
            </p>
          </div>
          <div className="w-[270px] flex flex-col gap-3 items-center text-center">
            <img
              src={Briefcase}
              alt="Briefcase"
              className=" w-10 h-10 md:w-[70px] md:h-[70px]"
            />
            <p className="text-[#202020] text-sm md:text-[20px] font-semibold">
              Setup a Non-Profit
            </p>
            <p className="text-[#425466] text-xs md:text-base">
              Use your user-generated content in sales and marketing.
            </p>
          </div>
          <div className="w-[270px] flex flex-col gap-3 items-center text-center">
            <img
              src={Cpu}
              alt="Cpu"
              className=" w-10 h-10 md:w-[70px] md:h-[70px]"
            />
            <p className="text-[#202020] text-sm md:text-[20px] font-semibold">
              Donate Technical Experts
            </p>
            <p className="text-[#425466] text-xs md:text-base">
              In the end, it's all about your customers. Build their trust and
              help.
            </p>
          </div>
        </div>
      </div> */}
      {/* <div className="bg-white py-12 md:px-12 px-4">
        <Typography
          className="text-center text-[#555555] py-6 scrollb"
          variant="h4"
        >
          Featured Campaigns
        </Typography>

        <div className="md:w-8/12 w-full mx-auto relative md:mb-16">
          <Slider {...settings2}>
            {FeaturedCampaign.map((image, index) => (
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                key={index}
              >
                <div className="cursor-pointer">
                  <div className="h-[100%] relative">
                    <img
                      className="h-full w-full object-cover rounded-3xl"
                      src={image.featuredCamp}
                      alt={`Image ${index}`}
                    />
                    <Button
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      className="absolute bottom-5 z-10 w-1/2 py-4 mx-auto right-5 left-5 bg-[#3E4095]"
                    >
                      {image?.caption}
                    </Button>
                  </div>
                  {true && (
                    <div
                      className={`absolute top-0 left-0 w-full h-full flex items-center rounded-3xl justify-center ${
                        true && "bg-black/40"
                      }`}
                    >
                      <Typography
                        className="text-white w-4/5 text-center "
                        variant="h4"
                      >
                        {image.text}
                      </Typography>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div> */}
      <div
        style={{
          backgroundImage: `url(${carouselpic2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          carouselpic2,
          // backgroundColor: carouselSlides[activeSlideIndex].backgroundColor,
        }}
        className=""
      >
        <div class="bg-white/90 md:px-20  px-4 py-12 ">
          <Typography
            className=" text-[#C654D1] text-semibold py-6 scrollb"
            variant="h4"
          >
            Our Recent Campaigns
          </Typography>
          <Typography className="font-bold" variant="h2">
            You Can Help Lots of People by
          </Typography>
          <Typography className="font-bold" variant="h2">
            Donating Little
          </Typography>
          <div className="flex gap-8 mt-8 max-w-full overflow-y-scroll scrollbar-hide ">
            {carouselSlides4.map((slides) => (
              <div
                className="relative flex flex-col justify-between  rounded-2xl bg-white"
                key={slides?.id}
              >
                <div class="">
                  <img
                    className=" lg:h-[300px] min-w-[300px] lg:min-w-[400px] rounded-2xl"
                    src={slides?.image}
                    alt={slides?.alt}
                  />
                  <div class="p-3">
                    <Button className="bg-[#F49A1C26] mt-4 text-[#F49A1C]">
                      Ghana
                    </Button>
                    <Typography className="mx-auto right-5 font-bold left-5 text-base mt-4">
                      {slides?.header ||
                        "Fund a Youth/Person Living with Disability - PWDs Digital and Entrepreneurship Training"}
                    </Typography>
                    <Typography className="mx-auto right-5 text-sm mt-4 left-5 bg-[]">
                      {slides?.caption}
                    </Typography>
                  </div>
                </div>
                <div className="p-3">
                  <div className="mt-6  items-center w-full rounded-lg p-4">
                    <div>
                      <LinearProgress
                        variant="determinate"
                        className="h-2 rounded-xl text-[#01B6AC] bg-slate-300/30"
                        // color="red"
                        value={30}
                        sx={{
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "#01B6AC", // Use the custom color class here
                          },
                        }}
                      />
                      <div className="flex justify-between font-bold mt-2">
                        <span>
                          Raised:<span className="text-[#C654D1]"> $8,000</span>
                        </span>
                        <span>
                          Goal: <spam className="text-[#01B6AC]">$10,000</spam>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-8 font-bold">
                    <div className="font-bold">
                      <Typography className="font-bold">
                        Initiated by:
                      </Typography>
                      <Typography className="font-bold">
                        Donor For Africa
                      </Typography>
                    </div>
                    <div>
                      <Button className="p-3 w-44 rounded-2xl bg-[#01B6AC]">
                        Support Them
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-auto flex justify-center items-center text-center flex-col">
            <Typography
              className="text-center font-bold text-[#555555] py-6 scrollb"
              variant="h5"
            >
              Campaign Videos{" "}
            </Typography>
            <video
              controls
              width="940"
              height=""
              className="rounded-lg shadow-2xl"
            >
              <source src={videoz} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <Typography>Fund a Youth/Person Living with Disability</Typography>
          </div>
        </div>
      </div>
      <div className="w-full py-10 flex flex-col md:px-20 px-4">
        <Typography
          className=" text-[#C654D1] text-semibold py-6 scrollb"
          variant="h4"
        >
          Our Track Record
        </Typography>
        <Typography className="font-bold" variant="h2">
          Empowering Lives, Making a
        </Typography>
        <Typography className="font-bold" variant="h2">
          Proven Impact that Transforms.
        </Typography>

        <div className="flex gap-10 w-full lg:mt-12">
          <div className="flex flex-col md:flex-row md:overflow-y-scroll scrollbar-hide  gap-6 lg:px-20 justify-between  w-full">
            <div className="flex flex-col lg:px-0 gap-5 w-[375px] items-center bg-[#F9F9F9] p-4 rounded-2xl">
              <img
                src={Preserving}
                alt="preserving"
                className="w-[360px] lg:h-[242px]"
              />
              <Typography
                variant={islg ? "h5" : "h6"}
                className="text-[#] ml-2 font-bold px-4"
              >
                Preserving Nature, Securing Tomorrow
              </Typography>
              <Typography className="text-[#555555] text-sm lg:text-base ml-2 px-4">
                Together, we are making a positive impact on the environment.
                With your support, RAMP has funded initiatives such as
                reforestation, renewable energy projects, and waste management
                programs.
              </Typography>
            </div>
            <div className="flex flex-col px-5 lg:px-0 gap-5 w-[375px] items-center bg-[#F9F9F9] p-4 rounded-2xl">
              <img
                src={Empowerment}
                alt="Empowerment"
                className="w-[360px] lg:h-[242px]"
              />
              <Typography
                variant={islg ? "h5" : "h6"}
                className="text-[#] ml-2 font-bold px-4"
              >
                Empowerment Through Entrepreneurship
              </Typography>
              <Typography className="text-[#555555] text-sm lg:text-base ml-2 px-4">
                By connecting nonprofits to donors, RAMP has empowered women to
                start their own businesses and become self-sufficient. Through
                training, mentorship, and financial support, we are unlocking
                the entrepreneurial potential of women and fostering economic
                growth.
              </Typography>
            </div>
            <div className="flex flex-col px-5 lg:px-0 gap-5 w-[385px] items-center bg-[#F9F9F9] p-4 rounded-2xl">
              <img
                src={Knowledge}
                alt="Knowledge"
                className="w-[360px] lg:h-[242px]"
              />
              <Typography
                variant={islg ? "h5" : "h6"}
                className="text-[#] ml-2 font-bold w-[360px] px-4"
              >
                Igniting Knowledge, Empowering Communities
              </Typography>
              <Typography className="text-[#555555] text-sm lg:text-base ml-2 w-[360px] px-4">
                Through RAMP's platform, generous donors like you have funded
                the construction of schools in underserved areas, providing
                access to education for thousands of children. Together, we are
                creating brighter futures and breaking the cycle of poverty.
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-10 md:px-6 px-4 justify-center items-center">
        <Typography
          className="text-center text-black text-semibold pt-6 "
          variant="h3"
        >
          Sustainance Development Goals
        </Typography>
        <Typography
          className="text-center text-black py-2 scrollb"
          variant="h6"
        >
          We aim to empower nonprofits through by helping them achieve their
          goals.
        </Typography>
        <div className="md:w-10/12 mx-auto flex justify-center">
          <img src={SDG} />
          {/* <Slider {...settings}>
            {sdg.map((image, index) => (
              <div className="px-4" key={index}>
                <img src={image.sdg} alt={`Image ${index}`} />
              </div>
            ))}
          </Slider> */}
        </div>
      </div>
      {/* ******************************************************************************************************************************************************************************* */}
      {/* <div className="w-full mt-10 flex flex-col justify-center items-center">
        <Typography
          className="text-center text-[#555555] text-semibold py-6 scrollb"
          variant="h4"
        >
          Our Donors | Partners
        </Typography>
        <Typography
          className="text-center text-[#555555] py-2 scrollb"
          variant="h6"
        >
          Powering Dreams that Fight Poverty and Transform Communities
        </Typography>

        <div className="flex gap-10 px-5 lg:px-0 lg:gap-20 mt-5 max-w-full overflow-y-scroll scrollbar-hide">
          {donors.map((donor) => (
            <div key={donor?.id} className="flex gap-5 items-center w-[182px] ">
              <img src={donor?.image} alt={donor?.alt} className="" />
            </div>
          ))}
        </div>
      </div> */}
      {/* ******************************************************************************************************************************************************************************* */}
      <div className="bg-white md:pt-20 md:px-12 p-4 ">
        <Typography
          className=" text-[#C654D1] text-semibold py-6 scrollb"
          variant="h4"
        >
          Testimonials
        </Typography>
        <Typography className="font-bold" variant="h2">
          What People Say about
        </Typography>
        <Typography className="font-bold text-[#C654D1]" variant="h2">
          Our Organization
        </Typography>
        <div className="w-full relative md:h-[400px] mt-12 ">
          <Slider {...settings}>
            {sdg.map((image, index) => (
              <div className="md:px-12">
                <div className=" flex justify-between" key={index}>
                  <img
                    className="h-[80px]"
                    src={image.sdg}
                    alt={`Image ${index}`}
                  />
                  <Rating value={5} />
                </div>

                <Typography variant="h4" className="font-bold mt-4">
                  Bukola Bamiduro
                </Typography>
                <Typography variant="h6" className="font-bold text-[#696969]">
                  Founder - <span className="text-[#01B6AC]">Karis Elios</span>
                </Typography>

                <Typography className="font-medium my-4 text-base text-[#696969]">
                  {image.caption}
                </Typography>
              </div>
            ))}
          </Slider>
          {/* {carouselSlides3.map((slide, index) => ( */}
          {/* <div
            className={`flex flex-col md:flex-row  w-full justify-center items-start gap-6 ${
              activeSlideIndex3 % 2 !== 0 &&
              "md:flex-row-reverse flex-col-reverse"
            }`}
          >
            <div className="relative mx-auto md:mx-0">
              <img
                // key={index}
                src={carouselSlides3[activeSlideIndex3]?.image}
                alt={carouselSlides3[activeSlideIndex3]?.captionHeader}
                className={`w-full transition-opacity duration-500 md:h-[600px]`}
              />
              <div className="absolute bottom-4 left-6 flex space-x-2">
                {carouselSlides3.map((_, index) => (
                  <button
                    key={index}
                    className={`w-[28px] h-[28px] rounded-md ${
                      index === activeSlideIndex3
                        ? "bg-[#FCF6FC]"
                        : "bg-transparent"
                    }`}
                    onClick={() => handleSlideChange(index)}
                  >
                    <AiOutlineArrowRight className="text-[#000] w-full" />
                  </button>
                ))}
              </div>
              <img
                src={Quote}
                alt="quote"
                className="absolute -top-8  -right-6"
              />
            </div>
            <div className=" md:w-6/12 flex flex-col gap-5 md:mt-12">
              <Typography
                variant="h4"
                className="font-medium text-[#555555] text-center md:text-left "
              >
                {carouselSlides3[activeSlideIndex3]?.captionHeader}
              </Typography>
              <Typography className="font-normal mx-5 md:mx-0 text-base lg:text-lg text-[#555555] text-center md:text-left">
                <em>"{carouselSlides3[activeSlideIndex3]?.caption}"</em>
              </Typography>
              <Typography className=" mx-5 md:mx-0 text-center lg:text-lg text-black font-bold">
                {carouselSlides3[activeSlideIndex3]?.name}
              </Typography>
            </div>
          </div> */}
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
 */}
      <div class="mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
