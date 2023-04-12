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
// import { get } from "services/fetch";

function DashboardInitiator(props) {
  const [age, setAge] = React.useState("");
  const [section, setSection] = React.useState(1);
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
  const [loans, setLoans] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);

  const handleChange = (event) => {
    setAge(event.target.value);
    console.log(event);
  };
  const [completed, setCompleted] = React.useState(false);
  const [completeRegFormData, setcompleteRegFormData] = React.useState({
    id_type: "",
    id_front: "",
    id_back: "",
    state_id: "",
    lga_id: "",
    city: "",
    street_name: "",
    cac_document: "",
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
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
    // onUpload();
    // Request made to the backend api
    // Send formData object
    // const res = await put({
    //   endpoint: `api/users/upload`,
    //    body: formData,
    //   auth: true,
    // });
    // axios.post("api/uploadfile", formData);
  };

  // if (authUser.accessToken) {
  //   return <Navigate to={RouteEnum.HOME} />;
  // }

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

  const userGrants = async () => {
    const res = await get({
      endpoint: "users/grants",
      // body: formData,
      // auth: false,
    });

    setGrants(res?.data?.data?.grants);

    console.log(res?.data?.data?.grants);
  };
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

    //  setIsRegCompleted(res?.data?.data?.states);

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
    const res = "";

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

      {!open && (
        <div className="md:flex w-full gap-5 mt-8">
          <div className="flex flex-col gap-4 w-full border border-[#F0F6FF] p-4">
            {!isRegCompleted ? (
              <div className="md:w-3/5 ">
                <Typography className="mb-4" variant="h6">
                  {!isRegCompleted ? "One more thing..." : "Getting Started"}
                </Typography>
                <Typography>
                  Proceed by providing the
                  information below to enable you have access to all our
                  features
                </Typography>
              </div>
            ) : (
              <div className="flex items-end mr-3 mt-12">
                <div className="flex gap-4">
                  <Link to={RouteEnum?.GRANT}>
                    <WallCards
                      className="mr-3"
                      rider={false}
                      big={true}
                      name="Total Requests"
                      count={grants?.length}
                    />
                  </Link>
                  {/* <Link to={RouteEnum?.LOAN}>
                    <WallCards
                      rider={false}
                      big={true}
                      name="Total Loans"
                      count={loans?.length}
                    />
                  </Link> */}

                  {/* <Link to={RouteEnum?.SCHOLARSHIPS}>
                    <WallCards
                      rider={false}
                      big={true}
                      name="Total Scholarships"
                      count={scholarships?.length}
                    />
                  </Link> */}
                </div>

                {/* <WallCards name='Total Raiders' count='116,019'/>
          <WallCards name='Rides in progress' count='13'/>
          <WallCards name='Active vehicles' count='8'/>
          <WallCards name='Earnings' count='3,000,000'/> */}
              </div>
            )}
            {/* <Typography>One more thing...</Typography> */}
            {!isRegCompleted ? (
              <Button
                onClick={handleOpen}
                className="bg-primary-main h-10 text-white rounded-sm md:w-2/5"
              >
                Complete application
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
          {!isRegCompleted && (
            <div className="md:w-2/5 bg-primary-main border p-4  text-white">
              <Typography className="font-bold pr-[3%]" variant="h5">
                Get access to unlimited <br /> funds
              </Typography>
              <Typography className="mt-5 pr-[10%]">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad{" "}
              </Typography>
            </div>
          )}
        </div>
      )}
      {open && (
        <div className="md:hidden">
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
            {/* Section 1 */}
            {section == 1 ? (
              <div className="flex flex-col gap-2  items-center text-center p-10">
                <Typography className="text-xs">
                  Upload Gov’t approved ID (Voter’s card, NIN, Int’l Passport,
                  Driver’s License)
                </Typography>
                {!isCorporate && (
                  <div className="w-full">
                    <InputLabel className="text-left mb-2">Id Type</InputLabel>
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

              <div className="flex flex-col gap-2  items-center p-10">
                <Typography className="text-xs text-left text-[#667085">
                  Enter Physical Address
                </Typography>
                <div className="w-full flex flex-col gap-3">
                  <div>
                    <InputLabel className="text-left mb-2">
                      Street Name
                    </InputLabel>
                    <TextField
                      fullWidth
                      name="streetName"
                      value={completeRegFormData?.street_name}
                      // label="Select"
                      onChange={onChange}
                      // helperText="Please select your currency"
                    />
                  </div>
                  <div></div>
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
                </div>
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
                  section > 1
                    ? completeApplication()
                    : setSection((prev) => prev + 1);
                  // handleClose();
                  // redirect();
                }}
                // className=' '
              >
                Next
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
            {/* Section 1 */}
            {section == 1 ? (
              <div className="flex flex-col gap-2  items-center text-center p-10">
                <Typography className="text-xs">
                  {isCorporate
                    ? "Upload CAC Document"
                    : ` Upload Gov’t approved ID (Voter’s card, NIN, Int’l Passport,
                  Driver’s License`}
                </Typography>
                {!isCorporate && (
                  <div className="w-full">
                    <InputLabel className="text-left mb-2">Id Type</InputLabel>
                    <TextField
                      fullWidth
                      id="outlined-select-currency"
                      select
                      name="id_type"
                      // label="Select"
                      onChange={onChange}
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
                    {isCorporate ? "CAC Document" : "Front Of ID"}
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

              <div className="flex flex-col gap-2  items-center p-10">
                <Typography className="text-xs text-left text-[#667085">
                  Enter Physical Address
                </Typography>
                <div className="w-full flex flex-col gap-3">
                  <div>
                    <InputLabel className="text-left mb-2">
                      Street Name
                    </InputLabel>
                    <TextField
                      fullWidth
                      name="street_name"
                      onChange={onChange}
                      // label="Select"
                      value={completeRegFormData?.street_name}

                      // helperText="Please select your currency"
                    />
                  </div>
                  <div>
                    <InputLabel className="text-left mb-2">City</InputLabel>

                    <TextField
                      onChange={onChange}
                      fullWidth
                      name="city"
                      value={completeRegFormData?.city}
                      // label="Select"

                      // helperText="Please select your currency"
                    />
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
                      // label="Select"

                      // helperText="Please select your currency"
                    >
                      {lgas?.map((option) => (
                        <MenuItem key={option?.id} value={option?.id}>
                          {option?.lga}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </div>
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
              >
                Cancel
              </Button>

              <Button
                className="p-3 w-full text-base mb-10 text-white"
                type="submit"
                // disabled
                onClick={() => {
                  section > 1
                    ? completeApplication()
                    : setSection((prev) => prev + 1);
                  // handleClose();
                  // redirect();
                }}
                // className=' '
              >
                Next
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default DashboardInitiator;
