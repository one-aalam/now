import { useContext } from 'react';
import { MessageContext } from '../contexts/MessageContext';


export const MessageList = () => {
  const { messages, loading, onUpdate, onDelete } = useContext(MessageContext);

  return (
    loading ? <div>loading...</div> :
    messages ?
    <ul className="message__list">
      { messages.map(({key, message}) => <li className="message"
          key={key}>
            {message}
            <button onClick={() => onUpdate(key)}>Update</button>
            <button onClick={() => onDelete(key)}>delete</button>
          </li>) }
    </ul> :
    <div> No messages found! </div>
  );
}
