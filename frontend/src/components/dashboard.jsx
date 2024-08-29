import React, { useState } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Divider,
  Avatar,
  Button,
  IconButton,
} from "@mui/material";
import { cardStyle, CustomButton } from "./styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import AddIcon from "@mui/icons-material/Add";

// Profile Component
export function ProfileCard() {
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
            src="/profile-picture.jpg"
            alt="Profile Picture"
          />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Name
          </Typography>
          <Typography variant="body2" color="text.secondary">
            @Username
          </Typography>
          <Box display="flex" justifyContent="center" mt={2}>
            <Typography variant="body2" sx={{ mr: 2 }}>
              <strong>Followers:</strong> #
            </Typography>
            <Typography variant="body2">
              <strong>Following:</strong> #
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" sx={{ mb: 2 }}>
          Bio: A short bio describing yourself in a few sentences.
        </Typography>
        <CustomButton href="/Profile">Edit Profile</CustomButton>
      </CardContent>
    </Card>
  );
}

// Recommendations Component
export function RecommendationsCard() {
  return (
    <Card
      sx={{
        ...cardStyle,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: 365,
      }}
    >
      <CardContent justifyContent="center">
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          Recommendations
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box>
          <Box display="flex" alignItems="center" mb={1}>
            <Avatar
              sx={{ width: 30, height: 30 }}
              src="/profile-picture.jpg"
              alt="Profile Picture"
            />
            <Box ml={2} sx={{ flexGrow: 1 }}>
              <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                Name
              </Typography>
              <Typography variant="body2" color="text.secondary">
                @Username
              </Typography>
            </Box>
            <IconButton size="small" sx={{ mr: 3 }}>
              <AddIcon sx={{ ml: 2, fontSize: 20 }} />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 1 }} />

          <Box display="flex" alignItems="center" mb={1}>
            <Avatar
              sx={{ width: 30, height: 30 }}
              src="/profile-picture.jpg"
              alt="Profile Picture"
            />
            <Box ml={2} sx={{ flexGrow: 1 }}>
              <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                Name
              </Typography>
              <Typography variant="body2" color="text.secondary">
                @Username
              </Typography>
            </Box>
            <IconButton size="small" sx={{ mr: 3 }}>
              <AddIcon sx={{ ml: 2, fontSize: 20 }} />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 1 }} />

          <Box display="flex" alignItems="center" mb={1}>
            <Avatar
              sx={{ width: 30, height: 30 }}
              src="/profile-picture.jpg"
              alt="Profile Picture"
            />
            <Box ml={2} sx={{ flexGrow: 1 }}>
              <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                Name
              </Typography>
              <Typography variant="body2" color="text.secondary">
                @Username
              </Typography>
            </Box>
            <IconButton size="small" sx={{ mr: 3 }}>
              <AddIcon sx={{ ml: 2, fontSize: 20 }} />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 3 }} />
        </Box>
        <CustomButton justifyContent="center" href="/Explore">
          See All
        </CustomButton>
      </CardContent>
    </Card>
  );
}

// Post Bar Component
export function PostBar() {
  return (
    <Card sx={{ ...cardStyle, padding: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          What's New
        </Typography>
        <TextField
          variant="outlined"
          sx={{ width: "100%", mb: 1 }}
          placeholder="What's on your mind..."
          multiline
          rows={2}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{
            fontWeight: "bold",
            width: "80px",
            color: "white",
            borderRadius: "17px",
            boxShadow: 2,
            padding: 1.2,
            // border: '1px solid #1E1E1E',
            textTransform: "none", // Prevent uppercase transformation
          }}
        >
          Yap
        </Button>
      </CardContent>
    </Card>
  );
}

// Feed Component
export function FeedCard() {
  const [showReplyField, useShowReplyField] = useState(false);

  const handleReplyButtonClick = () => {
    useShowReplyField(true);
  };
  const handleYapButtonClick = () => {
    useShowReplyField(false);
  };

  return (
    <Card sx={{ ...cardStyle, padding: 2 }}>
      <CardContent>
        <Box>
          <Box display="flex" alignItems="center" mb={1}>
            <Avatar
              sx={{ width: 30, height: 30 }}
              src="/profile-picture.jpg"
              alt="Profile Picture"
            />
            <Box ml={2} sx={{ flexGrow: 1 }}>
              <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                Name
              </Typography>
              <Typography variant="body2" color="text.secondary">
                @Username
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 2 }} />
        </Box>
        <Typography variant="body" color="text.secondary">
          Latest updates from people you follow.
        </Typography>

        <Divider sx={{ mt: 2, mb: 1 }} />

        {!showReplyField ? (
          <Grid>
            <IconButton size="small" sx={{ mr: 3 }}>
              <FavoriteIcon sx={{ fontSize: 20 }} />
            </IconButton>
            <IconButton size="small" sx={{ mr: 3 }}>
              <ShareIcon sx={{ fontSize: 20 }} />
            </IconButton>
            <Button
              variant="contained"
              color="primary"
              onClick={handleReplyButtonClick}
              sx={{
                fontWeight: "bold",
                width: "100px",
                color: "white",
                borderRadius: "17px",
                boxShadow: 2,
                padding: 1.2,
                textTransform: "none", // Prevent uppercase transformation
              }}
            >
              Reply
            </Button>
          </Grid>
        ) : (
          <Box display="flex" alignItems="center">
            <TextField
              variant="outlined"
              sx={{ flexGrow: 1, mr: 1 }}
              placeholder="Reply"
              multiline
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleYapButtonClick}
              sx={{
                fontWeight: "bold",
                width: "100px",
                color: "white",
                borderRadius: "17px",
                boxShadow: 2,
                padding: 1.2,
                textTransform: "none", // Prevent uppercase transformation
                mr: 2,
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleYapButtonClick}
              sx={{
                fontWeight: "bold",
                width: "100px",
                color: "white",
                borderRadius: "17px",
                boxShadow: 2,
                padding: 1.2,
                textTransform: "none", // Prevent uppercase transformation
              }}
            >
              Yap Back
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

// Notifications Component
export function NotificationsCard() {
  const notifications = ["Notification 1", "Notification 2", "Notification 3"];

  return (
    <Card sx={{ ...cardStyle, padding: 2, height: 780 }}>
      <CardContent>
        <Typography
          justifyContent="center"
          variant="h6"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          Notifications
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ maxHeight: "650px", overflowY: "auto" }}>
          {notifications.map((notification, index) => (
            <Typography
              key={index}
              variant="body2"
              color="text.secondary"
              mb={1}
            >
              {notification}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
