import React, { useEffect, useState } from "react";
import UserApi from "apis/UserApi";
import { useFormik } from "formik";
import { MdRefresh, MdOutlineSearch, MdSearch } from "react-icons/md";
import * as yup from "yup";
import { useSnackbar } from "notistack";
// import { Button, TextField, Typography } from "@mui/material";
import PasswordTextField from "common/PasswordTextField";
import { getTextFieldFormikProps } from "utils/FormikUtils";
import useAuthUser from "hooks/useAuthUser";
import CompanyRiderCard from "common/CompanyRiderCard";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import educatiaSuccess from "images/EducatiaSuccess.png";

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { MediaQueryBreakpointEnum } from "constants/Global";
import { useNavigate } from "react-router-dom";
import WallCards from "common/WallCards";
import { AccountCircle } from "@mui/icons-material";
import ToDoorSearch from "common/ToDoorSearch";
import uploadPNG from "images/Educatial_Upload.png";
import ManageCompanyCard from "features/manageCompanies/ManageCompanyCard";
import { post, get } from "services/fetchDocuments";
import { RouteEnum } from "constants/RouteConstants";
import DashboardDonor from "./DashboardDonor";
import DashboardInitiator from "./DashboardInitiator";
import Admin from "features/admin/Admin";
import DashboardTech from "./DashboardTech";
// import { get } from "services/fetch";

function Dashboard(props) {
  const [isDonor, setIsDonor] = useState(false);

  useEffect(() => {
    console.log(!localStorage.getItem("role") == "Eduinitiator");
    getUser();
  }, []);

  const getUser = async () => {
    const res = await get({
      endpoint: "users/profile",
      // body: formData,
      // auth: false,
    });

    //  setIsRegCompleted(res?.data?.data?.states);
  };

  return (
    <div>
      {localStorage.getItem("tech").includes("tech") ? (
        <DashboardTech />
      ) : localStorage.getItem("role") == ("Super admin" || "Admin") ? (
        <Admin />
      ) : localStorage.getItem("role") !== "Eduinitiator" ? (
        <DashboardDonor />
      ) : (
        <DashboardInitiator />
      )}
    </div>
  );
}

export default Dashboard;
