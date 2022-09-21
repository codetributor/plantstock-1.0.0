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
import CustomChannel from '../components/CustomChannel';
import CustomList from '../components/CustomList';

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
  const[bgChannel, setBgChannel] = useState("bg-channel-4")

  const filters = { members: { $in: [ user.uid ] } }

  if(!streamClient) return <Loading />

  return (
    <div>
      <Head>
        <title>Plantstock | A Chat App that Visualizes Relationships</title>
        <meta name="description" content="When two people message, your plant stays Healthy! But when you don’t message the plants slowly wilts and could die. Only when you message again! does the plant become healthy..." />
        <link rel="icon" href="/cactus/cactus-4.png" />
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



