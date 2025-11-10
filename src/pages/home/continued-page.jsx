// continued-page.jsx
import React, { useEffect, useRef, useState } from 'react'
import ChatBubble from '../../components/chat/chat.bubble'
import { Avatar, Box, Button, InputBase, Skeleton } from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { getResponse } from '../../services/ai-response';
import { toast } from 'react-toastify';

// import component-specific styles
import './continued-page.css';

const ContinuedPage = ({ firstInput, setFirstInput }) => {
    // complete chat history (user + AI messages)
    const [chatHistory, setChatHistory] = useState([]);
    // current text inside the input box
    const [currMessage, setCurrMessage] = useState("");
    // flag to show loading skeleton and disable input
    const [isLoading, setIsLoading] = useState(false);
    // ref to scroll to the latest AI response while loading
    const loadingResponseRef = useRef();

    // when firstInput changes, send it once as the first message
    useEffect(() => {
        if (!isLoading) {
            handleResponse(firstInput, true);
        }
    }, [firstInput]);

    // handle send button click / form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!currMessage.trim()) return;

        // scroll to loading bubble smoothly (slight delay so DOM can update)
        setTimeout(() => {
            loadingResponseRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 50);

        handleResponse(currMessage);
    };

    /**
     * Call the AI API and update chat history.
     * @param {string} currMessage - message to send to the API
     * @param {boolean} clear - if true, reset chat with this as the first message
     */
    const handleResponse = async (currMessage, clear) => {
        setIsLoading(true);

        if (clear) {
            // start a new chat with the initial user message
            setChatHistory(() => ([
                { message: currMessage, isResponse: false }
            ]));
        } else {
            // append user message to existing history
            setChatHistory(prev => ([
                ...prev,
                { message: currMessage, isResponse: false }
            ]));
            setCurrMessage("");
        }

        try {
            // API call to get AI response
            const res = await getResponse(currMessage);
            setChatHistory(prev => ([
                ...prev,
                {
                    message: res,
                    isResponse: true
                }
            ]));
        } catch (error) {
            console.log('error: ', error.message);
            toast.error(getErrorMessage(error?.error?.message || error?.message));
        }

        setIsLoading(false);
    };

    /**
     * Normalize API error messages into something readable for user.
     */
    const getErrorMessage = (error) => {
        if (error && error?.includes("Incorrect API key provided"))
            return "Incorrect API key provided.";
        else if (error)
            return error;
        return "Error With API key of OpenAi";
    };

    /**
     * Clear chat and reset firstInput so the parent can update as well.
     */
    const handleClear = () => {
        setFirstInput('');
        setChatHistory([]);
    };

    /**
     * Allow Enter to send and Shift+Enter to create a new line.
     */
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <>
            {/* Top navigation / header bar */}
            <Box className="ai-header">
                {/* Icon with gradient background */}
                <Box className="ai-header-icon-wrapper">
                    <AutoAwesomeIcon className="ai-header-icon" />
                </Box>

                {/* Title text to the right of the icon */}
                <Box className="ai-header-title">
                    AI Chat
                </Box>

                {/* Clear chat button on the right */}
                <Box className="ai-header-clear" onClick={handleClear}>
                    <Button
                        color="error"
                        variant="outlined"
                        className="ai-clear-btn"
                    >
                        <DeleteOutlineIcon /> Clear
                    </Button>
                </Box>
            </Box>

            {/* Main layout: scrollable chat + input area */}
            <Box className="ai-main">
                {/* Scrollable chat history area */}
                <Box className="ai-chat-history">
                    {chatHistory.map((data, index) => (
                        <ChatBubble data={data} key={index} />
                    ))}

                    {/* Loading state: AI "typing" skeleton bubble */}
                    {isLoading &&
                        <Box
                            ref={loadingResponseRef}
                            className={`chat-row left`}
                            flexDirection={'row'}
                            alignItems={'center'}
                            justifyContent={'center'}
                        >
                            <Avatar className="ai-avatar">
                                <AutoAwesomeIcon fontSize="1.25" />
                            </Avatar>
                            <div className={`chat-bubble response`}>
                                <Skeleton sx={{ minWidth: '200px' }} />
                                <Skeleton sx={{ width: '75%' }} />
                            </div>
                        </Box>
                    }
                </Box>

                {/* Message input + send button */}
                <Box
                    className="ai-input-wrapper"
                >
                    <InputBase
                        multiline
                        disabled={isLoading}
                        className="ai-textarea"
                        placeholder={
                            isLoading
                                ? "Genrating Response, Please Wait!!"
                                : "Type your message... (Shift + Enter for new line)"
                        }
                        value={currMessage}
                        maxRows={4}
                        onChange={(e) => setCurrMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        fullWidth
                    />
                    {currMessage.length > 0 &&
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            className="ai-send-btn"
                        >
                            <span className="ai-plane">➤</span>
                        </Button>
                    }
                </Box>
            </Box>
        </>
    )
}

export default ContinuedPage
