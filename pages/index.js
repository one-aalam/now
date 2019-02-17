import Link from 'next/link';
import { useContext } from 'react';
import Layout from '../components/Layout';

import { auth } from '../libs/firebase';
import AuthUserContext from '../contexts/AuthUserContext';
import { MessageProvider } from '../contexts/MessageContext';
import { MessageList } from '../components/MessageList';


export default () => {
  const user = useContext(AuthUserContext);

  return (
    <Layout>
      <Link href="/about">
        <a>Go to {process.env.customKey}</a>
      </Link>
        { user ?
          <div>logged in as { user.displayName } ! (<button onClick={() => auth.signOut() }>log out!</button></div> :
          <div onClick={() => auth.signInWithGoogle()}> I've access to Firebase and render something.</div>
        }
        <MessageProvider>
          <MessageList />
        </MessageProvider>
    </Layout>
  )
};