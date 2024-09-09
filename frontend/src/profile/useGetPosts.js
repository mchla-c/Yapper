import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetPosts = () => {
    // const getPostEndpoint = () => {
    //     switch (feedType) {
    //       case "posts":
    //         return `/api/posts/user/${username}`;
    //       case "likes":
    //         return `/api/posts/likes/${userId}`;
    //       default:
    //         return `/api/posts/user/${username}`;
    //     }
    //   };
    
    // const POST_ENDPOINT = getPostEndpoint();
    const { data: user } = useQuery({ queryKey: ["userProfile"] });

	const [loading, setLoading] = useState(false);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const getPosts = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/posts/likes/${user?._id}`);
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				setPosts(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getPosts();
	}, []);

	return { loading, posts };
};
export default useGetPosts;