const NoteCard = ({ selected, note, onClick }) => (
  <li
    className={`folder__item w-full p-2 pb-0 cursor-pointer text-grey-darker hover:bg-green-lightest hover:text-green-dark shadow-inner ${ selected && 'bg-green-lighter text-green-dark'}`}
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