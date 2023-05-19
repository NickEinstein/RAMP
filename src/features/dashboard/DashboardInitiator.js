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
import ManageCompaniesTable from "features/manageCompanies/ManageCompaniesTable";
// import { get } from "services/fetch";

function DashboardInitiator(props) {
  const [age, setAge] = React.useState("");
  const [section, setSection] = React.useState(2);
  const [show, setshow] = React.useState();
  const [ridersPicture, setRidersPicture] = useState("");
  const [imgData, setImgData] = useState(null);
  const [ridersPictureName, setRidersPictureName] = useState("");
  const [states, setStates] = useState([]);
  const [idTypes, setIdTypes] = useState([]);
  const [lgas, setLgas] = useState([]);
  const [isRegCompleted, setIsRegCompleted] = useState(false);
  const [isCorporate, setIsCorporate] = useState(false);
  const [grants, setGrants] = useState([]);
  const [isLoading, setIsLoading] = useState(0);
  const [loans, setLoans] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);

  const [myGrantApplication, setMyGrantApplications] = useState([null]);
  const [currentDetail, setCurrentDetail] = useState([null]);
  const [category, setCategory] = React.useState("");
  const [subCategory, setsubCategory] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
    console.log(event);
  };
  const [completed, setCompleted] = React.useState(false);
  const [completeRegFormData, setcompleteRegFormData] = React.useState({
    id_type: "",
    id_front: "",
    id_back: "",
    state_id: 1,
    lga_id: 1,
    city: "",
    street_name: "",
    cac_document: "",
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    setIsLoading(2);
  };
  const handleClose = (val = false) => {
    setOpen(false);
    // setCompleted()
    getUser();
  };

  const history = useNavigate();

  const redirect = (route) => {
    history(route);
  };

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
      // redirect();

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

  const onChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setcompleteRegFormData({
      ...completeRegFormData,
      [e.target.name]: e.target.value,
    });
  };

  const onFileChange = (event) => {
    // Update the state
    // setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
    if (event.target.files[0]) {
      console.log("picture: ", event.target.files);
      //  setPicture(event.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(event.target.files[0]);
    }
    onFileUpload(event.target.files[0]);

    setcompleteRegFormData({
      ...completeRegFormData,
      id_front: event.target.files[0],
      id_back: event.target.files[0],
    });
  };

  const onFileUpload = async (selectedFile) => {
    // Create an object of formData

    // Details of the uploaded file
    setRidersPictureName(selectedFile.name);
    setRidersPicture(selectedFile);
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
    getIDTypes();
    getUser();
    userScholarships();
    userLoaans();
    userGrants();
  }, []);

  const userLoaans = async () => {
    const res = await get({
      endpoint: "users/loans",
      // body: formData,
      // auth: false,
    });

    setLoans(res?.data?.data?.loans);

    console.log(res?.data?.data?.grants);
  };

  const userScholarships = async () => {
    const res = await get({
      endpoint: "users/scholarships",
      // body: formData,
      // auth: false,
    });

    setScholarships(res?.data?.data?.scholarships);

    console.log(res?.data?.data?.grants);
  };

  const getStates = async () => {
    const res = await get({
      endpoint: "states",
      // body: formData,
      // auth: false,
    });

    setStates(res?.data?.data?.states);

    console.log(res?.data?.data?.states);
  };

  const getUser = async () => {
    const res = await get({
      endpoint: "users/profile",
      // body: formData,
      // auth: false,
    });

    if (res?.data?.data?.user.state_id) {
      setIsLoading(2);
    } else setIsLoading(1);

    setIsRegCompleted(res?.data?.data?.user.state_id);

    setIsCorporate(
      res?.data?.data?.user.account_type == "corporate" ? true : false
    );
  };

  const getIDTypes = async () => {
    const res = await get({
      endpoint: "id-types",
      // body: formData,
      // auth: false,
    });

    //  setStates(res?.data?.data?.states);

    setIdTypes(res?.data?.data?.["id-types"]);
  };

  const userGrants = async () => {
    const res = await get({
      endpoint: "users/grants",
      // body: formData,
      // auth: false,
    });

    console.log(res?.data?.data?.grants);
    if (res?.data?.success) {
      setGrants(res?.data?.data?.grants);

      console.log(res?.data?.data?.grants);
    }
  };

  console.log(isCorporate);

  const getLgas = async (val) => {
    const res = await get({
      endpoint: `${val}/lgas`,
      // body: formData,
      // auth: false,
    });

    setLgas(res?.data?.data?.lgas);

    console.log(res?.data?.data?.states);
  };

  const completeApplication = async (isCompany) => {
    const formData = new FormData();
    const formDataCorporate = new FormData();

    // Update the formData object
    // formData.append("image", ridersPicture);
    formData.append("city", completeRegFormData.city);
    !isCorporate && formData.append("id_back", completeRegFormData.id_back);
    !isCorporate && formData.append("id_front", completeRegFormData.id_front);
    isCorporate &&
      formData.append("cac_document", completeRegFormData.id_front);
    formData.append("lga_id", completeRegFormData.lga_id);
    formData.append("state_id", completeRegFormData.state_id);
    formData.append("street", completeRegFormData.street_name);
    !isCorporate && formData.append("id_type", completeRegFormData.id_type);
    // formData.append("cac_document", completeRegFormData.cac_document);

    console.log(ridersPicture);

    // formDataCorporate = {...formData}

    // let payload = {

    // }
    let res = "";

    !isCorporate
      ? (res = await post({
          endpoint: "users/individual/complete-profile",
          body: formData,
          // auth: false,
        }))
      : (res = await post({
          endpoint: "users/corporate/complete-profile",
          body: formData,
          // auth: false,
        }));

    console.log(res);

    if (res.data.success) {
      enqueueSnackbar("Registration Completed Successfully", {
        variant: "success",
      });
      handleClose(true);
    } else {
      console.log(res);
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
  console.log(completeRegFormData);

  return (
    <div>
      <div className="">
        {/* <span className="text-xs mr-1 opacity-50">
          <MdRefresh />
        </span> */}
        <ToDoorSearch />
      </div>

      {
        <div>
          {!open && isLoading > 0 && (
            <div className="md:flex w-full gap-5 mt-8">
              <div className="flex flex-col gap-4 w-full border border-[#F0F6FF] p-4">
                {isLoading == 1 ? (
                  <div className="md:w-3/5 ">
                    <Typography className="mb-4" variant="h6">
                      {isLoading == 1 ? "One more thing..." : "Getting Started"}
                    </Typography>
                    <Typography>
                      Proceed by providing the information below to enable you
                      have access to all our features
                    </Typography>
                  </div>
                ) : (
                  <div className="flex items-end mr-3">
                    <div>
                      <div>
                        {/* <ToDoorSearch /> */}
                        <div className="flex items-end mr-3">
                          <div>
                            <div className="flex gap-4">
                              <WallCards
                                className="mr-3"
                                rider={false}
                                big={true}
                                name="Total Requests"
                                count={grants?.length}
                              />
                              <WallCards
                                rider={false}
                                big={true}
                                name="Pending"
                                count={
                                  grants?.filter((e) => e?.status == "pending")
                                    ?.length
                                }
                              />
                              <WallCards
                                rider={false}
                                big={true}
                                name="Approved"
                                count={
                                  grants?.filter((e) => e?.status == "open")
                                    ?.length
                                }
                              />
                              <WallCards
                                rider={false}
                                big={true}
                                name="FUnded"
                                count={
                                  grants?.filter((e) => e?.status == "approved")
                                    ?.length
                                }
                              />
                              <WallCards
                                rider={false}
                                big={true}
                                name="Declined"
                                count={
                                  grants?.filter((e) => e?.status == "delined")
                                    ?.length
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <Typography variant="h6" className="font-bold mt-8">
                          Donation History
                        </Typography>
                        <Divider className="mb-6 p-1" />
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
                          className=" mb-5 text-ssm"
                          placeholder="Search Donation "
                        />
                        <div className="py-3 w-[800px] md:w-full">
                          <div className="flex gap-2 w-full">
                            <Typography
                              variant="h6"
                              className="w-1/5 text-center text-[#5C6F7F]"
                            >
                              Date
                            </Typography>
                            <Typography
                              variant="h6"
                              className="w-1/5 text-center"
                            >
                              Reasons
                            </Typography>
                            <Typography
                              variant="h6"
                              className="w-1/5 text-center"
                            >
                              Amount
                            </Typography>
                            <Typography
                              variant="h6"
                              className="w-1/5 text-center"
                            >
                              Status
                            </Typography>
                            {/* <Typography
                              variant="h6"
                              className="w-1/5 text-center"
                            >
                              Action
                            </Typography> */}
                          </div>
                          <div className="overflow-x-scroll w-full">
                            {grants?.map((e) => (
                              <ManageCompaniesTable
                                tableArray={e}
                                setSection={setSection}
                                setCurrentDetail={setCurrentDetail}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Dialog
                      open={open}
                      // sx={{ height: "70/px", border: "2px solid red" }}
                      maxWidth={ismd && "lg"}
                      // fullWidth={true}
                      // sx={{padding:"40px 0", border:'2px solid red'}}
                      // TransitionComponent={Transition}
                    >
                      {/* <DialogTitle>Add Drug</DialogTitle> */}
                      <DialogContent sx={{ width: ismd ? "500px" : "w-full" }}>
                        <div className="flex flex-col gap-6 justify-center items-center text-center p-20">
                          <img src={educatiaSuccess} />
                          {/* <Typography variant="h5"> Successful</Typography> */}
                          <Typography variant="h5">
                            Your request for Donation was successful
                          </Typography>
                        </div>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          className="p-3 w-full text-base mx-20 mb-10 text-white"
                          type="submit"
                          onClick={() => {
                            handleClose();
                            setSection((prev) => prev + 1);
                            //   redirect();
                          }}
                          // className=' '
                        >
                          Okay
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                )}
                {/* <Typography>One more thing...</Typography> */}
                {isLoading == 1 ? (
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
              {isLoading == 1 && (
                <div className="md:w-2/5 bg-primary-main  p-4  text-white">
                  <Typography className="font-bold pr-[3%]" variant="h5">
                    Get access to unlimited <br /> funds
                  </Typography>
                  <Typography className="mt-5 pr-[10%]">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Ut wisi enim ad{" "}
                  </Typography>
                </div>
              )}
            </div>
          )}
          {open && (
            <div className="md:hidden ">
              <DialogTitle>
                <div className="flex justify-between items-center">
                  <div className="flex gap-8 items-center">
                    {/* <MdArrowBackIosNew
                      className="cursor-pointer"
                      onClick={() =>
                        setSection((prev) => (prev > 1 ? prev - 1 : prev))
                      }
                    /> */}
                    <Typography className="font-bold" variant="h6">
                      Complete Application - {section} of 2
                    </Typography>
                  </div>
                  <MdCancel className="cursor-pointer" onClick={handleClose} />
                </div>
              </DialogTitle>
              <DialogContent sx={{ width: "500px" }}>
                {/* Section 1 */}
                {section == 1 ? (
                  <div className="flex flex-col gap-2  items-center text-center p-10">
                    <Typography className="text-xs">
                      Upload Gov’t approved ID (Voter’s card, NIN, Int’l
                      Passport, Driver’s License)
                    </Typography>
                    {!isCorporate && (
                      <div className="w-full">
                        <InputLabel className="text-left mb-2">
                          Id Type
                        </InputLabel>
                        <TextField
                          fullWidth
                          id="outlined-select-currency"
                          select
                          onChange={onChange}
                          // label="Select"
                          // helperText="Please select your currency"
                        >
                          {idTypes?.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.type}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                    )}
                    <div>
                      <Typography className="text-left mb-2">
                        Front Of Id
                      </Typography>
                      {!ridersPicture && (
                        <div>
                          <input
                            onChange={onFileChange}
                            style={{ display: "none" }}
                            id="contained-button-file"
                            type="file"
                          />
                          <label
                            htmlFor="contained-button-file"
                            className="mb-8 cursor-pointer"
                          >
                            <img src={uploadPNG} />
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
                      {/* <Typography className="text-left mb-2 mt-4">
                    Back Of Id
                  </Typography>
                  <img src={uploadPNG} /> */}
                    </div>
                  </div>
                ) : (
                  /* Section 2 */
                  <div className="w-full flex flex-col gap-3">
                    {/* <div>
                    <InputLabel className="text-left mb-2">
                      Email Address
                    </InputLabel>
                    <TextField
                      // disabled
                      // value={currentDetail?.title}
                      onChange={onChange}
                      fullWidth
                      name="title"
                    />
                  </div>
                  <div>
                    <InputLabel className="text-left mb-2">
                      Physical Address
                    </InputLabel>
                    <TextField
                      // disabled
                      // value={currentDetail?.title}
                      onChange={onChange}
                      fullWidth
                      name="title"
                    />
                  </div>
                  <div>
                    <InputLabel className="text-left mb-2">Country</InputLabel>
                    <TextField
                      // disabled
                      // value={currentDetail?.title}
                      onChange={onChange}
                      fullWidth
                      name="title"
                    />
                  </div>
                  <div>
                    <InputLabel className="text-left mb-2">
                      Phone Number
                    </InputLabel>
                    <TextField
                      // disabled
                      // value={currentDetail?.title}
                      onChange={onChange}
                      fullWidth
                      name="title"
                    />
                  </div> */}
                    <div>
                      <InputLabel className="text-left mb-2">
                        Account Information
                      </InputLabel>
                      <TextField
                        className="w-1/2"
                        // disabled
                        // value={currentDetail?.title}
                        onChange={onChange}
                        name="title"
                      />
                    </div>
                    <div>
                      <InputLabel className="text-left mb-2">
                        Board Member Information
                      </InputLabel>
                      <TextField
                        className="w-1/2"
                        // disabled
                        // value={currentDetail?.title}
                        onChange={onChange}
                        name="title"
                      />
                    </div>
                    {/* <div>
                      <InputLabel className="text-left  mb-2">
                        I want to Loan
                      </InputLabel>
                      <TextField
                        InputProps={{
                          startAdornment: (
                            <InputAdornment
                              className="font-bold text-black"
                              position="start"
                            >
                              &#8358;
                            </InputAdornment>
                          ),
                        }}
                        fullWidth
                        onChange={onChange}
                        name="amount"
                        value={currentDetail?.amount}
                      />
                    </div> */}
                    <div>
                      <InputLabel className="text-left mb-2">
                        Impact And Track Record
                      </InputLabel>
                      <TextField
                        name="city"
                        className="w-1/2"
                        onChange={onChange}
                        multiline
                        rows={6}
                        value={completeRegFormData.city}
                      />
                    </div>
                    {/* Poverty (SDG 1) Health and well-being (SDG 3), Education (SDG
                  4), Gender equality (SDG 5) Inclusive economy (SDG 8),
                  Enabling an environment of peace and security Partnerships
                  Decent work and economic growth Responsible
                  consumption and production */}
                    <div>
                      <InputLabel className="text-left mb-2">
                        About Us (Not more than 600 words)
                      </InputLabel>
                      <TextField
                        name="street_name"
                        onChange={onChange}
                        multiline
                        className="w-1/2"
                        rows={6}
                        value={completeRegFormData.street_name}
                      />
                    </div>
                    <div>
                      <input
                        onChange={onFileChange}
                        style={{ display: "none" }}
                        id="contained-button-file"
                        type="file"
                      />
                      <label
                        htmlFor="contained-button-file"
                        className="mb-8 cursor-pointer"
                      >
                        <div className="text-black bg-yellow-200 mb-5 py-3 rounded-full w-2/3 text-center ">
                          {" "}
                          Supporting Documents
                        </div>
                        {/* <img src={uploadPNG} /> */}
                      </label>
                    </div>
                    {imgData && (
                      <div className="relative w-20">
                        <Avatar
                          className="w-32 h-32 border border-blue-300"
                          src={imgData}
                        />
                        {/* <Typography>{ridersPictureName.name}</Typography> */}
                        <div
                          onClick={() => setImgData("")}
                          className="p-1 bg-red-500 absolute w-4 h-4 flex justify-center hover:cursor-pointer items-center top-0 left-32 text-white rounded-full"
                        >
                          x
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </DialogContent>
              <DialogActions>
                <div className="flex gap-5 w-full  mx-20">
                  <Button
                    className="p-3 w-full bg-none text-base mb-10 text-white"
                    type="submit"
                    onClick={() => {
                      handleClose();
                      // redirect();
                    }}
                    // className=' '
                  >
                    Cancel
                  </Button>
                  <Button
                    className="p-3 w-full text-base mb-10 text-white"
                    type="submit"
                    // disabled
                    onClick={() => {
                      // section > 1
                         completeApplication()
                        // : setSection((prev) => prev + 1);
                      // handleClose();
                      // redirect();
                    }}
                    // className=' '
                  >
                    Submit
                  </Button>
                </div>
              </DialogActions>
            </div>
          )}
          {ismd && (
            <Dialog
              open={open}
              // sx={{ height: "70/px", border: "2px solid red" }}
              maxWidth={ismd && "lg"}
              // fullWidth={true}
              // sx={{padding:"40px 0", border:'2px solid red'}}
              // TransitionComponent={Transition}
            >
              <DialogTitle>
                <div className="flex justify-between items-center">
                  <div className="flex gap-8 items-center">
                    <MdArrowBackIosNew
                      className="cursor-pointer"
                      onClick={() =>
                        setSection((prev) => (prev > 1 ? prev - 1 : prev))
                      }
                    />
                    <Typography className="font-bold" variant="h6">
                      Complete Application - {section} of 2
                    </Typography>
                  </div>
                  <MdCancel className="cursor-pointer" onClick={handleClose} />
                </div>
              </DialogTitle>
              <DialogContent sx={{ width: "500px" }}>
                <div className="w-full flex flex-col gap-3">
                  {/* <div>
                    <InputLabel className="text-left mb-2">
                      Email Address
                    </InputLabel>
                    <TextField
                      // disabled
                      // value={currentDetail?.title}
                      onChange={onChange}
                      fullWidth
                      name="title"
                    />
                  </div>
                  <div>
                    <InputLabel className="text-left mb-2">
                      Physical Address
                    </InputLabel>
                    <TextField
                      // disabled
                      // value={currentDetail?.title}
                      onChange={onChange}
                      fullWidth
                      name="title"
                    />
                  </div>
                  <div>
                    <InputLabel className="text-left mb-2">Country</InputLabel>
                    <TextField
                      // disabled
                      // value={currentDetail?.title}
                      onChange={onChange}
                      fullWidth
                      name="title"
                    />
                  </div>
                  <div>
                    <InputLabel className="text-left mb-2">
                      Phone Number
                    </InputLabel>
                    <TextField
                      // disabled
                      // value={currentDetail?.title}
                      onChange={onChange}
                      fullWidth
                      name="title"
                    />
                  </div> */}
                  <div>
                    <InputLabel className="text-left mb-2">
                      Account Information
                    </InputLabel>
                    <TextField
                      // disabled
                      // value={currentDetail?.title}
                      onChange={onChange}
                      fullWidth
                      name="title"
                    />
                  </div>
                  <div>
                    <InputLabel className="text-left mb-2">
                      Board Member Information
                    </InputLabel>
                    <TextField
                      // disabled
                      // value={currentDetail?.title}
                      onChange={onChange}
                      fullWidth
                      name="title"
                    />
                  </div>
                  {/* <div>
                      <InputLabel className="text-left  mb-2">
                        I want to Loan
                      </InputLabel>
                      <TextField
                        InputProps={{
                          startAdornment: (
                            <InputAdornment
                              className="font-bold text-black"
                              position="start"
                            >
                              &#8358;
                            </InputAdornment>
                          ),
                        }}
                        fullWidth
                        onChange={onChange}
                        name="amount"
                        value={currentDetail?.amount}
                      />
                    </div> */}
                  <div>
                    <InputLabel className="text-left mb-2">
                      Impact And Track Record
                    </InputLabel>
                    <TextField
                      name="city"
                      onChange={onChange}
                      fullWidth
                      multiline
                      rows={6}
                      value={completeRegFormData.city}
                    />
                  </div>
                  {/* Poverty (SDG 1) Health and well-being (SDG 3), Education (SDG
                  4), Gender equality (SDG 5) Inclusive economy (SDG 8),
                  Enabling an environment of peace and security Partnerships
                  Decent work and economic growth Responsible
                  consumption and production */}
                  <div>
                    <InputLabel className="text-left mb-2">
                      About Us (Not more than 600 words)
                    </InputLabel>
                    <TextField
                      name="street_name"
                      onChange={onChange}
                      fullWidth
                      multiline
                      rows={6}
                      value={completeRegFormData.street_name}
                    />
                  </div>
                  <div>
                    <input
                      onChange={onFileChange}
                      style={{ display: "none" }}
                      id="contained-button-file"
                      type="file"
                    />
                    <label
                      htmlFor="contained-button-file"
                      className="mb-8 cursor-pointer"
                    >
                      <div className="text-black bg-yellow-200 mb-5 py-3 rounded-full w-2/3 text-center ">
                        {" "}
                        Supporting Documents
                      </div>
                      {/* <img src={uploadPNG} /> */}
                    </label>
                  </div>
                  {imgData && (
                    <div className="relative w-20">
                      <Avatar
                        className="w-32 h-32 border border-blue-300"
                        src={imgData}
                      />
                      {/* <Typography>{ridersPictureName.name}</Typography> */}
                      <div
                        onClick={() => setImgData("")}
                        className="p-1 bg-red-500 absolute w-4 h-4 flex justify-center hover:cursor-pointer items-center top-0 left-32 text-white rounded-full"
                      >
                        x
                      </div>
                    </div>
                  )}
                </div>
              </DialogContent>
              <DialogActions>
                <div className="flex gap-5 w-full  mx-20">
                  <Button
                    className="p-3 w-full bg-none text-base mb-10 text-white"
                    type="submit"
                    onClick={() => {
                      handleClose();
                      // redirect();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="p-3 w-full text-base mb-10 text-white"
                    type="submit"
                    // disabled
                    onClick={() => {
                      // section > 1
                        completeApplication()
                        // : setSection((prev) => prev + 1);
                      // handleClose();
                      // redirect();
                    }}
                    // className=' '
                  >
                    Submit
                  </Button>
                </div>
              </DialogActions>
            </Dialog>
          )}
        </div>
      }

      {isLoading == 0 && <div>Loading....</div>}
    </div>
  );
}

export default DashboardInitiator;
