import React, { useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFileOutlined, MicNone, MoreVertOutlined, SearchOutlined, SentimentVerySatisfied } from '@material-ui/icons';
import './Chat.css';
import axios from "./axios";

function Chat({ messages }) {
    const [input, setInput] = useState("");
    const sendMessage = async (e) => {
        e.preventDefault();

        await axios.post('/messages/new', {
            "message": input,
            "name":"Mario Bros",
            "timestamp":"Today",
            "received": false,
        });

        setInput('');
    };

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar />
            
            <div className="chat_headerInfo">
                <h3>Room Name</h3>
                <p>Lorem ipsum....</p>
            </div>

            <div className="chat_headrRight">
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <IconButton>
                    <AttachFileOutlined />
                </IconButton>
                <IconButton>
                    <MoreVertOutlined />
                </IconButton>
              </div>
            </div>

            <div className="chat_body">
                {messages.map(message => (
                    <p className={`chat_message ${message.received && "chat_receiver"}`}>
                    <span className="chat_name">{message.name}</span>
                    {message.message}
                    <span className="chat_timestamp">{message.timestamp}</span>
                    </p>
                ))}
            </div>

            <div className="chat_footer">
                <SentimentVerySatisfied />
                <form>
                <input value={input} onChange={e => setInput(e.target.value)} placeholder="Your Message..." type="text" />
                    <button onClick={sendMessage} type="submit">
                        SEND MESSAGE
                    </button>
                </form>
                <MicNone />
            </div>
        </div>
    )
}

export default Chat
