import {
  TextField,
  InputLabel,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { del, get } from "services/fetch";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";
import { CancelOutlined } from "@mui/icons-material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { post } from "services/fetchDocuments";

function AddMilestones() {
  const [milestone, setMilestone] = useState("");
  const [milestonesList, setMilestonesList] = useState([]);
  const [milestoneInputs, setMilestoneInputs] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [array, setArray] = useState([]);
  const [imgData, setImgData] = useState(null);
  const [startDate, setstartDate] = useState();
  const [project, setProject] = useState();
  const [open, setOpen] = React.useState(false);

  const [expandedPanel, setExpandedPanel] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel?.id : null);
    setArray(panel?.milestones);
    setProject(panel);
  };

  const addToArrayList = () => {
    // if (inputValue !== "") {
    //   setArray([...array, inputValue]);
    //   setInputValue("");
    // }
  };

  const updateMilestone = async () => {
    const formData = new FormData();

    formData.append("description", milestoneInputs.reason);
    formData.append("date", moment(startDate).format("YYYY-MM-DD"));
    formData.append("attachments[]", milestoneInputs.attachment);
    formData.append("title", milestoneInputs.title);
    formData.append("status", selectedValue);
    formData.append("project_id", project.id);

    const res = await post({
      endpoint: "milestones",
      body: formData,
      // auth: false,
    });

    if (res.data.success) {
      getProjects();
      // userLoan();
      // handleClose(true);
    } else {
      console.log(res);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addToArrayList();
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddMilestone = () => {
    if (milestone.trim() !== "") {
      setMilestonesList((prevList) => [...prevList, milestone]);
      setMilestone("");
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    const res = await get({
      endpoint: "projects",
      // body: formData,
      // auth: false,
    });

    setMilestonesList(res?.data?.data?.projects);
  };

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

    setMilestoneInputs({
      ...milestoneInputs,
      attachment: event.target.files[0],
    });
  };

  const onChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setMilestoneInputs({
      ...milestoneInputs,
      [e.target.name]: e.target.value,
    });
  };

  const [selectedValue, setSelectedValue] = useState("");

  const handleSelection = (value) => {
    setSelectedValue(value);
  };

  const deleteMilestone = async (id) => {
    const res = await del({
      endpoint: `milestones/${id}`,

      // body: formData,
      // auth: false,
    });
    if (res) {
      getProjects();
    }

    // setMilestonesList(res?.data?.data?.projects);
  };

  return (
    <div>
      {milestonesList?.map((item) => (
        <Accordion
          className="my-4 p-0"
          key={item.id}
          expanded={expandedPanel === item.id}
          onChange={handleChange(item)}
          //   onClick={() => )}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${item.id}bh-content`}
            id={`${item.id}bh-header`}
          >
            <div className="w-full">
              {
                <div className="flex items-center justify-between px-5">
                  <Typography variant="h5">{item?.title}</Typography>
                  <div class="flex gap-5 items-center">
                    <Typography variant="h5">
                      {moment(item?.start_date).format("ll")}
                    </Typography>
                    <Typography variant="h3">-</Typography>
                    <Typography variant="h5">
                      {moment(item?.end_date).format("ll")}
                    </Typography>
                  </div>
                </div>
              }
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {
                <div class="flex flex-col gap-5">
                  <div>
                    <Typography className="text-center" variant="h5">
                      Description
                    </Typography>
                    <Typography className="text-center">
                      {item?.description}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-center" variant="h5">
                      MileStones
                    </Typography>
                  {item?.milestones?.length ?  <div className="list-inside list-decimal mt-3 mb-8  mx-auto">
                      <div className="flex items-center">
                        <Typography className="w-1/6 p-2 text-center ">
                          Title
                        </Typography>
                        <Typography className="w-2/6 p-2 text-center ">
                          Description
                        </Typography>
                        <Typography className="w-1/6 p-2 text-center ">
                          Status
                        </Typography>
                        <Typography className="w-1/6 p-2 text-center ">
                          Date
                        </Typography>
                        <Typography className="w-1/6 p-2 text-center ">
                          Action
                        </Typography>
                      </div>
                      {item?.milestones?.map((item, index) => (
                        <div key={index} className="w-full bg-slate-400 my-2">
                          <div className="flex items-center">
                            <Typography className="w-1/6 p-2 text-center ">
                              {item?.title}
                            </Typography>
                            <Typography className="w-2/6 p-2 text-center ">
                              {item?.description}
                            </Typography>
                            <Typography className="w-1/6 p-2 text-center ">
                              {item?.status}
                            </Typography>
                            <Typography className="w-1/6 p-2 text-center ">
                              {moment(item?.date)?.format("ll")}
                            </Typography>
                            <div className=" w-1/6 p-2 text-center ">
                              <CancelOutlined
                                onClick={() => deleteMilestone(item.id)}
                                className="text-red-600 cursor-pointer"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div> :<Typography className="text-center text-red-600 mt-2">{'No  Recorded Milestone For this Project'}</Typography>}
                 
                 { open && <div  class="w-full flex justify-center mt-4"><Button onclick={()=>setOpen(false)}>Add Milestone</Button></div>}
                   {!open && <div className="flex gap-5 items-center w-full">
                      <div className="flex flex-col gap-2 p-10 mx-auto">
                        <div className="w-full flex flex-col gap-3">
                          <div class="flex gap-8">
                            <div>
                              <InputLabel className="text-left mb-2">
                                Title
                              </InputLabel>
                              <TextField
                                // disabled
                                // value={currentDetail?.title}
                                onChange={onChange}
                                fullWidth
                                name="title"
                              />
                            </div>
                            <div>
                              <InputLabel className="text-left mb-2">
                                Date
                              </InputLabel>
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <div className="flex-between">
                                  <DatePicker
                                    className=" mr-8 w-full"
                                    value={startDate}
                                    onChange={(newValue) => {
                                      console.log(newValue);
                                      setstartDate(newValue);
                                    }}
                                    renderInput={(params) => (
                                      <TextField {...params} />
                                    )}
                                  />
                                </div>
                              </LocalizationProvider>
                            </div>
                          </div>

                          <div>
                            <InputLabel className="text-left mb-2">
                              Description
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
                              Status
                            </InputLabel>
                            <div className="flex gap-6">
                              <Button
                                className={`radio-button ${
                                  selectedValue === "pending"
                                    ? "bg-green-600"
                                    : ""
                                }`}
                                onClick={() => handleSelection("pending")}
                              >
                                Pending
                              </Button>
                              <Button
                                className={`radio-button ${
                                  selectedValue === "ongoing"
                                    ? "bg-green-600"
                                    : ""
                                }`}
                                onClick={() => handleSelection("ongoing")}
                              >
                                Ongoing
                              </Button>
                              <Button
                                className={`radio-button ${
                                  selectedValue === "completed"
                                    ? "bg-green-600"
                                    : ""
                                }`}
                                onClick={() => handleSelection("completed")}
                              >
                                Completed
                              </Button>
                            </div>
                          </div>

                          <div className="mt-6">
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
                                Supporting Photo uploads
                              </div>
                              {/* <img src={uploadPNG} /> */}
                            </label>
                          </div>

                          {imgData && (
                            <div className="relative w-20">
                              <Avatar
                                className="w-32 h-32  border-blue-300"
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
                      <Button
                        className="min-w-32 bg-orange-400 hover:bg-green-600"
                        onClick={updateMilestone}
                      >
                        Add MileStone
                      </Button>{" "}
                    </div>}
                  </div>
                </div>
              }
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      <div>
        {/* <InputLabel className="text-left mb-2">MileStones</InputLabel> */}
      </div>
    </div>
  );
}

export default AddMilestones;
