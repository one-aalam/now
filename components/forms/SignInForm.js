import Link from 'next/link';
import { useState } from 'react';
import Router from 'next/router'
import * as routes from '../../constants/routes';
import { auth } from '../../libs/firebase';

import { Form, TextField } from './fields';

const INITIAL_FORM_STATE = {
  username: '',
  password: '',
};

const INITIAL_ERR_STATE = {
  code: '',
  message: '',
};

export const SignInForm = ({ heading }) => {
  const [ state, setState ] = useState(INITIAL_FORM_STATE);
  const [ error, setError ] = useState(INITIAL_ERR_STATE);
  const [ calling, setCalling ] = useState(false);

  const handleChange = evt => setState({ ...state, ...{[evt.target.name]: evt.target.value}});

  const isValid = () => {
    const { username, password } = state;
    return username.trim().length !== 0 && password.trim().length !== 0;
  }

  const onSubmit = () => {
    if (isValid()) {
      const { username, password } = state;
      setCalling(true);
      auth.signInWithEmailAndPassword(username, password)
      .then((o) => {
        Router.push(routes.HOME)
      })
      .catch(error => {
        setError(error)
      }).
      finally(() => setCalling(false));
    }
  }

  return (
  <>
    <Form heading={heading}>
      <TextField name="username" label="Username or Email" placeholder="Your Username" value={state['username']} onChange={handleChange} />
      <TextField name="password" type="password" label="Password" placeholder="Your password" value={state['password']} onChange={handleChange} />
      <div className="flex items-center justify-between">
        <button className="bg-teal-dark hover:bg-teal text-white font-bold py-2 px-4 rounded" onClick={onSubmit} >
            { calling ? 'Logging in...' : 'Login' }
        </button>

        <Link href="/pw-forget">
          <a className="no-underline inline-block align-baseline font-bold text-sm text-blue hover:text-blue-dark float-right" href="#">
              Forgot Password?
          </a>
        </Link>
      </div>
      <div className="fb-error bg-red-lighest text-red text-sm pt-2 pb-2">
        { error.message && <p>{error.message}</p> }
      </div>
      {/* <div className="flex justify-center items-center">
        <button
          className="bg-teal hover:bg-teal text-white font-bold py-2 px-4 rounded"
          onClick={() => auth.signInWithGoogle()}
          >
            Sign in with Google
        </button>
      </div> */}
    </Form>
    <div className="text-center">
      <p className="text-grey-dark text-sm">Don't have an account?&nbsp;
      <Link href="/signUp"><a className="no-underline text-blue font-bold">Create an Account &rarr;</a></Link></p>
    </div>
  </>
  );
  }