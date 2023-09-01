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
import { patch } from "services/fetch";

function Admin(props) {
  const [section, setSection] = React.useState(2);
  const [currentDetail, setCurrentDetail] = useState();
  const [user, setUser] = React.useState();

  const [imgData, setImgData] = useState(null);
  const [myProjects, setmyProjects] = useState([null]);
  const [showApproveButton, setShowApproveButton] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [grants, setGrants] = useState([]);
  const [loans, setLoans] = useState([]);
  const [displayArray, setdisplayArray] = useState([]);
  const [displayArrayTable, setdisplayArrayTable] = useState([]);
  const [learnMoreDetails, setLearnMoreDetails] = useState([]);
  const [title, setTitle] = useState("REQUESTS");
  const [opens, setOpens] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [filterStatus, setfilterStatus] = React.useState("pending");

  const handleOpen = () => setOpens(true);
  const handleClick = (event, e) => {
    setAnchorEl(event.currentTarget);
    setUser(e?.applied_by)

  };

  const viewUser = (e)=>{
    console.log(e)

  }

  const handleClose = async (id, status) => {
    console.log(id);
    if (true) {
      const res = await patch({
        endpoint: `requests/validate/${id}`,
        body: { status },
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

    setAnchorEl(null);
  };

  const handleView = () => {
    setOpens(true);
    setShowApproveButton(false);
    setAnchorEl(null);
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
  }, []);

  const getGrants = async () => {
    const res = await get({
      endpoint: "requests",
      // body: formData,
      // auth: false,
    });

    setGrants(res.data.data.requests);
    setdisplayArray(res.data.data.requests);
    setdisplayArrayTable(res.data.data.requests);

    console.log(res.data.data.requests);

    //  setIsRegCompleted(res?.data?.data?.states);
  };

  const getDD = async (e) => {
    console.log(e);
    const res = await get({
      endpoint: `projects`,
      // body: formData,
      // auth: false,
    });

    console.log(res);

    setmyProjects(res?.data?.data?.projects);
  };

  const checkDisplayArray = (stats) => {
    setdisplayArrayTable(displayArray.filter((e) => e.status == stats));
    console.log(displayArray.filter((e) => e.status == stats));
  };

  return (
    <div>
      <div className="">
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

          <div className="flex items-end mr-3 mt-12" w-full>
            <div className="w-full">
              <div className="flex gap-4 w-full border-[#ECEEF7] border-2 rounded-2xl py-6">
                <div
                  className="w-full"
                  onClick={() => {
                    setShowApproveButton(false);
                    setdisplayArrayTable(grants);
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

                <div
                  className="w-full"
                  onClick={() => {
                    // setdisplayArray(grants);
                    setShowApproveButton(true);
                    setdisplayArrayTable(
                      grants?.filter((e) => e.status == "pending")
                    );
                    // checkDisplayArray("pending");
                    // setTitle("Requests");
                  }}
                >
                  <WallCards
                    className="mr-3"
                    rider={false}
                    big={true}
                    name="Total Pending Requests"
                    count={grants?.filter((e) => e.status == "pending")?.length}
                  />
                </div>

                <div
                  className="w-full"
                  onClick={() => {
                    checkDisplayArray("open");
                    // alert('open')
                    setShowApproveButton(false);

                    // setTitle("Requests");
                  }}
                >
                  <WallCards
                    className="mr-3"
                    rider={false}
                    big={true}
                    name="Total Approved Requests"
                    count={grants?.filter((e) => e?.status == "open")?.length}
                  />
                </div>
                <div
                  className="w-full"
                  onClick={() => {
                    setShowApproveButton(false);
                  }}
                >
                  <WallCards
                    className="mr-3"
                    rider={false}
                    big={true}
                    name="Total Funded Requests"
                    // count={grants?.length}
                  />
                </div>
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

          {displayArrayTable?.length ? (
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
                placeholder="Search "
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

                  {/* <Typography variant="h6" className="w-1/5 text-center ">
                    View Attachment
                  </Typography> */}
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

                {displayArrayTable?.map((e) => (
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
                            {e?.applied_by?.firstname} {e?.applied_by?.lastname}
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
                        {/* <div
                          className={
                            props?.jj == "loan"
                              ? " text-left p-3 w-2/5 "
                              : " text-center p-3 w-2/5 "get
                          }
                        >
                          <Typography variant="">
                            {e?.attachments?.map((f) => (
                              <a target="_blank" href={f?.url}>
                                View
                              </a>
                            ))}
                          </Typography>
                        </div> */}
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
                                e?.status == "open"
                                  ? "#E2FEF0"
                                  : e?.status == "declined"
                                  ? "#FFF1F0"
                                  : e?.status == "disbursed"
                                  ? "#E2FEF0"
                                  : "#FFECC7",
                              color:
                                e?.status == "open"
                                  ? "#05944F"
                                  : e?.status == "declined"
                                  ? "#B81500"
                                  : e?.status == "disbursed"
                                  ? "#05944F"
                                  : "#A87000",
                            }}
                            variant="h6"
                          >
                            {e?.status == "open" ? "Approved" : e?.status}
                          </Typography>
                        </div>
                        <div
                          className={
                            props?.jj == "loan"
                              ? " text-center p-3 w-2/5  hover:text-primary-main cursor-pointer "
                              : " text-center p-3 w-2/5  hover:text-primary-main cursor-pointer  "
                          }
                        >
                          {showApproveButton && (
                            <Button
                              className="font-bold text-white"
                              onClick={(event) => {
                                handleClick(event, e);
                              }}
                            >
                              Action Button
                            </Button>
                          )}
                          <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => handleClose(e.id)}
                          >
                            <MenuItem
                              onClick={() => handleClose(e?.id, "open")}
                            >
                              Approve
                            </MenuItem>

                            <MenuItem
                              onClick={() => handleClose(e?.id, "cancelled")}
                            >
                              Decline
                            </MenuItem>

                            <MenuItem
                              onClick={() => {
                                handleView(e?.id, "cancelled");
                                setCurrentDetail(e);
                                getDD(e);
                              }}
                            >
                              view Details
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
                    src={user?.avatar || "/broken-image.jpg"}
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
                  Campaigns:
                </Typography>
                <div className="flex align-center text-center ">
                  {myProjects.map((e) => (
                    <div className="flex flex-col items-center justify-center text-center ">
                      <img
                        className="w-[200px] "
                        src={e?.attachments[0]?.url?.replace(/\/public/g, "")}
                      />
                      <Typography className="text-center">
                        {e?.title}{" "}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Box>
        </div>
      </Modal>
    </div>
  );
}

export default Admin;
