import Head from 'next/head'
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import styled from 'styled-components';
import 'stream-chat-react/dist/css/index.css';
import { Avatar, Button, IconButton } from '@mui/material';
import { ChatBubbleOutline, MoreVertOutlined } from '@mui/icons-material';
import { signOut } from 'firebase/auth';
import Modal from '../components/Modal'
import PlantAvatar from '../components/PlantAvatar';
import moment from 'moment';

import {
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  LoadingIndicator,
  ChannelList,
  SearchInput,
  ChannelPreviewUIComponentProps
} from 'stream-chat-react'

export default function Home({streamClient}) {

  const [user, loading] = useAuthState(auth)
  const[isOpen, setIsOpen] = useState(false)
  const[bgChannel, setBgChannel] = useState("bg-channel-4")

  const filters = { members: { $in: [ user.uid ] } }

  const logOut = () => {
    streamClient.disconnect();
    signOut(auth)
  }

  const CustomList = (props) => {
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
    >{props.children}</div>
      </>
    
    )
  }

    const CustomChannel = (ChannelPreviewUIComponentProps) => {
    const { channel, setActiveChannel, watchers, Avatar } = ChannelPreviewUIComponentProps;
    const array = Object.values(channel.state.members);
    const recipient = array.filter(person => person.user.name !== user.email)[0].user.name;

    const data = channel.data;
    // const timeOfLastMessage = channel.state.last_message_at;
    // const timeOfCreation = channel.data.created_at;

    // const date = new Date().getTime();
    // const seconds = date / 1000;
    // const secondsOfLastMessage = moment(timeOfLastMessage).valueOf() / 1000;
    // const secondsOfCreatedAt = moment(timeOfCreation).valueOf() / 1000;

    // const currentChannel = streamClient.channel('messaging', channel.data.id)

    // const updateLevel = async () => {
    //   if(seconds && secondsOfLastMessage || secondsOfCreatedAt) {
     
    //     if(seconds - secondsOfLastMessage > 180) {
    //       if(data.level > 1 && data.check3 == false) {
    //         await currentChannel.updatePartial({ set: {
    //           level: data.level - 1,
    //           check3: true,
    //           check2: true,
    //           check1: true
    //         }
    //         })
    //         setBgChannel(`bg-channel-${data.level}`)
    //       } 
    //     } else if(seconds - secondsOfLastMessage > 120) {
    //       if(data.level > 1 && data.check2 == false) {
    //         await currentChannel.updatePartial({ set: {
    //           level: data.level - 1,
    //           check2: true,
    //           check1: true
    //         }
    //         })
    //         setBgChannel(`bg-channel-${data.level}`)
    //       } 
    //     } else if (seconds - secondsOfLastMessage > 60) {
    //       if(data.level > 1 && data.check1 == false) {
    //         await currentChannel.updatePartial({ set: {
    //           level: data.level - 1,
    //           check1: true
    //         }
    //         })
    //         setBgChannel(`bg-channel-${data.level}`)
    //       } 
    //     }
    //   }
  
    //   currentChannel.on('message.new', async (event) => {
    //     if(data.level < 4) {
    //        await currentChannel.updatePartial({ set: {
    //        check3: false,
    //        check2: false,
    //        check1: false,
    //        level: data.level + 1
    //     }})
    //     setBgChannel(`bg-channel-${data.level}`)
    //     }
        
    //   })
  
    //   console.log(bgChannel);
    // }
    
    // updateLevel();

    return(
      <div style={{
        width: '100%',
        backgroundColor: '#EFEFEF',
        marginLeft: '0px',
        marginBottom: '7px',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'end',
        cursor: 'pointer',
        paddingTop: '7px',
        paddingLeft: '7px',
        paddingRight: '7px',
        paddingBottom: '15px',
        justifyContent: 'start',
      }}
      onClick={() => setActiveChannel(channel, watchers)}
      className={`bg-bottom bg-no-repeat bg-${bgChannel}`}
      >
        <PlantAvatar plantLevel={data.level} />
        <p
        style={{
          marginLeft: '5px',
        }}
        >{recipient}</p>
        </div>
    )
}
 console.log(bgChannel);

  if(!streamClient) return <Loading />

  return (
    <div>
      <Head>
        <title>Plantstock | A Chat App that Visualizes Relationships</title>
        <meta name="description" content="When two people message, your plant stays Healthy! But when you don’t message the plants slowly wilts and could die. Only when you message again! does the plant become healthy..." />
        <link rel="icon" href="/cactus-transparent.png" />
      </Head>
      <div>
            <Chat client={streamClient} theme="messaging light">
                <ChannelList 
                filters={filters} List={CustomList}
                showChannelSearch additionalChannelSearchProps={{ searchForChannels: true }}
                Preview={CustomChannel}
                />
                <Channel>
                    <Window>
                        <ChannelHeader />
                        <MessageList />
                        <MessageInput />
                    </Window>
                    <Thread />
                </Channel>
            </Chat>
        </div>
    </div>
  )
}

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

