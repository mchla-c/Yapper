import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  Typography,
  Box,
  Divider,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  TextField,
} from "@mui/material";
import { FaRegComment, FaTrash } from "react-icons/fa";
import LoadingSpinner from "./LoadingSpinner";
import { formatPostDate } from "../../utils/date";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CustomButton } from "../styles";

const Post = ({ post }) => {
  const [comment, setComment] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();
  const postOwner = post.user;
  const isLiked = post.likes.includes(authUser._id);
  const isMyPost = authUser._id === post.user._id;
  const formattedDate = formatPostDate(post.createdAt);

  const { mutate: deletePost, isLoading: isDeleting } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/posts/${post._id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      return data;
    },
    onSuccess: () => {
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const { mutate: likePost, isLoading: isLiking } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/posts/like/${post._id}`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      return data;
    },
    onSuccess: (updatedLikes) => {
      queryClient.setQueryData(["posts"], (oldData) =>
        oldData.map((p) =>
          p._id === post._id ? { ...p, likes: updatedLikes } : p
        )
      );
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => toast.error(error.message),
  });

  const { mutate: commentPost, isLoading: isCommenting } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/posts/comment/${post._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: comment }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      return data;
    },
    onSuccess: () => {
      toast.success("Comment posted successfully");
      setComment("");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => toast.error(error.message),
  });

  const handleDeletePost = () => deletePost();
  const handleLikePost = () => !isLiking && likePost();
  const handlePostComment = (e) => {
    e.preventDefault();
    if (!isCommenting) commentPost();
  };

  return (
    <Box padding={2}>
      <Box display="flex" alignItems="center" flexGrow={1}>
        <Box>
          <Link
            to={`/profile/${postOwner.username}`}
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
                src={postOwner.profileImg || "/avatar-placeholder.png"}
                alt={postOwner.fullName}
                sx={{ width: 40, height: 40 }}
              />
              <Box ml={2}>
                <Typography
                  variant="subtitle1"
                  noWrap
                  sx={{ fontWeight: "bold", maxWidth: "180px" }}
                >
                  {postOwner.fullName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  @{postOwner.username}
                </Typography>
              </Box>
            </Box>
          </Link>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
          • {formattedDate}
        </Typography>
        {isMyPost && (
          <IconButton
            onClick={handleDeletePost}
            disabled={isDeleting}
            sx={{ ml: "auto" }}
          >
            {isDeleting ? <LoadingSpinner size="sm" /> : <FaTrash />}
          </IconButton>
        )}
      </Box>

      <Divider sx={{ mb: 2, mt: 2 }} />
      <Typography variant="body2" color="text.secondary">
        {post.text}
      </Typography>
      {post.img && <img src={post.img} alt="" style={{ maxWidth: 250 }} />}
      <Divider sx={{ mb: 2, mt: 2 }} />

      <Box display="flex" gap={2} alignItems="center">
        <IconButton onClick={() => setDialogOpen(true)}>
          <FaRegComment />
        </IconButton>
        <span>{post.comments.length}</span>

        <form
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            width: "100%",
          }}
          onClick={(e) => {
            e.preventDefault();
            handleLikePost();
          }}
          disabled={isLiking}
        >
          <IconButton
            type="submit"
            color={isLiked ? "error" : "default"}
            disabled={isLiking}
          >
            <FavoriteIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <span>{post.likes.length}</span>
        </form>
      </Box>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
              COMMENTS
            </Typography>
            <IconButton
              onClick={() => setDialogOpen(false)}
              sx={{ position: "absolute", right: 8, top: 8 }}
              color="secondary"
            >
              x
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <div style={{ maxHeight: "240px", overflowY: "auto" }}>
            {post.comments.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Be the first to Yap Back
              </Typography>
            ) : (
              post.comments.map((comment) => (
                <Box key={comment._id} display="flex" gap={2} mb={2}>
                  <Link
                    to={`/profile/${comment.user.username}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Avatar
                      src={comment.user.profileImg || "/avatar-placeholder.png"}
                      alt={comment.user.fullName}
                      sx={{ width: 32, height: 32 }}
                    />
                  </Link>
                  <Box>
                    <Link
                      to={`/profile/${comment.user.username}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography variant="body2">
                        <strong>{comment.user.fullName}</strong> @
                        {comment.user.username}
                      </Typography>
                    </Link>
                    <Typography variant="body2">{comment.text}</Typography>
                  </Box>
                </Box>
              ))
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <form
            style={{ display: "flex", gap: "8px", width: "100%" }}
            onSubmit={handlePostComment}
          >
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <CustomButton
              type="submit"
              color="primary"
              variant="contained"
              disabled={isCommenting}
            >
              {isCommenting ? <CircularProgress size={24} /> : "Yap Back"}
            </CustomButton>
          </form>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Post;
