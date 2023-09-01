import React, { useEffect, useState } from "react";
import NGO from "images/LandingNGO.jpg";
import Giving from "images/Giving.png";
import Hands from "images/homelanding/hand-g6c49b2fb9_1280.jpg";
import Kidss from "images/homelanding/kids-g92fbd2d9c_1280.jpg";
import Africa from "images/homelanding/africa-g354936ced_1280.jpg";
import Expertise from "images/LandingExpertise.jpg";
import WhoWeAre from "images/whoWeAre.png";
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
} from "@mui/material";
import { MediaQueryBreakpointEnum } from "constants/Global";
import image from "images/logo2.svg";
// import image from "images/Ramp1.png";
import { RouteEnum } from "constants/RouteConstants";
import { Link } from "react-router-dom";
import { Twitter, Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import LoginHeader from "common/LoginHeader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "common/Footer";

const HomePage = () => {
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);
  const islg = useMediaQuery(MediaQueryBreakpointEnum.lg);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [activeSlideIndex3, setActiveSlideIndex3] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const settings = {
    dots: true,
    infinite: true,
    //  fade: true,
    //  speed: 100,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: true,
    speed: 2000,
    //  autoplaySpeed: 2000,
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

  const carouselSlides = [
    // {
    //   image: NGO,
    //   backgroundColor: "#9a7b4f",
    //   caption: "Welcome to RAMP",
    //   subText: "Resource Accessibility and Mobilization Program",
    //   color: "#3944bc",
    // },

    {
      image: carouselpic,
      backgroundColor: "#9a7b4f",
      caption: "Welcome to RAMP",
      subCaption: "Resource Acceleration & Mobilization Platform",
      // subText: "Experience the true impact of your generosity by joining RAMP, the leading platform connecting donors like you with trusted nonprofits in Africa. Together, we can break the chains of poverty, empower communities, and create a sustainable future. Sign up today and be a catalyst for change.",
      color: "#C654D1",
    },

    {
      image: Kidss,
      backgroundColor: "#9a7b4f",
      caption: "Welcome to RAMP",
      subCaption:
        "For Governments, CSO's, Private and Public Sector Companies, Individuals and International Agencies",
      // subText: "Experience the true impact of your generosity by joining RAMP, the leading platform connecting donors like you with trusted nonprofits in Africa. Together, we can break the chains of poverty, empower communities, and create a sustainable future. Sign up today and be a catalyst for change.",
      color: "#C654D1",
    },
    {
      image: carouselpic2,
      backgroundColor: "#9a7b4f",
      caption: "Welcome to RAMP",
      subCaption:
        "For Governments, CSO's, Private and Public Sector Companies, Individuals and International Agencies",
      // subText: "Experience the true impact of your generosity by joining RAMP, the leading platform connecting donors like you with trusted nonprofits in Africa. Together, we can break the chains of poverty, empower communities, and create a sustainable future. Sign up today and be a catalyst for change.",
      color: "#C654D1",
    },
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
    { sdg: SDG1 },
    { sdg: SDG2 },
    { sdg: SDG3 },
    { sdg: SDG4 },
    { sdg: SDG5 },
    { sdg: SDG6 },
    { sdg: SDG7 },
    { sdg: SDG9 },
    { sdg: SDG8 },
    { sdg: SDG10 },
    { sdg: SDG11 },
    { sdg: SDG12 },
    { sdg: SDG13 },
    { sdg: SDG14 },
    { sdg: SDG15 },
    { sdg: SDG16 },
    { sdg: SDG17 },
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
        "Prepare African Children for the Future - Catch them Young (Ghana)",
    },
    {
      id: 2,
      image: FEATUREDCAMP2,
      alt: "Gallery",
      caption:
        "Fund a Youth/Person Living with Disability - PWDs Digital and Entrepreneurship Training ",
    },
    {
      id: 3,
      image: Gallery,
      alt: "Gallery",
      caption:
        "Help Survivors of Domestic Abuse become empowered- Bina Al-Amal Foundation- Nigeria",
    },
    {
      id: 4,
      image: FEATUREDCAMP3,
      alt: "Gallery",
      caption: "Build A Disability Empowerment Center",
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
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  console.log(activeSlideIndex);

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
        <LoginHeader />

        <div>
          <div
            className={`h-[60vh] lg:h-[90vh] w-full  flex items-center justify-center transition-opacity duration-500  bg-gray-900 bg-opacity-75`}
          >
            <div className="w-full h-full mx-auto items-center   text-center md:px-8 p-4 flex flex-col">
              <div className="w-8/12 flex flex-col md:mt-28 mt-2">
                <Typography
                  variant={islg ? "h2" : ismd ? "h3" : "h4"}
                  className=" font-bold mb-4 text-[#01B6AC] text-center "
                >
                  {carouselSlides[activeSlideIndex].caption}
                </Typography>

                <Typography
                  variant={islg ? "h3" : ismd ? "h4" : "h5"}
                  className=" font-medium mb-4 text-[#fff] text-center "
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
              <div className="flex flex-col md:flex-row gap-5 justify-center items-center w-full">
                <Link className=" py-2" to={RouteEnum.SIGNUP}>
                  <Button className="flex w-full mx-auto text-[14px] md:w-full items-center px-4 lg:px-20 lg:py-4 lg:mt-8 border-solid border-2 rounded-full border-white bg-transparent hover:border-[#C654D1] hover:bg-[#C654D1]">
                    Sign Up as NGO/CSO
                  </Button>
                </Link>

                <Link className=" py-2" to={RouteEnum.SIGNUP}>
                  <Button className="flex mx-auto text-[14px]  w-full  md:w-full items-center px-4 lg:px-20 lg:py-4 lg:mt-8 border-solid border-2 rounded-full border-white bg-transparent hover:border-[#C654D1] hover:bg-[#C654D1]">
                    Fund a Nonprofit
                  </Button>
                </Link>

                <Link className=" py-2" to={RouteEnum.SIGNUP}>
                  <Button className="flex mx-auto text-[14px]  w-full  md:w-full items-center px-4 lg:px-20 lg:py-4 lg:mt-8 border-solid border-2 rounded-full border-white bg-transparent hover:border-[#C654D1] hover:bg-[#C654D1]">
                    Request Technical Expertise
                  </Button>
                </Link>

                <Link className=" py-2" to={RouteEnum.SIGNUP}>
                  <Button className="flex mx-auto text-[14px]  w-full  md:w-full items-center px-4 lg:px-20 lg:py-4 lg:mt-8 border-solid border-2 rounded-full border-white bg-transparent hover:border-[#C654D1] hover:bg-[#C654D1]">
                    Make an In-Kind Donation
                  </Button>
                </Link>
              </div>
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
                ></button>
              ))}
            </div>
          </div> */}
        </div>
      </div>{" "}
      <div className="relative px-5 lg:px-0 -top-28  md:-top-14 lg:-top-20 w-full flex justify-center">
        <div className="grid md:grid-cols-4 bg-[#FCF6FC] shadow-xl bg-white border-white lg:w-[1000px] rounded-2xl grid-cols-2 gap-6 justify-around mt-8">
          {stats.map((stat) => (
            <div className="flex">
              <div
                key={stat.id}
                className=" rounded-lg p-6 w-full flex flex-col justify-center items-center py-8 text-center"
              >
                {/* <img
                  className="w-full h-32 object-cover rounded-md mb-4"
                  src="path/to/image.jpg"
                  alt="Card Image"
                /> */}
                <h2 className="text-xl font-bold mb-2 text-[#01B6AC]">
                  {stat.num}
                </h2>
                <div className=" ">
                  <p className="text-[#01B6AC] text-sm lg:text-base font-bold w-full">{`${stat.subTextBold}`}</p>
                  <p className="text-[#01B6AC] text-sm lg:text-base font-normal">{`${stat.subText}`}</p>
                </div>
              </div>
              <div className="hidden md:flex mr-1 h-20 w-[1px] my-4 bg-gray-600"></div>
              {/* {idx < 3 && <p className="text-gray-600 text-xl">Registered</p>} */}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex-col mt-5">
        <Typography
          variant="h4"
          className="text-center font-medium text-[#555555]"
        >
          Who we Are
        </Typography>
        <div className="flex w-full flex-col md:flex-row lg:items-center mt-4 md:mx-10 gap-5">
          <div className="md:w-6/12 mx-5 md:mx-0">
            <img
              src={WhoWeAre}
              className="md:h-[300px] lg:h-auto"
              alt="Who We Are"
            />
          </div>
          <div className="flex flex-col gap-4 md:w-5/12 mx-5 items-center md:mt-5 lg:mt-0 lg:items-start md:mx-0">
            <Typography className="text-sm lg:text-lg">
              At RAMP, we are a dedicated team driven by a single mission: to
              empower nonprofit organizations across Africa for sustainable
              impact. We serve as a bridge, connecting generous donors like you
              with trusted nonprofits working tirelessly to address
              life-threatening issues and uplift communities living in poverty.
              With our comprehensive platform, we provide the resources,
              support, and funding needed to create lasting change. Together, we
              can build a brighter future and transform lives across the
              continent.
            </Typography>
            <Link className="w-full" to={RouteEnum.ABOUT}>
              <Button className="w-6/12  lg:w-4/12 flex text-[14px] items-start px-10 py-2 lg:mt-8 border-solid border-2 rounded-full border-[#3E4095] bg-[#3E4095]">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full flex gap-5 justify-center items-center mt-10 px-3  md:px-0  md:mt-14">
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
      </div>
      <div className="bg-white py-12 md:px-12 px-4">
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
      </div>
      <div className="w-full mt-10 flex flex-col justify-center items-center">
        <Typography
          className="text-center text-[#555555] text-semibold py-6 scrollb"
          variant="h4"
        >
          Our Track Record
        </Typography>

        <div className="flex gap-10 mt-5 w-full justify-center items-center">
          <div className="flex flex-col md:flex-row md:overflow-y-scroll scrollbar-hide  gap-6 lg:w-[1247px] justify-center">
            <div className="flex flex-col px-5 lg:px-0 gap-5 w-[375px] items-center">
              <img
                src={Preserving}
                alt="preserving"
                className="w-[360px] lg:h-[242px]"
              />
              <Typography
                variant={islg ? "h5" : "h6"}
                className="text-[#01B6AC] ml-2 font-bold"
              >
                Preserving Nature, Securing Tomorrow
              </Typography>
              <Typography className="text-[#555555] text-sm lg:text-base ml-2">
                Together, we are making a positive impact on the environment.
                With your support, RAMP has funded initiatives such as
                reforestation, renewable energy projects, and waste management
                programs.
              </Typography>
            </div>
            <div className="flex flex-col px-5 lg:px-0 gap-5 w-[375px] items-center">
              <img
                src={Empowerment}
                alt="Empowerment"
                className="w-[360px] lg:h-[242px]"
              />
              <Typography
                variant={islg ? "h5" : "h6"}
                className="text-[#01B6AC] ml-2 font-bold"
              >
                Empowerment Through Entrepreneurship
              </Typography>
              <Typography className="text-[#555555] text-sm lg:text-base ml-2">
                By connecting nonprofits to donors, RAMP has empowered women to
                start their own businesses and become self-sufficient. Through
                training, mentorship, and financial support, we are unlocking
                the entrepreneurial potential of women and fostering economic
                growth.
              </Typography>
            </div>
            <div className="flex flex-col px-5 lg:px-0 gap-5 w-[375px] items-center">
              <img
                src={Knowledge}
                alt="Knowledge"
                className="w-[360px] lg:h-[242px]"
              />
              <Typography
                variant={islg ? "h5" : "h6"}
                className="text-[#01B6AC] ml-2 font-bold"
              >
                Igniting Knowledge, Empowering Communities
              </Typography>
              <Typography className="text-[#555555] text-sm lg:text-base ml-2">
                Through RAMP's platform, generous donors like you have funded
                the construction of schools in underserved areas, providing
                access to education for thousands of children. Together, we are
                creating brighter futures and breaking the cycle of poverty.
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white py-12 md:px-12 px-4 ">
        <Typography
          className="text-center text-[#555555] py-6 scrollb"
          variant="h4"
        >
          Featured Campaigns
        </Typography>
        <div className="flex gap-5 mt-8 max-w-full overflow-y-scroll scrollbar-hide">
          {carouselSlides4.map((slides) => (
            <div className="relative" key={slides?.id}>
              <img
                className=" lg:h-[300px] min-w-[300px] lg:min-w-[400px]"
                src={slides?.image}
                alt={slides?.alt}
              />
              <Typography className="mx-auto right-5 left-5 bg-[]">
                {slides?.caption}
              </Typography>
            </div>
          ))}
        </div>

        <div className="mx-auto flex justify-center items-center text-center flex-col">
          <Typography
            className="text-center text-[#555555] py-6 scrollb"
            variant="h5"
          >
            Campaign Videos{" "}
          </Typography>
          <video
            controls
            width="640"
            height=""
            className="rounded-lg shadow-2xl"
          >
            <source src={videoz} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <Typography>Fund a Youth/Person Living with Disability</Typography>
        </div>
      </div>
      <div className="w-full mt-10 md:px-6 px-4 justify-center items-center">
        <Typography
          className="text-center text-[#555555] text-semibold pt-6 "
          variant="h4"
        >
          Sustainance Development Goals
        </Typography>
        <Typography
          className="text-center text-[#555555] py-2 scrollb"
          variant="h6"
        >
          We aim to empower nonprofits through by helping them achieve their
          goals.
        </Typography>
        <div className="md:w-11/12 mx-auto">
          <Slider {...settings}>
            {sdg.map((image, index) => (
              <div className="px-4" key={index}>
                <img src={image.sdg} alt={`Image ${index}`} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="w-full mt-10 flex flex-col justify-center items-center">
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
      </div>
      <div className="bg-white md:py-12 md:px-12 p-4 ">
        <Typography
          className="text-center text-[#555555] py-6 scrollb"
          variant="h4"
        >
          Testimonials
        </Typography>
        <div className="w-full relative md:h-[600px] mt-5">
          {/* {carouselSlides3.map((slide, index) => ( */}
          <div
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
 */}
      <Footer />
    </div>
  );
};

export default HomePage;
