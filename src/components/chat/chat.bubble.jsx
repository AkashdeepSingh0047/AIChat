// Import React library for building UI components
import React from "react";
// Import Material UI components for layout and styling
import { Avatar, Box, Typography } from '@mui/material';
// Import custom CSS for additional bubble styling
import "./chat.bubble.css";
// Import the sparkle icon for AI responses
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

// Functional component to render each chat bubble (user or AI message)
const ChatBubble = ({ data }) => {
  // Check whether this message is from AI (response) or user (input)
  const isResponse = data.isResponse;

  return (
    // The main container for each chat message row
    // Adds "left" or "right" class based on message type
    <Box
      className={`chat-row ${isResponse ? "left" : "right"}`}
      flexDirection={isResponse ? 'row-reverse' : 'row'} // Reverse direction for AI messages
      alignItems={'center'}
      justifyContent={'center'}
    >
      {/* Chat bubble container that holds the text message */}
      <div className={`chat-bubble ${isResponse ? "response" : "input"}`}>
        {/* Typography ensures proper text wrapping and left alignment */}
        <Typography
          textAlign={'left'}
          sx={{ whiteSpace: 'pre-wrap' }} // Keeps line breaks and spacing
          className="chat-name"
        >
          {data.message}
        </Typography>
      </div>

      {/* Avatar shown beside the bubble:
          - For AI: shows gradient background + sparkle icon
          - For user: shows gradient background but no icon */}
      <Avatar
        sx={{
          height: 36,
          width: 36,
          background: 'linear-gradient(135deg, #6366f1, #a855f7)'
        }}
        children={
          isResponse ? (
            <AutoAwesomeIcon fontSize='none !important' />
          ) : null
        }
      />
    </Box>
  );
};

// Exporting ChatBubble so it can be reused in the main chat component
export default ChatBubble;
