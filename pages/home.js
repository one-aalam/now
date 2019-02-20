import { useContext } from 'react';

import AuthUserContext from '../contexts/AuthUserContext';
import { withAuthorization } from '../components/withAuthorization';

import Layout from '../components/Layout';
import { FolderProvider } from '../contexts/FolderContext';
 import {  FolderList } from '../components/FolderList';

const authCondition = (authUser) => !!authUser;

const HomePage = () => {
  const user = useContext(AuthUserContext);

  return (
    <Layout>
      <div className="w-1/3 mt-20">
        Home
        <FolderProvider>
          <FolderList />
        </FolderProvider>
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


