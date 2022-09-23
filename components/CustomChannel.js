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

    async function updateLevel() {

    const date = new Date().getTime() / 1000;
    const secondsOfLastMessage = moment(streamChannel.state.last_message_at).valueOf() / 1000;

    
      if(streamChannel.data.check == true) {
      } else {
        let increment = Math.floor((date - secondsOfLastMessage)/60)
        if(increment >= 3) {
          increment = 3;
        }
        let currentLevel = 4
        for(let i = 0; i < increment; i++) {
          currentLevel = currentLevel - 1;
          }
        await streamChannel.updatePartial({ set: {
            level: currentLevel,
          }})
        setStreamChannel(streamChannel)

        if(increment >= 3) {
          await streamChannel.updatePartial({ set: {
            check: true,
          }})
        }
      }
  }

updateLevel();

    streamChannel.on('message.new', async(event) => {
      if(streamChannel.data.level < 4) {
        await streamChannel.updatePartial({ set: { 
          level: streamChannel.data.level + 1,
          check: false
        }})
        setStreamChannel(streamChannel);
      }
    })

    // async function updateLevel() {
    //   if(date - secondsOfLastMessage > 180) {
    //     if(streamChannel.data.level > 1 && streamChannel.data.check3 == false) {
    //       await streamChannel.updatePartial({ set: {
    //         level: plantLevel - 3,
    //         check3: true,
    //         check2: true,
    //         check1: true
    //       }})
    //       setStreamChannel(streamChannel)
    //     }
    //   } else if(date - secondsOfLastMessage > 120) {
    //     if(streamChannel.data.level > 2 && streamChannel.data.check2 == false) {
    //       await streamChannel.updatePartial({ set: {
    //         level: plantLevel -1,
    //         check2: true,
    //         check1: true
    //       }})
    //       setStreamChannel(streamChannel)
    //     }
    //   } else if(date - secondsOfLastMessage > 60) {
    //     if(streamChannel.data.level > 1 && streamChannel.data.check1 == false) {
    //       await streamChannel.updatePartial({ set: {
    //         level: plantLevel - 1,
    //         check1: true
    //       }})
    //       setStreamChannel(streamChannel)
    //     }
    //   }
    // }

    // setInterval(() => updateLevel(), 30000)
    
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