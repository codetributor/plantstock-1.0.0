import PlantAvatar from "./PlantAvatar"

const ChannelContainer = ({streamChannel, watchers, recipient, plantLevel, setActiveChannel, activeUnreadHandler}) => {

    return(
        <div style={{
            width: '100%',
            marginLeft: '0px',
            marginBottom: '7px',
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            paddingTop: '7px',
            paddingLeft: '0px',
            paddingRight: '0px',
            paddingBottom: '0px',
            justifyContent: 'start',
          }}
          onClick={() => setActiveChannel(streamChannel, watchers)}
          className="bg-channel ml-1 hover:border-solid hover:border-2 hover:border-green-600"
          >
            <PlantAvatar 
            plantLevel={plantLevel}
            plantType={streamChannel.data.plantType} />
            <p
            style={{
              marginLeft: '5px',
              marginTop: '5px',
            }}
            >{recipient}</p>
            <img 
            style={{
                borderRadius: '5px',
            }}
            src={`/bar/bar-${plantLevel}.png`} width="400px" height="5px"/>
            </div>
    )
}

export default ChannelContainer