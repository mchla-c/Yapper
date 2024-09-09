import { Link } from "react-router-dom";
import useFollow from "../../hooks/useFollow";
import {
  Typography,
  Box,
  Divider,
  Avatar,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { cardStyle, CustomButton } from "../styles";
import { useQuery } from "@tanstack/react-query";

export function Recommendations({ num }) {
  const [displayCount, setDisplayCount] = useState(num);

  const { data: suggestedUsers, isLoading } = useQuery({
    queryKey: ["suggestedUsers"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/users/suggested");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong!");
        }
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  const { follow, isPending } = useFollow();

  const displayedUsers = suggestedUsers?.slice(0, displayCount);

  return (
    <Card sx={{ ...cardStyle, padding: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Who to Follow
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <>
          {displayedUsers?.map((user) => (
            <Box key={user._id} sx={{ mb: 2 }}>
              <Link
                to={`/profile/${user.username}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <Box display="flex" alignItems="center" flexGrow={1}>
                  <Avatar
                    src={user.profileImg || "/avatar-placeholder.png"}
                    alt={user.fullName}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Box ml={2}>
                    <Typography
                      variant="subtitle1"
                      noWrap
                      sx={{ fontWeight: "bold", maxWidth: "180px" }}
                    >
                      {user.fullName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      @{user.username}
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  size="small"
                  sx={{ mr: 3 }}
                  onClick={(e) => {
                    e.preventDefault();
                    follow(user._id);
                  }}
                  disabled={isPending}
                >
                  {<AddIcon sx={{ fontSize: 20 }} />}
                </IconButton>
              </Link>
              <Divider sx={{ my: 2 }} />
            </Box>
          ))}
        </>
        {displayCount < 99 ? (
          <CustomButton href={`/explore`}>Show More</CustomButton>
        ) : (
          <div></div>
        )}
      </CardContent>
    </Card>
  );
}
