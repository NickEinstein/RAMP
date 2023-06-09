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
  // {
  //   path: "*",
  //   element: <Navigate to={RouteEnum.HOME} replace />,
  // },

  {
    path: RouteEnum.SIGNUP,
    element: lazy(() => import("features/home/Home")),
  },
  // {
  //   path: RouteEnum.SIGNUP,
  //   element: lazy(() => import("features/signup/Signup")),
  // },
  {
    path: RouteEnum.VERIFYACCOUNT,
    element: lazy(() => import("features/otp/OtpPage")),
  },
  // {
  //   path: RouteEnum.SIGNUPCLIENT,
  //   element: lazy(() => import("features/signup/SignUpClient")),
  // },
  // {
  //   path: RouteEnum.SIGNUPCLIENT,
  //   element: lazy(() => import("features/signup/SignUpClientF")),
  // },
  // {
  //   path: RouteEnum.SIGNUPCLIENTF,
  //   element: lazy(() => import("features/signup/SignUpClientF")),
  // },
  // {
  //   path: RouteEnum.HOME,
  //   element: lazy(() => import("features/login/Login")),
  // },
  {
    path: RouteEnum.HOME,
    element: lazy(() => import("features/landingPage/LandingPage")),
  },
]);

export default AppPublic;
