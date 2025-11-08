import React, { useState } from "react";
import {Box, Button, InputBase} from '@mui/material';

const InitialSubmitForm = (props) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    props.setFirstInput(message);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (

      <Box className="ai-input-wrapper" display={'flex'} alignItems={'end'} justifyContent={'center'} >
        <InputBase
          multiline
          className="ai-textarea"
          placeholder="Type your message... (Shift + Enter for new line)"
          value={message}
          maxRows={4}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          fullWidth
        />
        {message.length > 0 && <Button onClick={handleSubmit} sx={{ outline: 'none !important', background: "linear-gradient(135deg, #6366f1, #a855f7)" }} variant="contained" className="ai-send-btn">
          <span className="ai-plane">➤</span>
        </Button>}
      </Box>
  )
}
export default InitialSubmitForm;