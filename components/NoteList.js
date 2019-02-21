import { useContext } from 'react';
import { FolderContext } from '../contexts/FolderContext';
import NoteCard from './NoteCard';


export const NoteList = () => {
  const { folders, loading, selected, selectedNote, onSelectNote, addNote } = useContext(FolderContext);

  return (
    <>
    <div className="h-12">
      <button
        className="bg-teal-dark hover:bg-teal text-white font-bold py-2 px-4 rounded"
        onClick={() => addNote({ title: 'New Note', content: 'adadadafafaf'})}>
      + new note
      </button>
    </div>
    {
      loading ?
      // @TODO: Add loading state component
      <div>loading notes...</div> :
      (
        folders &&
        selected &&
        folders[selected].notes
      ) ?
      <div className="notes__panel h-cwt" style={{ overflowY: 'scroll'}}>
        <ul className="notes__list list-reset">
          { Object.keys(folders[selected].notes).map(key =>
            <NoteCard
              key={key}
              note={folders[selected].notes[key]}
              selected={selectedNote === key}
              onClick={() => onSelectNote(key)}
              />
            )
          }
        </ul>
      </div> :
    // @TODO: Add empty state component
      <div> No notes found! </div>
    }
    </>
  );
}