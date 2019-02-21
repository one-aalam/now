const NoteCard = ({ selected, note, onClick }) => (
  <li
    className={`folder__item w-full p-2 pb-0 cursor-pointer hover:bg-grey shadow-inner ${ selected && 'bg-grey'}`}
    onClick={onClick}>
    <div className="max-w-sm overflow-hidden">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{ note.title }</div>
        <hr/>
        <p className="text-grey-darker text-base" dangerouslySetInnerHTML={{ __html: note.content }}></p>
      </div>
    </div>
  </li>
)
export default NoteCard;