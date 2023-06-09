import { lazy, useState } from "react";
import { Container, Toolbar, Typography, useMediaQuery } from "@mui/material";
import { MediaQueryBreakpointEnum } from "constants/Global";
import { Navigate, useRoutes } from "react-router-dom";
import Suspense from "common/Suspense";
import { configureRoutes } from "utils/RouteUtils";
import { RouteEnum } from "constants/RouteConstants";
import Box from '@mui/material/Box';
import SideBar from "features/sideBar/SideBar";
import { AiOutlineMenu } from "react-icons/ai";

function AppProtected(props) {
  const [openHam, setOpenHam ] = useState(false)
  const islg = useMediaQuery(MediaQueryBreakpointEnum.lg);
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);

  const routes = useRoutes(ROUTES);
  return (
    <>
      {/* <Container maxWidth="xl"> */}
      {localStorage.getItem("token") && (
        <div className="md:flex relative">
          <div className="">
            <SideBar />
          </div>

          {/* <AiOutlineMenu
            onClick={() => setOpenHam((p) => !p)}
            className="border z-20"
            style={{ fontSize: "46px" }}
          /> */}

          <Box
            className="p-8"
            component=""
            sx={{ flexGrow: 1, bgcolor: "background.default" }}
          >
            <Suspense>{routes}</Suspense>
          </Box>
        </div>
      )}

      {/* </Container> */}
    </>
  );
}

export default AppProtected;

const ROUTES = configureRoutes([
  {
    path: "*",
    element: <Navigate to={RouteEnum.DASHBOARD} replace />,
  },
  {
    path: RouteEnum.DASHBOARD,
    element: lazy(() => import("features/dashboard/Dashboard")),
  },
  {
    path: RouteEnum.GRANT,
    element: lazy(() => import("features/grant/Grant")),
  },
 
  {
    path: RouteEnum.PROFILE,
    element: lazy(() => import("features/profile/Profile")),
  },

  {
    path: RouteEnum.INVEST,
    element: lazy(() => import("features/invest/Invest")),
  },
]);
