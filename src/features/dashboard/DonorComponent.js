import React, { useEffect, useState } from "react";
import UserApi from "apis/UserApi";
import { useFormik } from "formik";
import { MdRefresh, MdOutlineSearch, MdSearch, MdUpload } from "react-icons/md";
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
import {
  AccountCircle,
  Cancel,
  CancelOutlined,
  FileCopyOutlined,
} from "@mui/icons-material";
import ToDoorSearch from "common/ToDoorSearch";
import uploadPNG from "images/Educatial_Upload.png";
import educatialGrantPNG from "images/EducatialGrant4x.png";
import ManageCompanyCard from "features/manageCompanies/ManageCompanyCard";
import { post, get } from "services/fetchDocuments";
import { RouteEnum } from "constants/RouteConstants";
import moment from "moment";
import PaymentHook from "./PaymentHook";
// import { get } from "services/fetch";

function DashboardDonor(props) {
  const [section, setSection] = React.useState(0);
  const [show, setshow] = React.useState();
  const [ridersPicture, setRidersPicture] = useState("");
  const [imgData, setImgData] = useState(null);
  const [attachment, setAttachment] = useState(null);

  const [amount, setAmount] = useState("");
  const [grants, setGrants] = useState([]);

  const [displayArray, setdisplayArray] = useState([]);
  const [learnMoreDetails, setLearnMoreDetails] = useState([]);
  const [title, setTitle] = useState("Donation Requests");
  const [firstname, setFirstname] = useState("Donation Requests");

  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);

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
  const [learnMore, setlearnMore] = React.useState(false);
  const [openBigDialog, setOpenBigDialog] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const handleOpenBigDialog = () => {
    setOpenBigDialog(true);
    setAmount();
  };

  const showLearnMore = (e) => {
    setLearnMoreDetails(e);
    setlearnMore(true);
  };
  const handleClose = (val = false) => {
    setOpen(false);
    getUser();
  };

  const handleCloseBigDialog = (val = false) => {
    setOpenBigDialog(false);
    setSection(0);
    setAmount();
  };

  const getUser = async () => {
    const res = await get({
      endpoint: "users/profile",
      // body: formData,
      // auth: false,
    });
  };

  const history = useNavigate();

  const redirect = (route) => {
    history(route);
  };

  const authUser = useAuthUser();

  const { enqueueSnackbar } = useSnackbar();
  const [loginMuation, loginMutationResult] = UserApi.useLoginMutation();

  const onFileChange = (event) => {
    // Update the state
    // setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
    if (event.target.files[0]) {
      console.log("picture: ", event.target.files);
      setAttachment(event.target.files[0]);
      //  setPicture(event.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(event.target.files[0]);
    }
    //  onFileUpload(event.target.files[0]);

    //  setInvestRequestForm({
    //    ...investRequestForm,
    //    attachment: event.target.files[0],
    //  });
  };

  const tableArray = [
    {
      date: "11/03/2023  ",
      details: "I want to continue my education",
      amount: "250,000",
      status: 2,
      typeOfInvest: "interest Invest",
      Duration: "2 years",
      amountToReturn: "300,000",
    },
    {
      date: "10/03/2023  ",
      details: "I want to continue my education",
      amount: "250,000",
      status: "",
    },
    {
      date: "09/03/2023  ",
      details: "I want to continue my education",
      amount: "150,000",
      status: 3,
    },
    {
      date: "08/03/2023  ",
      details: "I want to continue my education",
      amount: "50,000",
      status: 2,
    },
    {
      date: "07/03/2023  ",
      details: "I want to continue my education",
      amount: "250,000",
      status: "",
    },
    {
      date: "06/03/2023  ",
      details: "I want to continue my education",
      amount: "250,000",
      status: 1,
    },
  ];

  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    const res = await get({
      endpoint: "users/profile",
      // body: formData,
      // auth: false,
    });
    console.log(res?.data?.data?.user);
    setFirstname(res?.data?.data?.user.firstname);

    if (res?.data?.data?.user.firstname !== "Technical") getGrants();
  };

  const getGrants = async () => {
    const res = await get({
      endpoint: "requests/display/all",
      // body: formData,
      // auth: false,
    });

    setdisplayArray(res.data.data.requests);
    setGrants(res.data.data.requests);
  };

  const toContribute = async () => {
    const formData = new FormData();

    formData.append("to", title);
    formData.append("contributable_id", learnMoreDetails?.id);
    formData.append("attachments[]", attachment);
    formData.append("amount", amount);
    formData.append("note", "I like you");

    const res = await post({
      endpoint: "users/contributions/make",
      body: formData,
      // auth: false,
    });

    if (res.data.success) {
      //    handleOpen(true);
      // handleClose(true);
    } else {
      console.log(res);
    }
  };

  return (
    <div>
      <div>
        {!learnMore && (
          <div>
            <div className="">
              <div>
                <div className="flex gap-4 w-full border-[#ECEEF7] border-2 rounded-2xl py-6">
                  <div
                    className="w-full"
                    onClick={() => {
                      setdisplayArray(grants);
                      setSection(0);
                      setlearnMore(false);
                    }}
                  >
                    <WallCards
                      className="mr-3"
                      dashed={true}
                      name="Total Requests"
                      count={grants?.length}
                    />
                  </div>

                  {/* <div
                  className="w-full"
                    onClick={() => {
                      setdisplayArray(techReq);
                      setTitle("Donation Requests");
                      setSection(0);
                      setlearnMore(false);
                    }}
                  >
                    <WallCards
                      className="mr-3"
                      rider={false}
                      big={true}
                      name="Expertise Requests"
                      count={techReq?.length}
                    />
                  </div> */}
                </div>
              </div>
              <Typography variant="h6" className="font-bold mt-8">
                Available Requests
              </Typography>

              <Divider className="mb-6 p-1" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {displayArray?.map((e, index) => (
                <div key={index}>
                  <div>
                    <img src={educatialGrantPNG} />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-2 mt-4 items-center">
                      <Avatar className="h-12 w-12" src={educatialGrantPNG} />
                      <div>
                        <Typography className="font-bold text-sm">
                          {e?.title}
                          {/* Grant title to be displayed here for easy caption for
                          Edufunders{" "} */}
                        </Typography>
                        <Typography className="font-bold text-ssm">
                          {e?.applied_by?.company_name ||
                            `${e?.applied_by?.firstname} ${e?.applied_by?.lastname}`}
                        </Typography>
                        <Typography className="font-bold text-ssm">
                          {e?.applied_by?.email}
                        </Typography>
                      </div>
                    </div>
                    {/* <Typography className="font-bold">
                      <span className="text-primary-main text-base">
                        {e?.contributions?.reduce((accumulator, currentValue) => {
                          return accumulator + currentValue?.amount;
                        }, 0)}
                      </span>{" "}
                      of{" "}
                      <span className="text-primary-main text-base">
                        N {e?.amount}
                      </span>{" "}
                      Raised
                    </Typography> */}
                    {/* <Typography className="font-bold text-[#667085]">
                      {e?.reason}
                    </Typography> */}
                    <Button
                      onClick={() => showLearnMore(e)}
                      className="h-12 bg-white text-white font-bold bg-primary-main "
                    >
                      View Details
                    </Button>
                    {/* <Button
                      onClick={() => {
                        setLearnMoreDetails(e);
                        handleOpenBigDialog();
                      }}
                      className="h-12 text-white font-bold"
                    >
                      Donate
                    </Button> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {learnMore && (
          <div>
            <div
              onClick={() => setlearnMore(false)}
              className="flex cursor-pointer gap-3 font-bold items-center"
            >
              <MdArrowBackIosNew className="cursor-pointer" />
              Back
            </div>
            <div className="flex gap-4 mt-8 items-start">
              <Avatar
                className="w-2/5 h-[300px] rounded-lg"
                src={educatialGrantPNG}
              />
              <div className="flex flex-col gap-4 text-left">
                <Button className=" max-w-[200px] font-bold text-white rounded-full">
                  {`${learnMoreDetails?.request_type?.type} Requests`}
                </Button>
                <div className="">
                  <Typography className="font-bold text-base text-left">
                    Title: {learnMoreDetails.title}
                  </Typography>
                  <Typography className="text-[12px]">
                    {learnMoreDetails.reason}
                  </Typography>
                </div>
                {/* <Typography className="font-bold">
                  <span className="text-primary-main text-base">
                    {learnMoreDetails?.contributions?.reduce(
                      (accumulator, currentValue) => {
                        return accumulator + currentValue?.amount;
                      },
                      0
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="text-primary-main text-base">
                    {learnMoreDetails?.amount}
                  </span>{" "}
                  Raised
                </Typography> */}

                <div className="flex gap-3">
                  <div className="border w-full rounded-lg p-3 text-center border-[#667085]">
                    <span className="font-bold">
                      {learnMoreDetails?.donations?.length}
                    </span>
                    <br /> <span className="text-[#667085]"> Donors</span>
                  </div>
                  <div className="border w-full rounded-lg p-3 text-center border-[#667085]">
                    <span className="font-bold">25 %</span> <br />{" "}
                    <span className="text-[#667085]">Funded</span>
                  </div>
                  <div className="border w-full rounded-lg p-3 text-center border-[#667085]">
                    <span className="font-bold">20</span> <br />{" "}
                    <span className="text-[#667085]">Days Left</span>
                  </div>
                </div>

                <div>
                  <Typography className="font-bold">About the NGO</Typography>
                  <Typography className="text-[12px] w-2/3">
                    {learnMoreDetails?.applied_by?.about}
                  </Typography>
                </div>
                <Typography className="font-bold mt-8">
                  Previous Projects
                </Typography>
                {firstname == "Technical" && learnMoreDetails?.milestones}

                {firstname !== "Technical" &&
                  learnMoreDetails?.applied_by?.city
                    ?.split(/\n/)
                    .map((line, index) => {
                      return (
                        <div key={index}>
                          {line}
                          <br />
                        </div>
                      );
                    })}
                {/* <div className="flex gap-4 ">
                  <Avatar src="" />
                  <div className="">
                    <div>
                      <Typography className="text-xs font-bold">
                        {learnMoreDetails?.applied_by?.firstname}{" "}
                        {learnMoreDetails?.applied_by?.lastname}
                      </Typography>
                      <Typography className="text-xs">
                        {learnMoreDetails?.applied_by?.email}
                      </Typography>
                    </div>

                    <a
                      className="hover:text-primary-main mt-3"
                      href={learnMoreDetails?.attachments[0]?.url}
                      target="_blank"
                    >
                      View Attached Documents
                    </a>
                  </div>
                </div> */}
                <div className="mb-5">
                  <input
                    onChange={onFileChange}
                    style={{ display: "none" }}
                    id="contained-button-file"
                    type="file"
                  />
                  <label
                    htmlFor="contained-button-file"
                    className="cursor-pointer"
                  >
                    <div className="text-black flex items-center justify-center bg-yellow-200 py-3 rounded-full w-2/3 text-center ">
                      {" "}
                      <MdUpload className="text-2xl" />{" "}
                      <Typography>Upload Relevant Documents</Typography>
                    </div>
                  </label>
                  {imgData && (
                    <div className="relative w-full mt-1">
                      <div className="flex justify-center w-full items-center">
                        <div class="flex gap-3 w-full items-center ">
                          <FileCopyOutlined />
                          <Typography>{attachment?.name}</Typography>
                        </div>
                        <CancelOutlined className=" text-red-600 cursor-pointer" />
                      </div>
                      {/* <Avatar
                      className="w-32 h-32 border border-blue-300"
                      src={imgData}
                    />

                    <div
                      onClick={() => setImgData("")}
                      className="p-1 bg-red-500 absolute w-4 h-4 flex justify-center hover:cursor-pointer items-center top-0 left-32 text-white rounded-full"
                    >
                      x
                    </div> */}
                    </div>
                  )}
                </div>

                {firstname !== "Technical" ? (
                  <div className="flex gap-4 items-end">
                    <div>
                      <InputLabel className="text-left  mb-2">
                        Enter Amount to Donate
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
                        name="amount"
                        value={amount}
                        onChange={(e) => {
                          const regex = /^[0-9\b]+$/;
                          if (
                            e.target.value === "" ||
                            regex.test(e.target.value)
                          ) {
                            setAmount(e.target.value);
                            // setNum(e.target.value);
                          }
                        }}
                      />
                    </div>
                    <Button
                      disabled={amount?.trim() == ""}
                      onClick={handleOpen}
                      className="font-bold w-1/2 h-12 text-white"
                    >
                      Continue
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-4 items-end">
                    <Button
                      disabled={amount?.trim() == ""}
                      onClick={handleOpen}
                      className="font-bold w-1/2 h-12 text-white"
                    >
                      Accept
                    </Button>
                    <Button
                      disabled={amount?.trim() == ""}
                      onClick={handleOpen}
                      className="font-bold w-1/2 h-12 text-white"
                    >
                      Decline
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <Dialog
          open={open}
          // sx={{ height: "70/px", border: "2px solid red" }}
          maxWidth={"sm"}
          fullWidth={true}
          // sx={{padding:"40px 0", border:'2px solid red'}}
          // TransitionComponent={Transition}
        >
          <DialogTitle>
            <div className="flex justify-between items-center">
              <div className="flex justify-center gap-8 items-center">
                <MdArrowBackIosNew
                  className="cursor-pointer"
                  onClick={() =>
                    setSection((prev) => (prev > 1 ? prev - 1 : prev))
                  }
                />
                <Typography className="font-bold text-center" variant="h6">
                  Confirm Donation
                </Typography>
              </div>

              <MdCancel className="cursor-pointer" onClick={handleClose} />
            </div>
          </DialogTitle>
          <DialogContent className="flex justify-center text-center">
            <div className="flex flex-col gap-3">
              <Typography className="text-[#667085]">
                You are about to donate{" "}
              </Typography>
              <Typography className="font-bold text-3xl">
                {" "}
                &#8358; {amount} to{" "}
                {learnMoreDetails?.applied_by?.company_name ||
                  `${learnMoreDetails.applied_by?.firstname} ${learnMoreDetails.applied_by?.lastname}`}
              </Typography>
              <Typography>for</Typography>
              <Typography className="font-bold text-base">
                {learnMoreDetails?.title}
              </Typography>
            </div>
          </DialogContent>
          <DialogActions>
            <div className="flex gap-5 w-full items-center mb-10">
              <Button
                className="p-3 w-full  bg-none text-base bg-white border border-gray-400 text-black"
                type="submit"
                onClick={() => {
                  handleClose();
                  // redirect();
                }}
              >
                Cancel
              </Button>

              {/* <Button
                className="p-3 w-full text-base mb-10 text-white"
                type="submit"
                // disabled
                onClick={() => {
                  toContribute(amount);
                  //   section > 1
                  //     ? completeApplication()
                  //     : setSection((prev) => prev + 1);
                  // handleClose();
                  //   // redirect();
                }}
                // className=' '
              >
                Yes, Continue
              </Button> */}
              <PaymentHook
                details={learnMoreDetails}
                fee={amount}
                attachment={attachment}
              />
            </div>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openBigDialog}
          // sx={{ height: "70/px", border: "2px solid red" }}
          maxWidth={section == 1 ? "sm" : "lg"}
          fullWidth={true}
          // sx={{padding:"40px 0", border:'2px solid red'}}
          // TransitionComponent={Transition}
        >
          <DialogTitle>
            <div className="flex justify-between items-center">
              <div className="flex justify-center gap-8 items-center">
                <MdArrowBackIosNew
                  className="cursor-pointer"
                  onClick={() =>
                    setSection((prev) => (prev > 0 ? prev - 1 : prev))
                  }
                />
                <Typography className="font-bold text-center" variant="h6">
                  Confirm Donation
                </Typography>
              </div>

              <MdCancel
                className="cursor-pointer"
                onClick={handleCloseBigDialog}
              />
            </div>
          </DialogTitle>
        </Dialog>
      </div>
    </div>
  );
}

export default DashboardDonor;
