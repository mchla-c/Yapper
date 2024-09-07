import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  Avatar,
} from "@mui/material";
import { cardStyle, CustomButton } from "../styles";

import { useMutation } from "@tanstack/react-query";

// Profile Component
export function ProfileCard() {
  const {
    mutate: fetchUser,
    data: userData,
    isError,
    error,
  } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch user data");
      }
      return res.json();
    },
  });

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (isError) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }
  return (
    <Card sx={{ ...cardStyle, height: 400, mb: 2, padding: 2 }}>
      <CardContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mb={2}
        >
          <Avatar
            sx={{ width: 65, height: 65, mb: 2 }}
            src={userData?.profileImg || "/profile-picture.jpg"}
            alt="Profile Picture"
          />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {userData?.fullName || "Name"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            @{userData?.username || "Username"}
          </Typography>
          <Box display="flex" justifyContent="center" mt={2}>
            <Typography variant="body2" sx={{ mr: 2 }}>
              <strong>Followers:</strong> {userData?.followers.length || 0}
            </Typography>
            <Typography variant="body2">
              <strong>Following:</strong> {userData?.following.length || 0}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" sx={{ mb: 2 }}>
          {userData?.bio || "bio"}
        </Typography>
        <CustomButton href={`/profile/${userData?.username}`}>
          Edit Profile
        </CustomButton>
      </CardContent>
    </Card>
  );
}
