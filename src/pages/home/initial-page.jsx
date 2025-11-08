import React, { useState } from 'react'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import InitialSubmitForm from '../../components/initial-submit-form/initial-submit-form';

function InitialPage(props) {
  return (
    <div className="ai-page">
      <div className="ai-card">
        <div className="ai-icon">
          <AutoAwesomeIcon fontSize='30px' />
        </div>

        <h1 className="ai-title">Welcome to AI Chat</h1>

        <InitialSubmitForm setFirstInput={props.setFirstInput} />

        <p className="ai-disclaimer">
          AI can make mistakes. Please verify important information.
        </p>
      </div>
    </div>
  );
}

export default InitialPage;