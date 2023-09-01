import React, { useState } from "react";
import { Tabs, Tab, Button, Typography } from "@mui/material";
import AddProject from "./AddProjects";
import AddMilestones from "./AddMilestones";
import ViewAll from "./ViewAll";
import ToDoorSearch from "common/ToDoorSearch";

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

function TabNavigation() {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
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
            Campaigns
          </Typography>

         
        </div>
      </div>

      <Tabs value={activeTab} onChange={handleChange} centered>
        <Tab label="Create Campaigns" />
        <Tab label="Add Milestones" />
        <Tab label="View All" />
      </Tabs>

      <TabPanel value={activeTab} index={0}>
        <AddProject />
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
        <AddMilestones />
      </TabPanel>

      <TabPanel value={activeTab} index={2}>
        <ViewAll />
      </TabPanel>
    </div>
  );
} export default TabNavigation;
