import { useContext, useEffect } from 'react';
import Router, { withRouter } from 'next/router'
import * as routes from "../constants/routes";
import { auth } from "../libs/firebase";
import { AuthUserContext } from "../contexts/AuthUserContext";

export const withAuthorization = (condition) => (Component) => {
  const withAuthorization = ({ router }) => {
    const user = useContext(AuthUserContext);

    useEffect(() => {
      auth.onAuthStateChanged( user => {
        if (!condition(user)) {
          router.push(routes.SIGN_IN)
        }
      })
    });

    return user ? <Component /> : null;
  }

  return withRouter(withAuthorization);
}