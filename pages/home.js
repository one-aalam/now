import { useContext } from 'react';

import AuthUserContext from '../contexts/AuthUserContext';
import { withAuthorization } from '../components/withAuthorization';

import LayoutPrivate from '../components/LayoutPrivate';
import { FolderProvider } from '../contexts/FolderContext';
 import {  FolderList } from '../components/FolderList';

const authCondition = (authUser) => !!authUser;

const HomePage = () => {
  const user = useContext(AuthUserContext);

  return (
    <LayoutPrivate>
      <div className="flex flex-col md:flex-row">
        <div className="bg-green shadow-lg h-16 fixed pin-b md:relative md:h-swt z-10 w-full md:w-48">
          { user && (user.displayName ? user.displayName : user.email ) }
          <FolderProvider>
            <FolderList />
          </FolderProvider>
        </div>
        <div className="bg-grey shadow-sm h-16 fixed pin-b md:relative md:h-swt z-10 w-full md:w-64">
          sidebar
        </div>
        <div className="main-content flex-1 bg-grey-lightest pb-24 md:pb-5">
          main content
        </div>
      </div>
    </LayoutPrivate>
  );
};

HomePage.getInitialProps = async ({ req, res }) => {
  const isServer = typeof window === "undefined";
  if(!isServer) {
    //
  }
}

export default withAuthorization(authCondition)(HomePage);


