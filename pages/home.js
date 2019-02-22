import { useContext } from 'react';

import { db } from '../libs/firebase';
import AuthUserContext from '../contexts/AuthUserContext';
import { withAuthorization } from '../components/withAuthorization';

import LayoutPrivate from '../components/LayoutPrivate';
import { FolderProvider } from '../contexts/FolderContext';
import { FolderList } from '../components/FolderList';
import { NoteList } from '../components/NoteList';
import NoteEditor from '../components/NoteEditor';

const authCondition = (authUser) => !!authUser;

const HomePage = () => {
  const user = useContext(AuthUserContext);

  return (
    <LayoutPrivate>
      <FolderProvider>
      <div className="flex flex-col md:flex-row">
        <div className="bg-black text-white shadow-lg h-16 fixed pin-b md:relative md:h-swt z-10 w-full md:w-48">
          <FolderList />
        </div>
        <div className="bg-grey-lighter shadow-sm h-16 fixed pin-b md:relative md:h-swt z-10 w-full md:w-1/5">
          <NoteList />
        </div>
        <div className="main-content flex-1 bg-grey-lightest pb-24 md:pb-5" style={{ overflowY: 'scroll'}}>
          <NoteEditor />
        </div>
      </div>
      </FolderProvider>
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


