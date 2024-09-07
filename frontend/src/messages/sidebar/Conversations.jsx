import { Box, Typography } from "@mui/material"
import useGetConversations from "../hooks/useGetConversation"
import Conversation from "./Conversation"

const Conversations = () => {
    const {loading, conversations} = useGetConversations()

    return (
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
              {/* Friends content */}
              {conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					lastIdx={idx === conversations.length - 1}
				/>
			))}

            {loading ? <Typography> LOADING</Typography> : null}
        </Box>
    )
}

export default Conversations