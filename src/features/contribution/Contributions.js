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
  Box,
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
  Modal,
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
  const [opens, setOpens] = React.useState(false);
  const [currentDetail, setCurrentDetail] = useState();
  const [user, setUser] = React.useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

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
  const handleClickOpen = () => {
    setOpens(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    minHeight: "520px",
    bgcolor: "background.paper",
    borderRadius: "3%",
    boxShadow: 24,
    p: 4,
  };

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
      endpoint: "donations",
      // body: formData,
      // auth: false,
    });

    setMyContributions(res?.data?.data?.donations);
    if (res?.data?.data?.contributions?.length == 0) {
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
            ANALYTICS
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

          <div className="flex items-end mt-12 w-full">
            <div className="w-full">
              <div className="flex gap-4 w-full border-[#ECEEF7] border-2 rounded-2xl py-6">
                <WallCards
                  className="mr-3"
                  rider={false}
                  // big={true}
                  name="Total Donations"
                  count={myContributions?.length}
                />
                <WallCards
                  rider={false}
                  // big={true}
                  name="Cash Donations"
                  count={
                    myContributions?.filter((e) => e?.status == "pending")
                      ?.length
                  }
                />
                <WallCards
                  rider={false}
                  // big={true}
                  name="In-Kind Donations"
                  count={
                    myContributions?.filter((e) => e?.status == "approved")
                      ?.length
                  }
                />

                <WallCards
                  dashed={true}
                  // big={true}
                  name="Expertise Dispensed"
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
          <div className="flex gap-2">
            <Typography variant="h6" className="w-1/5 text-left text-[#5C6F7F]">
              Recipient
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
            <Typography variant="h6" className="w-2/5 text-center ">
              Donation Type
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
            <Typography variant="h6" className="w-1/5 text-center ">
              Action
            </Typography>
          </div>

          <Divider className="mb-6 p-1" />

          <div className="p-3 md:full min-w-[800px]">
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
                          : " text-left p-3 w-2/5 "
                      }
                    >
                      <Typography variant="">
                        {e?.request?.applied_by?.lastname}{" "}
                        {e?.request?.applied_by?.firstname}
                      </Typography>
                    </div>
                    <div
                      className={
                        props?.jj == "loan"
                          ? " text-left p-3 w-2/5 "
                          : " text-center p-3 w-2/5 "
                      }
                    >
                      <Typography variant="">{e?.request?.title}</Typography>
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
                          ? " text-left p-3 w-4/5 "
                          : " text-center p-3 w-4/5 "
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
                    <div
                      className={
                        props?.jj == "loan"
                          ? " text-center p-3 w-2/5  hover:text-primary-main cursor-pointer "
                          : " text-center p-3 w-2/5  hover:text-primary-main cursor-pointer  "
                      }
                    >
                      <Typography
                        onClick={() => {
                          setSection(1);
                          setUser(e?.request?.applied_by);
                          setCurrentDetail(e);
                          handleClickOpen();
                        }}
                        className="font-bold"
                      >
                        View Details
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
      <Modal
        // open={true}
        open={opens}
        onClose={() => setOpens(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Box sx={style}>
            <div>
              <div className="flex gap-8">
                <div className="flex">
                  <Avatar
                    sx={{ width: 100, height: 100 }}
                    src={user?.profileUrl || "/broken-image.jpg"}
                  />
                </div>
                <div className="mt-4">
                  <Typography className="font-bold" variant="h5">
                    {`  ${user?.firstname} ${user?.lastname} `}
                  </Typography>
                  <Typography>{user?.email}</Typography>
                  <Typography className="font-bold text-[#e65100]">
                    {user?.phone}
                  </Typography>
                  <Typography>{user?.address}</Typography>
                </div>
              </div>
              <Divider className="my-8" />
              <div class="flex gap-20">
                <div className=" gap-16 font-semibold">
                  <Typography className="my-3 font-semibold">
                    Donation Type
                  </Typography>
                  <Typography className="font-semibold text-primary-main">
                    {currentDetail?.request_type_item?.request_type_id == "1"
                      ? "Cash Donation"
                      : currentDetail?.request_type_item?.request_type_id == "2"
                      ? "Expertise Donation"
                      : "Inkind Donation"}
                  </Typography>
                </div>
                <div className=" font-semibold">
                  <Typography className="my-3 font-semibold">
                    Item Donated
                  </Typography>
                  <Typography className="font-semibold text-primary-main">
                    {`Provided ${currentDetail?.request_type_item?.item_name}`}
                  </Typography>
                </div>
              </div>
              <Divider className="my-8" />
              <div class="flex gap-16 ">
                <div className="flex flex-col gap-3 font-semibold">
                  <div class="flex gap-5 align-center">
                    <Typography className="font-semibold">
                      Company City:
                    </Typography>
                    <Typography>{user?.city}</Typography>
                  </div>
                </div>
              </div>{" "}
              <div class="flex flex-col align-center text-center w-full mt-8">
                <Typography
                  variant="h5"
                  className="font-semibold text-center w-full"
                >
                  About Company:
                </Typography>
                <Typography className="text-center">{user?.about}</Typography>
              </div>
              <div class="flex flex-col align-center text-center w-full mt-8">
                <Typography
                  variant="h5"
                  className="font-semibold text-center w-full"
                >
                  Previous Projects:
                </Typography>
                <Typography className="text-center">{user?.about}</Typography>
              </div>
            </div>
          </Box>
        </div>
      </Modal>

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
