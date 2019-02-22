import { useContext } from 'react';
import { FolderContext } from '../contexts/FolderContext';
import NoteCard from './NoteCard';
import Edit from 'react-feather/dist/icons/edit';


export const NoteList = () => {
  const { folders, loading, selected, selectedNote, onSelectNote, addNote } = useContext(FolderContext);

  return (
    <>
    <div className="h-12 bg-green-lighter">
      <button
        className="mt-2 ml-2 bg-green-dark hover:bg-green text-white font-semibold py-1 px-4 border border-grey-light rounded shadow"
        onClick={() => {
          addNote({
            title: '',
            content: 'nothing beats paper!'
          })
        }}>
      <Edit height={16} />
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