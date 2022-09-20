import styled from 'styled-components';
import Head from 'next/head';
import GoogleButton from 'react-google-button'
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const Login = ({client}) => {

    const [user, loading] = useAuthState(auth)

    const signIn = () => {
        signInWithPopup(auth, provider)
        .catch(alert)
    }

    return(
        <div>
             <Container className='bg-primary'>
            <Head>Login</Head>
            <LoginContainer>
                <Logo src='cactus/cactus-4.png' />
                <Description>When you chat with each other, your plant stays healthy.</Description> 
                <Description>When you stop chatting, the plant wilts and slowly dies.</Description>
                <Description>Only when you message again does the plant become healthy again...</Description>
                <Description><strong>Visualize Relationships</strong></Description>
                <GoogleButton 
                className='mt-5'
                onClick={signIn} />
              </LoginContainer>
            </Container>
         {/* <PlantHero className="relative" alt="bg-login" src="/hero.jpg" 
         layout="fill"
         objectFit="cover"
         quality={100}
         />
         <HeroContainer>
         <CatchLineContainer>
         <CatchLine>A Chat App that Visualizes Relationships</CatchLine>
         <GoogleButton onClick={signIn} />
        </CatchLineContainer>
         </HeroContainer> */}
        </div> 
    )
}

export default Login
 
const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
`;

const LoginContainer = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    jusify-align: center;
    align-items: center;
    background-color: whitesmoke;
    border-radius: 5px;
    box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
    width: 85%;
`;

const Logo = styled.img`
    height: 100px;
    width: 100px;
    margin-bottom: 20px;
`;

const Description = styled.p`
    color: grey;
    text-align: center;
    margin-bottom: 5px;
    margin-top: 5px;
    padding: 0px
`;
 
// const PlantHero = styled(Image)`
//     visibility: hidden;
//     @media only screen and (min-width: 900px) {
//       visibility: visible;
//       zIndex: -1
//     }
// `;

// const HeroContainer = styled.div`
//   display: none;
//   @media only screen and (min-width: 900px) {
//   display: flex;
// } 
// `;

// const CatchLine = styled.h1`
//   display: none;
// @media only screen and (min-width: 900px) {
//   display: block;
//   position: fixed;
//   wrap: wrap;
//   color: #77B871;
//   width: 600px;;
//   left: 550px;
//   top: 30px;
// }
  
// `;

// const CatchLineContainer = styled.div`
// display: none;
// @media only screen and (min-width: 900px) {
//   display: flex;
//     flex-direction: column;
//     align-items: center;
//     font-size: 25px;
// }
// `;