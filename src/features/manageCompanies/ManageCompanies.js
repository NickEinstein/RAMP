import React, { useState } from "react";
import UserApi from "apis/UserApi";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
// import { Button, TextField, Typography } from "@mui/material";
import PasswordTextField from "common/PasswordTextField";
import { getTextFieldFormikProps } from "utils/FormikUtils";
import useAuthUser from "hooks/useAuthUser";

import gigLogo from "images/Ellipse 56.png";

import {
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  Input,
  MenuItem,
  Rating,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import WallCards from "common/WallCards";
import ManageCompanyCard from "./ManageCompanyCard";
import { RiArrowLeftSLine } from "react-icons/ri";
import ManageCompaniesTable from "./ManageCompaniesTable";
import NewWallCards from "common/NewWallCards";
import ToDoorSearch from "common/ToDoorSearch";

function ManageCompanies(props) {
  const [show, setShow] = useState(false);
  const handleShow = (event) => {
    setShow(!show);
    console.log("john");
  };
  const history = useNavigate();

  const redirect = () => {
    history("/complete-signUp");
  };

  const top100Films = [
    { label: "Edo State", year: 1994 },
    { label: "Oredo", year: 1972 },
  ];

  const tableArray = [
    {
      image: gigLogo,
      name: "Nickky Samuel jonas  ",
      company: "GIG Logistics",
      Id: "2234456",
      ratings: "4",
    },

    {
      image: gigLogo,
      name: "John jimmy Samuel  ",
      company: "GIG Logistics",
      Id: "2234456",
      ratings: "4",
    },
  ];

  const authUser = useAuthUser();

  const { enqueueSnackbar } = useSnackbar();
  const [loginMuation, loginMutationResult] = UserApi.useLoginMutation();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup.string().trim().required(),
      password: yup.string().trim().required(),
    }),
    onSubmit: async (values) => {
      console.log(values);
      // localStorage.setItem('location', values.location)
      redirect();

      try {
        const data = await loginMuation({ data: values }).unwrap();
        // TODO extra login
        // redirect()
        enqueueSnackbar("Logged in successful", { variant: "success" });
      } catch (error) {
        enqueueSnackbar(error?.data?.message, "Failed to login", {
          variant: "error",
        });
      }
    },
  });

  // if (authUser.accessToken) {
  //   return <Navigate to={RouteEnum.HOME} />;
  // }

  return (
    <div>
      <ToDoorSearch />
     
    </div>
  );
}

export default ManageCompanies;
