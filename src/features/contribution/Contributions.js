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
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";

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
  Slider,
  Stack,
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
import { get, post } from "services/fetchDocuments";
import moment from "moment";

function Contributions(props) {
  const [section, setSection] = React.useState(2);
  const [imgData, setImgData] = useState(null);
  const [myContributions, setMyContributions] = useState([null]);
  const [currentDetail, setCurrentDetail] = useState([null]);
  const [completed, setCompleted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (val = false) => {
    setOpen(false);
    setCompleted(val);
  };
  const [scholarshipRequestForm, setScholarshipRequestForm] = React.useState({
    attachment: "",
    reason: "",
    amount: "",
    tenure: 1,
  });

  const [value, setValue] = React.useState(0);

  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);

  const history = useNavigate();

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
  const currencies = [
    {
      value: "USD",
      label: "Interest Scholarship",
    },
    {
      value: "EUR",
      label: "Non-interest Scholarship",
    },
    // {
    //   value: "BTC",
    //   label: "Int'l Passport",
    // },
    // {
    //   value: "JPY",
    //   label: "Voters card",
    // },
  ];

  const tableArray = [
    {
      date: "11/03/2023  ",
      reason: "I want to continue my education",
      amount: "250,000",
      status: 2,
      typeOfScholarship: "interest Scholarship",
      Duration: "2 years",
      amountToReturn: "300,000",
    },
    {
      date: "10/03/2023  ",
      reason: "I want to continue my education",
      amount: "250,000",
      status: "",
    },
    {
      date: "09/03/2023  ",
      reason: "I want to continue my education",
      amount: "150,000",
      status: 3,
    },
    {
      date: "08/03/2023  ",
      reason: "I want to continue my education",
      amount: "50,000",
      status: 2,
    },
    {
      date: "07/03/2023  ",
      reason: "I want to continue my education",
      amount: "250,000",
      status: "",
    },
    {
      date: "06/03/2023  ",
      reason: "I want to continue my education",
      amount: "250,000",
      status: 1,
    },
  ];
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

    setScholarshipRequestForm({
      ...scholarshipRequestForm,
      attachment: event.target.files[0],
    });
  };

  const onChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setScholarshipRequestForm({
      ...scholarshipRequestForm,
      [e.target.name]: e.target.value,
    });
  };

  console.log(scholarshipRequestForm);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setScholarshipRequestForm({
      ...scholarshipRequestForm,
      tenure: +newValue,
    });
  };

  useEffect(() => {
    userContributions();
  }, []);

  const userContributions = async () => {
    const res = await get({
      endpoint: "users/contributions",
      // body: formData,
      // auth: false,
    });

    setMyContributions(res?.data?.data?.contributions);
    if (res?.data?.data?.contributions.length == 0) {
      setSection(0);
    }
    console.log(res?.data?.data?.scholarships);
  };
  const applyForScholarship = async () => {
    const formData = new FormData();

    formData.append("reason", scholarshipRequestForm.reason);
    formData.append("amount", scholarshipRequestForm.amount);
    formData.append("attachments[]", scholarshipRequestForm.attachment);
    formData.append("tenure", scholarshipRequestForm.tenure);

    const res = await post({
      endpoint: "users/scholarships/apply",
      body: formData,
      // auth: false,
    });

    if (res.data.success) {
      handleOpen(true);
      userContributions();

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
        <ToDoorSearch />
        <div className="flex justify-between items-center">
          <Typography variant="h5" className="font-bold">
            MY DONATIONS
          </Typography>

          {/* {section == 2 && (
            <Button
              className="font-bold text-base text-white"
              onClick={() => setSection(1)}
            >
              Request For Scholarship
            </Button>
          )} */}
        </div>
      </div>

      <div>
        <div>
          {/* <ToDoorSearch /> */}

          <div className="flex items-end mr-3 mt-12">
            <div>
              <div className="flex gap-4">
                <WallCards
                  className="mr-3"
                  rider={false}
                  big={true}
                  name="Total Donations"
                  count={myContributions?.length}
                />
                <WallCards
                  rider={false}
                  big={true}
                  name="Cash Donations"
                  count={
                    myContributions?.filter((e) => e?.status == "pending")
                      ?.length
                  }
                />
                <WallCards
                  rider={false}
                  big={true}
                  name="In-Kind Donations"
                  count={
                    myContributions?.filter((e) => e?.status == "approved")
                      ?.length
                  }
                />

                <WallCards
                  rider={false}
                  big={true}
                  name="Materials Donations"
                  count={
                    myContributions?.filter((e) => e?.status == "declined")
                      ?.length
                  }
                />
              </div>
            </div>

            {/* <WallCards name='Total Raiders' count='116,019'/>
          <WallCards name='Rides in progress' count='13'/>
          <WallCards name='Active vehicles' count='8'/>
          <WallCards name='Earnings' count='3,000,000'/> */}
          </div>

          <Typography variant="h6" className="font-bold mt-8">
            History
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
            placeholder="Search Scholarships "
          />

          <div className="p-3 md:full min-w-[800px]">
            <div className="flex gap-2">
              <Typography
                variant="h6"
                className="w-1/5 text-center text-[#5C6F7F]"
              >
                Donated To
              </Typography>
              <Typography
                variant="h6"
                className="w-1/5 text-center text-[#5C6F7F]"
              >
                Title
              </Typography>
              <Typography
                variant="h6"
                className="w-1/5 text-center text-[#5C6F7F]"
              >
                Date
              </Typography>
              {/* <Typography variant="h6" className="w-1/5 text-left ">
                  Type Of Scholarships
                </Typography> */}
              <Typography variant="h6" className="w-1/5 text-center ">
                Note
              </Typography>
              <Typography variant="h6" className="w-1/5 text-center ">
                Amount
              </Typography>

              {/* <Typography variant="h6" className="w-1/5 text-left ">
                  Amount To Return
                </Typography> */}

              <Typography variant="h6" className="w-1/5 text-center ">
                Status
              </Typography>
              {/* <Typography variant="h6" className="w-1/5 text-center ">
                Action
              </Typography> */}
            </div>
            {myContributions?.map((e) => (
              <div>
                {/* { props.tableArray.map((e)=> */}
                <div>
                  <div
                    // onClick={openBelow}
                    className=" mt-2 flex gap-2 w-full  min-h-[50%]"
                  >
                    <div
                      className={
                        props?.jj == "loan"
                          ? " text-left p-3 w-2/5 "
                          : " text-center p-3 w-2/5 "
                      }
                    >
                      <Typography variant="">{e?.firstname}</Typography>
                    </div>
                    <div
                      className={
                        props?.jj == "loan"
                          ? " text-left p-3 w-2/5 "
                          : " text-center p-3 w-2/5 "
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
                      <Typography variant="">{e?.note}</Typography>
                    </div>
                    <div
                      className={
                        props?.jj == "loan"
                          ? " text-left p-3 w-2/5 "
                          : " text-center p-3 w-2/5 "
                      }
                    >
                      <Typography variant="">{e?.amount}</Typography>
                    </div>

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
                            e?.status == "approved"
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
                        {e?.status}
                      </Typography>
                    </div>
                    {/* <div
                      className={
                        props?.jj == "loan"
                          ? " text-center p-3 w-2/5  hover:text-primary-main cursor-pointer "
                          : " text-center p-3 w-2/5  hover:text-primary-main cursor-pointer  "
                      }
                    >
                      <Typography
                        onClick={() => {
                          setSection(1);
                          setCurrentDetail(e);
                        }}
                        className="font-bold"
                      >
                        View Details
                      </Typography>
                    </div> */}
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

      <Dialog
        open={open}
        // sx={{ height: "70/px", : "2px solid red" }}
        maxWidth="lg"

        // fullWidth={true}
        // sx={{padding:"40px 0", border:'2px solid red'}}
        // TransitionComponent={Transition}
      >
        {/* <DialogTitle>Add Drug</DialogTitle> */}
        <DialogContent sx={{ width: ismd ? "500px" : "w-full" }}>
          <div className="flex flex-col gap-6 justify-center items-center text-center p-20">
            <img src={educatiaSuccess} />
            <Typography variant="h5">Scholarship Request Successful</Typography>
            <Typography variant="">
              Your request have been sent successfully
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

export default Contributions;
