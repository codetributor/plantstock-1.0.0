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
    const [plantLevel, setPlantLevel] = useState(4)
    
    const array = Object.values(channel.state.members);
    const recipient = array.filter(person => person.user.name !== user.email)[0].user.name;
    

    const date = new Date().getTime() / 1000;
    const secondsOfLastMessage = moment(streamChannel.state.last_message_at).valueOf() / 1000;
    const createdAt = moment(streamChannel.data.config.created_at).valueOf() / 1000;
    const comparedTime = secondsOfLastMessage || createdAt

    useEffect(() => {
      let currentLevel = 4
      let increment = Math.floor((date - comparedTime)/60)
    if(increment >= 3) {
          increment = 3;
    }
    
    for(let i = 0; i < increment; i++) {
          currentLevel = currentLevel - 1;
    }
 
    setPlantLevel(currentLevel);
    }, [])

    streamChannel.on('message.new', async(event) => {
      if(plantLevel < 4) {
        setPlantLevel(plantLevel + 1 );
      }
    })
    
    return(
      <ChannelContainer 
      streamChannel={streamChannel} 
      watchers={watchers}
      recipient={recipient}
      plantLevel={plantLevel}
      setActiveChannel={setActiveChannel}
      />
    )
}

export default CustomChannel