import Image from "next/image";

const PlantAvatar = ({plantLevel, plantType}) => {

    return(
        <div>
            <img src={`/${plantType}/${plantType}-${plantLevel}.png`} height="100" width="100" alt="plant" />
        </div>
    )
}

export default PlantAvatar;