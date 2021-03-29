import React from 'react';
import './Sidebar.css';
import RotateRightTwoToneIcon from '@material-ui/icons/RotateRightTwoTone';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';
import { Avatar, IconButton } from '@material-ui/core';
import SidebarChat from './SidebarChat.js';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src='https://www.terrainhopperusa.com/wp-content/uploads/2019/01/avatar-man.png'/>
                <div className="sidebar_headerRight">
                     <IconButton>
                       <RotateRightTwoToneIcon />
                     </IconButton>
                     <IconButton>
                       <ChatBubbleIcon />
                     </IconButton>
                     <IconButton>
                       <ExpandMoreIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchIcon />
                    <input placeholder="Search..." type="text" />
                </div>
            </div>
            <div className="sidebar_chats">
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    )
}

export default Sidebar
