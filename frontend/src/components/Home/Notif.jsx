import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  Avatar,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import DeleteIcon from "@mui/icons-material/Delete";

import { cardStyle } from "../styles";

export function NotificationsCard() {
  const queryClient = useQueryClient();

  const {
    data: notifications = [],
    isError,
    error,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await fetch("/api/notifications", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch notifications");
      }
      return res.json();
    },
    onError: (error) => toast.error(error.message),
  });

  const { mutate: deleteNotif, isLoading: isDeleting } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/notifications`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`Failed to delete notifications: ${res.statusText}`);
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Successfully Deleted Notifications");
      queryClient.invalidateQueries(["notifications"]);
    },
    onError: (error) => toast.error(error.message),
  });

  if (isError) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  return (
    <Card sx={{ ...cardStyle, height: 760 }}>
      <CardContent>
        <Box display="flex" alignItems="center">
          <Box ml={2} display="flex" alignItems="center" flexGrow={1}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mr: 1 }}>
              Notifications
            </Typography>
          </Box>
          <IconButton
            size="small"
            sx={{ mr: 3 }}
            onClick={() => deleteNotif()}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <CircularProgress size={20} />
            ) : (
              <DeleteIcon sx={{ fontSize: 20 }} />
            )}
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ maxHeight: 670, overflowY: "auto", ml: 1 }}>
          {notifications.map((notification) => (
            <Box key={notification._id} mb={2}>
              <Box display="flex" alignItems="center">
                <Avatar
                  sx={{ width: 40, height: 40, borderRadius: "50%" }}
                  src={notification.from.profileImg || "/profile-picture.jpg"}
                  alt={`Profile picture`}
                />
                <Box ml={2} sx={{ flexGrow: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {notification.from.fullName || "Name"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    @{notification.from.username || "username"}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary" mt={1}>
                {notification.type === "follow"
                  ? "has started following you"
                  : notification.type === "like"
                  ? "has liked your post"
                  : "performed an action"}
              </Typography>
              <Divider sx={{ my: 2 }} />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
