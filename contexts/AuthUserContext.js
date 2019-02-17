import { createContext, useState, useEffect } from 'react';
import { auth } from '../libs/firebase';

let AuthUserContext;
const { Provider, Consumer } = AuthUserContext = createContext();

const AuthProvider = ({ children }) => {
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged( auth => auth ? setUser(auth) : setUser(null))
  }, [ user ]);

  return (
    <Provider value={user}>
      { children }
    </Provider>
  )
}

export { AuthProvider, Consumer as AuthConsumer, AuthUserContext }
export default AuthUserContext;

