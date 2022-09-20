import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import PlantAvatar from "./PlantAvatar";
import {chatClient } from '../stream';

const CustomChannel = (ChannelPreviewUIComponentProps) => {
    const [user, loading] = useAuthState(auth)
    const { channel, setActiveChannel, watchers, Avatar } = ChannelPreviewUIComponentProps;
    
    const array = Object.values(channel.state.members);
    const recipient = array.filter(person => person.user.name !== user.email)[0].user.name;

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
      className={`bg-bottom bg-no-repeat bg-bg-channel-4`}
      >
        <PlantAvatar plantLevel={4} />
        <p
        style={{
          marginLeft: '5px',
        }}
        >{recipient}</p>
        </div>
    )
}

export default CustomChannel