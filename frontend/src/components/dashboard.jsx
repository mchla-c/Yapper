import React, { useState, useEffect } from "react";
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
import CheckIcon from "@mui/icons-material/Check";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

//Follow Button Component
export function FollowButton({ id }) {
  const {
    data: user,
    isError,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("api/auth/me", {
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

  const following = user?.following || [];

  const isFollowing = following.includes(id);

  if (isError) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  const { mutate, isLoading, isProblem, Problem } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/users/follow/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to follow");
        console.log(data);
        return data;
      } catch (error) {
        console.error("Error posting:", error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Successfully followed/unfollowed");
      location.reload(); //reloads page
    },

    onError: () => {
      toast.error("Failed to follow");
    },
  });

  const handleToggle = () => {
    mutate();
  };

  return (
    <Box>
      {isFollowing ? (
        <IconButton size="small" sx={{ mr: 3 }} onClick={handleToggle}>
          <CheckIcon sx={{ fontSize: 20 }} />
        </IconButton>
      ) : (
        <IconButton size="small" sx={{ mr: 3 }} onClick={handleToggle}>
          <AddIcon sx={{ fontSize: 20 }} />
        </IconButton>
      )}
    </Box>
  );
}

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
        <CustomButton href="/Profile">Edit Profile</CustomButton>
      </CardContent>
    </Card>
  );
}

