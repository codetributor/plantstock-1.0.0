import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import PlantAvatar from "./PlantAvatar";
import {chatClient } from '../stream';
import { useEffect, useState } from "react";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";
import moment from 'moment';
import ChannelContainer from "./ChannelContainer";


const CustomChannel = (ChannelPreviewUIComponentProps) => {
    const [user, loading] = useAuthState(auth)
    const { channel, setActiveChannel, watchers, Avatar } = ChannelPreviewUIComponentProps;
    const [streamChannel, setStreamChannel] = useState(channel)
    
    const array = Object.values(channel.state.members);
    const recipient = array.filter(person => person.user.name !== user.email)[0].user.name;

    const plantLevel = streamChannel.data.level;
    const plantType = streamChannel.data.plantType
    const date = new Date().getTime() / 1000;
    const secondsOfLastMessage = moment(streamChannel.state.last_message_at).valueOf() / 1000;

    useEffect(() => {

    async function updateLevel() {
      if(date - secondsOfLastMessage > 180) {
        if(streamChannel.data.level > 1 && streamChannel.data.check3 == false) {
          await streamChannel.updatePartial({ set: {
            level: plantLevel - 1,
            check3: true
          }})
          setStreamChannel(streamChannel)
        }
      }
    }
    updateLevel();
      
    }, [])

    streamChannel.on('message.new', async(event) => {
      if(plantLevel < 4) {
        await streamChannel.updatePartial({ set: { 
          level: plantLevel + 1,
          check3: false
        }})
        setStreamChannel(streamChannel);
      }
    })
    
    return(
      <ChannelContainer 
      streamChannel={streamChannel} 
      watchers={watchers}
      recipient={recipient}
      plantLevel={streamChannel.data.level}
      setActiveChannel={setActiveChannel}
      />
    )
}

export default CustomChannel