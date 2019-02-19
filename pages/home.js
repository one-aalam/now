import { useContext } from 'react';
import Router from 'next/router'

import { auth } from '../libs/firebase';
import AuthUserContext from '../contexts/AuthUserContext';
import { withAuthorization } from '../components/withAuthorization';

import Layout from '../components/Layout';
import { MessageProvider } from '../contexts/MessageContext';
import { MessageList } from '../components/MessageList';

const authCondition = (authUser) => !!authUser;

const HomePage = () => {
  const user = useContext(AuthUserContext);

  return (
    <Layout>
      <div className="w-1/3 mt-20">
        Home
        <MessageProvider>
          <MessageList />
        </MessageProvider>
      </div>
    </Layout>
  );
};

HomePage.getInitialProps = async ({ req, res }) => {
  const isServer = typeof window === "undefined";
  if(!isServer) {
    //
  }
}

export default withAuthorization(authCondition)(HomePage);


