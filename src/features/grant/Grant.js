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
import { useNavigate } from "react-router-dom";
import WallCards from "common/WallCards";
import { AccountCircle } from "@mui/icons-material";
import ToDoorSearch from "common/ToDoorSearch";
import uploadPNG from "images/Educatial_Upload.png";
import ManageCompanyCard from "features/manageCompanies/ManageCompanyCard";
import ManageCompaniesTable from "features/manageCompanies/ManageCompaniesTable";
import { MediaQueryBreakpointEnum } from "constants/Global";
import { get, post } from "services/fetch";

function Donation(props) {
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
  const [category, setCategory] = React.useState("");
  const [subCategory, setsubCategory] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = (val = false) => {
    setOpen(false);
    setCompleted(val);
  };

  const [requestGrantForm, setrequestGrantForm] = React.useState({
    attachment: "",
    reason: "",
    amount: "0",
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
  const ngo = [
    {
      value: "cash",
      label: "Cash",
    },

    {
      value: "in-kind",
      label: "In-Kind",
    },
    {
      value: "materials",
      label: "Materials",
    },
    {
      value: "technicalExpert",
      label: "Technical Expertise",
    },
  ];

  const subMaterials = [
    {
      value: "Laptop",
      label: "Laptop",
    },

    {
      value: "Temporary office space (3months)",
      label: "Temporary office space (3months)",
    },
    {
      value: "Internet and modem",
      label: "Internet and modem",
    },

    {
      value: "A Table and Chair",
      label: "A Table and Chair",
    },
  ];

  const subResources = [
    {
      value: "Non-profit Coaching",
      label: "Non-profit Coaching",
    },

    {
      value: "Sales & Marketing",
      label: "Sales & Marketing",
    },
    {
      value: "Personal Branding",
      label: "Personal Branding",
    },

    {
      value: "Organizational Branding",
      label: "Organizational Branding",
    },
    {
      value: "Partnership Building",
      label: "Partnership Building",
    },
    {
      value: "Fundraising",
      label: "Fundraising",
    },
    {
      value: "Human Resources",
      label: "Human Resources",
    },
    {
      value: "Grant writing",
      label: "Grant writing",
    },
    {
      value: "Audit Account",
      label: "Audit Account",
    },
    {
      value: "Legal Advice on Taxation etc",
      label: "Legal Advice on Taxation etc",
    },
    {
      value: "Proposal Writing (This can improve as we progress)",
      label: "Proposal Writing (This can improve as we progress)",
    },
  ];

  const subCash = [
    {
      value: 1,
      label: "A monthly donation ",
    },

    {
      value: 2,
      label: "A one-off donation ",
    },
    {
      value: 3,
      label: "Unspecified funds",
    },

    {
      value: 4,
      label: "Amount of choice",
    },
  ];

  

  const subExpertise = [
    {
      value: 1,
      label: "Fundraising",
    },

    {
      value: 2,
      label: "web dev ",
    },
    {
      value: 3,
      label: "Project Management",
    },
    {
      value: 4,
      label: "Strategic Plan/ Strategy",
    },
    {
      value: 5,
      label: "Management",
    },
    {
      value: 6,
      label: "Marketing & Brand visibility ",
    },
    {
      value: 7,
      label: "Running Ad's on Social Media",
    },
    {
      value: 8,
      label: "Accounting & Finance",
    },
    {
      value: 9,
      label: "Pitching for Success",
    },
    {
      value: 10,
      label: "Human Resources ",
    },
    {
      value: 11,
      label: "Grants and proposal writing ",
    },
    {
      value: 12,
      label: "Law & Legal ",
    },
  ];

  //
  //
  // -
  //

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
        <div className="flex justify-between items-center my-6">
          <Typography variant="h4" className="font-bold">
            Make a request
          </Typography>
        </div>
      </div>
      <div className="flex gap-8">
        <div className="md:w-3/5 w-full">
          <div className="flex flex-col gap-2 p-10">
            <div className="w-full flex flex-col gap-3">
              <div className="flex gap-3">
                <div className="w-full ">
                  <FormControl className="w-full">
                    {!category && (
                      <InputLabel htmlFor="name-multiple">
                        Request Category
                      </InputLabel>
                    )}

                    <TextField
                      fullWidth
                      select
                      placeholder="Type Of Organisation"
                      name="company_type"
                      displayEmpty
                      // name='company_type'
                      // label="Select"
                      // value={regData.company_type}
                      defaultValue="Coorporate Organisation"
                      onChange={(e) => setCategory(e.target.value)}
                      id="name-multiple"
                      // helperText="Please select your currency"
                    >
                      {ngo.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                </div>
                {category && (
                  <div className="w-full ">
                    <FormControl className="w-full">
                      {!subCategory && (
                        <InputLabel htmlFor="name-multiple">
                          Sub-Category
                        </InputLabel>
                      )}

                      <TextField
                        fullWidth
                        select
                        placeholder="Type Of Organisation"
                        name="company_type"
                        displayEmpty
                        // name='company_type'
                        // label="Select"
                        // value={regData.company_type}
                        defaultValue="Coorporate Organisation"
                        onChange={(e) => setsubCategory(e.target.value)}
                        id="name-multiple"

                        // helperText="Please select your currency"
                      >
                        {category == "cash"
                          ? subCash.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))
                          : category == "in-kind"
                          ? subResources.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))
                          : category == "materials"
                          ? subMaterials.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))
                          : subExpertise.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                      </TextField>
                    </FormControl>
                  </div>
                )}
              </div>
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
              {category == "cash" && (
                <div>
                  <InputLabel className="text-left mb-2">Amount</InputLabel>
                  <TextField
                    // disabled
                    value={currentDetail?.amount}
                    onChange={onChange}
                    fullWidth
                    name="amount"
                    // disabled={subCategory && subCategory==1}
                  />
                </div>
              )}
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
            <Typography className="text-xs font-bold">
              About Donation
            </Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
            </Typography>
          </div>

          <div className="flex flex-col gap-2 ">
            <Typography className="text-xs font-bold">Reasons</Typography>
            <Typography>
              States reasons for donation. Not more than 600words
            </Typography>
          </div>

          <div className="flex flex-col gap-2">
            <Typography className="text-xs font-bold">Amount</Typography>
            <Typography>Specify the amount needed</Typography>
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
      )
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
  );
}

export default Donation;
