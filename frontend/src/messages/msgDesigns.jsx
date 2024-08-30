import React from 'react';
import { Avatar, Box, Divider, IconButton, Paper, TextField, Typography } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';


export const SendMessage = () => {
  return (
    <Box
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
      />
  </Box>
  )
}

export const UserChatBubble = ({ message, isSender }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isSender ? 'flex-end' : 'flex-start',
        mb: 2,
        mr: 1,
        ml: 1
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: '70%',
          padding: 1.7,
          borderRadius: '20px',
          backgroundColor: isSender ? '#C397DA' : '#C6C6C6',
          color: '#fff',
          borderBottomRightRadius: isSender ? '0' : '20px',
          borderBottomLeftRadius: isSender ? '20px' : '0',
          border: '1px solid #79747E',  
          boxShadow: 3,
        }}
      >
        <Typography variant="body1">{message}</Typography>
      </Paper>
    </Box>
  );
};

export const MsgFriendList = ({avatarsrc, name, userid}) => {
  return (
      <>
        <Box display="flex" alignItems="center" mb={1} sx={{ m: 2, ml: 4 }}>
        <Avatar
          sx={{ width: 40, height: 40, mr: 1 }}
          src={avatarsrc}
          alt="Profile Picture" />
        <Box ml={2} sx={{ flexGrow: 1 }}>
          <Typography variant="h7" sx={{ fontWeight: "bold" }}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            @{userid}
          </Typography>
        </Box>

        <Box>
          <IconButton>
            <MoreVertIcon/>
          </IconButton>
        </Box>
      </Box>
    <Divider />
    </>
  )
}