// Recommendations Component
export function RecommendationsCard() {
  const {
    mutate: fetchRecommendations,
    data: Recommendations = [],
    isError,
    error,
  } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/users/suggested", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch recommendations");
      }
      return res.json();
    },
  });

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  if (isError) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

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
        <Box
          sx={{
            flexDirection: "column",
            width: 200,
          }}
        >
          {Recommendations.map((recommendation) => (
            <Box key={recommendation.username}>
              <Box display="flex" alignItems="center" mb={1}>
                <Avatar
                  sx={{ width: 30, height: 30, borderRadius: "50%" }}
                  src={recommendation.profileImg || "/profile-picture.jpg"}
                  alt={`Profile picture`}
                />
                <Box ml={2} sx={{ flexGrow: 1, width: 200 }}>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {recommendation.fullName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    @{recommendation.username}
                  </Typography>
                </Box>
                <FollowButton id={recommendation._id} />
              </Box>
              <Divider sx={{ mb: 2, mr: 4 }} />
            </Box>
          ))}
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
  const [formPost, setFormPost] = useState({
    text: "",
  });

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async ({ text }) => {
      try {
        const res = await fetch("/api/posts/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to post");
        console.log(data);
        return data;
      } catch (error) {
        console.error("Error posting:", error);
        throw error;
      }
    },

    onSuccess: () => {
      toast.success("Posted successfully");
      setFormPost({ text: "" });
      location.reload(); //reloads page
    },

    onError: () => {
      toast.error("Failed to post");
    },
  });

  const handlePostSubmit = (e) => {
    e.preventDefault();
    mutate(formPost);
  };

  const handleInputChange = (e) => {
    setFormPost({ ...formPost, [e.target.name]: e.target.value });
  };

  return (
    <Card sx={{ ...cardStyle, padding: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          What's New
        </Typography>
        <TextField
          required
          name="text"
          variant="outlined"
          sx={{ width: "100%", mb: 1 }}
          placeholder="What's on your mind..."
          multiline
          rows={2}
          value={formPost.text}
          onChange={handleInputChange}
        />
        <Button
          onClick={handlePostSubmit}
          variant="contained"
          color="primary"
          sx={{
            fontWeight: "bold",
            width: "80px",
            color: "white",
            borderRadius: "17px",
            boxShadow: 2,
            padding: 1.2,
            textTransform: "none", // Prevent uppercase transformation
          }}
          disabled={isLoading}
        >
          {isLoading ? "Posting..." : "Yap"}
        </Button>
        {isError && <Typography color="error">{error.message}</Typography>}
      </CardContent>
    </Card>
  );
}

// Feed Component
export function FeedCard() {
  const {
    mutate: fetchPost,
    data: posts = [],
    isError,
    error,
  } = useMutation({
    mutationFn: async () => {
      const res = await fetch("api/posts/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      return res.json();
    },
  });

  const [openReplyField, setOpenReplyField] = useState(null);
  const [openCommentField, setOpenCommentField] = useState({});

  const handleReplyButtonClick = (postId) => {
    setOpenReplyField(postId);
  };

  const handleCancelButtonClick = () => {
    setOpenReplyField(null);
  };

  const handleCommentButtonClick = (postId) => {
    setOpenCommentField((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (isError) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  return (
    <Box>
      {posts.map((post) => (
        <Card key={post._id} sx={{ p: 2, mb: 2 }}>
          <CardContent>
            <Box>
              <Box display="flex" alignItems="center">
                <Avatar
                  sx={{ width: 30, height: 30 }}
                  src={post.user.profileImg || "/profile-picture.jpg"}
                  alt={`${post.user.username}'s profile picture`}
                />
                <Box ml={2} display="flex" alignItems="center" flexGrow={1}>
                  <Box>
                    <Box display="flex" alignItems="center">
                      <Typography
                        variant="h7"
                        sx={{ fontWeight: "bold", mr: 1 }}
                      >
                        {post.user.fullName || "Name"}
                      </Typography>
                      <FollowButton id={post.user._id} />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      @{post.user.username || "username"}
                    </Typography>
                  </Box>
                </Box>
                <DeletePost id={post._id} />
              </Box>

              <Divider sx={{ mb: 2, mt: 2 }} />
              <Typography variant="body2" color="text.secondary">
                {post.text || "text"}
              </Typography>

              <Divider sx={{ mt: 2, mb: 2 }} />

              {openReplyField !== post._id ? (
                <Grid container spacing={1}>
                  <Grid item>
                    <IconButton size="small" sx={{ mr: 3 }}>
                      <FavoriteIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton
                      size="small"
                      sx={{ mr: 3 }}
                      onClick={() => handleCommentButtonClick(post._id)}
                    >
                      <CommentIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleReplyButtonClick(post._id)}
                      sx={{
                        fontWeight: "bold",
                        width: "100px",
                        color: "white",
                        borderRadius: "17px",
                        boxShadow: 2,
                        padding: 1.2,
                        textTransform: "none",
                      }}
                    >
                      Reply
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                <PostComment
                  id={post._id}
                  handleCancel={handleCancelButtonClick}
                />
              )}
            </Box>
            {openCommentField[post._id] && (
              <Comments id={post._id} coms={post.comments} />
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

//Delete Post
export function DeletePost({ id, onPostDeleted }) {
  const {
    mutate: deletePost,
    isError,
    error,
  } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`api/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`Failed to delete post: ${res.statusText}`);
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Successfully Deleted Posts");
      location.reload(); //reloads page
      if (onPostDeleted) {
        onPostDeleted();
      }
    },
  });

  return (
    <IconButton size="small" sx={{ mr: 3 }} onClick={() => deletePost()}>
      <DeleteIcon sx={{ fontSize: 20 }} />
    </IconButton>
  );
}

//Delete Notif
export function DeleteNotif({}) {
  const {
    mutate: deletePost,
    isError,
    error,
  } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`api/notifications`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`Failed to delete post: ${res.statusText}`);
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Successfully Deleted Notifications");
      location.reload(); //reloads page
      if (onPostDeleted) {
        onPostDeleted();
      }
    },
  });

  return (
    <IconButton size="small" sx={{ mr: 3 }} onClick={() => deletePost()}>
      <DeleteIcon sx={{ fontSize: 20 }} />
    </IconButton>
  );
}

//Comments under Posts
export function Comments({ id }) {
  const {
    mutate: fetchComments,
    data: comments = [],
    isError,
    error,
  } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`api/posts/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch comments");
      }
      const posts = await res.json();
      // Find the post by id and return its comments
      const post = posts.find((post) => post._id === id);
      return post ? post.comments : [];
    },
  });

  useEffect(() => {
    fetchComments();
  }, [fetchComments, id]);

  if (isError) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  return (
    <Box sx={{ maxHeight: "650px", overflowY: "auto", ml: 1 }}>
      <Divider sx={{ my: 2 }} />
      {comments.map((comment) => (
        <Box key={comment._id} mb={2}>
          <Box display="flex" alignItems="center">
            <Avatar
              sx={{ width: 40, height: 40, borderRadius: "50%" }}
              src={comment.user.profileImg || "/profile-picture.jpg"}
              alt={`${comment.user.username}'s profile picture`}
            />
            <Box ml={2} sx={{ flexGrow: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {comment.user.fullName || "Name"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                @{comment.user.username || "username"}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary" mt={1}>
            {comment.text || "Comment text"}
          </Typography>
          <Divider sx={{ my: 2 }} />
        </Box>
      ))}
    </Box>
  );
}

//Posting comments
export function PostComment({ id, handleCancel }) {
  const [formComment, setFormComment] = useState({
    text: "",
  });

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async ({ text }) => {
      try {
        const res = await fetch(`api/posts/comment/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to comment");
        console.log(data);
        return data;
      } catch (error) {
        console.error("Error posting:", error);
        throw error;
      }
    },

    onSuccess: () => {
      toast.success("Posted successfully");
      setFormComment({ text: "" });
      location.reload(); //reloads page
    },

    onError: () => {
      toast.error("Failed to post");
    },
  });

  const handlePostSubmit = (e) => {
    e.preventDefault();
    mutate(formComment);
  };

  const handleInputChange = (e) => {
    setFormComment({ ...formComment, [e.target.name]: e.target.value });
  };

  return (
    <Box display="flex" alignItems="center">
      <TextField
        variant="outlined"
        sx={{ flexGrow: 1, mr: 1 }}
        placeholder="Reply"
        multiline
        name="text"
        value={formComment.text}
        onChange={handleInputChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCancel}
        sx={{
          fontWeight: "bold",
          width: "100px",
          color: "white",
          borderRadius: "17px",
          boxShadow: 2,
          padding: 1.2,
          textTransform: "none",
          mr: 2,
        }}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handlePostSubmit}
        sx={{
          fontWeight: "bold",
          width: "100px",
          color: "white",
          borderRadius: "17px",
          boxShadow: 2,
          padding: 1.2,
          textTransform: "none",
        }}
        disabled={isLoading}
      >
        Post
      </Button>
    </Box>
  );
}

// Notifications Component
export function NotificationsCard() {
  const {
    mutate: fetchNotif,
    data: notifications = [],
    isError,
    error,
  } = useMutation({
    mutationFn: async () => {
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
  });

  useEffect(() => {
    fetchNotif();
  }, [fetchNotif]);

  if (isError) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  return (
    <Card sx={{ ...cardStyle, height: 780 }}>
      <CardContent justifyContent="center">
        <Box display="flex" alignItems="center">
          <Box ml={2} display="flex" alignItems="center" flexGrow={1}>
            <Box>
              <Box display="flex" alignItems="center">
                <Typography variant="h6" sx={{ fontWeight: "bold", mr: 1 }}>
                  Notifications
                </Typography>
              </Box>
            </Box>
          </Box>
          <DeleteNotif />
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ maxHeight: "650px", overflowY: "auto", ml: 1 }}>
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
