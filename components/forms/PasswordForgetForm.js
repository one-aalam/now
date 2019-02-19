import Link from 'next/link';
import { useState } from 'react';

import { auth } from '../../libs/firebase';

import { Form, TextField } from './fields';

const INITIAL_FORM_STATE = {
  email: ''
};

const INITIAL_ERR_STATE = {
  code: '',
  message: '',
};

export const PasswordForgetForm = ({ heading }) => {
  const [ state, setState ] = useState(INITIAL_FORM_STATE);
  const [ error, setError ] = useState(INITIAL_ERR_STATE);
  const [ calling, setCalling ] = useState(false);

  const handleChange = evt => setState({ ...state, ...{[evt.target.name]: evt.target.value}});

  const onSubmit = ({ email }) => {
    if (email.trim() !== '') {
      setCalling(true);
      auth.sendPasswordResetEmail(email)
      .then((o) => {
        console.log(o);
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
      <TextField name="email" type="email" label="Email" placeholder="Your email" value={state['email']} onChange={handleChange} />
      <div className="flex items-center justify-between">
        <button className="bg-teal-dark hover:bg-teal text-white font-bold py-2 px-4 rounded" onClick={ () => onSubmit(state) } >
            { calling ? 'Requesting a reset...' : 'Request a reset' }
        </button>

        <Link href="/signIn">
          <a className="no-underline inline-block align-baseline font-bold text-sm text-blue hover:text-blue-dark float-right" href="#">
              Sign In?
          </a>
        </Link>
      </div>
      <div className="fb-error bg-red-lighest text-red text-sm pt-2 pb-2">
        { error.message && <p>{error.message}</p> }
      </div>
    </Form>
    <div className="text-center">
      <p className="text-grey-dark text-sm">Don't have an account?&nbsp;
      <Link href="/signUp"><a className="no-underline text-blue font-bold">Create an Account &rarr;</a></Link></p>
    </div>
  </>
  );
  }