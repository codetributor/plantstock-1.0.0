import '../styles/globals.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { userClient } from '../sanity';
import { useEffect, useState } from 'react';
import {chatClient } from '../stream';
import Loading from '../components/Loading';
import Login from './login';

function MyApp({ Component, pageProps }) {

  const [user, loading] = useAuthState(auth)
  const [streamClient, setSteamClient] = useState(null); 

  useEffect(() => {
    async function init() {

      if(user) {

        const doc = {
          _id: user.uid,
          email: user.email,
          uid: user.uid,
          _type: 'users'
        }

        userClient.createIfNotExists(doc)

        await chatClient.connectUser({
            id: user.uid,
            name: user.email,
            image: user.photoURL,
          },
          chatClient.devToken(user.uid)
        )
        
          setSteamClient(chatClient);
      }
        
       
    }
    init();

  }, [user])

  if(loading) return <Loading />

  if(!user) return <Login />

  return <Component {...pageProps} streamClient={streamClient} />
}

export default MyApp
