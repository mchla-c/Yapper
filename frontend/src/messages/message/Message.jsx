import { Box, Paper, Typography } from "@mui/material"
import { useAuthContext } from "../../context/AuthContext"
import { extractTime } from "../../utils/extractTime"
import useConversation from "../../zustand/useConversation"


const Message = ({message}) => {
    const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profileImg = fromMe ? authUser.profileImg : selectedConversation.profileImg
    const bubbleBgColor = fromMe ? '#B79BB9' : '#ACB99B'

    // const shakeClass = message.shouldShake ? "shake" : ""

    return (
        <Box
        sx={{
            display: 'flex',
            justifyContent: bubbleBgColor,
            mb: 2,
            mr: 1,
            ml: 1
        }}
        className={`chat ${chatClassName}`}
        >
            <Paper
                elevation={3}
                sx={{
                maxWidth: '70%',
                padding: 1.7,
                borderRadius: '20px',
                backgroundColor: isSender ? '#B79BB9' : '#ACB99B',
                color: '#fff',
                borderBottomRightRadius: fromMe ? '0' : '20px',
                borderBottomLeftRadius: fromMe ? '20px' : '0',
                border: '1px solid #79747E',  
                boxShadow: 3,
                }}
            >
                <Typography variant="body1">{message.message}</Typography>
            </Paper>
            <Typography variant="caption">{formattedTime}</Typography>
        </Box>
    )
}

export default Message