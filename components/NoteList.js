import { useContext } from 'react';
import { FolderContext } from '../contexts/FolderContext';
import NoteCard from './NoteCard';
import Edit from 'react-feather/dist/icons/edit';
import BookOpen from 'react-feather/dist/icons/book-open';


export const NoteList = () => {
  const { folders, loading, selected,
          selectedNote, onSelectNote,
          addNote, deleteNote, toggleFavNote } = useContext(FolderContext);

  return (
    <>
    <div className="h-12 bg-green-lightest">
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
      <span className="text-green-light float-right mt-3 mr-4">
        { (folders && selected && folders[selected].notes) && ` ${Object.keys(folders[selected].notes).length} notes` }
      </span>
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
              onSelect={() => onSelectNote(key)}
              onStar={(note) => toggleFavNote(key, note)}
              onTrash={() => deleteNote(key)}
              />
            )
          }
        </ul>
      </div> :
      <div className="notes__panel h-cwt flex items-center justify-center">
        <p className="p-10 text-center text-grey-dark">
          <BookOpen size={64}/>
          <br/>
          <br/>
          You haven't put anything in <strong>{folders[selected] ? folders[selected].title : 'this notebook '}</strong> yet!
          <br/><br/>
          <a href="" className="text-green text-lg" onClick={(evt) => {
            evt.preventDefault()
            addNote({
              title: '',
              content: 'nothing beats paper!'
            })
          }}>
          + add a new note
          </a>
        </p>
      </div>
    }
    </>
  );
}