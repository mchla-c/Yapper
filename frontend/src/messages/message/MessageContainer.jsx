import { useEffect } from "react"
import useConversation from "../../zustand/useConversation"
import { useAuthContext } from "../../context/AuthContext"
import { Box, Card, Divider, Typography } from "@mui/material"
import Messages from "./Messages"
import { CarCrash } from "@mui/icons-material"
import { cardStyle } from "../../components/styles"
import MessageInput from "./MessageInput"


const MessageContainer = () => {
    const {selectedConversation, setSelectedConversation} = useConversation()

    useEffect(() => {
        return () => setSelectedConversation(null)
    }, [setSelectedConversation])

    return (
        <Card
            sx={[
            cardStyle,
            {
                flex: 2,
                display: "flex",
                flexDirection: "column",
                height: '100%',
                p: 1
            },
            ]}
        >
            {!selectedConversation ? (
                <NoChatSelected/>
            ) :
            ( <>
            <Typography variant="h5" sx={{ fontWeight: "bold", p: 2 }}>
                To: {selectedConversation.fullName}
            </Typography>
            <Divider />
            <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                maxHeight: "460px",
                width: "100%",
                minHeight: '75%'
            }}
            >
                <Box
                sx={{flexGrow: 1,
                    overflowY: "auto",
                    display: "flex",}}>
                    <Messages/>
                </Box>
            </Box>

                <Box>
                    <MessageInput/>
                </Box>
            
            </>)}
        </Card>
    )
}

export default MessageContainer

const NoChatSelected = () => {

    return (
        <Box sx={{m: '0 auto'}}>
            <Typography variant="h5" sx={{ fontWeight: "bold", p: 2 }}>Select a chat to start messaging</Typography>
        </Box>
    )
}