import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { cardStyle, containerStyle, CustomButton } from "../components/styles";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { MsgFriendList, SendMessage, UserChatBubble } from "./msgDesigns";

export default function Messages() {
  const messages = [
    { id: 1, text: "Hey there!", isUser: false },
    { id: 2, text: "Hi! How's it going?", isUser: true },
    { id: 3, text: "All good, thanks for asking!", isUser: false },
    { id: 4, text: "COOOLLLL", isUser: true },
    { id: 5, text: "Hey there!", isUser: false },
    { id: 6, text: "Hi! How's it going?", isUser: true },
    { id: 7, text: "All good, thanks for asking!", isUser: false },
    { id: 8, text: "COOOLLL!!!!L", isUser: true },
  ];

  return (
    <Box sx={[containerStyle, { display: "flex", height: "80vh" }]}>
      {/* Left Side - Friends List */}
      <Card
        sx={[
          cardStyle,
          {
            marginRight: 2,
            width: 320,
            flexDirection: "column",
          },
        ]}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", p: 2 }}>
          Friends
        </Typography>
        <Divider />
        {/* Add your friends list component here */}
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          {/* Friends content */}
          <MsgFriendList name={"John Doe"} userid={"johndoe"} />
        </Box>
      </Card>

      {/* Right Side - Messages */}
      <Card
        sx={[
          cardStyle,
          {
            flex: 2, // Takes up more space than the left side
            display: "flex",
            flexDirection: "column",
          },
        ]}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", p: 2 }}>
          Messages
        </Typography>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxHeight: "460px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              padding: 2,
            }}
          >
            {/* Messages content */}
            {messages.map((msg, index) => (
              <UserChatBubble
                key={index}
                message={msg.text}
                isSender={msg.isUser}
              />
            ))}
          </Box>
        </Box>
        <Divider />
        <SendMessage />
      </Card>
    </Box>
  );
}
