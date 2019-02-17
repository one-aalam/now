import { createContext, useState, useEffect } from 'react';
import { db } from '../libs/firebase';
import { normalize } from '../libs/utils';

let MessageContext;
const { Provider, Consumer } = MessageContext = createContext();

const MessageProvider = ({ children }) => {
  const [ messages, setMessages ] = useState(null);
  const [ loading, setLoading ] = useState(false);

  const handleNewMessages = snapshot => {
    if (snapshot.exists()) {
      setMessages(normalize(snapshot.val()));
    }
  }

  const onUpdate = (id) => {
    db.updateMessage(id, 'new value').then(o => console.log(o));
  }
  const onDelete = (id) => db.deleteMessage(id).then(o => console.log(o));

  useEffect(() => {
    setLoading(true)
    db.getMessages().then( snapshot => {
      setLoading(false);
      handleNewMessages(snapshot);
    });
    db.subscribeMessages(handleNewMessages);
    return () => {
      db.unsubscribeMessages(handleNewMessages);
    };
  }, []);

  return (
    <Provider value={{ messages, loading, onUpdate, onDelete }}>
      { children }
    </Provider>
  )
}

export { MessageProvider, Consumer as MessageConsumer, MessageContext }
export default MessageContext;