import { useState } from "react"
import useSendMessage from "../hooks/useSendMessage"
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Box, IconButton, TextField } from "@mui/material";

const MessageInput = () => {
    const [message, setMessage] = useState("")
    const {loading, sendMessage} = useSendMessage()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!message) return
        await sendMessage(message)
        setMessage("")
    }

    return (
        <Box
            component={'form'}
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'row-reverse',
                padding: 2,
                borderTop: '1px solid #ccc',
                alignItems: 'center',
            }}
        >
            <IconButton
                variant="contained"
                type="submit"
                sx={{marginLeft: '20px', marginRight: '20px',
                    color: 'white',
                    backgroundColor: 'primary.main',
                    width: 40,
                    height: 40,
                    borderRadius: 1,
                    '&:hover': {
                    backgroundColor: 'secondary.main',  // Optional hover effect
                    },
                }}>
                <SendRoundedIcon/>
            </IconButton>
            <TextField 
                variant="outlined" 
                size='small'
                placeholder="Type your message..." 
                sx={{ marginLeft: '20px', width: '600px'}} 
                value={message}
				onChange={(e) => setMessage(e.target.value)}
                />

        </Box>
    )
}

export default MessageInput