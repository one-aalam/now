import { useContext } from 'react';
import Link from 'next/link';
import { ThemeContext } from '../contexts/ThemeContext';

import { Navigation } from './Navigation';

const Header = () => {
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <header className="flex h-12 justify-center items-center">
      {/* <h1>Next.js Example on Now 2.0</h1> */}
      <Navigation />
      <ul className="list-reset flex">
        <li className="mr-6">
          <a className="text-blue hover:text-blue-darker" href="#" onClick={toggleTheme} >toggle theme</a>
        </li>
      </ul>
    </header>
  );
  }

export default Header;