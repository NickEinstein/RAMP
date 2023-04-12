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

function Loan(props) {
  const [section, setSection] = React.useState(2);
  const [imgData, setImgData] = useState(null);
  const [myLoanApplication, setMyLoanApplications] = useState([null]);
  const [currentDetail, setCurrentDetail] = useState([null]);
  const [completed, setCompleted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (val = false) => {
    setOpen(false);
    setCompleted(val);
  };
  const [loanRequestForm, setLoanRequestForm] = React.useState({
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
      label: "Health",
    },
    {
      value: "EUR",
      label: "Women  & Girls",
    },
    {
      value: "EUR",
      label: "Community Outreach",
    },
    {
      value: "EUR",
      label: "Tech & Innovation",
    },
    {
      value: "EUR",
      label: "Women  & Girls",
    },
    {
      value: "BTC",
      label: "Human Capacity",
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

    setLoanRequestForm({
      ...loanRequestForm,
      attachment: event.target.files[0],
    });
  };

  const onChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setLoanRequestForm({
      ...loanRequestForm,
      [e.target.name]: e.target.value,
    });
  };

  console.log(loanRequestForm);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setLoanRequestForm({
      ...loanRequestForm,
      tenure: +newValue,
    });
  };

  useEffect(() => {
    userLoan();
  }, []);

  const userLoan = async () => {
    const res = await get({
      endpoint: "users/loans",
      // body: formData,
      // auth: false,
    });

    setMyLoanApplications(res?.data?.data?.loans);
    if (res?.data?.data?.loans.length == 0) {
      setSection(0);
    }
    console.log(res?.data?.data?.loans);
  };
  const applyForLoan = async () => {
    const formData = new FormData();

    formData.append("reason", loanRequestForm.reason);
    formData.append("amount", loanRequestForm.amount);
    formData.append("attachments[]", loanRequestForm.attachment);
    formData.append("tenure", loanRequestForm.tenure);
    formData.append("title", loanRequestForm.title);

    const res = await post({
      endpoint: "users/loans/apply",
      body: formData,
      // auth: false,
    });

    if (res.data.success) {
      handleOpen(true);
      userLoan();

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
            Profile
          </Typography>

          {section == 2 && (
            <Button
              className="font-bold text-base text-white"
              onClick={() => setSection(1)}
            >
             
            </Button>
          )}
        </div>
      </div>

      {section == 0 && (
        <div className="md:flex gap-8">
          <div className="md:w-3/5 w-full">
            {section == 0 && (
              <div className="flex flex-col gap-2 p-10">
                <Typography variant="h6" className="font-bold">
                  {/* Request Loans */}
                </Typography>
                <Typography variant="" className="text-xs">
                  Make Request
                </Typography>
                <Divider className="mb-4" />
                <div className="w-full flex flex-col gap-3">
                  <div>
                    <InputLabel className="text-left mb-2">
                      Email Address
                    </InputLabel>
                    <TextField
                      // disabled
                      value={currentDetail?.title}
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
                      value={currentDetail?.title}
                      onChange={onChange}
                      fullWidth
                      name="title"
                    />
                  </div>
                  <div>
                    <InputLabel className="text-left mb-2">Country</InputLabel>
                    <TextField
                      // disabled
                      value={currentDetail?.title}
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
                      value={currentDetail?.title}
                      onChange={onChange}
                      fullWidth
                      name="title"
                    />
                  </div>
                  <div>
                    <InputLabel className="text-left mb-2">
                      Account Information
                    </InputLabel>
                    <TextField
                      // disabled
                      value={currentDetail?.title}
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
                      value={currentDetail?.title}
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
                    <InputLabel className="text-left  mb-2">
                      Category
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="outlined-select-currency"
                      select
                      name="typeOfLoan"
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
                  </div>
                  <div>
                    <InputLabel className="text-left mb-2">
                      Impact And Track Record
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
                    <InputLabel className="text-left mb-2">
                     About Us (Not more than 600 words)
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
                disabled
                onClick={() => {
                //   applyForLoan();
                  // handleOpen(true);
                  //   : setSection((prev) => prev + 1);
                  // handleClose();
                  // redirect();
                }}
                // className=' '
              >
                Update
              </Button>
            </div>
          </div>
          <div className="md:w-2/5 hidden p-4 md:flex flex-col gap-4 text-black bg-[#F0F6FF]">
            {/* <div className="flex flex-col gap-2">
              <Typography className="text-xs font-bold">About Loans</Typography>
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
                States reasons for loan. Not more than 600words
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
            </div> */}
          </div>
        </div>
      )}

      

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
            <Typography variant="h5">Loan Request Successful</Typography>
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

export default Loan;
