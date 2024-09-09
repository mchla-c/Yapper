import { Box, IconButton, TextField } from "@mui/material"
import useGetPosts from "./useGetPosts"
import Posts from "../components/common/Posts"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import SearchIcon from '@mui/icons-material/Search';

const SearchProfile = ({search, setSearch, handleSearchSubmit }) => {
    // const [search, setSearch] = useState("")
    const {posts} = useGetPosts()
    const { data: user } = useQuery({ queryKey: ["userProfile"] });
    const [serachResults, setSearchResults] = useState([])


    // const handleSubmit = (e) => {
    //     e.preventDefault()

    //     if (!search) return

    //     if (search.length < 3) {
    //         return toast.error("Search term must be at least 3 characters long")
    //     }

    //     // const post = posts.find((c) =>c.likedPosts.toLowerCase().includes(search.toLowerCase()))

    //     const filteredPosts = posts.filter((post) =>
    //         post.likedPosts.toLowerCase().includes(search.toLowerCase())
    //     );
    
    //     if (filteredPosts.length === 0) {
    //         toast.error("No posts found matching your search");
    //     }
    
    //     setSearchResults(filteredPosts);
    // }

    return (
        <Box component="form" onSubmit={handleSearchSubmit} direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="center" sx={{mb: 2, ml: 2, mt:2}}>
            <TextField
            placeholder="Search..."
            label="Search" 
            variant="outlined" 
            size="small"
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            sx={{ marginLeft: "20px", width: "300px" }}
        />
        <IconButton type='submit' color="primary" aria-label="search">
            <SearchIcon />
        </IconButton>
      </Box>
    )
}

export default SearchProfile