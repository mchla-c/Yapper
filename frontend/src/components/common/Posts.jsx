import Post from "./Post";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Card } from "@mui/material";
import { cardStyle } from "../styles";

const Posts = ({ feedType, username, userId }) => {
  const getPostEndpoint = () => {
    switch (feedType) {
      case "forYou":
        return "/api/posts/all";
      case "following":
        return "/api/posts/following";
      case "posts":
        return `/api/posts/user/${username}`;
      case "likes":
        return `/api/posts/likes/${userId}`;
      default:
        return "/api/posts/all";
    }
  };

  const POST_ENDPOINT = getPostEndpoint();

  const {
    data: posts,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const res = await fetch(POST_ENDPOINT);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [feedType, refetch, username]);

  return (
    <>
      {!isLoading && !isRefetching && feedType === "following" && (
        <Card sx={{ ...cardStyle, mb: 2, padding: 2 }}>
          <p>Posts from Friends</p>
        </Card>
      )}
      {!isLoading && !isRefetching && posts?.length === 0 && (
        <Card sx={{ ...cardStyle, mb: 2, padding: 2 }}>
          <p>No posts Available</p>
        </Card>
      )}
      {!isLoading && !isRefetching && posts && (
        <div>
          {posts.map((post) => (
            <Card sx={{ ...cardStyle, mb: 2, padding: 2 }}>
              <Post key={post._id} post={post} />
            </Card>
          ))}
        </div>
      )}
    </>
  );
};
export default Posts;
