import { useContext, useEffect, useState, createRef } from 'react';
import { Popper } from 'react-popper';
import ContentEditable from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html';

import useInterval from '../hooks/useInterval';

import { FolderContext } from '../contexts/FolderContext';
import NoteEditorAssistant from './NoteEditorAssistant';

const SANITIZE_CONF = {
  allowedTags: [ 'b', 'i', 'em', 'strong', 'a', 'p', 'h1', 'div'],
  allowedAttributes: { a: ['href'] }
};
const POPPER_DEFAULT_RECT = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: 0,
  height: 0
};

const useRect = (POPPER_DEFAULT_RECT) => {
  const [ rect, setRect ] = useState(POPPER_DEFAULT_RECT);
  // Rect, imitate a DOM element's rect!
  const virtualReferenceElement = {
    getBoundingClientRect() {
      return rect;
    },
    get clientWidth() {
      return this.getBoundingClientRect().width;
    },
    get clientHeight() {
      return this.getBoundingClientRect().height;
    }
  }

  const handleTextSelection = evt => {
    const selection = document.getSelection();
    const range = selection && selection.rangeCount && selection.getRangeAt(0);
    updateRect(range)
  }

  const updateRect = (range) => {
    let rect;
    if (range) {
      rect = range.getBoundingClientRect();
    } else {
      rect = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: 0,
        height: 0
      };
    }
    setRect(rect);
  }

  return [rect, setRect, handleTextSelection, virtualReferenceElement ];
}

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
        <div className="px-6 py-4" >
          {
            syncing &&
            <em>Syncing with cloud</em>
          }
          <h1 className="mb-2 mt-10 font-extrabold">
            <input
              style={{ outline: 0, background: 'none', width: '100%' }}
              placeholder="What're you upto?"
              className="editable"
              value={content.title}
              onChange={handleTitleChange}
              onBlur={syncNote}
            />
          </h1>
          { !content.title &&
            <div className="text-sm text-grey mb-6">
              Type the title and hit [tab] for jotting down(or update) your thoughts...
            </div>
          }
          <ContentEditable
            innerRef={noteRef}
            style={{ outline: 0 }}
            className="editable"
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
    : <div> Please select a folder and a note first </div>
  );
}

export default Note;
