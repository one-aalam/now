import { useContext, useState } from 'react';
import Link from 'next/link';
import { Manager, Reference, Popper } from 'react-popper';

import * as routes from '../constants/routes';
import { AuthUserContext } from '../contexts/AuthUserContext';
import { ThemeContext } from '../contexts/ThemeContext';

import { useRect, POPPER_DEFAULT_RECT } from '../hooks/useRect';

import User from 'react-feather/dist/icons/user';
import Settings from 'react-feather/dist/icons/settings';
import Bell from 'react-feather/dist/icons/bell';
import LogOut from 'react-feather/dist/icons/log-out';
import Droplet from 'react-feather/dist/icons/droplet';


import { auth } from '../libs/firebase';

export const Navigation = () => {
  const user = useContext(AuthUserContext);

  return (
    user ? <NavigationAuth user={user} /> : <NavigationNonAuth />
  );
}

const NavigationAuth = ({ user }) => {
  const [ isUserMenuVisible, setIsUserMenuVisible ] = useState(false)
  const [ rect, setRect, virtualReferenceElement ] = useRect(POPPER_DEFAULT_RECT);
  const { toggleTheme } = useContext(ThemeContext);


  return (
  <ul className="list-reset flex">
    <li className="mr-6">
      <a className="text-blue hover:text-blue-darker" href="#" onClick={toggleTheme}>
        <Droplet/>
      </a>
    </li>
    <li className="mr-6">
      <Link href={routes.SETTINGS}>
        <a className="text-blue hover:text-blue-darker"><Settings/></a>
      </Link>
    </li>
    <li className="mr-6">
      <Link href="#">
        <a className="text-blue hover:text-blue-darker"><Bell/></a>
      </Link>
    </li>
    {/* <li className="mr-6">
      <a className="hover:text-blue-darker" href="#" onClick={() => {
        auth.signOut();
      }}><LogOut/></a>
    </li> */}
    <li className="mr-6">
      <Manager>
        <Reference>
          {({ ref }) => (
            <span onClick={() => {
              setIsUserMenuVisible(!isUserMenuVisible)
            }}><User/> Hi, { user.displayName || 'User' }</span>
          )}
        </Reference>
        <Popper placement="bottom" modifiers={{offset: { offset: '0,5' }}} style={{position: 'relative'}}>
          {({ ref, style, placement, arrowProps }) => (
            isUserMenuVisible ?
            <div className="pop" ref={ref} data-placement={placement} style={{position: 'absolute'}}>
              <div className="flex-col">
                <span onClick={auth.signOut}><LogOut /> Log out</span>
              </div>
              <div className="x-arrow" ref={arrowProps.ref} style={arrowProps.style} />
            </div> : null
          )}
        </Popper>
        <style global jsx>{`
          .pop {
            background-image: linear-gradient(to bottom,rgba(49,49,47,.99),#262625);
            background-repeat: repeat-x;
            border-radius: 5px;
            padding: 4px 10px;
            color: white;
            margin-right: 10px;
          }
          .x-arrow {
            position: absolute;
            width: 14px;
            height: 14px;
            background-color: #262625;
            transform: rotate(45deg);
            z-index: -1;
          }
          [data-placement="top"] .x-arrow {
            margin-bottom: -7px;
            bottom: 0;
          }
          [data-placement="bottom"] .x-arrow {
            margin-top: -7px;
            top: 0;
          }
        `}
        </style>
      </Manager>
    </li>
  </ul>
)
}

const NavigationAuthToolbar = ({ user }) => (
    <nav className="bg-black pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 pin-t">
        <div className="flex flex-wrap items-center">
          <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
            <a href="#"><span className="text-xl pl-2"><i className="em em-grinning"></i></span></a>
          </div>
          <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2">
              <div className="relative w-full">
                  <input type="search" placeholder="Search" className="w-full bg-grey-darkest text-sm text-white transition border border-transparent focus:outline-none focus:border-grey-darker rounded py-1 px-2 pl-10 appearance-none leading-normal" />
                  <div className="absolute search-icon" style={{top: .5, left: .8}}>
                      <svg className="fill-current pointer-events-none text-white w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                      </svg>
                  </div>
              </div>
          </div>
          <div className="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
            <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
              <li className="flex-1 md:flex-none md:mr-3">
                <a className="inline-block py-2 px-4 text-white no-underline" href="#">Active</a>
              </li>
              <li className="flex-1 md:flex-none md:mr-3">
                <a className="inline-block text-grey-dark no-underline hover:text-grey-lighter hover:text-underline py-2 px-4" href="#">link</a>
              </li>
              <li className="flex-1 md:flex-none md:mr-3">
                <div className="relative inline-block">
                  <button onclick="toggleDD('myDropdown')" className="drop-button text-white focus:outline-none"> <span class="pr-2"><i class="em em-robot_face"></i></span> Hi, User <svg class="h-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg></button>
                  <div id="myDropdown" className="dropdownlist absolute bg-black text-white pin-r mt-3 p-3 overflow-auto z-30 invisible">
                    <input type="text" className="drop-search p-2 text-grey-dark" placeholder="Search.." id="myInput" onkeyup="" />
                    <a href="#" className="p-2 hover:bg-grey-darkest text-white text-sm no-underline hover:no-underline block"><i class="fa fa-user fa-fw"></i> Profile</a>
                    <a href="#" className="p-2 hover:bg-grey-darkest text-white text-sm no-underline hover:no-underline block"><i class="fa fa-cog fa-fw"></i> Settings</a>
                    <div className="border border-grey-darkest">
                      <a href="#" className="p-2 hover:bg-grey-darkest text-white text-sm no-underline hover:no-underline block"><i class="fas fa-sign-out-alt fa-fw"></i> Log Out</a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
    </nav>
);

const NavigationNonAuth = () => (
  <ul className="list-reset flex">
    <li className="mr-6">
      <Link href={routes.HOME}>
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