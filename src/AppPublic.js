import { lazy } from "react";
import Suspense from "common/Suspense";
import { Navigate, useRoutes } from "react-router-dom";
import { configureRoutes } from "utils/RouteUtils";
import { RouteEnum } from "constants/RouteConstants";

function AppPublic() {
  const routes = useRoutes(ROUTES);

  return <Suspense>{routes}</Suspense>;
}

const ROUTES = configureRoutes([
  {
    path: "*",
    element: <Navigate to={RouteEnum.LOGIN} replace />,
  },
  {
    path: RouteEnum.LOGIN,
    element: lazy(() => import("features/login/Login")),
  },
  {
    path: RouteEnum.SIGNUP,
    element: lazy(() => import("features/home/Home")),
  },
 
  {
    path: RouteEnum.VERIFYACCOUNT,
    element: lazy(() => import("features/otp/OtpPage")),
  },
 
  {
    path: RouteEnum.ABOUT,
    element: lazy(() => import("features/about/OurStory")),
  },
  {
    path: RouteEnum.HOME,
    element: lazy(() => import("features/landingPage/LandingPage")),
  },

  {
    path: RouteEnum.LANDING,
    element: lazy(() => import("features/landingPage/LandingPage")),
  },

  {
    path: RouteEnum.WHATWEDO,
    element: lazy(() => import("features/about/WhatWeDo")),
  },
  {
    path: RouteEnum.OURVALUES,
    element: lazy(() => import("features/about/OurValues")),
  },
  {
    path: RouteEnum.TEAM,
    element: lazy(() => import("features/about/Team")),
  },

  {
    path: RouteEnum.HOWITWORKS,
    element: lazy(() => import("features/about/HowItWorks")),
  },
]);

export default AppPublic;
