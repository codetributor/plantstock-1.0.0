import { Avatar, Button, IconButton } from '@mui/material';
import styled from 'styled-components';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { ChatBubbleOutline, MoreVertOutlined } from '@mui/icons-material';
import Modal from './Modal';
import { useState } from 'react';
import {chatClient } from '../stream';
import { signOut } from 'firebase/auth';

const CustomList = ({children}) => {

    const [user, loading] = useAuthState(auth)
    const[isOpen, setIsOpen] = useState(false)
    const[streamClient, setStreamClient] = useState(chatClient)

    const logOut = () => {
        streamClient.disconnect();
        signOut(auth)
      }

    return(
      <>
      <Header>
        <UserAvatar 
        src={user.photoURL}
        onClick={logOut}
        />
        <IconsContainer>
          <IconButton>
          <ChatBubbleOutline />
          </IconButton>
          <IconButton>
          <MoreVertOutlined />
          </IconButton>
        </IconsContainer>
      </Header>
      <Button 
      variant="contained"
      style={{
        marginLeft: "10px",
        marginRight: "10px",
        marginTop: "10px",
      }}
      onClick={() => setIsOpen(true)}
      >Create a New Tock</Button>
      <Modal 
      open={isOpen}
      onClose={() => setIsOpen(false)}
      streamClient={streamClient}
      >
      </Modal>
    <div
     style={{
      width: '300px',
      padding: '10px',
     }}
    >{children}</div>
      </>
    
    )
  }

  export default CustomList

  const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: whitesmoke;
  border-radius: 5px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 16px;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  border-bottom: whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  margin: 10px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;