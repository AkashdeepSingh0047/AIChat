import React from "react";
import { Avatar, Box, Typography } from '@mui/material';
import "./ChatBubble.css";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const ChatBubble = ({ data }) => {
  const isResponse = data.isResponse;

  return (
    <Box className={`chat-row ${isResponse ? "left" : "right"}`} flexDirection={isResponse ? 'row-reverse' : 'row'} alignItems={'center'} justifyContent={'center'}>
      <div className={`chat-bubble ${isResponse ? "response" : "input"}`}>
        <Typography textAlign={'left'} sx={{ whiteSpace: 'pre-wrap' }} className="chat-name">{data.message}</Typography>
      </div>
      <Avatar sx={{ height: 36, width: 36, background: 'linear-gradient(135deg, #6366f1, #a855f7)' }} children={isResponse ? <AutoAwesomeIcon fontSize='none !important' /> : null} />
    </Box>
  );
};

export default ChatBubble;
