import { useContext } from 'react';
import Router from 'next/router'
import { auth } from '../libs/firebase';
import AuthUserContext from '../contexts/AuthUserContext';

export const Login = (props) => {
  const user = useContext(AuthUserContext);

  return (
  <>
  <h1 className="font-hairline mb-6 text-center">Login to our Website</h1>
  <div className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg">
    <div className="mb-4">
      <label className="font-bold text-grey-darker block mb-2">Username or Email</label>
      <input type="text" className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow" placeholder="Your Username" />
    </div>
    <div className="mb-4">
      <label className="font-bold text-grey-darker block mb-2">Password</label>
      <input type="text" className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow" placeholder="Your Password"></input>
    </div>

    <div className="flex items-center justify-between">
      <button className="bg-teal-dark hover:bg-teal text-white font-bold py-2 px-4 rounded">
          Login
      </button>

      <a className="no-underline inline-block align-baseline font-bold text-sm text-blue hover:text-blue-dark float-right" href="#">
          Forgot Password?
      </a>
    </div>
    <div className="flex justify-center items-center">
      <button
        className="bg-teal hover:bg-teal text-white font-bold py-2 px-4 rounded"
        onClick={() => auth.signInWithGoogle()}
        >
          Sign in with Google
      </button>
    </div>
  </div>
  <div className="text-center">
    <p className="text-grey-dark text-sm">Don't have an account? <a href="#" className="no-underline text-blue font-bold">Create an Account</a>.</p>
  </div>
  </>
);
  }