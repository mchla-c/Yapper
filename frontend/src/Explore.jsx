import React from "react";
import { Typography } from "@mui/material";
import { cardStyle, containerStyle } from "./components/styles";
import { Box } from "@mui/material";
import { SearchCard } from "./components/Explore/SearchCard";
import Posts from "./components/common/Posts";

export default function Explore() {
  return (
    <Box sx={containerStyle}>
      <SearchCard />
    </Box>
  );
}
