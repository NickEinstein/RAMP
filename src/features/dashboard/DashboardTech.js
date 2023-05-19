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
import { AccountCircle } from "@mui/icons-material";
import ToDoorSearch from "common/ToDoorSearch";
import uploadPNG from "images/Educatial_Upload.png";
import educatialGrantPNG from "images/EducatialGrant4x.png";
import educatialGrantPNG2 from "images/newBoss.jpg";

import ManageCompanyCard from "features/manageCompanies/ManageCompanyCard";
import { post, get } from "services/fetchDocuments";
import { RouteEnum } from "constants/RouteConstants";
import moment from "moment";
// import { get } from "services/fetch";

function DashboardTech(props) {
  const [age, setAge] = React.useState("");
  const [section, setSection] = React.useState(0);
  const [show, setshow] = React.useState();
  const [ridersPicture, setRidersPicture] = useState("");
  const [imgData, setImgData] = useState(null);
  const [attachment, setAttachment] = useState(null);
  const [ridersPictureName, setRidersPictureName] = useState("");
  const [states, setStates] = useState([]);
  const [idTypes, setIdTypes] = useState([]);
  const [lgas, setLgas] = useState([]);
  const [amount, setAmount] = useState("");
  const [grants, setGrants] = useState([]);
  const [loans, setLoans] = useState([]);
  const [scholoarships, setScholoarships] = useState([]);
  const [eduInvests, setEduInvests] = useState([]);
  const [displayArray, setdisplayArray] = useState([]);
  const [learnMoreDetails, setLearnMoreDetails] = useState([]);
  const [title, setTitle] = useState("Donation Requests");
  const [firstname, setFirstname] = useState("Donation Requests");
  const [techReq, setReq] = useState([
    {
      id: 14,
      tech: true,
      about:
        "We are a world class group dedicated to growing our brand and becoming the best possible group we can be",
      milestones: "1. We have a functional website",
      applied_by: {
        imgg: educatialGrantPNG2,
        id: 14,
        firstname: "Iyodo",
        lastname: "Nick",
        account_type: "corporate",
        company_name: "Save the girl child initiative",
        company_reg_number: "null",
        company_type: "alumni",
        cac_document:
          "https://api.educatial.com/public/storage/uploads/Disn7RLYNF493PYhz4C5IeejLYld6q7j4albUT7L.png",
        phone: "+2348093355343",
        email: "rampngo1@qa.team",
        email_verified_at: "2023-04-13T13:33:19.000000Z",
        avatar: null,
        status: "active",
        id_front: null,
        id_back: null,
        i_d_type_id: null,
        street_name: null,
        state_id: 1,
        lga_id: 1,
        city: "1. Grwoth of school\r\n\r\n- Grew a school from zero to 100",
        deleted_at: null,
        created_at: "2023-04-13T13:33:00.000000Z",
        updated_at: "2023-04-13T13:48:59.000000Z",
      },
      amount: 0,
      reason: "I'm building multiple websites for different uses",
      status: "open",
      deleted_at: null,
      created_at: "2023-04-28T05:32:54.000000Z",
      updated_at: "2023-04-28T06:00:33.000000Z",
      title: "A need for Web Developement team",
      attachments: [
        {
          id: 14,
          attachable_id: 14,
          attachable_type: "App\\Models\\Grant",
          url: "https://api.educatial.com/public/storage/uploads/M0eZh0xWAfsX0ckGVjEKLYGWjgntGSTJ5u44FZnr.png",
          deleted_at: null,
          created_at: "2023-04-28T05:32:54.000000Z",
          updated_at: "2023-04-28T05:32:54.000000Z",
        },
      ],
      contributions: [],
    },
    {
      id: 14,
      tech: true,
      milestones: "None Yet",

      about:
        "We are a world class group dedicated to growing our brand and becoming the best possible group we can be",

      applied_by: {
        imgg: educatialGrantPNG,
        id: 14,
        firstname: "Iyodo",
        lastname: "Nick",
        account_type: "corporate",
        company_name: "The environment Initiative",
        company_reg_number: "null",
        company_type: "alumni",
        cac_document:
          "https://api.educatial.com/public/storage/uploads/Disn7RLYNF493PYhz4C5IeejLYld6q7j4albUT7L.png",
        phone: "+2348093355343",
        email: "rampngo2@qa.team",
        email_verified_at: "2023-04-13T13:33:19.000000Z",
        avatar: null,
        status: "active",
        id_front: null,
        id_back: null,
        i_d_type_id: null,
        street_name: null,
        state_id: 1,
        lga_id: 1,
        city: "1. Grwoth of school\r\n\r\n- Grew a school from zero to 100",
        deleted_at: null,
        created_at: "2023-04-13T13:33:00.000000Z",
        updated_at: "2023-04-13T13:48:59.000000Z",
      },
      amount: 0,
      reason:
        "I'm building a brand and need someone to take our image to the next level",
      status: "open",
      deleted_at: null,
      created_at: "2023-04-28T05:32:54.000000Z",
      updated_at: "2023-04-28T06:00:33.000000Z",
      title: "A need for Content Writer",
      attachments: [
        {
          id: 14,
          attachable_id: 14,
          attachable_type: "App\\Models\\Grant",
          url: "https://api.educatial.com/public/storage/uploads/M0eZh0xWAfsX0ckGVjEKLYGWjgntGSTJ5u44FZnr.png",
          deleted_at: null,
          created_at: "2023-04-28T05:32:54.000000Z",
          updated_at: "2023-04-28T05:32:54.000000Z",
        },
      ],
      contributions: [],
    },
    {
      id: 14,
      about:
        "We are a world class group dedicated to growing our brand and becoming the best possible group we can be",

      tech: true,
      milestones: "1. We have reached out to likely investors",

      applied_by: {
        imgg: educatialGrantPNG2,
        id: 14,

        firstname: "Iyodo",
        lastname: "Nick",
        account_type: "corporate",
        company_name: "Feed one save all initiative",
        company_reg_number: "null",
        company_type: "alumni",
        cac_document:
          "https://api.educatial.com/public/storage/uploads/Disn7RLYNF493PYhz4C5IeejLYld6q7j4albUT7L.png",
        phone: "+2348093355343",
        email: "rampngo3@qa.team",
        email_verified_at: "2023-04-13T13:33:19.000000Z",
        avatar: null,
        status: "active",
        id_front: null,
        id_back: null,
        i_d_type_id: null,
        street_name: null,
        state_id: 1,
        lga_id: 1,
        city: "1. Grwoth of school\r\n\r\n- Grew a school from zero to 100",
        deleted_at: null,
        created_at: "2023-04-13T13:33:00.000000Z",
        updated_at: "2023-04-13T13:48:59.000000Z",
      },
      amount: 0,
      reason:
        "I'm need someone to help coordinate my young team on this new project",
      status: "open",
      deleted_at: null,
      created_at: "2023-04-28T05:32:54.000000Z",
      updated_at: "2023-04-28T06:00:33.000000Z",
      title: "A need for Project Manager",
      attachments: [
        {
          id: 14,
          attachable_id: 14,
          attachable_type: "App\\Models\\Grant",
          url: "https://api.educatial.com/public/storage/uploads/M0eZh0xWAfsX0ckGVjEKLYGWjgntGSTJ5u44FZnr.png",
          deleted_at: null,
          created_at: "2023-04-28T05:32:54.000000Z",
          updated_at: "2023-04-28T05:32:54.000000Z",
        },
      ],
      contributions: [],
    },
  ]);

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
    // setCompleted()
    getUser();
  };

  const handleCloseBigDialog = (val = false) => {
    setOpenBigDialog(false);
    setSection(0);
    setAmount();
    // setCompleted()
  };

  const getUser = async () => {
    const res = await get({
      endpoint: "users/profile",
      // body: formData,
      // auth: false,
    });

    //  setIsRegCompleted(res?.data?.data?.states);
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
    // getLoans();
    // getScholarships();
    // getEduInvests();
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

    // setLoans(res.data.data.loans);

    //  setIsRegCompleted(res?.data?.data?.states);
  };
  const getLoans = async () => {
    const res = await get({
      endpoint: "users/loans/display",
      // body: formData,
      // auth: false,
    });
    setLoans(res.data.data.loans);

    //  setIsRegCompleted(res?.data?.data?.states);
  };
  const getEduInvests = async () => {
    const res = await get({
      endpoint: "users/eduinvests/display",
      // body: formData,
      // auth: false,
    });
    setEduInvests(res.data.data.eduInvests);
    console.log(res.data.data.eduInvests);

    //  setIsRegCompleted(res?.data?.data?.states);
  };
  const getScholarships = async () => {
    const res = await get({
      endpoint: "users/scholarships/display",
      // body: formData,
      // auth: false,
    });
    setScholoarships(res.data.data.scholarships);

    //  setIsRegCompleted(res?.data?.data?.states);
  };

  const getGrants = async () => {
    const res = await get({
      endpoint: "users/grants/display",
      // body: formData,
      // auth: false,
    });

    !firstname == "Technical" && setGrants(res.data.data.grants);
    // setdisplayArray(res.data.data.grants);

    //  setIsRegCompleted(res?.data?.data?.states);
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
      //    userLoan();
      // handleClose(true);
    } else {
      console.log(res);
    }
  };

  return (
    <div>
      <div className="">
        {/* <span className="text-xs mr-1 opacity-50">
          <MdRefresh />
        </span> */}
        {/* Tech */}
        <ToDoorSearch />
        {/* <Typography variant="h5" className="font-bold">
          Welcome {      `${localStorage.getItem("firstname")} 
      ${localStorage.getItem("lastname")}`
} (Donor)
        </Typography> */}
      </div>

      <div>
        {!learnMore && (
          <div>
            <div className="">
              <div>
                <div className="flex gap-4">
                  {!firstname == "Technical" && (
                    <div
                      onClick={() => {
                        setdisplayArray(grants);
                        setTitle("Donation Requests");
                        setSection(0);
                        setlearnMore(false);
                      }}
                    >
                      <WallCards
                        className="mr-3"
                        rider={false}
                        big={true}
                        name="Total Requests"
                        count={grants?.length}
                      />
                    </div>
                  )}

                  <div
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
                      name="Requests For Expertise"
                      count={techReq?.length}
                    />
                  </div>
                </div>
              </div>
              <Typography variant="h6" className="font-bold mt-8">
                Available Requests
              </Typography>

              {/* <TextField
                onChange={(e) => {
                  const filteredCompanies = techReq?.filter((company) =>
                    company?.applied_by?.company_name
                      ?.toLowerCase()
                      ?.includes(e.target.value.toLowerCase())
                  );

                  console.log(filteredCompanies);
                  setdisplayArray(filteredCompanies);
                }}
                placeholder="search requests"
              /> */}

              <Divider className="mb-6 p-1" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {techReq?.map((e, index) => (
                <div key={index}>
                  <div>
                    <img
                      className="h-[200px] w-full"
                      src={e?.applied_by?.imgg}
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-2 mt-4 items-center">
                      <Avatar className="h-12 w-12" src={e?.applied_by?.imgg} />
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
                src={learnMoreDetails?.applied_by?.imgg}
              />
              <div className="flex flex-col gap-4 text-left">
                <Button className=" max-w-[200px] font-bold text-white rounded-full">
                  {title}
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
                  {firstname !== "Technical" && (
                    <Card className="border rounded-lg p-3 px-8 text-center border-[#667085]">
                      <span className="font-bold">20</span>
                      <br /> <span className=""> Donors</span>
                    </Card>
                  )}
                  {firstname !== "Technical" && (
                    <Card className="border rounded-lg p-3 px-8 text-center border-[#667085]">
                      <span className="font-bold">25%</span> <br />{" "}
                      <span className="">Funded</span>
                    </Card>
                  )}
                  <Card className="border rounded-lg p-3 px-8 text-center border-[#667085]">
                    <span className="font-bold">20</span> <br />{" "}
                    <span className="">
                      {firstname !== "Technical"
                        ? "Days Left"
                        : "Days Duration"}
                    </span>
                  </Card>
                </div>
                <Typography className="font-bold">About the NGO</Typography>
                <Typography className="text-[12px] w-2/3">
                  {learnMoreDetails?.about}
                </Typography>
                <Typography className="font-bold mt-8">Milestones</Typography>
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
                {/* <div>
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
                    <div className="text-black flex items-center justify-center gap-2 bg-yellow-200 mb-5 py-3 rounded-full w-2/3 text-center ">
                      {" "}
                      <MdUpload className="text-2xl" />{" "}
                      <Typography>Upload Relevant Documents</Typography>
                    </div>
                  </label>
                </div> */}

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
            <div className="flex gap-5 w-full">
              <Button
                className="p-3 w-full bg-none text-base mb-10 bg-white border border-gray-400 text-black"
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
              </Button>
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
          <DialogContent className="flex justify-center text-center">
            {section == 0 && (
              <div className="flex gap-4 mt-8">
                <img
                  className="w-2/5"
                  src={learnMoreDetails?.applied_by?.imgg}
                />
                <div className="flex flex-col gap-3 text-left">
                  <Button className="rounded-none max-w-[104px] font-bold text-white">
                    {title}
                  </Button>
                  <div className="">
                    <Typography className="font-bold text-base text-left">
                      Title: {learnMoreDetails.reason}
                    </Typography>
                    <Typography className="text-[12px]">
                      Reasons for grants will be displayed in with about few
                      with about 200 words as an excerpt
                    </Typography>
                  </div>

                  <Typography className="font-bold">
                    <span className="text-primary-main text-base">0</span> of{" "}
                    <span className="text-primary-main text-base">
                      {learnMoreDetails?.amount}
                    </span>{" "}
                    Raised
                  </Typography>

                  <Typography className="font-bold text-[#667085]">
                    {learnMoreDetails?.reason}
                  </Typography>

                  <div className="flex gap-3">
                    <div className="border p-3 text-center border-[#667085]">
                      <span className="font-bold">20</span>
                      <br /> <span className="text-[#667085]"> Donors</span>
                    </div>
                    <div className="border p-3 text-center border-[#667085]">
                      <span className="font-bold">25%</span> <br />{" "}
                      <span className="text-[#667085]">Funded</span>
                    </div>
                    <div className="border p-3 text-center border-[#667085]">
                      <span className="font-bold">20</span> <br />{" "}
                      <span className="text-[#667085]">Days Left</span>
                    </div>
                  </div>

                  <Typography className="font-bold">
                    About the Eduinitiatior
                  </Typography>

                  <div className="flex gap-4">
                    <Avatar src="" />
                    <div class="flex">
                      <div>
                        <Typography className="text-xs font-bold">
                          {learnMoreDetails?.applied_by?.firstname}{" "}
                          {learnMoreDetails?.applied_by?.lastname}
                        </Typography>
                        <Typography className="text-xs">
                          {learnMoreDetails?.applied_by?.email}
                        </Typography>
                      </div>

                      <Typography>View Documents</Typography>
                    </div>
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

                  <div className="flex gap-4 items-end">
                    <div>
                      {/* <InputLabel className="text-left  mb-2">
                        Enter Amount
                      </InputLabel> */}
                      <TextField
                        placeholder="Enter Amount"
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
                        value={amount}
                      />
                    </div>
                    <Button
                      disabled={amount?.trim() == ""}
                      onClick={() => {
                        setSection((prev) => prev + 1);
                      }}
                      className="font-bold w-1/2 h-12 text-white"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {section == 1 && (
              <div className="flex flex-col gap-3">
                <Typography className="text-[#667085]">
                  You are about to donate{" "}
                </Typography>
                <Typography className="font-bold text-3xl">
                  {" "}
                  &#8358; {amount}
                </Typography>
                <Typography>for</Typography>
                <Typography className="font-bold text-base">
                  School Grant
                </Typography>
                <div className="flex gap-5 w-full">
                  <Button
                    className="p-3 w-full min-w-[144px] bg-none text-base mb-10 bg-white border border-gray-400 text-black"
                    type="submit"
                    onClick={() => {
                      handleCloseBigDialog();
                      // redirect();
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    className="p-3 w-full text-base min-w-[160px] mb-10 text-white"
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
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default DashboardTech;
