import { useContext, useEffect, useState, createRef } from 'react';
import { Manager, Reference, Popper } from 'react-popper';
import ContentEditable from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html';
import { FolderContext } from '../contexts/FolderContext';

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

function CmdButton(props) {
  return (
    <button
      className="text-white"
      key={props.cmd}
      onMouseDown={evt => {
        evt.preventDefault(); // Avoids loosing focus from the editable area
        document.execCommand(props.cmd, false, props.arg); // Send the command to the browser
      }}
    >
      {props.name || props.cmd}
    </button>
  );
}

const Note = ({ children }) => {
  let noteRef;
  const { folders, loading, selected, selectedNote, updateNote } = useContext(FolderContext);
  const note = !loading && folders && selected && selectedNote ? folders[selected].notes[selectedNote] : null;
  const [ content, setContent ] = useState(null);
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

  const handleChange = evt => {
    setContent({ ...content, content: evt.target.value });
  }
  const handleTitleChange = evt => {
    setContent({ ...content, title: evt.target.value });
  }

  const handleChangeSanitized = evt => {
    setContent({ ...content, content: sanitizeHtml(evt.target.value, SANITIZE_CONF) });
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

  useEffect(() => {
    if (note) {
      setContent({
        title: note.title ? note.title : '',
        content: note.content ? note.content : ''
      })
      setRect(POPPER_DEFAULT_RECT);
    }
  }, [ note ])

  useEffect(() => {
    noteRef = createRef();
  })

  const persist = evt => {
    evt.preventDefault();
    updateNote({ ...content, content: sanitizeHtml(content.content, SANITIZE_CONF)} );
    return false;
  }

  return (
    content ?
    <section className="note__panel" id="note__panel">
      <div>
        <div className="px-6 py-4">
          <h1 className="font-bold text-xxl mb-2" onClick={persist}>
            <ContentEditable
              style={{ outline: 0 }}
              className="editable"
              html={content.title}
              onChange={handleTitleChange}
              onBlur={persist}
            />
          </h1>
            <ContentEditable
              innerRef={noteRef}
              style={{ outline: 0 }}
              className="editable"
              html={content.content}
              onChange={handleChange}
              onMouseUp={handleTextSelection}
            />
        </div>
        <Popper referenceElement={virtualReferenceElement} placement="top" modifiers={{offset: { offset: '0,5' }}}>
            {({ ref, style, placement, arrowProps }) => (
                rect.width ?
                <div className="pop" role="tooltip" ref={ref} style={style} data-placement={placement}>
                  <CmdButton cmd="italic" />
                  <CmdButton cmd="bold" />
                  {/* <CmdButton cmd="strikeThrough" />
                  <CmdButton cmd="underline" />
                  <CmdButton cmd="insertImage" />
                  <CmdButton cmd="foreColor" />
                  <CmdButton cmd="hiliteColor" />
                  <CmdButton cmd="createLink" arg="http://google.in"/>
                  <CmdButton cmd="insertOrderedList" name="ol" />
                  <CmdButton cmd="insertUnorderedList" name="ul" />
                  <CmdButton cmd="formatBlock" arg="h1" name="h1" /> */}
                  <div className="x-arrow" ref={arrowProps.ref} style={arrowProps.style} />
                </div> : null
            )}
        </Popper>
      </div>
      <style global jsx>{`
          .pop {
            background-image: linear-gradient(to bottom,rgba(49,49,47,.99),#262625);
            background-repeat: repeat-x;
            border-radius: 5px;
            padding: 0 10px;
            color: white;
            line-height: 44px;
            display: inline-block;
          }
          .x-arrow {
            position: absolute;
            width: 14px;
            height: 14px;
            background-color: #262625;
            transform: rotate(45deg);
            z-index: -1;
          }
          [data-placement="top"] .x-arrow {
            margin-bottom: -7px;
            bottom: 0;
          }
          [data-placement="bottom"] .x-arrow {
            margin-top: -7px;
            top: 0;
          }
        `}
      </style>
      {/* { children } */}
    </section>
    : <div> Please select a folder and a note first </div>
  );
}

export default Note;
