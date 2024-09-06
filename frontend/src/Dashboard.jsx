import React from "react";
import { Box, Grid } from "@mui/material";
import { containerStyle } from "./components/styles";

import { Recommendations } from "./components/Home/Recommendations";
import { ProfileCard } from "./components/Home/ProfileCard";
import { CreatePost } from "./components/Home/CreatePost";
import { NotificationsCard } from "./components/Home/Notif";
import Posts from "./components/common/Posts";

export default function Dashboard() {
  return (
    <Box sx={containerStyle}>
      <Grid container spacing={2}>
        {/* Profile and Recommendations Column */}
        <Grid
          item
          sx={{ width: 250, position: "sticky", top: 2, alignSelf: "start" }}
        >
          <ProfileCard />
          <Recommendations />
        </Grid>

        {/* Post Bar and Feed Column */}
        <Grid item xs>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <CreatePost />
            <Posts />
          </Box>
        </Grid>

        {/* Notifications Column */}
        <Grid
          item
          sx={{ width: 250, position: "sticky", top: 2, alignSelf: "start" }}
        >
          <NotificationsCard />
        </Grid>
      </Grid>
    </Box>
  );
}
