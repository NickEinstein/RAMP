import { lazy, useEffect } from "react";
import "./App.css";
import AppThemeProvider from "AppThemeProvider";
import { Icon, IconButton } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { notistackRef } from "constants/RefConstants";
import Suspense from "common/Suspense";
import useAuthUser from "hooks/useAuthUser";
import { useLocation, useNavigate } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";

function App() {
  const authUser = useAuthUser();
  const history = useNavigate();

  // if (localStorage.getItem("token")) {
  //   history(RouteEnum.DASHBOARD);
  // } else {
  //   history(RouteEnum.HOME);
  // }

  return (
    <AppThemeProvider>
      <SnackbarProvider
        ref={notistackRef}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        preventDuplicate
        action={(key) => (
          <IconButton
            onClick={() => {
              notistackRef.current.closeSnackbar(key);
            }}
            color="inherit"
            size="small"
          >
            <Icon>close</Icon>
          </IconButton>
        )}
      >
        <Suspense>
          {localStorage.getItem("token") ? <AppProtected /> : <AppPublic />}
        </Suspense>
      </SnackbarProvider>
    </AppThemeProvider>
  );
}

export default App;

const AppPublic = lazy(() => import("./AppPublic"));
const AppProtected = lazy(() => import("./AppProtected"));
