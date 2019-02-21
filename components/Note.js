import { useContext, useEffect, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { FolderContext } from '../contexts/FolderContext';


const Note = ({ children }) => {
  const { folders, loading, selected, selectedNote } = useContext(FolderContext);
  const note = !loading && folders && selected && selectedNote ? folders[selected].notes[selectedNote] : null;
  const [ content, setContent ] = useState(null);
  const handleChange = evt => {
    setContent({ ...content, content: evt.target.value });
  }

  useEffect(() => {
    if (note) {
      setContent({
        title: note.title ? note.title : '',
        content: note.content ? note.content : ''
      })
    }
  }, [ note ])

  return (
    content ?
    <section className="note__panel">
      <div>
        {/* <img className="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" /> */}
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{ content.title }</div>
            <ContentEditable
              style={{ outline: 0 }}
              className="editable"
              html={content.content}
              disabled={false}
              onChange={handleChange}
            />
        </div>
        <div className="px-6 py-4">
          <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#photography</span>
          <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#travel</span>
          <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">#winter</span>
        </div>
      </div>
      { children }
    </section>
    : <div> Please select a folder and a note first </div>
  );
}

export default Note;
