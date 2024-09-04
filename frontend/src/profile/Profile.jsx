import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  Tab,
  Tabs,
  TextField,
  AvatarGroup,
  Avatar,
  IconButton,
  Button,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  LocationOn,
  Wc,
} from "@mui/icons-material";
import { containerStyle, cardStyle, CustomButton } from "../components/styles";
import { FeedCard, ProfileCard } from "../components/Dashboard";
import { FriendList, MainProfileCard, NotUserButtons } from "./profilepage";
import { useQuery } from "@tanstack/react-query";

export default function Profile() {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const friends = [
    { name: "Alice", imageUrl: "" },
    { name: "Bob", imageUrl: "" },
    { name: "Charlie", imageUrl: "" },
    { name: "Dave", imageUrl: "" }, // Initials will be shown if no image
    { name: "Eve", imageUrl: "" },
  ];

  return (
    <Box sx={containerStyle}>
      <Grid container spacing={3}>
        {/* Left: Fixed Profile Card */}
        <Grid item xs={12} md={3}>
          <Box sx={{ position: "sticky", top: "60px" }}>
            <MainProfileCard
              avatarsrc={""}
              name={"John Doe"}
              userid={"johndoe"}
              location={"LA"}
              numFollowers={"50"}
              numFollowing={"10"}
              bio={"This is bio"}
            />
            <NotUserButtons />
          </Box>
        </Grid>

        {/* Right: Dynamic Card Posts */}
        <Grid item xs={12} md={9}>
          <FriendList friends={friends} />

          {/* Mini Navbar for Posts, Likes, and Search */}
          <Box mb={3}>
            <Card sx={cardStyle}>
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                {/* Tabs for Posts and Likes */}
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  sx={{ flexGrow: 1 }}
                >
                  <Tab label="Posts" />
                  <Tab label="Likes" />
                </Tabs>

                {/* Search Bar */}
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Search..."
                  sx={{ marginLeft: "20px", width: "300px" }}
                />
              </CardContent>
            </Card>
          </Box>

          {[1, 2, 3, 4, 5, 6].map((post, index) => (
            <Box key={index} mb={2}>
              <FeedCard />
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
