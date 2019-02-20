import { useContext } from 'react';
import { FolderContext } from '../contexts/FolderContext';


export const FolderList = () => {
  const { folders, loading, onUpdate, onDelete } = useContext(FolderContext);

  return (
    loading ? <div>loading notes...</div> :
    folders ?
    <ul className="message__list">
      { folders.map(({ key, ...folder }) =>
          <li className="folder" key={key}>
            { folder.title }
            <button onClick={() => onUpdate(key)}>Update</button>
            <button onClick={() => onDelete(key)}>delete</button>
          </li>) }
    </ul> :
    <div> No messages found! </div>
  );
}