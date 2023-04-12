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

function Scholarships(props) {
  const [section, setSection] = React.useState(2);
  const [imgData, setImgData] = useState(null);
  const [myScholarshipApplication, setMyScholarshipApplications] = useState([
    null,
  ]);
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
    userScholarship();
  }, []);

  const userScholarship = async () => {
    const res = await get({
      endpoint: "users/scholarships",
      // body: formData,
      // auth: false,
    });

    setMyScholarshipApplications(res?.data?.data?.scholarships);
    if (res?.data?.data?.scholarships.length == 0) {
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
    formData.append("title", scholarshipRequestForm.title);

    const res = await post({
      endpoint: "users/scholarships/apply",
      body: formData,
      // auth: false,
    });

    if (res.data.success) {
      handleOpen(true);
      userScholarship();

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
          <Typography variant="h4" className="font-bold">
            SCHOLARSHIPS
          </Typography>

          {section == 2 && (
            <Button
              className="font-bold text-base text-white"
              onClick={() => setSection(1)}
            >
              Request For Scholarship
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
                  Scholarships - How it works
                  {/* {!completed ? "One more thing..." : "Getting Started"} */}
                </Typography>
                <Typography>
                  Your application have been approved. Proceed by providing the
                  information below to enable you have access to all our
                  features
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
              Request Scholarships
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
        <div className="md:flex gap-8">
          <div className="md:w-3/5 w-full">
            {section == 1 && (
              <div className="flex flex-col gap-2 p-10">
                <Typography variant="h6" className="font-bold">
                  Request Scholarships
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
                    <InputLabel className="text-left  mb-2">
                      I want a Scholarship of
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
                  </div>

                  {/* <div>
                    <InputLabel className="text-left  mb-2">
                      Type Of Scholarship
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="outlined-select-currency"
                      select
                      name="typeOfScholarship"
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
                    <InputLabel className="text-left mb-2">
                      Reasons (Not more than 600 words)
                    </InputLabel>
                    <TextField
                      name="reason"
                      onChange={onChange}
                      fullWidth
                      multiline
                      rows={6}
                      // value={currentDetail.reason}
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
                // className=' '
              >
                Cancel
              </Button>

              <Button
                className="p-3 w-full text-base mb-10 text-white"
                type="submit"
                // disabled
                onClick={() => {
                  applyForScholarship();
                  // handleOpen(true);
                  //   : setSection((prev) => prev + 1);
                  // handleClose();
                  // redirect();
                }}
                // className=' '
              >
                Apply
              </Button>
            </div>
          </div>
          <div className="md:w-2/5 hidden p-4 md:flex flex-col gap-4 text-black bg-[#F0F6FF]">
            <div className="flex flex-col gap-2">
              <Typography className="text-xs font-bold">
                About Scholarships
              </Typography>
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
                States reasons for Scholarship. Not more than 600 words
              </Typography>
            </div>

            <div className="flex flex-col gap-2">
              <Typography className="text-xs font-bold">Amount</Typography>
              <Typography>Specify the amount needed for Scholarship</Typography>
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
                    name="Total Scholarship"
                    count={myScholarshipApplication?.length}
                  />
                  <WallCards
                    rider={false}
                    big={true}
                    name="Approved"
                    count={
                      myScholarshipApplication?.filter(
                        (e) => e?.status == "pending"
                      )?.length
                    }
                  />
                  <WallCards
                    rider={false}
                    big={true}
                    name="Funded"
                    count={
                      myScholarshipApplication?.filter(
                        (e) => e?.status == "approved"
                      )?.length
                    }
                  />

                  <WallCards
                    rider={false}
                    big={true}
                    name="Declined"
                    count={
                      myScholarshipApplication?.filter(
                        (e) => e?.status == "declined"
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
                  Date
                </Typography>
                {/* <Typography variant="h6" className="w-1/5 text-left ">
                  Type Of Scholarships
                </Typography> */}
                <Typography variant="h6" className="w-1/5 text-center ">
                  Reason
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
                <Typography variant="h6" className="w-1/5 text-center ">
                  Action
                </Typography>
              </div>
              {myScholarshipApplication?.map((e) => (
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
                        <Typography variant="">{e?.reason}</Typography>
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
                          {props.tableArray?.status == "approved"
                            ? "Approved"
                            : props.tableArray?.status == "declined"
                            ? "Declined"
                            : props.tableArray?.status == "disbursed"
                            ? "Disbursed"
                            : "Pending"}
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
                            setCurrentDetail(e);
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
        )}
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

export default Scholarships;
