import React, { useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  IconButton,
  TextField,
  Avatar,
  CircularProgress,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-hot-toast";
import { cardStyle } from "../styles";

export function CreatePost() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const imgRef = useRef(null);

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();
  const theme = useTheme();

  const {
    mutate: createPost,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ text, img }) => {
      try {
        const res = await fetch("/api/posts/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text, img }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },

    onSuccess: () => {
      setText("");
      setImg(null);
      toast.success("Post created successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost({ text, img });
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card sx={{ ...cardStyle, padding: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          What's New
        </Typography>
        <div
          style={{
            display: "flex",
          }}
        >
          <form
            style={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing(1),
            }}
            onSubmit={handleSubmit}
          >
            <TextField
              multiline
              variant="outlined"
              placeholder="What's on your mind..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              fullWidth
              InputProps={{
                style: { fontSize: "1rem" },
              }}
              sx={{ mb: 2 }}
            />
            {img && (
              <div style={{ position: "relative", width: 300 }}>
                <IconButton
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: theme.palette.grey[800],
                    color: theme.palette.common.white,
                  }}
                  onClick={() => {
                    setImg(null);
                    imgRef.current.value = null;
                  }}
                >
                  <IoCloseSharp />
                </IconButton>
                <img
                  src={img}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: 200,
                    objectFit: "contain",
                    borderRadius: theme.shape.borderRadius,
                  }}
                />
              </div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: `1px solid ${theme.palette.divider}`,
                paddingTop: theme.spacing(1),
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: theme.spacing(1),
                  alignItems: "center",
                }}
              >
                <IconButton
                  onClick={() => imgRef.current.click()}
                  color="primary"
                >
                  <CiImageOn />
                </IconButton>
              </div>
              <input
                type="file"
                accept="image/*"
                hidden
                ref={imgRef}
                onChange={handleImgChange}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  width: "80px",
                  color: "white",
                  borderRadius: "17px",
                  boxShadow: 2,
                  padding: 1.2,
                  textTransform: "none",
                }}
                disabled={isPending}
                endIcon={
                  isPending ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : null
                }
              >
                {isPending ? "Posting..." : "Yap"}
              </Button>
            </div>
            {isError && (
              <div style={{ color: theme.palette.error.main }}>
                {error.message}
              </div>
            )}
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
