import React, { useEffect, useState } from "react";
import UserApi from "apis/UserApi";
import educatiaSuccess from "images/EducatiaSuccess.png";
import gigLogo from "images/EducatiaSuccess.png";
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

import { Navigate } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";
import LoginHeader from "common/LoginHeader";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import toDoorLogo from "images/Ellipse 30.png";
import background from "images/background.png";

// import { RouteEnum } from "constants/RouteConstants";
// import ReactDOM from 'react-dom';
// import trustedBy1 from './images/Vector.png'
import trustedBy2 from "images/Rectangle 7.png";
import trustedBy3 from "images/Rectangle 106.png";
// import LoginHeader from './LoginHeader';
// import trustedBy3 from './images/trustedBy-3.png'
// import trustedBy4 from './images/trustedBy-4.png'
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
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import WallCards from "common/WallCards";
import { AccountCircle } from "@mui/icons-material";
import ToDoorSearch from "common/ToDoorSearch";
import uploadPNG from "images/Educatial_Upload.png";
import ManageCompanyCard from "features/manageCompanies/ManageCompanyCard";
import ManageCompaniesTable from "features/manageCompanies/ManageCompaniesTable";
import { MediaQueryBreakpointEnum } from "constants/Global";
import { get, post } from "services/fetch";

function Grant(props) {
  const [age, setAge] = React.useState("");
  const [section, setSection] = React.useState(2);
  const [show, setshow] = React.useState();
  const handleChange = (event) => {
    setAge(event.target.value);
    console.log(event);
  };
  const [imgData, setImgData] = useState(null);
  const [myGrantApplication, setMyGrantApplications] = useState([null]);
  const [currentDetail, setCurrentDetail] = useState([null]);
  const [completed, setCompleted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (val = false) => {
    setOpen(false);
    setCompleted(val);
  };

  const [requestGrantForm, setrequestGrantForm] = React.useState({
    attachment: "",
    reason: "",
    amount: "",
  });

  const history = useNavigate();
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);

  const redirect = () => {
    history("/complete-signUp");
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
    //  onFileUpload(event.target.files[0]);

    setrequestGrantForm({
      ...requestGrantForm,
      attachment: event.target.files[0],
    });
  };

  const onChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setrequestGrantForm({
      ...requestGrantForm,
      [e.target.name]: e.target.value,
    });
  };

  console.log(requestGrantForm);

  useEffect(() => {
    userGrant();
  }, []);
  useEffect(() => {
    setCurrentDetail([section]);
  });

  const userGrant = async () => {
    const res = await get({
      endpoint: "users/grants",
      // body: formData,
      // auth: false,
    });

    setMyGrantApplications(res?.data?.data?.grants);
    if (res?.data?.data?.grants.length == 0) {
      setSection(0);
    }
    console.log(res?.data?.data?.grants);
  };

  const applyForGrant = async () => {
    const formData = new FormData();

    formData.append("reason", requestGrantForm.reason);
    formData.append("title", requestGrantForm.title);
    formData.append("amount", requestGrantForm.amount);
    formData.append("attachments[]", requestGrantForm.attachment);

    const res = await post({
      endpoint: "users/grants/apply",
      body: formData,
      // auth: false,
    });

    if (res.data.success) {
      handleOpen(true);
      userGrant();

      // handleClose(true);
    } else {
      console.log(res);
    }
  };

  console.log(currentDetail);

  return (
    <div>
      <div className="">
        {/* <span className="text-xs mr-1 opacity-50">
          <MdRefresh />
        </span> */}
        <ToDoorSearch />
        <div className="flex justify-between items-center mt-12">
          <Typography variant="h4" className="font-bold">
            GRANT
          </Typography>

          {section == 2 && (
            <Button
              className="font-bold text-base text-white"
              onClick={() => setSection(1)}
            >
              Request For Grant
            </Button>
          )}
        </div>
      </div>

      {section == 0 && (
        <div className="md:flex w-full gap-5 mt-8">
          <div className="flex flex-col gap-4 md:w-3/5 border border-[#F0F6FF] p-4">
            {!completed ? (
              <div>
                <Typography className="mb-4" variant="h6">
                  Grant - How it works
                  {/* {!completed ? "One more thing..." : "Getting Started"} */}
                </Typography>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                  nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                  aliquip ex ea
                </Typography>
              </div>
            ) : (
              <div>You have Successfully completed your Application</div>
            )}
            {/* <Typography>One more thing...</Typography> */}

            <Button
              onClick={() => setSection((prev) => prev + 1)}
              className="bg-primary-main h-10 text-white rounded-sm w-2/5"
            >
              Request Grant
            </Button>
          </div>
          <div className="md:w-2/5 bg-primary-main border p-4  text-white">
            <Typography className="font-bold pr-[3%]" variant="h5">
              Get access to unlimited <br /> funds
            </Typography>
            <Typography className="mt-5 pr-[10%]">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad{" "}
            </Typography>
          </div>
        </div>
      )}

      {section == 1 && (
        <div className="flex gap-8">
          <div className="md:w-3/5 w-full">
            {section == 1 && (
              <div className="flex flex-col gap-2 p-10">
                <Typography variant="h6" className="font-bold">
                  Request Grant
                </Typography>
                <Typography variant="" className="text-xs">
                  Make Request
                </Typography>
                <Divider className="mb-4" />
                <div className="w-full flex flex-col gap-3">
                  <div>
                    <InputLabel className="text-left mb-2">Title</InputLabel>
                    <TextField
                      // disabled
                      value={currentDetail?.title}
                      onChange={onChange}
                      fullWidth
                      name="title"
                    />
                  </div>
                  <div>
                    <InputLabel className="text-left mb-2">Amount</InputLabel>
                    <TextField
                      // disabled
                      value={currentDetail?.amount}
                      onChange={onChange}
                      fullWidth
                      name="amount"
                    />
                  </div>
                  <div>
                    <InputLabel className="text-left mb-2">
                      Reasons (Not more than 600 words)
                    </InputLabel>
                    <TextField
                      name="reason"
                      onChange={onChange}
                      fullWidth
                      multiline
                      rows={6}
                      value={currentDetail.reason}
                      // disabled
                    />
                  </div>
                  {/* <div>
                    <InputLabel className="text-left mb-2">
                      Supporting Documents
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="outlined-select-currency"
                      select
                      onChange={onChange}
                      // label="Select"
                      defaultValue=""
                      // helperText="Please select your currency"
                    >
                      {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div> */}

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
              </div>
            )}
            <div className="flex gap-5 w-full">
              <Button
                className="p-3 w-full bg-none text-base mb-10 text-white"
                type="submit"
                onClick={() => {
                  handleClose();
                  // redirect();
                }}
                // disabled={currentDetail}

                // className=' '
              >
                Cancel
              </Button>

              <Button
                className="p-3 w-full text-base mb-10 text-white"
                type="submit"
                // disabled={currentDetail}
                onClick={() => {
                  applyForGrant();
                  //   : setSection((prev) => prev + 1);
                  // handleClose();
                  // redirect();
                }}
                // className=' '
              >
                Submit
              </Button>
            </div>
          </div>
          <div className="md:w-2/5 p-4 hidden md:flex flex-col gap-4 text-black bg-[#F0F6FF]">
            <div className="flex flex-col gap-2 ">
              <Typography className="text-xs font-bold">About Grant</Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                aliquip ex ea
              </Typography>
            </div>

            <div className="flex flex-col gap-2 ">
              <Typography className="text-xs font-bold">Reasons</Typography>
              <Typography>
                States reasons for grant. Not more than 600words
              </Typography>
            </div>

            <div className="flex flex-col gap-2">
              <Typography className="text-xs font-bold">Amount</Typography>
              <Typography>Specify the amount needed for Loan</Typography>
            </div>

            <div className="flex flex-col gap-2">
              <Typography className="text-xs font-bold">
                Supporting Document
              </Typography>
              <Typography>
                Providing supporting document in various media boots your chance
                of getting donors.
              </Typography>
            </div>
          </div>
        </div>
      )}

      <div>
        {section > 1 && (
          <div>
            {/* <ToDoorSearch /> */}

            <div className="flex items-end mr-3 mt-12">
              <div>
                <div className="flex gap-4">
                  <WallCards
                    className="mr-3"
                    rider={false}
                    big={true}
                    name="Total Grants"
                    count={myGrantApplication?.length}
                  />
                  <WallCards
                    rider={false}
                    big={true}
                    name="Pending"
                    count={
                      myGrantApplication?.filter((e) => e?.status == "pending")
                        ?.length
                    }
                  />
                  <WallCards
                    rider={false}
                    big={true}
                    name="Approved"
                    count={
                      myGrantApplication?.filter((e) => e?.status == "open")
                        ?.length
                    }
                  />
                  <WallCards
                    rider={false}
                    big={true}
                    name="FUnded"
                    count={
                      myGrantApplication?.filter((e) => e?.status == "approved")
                        ?.length
                    }
                  />

                  <WallCards
                    rider={false}
                    big={true}
                    name="Declined"
                    count={
                      myGrantApplication?.filter((e) => e?.status == "delined")
                        ?.length
                    }
                  />
                </div>
              </div>
            </div>

            <Typography variant="h6" className="font-bold mt-8">
              Grant History
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
              placeholder="Search Grant "
            />

            <div className="py-3 w-[800px] md:w-full">
              <div className="flex gap-2 w-full">
                <Typography
                  variant="h6"
                  className="w-1/5 text-center text-[#5C6F7F]"
                >
                  Date
                </Typography>
                <Typography variant="h6" className="w-1/5 text-center">
                  Reasons
                </Typography>
                <Typography variant="h6" className="w-1/5 text-center">
                  Amount
                </Typography>
                <Typography variant="h6" className="w-1/5 text-center">
                  Status
                </Typography>
                <Typography variant="h6" className="w-1/5 text-center">
                  Action
                </Typography>
              </div>
              <div className="overflow-x-scroll w-full">
                {myGrantApplication?.map((e) => (
                  <ManageCompaniesTable
                    tableArray={e}
                    setSection={setSection}
                    setCurrentDetail={setCurrentDetail}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
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
              Your request for Grant was successful
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
  );
}

export default Grant;
