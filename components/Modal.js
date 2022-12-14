import { Button, FormControl, FormLabel, Input, Radio, RadioGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Image } from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Loading from './Loading';
import { userClient } from '../sanity';


const MODAL_STYLES ={
    position: 'fixed',
    top: "50%",
    left: "50%",
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: "10px",
    zIndex: 1000,
    borderRadius: "10px"
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000
}

const Modal = ({open, onClose, streamClient}) => {

    const [ type, setType ] = useState("");
    const [ recipient, setRecipient ] = useState("");
    const [user, loading] = useAuthState(auth)

    if(!user) return <Loading />

    const doc = {
        email: recipient,
        uid: user.id
    }

    const createTock = async () => {
       
        const query = '*[_type == "users" && email == $recipient] {uid}'
        const params = { recipient: doc.email }

        await userClient.fetch(query, params)
        .then(async (doc) => {
            const members = {
                
                user: user.uid,
                otherUser: doc[0].uid
            }

            const channel = streamClient.channel('messaging', {
                members: [members.user, members.otherUser],
                level: 4,
                plantType: type,
                check: false,
            })
            await channel.watch();
        })
}
   

    if(!open) return null;
    return(
        <>
        <div style={OVERLAY_STYLES} />
         <div style={MODAL_STYLES}>
        <Container>
        <h3
            style={{
                color: "gray",
                margin: "10px"
            }}
            >
                Enter Email
            </h3>
            <FormControl>
            <EmailInput
            type="text"
            placeholder="recipient email address"
            onChange={e => setRecipient(e.target.value)}
            value={recipient}
            />
            <h3
            style={{
                color: "gray",
                textAlign: "center",
                margin: "10px"
            }}
            >
                Choose Your Plant
            </h3>
            <PlantContainer>
                    <FormLabel>
                        <RadioGroup
                        name="type"
                        style={{
                            gap: '5px',
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "row",
                        }}
                        value={type}
                        onChange={e => setType(e.target.value)}
                        >
                            <PlantDiv>
                                <img src={'/cactus/cactus-4.png'} height={135} width={135} />
                                <PlantNameDiv>
                                    <RadioIcon value="cactus" name="type" />
                                    <p
                                    style={{
                                        fontSize: "15px"
                                    }}
                                    >Cactus</p>
                                </PlantNameDiv>
                            </PlantDiv>
                            <PlantDiv>
                            <img src={`/alocasia/alocasia-4.png`} alt="" height={135} width={135}/>
                            <PlantNameDiv>
                            <RadioIcon value="alocasia" name="type" />
                            <p style={{
                                fontSize: "15px"
                            }}>Alocasia</p>
                            </PlantNameDiv>
                            </PlantDiv>
                            

                        </RadioGroup>
                    </FormLabel>
                </PlantContainer>
            </FormControl>
        </Container>
        <Button variant="outlined"
            style={{
                margin: "10px",
                width: "300px",
                marginTop: "20px",
            }}
            type="submit"
            disabled={!type || !recipient}
            onClick={() => {
                onClose()
                createTock()
            }}
            >Create Tock</Button>
        </div>
        </>
       
    )
}

export default Modal

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    marginTop: 20px;
`;

const PlantContainer = styled.div``;

const EmailInput = styled(Input)`
    width: 300px;
`;

const RadioIcon = styled(Radio)`
    position: relative;
`;

const PlantDiv = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid black;
`;

const PlantNameDiv = styled.div`
    display: flex;
`;