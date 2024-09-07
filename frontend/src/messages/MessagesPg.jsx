import {
    Box,
    Button,
    Card,
    containerClasses,
    Divider,
    Grid,
    IconButton,
    Stack,
    TextField,
    Typography,
  } from "@mui/material";
  import React from "react";
  import SendRoundedIcon from "@mui/icons-material/SendRounded";
  import SearchIcon from '@mui/icons-material/Search';
import { cardStyle, containerStyle } from "../components/styles";
import Sidebar from "./sidebar/Sidebar";
import {UserChatBubble, SendMessage} from "./message/msgDesigns";
import MessageContainer from "./message/MessageContainer";
  
  
  export default function MessagesPg() {
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
      <Box sx={[containerStyle]}>
        <Grid container spacing={1} sx={{height: '630px'}}>
          {/* Left Side - Friends List */}
          <Grid item xs={12} md={3}>
            <Sidebar/>
          </Grid>
  
          {/* Right Side - Messages */}
          <Grid item xs={12} md={9}>
            <MessageContainer/>
          </Grid>
        </Grid>
      </Box>
  
    );
  }
  