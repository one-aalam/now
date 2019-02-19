import { useContext } from 'react';
import Link from 'next/link';
import Router from 'next/router'
import * as routes from '../constants/routes';
import { AuthUserContext } from '../contexts/AuthUserContext';
import { auth } from '../libs/firebase';

export const Navigation = () => {
  const user = useContext(AuthUserContext);

  return (
    user ? <NavigationAuth /> : <NavigationNonAuth />
  );
}



const NavigationAuth = () => (
  <ul className="list-reset flex">
    <li className="mr-6">
      <Link href={routes.LANDING}>
        <a className="text-blue hover:text-blue-darker">landing</a>
      </Link>
    </li>
    <li className="mr-6">
      <Link href={routes.HOME}>
        <a className="text-blue hover:text-blue-darker">home</a>
      </Link>
    </li>
    <li className="mr-6">
      <a className="text-grey-light hover:text-blue-darker" href="#" onClick={() => {
        auth.signOut();
        Router.push(routes.LANDING);
      }}>log out</a>
    </li>
  </ul>
)

const NavigationNonAuth = () => (
  <ul className="list-reset flex">
    <li className="mr-6">
      <Link href={routes.LANDING}>
        <a className="text-blue hover:text-blue-darker">landing</a>
      </Link>
    </li>
    <li className="mr-6">
      <Link href={routes.SIGN_IN}>
        <a className="text-blue hover:text-blue-darker">Sign In</a>
      </Link>
    </li>
  </ul>
)