import { useContext } from 'react';
import Router from 'next/router'

import { auth } from '../libs/firebase';
import AuthUserContext from '../contexts/AuthUserContext';

import Layout from '../components/Layout';
import { MessageProvider } from '../contexts/MessageContext';
import { MessageList } from '../components/MessageList';

const HomePage = () => {
  const user = useContext(AuthUserContext);

  return (
    <Layout>
      <div className="w-1/3 mt-20">
        Home
        { user ?
          <div>logged in as { user.displayName } ! (<button onClick={() => auth.signOut() }>log out!</button></div> :
          <div onClick={() => auth.signInWithGoogle()}> Sign in with google! </div>
        }
      </div>
    </Layout>
  );
};

HomePage.getInitialProps = async ({ req, res }) => {
  const isServer = typeof window === "undefined";
  if(!isServer) {
    alert('client');
    const user = useContext(AuthUserContext);
    if (!user) {
      Router.push('/');
    }
  }
}

export default HomePage;

    // <MessageProvider>
    //   <MessageList />
    // </MessageProvider>


