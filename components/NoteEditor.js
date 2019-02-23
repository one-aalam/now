import { useContext, useEffect, useState, createRef } from 'react';
import { Popper } from 'react-popper';
import ContentEditable from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html';
import Feather from 'react-feather/dist/icons/feather';

import { useRect, POPPER_DEFAULT_RECT } from '../hooks/useRect';
import useInterval from '../hooks/useInterval';

import { FolderContext } from '../contexts/FolderContext';
import NoteEditorAssistant from './NoteEditorAssistant';

const SANITIZE_CONF = {
  allowedTags: [ 'b', 'i', 'em', 'strong', 'a', 'p', 'h1', 'div'],
  allowedAttributes: { a: ['href'] }
};

const Note = ({ children }) => {
  let noteRef;
  const { folders, loading, selected, selectedNote, updateNote } = useContext(FolderContext);
  const note = !loading && folders && selected && selectedNote ? folders[selected].notes[selectedNote] : null;
  const [ content, setContent ] = useState(null);
  const [ canSync, setCanSync ] = useState(true);
  const [ syncing, setSyncing ] = useState(false);
  const [ delay, setDelay ] = useState(3000);
  const [ rect, setRect, handleTextSelection, virtualReferenceElement ] = useRect(POPPER_DEFAULT_RECT); //useState(POPPER_DEFAULT_RECT);

  const handleChange = evt => {
    setContent({ ...content, content: evt.target.value });
  }
  const handleTitleChange = evt => {
    setContent({ ...content, title: evt.target.value });
  }

  const handleChangeSanitized = evt => {
    setContent({ ...content, content: sanitizeHtml(evt.target.value, SANITIZE_CONF) });
  }

  useInterval(function scheduleSyncNote(){
    // syncNote();
  }.bind(this), canSync ? delay : null);

  useEffect(() => {
    if (note) {
      setContent({
        title: note.title ? note.title : '',
        content: note.content ? note.content : ''
      })
      setRect(POPPER_DEFAULT_RECT);
    }
    return () => {
      setCanSync(false);
    }
  }, [ note ])

  useEffect(() => {
    noteRef = createRef();
  })

  const syncNote = evt => {
    if(evt) evt.preventDefault();
    setSyncing(true);
    updateNote({ ...content, content: sanitizeHtml(content.content, SANITIZE_CONF)}).then(() => {
      setSyncing(false);
    });
    return false;
  }

  return (content ?
    <section className="note__panel" id="note__panel">
      <div>
        <div className="px-20 py-4" >
          {
            syncing &&
            <em>Syncing with cloud</em>
          }
          <h1 className="mb-2 mt-10 font-extrabold">
            <input
              style={{ outline: 0, width: '100%' }}
              placeholder="What're you upto?"
              className="editable text-grey-black bg-green-lightest ptb-2"
              value={content.title}
              onChange={handleTitleChange}
              onBlur={syncNote}
            />
          </h1>
          { !content.title &&
            <div className="text-sm text-grey mb-6">
              Type the title and hit [tab] to jot down(or update) the note...
            </div>
          }
          <ContentEditable
            innerRef={noteRef}
            style={{ outline: 0 }}
            className="editable text-grey-darkest"
            html={content.content}
            onChange={handleChange}
            onMouseUp={handleTextSelection}
            onKeyUp={handleTextSelection}
            onKeyDown={handleTextSelection}
          />
        </div>
        {/* Note Editor - Assistant */}
        <Popper referenceElement={virtualReferenceElement} placement="top" modifiers={{offset: { offset: '0,5' }}}>
            {({ ref, style, placement, arrowProps }) => (
                rect.width ?
                <div className="pop" ref={ref} role="tooltip" style={style} data-placement={placement}>
                  <NoteEditorAssistant />
                  <div className="x-arrow" ref={arrowProps.ref} style={arrowProps.style}></div>
                </div> : null
            )}
        </Popper>
      </div>
      {/* { children } */}
    </section>
    : <div className="flex items-center justify-center md:h-swt">
        <p className="p-10 text-center text-grey-dark">
          <Feather size={64}/>
          <br/>
          <br/>
          You haven't selected a note yet! Please select one, before composing the masterpiece of your thoughts...
        </p>
      </div>
  );
}

export default Note;
