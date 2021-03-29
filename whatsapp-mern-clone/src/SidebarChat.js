import { Avatar } from '@material-ui/core';
import React from 'react';
import './SidebarChat.css';

function SidebarChat() {
    return (
        <div className="sidebarChat">
            <Avatar />
            <div className="sidebarChat_info">
                <h2>ROOM NAME</h2>
                <p>Message...</p>
            </div>
        </div>
    )
}

export default SidebarChat
