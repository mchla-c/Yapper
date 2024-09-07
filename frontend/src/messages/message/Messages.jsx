import { useEffect, useRef } from "react"
import useGetMessages from "../hooks/useGetMessages"
import useListenMessages from "../hooks/useListenMessages"
import { Box, Typography } from "@mui/material"
import Message from "./Message"

const Messages = () => {
  const {messages, loading} = useGetMessages()
  useListenMessages()
  const lastMessageRef = useRef()

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
    })
  }, [messages])

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        padding: 2,
      }}
    >
      {!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<Box key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</Box>
				))}

      {!loading && messages.length === 0 && (
				<Typography>Send a message to start the conversation</Typography>
			)}
    </Box>
  )

}

export default Messages