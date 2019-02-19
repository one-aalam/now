import { useContext } from 'react';
import Link from 'next/link';
import { ThemeContext } from '../contexts/ThemeContext';

const Header = () => {
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <header className="flex justify-center items-center p-10">
      {/* <h1>Next.js Example on Now 2.0</h1> */}
      <ul className="list-reset flex">
        <li className="mr-6">
          <Link href="/about">
            <a className="text-blue hover:text-blue-darker">about</a>
          </Link>
        </li>
        <li className="mr-6">
          <Link href="/home">
            <a className="text-blue hover:text-blue-darker">home</a>
          </Link>
        </li>
        <li className="mr-6">
          <a className="text-blue hover:text-blue-darker" href="#" onClick={toggleTheme} >toggle theme</a>
        </li>
        <li className="mr-6">
          <a className="text-grey-light cursor-not-allowed" href="#">Disabled</a>
        </li>
      </ul>
    </header>
  );
  }

export default Header;