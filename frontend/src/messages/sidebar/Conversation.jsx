import useConversation from "../../zustand/useConversation"
import { useSocketContext } from "../../context/SocketContext";
import { Avatar, Box, Divider, IconButton, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Conversation = ({conversation, lastIdx}) => {
    const {selectedConversation, setSelectedConversation} = useConversation()

    const isSelected = selectedConversation?._id === Conversation._id
    // const {onlineUsers} = useSocketContext()
    // const isOnline = onlineUsers.includes(conversation._id)

    return (
        <>
            <Box 
                display="flex" 
                alignItems="center" 
                mb={1} 
                width='100%'
                sx={{ p:2, 
                    borderRadius: '5px',
                    cursor: 'pointer',
                    '&:hover': {
                    backgroundColor: '#C6C6C6',  
                    },
                    backgroundColor: `${isSelected ? "#C6C6C6" : ""}`
                 }}
                onClick={() => setSelectedConversation(conversation)}>
                <Avatar
                    sx={{ width: 40, height: 40, mr: 1 }}
                    src={conversation.profileImg}
                    alt="Profile Picture" />
                <Box ml={2} sx={{ flexGrow: 1 }}>
                    <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                        {conversation.fullName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        @{conversation.username}
                    </Typography>
                </Box>

                <Box>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </Box>
            </Box>

            {!lastIdx && <Divider />}
        </>
    )
}

export default Conversation