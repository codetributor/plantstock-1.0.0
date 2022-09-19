import Image from "next/image";

const PlantAvatar = ({plantLevel}) => {

    const urlImage = `/cactus/cactus-${plantLevel}.png`

    return(
        <div>
            <img src={urlImage} height="30" width="30" alt="cactus" />
        </div>
    )
}

export default PlantAvatar;