import React, { useEffect, useState } from 'react'
import ChatBubble from '../../components/chat/chat.bubble'
import { Avatar, Box, Button, InputBase, Skeleton } from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { getResponse } from '../../services/ai-response';

const ContinuedPage = ({ firstInput }) => {
    const [chatHistory, setChatHistory] = useState([]);
    const [currMessage, setCurrMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        if (!isLoading)
            handleResponse(firstInput, true)
    }, [firstInput])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!currMessage.trim()) return;
        handleResponse(currMessage)
    };
    
    const handleResponse = async (currMessage, clear) => {
        setIsLoading(true)
        if (clear)
            setChatHistory(() => ([{
        message: currMessage, isResponse: false
    }]));
    else {
        setChatHistory(p => ([...p, {
            message: currMessage, isResponse: false
        }]));
        setCurrMessage("");
    }
    // API Call here
    let res;
    try {
            res = await getResponse(currMessage)
            setChatHistory(p=>([...p,{
                message: res,
                isResponse: true
            }]))
        } catch (error) {
            console.log('error: ', error)
        }
        setIsLoading(false)
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };


    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            height={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
            pl={'90px'} pr={'90px'}>
            <Box width={"100%"} height={'calc(100% - 64px)'} overflow={'auto'} pt={2} >
                {chatHistory.map((data, index) => {
                    return <ChatBubble data={data} key={index} />
                })}
                {isLoading &&
                    <Box
                        className={`chat-row left`}
                        flexDirection={'row'}
                        alignItems={'center'}
                        justifyContent={'center'}>
                        <Avatar sx={{ height: 36, width: 36, background: 'linear-gradient(135deg, #6366f1, #a855f7)' }} >
                            <AutoAwesomeIcon fontSize='1.25' />
                        </Avatar>
                        <div className={`chat-bubble response`}>
                            <Skeleton sx={{ minWidth: '200px' }} />
                            <Skeleton sx={{ width: '75%' }} />
                        </div>
                    </Box>
                }
            </Box>
            <Box
                className="ai-input-wrapper"
                display={'flex'}
                alignItems={'end'}
                justifyContent={'center'}
                boxShadow={'border-box'}
                width={'100%'}
                mt={2} mb={2} >
                <InputBase
                    multiline
                    disabled={isLoading}
                    className="ai-textarea"
                    placeholder={isLoading ? "Genrating Response, Please Wait!!" : "Type your message... (Shift + Enter for new line)"}
                    value={currMessage}
                    maxRows={4}
                    onChange={(e) => setCurrMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    fullWidth
                />
                {currMessage.length > 0 &&
                    <Button
                        onClick={handleSubmit}
                        sx={{ outline: 'none !important', background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
                        variant="contained"
                        className="ai-send-btn">
                        <span className="ai-plane">➤</span>
                    </Button>
                }
            </Box>
        </Box>
    )
}

export default ContinuedPage

