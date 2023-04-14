import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { BsPeople } from "react-icons/bs";
import MailIcon from "@mui/icons-material/Mail";
import message from "images/message.png";
import messages from "images/messages.png";
import companies from "images/lifebuoy.png";
import dashboard from "images/category-2.png";
import trips from "images/routing.png";
import rider from "images/profile-2user.png";
import logouts from "images/logout.png";
import { MediaQueryBreakpointEnum } from "constants/Global";
import LoginHeader from "common/LoginHeader";
import { RouteEnum } from "constants/RouteConstants";
import { useLocation, useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import { IconButton, useMediaQuery } from "@mui/material";
import { AiOutlineMenu } from "react-icons/ai";
import { get } from "services/fetch";

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const history = useNavigate();
  const location = useLocation();
  const currentUrl = location.pathname;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [outcasts, setOutcasts] = React.useState([
    { name: "Logout", linx: RouteEnum.HOME, image: logouts },
  ]);
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);
  const [isCompany, setIsCompany] = React.useState();

  console.log(isCompany);
  const [pat, setPat] = React.useState([
    {
      name: "Dashboard",
      d: RouteEnum.DASHBOARD,
      // image: dashboard,
      color: RouteEnum.DASHBOARD == currentUrl ? true : false,
    },
    // {
    //   name: "Grants",
    //   d: RouteEnum.GRANT,
    //   // image: companies,
    //   color: RouteEnum.GRANT == currentUrl ? true : false,
    // },
    // {
    //   name: "Loan",
    //   d: RouteEnum.LOAN,
    //   // image: rider,
    //   color: RouteEnum.LOAN == currentUrl ? true : false,
    // },
    // {
    //   name: "Scholarships",
    //   d: RouteEnum.SCHOLARSHIPS,
    //   // image: trips,
    //   color: RouteEnum.SCHOLARSHIPS == currentUrl ? true : false,
    // },
    // {
    //   name: "Edu-Invest",
    //   d: RouteEnum.INVEST,
    //   // image: trips,
    //   color: false,
    // },

    // {name:'Support', d:RouteEnum.SUPPORT}
  ]);

  const getUser = async () => {
    const res = await get({
      endpoint: "users/profile",
      // body: formData,
      // auth: false,
    });

    //  setIsRegCompleted(res?.data?.data?.states);

    setIsCompany(res?.data?.data?.user.account_type);

    setPat(
      localStorage.getItem("role") == ("Super admin" || "Admin")
        ? [
            {
              name: "Dashboard",
              d: RouteEnum.DASHBOARD,
              // image: dashboard,
              color: RouteEnum.DASHBOARD == currentUrl ? true : false,
            },
          ]
        : localStorage.getItem("role") == "Edufunder"
        ? [
            {
              name: "Dashboard",
              d: RouteEnum.DASHBOARD,
              // image: dashboard,
              color: RouteEnum.DASHBOARD == currentUrl ? true : false,
            },
            {
              name: "My Donations",
              d: RouteEnum.CONTRIBUTION,
              // image: dashboard,
              color: RouteEnum.CONTRIBUTION == currentUrl ? true : false,
            },
          ]
        : res?.data?.data?.user.account_type == "corporate"
        ? [
            {
              name: "Dashboard",
              d: RouteEnum.DASHBOARD,
              // image: dashboard,
              color: RouteEnum.DASHBOARD == currentUrl ? true : false,
            },
            {
              name: "Make a request",
              d: RouteEnum.GRANT,
              // image: companies,
              color: RouteEnum.GRANT == currentUrl ? true : false,
            },
            {
              name: "Profile",
              d: RouteEnum.PROFILE,
              // image: rider,
              color: RouteEnum.PROFILE == currentUrl ? true : false,
            },
            // {
            //   name: "Scholarships",
            //   d: RouteEnum.SCHOLARSHIPS,
            //   // image: trips,
            //   color: RouteEnum.SCHOLARSHIPS == currentUrl ? true : false,
            // },
            // {
            //   name: "Edu-Invest",
            //   d: RouteEnum.INVEST,
            //   // image: trips,
            //   color: RouteEnum.INVEST == currentUrl ? true : false,
            // },

            // {name:'Support', d:RouteEnum.SUPPORT}
          ]
        : res?.data?.data?.user.account_type == "individual"
        ? [
            {
              name: "Dashboard",
              d: RouteEnum.DASHBOARD,
              // image: dashboard,
              color: RouteEnum.DASHBOARD == currentUrl ? true : false,
            },
            {
              name: "Grants",
              d: RouteEnum.GRANT,
              // image: companies,
              color: RouteEnum.GRANT == currentUrl ? true : false,
            },
            {
              name: "Loan",
              d: RouteEnum.LOAN,
              // image: rider,
              color: RouteEnum.LOAN == currentUrl ? true : false,
            },
            {
              name: "Scholarships",
              d: RouteEnum.SCHOLARSHIPS,
              // image: trips,
              color: RouteEnum.SCHOLARSHIPS == currentUrl ? true : false,
            },
            // {
            //   name: "Edu-Invest",
            //   d: RouteEnum.INVEST,
            //   // image: trips,
            //   color: false,
            // },
          ]
        : [
            {
              name: "Dashboard",
              d: RouteEnum.DASHBOARD,
              // image: dashboard,
              color: RouteEnum.DASHBOARD == currentUrl ? true : false,
            },
            {
              name: "Grants",
              d: RouteEnum.GRANT,
              // image: companies,
              color: RouteEnum.GRANT == currentUrl ? true : false,
            },
            {
              name: "Profile",
              d: RouteEnum.PROFILE,
              // image: rider,
              color: RouteEnum.PROFILE == currentUrl ? true : false,
            },
          ]
    );
  };

  const redirect = (push) => {
    console.log(push);
    history(push);
    // logout();
    // localStorage.clear();
  };
  React.useEffect(() => {
    // changeColorOnActive();
    getUser();
  }, [currentUrl]);

  const logout = (push) => {
    localStorage.removeItem("token");
    localStorage.clear();
    console.log("hi");
    history(push);
  };

  // const pat =

  const changeColorOnActive = (num) => {
    let k = pat?.map((e, index) => ({
      name: e.name,
      d: e.d,
      image: e.image,
      color: e.d == currentUrl ? true : false,
      // color: num == index ? true : false,
    }));

    setPat(k);
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#1E1E1E" }}>
      <div className="md:hidden px-8 pt-5 flex bg-white w-full">
        <AiOutlineMenu
          onClick={handleDrawerToggle}
          className="z-20 cursor-pointer"
          style={{ fontSize: "26px" }}
        />
      </div>
      {/* <CssBaseline /> */}
      {/* <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Drawer
        className=""
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant={!ismd ? "temporary" : "permanent"}
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {/* <Toolbar /> */}
        <div className="px-3 py-5">
          <LoginHeader />
        </div>
        {/* <Divider /> */}
        <List>
          {pat?.map((text, index) => (
            <ListItem
              style={{
                backgroundColor: text.color ? "#000051" : "",
                color: text.color ? "white" : "",
              }}
              // inkBarStyle={{ background: "yellow" }}
              key={text.name}
              disablePadding
            >
              <ListItemButton
                onClick={() => {
                  redirect(text.d);
                  changeColorOnActive(index);
                }}
              >
                <ListItemIcon>
                  {index === 2 ? (
                    ""
                  ) : (
                    // <BsPeople fontSize={24} />
                    <img src={text.image} />
                  )}
                </ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {outcasts?.map((text, index) => (
            <ListItem
              className={index % 2 == 0 ? "mt-36" : ""}
              key={text.name}
              disablePadding
            >
              <ListItemButton onClick={() => logout(text.linx)}>
                <ListItemIcon>
                  <img src={text.image} />
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                </ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
