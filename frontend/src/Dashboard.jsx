import React from "react";
import { Box, Grid } from "@mui/material";
import { containerStyle } from "./components/styles";
import {
  ProfileCard,
  RecommendationsCard,
  PostBar,
  FeedCard,
  NotificationsCard,
} from "./components/Dashboard";

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
          <RecommendationsCard />
        </Grid>

        {/* Post Bar and Feed Column */}
        <Grid item xs>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <PostBar />
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
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
