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
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

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
import { patch } from "services/fetch";

function Admin(props) {
  const [section, setSection] = React.useState(2);
  const [imgData, setImgData] = useState(null);
  const [myContributions, setMyContributions] = useState([null]);
  const [currentDetail, setCurrentDetail] = useState([null]);
  const [completed, setCompleted] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [grants, setGrants] = useState([]);
  const [loans, setLoans] = useState([]);
  const [scholoarships, setScholoarships] = useState([]);
  const [eduInvests, setEduInvests] = useState([]);
  const [displayArray, setdisplayArray] = useState([]);
  const [learnMoreDetails, setLearnMoreDetails] = useState([]);
  const [title, setTitle] = useState("REQUESTS");
  const [open, setOpen] = React.useState(false);
  const [count, setCount] = React.useState(0);

  const handleOpen = () => setOpen(true);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (id) => {
    console.log(id);
    if (true) {
      const res = await patch({
        endpoint: `users/grants/validate/${id}`,
        body: { status: "open" },
        // auth: false,
      });

      if (res.data.success) {
        enqueueSnackbar("Approved", { variant: "success" });
        getGrants();
        setdisplayArray(grants);
        // setTitle('grant')

        // handleOpen(true);
        // userContributions();

        // handleClose(true);
      } else {
        console.log(res);
      }
    }

    if (title == "loan") {
      const res = await patch({
        endpoint: `users/loans/validate/${id}`,
        body: { status: "open" },
        // auth: false,
      });

      if (res.data.success) {
        enqueueSnackbar("Approved", { variant: "success" });
        getLoans();
        setdisplayArray(loans);

        // handleClose(true);
      } else {
        console.log(res);
      }
    }

    if (title == "scholarship") {
      const res = await patch({
        endpoint: `users/scholarships/validate/${id}`,
        body: { status: "open" },
        // auth: false,
      });

      if (res.data.success) {
        enqueueSnackbar("Approved", { variant: "success" });
        getScholarships();
        // handleClose(true);
        setdisplayArray(scholoarships);
      } else {
        console.log(res);
      }
    }

    if (title == "eduinvest") {
      const res = await patch({
        endpoint: `users/eduinvests/validate/${id}`,
        body: { status: "open" },
        // auth: false,
      });

      if (res.data.success) {
        enqueueSnackbar("Approved", { variant: "success" });
        getEduInvests();
        setdisplayArray(eduInvests);

        // handleClose(true);
      } else {
        console.log(res);
      }
    }

    setAnchorEl(null);
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

  useEffect(() => {
    getGrants();
    getLoans();
    getScholarships();
    getEduInvests();
    setCount((p) => p + 1);
  }, []);
  useEffect(() => {
    if (title == "Requests") {
      displayArray(grants);
      return;
    }
    if (title == "loans") {
      displayArray(loans);
      return;
    }
    if (title == "scholarship") {
      displayArray(scholoarships);
      return;
    }
    if (title == "eduinvests") {
      displayArray(eduInvests);
      return;
    }
  }, [grants, loans, scholoarships, eduInvests]);
  const getLoans = async () => {
    const res = await get({
      endpoint: "users/loans",
      // body: formData,
      // auth: false,
    });
    setLoans(res.data.data.loans);

    //  setIsRegCompleted(res?.data?.data?.states);
  };
  const getEduInvests = async () => {
    const res = await get({
      endpoint: "users/eduinvests",
      // body: formData,
      // auth: false,
    });
    setEduInvests(res.data.data.eduInvests);

    //  setIsRegCompleted(res?.data?.data?.states);
  };
  const getScholarships = async () => {
    const res = await get({
      endpoint: "users/scholarships",
      // body: formData,
      // auth: false,
    });
    setScholoarships(res.data.data.scholarships);

    //  setIsRegCompleted(res?.data?.data?.states);
  };

  const getGrants = async () => {
    const res = await get({
      endpoint: "users/grants",
      // body: formData,
      // auth: false,
    });

    setGrants(res.data.data.grants);
    setdisplayArray(res.data.data.grants);

    //  setIsRegCompleted(res?.data?.data?.states);
  };

  const userContributions = async () => {
    const res = await get({
      endpoint: "users/contributions",
      // body: formData,
      // auth: false,
    });

    setMyContributions(res?.data?.data?.contributions);

    console.log(res?.data?.data?.scholarships);
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
            ADMIN
          </Typography>
        </div>
      </div>

      <div>
        <div>
          {/* <ToDoorSearch /> */}

          <div className="flex items-end mr-3 mt-12">
            <div>
              <div className="flex gap-4">
                <div
                // onClick={() => {
                //   setdisplayArray(grants);
                //   setTitle("Requests");
                // }}
                >
                  <WallCards
                    className="mr-3"
                    rider={false}
                    big={true}
                    name="Total Requests"
                    count={grants?.length}
                  />
                </div>

                <div
                // onClick={() => {
                //   setdisplayArray(grants);
                //   setTitle("Requests");
                // }}
                >
                  <WallCards
                    className="mr-3"
                    rider={false}
                    big={true}
                    name="Total Pending Requests"
                    // count={grants?.length}
                  />
                </div>

                <div
                // onClick={() => {
                //   setdisplayArray(grants);
                //   setTitle("Requests");
                // }}
                >
                  <WallCards
                    className="mr-3"
                    rider={false}
                    big={true}
                    name="Total Approved Requests"
                    // count={grants?.length}
                  />
                </div>
                <div
                // onClick={() => {
                //   setdisplayArray(grants);
                //   setTitle("Requests");
                // }}
                >
                  <WallCards
                    className="mr-3"
                    rider={false}
                    big={true}
                    name="Total Funded Requests"
                    // count={grants?.length}
                  />
                </div>
                {/* <div
                  onClick={() => {
                    setdisplayArray(loans);
                    setTitle("loan");
                  }}
                >
                  <WallCards
                    rider={false}
                    big={true}
                    name="Total Loans"
                    count={loans?.length}
                  />
                </div> */}
                {/* <div
                  onClick={() => {
                    setdisplayArray(scholoarships);
                    setTitle("scholarship");
                  }}
                >
                  <WallCards
                    rider={false}
                    big={true}
                    name="Scholarships"
                    count={scholoarships?.length}
                  />
                </div> */}

                {/* <div
                  onClick={() => {
                    setdisplayArray(eduInvests);
                    setTitle("eduinvest");
                  }}
                >
                  <WallCards
                    rider={false}
                    big={true}
                    name="Eduinvest"
                    count={eduInvests?.length}
                  />
                </div> */}
                {/* <div
                  onClick={() => {
                    setdisplayArray(myContributions);
                    setTitle("Contributions");
                  }}
                >
                  <WallCards
                    rider={false}
                    big={true}
                    name="Contributions"
                    count={myContributions?.length}
                  />
                </div> */}
              </div>
            </div>
          </div>

          <Typography variant="h6" className="font-bold mt-8">
            History
          </Typography>

          <Divider className="mb-6 p-1" />
          {/* <Typography className="my-6" variant="h4">
            {title.toUpperCase()} (Pending)
          </Typography> */}

          {displayArray?.filter((e) => e.status == "pending").length ? (
            <div>
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
                    From
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
                    View Attachment
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

                {displayArray
                  ?.filter((e) => e.status == "pending")
                  .map((e) => (
                    <div>
                      {/* { props.tableArray.map((e)=> */}
                      <div>
                        <div
                          // onClick={openBelow}
                          className=" mt-2 flex gap-2 w-full items-center  min-h-[50%] "
                        >
                          <div
                            className={
                              props?.jj == "loan"
                                ? " text-left p-3 w-2/5 "
                                : " text-center p-3 w-2/5 "
                            }
                          >
                            <Typography variant="">
                              {e?.applied_by?.firstname}{" "}
                              {e?.applied_by?.lastname}
                            </Typography>
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
                            <Typography variant="">
                              {e?.attachments?.map((f) => (
                                <a target="_blank" href={f?.url}>
                                  View
                                </a>
                              ))}
                            </Typography>
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
                              className="rounded-3xl text-[12px] h-10 flex items-center justify-center font-bold"
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
                            <Button
                              className="font-bold text-white"
                              onClick={handleClick}
                            >
                              Action Button
                            </Button>
                            <Menu
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl)}
                              onClose={() => handleClose(e.id)}
                            >
                              <MenuItem onClick={() => handleClose(e?.id)}>
                                Approve
                              </MenuItem>
                            </Menu>
                          </div>
                        </div>
                      </div>
                      {/* )} */}
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            `NO PENDING ${title.toLocaleUpperCase()} REQUESTS`
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
