import Link from 'next/link';
import { useState } from 'react';

import { Form, TextField } from './fields';

const initialState = {
  username: '',
  password: '',
  email: ''
};

export const SignInForm = ({ heading, onSubmit }) => {
  const [ state, setState ] = useState(initialState);

  const handleChange = evt => setState({ ...state, ...{[evt.target.name]: evt.target.value}});

  return (
  <>
    <Form heading={heading}>
      <TextField name="name" label="Username or Email" placeholder="Your Username" value={state['username']} onChange={handleChange} />
      <TextField name="password" type="password" label="Password" placeholder="Your password" value={state['password']} onChange={handleChange} />
      <div className="flex items-center justify-between">
        <button className="bg-teal-dark hover:bg-teal text-white font-bold py-2 px-4 rounded" onClick={ () => console.log(state) } >
            Login
        </button>

        <a className="no-underline inline-block align-baseline font-bold text-sm text-blue hover:text-blue-dark float-right" href="#">
            Forgot Password?
        </a>
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