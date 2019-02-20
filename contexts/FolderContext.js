import { createContext, useState, useEffect } from 'react';
import { db } from '../libs/firebase';
import { normalize } from '../libs/utils';

let FolderContext;
const { Provider, Consumer } = FolderContext = createContext();

const FolderProvider = ({ children }) => {
  const [ folders, setFolders ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  const handleNewFolders = snapshot => {
    if (snapshot.exists()) {
      setFolders(normalize(snapshot.val()));
    }
  }

  const onUpdate = (id, payload) => db.updateFolder(id, payload)
  const onDelete = (id) => db.deleteFolder(id)

  useEffect(() => {
    setLoading(true)
    db.getFolders().then( snapshot => {
      setLoading(false);
      handleNewFolders(snapshot);
    });
    db.subscribeFolders(handleNewFolders);
    return () => {
      db.unsubscribeFolders(handleNewFolders);
    };
  }, []);

  return (
    <Provider value={{ folders, loading, onUpdate, onDelete }}>
      { children }
    </Provider>
  )
}

export { FolderProvider, Consumer as FolderConsumer, FolderContext }
export default FolderContext;