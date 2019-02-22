import { useState } from 'react';
import Trash from 'react-feather/dist/icons/trash-2';
import Star from 'react-feather/dist/icons/star';


const NoteCard = ({ selected, note, onSelect, onStar, onTrash }) => {
  const [ isMouseOver, setIsMouseOver ] = useState(false)

  return (
    <li
      className={`folder__item w-full relative p-2 pb-0 cursor-pointer text-grey-darker hover:bg-green-lightest hover:text-green-dark shadow-inner ${ selected && 'bg-green-lighter text-green-dark'}`}
      onClick={onSelect}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      >
      { isMouseOver &&
        <div className="p-1 absolute pin-t pin-r mt-2 mr-2">
          <span className="text-grey-light hover:text-red" onClick={() => onTrash(note)}>
            <Trash />
          </span>
          &nbsp;
          <span className="text-grey-light hover:text-yellow" onClick={() => onStar(note)}>
            <Star />
          </span>
        </div>
      }
      <div className="max-w-sm overflow-hidden">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{ note.title }</div>
          <hr/>
          <p className="text-grey-darker text-base" dangerouslySetInnerHTML={{ __html: note.content }}></p>
        </div>
      </div>
    </li>
  )
}
export default NoteCard;