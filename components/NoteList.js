import { useContext } from 'react';
import { FolderContext } from '../contexts/FolderContext';


export const NoteList = () => {
  const { folders, loading, selected, selectedNote, onSelectNote, addNote } = useContext(FolderContext);

  return (
    <>
      <div className="h-12">
          <button className="bg-teal-dark hover:bg-teal text-white font-bold py-2 px-4 rounded" onClick={ () => {
        addNote({
              title: 'New Note',
              content: 'adadadafafaf',
        })
      }}>
      + new note
      </button>
    </div>
    {
    loading ? <div>loading notes...</div> :
    (folders && selected && folders[selected].notes) ?
    <div className="notes__panel h-cwt" style={{ overflowY: 'scroll'}}>
      <ul className="notes__list list-reset">
        { Object.keys(folders[selected].notes).map(key =>
            <li className={`folder__item w-full p-2 pb-0 cursor-pointer hover:bg-grey shadow-inner ${ selectedNote === key && 'bg-grey'}`} onClick={() => onSelectNote(key)} key={key}>
              <div className="max-w-sm overflow-hidden">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{ folders[selected].notes[key].title }</div>
                  <p className="text-grey-darker text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                  </p>
                </div>
                {/* <div className="px-6 py-4">
                  <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#photography</span>
                  <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#travel</span>
                  <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">#winter</span>
                </div> */}
              </div>
            </li>
          )
        }
      </ul>
    </div> :
    <div> No notes found! </div>
      }
    </>
  );
}