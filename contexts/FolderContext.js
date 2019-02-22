import { createContext, useState, useEffect } from 'react';
import { db } from '../libs/firebase';
import { normalize } from '../libs/utils';

let FolderContext;
const { Provider, Consumer } = FolderContext = createContext();

const FolderProvider = ({ children }) => {
  const [ folders, setFolders ] = useState([]);
  const [ selected, setSelected ] = useState('');
  const [ selectedNote, setSelectedNote ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const handleNewFolders = snapshot => {
    if (snapshot.exists()) {
      setFolders(snapshot.val());
    }
  }

  const initSelection = snapshot => {
    if (snapshot.exists()) {
      const [ selected ] = Object.keys(snapshot.val());
      setSelected(selected);
    }
  }

  const onUpdate = (id, payload) => db.updateFolder(id, payload)
  const onDelete = (id) => db.deleteFolder(id)
  const onSelect = (key) => setSelected(key);
  const onSelectNote = (key) => setSelectedNote(key);
  const createFolder = (payload) => db.createFolder(payload);
  const addNote = (payload) => db.createNoteForFolder(selected, payload);
  const updateNote = (payload) => db.updateNoteForFolder(selected, selectedNote, payload);
  const deleteNote = (key) => db.deleteNoteForFolder(selected, key);

  const toggleFavNote = (key, payload) => db.updateNoteForFolder(selected, key, {
    ...payload,
    isFavorite: payload.isFavorite ? !payload.isFavorite : true
  });

  useEffect(() => {
    setLoading(true)
    db.getFolders().then( snapshot => {
      setLoading(false);
      handleNewFolders(snapshot);
      initSelection(snapshot);
    });
    db.subscribeFolders(handleNewFolders);
    return () => {
      db.unsubscribeFolders(handleNewFolders);
    };
  }, []);

  return (
    <Provider value={{
      folders,
      loading,
      selected,
      onUpdate,
      onDelete,
      onSelect,
      selectedNote,
      onSelectNote,
      addNote,
      updateNote,
      deleteNote,
      toggleFavNote,
      createFolder
    }}>
      { children }
    </Provider>
  )
}

export { FolderProvider, Consumer as FolderConsumer, FolderContext }
export default FolderContext;