import { useContext } from 'react';
import { FolderContext } from '../contexts/FolderContext';
import Book from 'react-feather/dist/icons/book';
import Hash from 'react-feather/dist/icons/hash';


export const FolderList = () => {
  const { folders, loading, selected, onSelect, createFolder } = useContext(FolderContext);

  return (
    <>
    <div className="h-12 bg-green-lightest">
      <button
        className="mt-2 ml-2 bg-green-light hover:bg-green text-white font-semibold py-1 px-4 border border-grey-light rounded shadow"
        onClick={() => {
          createFolder({
            title: `Notebook #${Object.keys(folders).length + 1 }`
          })
        }}
      >
        <Book height={16}/>
      </button>
    </div>
    {
    loading ? <div>loading notebooks...</div> :
    folders ?
    <ul className="folder__list list-reset h-cwt" style={{ overflowY: 'scroll'}}>
      { Object.keys(folders).map( key =>
          <li
            className={`folder__item w-full p-2 pl-4 cursor-pointer shadow-inner hover:bg-green-lighter hover:text-green-dark ${ selected === key && 'bg-green-light'}`}
            key={key}
            >
            <div className="text-sm font-semibold" onClick={() => onSelect(key)}>
              <span className="inline-block text-white"><Book height={16}/></span>{ folders[key].title }
            </div>
          </li>
        )
      }
    </ul> :
    <div className="folder__list list-reset h-cwt"> No groups found! </div>
    }
    </>
  );
}