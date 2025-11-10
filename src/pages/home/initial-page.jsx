// Importing React library and useState hook (though not used here)
import React, { useState } from 'react'
// Importing the sparkle icon from Material UI Icons
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
// Importing the custom form component that handles initial user input
import InitialSubmitForm from '../../components/initial-submit-form/initial-submit-form';

// Functional component that renders the initial landing page of the AI Chat app
function InitialPage(props) {
  return (
    // Outer container that centers the card visually
    <div className="ai-page">
      
      {/* Card container that holds the icon, title, form, and disclaimer */}
      <div className="ai-card">
        
        {/* Top icon inside a styled circle or gradient background */}
        <div className="ai-icon">
          <AutoAwesomeIcon fontSize='30px' />
        </div>

        {/* Heading that welcomes the user */}
        <h1 className="ai-title">Welcome to AI Chat</h1>

        {/* Custom form component to capture user's first message or prompt */}
        <InitialSubmitForm setFirstInput={props.setFirstInput} />

        {/* Disclaimer reminding user that AI outputs may not always be accurate */}
        <p className="ai-disclaimer">
          AI can make mistakes. Please verify important information.
        </p>
      </div>
    </div>
  );
}

// Exporting the component so it can be imported and used in other files
export default InitialPage;
