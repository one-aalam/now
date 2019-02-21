import { useContext } from 'react';
import { FolderContext } from '../contexts/FolderContext';


export const FolderList = () => {
  const { folders, loading, selected, onSelect, createFolder } = useContext(FolderContext);

  return (
    <>
    <div className="h-12">
      <button className="bg-teal-dark hover:bg-teal text-white font-bold py-2 px-4 rounded" onClick={ () => {
        createFolder({
            title: 'New Notbook'
          })
        }}>
        + group
      </button>
    </div>
    {
    loading ? <div>loading notes...</div> :
    folders ?
    <ul className="folder__list list-reset h-cwt">
      { Object.keys(folders).map( key =>
          <li className={`folder__item w-full p-2 pb-0 cursor-pointer shadow-inner ${ selected === key && 'bg-green'}`} key={key}>
            <div className="pl-1 pt-1" onClick={() => onSelect(key)}>
              <span className="inline-block text-sm font-semibold mr-2">{ folders[key].title }</span>
            </div>
          </li>
        )
      }
    </ul> :
    <div> No groups found! </div>
    }
    </>
  );
}