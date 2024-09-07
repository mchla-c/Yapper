import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../hooks/useGetConversation';
import toast from 'react-hot-toast';

const SearchInput = () => {
    const [search, setSearch] = useState("")
    const {setSelectedConversation} = useConversation()
    const {conversations} = useGetConversations()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!search) return

        if (search.length < 3) {
            return toast.error("Search term must be at least 3 characters long")
        }

        const conversation = conversations.find((c) =>c.fullName.toLowerCase().includes(search.toLowerCase()))

        if (conversation) {
            setSelectedConversation(conversation)
            setSearch("")
        } else toast.error("No such user found!")
    }

    return (
        <Box component="form" onSubmit={handleSubmit} direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="center" sx={{mb: 2, ml: 2, mt:2}}>
            <TextField 
                label="Search" 
                variant="outlined" 
                size="small"
                value={search} 
                onChange={(e) => setSearch(e.target.value)}/>
            <IconButton type='submit' color="primary" aria-label="search">
                <SearchIcon />
            </IconButton>
        </Box>
    )
}

export default SearchInput