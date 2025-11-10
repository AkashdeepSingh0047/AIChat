// Import React and useState hook for managing local input state
import React, { useState } from "react";
// Import Material UI components for layout and input styling
import { Box, Button, InputBase } from '@mui/material';

// Functional component to capture the user's first input message
const InitialSubmitForm = (props) => {
  // Local state to store the user's current input
  const [message, setMessage] = useState("");

  /**
   * Handles form submission.
   * Prevents page refresh, validates input, sends data to parent (Home),
   * and clears the input field afterward.
   */
  const handleSubmit = (e) => {
    e.preventDefault();               // Prevent default form submission behavior
    if (!message.trim()) return;      // Stop if message is empty or only spaces
    props.setFirstInput(message);     // Pass message up to parent component (Home)
    setMessage("");                   // Clear input field after submission
  };

  /**
   * Detects keyboard events inside the input.
   * Allows pressing Enter to send message,
   * while Shift + Enter adds a new line.
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();             // Prevent newline when sending message
      handleSubmit(e);                // Trigger submit function
    }
  };

  return (
    // Wrapper box containing the text input and send button
    <Box
      className="ai-input-wrapper"
      display={'flex'}
      alignItems={'end'}
      justifyContent={'center'}
    >
      {/* Multiline text input for user message */}
      <InputBase
        multiline
        className="ai-textarea"
        placeholder="Type your message... (Shift + Enter for new line)"
        value={message}               // Controlled input value
        maxRows={4}                   // Limit visible rows to 4
        onChange={(e) => setMessage(e.target.value)}  // Update message on typing
        onKeyDown={handleKeyDown}     // Handle Enter / Shift+Enter behavior
        fullWidth                     // Expand input to full available width
      />

      {/* Send button appears only if user has typed something */}
      {message.length > 0 && (
        <Button
          onClick={handleSubmit}      // Trigger submit on click
          sx={{
            outline: 'none !important',
            background: "linear-gradient(135deg, #6366f1, #a855f7)"
          }}
          variant="contained"
          className="ai-send-btn"
        >
          <span className="ai-plane">➤</span> {/* Paper plane icon for send */}
        </Button>
      )}
    </Box>
  )
}

// Exporting component so it can be used in InitialPage.jsx
export default InitialSubmitForm;
