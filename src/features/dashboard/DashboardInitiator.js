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
import { Link, useNavigate } from "react-router-dom";
import WallCards from "common/WallCards";
import { AccountCircle } from "@mui/icons-material";
import ToDoorSearch from "common/ToDoorSearch";
import uploadPNG from "images/Educatial_Upload.png";
import ManageCompanyCard from "features/manageCompanies/ManageCompanyCard";
import { post, get } from "services/fetchDocuments";
import { RouteEnum } from "constants/RouteConstants";
import moment from "moment";
// import { get } from "services/fetch";

function DashboardInitiator(props) {
  const [age, setAge] = React.useState("");
  const [section, setSection] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [ridersPicture, setRidersPicture] = useState("");
  const [imgData, setImgData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [idTypes, setIdTypes] = useState([]);
  const [lgas, setLgas] = useState([]);
  const [isRegCompleted, setIsRegCompleted] = useState(false);
  const [isCorporate, setIsCorporate] = useState(false);
  const [grants, setGrants] = useState([]);
  const [allUsersRequests, setAllUsersRequests] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const [categoriez, setcategoriez] = useState([]);
  const [sdgz, setsdgz] = useState([]);
  const [countriez, setcountriez] = useState([]);
  const [subcategory, setsubcategory] = useState([]);
  const [myContributions, setmyContributions] = useState([]);
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);

  const [completed, setCompleted] = React.useState(false);
  const [completeRegFormData, setcompleteRegFormData] = React.useState({
    board_member_information: [],
    organization_structure: [],
    account_information: [],
    state_id: "",
    lga_id: "",
    city: "",
    address: "",
    about: "",
    category_id: "",
    s_d_g_id: "",
    request_type_id: "",
    avatar: "",
    country_id: "",
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (val = false) => {
    setOpen(false);
  };

  const history = useNavigate();

  const redirect = (route) => {
    history(route);
  };

  const authUser = useAuthUser();

  const { enqueueSnackbar } = useSnackbar();
  const [loginMuation, loginMutationResult] = UserApi.useLoginMutation();

  const onChange = (e) => {
    setcompleteRegFormData({
      ...completeRegFormData,
      [e.target.name]: e.target.value,
    });
  };

  const onFileChange = (event, name) => {
    // Update the state
    // setSelectedFile(event.target.files[0]);
    console.log(event.target.files);

    if (name == 1) {
      setcompleteRegFormData({
        ...completeRegFormData,
        board_member_information: event.target.files,
      });
      return;
    }
    if (name == 2) {
      setcompleteRegFormData({
        ...completeRegFormData,
        organization_structure: event.target.files,
      });
      return;
    }
    if (name == 3) {
      setcompleteRegFormData({
        ...completeRegFormData,
        account_information: event.target.files,
      });
      return;
    }
    if (name == 4) {
      setcompleteRegFormData({
        ...completeRegFormData,
        avatar: event.target.files[0],
      });
      if (event.target.files) {
        console.log("picture: ", event.target.files);
        //  setPicture(event.target.files[0]);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setImgData(reader.result);
        });
        reader.readAsDataURL(event.target.files[0]);
      }
      return;
    }
  };

  const currenciez = [
    {
      value: "corporate_brand",
      label: "Corporate Brands",
    },

    {
      value: "educational_institution",
      label: "Educational Institutions",
    },
    {
      value: "alumni",
      label: "Alumnis",
    },
    {
      value: "community",
      label: "Communities",
    },
    {
      value: "training_firm",
      label: " Training Firms",
    },
    {
      value: "vocational_institution",
      label: "Vocational Institutions",
    },
  ];

  useEffect(() => {
    getStates();
    getCategories();
    getSdgs();
    getCountries();
    getRequestTypes();
    getUser();
    requestTypeItemz();
    allRequests();
    userGrants();
  }, []);

  const userGrants = async () => {
    setLoading(false);

    const res = await get({
      endpoint: "requests/display/all",
      // body: formData,
      // auth: false,
    });

    setGrants(res?.data?.data?.grants);
  };
  const allRequests = async () => {
    setLoading(false);

    const res = await get({
      endpoint: "requests",
      // body: formData,
      // auth: false,
    });

    setAllUsersRequests(res?.data?.data?.requests);
    setmyContributions(res?.data?.data?.requests);
    setLoading(true);
  };

  const getStates = async () => {
    const res = await get({
      endpoint: "states",
      // body: formData,
      // auth: false,
    });

    setStates(res?.data?.data?.states);
  };

  const getUser = async () => {
    setLoading(false);

    const res = await get({
      endpoint: "users/profile",
      // body: formData,
      // auth: false,
    });

    //  setIsRegCompleted(res?.data?.data?.states);

    setIsRegCompleted(res?.data?.data?.user.state_id);
    setLoading(true);

    setIsCorporate(
      res?.data?.data?.user.account_type == "corporate" ? true : false
    );
  };

  const getRequestTypes = async () => {
    const res = await get({
      endpoint: "request_types",
      // body: formData,
      // auth: false,
    });

    setIdTypes(res?.data?.data?.request_types);
  };

  const getLgas = async (val) => {
    const res = await get({
      endpoint: `${val}/lgas`,
      // body: formData,
      // auth: false,
    });

    setLgas(res?.data?.data?.lgas);
  };

  const getCategories = async (val) => {
    const res = await get({
      endpoint: `categories`,
      // body: formData,
      // auth: false,
    });

    // setLgas(res?.data?.data?.lgas);

    setcategoriez(res?.data?.data?.categories);
  };

  const getSdgs = async (val) => {
    const res = await get({
      endpoint: `sdgs`,
      // body: formData,
      // auth: false,
    });

    // setLgas(res?.data?.data?.lgas);

    setsdgz(res?.data?.data?.sgds);
  };

  const requestTypeItemz = async (val) => {
    const res = await get({
      endpoint: `request_type_items`,
      // body: formData,
      // auth: false,
    });

    // setLgas(res?.data?.data?.lgas);

    setsubcategory(res?.data?.data?.request_type_items);
  };

  const getCountries = async (val) => {
    const res = await get({
      endpoint: `countries/get`,
      // body: formData,
      // auth: false,
    });

    // setLgas(res?.data?.data?.lgas);

    setcountriez(res?.data?.data?.countries);
  };

  const completeApplication = async (isCompany) => {
    setIsLoading(true);
    const formData = new FormData();
    const formDataCorporate = new FormData();

    console.log(completeRegFormData);
    formData.append(
      "board_member_information",
      completeRegFormData.board_member_information[0]
    );
    formData.append(
      "organization_structure",
      completeRegFormData.organization_structure[0]
    );
    formData.append(
      "account_information",
      completeRegFormData.account_information[0]
    );

    formData.append("state_id", completeRegFormData.state_id);
    formData.append("lga_id", completeRegFormData.lga_id);
    formData.append("city", completeRegFormData.city);
    formData.append("address", completeRegFormData.address);
    formData.append("about", completeRegFormData.about);
    formData.append("category_id", completeRegFormData.category_id);
    formData.append("s_d_g_id", completeRegFormData.s_d_g_id);
    formData.append("request_type_id", completeRegFormData.request_type_id);
    formData.append("avatar", completeRegFormData.avatar);
    formData.append("country_id", completeRegFormData.country_id);

    const res = await post({
      endpoint: "users/complete-profile",
      body: formData,
      // auth: false,
    });

    console.log(res);

    if (res.data.success) {
      handleClose(true);
      setIsLoading(false);
      enqueueSnackbar(
        res?.data?.message || "Submitted successfully went Wrong",
        {
          variant: "success",
        }
      );
    } else {
      console.log(res);
      enqueueSnackbar(res?.data?.message || "Something went Wrong", {
        variant: "error",
      });
      setIsLoading(false);
    }
  };

  const currencies = [
    {
      value: "Driver's Licence",
      label: "Driver's Licence",
    },
    {
      value: "Voter's Card",
      label: "Voter's Card",
    },
    {
      value: "Int'l Passport",
      label: "Int'l Passport",
    },
    {
      value: "Voters card",
      label: "Voters card",
    },
  ];

  return (
    <div>
      <div className="">
        {/* <span className="text-xs mr-1 opacity-50">
          <MdRefresh />
        </span> */}
        <ToDoorSearch />
      </div>

      {open && (
        <div className="w-full">
          <DialogTitle>
            {section > 1 && (
              <div
                onClick={() =>
                  setSection((prev) => (prev > 1 ? prev - 1 : prev))
                }
                class="flex items-center gap-3 mb-4"
              >
                <MdArrowBackIosNew className="cursor-pointer" />
                <Typography className="font-bold" variant="h6">
                  Back
                </Typography>
              </div>
            )}
            <div className="flex justify-between items-center">
              <div className="flex gap-8 items-center">
                <Typography className="font-bold text-center" variant="h6">
                  Complete Registration - {section} of 3
                </Typography>
              </div>

              <MdCancel className="cursor-pointer" onClick={handleClose} />
            </div>
          </DialogTitle>
          <DialogContent className="mx-auto md:w-[700px]">
            {/* Section 1 */}
            {section == 3 && (
              <div>
                <div className="w-full flex flex-col items-center justify-center gap-5">
                  <div className="flex flex-col gap-2 justify-center  items-center text-center p-10">
                    <div>
                      <Typography className="text-left mb-2">
                        Upload Company Logo
                      </Typography>
                      {!ridersPicture && (
                        <div>
                          <input
                            onChange={(e) => onFileChange(e, 4)}
                            style={{ display: "none" }}
                            id="contained-button-file"
                            type="file"
                          />
                          <label
                            htmlFor="contained-button-file"
                            className="mb-8 cursor-pointer"
                          >
                            <Avatar
                              className="w-32 h-32 border border-blue-300"
                              src={imgData}
                            />
                          </label>
                        </div>
                      )}
                      {ridersPicture && (
                        <div className="relative w-20">
                          <Avatar
                            className="w-32 h-32 border border-blue-300"
                            src={imgData}
                          />
                          {/* <Typography>{ridersPictureName.name}</Typography> */}
                          <div
                            onClick={() => setRidersPicture("")}
                            className="p-1 bg-red-500 absolute w-4 h-4 flex justify-center hover:cursor-pointer items-center top-0 left-32 text-white rounded-full"
                          >
                            x
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="w-full flex flex-col items-center justify-center">
                    <InputLabel className="text-left mb-4">
                      {" "}
                      Board Member Information
                    </InputLabel>

                    <div className="mb-5">
                      <input
                        onChange={(e) => onFileChange(e, 1)}
                        style={{ display: "none" }}
                        id="board_member_information-file"
                        type="file"
                        multiple
                      />
                      <label
                        htmlFor="board_member_information-file"
                        className="mb-8 cursor-pointer bg-primary-main p-4 w-1/2 text-white rounded-full"
                      >
                        Upload Board Member Information
                      </label>
                    </div>

                    <div>
                      {Array.from(completeRegFormData?.board_member_information)
                        .map((file) => file.name)
                        ?.map((e) => (
                          <div>
                            <Typography variant="h6">{e}</Typography>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="w-full flex flex-col items-center justify-center">
                    <InputLabel className="text-left mb-4">
                      {" "}
                      Organizational Structure
                    </InputLabel>

                    <div className="mb-5">
                      <input
                        onChange={(e) => onFileChange(e, 2)}
                        style={{ display: "none" }}
                        id="organization_structure-file"
                        type="file"
                        multiple
                      />
                      <label
                        htmlFor="organization_structure-file"
                        className="mb-8 cursor-pointer bg-primary-main p-4 w-1/2 text-white rounded-full"
                      >
                        Upload Organisational Structure
                      </label>
                    </div>

                    <div>
                      {Array.from(completeRegFormData?.organization_structure)
                        .map((file) => file.name)
                        ?.map((e) => (
                          <div>
                            <Typography variant="h6">{e}</Typography>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="w-full flex flex-col items-center justify-center">
                    <InputLabel className="text-left mb-4">
                      {" "}
                      Account Information
                    </InputLabel>

                    <div className="mb-5">
                      <input
                        onChange={(e) => onFileChange(e, 3)}
                        style={{ display: "none" }}
                        id="account_information-file"
                        type="file"
                        multiple
                      />
                      <label
                        htmlFor="account_information-file"
                        className="mb-8 cursor-pointer bg-primary-main p-4 w-1/2 text-white rounded-full"
                      >
                        Upload Organisational Structure
                      </label>
                    </div>

                    <div>
                      {Array.from(completeRegFormData?.account_information)
                        .map((file) => file.name)
                        ?.map((e) => (
                          <div>
                            <Typography variant="h6">{e}</Typography>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {
              /* Section 2 */
              section == 1 && (
                <div className="flex flex-col gap-2  items-center p-10">
                  <Typography
                    variant="h6"
                    className="font-bold text-left text-[#667085"
                  >
                    Enter Physical Address
                  </Typography>
                  <div className="w-full flex flex-col gap-3">
                    <div className="md:flex justify-between gap-5">
                      <div className="w-full">
                        <InputLabel className="text-left mb-2">
                          {" "}
                          Country
                        </InputLabel>
                        <TextField
                          onChange={(e) => {
                            onChange(e);
                            // getLgas(e.target.value);
                          }}
                          fullWidth
                          id="outlined-select-currency"
                          select
                          // label="Select"
                          name="country_id"
                          // value={completeRegFormData?.state_id}

                          // helperText="Please select your currency"
                        >
                          {countriez?.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.country_name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                      <div className="w-full">
                        <InputLabel className="text-left mb-2">
                          {" "}
                          State Of Residence
                        </InputLabel>
                        <TextField
                          onChange={(e) => {
                            onChange(e);
                            getLgas(e.target.value);
                          }}
                          fullWidth
                          id="outlined-select-currency"
                          select
                          // label="Select"
                          name="state_id"
                          // value={completeRegFormData?.state_id}

                          // helperText="Please select your currency"
                        >
                          {states?.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.state}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                    </div>

                    <div className="md:flex gap-5">
                      <div className="w-full">
                        <InputLabel className="text-left mb-2">
                          LGA of Residence
                        </InputLabel>
                        <TextField
                          onChange={onChange}
                          fullWidth
                          id="outlined-select-currency"
                          select
                          name="lga_id"
                        >
                          {lgas?.map((option) => (
                            <MenuItem key={option?.id} value={option?.id}>
                              {option?.lga}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                      <div className="w-full">
                        <InputLabel className="text-left mb-2">
                          {" "}
                          City
                        </InputLabel>
                        <TextField
                          fullWidth
                          onChange={onChange}
                          name="city"
                          value={completeRegFormData?.city}
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <InputLabel className="text-left mb-2">
                        {" "}
                        Address
                      </InputLabel>
                      <TextField
                        multiline
                        rows={2}
                        fullWidth
                        name="address"
                        value={completeRegFormData?.address}
                        // label="Select"
                        onChange={onChange}
                        // helperText="Please select your currency"
                      />
                    </div>
                    <div className="w-full">
                      <InputLabel className="text-left mb-2">
                        {" "}
                        About Us
                      </InputLabel>
                      <TextField
                        multiline
                        rows={4}
                        fullWidth
                        name="about"
                        value={completeRegFormData?.about}
                        // label="Select"
                        onChange={onChange}
                        // helperText="Please select your currency"
                      />
                    </div>
                  </div>
                </div>
              )
            }

            {section == 2 && (
              <div className="flex flex-col gap-5">
                <div className="w-full">
                  <InputLabel className="text-left mb-2">
                    {" "}
                    Select NGO Category
                  </InputLabel>
                  <TextField
                    onChange={(e) => {
                      onChange(e);
                    }}
                    fullWidth
                    id="outlined-select-currency"
                    select
                    name="category_id"
                  >
                    {categoriez?.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className="w-full">
                  <InputLabel className="text-left mb-2">
                    {" "}
                    Select NGO SDG
                  </InputLabel>
                  <TextField
                    onChange={(e) => {
                      onChange(e);
                    }}
                    fullWidth
                    id="outlined-select-currency"
                    select
                    // label="Select"
                    name="s_d_g_id"
                  >
                    {sdgz?.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.goal}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className="w-full">
                  <InputLabel className="text-left mb-2">
                    {" "}
                    Select Donation Category
                  </InputLabel>
                  <TextField
                    onChange={(e) => {
                      onChange(e);
                    }}
                    fullWidth
                    id="outlined-select-currency"
                    select
                    // label="Select"
                    name="request_type_id"
                  >
                    {idTypes?.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.type && option.type == "Materials"
                          ? "In Kind"
                          : option.type}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className="w-full">
                  <InputLabel className="text-left mb-2">
                    {" "}
                    Select Donation Sub-Category
                  </InputLabel>
                  <TextField
                    onChange={(e) => {
                      onChange(e);
                    }}
                    fullWidth
                    id="outlined-select-currency"
                    select
                    name="sub_request_type_id"
                  >
                    {subcategory
                      ?.filter(
                        (e) =>
                          e.request_type_id ==
                          completeRegFormData?.request_type_id
                      )

                      .map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.item_name}
                        </MenuItem>
                      ))}
                  </TextField>
                </div>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <div className="flex gap-5 w-full  md:mx-20">
              <Button
                className="p-3 w-full bg-none text-base mb-10 text-white"
                type="submit"
                onClick={() => {
                  handleClose();
                }}
              >
                Cancel
              </Button>

              <Button
                className="p-3 w-full text-base mb-10 text-white flex justify-center items-center gap-4"
                type="submit"
                onClick={() => {
                  section > 2
                    ? completeApplication()
                    : setSection((prev) => prev + 1);
                }}
              >
                {isLoading && (
                  <div class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                )}
                {section > 2 ? "Submit" : "Next"}
              </Button>
            </div>
          </DialogActions>
        </div>
      )}

      {!open && (
        <div className="md:flex w-full gap-5 mt-8">
          {loading ? (
            <div className="flex flex-col gap-4 w-full border border-[#F0F6FF] p-4">
              {!isRegCompleted ? (
                <div className="md:w-3/5 ">
                  <Typography className="mb-4" variant="h6">
                    {!isRegCompleted ? "One more thing..." : "Getting Started"}
                  </Typography>
                  <Typography>
                    Your application have been approved. Proceed by providing
                    the information below to enable you have access to all our
                    features
                  </Typography>
                </div>
              ) : (
                <div>
                  <div className="flex items-end mr-3 mt-12 justify-center">
                    <div className="flex gap-4 w-full border-[#ECEEF7] border-2 rounded-2xl py-6">
                      <div className="w-full" to={RouteEnum?.SCHOLARSHIPS}>
                        <WallCards
                          rider={false}
                          big={true}
                          name="Total Requests"
                          count={allUsersRequests?.length}
                        />
                      </div>
                      <div className="w-full" to={RouteEnum?.GRANT}>
                        <WallCards
                          className="mr-3"
                          rider={false}
                          big={true}
                          name="Total Cash Requests"
                          count={
                            allUsersRequests?.filter(
                              (e) => e?.request_type?.id == 1
                            )?.length
                          }
                        />
                      </div>
                      <div className="w-full" to={RouteEnum?.LOAN}>
                        <WallCards
                          rider={false}
                          big={true}
                          name="Total Inkind Requests"
                          count={
                            allUsersRequests?.filter(
                              (e) => e?.request_type?.id == 3
                            )?.length
                          }
                        />
                      </div>
                      <div className="w-full" to={RouteEnum?.SCHOLARSHIPS}>
                        <WallCards
                          rider={false}
                          big={true}
                          name="Total Expertise Requests"
                          count={
                            allUsersRequests?.filter(
                              (e) => e?.request_type?.id == 2
                            )?.length
                          }
                        />
                      </div>
                    </div>
                    {/* <WallCards name='Total Raiders' count='116,019'/>
                            <WallCards name='Rides in progress' count='13'/>
                            <WallCards name='Active vehicles' count='8'/>
                            <WallCards name='Earnings' count='3,000,000'/> */}
                  </div>

                  <div>
                    <div>
                      {/* <ToDoorSearch /> */}

                      <div className="flex items-end mt-12 w-full">
                        {/* <WallCards name='Total Raiders' count='116,019'/>
          <WallCards name='Rides in progress' count='13'/>
          <WallCards name='Active vehicles' count='8'/>
          <WallCards name='Earnings' count='3,000,000'/> */}
                      </div>

                      <div className="flex items-center justify-between my-8">
                        <Typography variant="h6" className="font-bold">
                          History
                        </Typography>

                        <TextField
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="start">
                                <MdOutlineSearch />
                              </InputAdornment>
                            ),
                          }}
                          variant="outlined"
                          className=" text-ssm w-2/3 "
                          placeholder="Search "
                        />
                      </div>
                      <div className="flex gap-2 px-3">
                        <Typography
                          variant="h6"
                          className="w-1/5 text-left text-[#5C6F7F]"
                        >
                          Title
                        </Typography>
                        <Typography
                          variant="h6"
                          className="w-1/5 text-center text-[#5C6F7F]"
                        >
                          Reason
                        </Typography>
                        <Typography
                          variant="h6"
                          className="w-1/5 text-center text-[#5C6F7F]"
                        >
                          Request Date
                        </Typography>
                        {/* <Typography variant="h6" className="w-1/5 text-left ">
                  Type Of Scholarships
                </Typography> */}
                        <Typography variant="h6" className="w-1/5 text-center ">
                          Type
                        </Typography>
                        <Typography variant="h6" className="w-1/5 text-center ">
                          Sub-Type
                        </Typography>
                        {/* <Typography variant="h6" className="w-1/5 text-center ">
              Amount
            </Typography> */}

                        {/* <Typography variant="h6" className="w-1/5 text-left ">
                  Amount To Return
                </Typography> */}

                        <Typography variant="h6" className="w-1/5 text-center ">
                          Status
                        </Typography>
                      </div>

                      <Divider className="mb-2 p-1" />

                      <div className="p-3 md:full min-w-[800px]">
                        {myContributions?.map((e) => (
                          <div>
                            {/* { props.tableArray.map((e)=> */}
                            <div>
                              <div
                                // onClick={openBelow}
                                className=" flex gap-2 w-full  min-h-[50%]"
                              >
                                <div
                                  className={
                                    props?.jj == "loan"
                                      ? " text-left p-3 w-2/5 "
                                      : " text-left p-3 w-2/5 "
                                  }
                                >
                                  <Typography variant="">{e?.title}</Typography>
                                </div>
                                <div
                                  className={
                                    props?.jj == "loan"
                                      ? " text-left p-3 w-2/5 "
                                      : " text-center p-3 w-2/5 "
                                  }
                                >
                                  <Typography variant="">
                                    {e?.reason}
                                  </Typography>
                                </div>
                                <div
                                  className={
                                    props?.jj == "loan"
                                      ? " text-left p-3 w-2/5 "
                                      : " text-center p-3 w-2/5 "
                                  }
                                >
                                  <Typography variant="">
                                    {moment(e?.created_at)?.format("ll")}
                                  </Typography>
                                </div>
                                <div
                                  className={
                                    props?.jj == "loan"
                                      ? " text-left p-3 w-2/5 "
                                      : " text-center p-3 w-2/5 "
                                  }
                                >
                                  <Typography variant="">
                                    {e?.request_type?.type}
                                  </Typography>
                                </div>
                                <div
                                  className={
                                    props?.jj == "loan"
                                      ? " text-left p-3 w-2/5 "
                                      : " text-center p-3 w-2/5 "
                                  }
                                >
                                  <Typography variant="">
                                    {e?.request_type_item?.item_name}
                                  </Typography>
                                </div>
                                {/* <div
                      className={
                        props?.jj == "loan"
                          ? " text-left p-3 w-2/5 "
                          : " text-center p-3 w-2/5 "
                      }
                    >
                      <Typography variant="">{e?.amount}</Typography>
                    </div> */}

                                <div
                                  className={
                                    props?.jj == "loan"
                                      ? " text-center p-3 w-2/5 "
                                      : " text-center p-3 w-2/5"
                                  }
                                >
                                  <Typography
                                    className="rounded-3xl text-[12px]"
                                    style={{
                                      backgroundColor:
                                        e?.status == "open"
                                          ? "#E2FEF0"
                                          : e?.status == "declined"
                                          ? "#FFF1F0"
                                          : e?.status == "disbursed"
                                          ? "#E2FEF0"
                                          : "#FFECC7",

                                      color:
                                        e?.status == "approved"
                                          ? "#05944F"
                                          : e?.status == "declined"
                                          ? "#B81500"
                                          : e?.status == "disbursed"
                                          ? "#05944F"
                                          : "#A87000",
                                    }}
                                    variant="h6"
                                  >
                                    {e?.status == "open"
                                      ? "Approved"
                                      : e?.status}
                                  </Typography>
                                </div>
                              </div>
                            </div>
                            {/* )} */}
                          </div>
                          // <ManageCompaniesTable
                          //   jj={"scholarship"}
                          //   tableArray={e}
                          //   setSection={setSection}
                          //   setCurrentDetail={setCurrentDetail}
                          // />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* <Typography>One more thing...</Typography> */}
              {!isRegCompleted ? (
                <Button
                  onClick={handleOpen}
                  className="bg-primary-main h-10 text-white rounded-sm md:w-2/5"
                >
                  Complete Registration
                </Button>
              ) : (
                <div className="flex gap-5 w-full text-white">
                  {/* <Button
                  onClick={() => redirect(RouteEnum.GRANT)}
                  className="text-white h-12 min-w-[160px]"
                >
                  Request Grant
                </Button>
                <Button
                  onClick={() => redirect(RouteEnum.LOAN)}
                  className="text-[#667085] bg-white border border-[#667085] h-12 min-w-[160px]"
                >
                  Request Laon
                </Button> */}
                </div>
              )}
            </div>
          ) : (
            "...Loading"
          )}
          {!isRegCompleted && loading && (
            <div className="md:w-3/5 bg-primary-main  p-4  text-white">
              <Typography className="font-bold pr-[3%]" variant="h5">
                Get access to unlimited <br /> funds
              </Typography>
              <Typography className="mt-5 pr-[10%]">
                Create your profile. Once approved, proceed to make a request .
                The more complete your profile is, the better chance you'll be
                approved on time and your most valued need met
              </Typography>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DashboardInitiator;
