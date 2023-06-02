import React, { useEffect, useState } from "react";
import NGO from "images/LandingNGO.jpg";
import Giving from "images/Giving.png";
import Expertise from "images/LandingExpertise.jpg";
import WhoWeAre from "images/whoWeAre.png";
import Kids from "images/children.png";
import Office from "images/office.png";
import Rocks from "images/rocks.png";
import Donate from "images/donate.png";
import SmilingGirl from "images/smilingGirl.png";
import Quote from "images/quote.svg";
import User from "images/user.svg";
import Cpu from "images/cpu.svg";
import Briefcase from "images/Briefcase.svg";
import Donor from "images/LandingDonate.jpg";
import Outstreched from "images/Outstreched.png";
import Solutions from "images/Solutions.png";
import HelpingHands from "images/HelpingHands.png";
import Flowers from "images/Flowers.png";
import Preserving from "images/Preserving.png";
import Empowerment from "images/Empowerment.png";
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
import { AiOutlineArrowRight }  from "react-icons/ai"
import { MdKeyboardArrowDown }  from "react-icons/md"
import LoginHeader from "common/LoginHeader";

const HomePage = () => {
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);
  const islg = useMediaQuery(MediaQueryBreakpointEnum.lg);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);
   const handleClick = (event) => {
     setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
     setAnchorEl(null);
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
      image: Giving,
      backgroundColor: "#9a7b4f",
      caption: "Welcome to RAMP",
      subCaption: "For Governments, CSO's, Private and Public Sector Companies, Individuals and International Agencies",
      // subText: "Experience the true impact of your generosity by joining RAMP, the leading platform connecting donors like you with trusted nonprofits in Africa. Together, we can break the chains of poverty, empower communities, and create a sustainable future. Sign up today and be a catalyst for change.",
      color: "#C654D1" 
    },

    // {
    //   image: NGO,
    //   backgroundColor: "#9a7b4f",
    //   caption: " NGOs",
    //   // subText: "Resource Accessibility and Mobilization Program",
    //   // color: "#3944bc",
    //   howItWorks:
    //     "Register on the platform, add all supporting documents,  wait to be verified and approved and then expect a donation soon",
    // },
    // {
    //   image: Expertise,
    //   backgroundColor: "#b3bdb6",
    //   caption: " Technical Experts",
    //   howItWorks:
    //     "You have the free time to deliver on a particular project? This platform is right for you!!. Signup and pick the solution that you can render",
    // },
    // {
    //   image: Donor,
    //   backgroundColor: "white",
    //   caption: " Donors",
    //   howItWorks:
    //     "Find NGOS that needs your contribution and then make a donation towards the one that best suits your interest",
    // },
  ];

  const carouselSlides3 = [
    {
      image: SmilingGirl,
      backgroundColor: "#9a7b4f",
      captionHeader: "A GAME CHANGER",
      caption: `RAMP has been an absolute game-changer for our nonprofit organization. 
                Their platform connected us with generous donors and invaluable resources 
                that have allowed us to expand our impact and make a real difference in 
                the lives of marginalized communities. Thanks to RAMP, we've been able to 
                implement sustainable solutions, provide education, and empower individuals 
                to break free from the cycle of poverty. We are forever grateful for their 
                unwavering support and commitment to creating lasting change`,
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
      image: Gallery1,
      alt: "Gallery"
    },
    {
      id: 2,
      image: Gallery2,
      alt: "Gallery"
    },
    {
      id: 3,
      image: Gallery3,
      alt: "Gallery"
    },
    {
      id: 4,
      image: Gallery1,
      alt: "Gallery"
    },
  ]

  const stats = [
    {
      id: 1,
      num: "$30M+",
      subTextBold: "Donations",
      subText: " Delivered"
    },
    {
      id: 2,
      num: "30+",
      subTextBold: "NGOS",
      subText: "Registered"
    },
    {
      id: 3,
      num: "50+",
      subTextBold: "DONORS",
      subText: "Registered"
    },
    {
      id: 4,
      num: "100+",
      subTextBold: "EXPERTS",
      subText: "Registered"
    },
  ]

  const donors = [
    {
      id: 1,
      image: Outstreched,
      alt: "Outstreched"
    },
    {
      id: 2,
      image: Solutions,
      alt: "Solutions"
    },
    {
      id: 3,
      image: HelpingHands,
      alt: "HelpingHands"
    },
    {
      id: 4,
      image: Flowers,
      alt:"Flowers"
    },
  ]

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
      <LoginHeader/>

        <div>
          <div
            className={`h-[60vh] lg:h-[90vh] w-full flex items-center justify-center transition-opacity duration-500  bg-gray-900 bg-opacity-75`}
          >
            <div className="w-full h-full mx-auto justify-center text-center md:p-8 p-4 md:ml-20 flex">
              <div className="w-8/12 flex flex-col mt-2 md:mt-10 lg:mt-16 ">
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
                <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
                  <Link className=" py-2" to={RouteEnum.SIGNUP}>
                    <Button className="flex mx-auto text-[14px] w-44 md:w-full items-center px-4 lg:px-20 lg:py-4 lg:mt-8 border-solid border-2 rounded-full border-white bg-transparent hover:border-[#C654D1] hover:bg-[#C654D1]">
                      Sign Up as NGO/CSO
                    </Button>
                  </Link>

                  <Link  className=" py-2" to={RouteEnum.SIGNUP}>
                    <Button className="flex mx-auto text-[14px] w-44 md:w-full items-center px-4 lg:px-20 lg:py-4 lg:mt-8 border-solid border-2 rounded-full border-white bg-transparent hover:border-[#C654D1] hover:bg-[#C654D1]">
                      Fund a Nonprofit
                    </Button>
                  </Link>
                </div>
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
                <h2 className="text-xl font-bold mb-2 text-[#3A3A3A]">
                  {stat.num}
                </h2>
                <div className="flex gap-2 ">
                  <p className="text-[#4B5563] text-sm lg:text-base font-bold">{`${stat.subTextBold}`}</p>
                  <p className="text-[#4B5563] text-sm lg:text-base font-normal">{`${stat.subText}`}</p>
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
            <Link to={RouteEnum.ABOUT}>
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
              For Donors
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
              For Non-Profits
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
              For Admins
            </p>
            <p className="text-[#425466] text-xs md:text-base">
              In the end, it's all about your customers. Build their trust and
              help.
            </p>
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
        <div className="flex gap-5 max-w-full overflow-y-scroll scrollbar-hide">
          {carouselSlides2.map((slides) => (
            <div className="relative">
              <img
                className=" lg:h-[300px] min-w-[300px] lg:min-w-[400px]"
                src={slides?.image}
                alt="Gallery"
              />
              <Button className="absolute bottom-5 w-[180px] md:w-[200px] h-[40px] mx-auto right-5 left-5 bg-[#3E4095]">
                {slides?.caption}
              </Button>
            </div>
          ))}
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
          Gallery
        </Typography>
        <div className="flex gap-5 mt-8 max-w-full overflow-y-scroll scrollbar-hide">
          {carouselSlides4.map((slides) => (
            <div className="relative" key={slides?.id}>
              <img
                className=" lg:h-[300px] min-w-[300px] lg:min-w-[400px]"
                src={slides?.image}
                alt={slides?.alt}
              />
              {/* <Button className="absolute bottom-5 w-[120px] md:w-[200px] h-[40px] mx-auto right-5 left-5 bg-[#3E4095]">
                {slides?.caption}
              </Button> */}
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
        <div className="w-full relative md:h-[400px] mt-5">
          {/* {carouselSlides3.map((slide, index) => ( */}
          <div
            className={`flex flex-col md:flex-row  w-full justify-center items-center gap-6 ${
              activeSlideIndex % 2 !== 0 &&
              "md:flex-row-reverse flex-col-reverse"
            }`}
          >
            <div className="md:w-6/12 relative mx-auto md:mx-0">
              <img
                // key={index}
                src={carouselSlides3[activeSlideIndex]?.image}
                alt={carouselSlides3[activeSlideIndex]?.captionHeader}
                className={`w-full transition-opacity duration-500 md:h-[400px]`}
              />
              <div className="absolute bottom-4 left-6 flex space-x-2">
                {carouselSlides3.map((_, index) => (
                  <button
                    key={index}
                    className={`w-[28px] h-[28px] rounded-md ${
                      index === activeSlideIndex
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
            <div className=" md:w-6/12 flex flex-col gap-5">
              <Typography
                variant="h4"
                className="font-medium text-[#555555] text-center md:text-left "
              >
                {carouselSlides3[activeSlideIndex]?.captionHeader}
              </Typography>
              <Typography className="font-normal mx-5 md:mx-0 text-base lg:text-lg text-[#555555] text-center md:text-left">
                {carouselSlides3[activeSlideIndex]?.caption}
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
      </footer> */}
      <div className="bg-[#FCF6FC] lg:h-[441px] w-full">
        <Typography className="text-center pt-14 text-xl lg:text-2xl ">
          Stay Connected to RAMP:
        </Typography>
        <Typography className="text-center pt-3 pb-5 text-xl lg:text-2xl">
          Subscribe to Our NewsLetter!
        </Typography>
        <div className="w-9/12 lg:w-6/12 flex mx-auto">
          <Typography className="text-center pt-3 pb-5 text-sm">
            Be the first to know about the inspiring stories of impact, upcoming
            projects, and exciting updates from RAMP. Our newsletter is your
            gateway to stay connected with our mission of empowering nonprofit
            organizations in Africa and creating sustainable change.
          </Typography>
        </div>
        <div class="flex justify-center">
          <div class="flex flex-col justify-center items-center pb-12 gap-5 md:w-1/2 w-full p-4">
            <TextField fullWidth placeholder="Email" className="w-full" />
            <Button className="py-4 px-16">Feed the poor</Button>
          </div>
        </div>
      </div>
      <div className="w-full lg:h-[256px] py-10 bg-[#3E4095]">
        <div className="flex flex-col justify-center items-center">
          <img src={RampFooter} alt="Ramp Footer" />
          <ul className="flex flex-col items-center lg:flex-row gap-5 lg:justify-center font-normal text-white">
            <li>About</li>
            <li>How It Works</li>
            <li>Blogs</li>
            <li>Resources</li>
            <li>Help</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="flex md:justify-between mt-6  w-full flex-col md:flex-row md:gap-20 gap-6 items-center px-20 py-5 text-white ">
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
    </div>
  );
};

export default HomePage;
