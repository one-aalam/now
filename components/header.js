import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const Header = () => {
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <header className="flex justify-center items-center p-10">
      {/* <h1>Next.js Example on Now 2.0</h1> */}
      <ul class="list-reset flex">
        <li class="mr-6">
          <a class="text-blue hover:text-blue-darker" href="#">link 1</a>
        </li>
        <li class="mr-6">
          <a class="text-blue hover:text-blue-darker" href="#">link 2</a>
        </li>
        <li class="mr-6">
          <a class="text-blue hover:text-blue-darker" href="#" onClick={toggleTheme} >toggle theme</a>
        </li>
        <li class="mr-6">
          <a class="text-grey-light cursor-not-allowed" href="#">Disabled</a>
        </li>
      </ul>
    </header>
  );
  }

export default Header;