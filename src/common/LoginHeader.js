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
import largeLogo from "images/Ramp2.png";
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
  Paper,
} from "@mui/material";
import { MediaQueryBreakpointEnum } from "constants/Global";
import image from "images/logo2.svg";
// import image from "images/Ramp1.png";
import { RouteEnum } from "constants/RouteConstants";
import { Link } from "react-router-dom";
import { Twitter, Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";

const LoginHeader = (prop) => {
  // const history = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="flex items-center justify-center w-full">
      <Paper className="w-full">
        <AppBar
          position="static"
          className={` ${"bg-white shadow-none p-2"}
          `}
        >
          <Toolbar className="flex justify-between bg-none text-black ">
            <Link to={RouteEnum.LANDING}>
              <div className="flex">
                <img src={largeLogo} className="w-[100px]" alt="Logo" />
              </div>
            </Link>
            {!localStorage.getItem("token") && (
              <div className="flex items-center cursor-pointer">
                <div className="lg:hidden" onClick={() => setDrawerOpen(true)}>
                  <svg className="w-6 h-6 text-[#C654D1]" viewBox="0 0 24 24">
                    <path
                      className="fill-current"
                      d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"
                    />
                  </svg>
                </div>
                <div className="hidden lg:flex lg:items-center gap-20">
                  <ul className="md:flex md:gap-8 text-base font-bold">
                    <li
                      onClick={handleClick}
                      className=" text-[#C654D1] flex gap-1 items-center hover:text-[#01B6AC]"
                    >
                      {/* <Link to={RouteEnum.ABOUT} className=""> */}
                      About{" "}
                      <span>
                        <MdKeyboardArrowDown className="text-[#C654D1]  hover:text-[#01B6AC]" />
                      </span>
                      {/* </Link> */}
                    </li>
                    <Link
                      to={RouteEnum?.HOWITWORKS}
                      className="hover:text-[#01B6AC] text-[#C654D1]"
                    >
                      How it Works
                    </Link>
                    {/* <Link
                    to={RouteEnum.TEAM}
                    className="hover:text-[#C654D1] text-[#C654D1]"
                  >
                    Our Team
                  </Link> */}
                    {/*Link className="hover:text-[#C654D1] text-[#C654D1]">Results</li> */}
                    <li className="hover:text-[#01B6AC] text-[#C654D1]">Blog</li>
                    {/* <li className="hover:text-[#C654D1] text-[#C654D1]">Resources</li> */}
                  </ul>
                  <div className="md:flex md:gap-4">
                    <Link to={RouteEnum.SIGNUP}>
                      <Button className="px-10 py-2 bg-[#C654D1] lg:border-solid border-2 rounded-full hover:border-[#01B6AC] border-[#C654D1] hover:bg-[#01B6AC]">
                        Sign Up as CSO/NGO
                      </Button>
                    </Link>
                    <Link to={RouteEnum.LOGIN}>
                      <Button className="px-10 py-2 bg-[#C654D1] lg:border-solid border-2 rounded-full hover:border-[#01B6AC] border-[#C654D1] hover:bg-[#01B6AC]">
                        Log In
                      </Button>
                    </Link>
                  </div>
                </div>
                <Menu
                  className="px-20"
                  // id="fade-menu"
                  MenuListProps={{
                    "aria-labelledby": "fade-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                >
                  <Link to={RouteEnum.STORY}>
                    <MenuItem
                      className="font-bold my-2 mx-5 text-base hover:bg-[#F49A1C] hover:text-black"
                      onClick={handleClose}
                    >
                      Our Story
                    </MenuItem>
                  </Link>
                  <Link to={RouteEnum.WHATWEDO}>
                    <MenuItem
                      className="font-bold my-2 mx-5 text-base hover:bg-[#F49A1C] hover:text-black"
                      onClick={handleClose}
                    >
                      What we Do
                    </MenuItem>
                  </Link>
                  {/* <Link to={RouteEnum.OURVALUES}>
                  <MenuItem
                    className="font-bold my-2 mx-5 text-base hover:bg-[#C654D1] hover:text-[#C654D1]"
                    onClick={handleClose}
                  >
                    Our Values
                  </MenuItem>
                </Link> */}
                  {/* <Link to={RouteEnum.TEAM}>
                  <MenuItem
                    className="font-bold my-2 mx-5 text-base hover:bg-[#C654D1] hover:text-[#C654D1]"
                    onClick={handleClose}
                  >
                    Our Team
                  </MenuItem>
                </Link>
                <Link to={RouteEnum.CAREERS}>
                  <MenuItem
                    className="font-bold my-2 mx-5 text-base hover:bg-[#C654D1] hover:text-[#C654D1]"
                    onClick={handleClose}
                  >
                    Careers
                  </MenuItem>
                </Link> */}
                  {/* <MenuItem
                  className="font-bold my-2 mx-5 text-base hover:bg-[#C654D1] hover:text-[#C654D1]"
                  onClick={handleClose}
                >
                  FAQ
                </MenuItem> */}
                </Menu>
              </div>
            )}
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
              <ListItemText primary="Results" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Blog" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Resources" />
            </ListItem>
          </List>
        </Drawer>
      </Paper>
    </div>
  );
};
export default LoginHeader;
